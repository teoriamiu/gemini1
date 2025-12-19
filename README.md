# NutriLearn Academy - Curso Interactivo de Nutrición con IA

Una plataforma web interactiva para aprender sobre nutrición, calcular requerimientos calóricos y consultar con un asistente IA.

## 🚀 Despliegue en Netlify

1. **Crea un repositorio en GitHub** con estos 4 archivos
2. **Ve a [Netlify](https://app.netlify.com)**
3. **Selecciona "Import from Git"** → GitHub
4. **Elige tu repositorio**
5. **Configura el despliegue**:
   - Build command: (deja vacío)
   - Publish directory: `.`
6. **Haz clic en "Deploy site"**

## 🔑 Configuración de la API Key

**IMPORTANTE**: Reemplaza la API Key en `index.html`:

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Genera una nueva API Key
3. En `index.html`, línea ~1045, reemplaza:
   ```javascript
   const apiKey = "TU_API_KEY_AQUI";