# 🚀 Guía de Deployment - Sistema RAG Portfolio

## ✅ Checklist Pre-Deployment

Antes de desplegar, asegúrate de tener:
- [ ] Cuenta en GitHub
- [ ] Cuenta en Vercel (https://vercel.com)
- [ ] API Key de OpenAI O Groq
- [ ] Git instalado
- [ ] Node.js instalado (opcional, pero recomendado)

---

## 📋 Paso 1: Obtener API Key

### Opción A: OpenAI (Recomendado)

1. Ve a https://platform.openai.com/signup
2. Crea una cuenta o inicia sesión
3. Navega a **API Keys** en el menú
4. Click en **"Create new secret key"**
5. Copia la key (empieza con `sk-...`)
6. **IMPORTANTE**: Guárdala en un lugar seguro (solo se muestra una vez)

**Costo:** ~$0.50/mes con uso normal (500-1000 preguntas)

### Opción B: Groq (Gratis)

1. Ve a https://console.groq.com
2. Crea una cuenta
3. Navega a **API Keys**
4. Click en **"Create API Key"**
5. Copia la key (empieza con `gsk_...`)

**Costo:** $0 (tier gratuito actual)

---

## 📋 Paso 2: Conectar Vercel con GitHub

1. Ve a https://vercel.com/login
2. Click en **"Continue with GitHub"**
3. Autoriza el acceso de Vercel a tu GitHub
4. Esto es necesario para importar el repositorio

---

## 📋 Paso 3: Importar Proyecto en Vercel

### Método A: Desde el Dashboard de Vercel

1. En Vercel, click en **"Add New..."** → **"Project"**
2. Busca el repositorio `pagina_personal`
3. Click en **"Import"**
4. **Framework Preset:** Selecciona "Other"
5. **Root Directory:** `.` (raíz del proyecto)
6. **Build Command:** Deja vacío
7. **Output Directory:** `.` (raíz)

### Método B: Desde CLI (Avanzado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Navegar al proyecto
cd pagina_personal

# Cambiar a la rama RAG
git checkout rag-proposal-18156975354917510718

# Login en Vercel
vercel login

# Desplegar
vercel --prod
```

---

## 📋 Paso 4: Configurar Variables de Entorno

### En Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. Click en **"Settings"** (pestaña superior)
3. En el menú lateral, click en **"Environment Variables"**
4. Agregar variable:

   **Name:** `OPENAI_API_KEY` (o `GROQ_API_KEY`)
   
   **Value:** Pega tu API key aquí
   
   **Environments:** ✅ Production ✅ Preview ✅ Development (selecciona todos)

5. Click en **"Save"**

### Desde CLI (Alternativa):

```bash
# Para OpenAI
vercel env add OPENAI_API_KEY
# Pega tu key cuando lo pida

# O para Groq
vercel env add GROQ_API_KEY
# Pega tu key cuando lo pida
```

---

## 📋 Paso 5: Redesplegar (Importante)

Después de agregar las variables de entorno, **debes redesplegar**:

### Desde Dashboard:
1. Ve a **"Deployments"**
2. Click en los **"..."** del último deployment
3. Click en **"Redeploy"**

### Desde CLI:
```bash
vercel --prod
```

---

## 📋 Paso 6: Verificar que Funciona

1. Abre tu sitio: `https://tu-proyecto.vercel.app`
2. Busca el botón flotante 💬 en la esquina inferior derecha
3. Click para abrir el chat
4. Escribe una pregunta de prueba:
   - "Muéstrame tus repositorios"
   - "¿Qué tecnologías usas?"
   - "Háblame de tu experiencia"

### ✅ Funciona si:
- El chat se abre correctamente
- Ves el indicador de "escribiendo..." (3 puntos animados)
- Recibes una respuesta en español
- La respuesta menciona repos reales de GitHub

### ❌ Si hay errores:

**Error: "API Key no configurada"**
- Verifica que agregaste la variable en Vercel Settings
- Asegúrate de redesplegar después de agregarla

**Error 401 o "Invalid API Key"**
- Verifica que copiaste la key completa
- Asegúrate de no tener espacios al inicio/final
- Verifica que la key no haya expirado

**Error 429: "Too many requests"**
- Esto es el rate limiting (10 mensajes/minuto)
- Espera 1 minuto e intenta de nuevo

**Chat no aparece**
- Revisa la consola del navegador (F12 → Console)
- Verifica que todos los archivos se desplegaron correctamente

---

## 📋 Paso 7: Configurar Dominio Personalizado (Opcional)

Si quieres usar tu propio dominio:

1. En Vercel, ve a **Settings** → **Domains**
2. Agrega tu dominio (ej: `jorgezuta.com`)
3. Sigue las instrucciones DNS que te proporciona Vercel
4. Espera propagación (5-30 minutos)

---

## 🔍 Monitoreo y Mantenimiento

### Verificar Uso de API

**OpenAI:**
- Dashboard: https://platform.openai.com/usage
- Revisa cuántos tokens consumes
- Configura alertas de gasto

**Groq:**
- Dashboard: https://console.groq.com/usage
- Monitorea requests y rate limits

### Verificar Funciones de Vercel

1. Ve a tu proyecto en Vercel
2. **Analytics** → **Functions**
3. Revisa:
   - Invocaciones por día
   - Errores (si hay)
   - Latencia promedio

### GitHub API Rate Limit

El sistema usa caché de 30 minutos, por lo que no deberías tener problemas. Para verificar tu límite:

```bash
curl https://api.github.com/rate_limit
```

Deberías tener 60 requests/hora (sin autenticación).

---

## 🎯 Siguiente Paso: Hacer Merge

Una vez que verifiques que **TODO FUNCIONA CORRECTAMENTE**:

1. Ve al Pull Request en GitHub
2. Pide a alguien que revise (o auto-revisa)
3. Click en **"Merge Pull Request"**
4. Vercel automáticamente desplegará a producción

**IMPORTANTE:** No hagas merge hasta estar 100% seguro de que funciona.

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa logs en Vercel:**
   - Deployments → Click en el deployment → "Runtime Logs"

2. **Revisa consola del navegador:**
   - F12 → Console (busca errores en rojo)

3. **Contacto:**
   - Abre un issue en GitHub
   - Email: jzuta309@gmail.com

---

## 📚 Recursos Adicionales

- [Documentación Vercel](https://vercel.com/docs)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Groq API Docs](https://console.groq.com/docs)

---

**¡Éxito con tu deployment! 🚀**
