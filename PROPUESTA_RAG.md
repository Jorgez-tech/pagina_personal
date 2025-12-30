# Propuesta de Integración RAG (Retrieval-Augmented Generation) para tu Portfolio

Esta propuesta detalla cómo integrar un asistente de Inteligencia Artificial en tu portfolio actual. El objetivo es permitir que los visitantes (reclutadores, clientes) "chateen" con tu perfil profesional, haciendo preguntas sobre tu experiencia, habilidades y proyectos.

## 1. Concepto: "Chat con el Candidato"

En lugar de que el usuario tenga que leer todo el sitio, puede preguntar:
*   *"¿Tienes experiencia con Python y Django?"*
*   *"¿Cuéntame sobre el proyecto de Encuestas?"*
*   *"¿Cómo puedo contactarte?"*

El sistema usará RAG para buscar la información en tu propio portfolio y generar una respuesta precisa y profesional.

## 2. Arquitectura Propuesta

Dado que tu sitio es estático (HTML/CSS/JS) y probablemente alojado en GitHub Pages, propongo una arquitectura **Serverless** para mantener los costos bajos (o nulos) y la implementación sencilla.

### Componentes:

1.  **Frontend (Tu Portfolio)**:
    *   Un **Widget de Chat** flotante en la esquina inferior derecha.
    *   Desarrollado en JavaScript Vanilla (siguiendo la filosofía de tu sitio).
    *   Estilos coherentes con tu tema actual (CSS).

2.  **Base de Conocimiento (Contexto)**:
    *   Un archivo JSON (`data/portfolio-content.json`) que contiene toda la información estructurada de tu `index.html` (Biografía, Proyectos, Skills).
    *   *Nota: Al ser un portfolio personal, el volumen de texto es pequeño, por lo que podemos pasar todo el contexto directamente al modelo (Context Augmentation) sin necesidad de una base de datos vectorial compleja, simplificando enormemente la arquitectura.*

3.  **Backend (API Serverless)**:
    *   Una función serverless (por ejemplo, en Vercel Functions o Netlify Functions).
    *   Esta función actúa como intermediario seguro para llamar a la API de IA sin exponer tus claves privadas.

4.  **Modelo de IA (LLM)**:
    *   **OpenAI (GPT-4o-mini)**: Modelo muy económico, rápido y capaz.
    *   Alternativa gratuita: **Groq (Llama 3)** para inferencia ultra rápida y gratuita (tier free).

## 3. Flujo de Funcionamiento

1.  El usuario escribe una pregunta en el chat.
2.  El JavaScript del frontend envía la pregunta a tu función Serverless.
3.  La función Serverless construye un "Prompt" que incluye:
    *   Rol: "Eres el asistente virtual del portfolio de Jorge Zuta..."
    *   Contexto: El contenido JSON de tu portfolio.
    *   Pregunta del usuario.
4.  La IA genera la respuesta.
5.  El frontend muestra la respuesta en el chat.

## 4. Plan de Implementación

### Fase 1: Preparación de Datos (Frontend)
*   Crear un archivo JSON con la info de tus proyectos, skills y experiencia.
*   *Beneficio*: Centraliza tu información y facilita actualizaciones.

### Fase 2: Interfaz de Usuario (Frontend)
*   Diseñar el botón de chat y la ventana de conversación.
*   Implementar la lógica de envío y recepción de mensajes en `js/chat.js`.
*   Añadir estilos en `css/chat.css`.

### Fase 3: Backend (Serverless)
*   Crear un repositorio separado (o configurar Vercel en el mismo) para alojar la función API.
*   Implementar la llamada a OpenAI/Groq.

## 5. Estimación de Costos

*   **Hosting Frontend**: Gratis (GitHub Pages).
*   **Hosting Backend**: Gratis (Vercel Hobby Plan).
*   **API de IA**:
    *   OpenAI: Menos de $1 USD/mes (para tráfico de portfolio normal).
    *   Groq: Gratis (actualmente).

## 6. Siguientes Pasos

Si estás de acuerdo con esta propuesta, puedo proceder inmediatamente con:

1.  **Crear la estructura de datos JSON** basada en tu `index.html` actual.
2.  **Implementar el código Frontend** (HTML/CSS/JS) para que veas el widget visualmente (aunque no responda "inteligentemente" todavía hasta conectar el backend).
3.  **Proveer el código del Backend** para que lo despliegues en Vercel o Netlify.

---
**¿Te gustaría comenzar con la Fase 1 y 2 (Interfaz y Datos) ahora mismo?**
