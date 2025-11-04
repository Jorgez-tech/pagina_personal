# Portafolio Personal — Laboratorio de Landing Pages

## Descripción del Proyecto

Este repositorio contiene un portafolio personal diseñado como **laboratorio técnico** para crear, probar y documentar landing pages profesionales dirigidas a profesionales y pequeñas empresas en Chile.

El proyecto funciona como base replicable para desarrollar sitios web limpios, modernos y funcionales, con enfoque en buenas prácticas de desarrollo frontend, accesibilidad y diseño adaptable.

---

## Stack Tecnológico

- **HTML5** — Estructura semántica y accesible
- **CSS3** — Diseño responsivo, animaciones y variables CSS
- **JavaScript (Vanilla)** — Interactividad sin dependencias externas

**Sin frameworks ni librerías externas** para mantener el código ligero, portátil y fácil de mantener.

---

## Objetivos del Proyecto

1. **Crear un portafolio profesional** que sirva como carta de presentación técnica.
2. **Desarrollar un laboratorio de landing pages** para experimentar con diseños, patrones de UI/UX y funcionalidades.
3. **Generar plantillas replicables** para profesionales y pequeñas empresas que necesiten presencia web rápida y profesional.
4. **Adquirir un dominio `.cl`** para producción y posicionamiento local.
5. **Integrar funcionalidades serverless** (formularios de contacto, envío de correos) sin backend tradicional.

---

## Plan de Despliegue

El sitio será desplegado en una de las siguientes plataformas:

- **Vercel** (recomendado para funciones serverless y dominio personalizado)
- **Netlify** (alternativa con funciones serverless y formularios nativos)
- **GitHub Pages** (opción gratuita para sitios estáticos simples)

**Estado actual:** el proyecto está en desarrollo local y no ha sido desplegado aún.

---

## Funcionalidades Planificadas

### Formulario de Contacto Funcional

Se implementará un formulario de contacto que envíe mensajes al correo del propietario mediante:

- **Funciones serverless** (Vercel Functions o Netlify Functions)
- **SendGrid API** para el envío de correos transaccionales
- Validación del lado del cliente y del servidor
- Confirmación visual de envío exitoso o error

### Otras Funcionalidades

- Galería de proyectos con enlaces a repositorios y vistas ampliadas de imágenes
- Navegación suave y animaciones con AOS (Animate On Scroll)
- Modo claro/oscuro (pendiente)
- Integración con analytics (pendiente)

---

## Estructura del Proyecto

```
/
├── .github/
│   ├── README.md          # Documentación técnica (este archivo)
│   └── léeme.md           # Documentación para no técnicos
├── new-portfolio/
│   ├── index.html         # Página principal
│   ├── css/
│   │   └── style.css      # Estilos globales
│   ├── js/
│   │   └── main.js        # Interactividad y lógica
│   ├── img/
│   │   └── projects/      # Imágenes de proyectos
│   └── fonts/             # Fuentes personalizadas
├── .gitignore             # Archivos y carpetas ignorados por Git
└── WARP.md                # Notas del proyecto
```

---

## Instalación y Uso Local

### Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Editor de código (VS Code recomendado)
- Servidor local opcional (Live Server, Python `http.server`, etc.)

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo/new-portfolio
   ```

2. Abre `index.html` directamente en el navegador o usa un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server -p 8000
   ```

3. Accede a `http://localhost:8000` en tu navegador.

---

## Buenas Prácticas Implementadas

- **HTML semántico** con etiquetas `<header>`, `<main>`, `<section>`, `<footer>`
- **Accesibilidad (a11y)** con atributos `aria-label`, `alt` en imágenes, estructura de encabezados jerárquica
- **CSS modular** con variables personalizadas (`--color-primary`, `--font-base`)
- **Diseño responsivo** usando media queries y unidades relativas
- **Optimización de imágenes** (pendiente: conversión a WebP)
- **Versionado con Git** y `.gitignore` para archivos innecesarios

---

## Estado Actual y Próximos Pasos

### ✅ Completado

- Estructura base del portafolio
- Galería de proyectos con overlay y enlaces
- Diseño responsivo básico
- Integración de iconos (Font Awesome)
- Animaciones con AOS

### 🚧 En Proceso

- Implementación de formulario funcional con serverless + SendGrid
- Modal para ampliar imágenes de proyectos
- Corrección de enlaces a repositorios de GitHub

### 📋 Pendiente

- Adquirir dominio `.cl` y configurar DNS
- Desplegar en Vercel/Netlify
- Optimizar imágenes y rendimiento
- Implementar modo oscuro
- Añadir sección de blog o artículos (opcional)
- Integrar Google Analytics o similar

---

## Contribuciones

Este proyecto es de uso personal, pero si encuentras algún error o tienes sugerencias de mejora, abre un **issue** o envía un **pull request**.

---

## Licencia

Este proyecto es de código abierto bajo la licencia MIT. Puedes usar, modificar y distribuir este código libremente con atribución.

---

## Contacto

- **Autor:** Jorge Zúñiga
- **GitHub:** [@jorgez-tech](https://github.com/jorgez-tech)
- **Correo:** (pendiente de configuración)

---

**Última actualización:** Noviembre 2025
