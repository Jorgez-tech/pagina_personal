# Portafolio Personal - Documentación Técnica

**Autor:** Jorge Zuta  
**GitHub:** [@Jorgez-tech](https://github.com/Jorgez-tech)  
**Sitio:** [jorgez.tech](https://jorgez.tech)

## Descripción del Proyecto

Portafolio personal que funciona como laboratorio técnico para crear y probar landing pages profesionales en Chile. Este proyecto implementa un sitio web responsive con modo claro/oscuro y está desplegado en GitHub Pages con dominio personalizado.

## Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Diseño:** Responsive design con CSS Grid y Flexbox
- **Tipografía:** Fuentes personalizadas (Poppins, Playfair Display)
- **Hosting:** GitHub Pages
- **Dominio:** jorgez.tech (controlpanel.tech)
- **SSL:** Certificado automático de GitHub

## Estructura del Proyecto

```
pagina_personal/
├── .github/
│   ├── README.md          # Documentación técnica
│   └── léeme.md           # Documentación para colaboradores
├── css/
│   └── style.css          # Estilos globales
├── fonts/                 # Tipografías personalizadas
├── img/
│   ├── projects/          # Imágenes y videos de proyectos
│   └── ...                # Imágenes generales
├── js/
│   └── main.js            # Lógica del sitio
├── .gitignore             # Archivos excluidos de Git
├── CNAME                  # Configuración de dominio personalizado
├── index.html             # Página principal
├── GUIA_PERSONALIZACION.md # Guía de personalización
└── portfolio-README.md    # README del portfolio
```

## Características Implementadas

- Modo claro/oscuro con persistencia en localStorage
- Diseño responsive para móviles, tablets y escritorio
- Sección de proyectos con grid adaptativo
- Línea de tiempo educativa y profesional
- Video de perfil en sección "Sobre Mí"
- Integración con redes sociales y GitHub

## Proceso de Despliegue en GitHub Pages

### 1. Preparación del Repositorio

**Organización de archivos:**
```bash
# Los archivos del portfolio se movieron de new-portfolio/ a la raíz
move new-portfolio\index.html .
move new-portfolio\CNAME .
move new-portfolio\css .
move new-portfolio\js .
move new-portfolio\img .
move new-portfolio\fonts .
```

**Razón:** GitHub Pages solo puede publicar desde la raíz del repositorio (`/`) o desde la carpeta `/docs`. Los archivos originalmente en `new-portfolio/` no serían accesibles.

### 2. Configuración de Dominio Personalizado

**Archivo CNAME:**
```
jorgez.tech
```

Este archivo le indica a GitHub Pages qué dominio personalizado usar para el sitio.

**Configuración DNS en controlpanel.tech:**

| Tipo  | Nombre | Valor                | TTL  |
|-------|--------|----------------------|------|
| A     | @      | 185.199.108.153      | Auto |
| CNAME | www    | jorgez.tech          | Auto |

Registros A adicionales de GitHub Pages:
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**Nota:** Se usó solo un registro A. Los cuatro registros son recomendados para redundancia pero no obligatorios.

### 3. Activación de GitHub Pages

**Pasos realizados en GitHub:**

1. Ir a **Settings** del repositorio
2. Navegar a **Pages** en el menú lateral
3. Configurar:
   - **Source:** Deploy from a branch
   - **Branch:** master
   - **Folder:** / (root)
4. Agregar dominio personalizado: `jorgez.tech`
5. Habilitar **Enforce HTTPS** (automático tras validación DNS)

### 4. Despliegue

**Commits del proceso:**

```bash
# Commit 1: Mover archivos a la raíz
git add .
git commit -m "Mueve archivos del portfolio a la raíz para GitHub Pages"

# Commit 2: Sincronizar con remoto
git pull origin master --rebase
git push origin master
```

**Hash del commit final:** d810656

### 5. Propagación DNS y Verificación

**Tiempo de propagación:** Aproximadamente 5-10 minutos

**Verificación:**
- URL temporal: `https://jorgez-tech.github.io/pagina_personal/`
- URL final: `https://jorgez.tech/`
- Certificado SSL: Generado automáticamente por GitHub

**Estado:** Despliegue exitoso el 6 de noviembre de 2025

## Desarrollo Local

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git instalado

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Jorgez-tech/pagina_personal.git
cd pagina_personal

# Abrir index.html directamente en el navegador
# O usar Live Server en VS Code
```

### Estructura de Desarrollo

**CSS:**
- Variables CSS para temas claro/oscuro
- Mobile-first approach
- Media queries para responsive design

**JavaScript:**
- Gestión de tema (modo claro/oscuro)
- Navegación móvil
- Animaciones y transiciones

**HTML:**
- Semántico (header, nav, section, article, footer)
- Meta tags para SEO
- Open Graph para redes sociales

## Mantenimiento

### Actualizar Contenido

1. Editar archivos en local
2. Probar cambios en navegador
3. Commit y push a master:
```bash
git add .
git commit -m "Descripción del cambio"
git push origin master
```

4. GitHub Pages se actualizará automáticamente en 1-2 minutos

### Agregar Nuevos Proyectos

1. Agregar imagen en `img/projects/`
2. Editar `index.html` en la sección de proyectos
3. Actualizar estilos si es necesario
4. Desplegar cambios

### Actualizar Estilos

- Modificar `css/style.css`
- Usar variables CSS existentes para mantener consistencia
- Probar en modo claro y oscuro
- Verificar responsive en diferentes dispositivos

## Solución de Problemas

### El sitio no se actualiza

- Verificar que los cambios están en la rama master
- Limpiar caché del navegador (Ctrl + Shift + R)
- Esperar 1-2 minutos para rebuild de GitHub Pages
- Revisar Actions tab en GitHub para ver estado del despliegue

### Dominio personalizado no funciona

- Verificar registros DNS en controlpanel.tech
- Confirmar archivo CNAME en la raíz del repositorio
- Esperar propagación DNS (hasta 48 horas, típicamente minutos)
- Verificar configuración en Settings > Pages

### Certificado SSL no se genera

- Asegurarse de que DNS está propagado correctamente
- Verificar que HTTPS está habilitado en Settings > Pages
- Puede tardar hasta 24 horas después de configurar DNS
- GitHub genera el certificado automáticamente vía Let's Encrypt

## Recursos

- **Repositorio:** https://github.com/Jorgez-tech/pagina_personal
- **Documentación GitHub Pages:** https://docs.github.com/pages
- **Configuración DNS:** https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

## Contacto

Para consultas sobre este proyecto:
- **GitHub:** [@Jorgez-tech](https://github.com/Jorgez-tech)
- **Sitio:** [jorgez.tech](https://jorgez.tech)
