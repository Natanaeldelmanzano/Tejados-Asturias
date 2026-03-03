/*
 * ═══════════════════════════════════════════════════════════════════
 * GENERADOR DE PÁGINAS DE CONVERSIÓN - CUBIERTAS DAVID
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Genera 45 páginas de alta conversión:
 * - 5 tipos de páginas × 9 ciudades
 * - Contenido único 1,200-1,500 palabras por página
 * - Schema.org específico por tipo
 * - Canonical URLs y breadcrumbs dinámicos
 * 
 * TIPOS:
 * 1. GOTERAS (reparacion-goteras-[ciudad].html)
 * 2. PRESUPUESTO (presupuesto-tejados-[ciudad].html)
 * 3. URGENCIAS (urgencias-tejados-[ciudad].html)
 * 4. TRABAJOS (trabajos-realizados-[ciudad].html)
 * 5. PRECIOS (precios-reforma-tejado-[ciudad].html)
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════════

const CONFIG = {
    SRC_DIR: './src',
    DIST_DIR: './dist',
    
    PAGES_DATA: './src/pages-conversion.json',
    TEMPLATE: './src/template.html',
    HEADER: './src/header.html',
    FOOTER: './src/footer.html',
    FORM: './src/form.html',
    CAROUSEL: './src/carousel.html',
    SERVICIOS_CONVERSION: './src/servicios-conversion.html',
    
    BUSINESS: {
        name: 'Cubiertas David',
        phone: '693 743 627',
        phoneLink: '+34693743627',
        email: 'cubiertasdavidoviedo@gmail.com',
        whatsapp: '34693743627',
        domain: 'https://www.cubiertasdavid.com'
    }
};

// ═══════════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES
// ═══════════════════════════════════════════════════════════════════

function readFile(filepath) {
    try {
        return fs.readFileSync(filepath, 'utf8');
    } catch (error) {
        console.error(`❌ Error leyendo ${filepath}:`, error.message);
        process.exit(1);
    }
}

function replaceVariables(html, data) {
    let result = html;
    
    const fieldMapping = {
        'title': 'TITLE',
        'metaDescription': 'META_DESC',
        'h1': 'H1',
        'subtitle': 'SUBTITLE',
        'heroText': 'HERO_TEXT',
        'breadcrumb': 'BREADCRUMB',
        'texto': 'TEXTO',
        'imagen': 'IMAGEN',
        'imagenAlt': 'IMAGEN_ALT',
        'slug': 'SLUG'
    };
    
    Object.keys(data).forEach(key => {
        const templateKey = fieldMapping[key] || key.toUpperCase();
        const value = data[key];
        
        if (value !== undefined && value !== null) {
            const regex = new RegExp(`{{${templateKey}}}`, 'g');
            result = result.replace(regex, value);
        }
    });
    
    const b = CONFIG.BUSINESS;
    result = result
        .replace(/{{BUSINESS_NAME}}/g, b.name)
        .replace(/{{PHONE}}/g, b.phone)
        .replace(/{{PHONE_LINK}}/g, b.phoneLink)
        .replace(/{{EMAIL}}/g, b.email)
        .replace(/{{WHATSAPP}}/g, b.whatsapp)
        .replace(/{{ADDRESS_STREET}}/g, 'Calle Río Orle 1')
        .replace(/{{ADDRESS_POSTAL}}/g, '33010')
        .replace(/{{ADDRESS_LOCALITY}}/g, 'Oviedo')
        .replace(/{{ADDRESS_REGION}}/g, 'Asturias');
    
    return result;
}

// ═══════════════════════════════════════════════════════════════════
// SCHEMA.ORG ESPECÍFICO POR TIPO DE PÁGINA
// ═══════════════════════════════════════════════════════════════════

function generateConversionSchema(pageData) {
    const b = CONFIG.BUSINESS;
    const canonical = `${b.domain}/${pageData.slug}`;
    
    // Base RoofingContractor
    const roofingContractor = {
        "@context": "https://schema.org",
        "@type": "RoofingContractor",
        "@id": `${b.domain}/#organization`,
        "name": b.name,
        "telephone": b.phoneLink,
        "url": b.domain
    };
    
    // Breadcrumb
    const breadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": b.domain },
            { "@type": "ListItem", "position": 2, "name": pageData.city, "item": `${b.domain}/${pageData.city.toLowerCase()}` },
            { "@type": "ListItem", "position": 3, "name": pageData.h1, "item": canonical }
        ]
    };
    
    // Schema específico por tipo
    let typeSchema = null;
    
    if (pageData.type === 'goteras') {
        typeSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `Reparacion Urgente de Goteras en ${pageData.city}`,
            "provider": { "@id": `${b.domain}/#organization` },
            "areaServed": { "@type": "City", "name": pageData.city },
            "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceRange": "€150-€1200",
                "priceCurrency": "EUR"
            }
        };
    } else if (pageData.type === 'presupuesto') {
        typeSchema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Presupuesto Tejados ${pageData.city} - Cubiertas David`,
            "url": canonical,
            "priceRange": "Consultar",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Presupuesto Tejados",
                "itemListElement": [
                    { "@type": "Offer", "name": "Reforma de Tejado", "price": "Desde €2500" },
                    { "@type": "Offer", "name": "Reparación", "price": "Desde €150" },
                    { "@type": "Offer", "name": "Impermeabilización", "price": "Desde €1500" }
                ]
            }
        };
    } else if (pageData.type === 'urgencias') {
        typeSchema = {
            "@context": "https://schema.org",
            "@type": "EmergencyService",
            "name": `Urgencias Tejados ${pageData.city} - 24h`,
            "areaServed": { "@type": "City", "name": pageData.city },
            "availableLanguage": "es",
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Emergency Service",
                "telephone": b.phoneLink,
                "availableLanguage": "es"
            }
        };
    } else if (pageData.type === 'trabajos') {
        typeSchema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Trabajos Realizados ${pageData.city} - Cubiertas David`,
            "url": canonical,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.9,
                "ratingCount": 47
            }
        };
    } else if (pageData.type === 'precios') {
        typeSchema = {
            "@context": "https://schema.org",
            "@type": "PriceSpecification",
            "currency": "EUR",
            "priceCurrency": "EUR",
            "description": `Tabla precios reformas tejados ${pageData.city}`
        };
    }
    
    let allSchemas = `
        <script type="application/ld+json">
        ${JSON.stringify(roofingContractor, null, 2)}
        </script>
        <script type="application/ld+json">
        ${JSON.stringify(breadcrumbs, null, 2)}
        </script>`;
    
    if (typeSchema) {
        allSchemas += `
        <script type="application/ld+json">
        ${JSON.stringify(typeSchema, null, 2)}
        </script>`;
    }
    
    return allSchemas;
}

// ═══════════════════════════════════════════════════════════════════
// CANONICAL URL
// ═══════════════════════════════════════════════════════════════════

function generateCanonical(pageData) {
    const canonical = `${CONFIG.BUSINESS.domain}/${pageData.slug}`;
    return `<link rel="canonical" href="${canonical}">`;
}

// ═══════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

function generateConversionPages() {
    console.log('\n🎯 GENERADOR DE PÁGINAS DE CONVERSIÓN\n');
    console.log('═'.repeat(70));
    
    console.log('\n📖 Leyendo plantillas...');
    const template = readFile(CONFIG.TEMPLATE);
    const header = readFile(CONFIG.HEADER);
    const footer = readFile(CONFIG.FOOTER);
    const form = readFile(CONFIG.FORM);
    const carousel = readFile(CONFIG.CAROUSEL);
    const serviciosConversion = readFile(CONFIG.SERVICIOS_CONVERSION);
    console.log('   ✅ Plantillas cargadas');
    
    console.log('\n📋 Leyendo datos de páginas de conversión...');
    const pagesData = JSON.parse(readFile(CONFIG.PAGES_DATA));
    console.log(`   ✅ ${pagesData.length} páginas de conversión para generar`);
    
    console.log('\n🔨 Generando páginas de conversión...\n');
    
    let successCount = 0;
    let typeCount = {};
    
    pagesData.forEach((page, index) => {
        try {
            let html = template;
            
            // Incluir componentes
            html = html
                .replace('{{HEADER}}', header)
                .replace('{{FOOTER}}', footer)
                .replace('{{FORM}}', form)
                .replace('{{CAROUSEL}}', carousel)
                .replace('{{SERVICIOS_CONVERSION}}', serviciosConversion);
            
            // Schema específico para conversión
            const schema = generateConversionSchema(page);
            html = html.replace('{{SCHEMA}}', schema);
            
            // Canonical URL
            const canonical = generateCanonical(page);
            html = html.replace('{{CANONICAL}}', canonical);
            
            // Reemplazar variables
            html = replaceVariables(html, page);
            html = html.replace(/{{YEAR}}/g, new Date().getFullYear());
            
            // Escribir archivo
            const filename = `${page.slug}.html`;
            const filepath = path.join(CONFIG.DIST_DIR, filename);
            fs.writeFileSync(filepath, html, 'utf8');
            
            const progress = `[${index + 1}/${pagesData.length}]`;
            const schemas = schema.split('<script').length - 1;
            const typeLabel = page.type.toUpperCase();
            
            console.log(`   ✅ ${progress} ${filename} (${typeLabel} - ${schemas} schemas)`);
            
            // Contabilizar por tipo
            typeCount[page.type] = (typeCount[page.type] || 0) + 1;
            successCount++;
            
        } catch (error) {
            console.error(`   ❌ Error: ${page.slug}`, error.message);
        }
    });
    
    console.log('\n' + '═'.repeat(70));
    console.log('\n📊 RESUMEN DE GENERACIÓN:\n');
    console.log(`   ✅ Páginas generadas: ${successCount}`);
    
    Object.keys(typeCount).sort().forEach(type => {
        console.log(`      • ${type.toUpperCase()}: ${typeCount[type]} páginas`);
    });
    
    console.log(`\n✨ Características implementadas:`);
    console.log(`   ✅ Contenido único por tipo y ciudad`);
    console.log(`   ✅ Schema.org específico por tipo de conversión`);
    console.log(`   ✅ Canonical URLs dinámicos`);
    console.log(`   ✅ Breadcrumbs contextuales`);
    console.log(`   ✅ Keywords integrados naturalmente`);
    
    console.log(`\n📁 Archivos generados en: ${CONFIG.DIST_DIR}/`);
    console.log('\n✅ ¡GENERACIÓN DE PÁGINAS DE CONVERSIÓN COMPLETADA!\n');
    console.log('═'.repeat(70));
    console.log('\n💡 PRÓXIMOS PASOS:');
    console.log('   1. Crear interlinking-config.json');
    console.log('   2. Crear insert-links.js (automatizar interlinking)');
    console.log('   3. Validar enlaces y contenido');
    console.log('   4. Análisis SEO de páginas generadas\n');
}

// ═══════════════════════════════════════════════════════════════════
// EJECUTAR
// ═══════════════════════════════════════════════════════════════════

generateConversionPages();
