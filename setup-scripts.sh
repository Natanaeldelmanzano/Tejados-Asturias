#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# UPDATE NPM SCRIPTS
# Agrega scripts de generación rápida a package.json
# ═══════════════════════════════════════════════════════════════════

echo "📦 Actualizando package.json con scripts de generación..."

# Función para actualizar package.json
npm set-script generate "node generate.js && node generate-conversion.js && node generate-sitemap.js && node insert-links.js"
npm set-script generate:data "node generate-conversion-data.js"
npm set-script serve "python -m http.server 8000 --directory dist"
npm set-script clean "rm -rf dist/*.html"

echo ""
echo "✅ Scripts agregados a package.json"
echo ""
echo "Scripts disponibles:"
echo "  npm run generate      → Genera todas las 75 páginas"
echo "  npm run generate:data → Regenera pages-conversion.json"
echo "  npm run serve        → Inicia servidor en localhost:8000"
echo "  npm run clean        → Limpia archivos HTML generados"
echo ""
