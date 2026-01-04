# Informe de Revisión y Propuesta RAG - Portfolio Jorge Zuta

Este documento resume los hallazgos técnicos, análisis de viabilidad y recomendaciones para la integración del sistema RAG (Retrieval-Augmented Generation) en el portfolio actual.

## 1. Estado Actual de la Propuesta
La rama actual implementa una arquitectura **Serverless** utilizando Vercel Functions para el backend y Vanilla JS para el frontend.

*   **Frontend:** `js/chat-widget.js` (Interfaz de chat flotante).
*   **Backend:** `api/chat.js` (Función serverless que orquesta OpenAI + GitHub API).
*   **Fuente de Datos:** Híbrida (Contexto "quemado" en código + API de GitHub en tiempo real).

## 2. Análisis de Viabilidad y Latencia

Se realizaron pruebas de latencia simulada para validar la hipótesis de conectar GitHub en tiempo real.

*   **Viabilidad:** ✅ **Alta**. La solución es modular y no interfiere con el sitio principal en producción.
*   **Latencia Medida:**
    *   Listado de repositorios: ~1.0s
    *   Descarga de READMEs (paralelo): ~0.7s
    *   **Overhead Total:** ~1.7s (antes de inferencia LLM).
*   **Conclusión:** La latencia es aceptable para la primera interacción. El sistema de caché en memoria mitiga esto para preguntas subsecuentes.

## 3. Problemas Detectados

| Nivel | Problema | Descripción |
| :--- | :--- | :--- |
| 🔴 **Crítico** | **Fragmentación de Datos** | La información del perfil (bio, skills) está duplicada y "quemada" (hardcoded) en `api/chat.js`. Si se actualiza `personal.json` o `index.html`, el chat **no** se entera. |
| 🟠 **Medio** | **Persistencia Serverless** | El uso de variables globales para caché (`cachedGitHubData`) en Vercel Functions es volátil. Al escalar o "dormirse" la función, el caché se pierde, provocando re-fetching frecuente. |
| 🟡 **Bajo** | **Ruido en Contexto** | Al traer *todos* los repositorios, se incluyen proyectos de prueba o forks irrelevantes que pueden confundir al modelo. |

## 4. Recomendaciones Técnicas

### A. Unificar la "Fuente de la Verdad"
Modificar `api/chat.js` para leer dinámicamente el archivo `admin/data/personal.json`.
*   **Beneficio:** Mantenimiento único. Actualizas el JSON y automáticamente se actualiza el contexto del chat.

### B. Implementar RAG Híbrido
Combinar fuentes para maximizar precisión y minimizar alucinaciones:
1.  **Contexto Estático (Alta Calidad):** Leer `personal.json` para biografía, experiencia laboral y "Soft Skills".
2.  **Contexto Dinámico (Técnico):** Usar GitHub API solo para obtener detalles de código, lenguajes y actualizaciones recientes de repositorios *seleccionados*.

### C. Estrategia de Caché Robusta
Dado el entorno Serverless gratuito:
*   Utilizar cabeceras HTTP `Cache-Control` (ej. `s-maxage=1800`) para que la CDN de Vercel cachee la respuesta de la API de GitHub si es posible, o implementar un adaptador simple de base de datos (Vercel KV / Redis) si se requiere persistencia real.

### D. Filtrado de Repositorios
Implementar una "lista blanca" o filtro por estrellas/topics en la llamada a GitHub para procesar solo los proyectos que realmente aportan valor al portfolio (ej. `topic:portfolio-showcase`).

## 5. Conclusión
La propuesta es sólida pero requiere refactorizar `api/chat.js` para eliminar los datos hardcoded y conectarlo con `personal.json` antes de pasar a producción. Esto asegurará consistencia entre lo que muestra la web y lo que responde el asistente.
