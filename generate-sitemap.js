/*
 * ═══════════════════════════════════════════════════════════════════
 * GENERADOR DE SITEMAP.XML
 * Crea automáticamente el sitemap para Google basado en las 75 páginas
 * ═══════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
    DOMAIN: 'https://www.cubiertasdavid.com',
    DIST_DIR: './dist',
    OUTPUT: './public/sitemap.xml'
};

// Función para leer archivos HTML en dist/
function getHtmlFiles(dir) {
    try {
        const files = fs.readdirSync(dir).filter(file => file.endsWith('.html'));
        return files.map(file => file.replace('.html', ''));
    } catch (error) {
        console.error('❌ Error leyendo directorio:', error.message);
        return [];
    }
}

// Función para generar sitemap XML
function generateSitemap() {
    console.log('\n🗺️  GENERADOR DE SITEMAP.XML\n');
    console.log('═'.repeat(70));

    const pages = getHtmlFiles(CONFIG.DIST_DIR);
    
    if (pages.length === 0) {
        console.error('❌ No se encontraron archivos HTML en dist/');
        process.exit(1);
    }

    console.log(`\n📄 Se encontraron ${pages.length} páginas`);

    // Prioridades según tipo de página
    function getPriority(slug) {
        if (slug === 'index') return '1.0';
        if (slug.includes('goteras') || slug.includes('urgencias')) return '0.9';
        if (slug.includes('presupuesto') || slug.includes('precios')) return '0.9';
        if (slug.startsWith('tejados-')) return '0.8';
        if (slug.includes('trabajos')) return '0.7';
        return '0.6';
    }

    // Frecuencia de cambio según tipo
    function getChangeFreq(slug) {
        if (slug === 'index') return 'weekly';
        if (slug.includes('trabajos') || slug.includes('blog')) return 'monthly';
        if (slug.includes('precios')) return 'weekly';
        return 'monthly';
    }

    // Generar URLs del sitemap
    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    pages.forEach((slug, index) => {
        const url = slug === 'index' ? CONFIG.DOMAIN : `${CONFIG.DOMAIN}/${slug}`;
        const priority = getPriority(slug);
        const changefreq = getChangeFreq(slug);
        const lastmod = new Date().toISOString().split('T')[0];

        sitemapXml += `  <url>\n`;
        sitemapXml += `    <loc>${url}</loc>\n`;
        sitemapXml += `    <lastmod>${lastmod}</lastmod>\n`;
        sitemapXml += `    <changefreq>${changefreq}</changefreq>\n`;
        sitemapXml += `    <priority>${priority}</priority>\n`;
        sitemapXml += `  </url>\n`;

        if ((index + 1) % 10 === 0) {
            console.log(`   ✅ Procesadas ${index + 1} páginas...`);
        }
    });

    sitemapXml += '</urlset>';

    // Crear carpeta public si no existe
    const publicDir = './public';
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
        console.log('\n📁 Carpeta /public creada');
    }

    // Escribir archivo
    fs.writeFileSync(CONFIG.OUTPUT, sitemapXml, 'utf-8');
    console.log(`\n✅ Sitemap.xml generado: ${CONFIG.OUTPUT}`);
    console.log(`📊 Total de URLs: ${pages.length}`);
    console.log('\n═'.repeat(70));
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Sube el sitemap a Google Search Console');
    console.log('   2. URL: https://www.cubiertasdavid.com/sitemap.xml');
    console.log('   3. Verifica rastreo e indexación en GSC\n');
}

generateSitemap();
