# Portfolio Profesional — Laboratorio de Landing Pages

Portfolio personal moderno y responsivo construido con HTML5, CSS3 y JavaScript vanilla. Este proyecto también funciona como laboratorio técnico para crear, probar y documentar landing pages profesionales dirigidas a profesionales y pequeñas empresas en Chile.

## Características

- Diseño moderno y profesional
- 100% Responsivo (móvil, tablet, desktop)
- Modo claro/oscuro implementado
- Animaciones suaves con AOS
- Navegación intuitiva
- Formulario de contacto (en implementación con serverless + SendGrid)
- Filtro de proyectos interactivo
- SEO optimizado
- Alto rendimiento
- Sin frameworks ni librerías externas (vanilla JavaScript)

## Estructura del Proyecto

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

## Secciones Incluidas

1. **Hero/Inicio** - Presentación impactante con tu nombre y título
2. **Sobre Mí** - Tu historia, estadísticas y datos personales
3. **Habilidades** - Tecnologías y competencias organizadas por categorías
4. **Proyectos** - Portfolio de trabajos con filtro interactivo
5. **Experiencia** - Timeline de experiencia laboral y educación
6. **Contacto** - Formulario funcional e información de contacto
7. **Footer** - Enlaces rápidos y redes sociales

## Personalización

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

## Configurar Formulario de Contacto

El formulario está en proceso de implementación usando funciones serverless y SendGrid. Opciones alternativas:

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

## Despliegue

Para poner tu portfolio en línea, considera las siguientes opciones, incluyendo algunas específicas para Chile:

### ◘ Opciones Gratuitas y Rápidas

Estas opciones son ideales para empezar y no requieren conocimientos avanzados de servidores.

#### GitHub Pages
1. Sube tu proyecto a un repositorio en GitHub.
2. Ve a la sección "Settings" (Configuración) de tu repositorio, luego a "Pages".
3. En "Source" (Fuente), selecciona la rama `main` (o la que uses para tu código) y la carpeta `/ (root)` o `/docs` si tu `index.html` está allí.
4. Guarda los cambios y espera unos minutos. Tu sitio estará disponible en una URL como `https://tu-usuario.github.io/nombre-del-repositorio/`.

#### Vercel
1. Crea una cuenta gratuita en [Vercel](https://vercel.com/).
2. Conecta tu cuenta de GitHub.
3. Importa tu repositorio. Vercel detectará que es un proyecto estático y lo desplegará, asignándole una URL gratuita.

### ◙ Consideraciones para Chile

Si deseas tener un dominio `.cl` o un hosting local, aquí hay algunas pautas:

#### Registro de Dominio .cl
○ Para registrar un dominio `.cl`, debes hacerlo a través de [NIC Chile](https://www.nic.cl/).
○ El proceso implica buscar la disponibilidad del dominio, pagar la tarifa anual y asociarlo a un servicio de hosting.

#### Hosting en Chile
○ Si buscas un hosting con servidores en Chile para una mejor latencia local, puedes considerar proveedores como:
    •  **Hostinger Chile** <mcreference link="https://www.hostinger.cl/" index="1">1</mcreference>
    •  **WebHosting Chile** <mcreference link="https://www.webhosting.cl/" index="2">2</mcreference>
    •  **ChileHosting** <mcreference link="https://www.chilehosting.cl/" index="3">3</mcreference>
○ Estos servicios suelen ofrecer planes de hosting compartido o VPS donde puedes subir los archivos de tu portfolio.

#### Pasos Generales para Hosting Propio (con dominio .cl)
1.  **Contrata un Hosting**: Elige un proveedor y un plan que se ajuste a tus necesidades.
2.  **Sube tus Archivos**: Utiliza FTP o el panel de control del hosting (cPanel, Plesk) para subir todos los archivos de tu carpeta `new-portfolio` (HTML, CSS, JS, `img`, `fonts`, etc.) al directorio `public_html` o `www`.
3.  **Configura el Dominio**: En el panel de control de tu hosting, busca la opción para "Añadir Dominio" o "Dominios". Deberás apuntar los DNS de tu dominio `.cl` (gestionados en NIC Chile) a los servidores DNS que te proporcionará tu proveedor de hosting. Este proceso puede tardar algunas horas en propagarse.

### ♪ Consejos Adicionales

○ **HTTPS**: Asegúrate de que tu sitio use HTTPS. La mayoría de los servicios de hosting y plataformas como GitHub Pages o Vercel lo configuran automáticamente. Si usas un hosting propio, puedes instalar certificados SSL gratuitos con Let's Encrypt.
○ **Actualizaciones**: Cada vez que realices cambios en tu código, deberás subir las nuevas versiones a tu hosting o repositorio de GitHub para que se reflejen en línea.
○ **Pruebas**: Siempre prueba tu sitio después del despliegue para asegurarte de que todo funciona correctamente.


## Optimizaciones Recomendadas

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

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript (Vanilla)** - Funcionalidades sin frameworks
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías (Poppins, Fira Code)
- **AOS** - Animaciones al hacer scroll

## Herramientas de Desarrollo

- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Extensión para desarrollo local
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging

## Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Navegadores móviles modernos

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | `#6366f1` | Color principal, links, botones |
| Secondary | `#ec4899` | Acentos, gradientes |
| Accent | `#10b981` | Éxito, confirmaciones |
| Dark | `#0f172a` | Fondos oscuros, texto |
| Light | `#f9fafb` | Fondos claros |

## Licencia

Este proyecto es de código abierto bajo la licencia MIT. Puedes usar, modificar y distribuir este código libremente con atribución.

## Contribuciones

Si encuentras bugs o tienes sugerencias de mejora, abre un issue o envía un pull request.

## Contacto

- **Autor:** Jorge Zuta (jorgez-tech)
- **GitHub:** [@jorgez-tech](https://github.com/jorgez-tech)
- **Email:** (pendiente de configuración)

---

**Nota:** Este documento evita el uso de emoticones para mantener un tono técnico y profesional.

**Última actualización:** Noviembre 2025
