# 🚀 Portfolio Profesional

Portfolio personal moderno y responsivo construido con HTML5, CSS3 y JavaScript vanilla.

## ✨ Características

- ✅ Diseño moderno y profesional
- ✅ 100% Responsivo (móvil, tablet, desktop)
- ✅ Modo claro/oscuro
- ✅ Animaciones suaves
- ✅ Navegación intuitiva
- ✅ Formulario de contacto
- ✅ Filtro de proyectos
- ✅ SEO optimizado
- ✅ Alto rendimiento

## 📁 Estructura del Proyecto

```
new-portfolio/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos personalizados
├── js/
│   └── main.js        # Funcionalidades JavaScript
├── img/
│   ├── profile.jpg    # Foto de perfil
│   ├── about.jpg      # Imagen sobre mí
│   └── projects/      # Imágenes de proyectos
│       ├── project1.jpg
│       ├── project2.jpg
│       └── ...
├── fonts/             # Fuentes personalizadas (opcional)
└── docs/
    └── CV.pdf         # Tu CV para descargar
```

## 🎨 Secciones Incluidas

1. **Hero/Inicio** - Presentación impactante con tu nombre y título
2. **Sobre Mí** - Tu historia, estadísticas y datos personales
3. **Habilidades** - Tecnologías y competencias organizadas por categorías
4. **Proyectos** - Portfolio de trabajos con filtro interactivo
5. **Experiencia** - Timeline de experiencia laboral y educación
6. **Contacto** - Formulario funcional e información de contacto
7. **Footer** - Enlaces rápidos y redes sociales

## 🛠️ Personalización

### 1. Información Personal

Edita `index.html` y reemplaza:

- `[Tu Nombre]` con tu nombre real
- `tu@email.com` con tu email
- URLs de redes sociales (GitHub, LinkedIn, Twitter, etc.)
- Descripción y biografía personal

### 2. Colores y Tema

En `css/style.css`, modifica las variables CSS:

```css
:root {
    --primary-color: #6366f1;      /* Color principal */
    --secondary-color: #ec4899;     /* Color secundario */
    --accent-color: #10b981;        /* Color de acento */
    /* ... más variables */
}
```

### 3. Imágenes

Reemplaza las siguientes imágenes en la carpeta `img/`:

- **profile.jpg** - Tu foto de perfil (recomendado: 500x500px)
- **about.jpg** - Imagen para sección "Sobre Mí" (recomendado: 600x800px)
- **projects/projectX.jpg** - Screenshots de proyectos (recomendado: 800x600px)

### 4. Proyectos

Para cada proyecto en `index.html`, actualiza:

```html
<div class="project-card" data-category="web">
    <div class="project-image">
        <img src="img/projects/tu-proyecto.jpg" alt="Proyecto">
        <div class="project-overlay">
            <div class="project-links">
                <a href="URL_DEMO" target="_blank">...</a>
                <a href="URL_GITHUB" target="_blank">...</a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción breve del proyecto...</p>
        <div class="project-tags">
            <span class="tag">Tecnología1</span>
            <span class="tag">Tecnología2</span>
        </div>
    </div>
</div>
```

### 5. Habilidades

Edita las secciones de habilidades según tus tecnologías:

```html
<div class="skill-item">
    <i class="fab fa-react"></i>
    <span>React</span>
</div>
```

Usa iconos de [Font Awesome](https://fontawesome.com/icons) para las tecnologías.

### 6. Experiencia

Actualiza el timeline con tu experiencia real:

```html
<div class="timeline-item">
    <div class="timeline-icon">
        <i class="fas fa-briefcase"></i>
    </div>
    <div class="timeline-content">
        <span class="timeline-date">2023 - Presente</span>
        <h3>Tu Puesto</h3>
        <h4>Nombre de la Empresa</h4>
        <p>Descripción de responsabilidades...</p>
    </div>
</div>
```

## 📧 Configurar Formulario de Contacto

El formulario actualmente usa una simulación. Para hacerlo funcional:

### Opción 1: FormSpree (Gratis y Fácil)

```html
<form action="https://formspree.io/f/TU_ID" method="POST">
    <!-- campos del formulario -->
</form>
```

### Opción 2: EmailJS

1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email
3. Usa su API en `js/main.js`

### Opción 3: Backend Propio

Crea un endpoint en tu backend (Node.js, Python, PHP, etc.) y actualiza la función `initContactForm()` en `main.js`:

```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

## 🚀 Despliegue

### GitHub Pages (Gratis)

1. Sube el proyecto a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y la carpeta `/new-portfolio`
4. Guarda y espera unos minutos
5. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo/`

### Netlify (Gratis)

1. Arrastra la carpeta `new-portfolio` a [Netlify Drop](https://app.netlify.com/drop)
2. ¡Listo! Tu sitio está en línea

### Vercel (Gratis)

1. Instala Vercel CLI: `npm i -g vercel`
2. Navega a la carpeta: `cd new-portfolio`
3. Ejecuta: `vercel`
4. Sigue las instrucciones

## 🎯 Optimizaciones Recomendadas

### SEO

- Actualiza meta tags en `<head>`
- Añade `sitemap.xml`
- Crea `robots.txt`
- Usa títulos descriptivos
- Añade alt text a todas las imágenes

### Performance

- Comprime imágenes (usa [TinyPNG](https://tinypng.com/))
- Minifica CSS y JS para producción
- Usa lazy loading para imágenes
- Habilita caché del navegador

### Accesibilidad

- Verifica contraste de colores
- Usa etiquetas semánticas
- Añade ARIA labels donde sea necesario
- Prueba con lectores de pantalla

## 📚 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript (Vanilla)** - Funcionalidades sin frameworks
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías (Poppins, Fira Code)
- **AOS** - Animaciones al hacer scroll

## 🔧 Herramientas de Desarrollo

- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Extensión para desarrollo local
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging

## 📱 Navegadores Soportados

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Navegadores móviles modernos

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | `#6366f1` | Color principal, links, botones |
| Secondary | `#ec4899` | Acentos, gradientes |
| Accent | `#10b981` | Éxito, confirmaciones |
| Dark | `#0f172a` | Fondos oscuros, texto |
| Light | `#f9fafb` | Fondos claros |

## 📝 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo y modificarlo para tu propio portfolio.

## 🤝 Contribuciones

Si encuentras bugs o tienes sugerencias de mejora, ¡son bienvenidas!

## 📞 Soporte

Si tienes preguntas sobre cómo personalizar este portfolio:

- 📧 Email: tu@email.com
- 💼 LinkedIn: [Tu Perfil]
- 🐙 GitHub: [Tu Usuario]

---

**¡Hecho con ❤️ y ☕!**

*Última actualización: Octubre 2025*
