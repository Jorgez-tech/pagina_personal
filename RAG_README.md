# 🤖 Sistema RAG con Integración GitHub - Portfolio Jorge Zuta

Sistema de chat inteligente (RAG) que accede en tiempo real a los repositorios de GitHub para responder preguntas sobre proyectos, tecnologías y experiencia profesional.

## 🌟 Características

- ✅ **Acceso en tiempo real a GitHub**: Lee READMEs de todos los repositorios públicos
- ✅ **Caché inteligente**: Actualiza datos cada 30 minutos (optimiza rate limits)
- ✅ **Rate limiting**: Protección contra abuso (10 mensajes/minuto por IP)
- ✅ **Múltiples LLMs**: Soporta OpenAI GPT-4o-mini y Groq Llama 3.1
- ✅ **UI responsiva**: Funciona perfecto en móvil, tablet y desktop
- ✅ **Modo oscuro**: Compatible con el theme toggle del portfolio
- ✅ **Serverless**: Desplegado en Vercel Functions (escalable)

## 📁 Estructura del Proyecto

```
portfolio/
├── api/
│   └── chat.js                  # Función serverless (GitHub + LLM)
├── css/
│   ├── style.css               # Estilos del portfolio
│   └── chat-widget.css         # Estilos del chat
├── js/
│   ├── main.js                 # JavaScript del portfolio
│   └── chat-widget.js          # Lógica del chat
├── index.html                  # Página principal
├── vercel.json                 # Configuración de Vercel
├── package.json                # Dependencias
└── ENV_SETUP.md               # Guía de configuración
```

## 🚀 Despliegue Rápido

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Configurar API Key

Elige una opción:

**Opción A: OpenAI** (mejor calidad, ~$0.50/mes)
```bash
vercel env add OPENAI_API_KEY
# Pega tu key de https://platform.openai.com/api-keys
```

**Opción B: Groq** (gratis, buena calidad)
```bash
vercel env add GROQ_API_KEY
# Pega tu key de https://console.groq.com
```

### 3. Desplegar

```bash
# Desarrollo local
vercel dev

# Producción
vercel --prod
```

¡Listo! Tu portfolio con RAG estará en línea.

## 🛠️ Configuración Local

### 1. Clonar repositorio

```bash
git clone https://github.com/Jorgez-tech/pagina_personal.git
cd pagina_personal
```

### 2. Checkout a la rama RAG

```bash
git checkout rag-proposal-18156975354917510718
```

### 3. Crear archivo `.env.local`

```bash
# .env.local
OPENAI_API_KEY=sk-tu-key-aqui
# O
GROQ_API_KEY=gsk_tu-key-aqui
```

### 4. Ejecutar localmente

```bash
vercel dev
# Abre http://localhost:3000
```

## 📝 Cómo Funciona

### Flujo del Sistema

```
1. Usuario escribe pregunta en el chat
         ↓
2. Frontend (chat-widget.js) envía mensaje a /api/chat
         ↓
3. Backend (api/chat.js) hace:
   a. Verifica rate limit
   b. Consulta GitHub API (caché de 30 min)
   c. Lee READMEs de todos los repos
   d. Construye contexto RAG
   e. Envía prompt + contexto al LLM
         ↓
4. LLM genera respuesta con información actual
         ↓
5. Frontend muestra respuesta con enlaces a GitHub
```

### Optimizaciones Implementadas

**GitHub API:**
- ✅ Solo lee READMEs (1 petición/repo)
- ✅ Caché de 30 minutos
- ✅ Límite de 15 repos más recientes
- ✅ Trunca READMEs a 2000 caracteres

**Rate Limiting:**
- ✅ 10 mensajes por minuto por IP
- ✅ Protección en memoria (sin DB necesaria)
- ✅ Ventana deslizante de 60 segundos

**LLM:**
- ✅ Max 600 tokens de respuesta
- ✅ Mantiene solo últimos 6 mensajes de historial
- ✅ Temperature 0.7 (balance creatividad/precisión)

## 🎨 Personalización

