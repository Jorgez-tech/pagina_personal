#  Guía de Personalización Rápida

##  Pasos Esenciales (5 minutos)

### 1. Información Básica
Abre `index.html` y busca/reemplaza:
- `Tu Nombre` → Tu nombre real
- `tu@email.com` → Tu correo electrónico
- `Ciudad, País` → Tu ubicación
- `+1 (234) 567-8900` → Tu teléfono

### 2. Redes Sociales
Actualiza todos los enlaces `#` con tus perfiles:
```html
<!-- Busca estas líneas y reemplaza los # -->
<a href="https://github.com/TU_USUARIO" target="_blank">
<a href="https://linkedin.com/in/TU_USUARIO" target="_blank">
<a href="https://twitter.com/TU_USUARIO" target="_blank">
```

### 3. Imágenes Temporales
Mientras consigues tus imágenes, usa placeholders:
- `profile.jpg` → https://via.placeholder.com/500x500
- `about.jpg` → https://via.placeholder.com/600x800
- `projects/projectX.jpg` → https://via.placeholder.com/800x600

Reemplaza `src="img/profile.jpg"` por `src="https://via.placeholder.com/500x500"`

### 4. Tu Historia
En la sección "Sobre Mí", reemplaza el texto con tu propia historia:
```html
<p>
    [Escribe aquí tu historia profesional única]
</p>
```

### 5. Tus Proyectos
Elimina o modifica los 6 proyectos de ejemplo con los tuyos.

##  Personalización Avanzada

### Cambiar Colores
En `css/style.css`, línea ~5:
```css
:root {
    --primary-color: #TU_COLOR;
    --secondary-color: #TU_COLOR;
}
```

**Paletas recomendadas:**
- Azul/Morado: `#6366f1` + `#ec4899` (actual)
- Verde/Azul: `#10b981` + `#3b82f6`
- Naranja/Rosa: `#f59e0b` + `#ef4444`
- Morado/Cyan: `#8b5cf6` + `#06b6d4`

### Cambiar Fuentes
En `index.html`, línea ~17, reemplaza:
```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE&display=swap">
```

**Fuentes recomendadas:**
- Modernas: Inter, Outfit, Space Grotesk
- Elegantes: Playfair Display, Cormorant
- Tech: JetBrains Mono, IBM Plex Mono

##  Checklist Completo

```
□ Nombre y título profesional
□ Descripción personal
□ Email de contacto
□ Teléfono
□ Ubicación
□ Foto de perfil
□ Enlaces a redes sociales (GitHub, LinkedIn, etc.)
□ Biografía en "Sobre Mí"
□ Estadísticas (proyectos, años, clientes)
□ Lista de habilidades técnicas
□ Al menos 3 proyectos con:
  □ Imagen
  □ Título
  □ Descripción
  □ Tecnologías usadas
  □ Link a demo
  □ Link a GitHub
□ Timeline de experiencia laboral
□ Timeline de educación
□ Información de contacto
□ CV en PDF (opcional)
□ Favicon personalizado
□ Meta tags SEO actualizados
```

##  Creando Imágenes de Proyecto

Si no tienes screenshots:

1. **Toma capturas de pantalla** de tus proyectos
2. **Edítalas** con:
   - [Canva](https://canva.com) - Gratis, fácil
   - [Figma](https://figma.com) - Profesional
   - [Photopea](https://photopea.com) - Photoshop online gratis

3. **Mockups** para hacer lucir tus proyectos:
   - [Mockuper](https://mockuper.net/)
   - [Smartmockups](https://smartmockups.com/)

4. **Optimiza** tus imágenes:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)

##  Consejos de Contenido

### Título Profesional
 Malo: "Desarrollador"
 Bueno: "Desarrollador Full Stack especializado en React y Node.js"

### Descripción Personal
 Malo: "Soy desarrollador web."
 Bueno: "Transformo ideas en experiencias digitales excepcionales, combinando diseño elegante con código eficiente."

### Descripción de Proyectos
 Malo: "App de tareas"
 Bueno: "Plataforma de gestión de tareas con sincronización en tiempo real, notificaciones push y análisis de productividad para equipos remotos."

##  Publicar Tu Portfolio

### Opción más rápida: GitHub Pages
1. Sube tu proyecto a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/` (root)
4. ¡Listo! Tu sitio estará en `https://tu-usuario.github.io/nombre-repo/`

### Dominio personalizado (opcional)
1. Compra un dominio en [Namecheap](https://namecheap.com) (~$10/año)
2. Configúralo en GitHub Pages
3. Ejemplo: `tunombre.com` en lugar de `tunombre.github.io`

##  Antes de Publicar

**Revisa:**
- [ ] Todas las imágenes cargan correctamente
- [ ] No hay textos "Lorem ipsum" o placeholders
- [ ] Todos los links funcionan
- [ ] Se ve bien en móvil (prueba con DevTools)
- [ ] Formulario de contacto configurado
- [ ] No hay errores en la consola del navegador
- [ ] Meta tags actualizados con tu información

## 💡 Ideas Extra

### Añadir una sección de Blog
Si quieres compartir conocimientos, considera añadir un blog usando:
- [Dev.to](https://dev.to/)
- [Medium](https://medium.com/)
- [Hashnode](https://hashnode.com/)

Luego linkea a tu blog desde el portfolio.

### Testimonios
Si tienes recomendaciones de LinkedIn, añade una sección:
```html
<section class="testimonials section">
    <!-- Citas de clientes/colegas -->
</section>
```

### Certificaciones
Muestra badges de:
- AWS
- Google Cloud
- Microsoft
- Coursera
- freeCodeCamp

---

**¿Dudas?** Revisa el README.md principal o contacta a tu mentor.
