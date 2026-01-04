# Configuración de Variables de Entorno

Este archivo contiene las instrucciones para configurar las variables de entorno necesarias para el sistema RAG.

## Variables Requeridas

### Opción 1: OpenAI (Recomendado para mejor calidad)
```bash
OPENAI_API_KEY=tu_api_key_de_openai
```

**Cómo obtenerla:**
1. Ve a https://platform.openai.com/api-keys
2. Crea una cuenta o inicia sesión
3. Genera una nueva API key
4. Copia la key (empieza con `sk-...`)

**Costo estimado:** ~$0.50/mes con GPT-4o-mini (500-1000 consultas)

### Opción 2: Groq (Alternativa gratuita)
```bash
GROQ_API_KEY=tu_api_key_de_groq
```

**Cómo obtenerla:**
1. Ve a https://console.groq.com
2. Crea una cuenta
3. Genera una API key en "API Keys"
4. Usa el modelo `llama-3.1-70b-versatile`

**Costo:** Gratis (tier gratuito actual)

## Configuración en Vercel

### Método 1: CLI de Vercel
```bash
vercel env add OPENAI_API_KEY
# O
vercel env add GROQ_API_KEY
```

### Método 2: Dashboard de Vercel
1. Ve a tu proyecto en https://vercel.com/dashboard
2. Settings → Environment Variables
3. Agrega la variable:
   - **Name:** `OPENAI_API_KEY` o `GROQ_API_KEY`
   - **Value:** Tu API key
   - **Environment:** Production, Preview, Development (selecciona todos)
4. Click en "Save"

## Configuración Local (Desarrollo)

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# .env.local
OPENAI_API_KEY=sk-tu-api-key-aqui
# O
GROQ_API_KEY=gsk_tu-api-key-aqui
```

**IMPORTANTE:** Nunca subas este archivo a Git. Ya está incluido en `.gitignore`

## Verificación

Para verificar que las variables están configuradas correctamente:

```bash
# En Vercel
vercel env ls

# Local
echo $OPENAI_API_KEY
# O
echo $GROQ_API_KEY
```

## Prioridad

El sistema verifica las API keys en este orden:
1. Si existe `GROQ_API_KEY` → Usa Groq (Llama 3.1)
2. Si existe `OPENAI_API_KEY` → Usa OpenAI (GPT-4o-mini)
3. Si ninguna existe → Retorna error

## Seguridad

✅ **Nunca expongas las API keys en el frontend**
✅ **Usa variables de entorno del servidor (Vercel Functions)**
✅ **Implementa rate limiting (ya incluido en el código)**
✅ **Monitorea el uso desde los dashboards de OpenAI/Groq**

## Solución de Problemas

### Error: "API Key no configurada"
- Verifica que la variable esté en Vercel Environment Variables
- Redeploy el proyecto después de agregar variables

### Error 401: "Invalid API Key"
- Verifica que la key sea correcta (copia/pega completa)
- Asegúrate de que la key no haya expirado
- Verifica que tengas créditos disponibles (OpenAI)

### Exceso de peticiones
- El sistema incluye rate limiting (10 mensajes/minuto por IP)
- Los datos de GitHub se cachean por 30 minutos
- Considera aumentar el caché si el tráfico es alto
