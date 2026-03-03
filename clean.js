/*
 * ═══════════════════════════════════════════════════════════════════
 * SCRIPT DE LIMPIEZA - CUBIERTASDAVID.COM
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ¿QUÉ HACE ESTE SCRIPT?
 * ----------------------
 * Elimina todos los archivos .html de la carpeta /dist/
 * antes de generar páginas nuevas.
 * 
 * Esto es útil si:
 * - Eliminaste páginas del pages.json (para que no queden huérfanas)
 * - Cambiaste nombres de archivos
 * - Quieres empezar limpio
 * 
 * USO:
 * ----
 * node clean.js
 * 
 * O usa el script completo:
 * npm run build   (limpia + genera)
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = './dist';

console.log('\n🧹 LIMPIANDO CARPETA /dist/...\n');

// Verificar si la carpeta existe
if (!fs.existsSync(DIST_DIR)) {
    console.log('   ℹ️  La carpeta /dist/ no existe. No hay nada que limpiar.\n');
    process.exit(0);
}

// Leer todos los archivos de /dist/
const files = fs.readdirSync(DIST_DIR);

// Filtrar solo archivos .html
const htmlFiles = files.filter(file => file.endsWith('.html'));

if (htmlFiles.length === 0) {
    console.log('   ℹ️  No hay archivos HTML para eliminar.\n');
    process.exit(0);
}

// Eliminar cada archivo HTML
let deletedCount = 0;

htmlFiles.forEach(file => {
    const filepath = path.join(DIST_DIR, file);
    try {
        fs.unlinkSync(filepath);
        console.log(`   🗑️  Eliminado: ${file}`);
        deletedCount++;
    } catch (error) {
        console.error(`   ❌ Error eliminando ${file}:`, error.message);
    }
});

console.log(`\n✅ Limpieza completada: ${deletedCount} archivos eliminados\n`);

/*
 * NOTA IMPORTANTE:
 * ---------------
 * Este script NO elimina las carpetas css/, js/, img/ dentro de /dist/
 * Solo elimina archivos .html
 * 
 * Si quieres eliminar TODO el contenido de /dist/, ejecuta:
 * rm -rf dist/*   (Linux/Mac)
 * rmdir /s /q dist   (Windows)
 */
