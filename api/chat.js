// API Serverless para Chat RAG con GitHub Integration
// Optimizado para Vercel Functions

const GITHUB_USERNAME = 'Jorgez-tech';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos
let cachedGitHubData = null;
let cacheTimestamp = 0;

// Sistema de rate limiting simple (en memoria)
const rateLimits = new Map();
const RATE_LIMIT = 10; // 10 mensajes por minuto
const RATE_WINDOW = 60 * 1000; // 1 minuto

/**
 * Obtener datos de GitHub (solo READMEs)
 */
async function fetchGitHubData() {
  const now = Date.now();
  
  // Usar caché si está vigente
  if (cachedGitHubData && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedGitHubData;
  }

  try {
    // 1. Obtener lista de repositorios
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=15`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-RAG-Bot'
        }
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    // 2. Para cada repo, obtener solo el README
    const reposWithReadmes = await Promise.all(
      repos.map(async (repo) => {
        try {
          const readmeResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
            {
              headers: {
                'Accept': 'application/vnd.github.raw',
                'User-Agent': 'Portfolio-RAG-Bot'
              }
            }
          );

          const readme = readmeResponse.ok 
            ? await readmeResponse.text() 
            : 'Sin README disponible';

          return {
            name: repo.name,
            description: repo.description || 'Sin descripción',
            language: repo.language || 'N/A',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            updated: repo.updated_at,
            topics: repo.topics || [],
            // Limitar README a 2000 caracteres para optimizar tokens
            readme: readme.substring(0, 2000)
          };
        } catch (error) {
          return {
            name: repo.name,
            description: repo.description || 'Sin descripción',
            language: repo.language || 'N/A',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            updated: repo.updated_at,
            topics: repo.topics || [],
            readme: 'README no disponible'
          };
        }
      })
    );

    // Actualizar caché
    cachedGitHubData = reposWithReadmes;
    cacheTimestamp = now;

    return reposWithReadmes;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    // Retornar caché antigua si hay error
    return cachedGitHubData || [];
  }
}

/**
 * Construir contexto RAG
 */
function buildContext(githubRepos) {
  const context = `
PERFIL PROFESIONAL:
- Nombre: Jorge Zuta
- GitHub: @${GITHUB_USERNAME}
- Ubicación: Santiago, Chile
- Email: jzuta309@gmail.com
- LinkedIn: jorge-zuta-23b380152
- Rol: Desarrollador Full Stack & Arquitecto de Software
- Experiencia: 3+ años

REPOSITORIOS ACTUALIZADOS (${new Date().toLocaleString('es-CL')}):

${githubRepos.map((repo, index) => `
${index + 1}. 📦 ${repo.name}
   🔗 ${repo.url}
   💻 Lenguaje principal: ${repo.language}
   ⭐ ${repo.stars} estrellas | 🔀 ${repo.forks} forks
   📅 Última actualización: ${new Date(repo.updated).toLocaleDateString('es-CL')}
   ${repo.topics.length > 0 ? `🏷️ Topics: ${repo.topics.join(', ')}` : ''}
   📝 Descripción: ${repo.description}
   
   README:
   ${repo.readme}
   ${'─'.repeat(80)}
`).join('\n')}

STACK TECNOLÓGICO:
Frontend: React, Vue.js, Angular, HTML5, CSS3, JavaScript, Tailwind CSS
Backend: Node.js, Express, Django, Python, PHP
Bases de datos: MongoDB, PostgreSQL, MySQL, SQLite, Firebase
Herramientas: Git, GitHub, Docker, Figma, VS Code

EDUCACIÓN:
- Programador - Universidad Mayor, Chile (2024-2026)
- Enfoque en desarrollo web full stack y buenas prácticas
`;

  return context;
}

/**
 * System Prompt
 */
const SYSTEM_PROMPT = `Eres el asistente virtual profesional de Jorge Zuta, desarrollador Full Stack de Santiago, Chile.

INSTRUCCIONES IMPORTANTES:
1. Responde SIEMPRE en español de manera profesional, concisa y amigable
2. Cuando menciones proyectos, SIEMPRE incluye el enlace completo a GitHub
3. Usa la información actualizada de los repositorios proporcionada en el contexto
4. Si preguntan sobre código específico, menciona que pueden explorar el repositorio en GitHub
5. Si no sabes algo, recomienda contactar directamente a Jorge en jzuta309@gmail.com
6. NUNCA inventes información que no esté en el contexto
7. Sé transparente: menciona que eres un asistente IA que consulta información real de GitHub
8. Usa emojis ocasionalmente para hacer las respuestas más amigables (máximo 2-3 por mensaje)

FORMATO PREFERIDO PARA MENCIONAR PROYECTOS:
"El proyecto **[NOMBRE]** está disponible en GitHub: [URL]
Desarrollado con [TECNOLOGÍAS], se enfoca en [DESCRIPCIÓN BREVE]."

CONTEXTO ACTUALIZADO DE GITHUB:
{GITHUB_CONTEXT}

Hora actual: {TIMESTAMP}
`;

/**
 * Verificar rate limit
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const userLimits = rateLimits.get(ip) || [];
  
  // Limpiar requests antiguos
  const recentRequests = userLimits.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimits.set(ip, recentRequests);
  return true;
}

/**
 * Handler principal
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ 
      error: 'Demasiadas peticiones. Por favor espera un momento.' 
    });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje inválido' });
    }

    // Validar longitud del mensaje
    if (message.length > 500) {
      return res.status(400).json({ 
        error: 'Mensaje demasiado largo. Máximo 500 caracteres.' 
      });
    }

    // Obtener datos de GitHub
    const githubRepos = await fetchGitHubData();
    const context = buildContext(githubRepos);

    // Preparar prompt con contexto
    const systemPrompt = SYSTEM_PROMPT
      .replace('{GITHUB_CONTEXT}', context)
      .replace('{TIMESTAMP}', new Date().toLocaleString('es-CL'));

    // Llamar a OpenAI (o Groq como alternativa)
    const apiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
    const apiUrl = process.env.GROQ_API_KEY 
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    
    const model = process.env.GROQ_API_KEY 
      ? 'llama-3.1-70b-versatile'
      : 'gpt-4o-mini';

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API Key no configurada. Por favor contacta al administrador.' 
      });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-6), // Últimos 3 intercambios
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('LLM API Error:', errorData);
      return res.status(500).json({ 
        error: 'Error al procesar tu mensaje. Intenta nuevamente.' 
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return res.status(200).json({
      reply,
      timestamp: new Date().toISOString(),
      cached: cachedGitHubData !== null
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor. Por favor intenta nuevamente.' 
    });
  }
}
