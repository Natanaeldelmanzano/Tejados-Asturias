# 🏗️ CUBIERTAS DAVID - SEO-OPTIMIZED STATIC SITE GENERATOR

> Sistema profesional de generación automática de 75 páginas HTML optimizadas para SEO + Google E-E-A-T

**Empresa:** Cubiertas David (Reparación de tejados, Asturias, España)  
**Tech Stack:** Node.js + JSON + HTML5 + Schema.org + Vanilla JavaScript  
**Pages:** 75 (30 originales + 45 conversiones)  
**Status:** ✅ Producción Ready

---

## 🎯 Resumen

Un **Static Site Generator (SSG)** que genera automáticamente 75 páginas HTML totalmente optimizadas para Google, con:

- ✅ 75 páginas HTML automáticas
- ✅ Schema.org completo (225+ schemas)
- ✅ 68 enlaces estratégicos
- ✅ Responsive design
- ✅ Sitemap.xml + robots.txt
- ✅ Google E-E-A-T optimizado
- ✅ Core Web Vitals cumplidos

---

## 🚀 Inicio Rápido (3 pasos)

```bash
# 1. Instalar
npm install

# 2. Generar 75 páginas
npm run generate

# 3. Servir localmente
npm run serve
# → http://localhost:8000
```

---

## 📁 Estructura de Carpetas

```
Cubiertas David/
│
├── src/                     ← EDITA AQUÍ
│   ├── template.html        # Principal (todas 75 páginas)
│   ├── header.html          # Navegación
│   ├── footer.html          # Contacto + links
│   ├── form.html            # Formulario Web3Forms
│   ├── carousel.html        # Carrusel 9 ciudades
│   ├── servicios-conversion.html  # Hub interactivo
│   ├── pages.json           # 30 páginas
│   ├── pages-conversion.json  # 45 páginas (auto)
│   └── interlinking-config.json  # Enlaces
│
├── dist/                    ← SE GENERA AQUÍ
│   ├── *.html (75 archivos)
│   ├── sitemap.xml
│   └── robots.txt
│
├── public/                  ← Assets estáticos
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.json
│   └── favicon.ico
│
├── docs/                    ← DOCS COMPLETAS
│   ├── SETUP.md             # Instalación
│   ├── ARCHITECTURE.md      # Técnica
│   ├── GUIA-SEO-E-E-A-T.md  # SEO
│   └── checklists/
│       ├── pre-launch.md    # 152 checks
│       └── post-launch.md   # 30-90 días
│
├── generate.js              # 30 páginas
├── generate-conversion.js   # 45 páginas
├── generate-sitemap.js      # Sitemap
├── insert-links.js          # Enlaces
├── package.json
└── README.md
```

---

## 📊 Páginas Generadas

### 30 Páginas Originales
- Home (1)
- Servicios (8): goteras, impermeabilización, etc.
- Zonas (9): Oviedo, Gijón, Avilés, etc.
- Legales (5): privacidad, cookies, aviso-legal, etc.
- Especiales (2)

### 45 Páginas Conversión
**5 tipos × 9 ciudades** = 45 páginas
- GOTERAS: "Reparación de goteras en [Ciudad]"
- PRESUPUESTO: "Presupuesto de tejado en [Ciudad]"
- URGENCIAS: "Emergencias 24h en [Ciudad]"
- TRABAJOS: "Trabajos realizados en [Ciudad]"
- PRECIOS: "Precios en [Ciudad]"

**Total: 75 páginas SEO-optimizadas**

---

## 💻 Comandos NPM

```bash
npm run generate       # Todas 75 páginas en 10s
npm run generate:data  # Regenerar datos
npm run serve         # Servidor localhost:8000
npm run  dev          # Generate + mensaje
npm run build         # Limpia + genera
npm run clean         # Elimina dist/
```

---

## 🔍 SEO & Indexación

### Schema.org Implementado
Cada página incluye automáticamente:
- **RoofingContractor** (empresa)
- **BreadcrumbList** (navegación)
- **Service** (servicio específico)
- **AggregateRating** (4.9★/5)

### Archivos de Rastreo
- `sitemap.xml`: 75 URLs con prioridades
- `robots.txt`: Control de rastreo
- Meta tags: Title, description, canonical, og, twitter

### Validación
✅ Google Rich Results Test  
✅ Schema.org Validator  
✅ W3C HTML Validator  

---

## 📖 Documentación

| Documento | Contenido |
|-----------|-----------|
| **[SETUP.md](docs/SETUP.md)** | Instalación, troubleshooting |
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** | Sistema técnico |
| **[GUIA-SEO-E-E-A-T.md](docs/GUIA-SEO-E-E-A-T.md)** | SEO completo |
| **[pre-launch.md](docs/checklists/pre-launch.md)** | 152 checks |
| **[post-launch.md](docs/checklists/post-launch.md)** | 30-90 días |

---

## 💼 Información Empresa

**Nombre:** Cubiertas David  
**Teléfono:** +34 693 743 627  
**Email:** cubiertasdavidoviedo@gmail.com  
**Dirección:** Calle Río Orle 1, 33010 Oviedo, Asturias  
**Experiencia:** 25+ años  
**Rating:** 4.9★/5 (47+ reviews)  
**Horario:** Lun-Vie 8-20, Sáb 9-14, 24/7 emergencias

---

## 📝 Editar Contenido Rápidamente

### Cambiar info empresa
`generate.js` línea ~20 → Regenerar

### Nueva página original
Agregar entrada en `pages.json` → Regenerar

### Cambiar header/footer
Editar `src/header.html` o `footer.html` → Regenerar automáticamente en 75 páginas

### Nueva ciudad
Agregar en `generate-conversion-data.js` → `npm run generate:data` → Regenerar

---

## 🚀 Deployment

### Cloudflare Pages (Gratis - Recomendado)
```bash
git push  # → Automático CI/CD
```

### VPS/Servidor Apache
```bash
scp -r dist/* usuario@servidor:/var/www/cubiertasdavid/
```

### Google Search Console
```
1. Crear propiedad
2. Verificar
3. Enviar sitemap.xml
4. Monitorear cobertura
```

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Páginas | 75 |
| Schemas | 225+ |
| Enlaces | 68 |
| Ciudades | 9 |
| Contenido | 35,000+ palabras |
| Componentes | 6 reutilizables |

---

## ✨ Status

| Componente | Status |
|-----------|--------|
| Generador 30 pág | ✅ |
| Generador 45 pág | ✅ |
| Interlinking 68 | ✅ |
| Schema.org 225+ | ✅ |
| Responsive | ✅ |
| E-E-A-T | ✅ |
| Indexable | ✅ |
| Sitemap | ✅ |
| Documentación | ✅ |
| Go Live Ready | ✅ |

---

**Versión:** 2.0.0  
**Status:** Producción ✅  
**Última actualización:** 2024
