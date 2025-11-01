# Portfolio para Abogado

Sitio estático (HTML/CSS/JS) optimizado para estudios jurídicos y abogados independientes.

## Vista previa local

```powershell path=null start=null
# Opción 1 (Python)
python -m http.server 8000 -d .
```

```powershell path=null start=null
# Opción 2 (Node)
npx serve . -l 8000
```

## Despliegue recomendado (Chile)

- GitHub Pages: simple y gratuito para sitios estáticos.
- Netlify o Vercel: CI/CD, HTTPS automático, formularios/redirects.
- Hosting en Chile (mejor latencia): Hostinger Chile, WebHosting Chile, ChileHosting.
- Dominio .cl: regístralo en NIC Chile y apunta DNS a tu proveedor.

## Personalización rápida

- Edita `index.html` (nombre, servicios, casos, contacto).
- Cambia colores en `css/style.css` (variables `--primary`, `--secondary`).
- Integra el formulario en `js/main.js` (Formspree/EmailJS o tu backend).