### Cambiar avatar del bot

Edita en `js/chat-widget.js`:
```javascript
const avatarSrc = sender === 'user' 
    ? 'img/foto_ejecutivo.jpg'  // Tu foto
    : 'img/logo2.png';          // Logo del bot
```

### Modificar preguntas sugeridas

Edita en `js/chat-widget.js` la sección `suggested-questions`:
```javascript
<button class="suggestion-btn" data-message="Tu pregunta aquí">
    🔍 Texto del botón
</button>
```

### Cambiar colores del chat

Edita variables CSS en `css/chat-widget.css`:
```css
.chat-widget {
    --chat-primary: var(--primary-color);
    --chat-secondary: var(--secondary-color);
    /* Usa las variables de tu portfolio */
}
```

## 🔒 Seguridad

### API Keys
- ✅ **Nunca** expuestas en el frontend
- ✅ Solo accesibles en Vercel Functions (servidor)
- ✅ Incluidas en `.gitignore`

### Rate Limiting
- ✅ 10 mensajes/minuto por IP
- ✅ Protección contra spam
- ✅ Headers CORS configurados

### Validaciones
- ✅ Máximo 500 caracteres por mensaje
- ✅ Sanitización de inputs
- ✅ Timeouts en llamadas API

## 📊 Costos Estimados

| Servicio | Plan | Costo Mensual |
|----------|------|---------------|
| Vercel Functions | Hobby | $0 (100K invocaciones) |
| GitHub API | Público | $0 (60 req/hora) |
| OpenAI GPT-4o-mini | Pay-as-you-go | ~$0.50 (500-1000 consultas) |
| Groq Llama 3.1 | Free Tier | $0 |
| **TOTAL** | | **$0 - $0.50/mes** |

## 🐛 Solución de Problemas

### Error: "API Key no configurada"
```bash
# Verificar variables en Vercel
vercel env ls

# Agregar variable
vercel env add OPENAI_API_KEY

# Redeploy
vercel --prod
```

### Error 429: "Demasiadas peticiones"
- Espera 1 minuto (rate limit)
- O incrementa `RATE_LIMIT` en `api/chat.js`

### Error: GitHub rate limit excedido
- El sistema usa caché de 30 min (no debería pasar)
- Si ocurre, aumenta `CACHE_DURATION` en `api/chat.js`

### Chat no aparece
1. Verifica que `chat-widget.css` esté cargando
2. Abre DevTools → Console para ver errores
3. Verifica que Font Awesome esté cargado (iconos)

## 🧪 Testing

### Probar localmente

```bash
vercel dev
# Abre http://localhost:3000
# Click en el botón flotante 💬
```

### Preguntas de prueba

```
✅ "Muéstrame tus repositorios de GitHub"
✅ "¿Qué tecnologías usas?"
✅ "Háblame del proyecto de Django"
✅ "¿Cuál es tu proyecto más reciente?"
✅ "¿Tienes experiencia con React?"
```

## 📈 Métricas y Monitoreo

### Vercel Dashboard
- Ve a https://vercel.com/dashboard
- Selecciona tu proyecto
- Analytics → Ver invocaciones de funciones

### OpenAI/Groq Dashboard
- OpenAI: https://platform.openai.com/usage
- Groq: https://console.groq.com/usage

## 🤝 Contribuir

Mejoras sugeridas:
- [ ] Agregar analytics de preguntas frecuentes
- [ ] Implementar persistencia de conversación (localStorage)
- [ ] Soporte para múltiples idiomas
- [ ] Integración con LinkedIn API
- [ ] Respuestas con voz (text-to-speech)

## 📄 Licencia

MIT License - Jorge Zuta © 2026

## 📧 Contacto

- **GitHub:** [@Jorgez-tech](https://github.com/Jorgez-tech)
- **Email:** jzuta309@gmail.com
- **LinkedIn:** [jorge-zuta-23b380152](https://www.linkedin.com/in/jorge-zuta-23b380152/)

---

**Creado con ❤️ por Jorge Zuta | Powered by OpenAI & GitHub API**
