# Quick Start - Sistema RAG Portfolio

## Deployment en 5 Minutos

### Paso 1: API Key (2 min)
```bash
# Opcion A: OpenAI (~$0.50/mes)
https://platform.openai.com/api-keys
- Crear cuenta - "Create new secret key" - Copiar key

# Opcion B: Groq (GRATIS)
https://console.groq.com
- Crear cuenta - "API Keys" - "Create" - Copiar key
```

### Paso 2: Deploy en Vercel (2 min)
```bash
# 1. Login en Vercel con GitHub
https://vercel.com/login

# 2. Import proyecto
- "Add New Project"
- Buscar "pagina_personal"
- "Import"

# 3. Agregar API Key
- Settings - Environment Variables
- Name: OPENAI_API_KEY (o GROQ_API_KEY)
- Value: [pegar tu key]
- Environments: [OK] Todos
- "Save"

# 4. Redeploy
- Deployments - "..." - "Redeploy"
```

### Paso 3: Verificar (1 min)
```bash
# Abrir tu sitio
https://tu-proyecto.vercel.app

# Click en el boton
# Escribir: "Muestrame tus repositorios"

[OK] Funciona si ves respuesta con enlaces a GitHub
```

---

## Documentacion Completa

Si necesitas mas detalles:

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Guia paso a paso con screenshots
- **[RAG_README.md](RAG_README.md)** - Documentacion tecnica completa
- **[ENV_SETUP.md](ENV_SETUP.md)** - Configuracion de variables de entorno
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Resumen tecnico

---

## Problemas Comunes

### "API Key no configurada"
- Verificar variable en Vercel - Redesplegar

### Chat no aparece
- F12 (Console) - Ver errores - Contactar soporte

### Error 429
- Rate limit (10 msg/min) - Esperar 1 minuto

---

## Que hace este sistema?

- **Chat inteligente** en tu portfolio
- **Consulta GitHub en tiempo real** (tus repos, READMEs, stats)
- **Respuestas con IA** (OpenAI o Groq)
- **Costo minimo** (~$0.50/mes o gratis)
- **100% responsive** (movil, tablet, desktop)

---

**Listo! Sistema funcional en menos de 5 minutos.**
