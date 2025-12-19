// netlify/functions/chat.js
exports.handler = async function(event, context) {
  // 1. Solo aceptar peticiones POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }
  
  // 2. Obtener el mensaje del usuario desde el frontend
  const requestBody = JSON.parse(event.body);
  const { prompt, systemInstruction = "Eres un experto nutricionista." } = requestBody;
  
  // 3. ¡Aquí SÍ podemos usar la variable de entorno de forma segura!
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'La API Key no está configurada en el servidor.' })
    };
  }
  
  // 4. Hacer la petición a la API de Gemini DESDE EL SERVIDOR SEGURO
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`Error de Gemini: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    
    // 5. Devolver la respuesta al frontend
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: aiResponse })
    };
  } catch (error) {
    console.error('Error en la función:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al llamar a la IA: ' + error.message })
    };
  }
};