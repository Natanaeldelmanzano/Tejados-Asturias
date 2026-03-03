/*
 * ═══════════════════════════════════════════════════════════════════
 * GENERADOR DE DATOS PARA pages-conversion.json
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Crea el JSON con 45 páginas de conversión:
 * - 5 tipos × 9 ciudades
 * - Contenido único por tipo y ciudad
 * - Palabras clave optimizadas
 * - Estructura HTM específica por tipo
 * 
 * USO: node generate-conversion-data.js
 * SALIDA: src/pages-conversion.json
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

const fs = require('fs');

// Cities
const CITIES = [
    'Oviedo', 'Gijón', 'Avilés', 'Siero', 'Langreo', 'Mieres', 'Castrillón', 'Llanera', 'Corvera'
];

// City data
const CITY_DATA = {
    'Oviedo': { slug: 'oviedo', climate: 'clima oceánico', features: 'Centro, Naranco, Llatana' },
    'Gijón': { slug: 'gijon', climate: 'más lluvioso de Asturias', features: 'Cimadevilla, La Arena, Somió' },
    'Avilés': { slug: 'aviles', climate: 'histórico', features: 'La Luz, Versalles, Centro' },
    'Siero': { slug: 'siero', climate: 'valle interior', features: 'Lugones, Pola, La Fresneda' },
    'Langreo': { slug: 'langreo', climate: 'minería histórica', features: 'Sama, La Felguera, Riaño' },
    'Mieres': { slug: 'mieres', climate: 'interior montañoso', features: 'Mieres del Camino, Figaredo, Turón' },
    'Castrillón': { slug: 'castrillon', climate: 'costero', features: 'Salinas, Piedras Blancas, Arnao' },
    'Llanera': { slug: 'llanera', climate: 'residencial', features: 'Posada, Lugo de Llanera' },
    'Corvera': { slug: 'corvera', climate: 'rural', features: 'Trasona, Nubledo, Cancienes' }
};

// Plantillas de contenido por tipo
const TEMPLATES = {
    goteras: (city, slug) => ({
        id: `reparacion-goteras-${CITY_DATA[city].slug}`,
        slug: `reparacion-goteras-${CITY_DATA[city].slug}`,
        type: 'goteras',
        city: city,
        title: `Reparación de Goteras en ${city} | Urgente 24h ☎️ 693 743 627`,
        metaDescription: `Reparación urgente de goteras en ${city}. Arreglamos goteras en menos de 2 horas. Respuesta inmediata. Presupuesto gratis.`,
        h1: `Reparación de Goteras en ${city} - Nivel Urgente 24h`,
        subtitle: `Solucione sus goteras en ${city} en menos de 2 horas`,
        heroText: `Las goteras en ${city} no esperar. Con nuestro ${CITY_DATA[city].climate}, son emergencias. Respondemos en 2 horas máximo.`,
        breadcrumb: `Inicio > ${city} > Reparación de Goteras`,
        imagen: `/img/goteras-${CITY_DATA[city].slug}.jpg`,
        texto: `<section class='urgencia-goteras'><p><strong>Las goteras en ${city} son emergencias que no pueden esperar.</strong> Cada hora cuenta. Agua penetra en muros, vigas, estructuras. Daño exponencial.</p><p>En Cubiertas David ofrecemos <strong>reparación urgente 24 horas</strong>. Respondemos en menos de 2 horas con técnico local especializado.</p></section><section class='tipos-goteras'><h2>Tipos de goteras en ${city}</h2><p>Goteras por grietas en teja, problemas de canalones, uniones dañadas. Cada una requiere técnica diferente.</p></section><section class='proceso'><h2>Proceso rápido</h2><p><strong>Localización (15 min):</strong> Detectamos exactamente de dónde viene el agua.</p><p><strong>Reparación (30-60 min):</strong> Usamos materiales técnicos apropiados para clima de ${city}.</p><p><strong>Prueba (15 min):</strong> Verificamos con agua que funciona.</p></section><section class='precios'><h2>Precios  reparación urgente ${city}</h2><p><strong>Simple:</strong> 150-250€ (sellado puntual)</p><p><strong>Mediana:</strong> 300-600€ (varias tejas o canalón parcial)</p><p><strong>Mayor:</strong> 600-1.200€ (goteras múltiples)</p><p>Incluye: desplazamiento, localización, reparación, garantía 2 años.</p></section><section class='cta'><h2>¿Goteras en ${city}?</h2><p><a href='tel:+34693743627' class='btn btn-urgent'>📞 LLAMAR AHORA - 693 743 627</a></p></section>`
    }),
    
    presupuesto: (city, slug) => ({
        id: `presupuesto-tejados-${CITY_DATA[city].slug}`,
        slug: `presupuesto-tejados-${CITY_DATA[city].slug}`,
        type: 'presupuesto',
        city: city,
        title: `Presupuesto Tejados ${city} | Gratis sin Compromiso ☎️ 693 743 627`,
        metaDescription: `Presupuesto gratis reformas tejados ${city}. Transparentes sin sorpresas. Empresa local 25+ años. ¡Solicita presupuesto!`,
        h1: `Presupuesto Tejados en ${city} - Transparente y Garantizado`,
        subtitle: `Presupuesto gratis sin compromiso alguno`,
        heroText: `En ${city}, ofrecemos presupuestos únicos: transparencia total, sin letras pequeñas, sin cambios posteriores.`,
        breadcrumb: `Inicio > ${city} > Presupuesto Tejados`,
        imagen: `/img/presupuesto-${CITY_DATA[city].slug}.jpg`,
        texto: `<section class='transparencia'><p><strong>Presupuesto significa confianza.</strong> En Cubiertas David, presupuesto es sagrado. Lo que decimos cuesta, eso cuesta.</p></section><section class='tabla-precios'><h2>Tabla de precios ${city}</h2><table><tr><th>Servicio</th><th>Desde</th></tr><tr><td>Reparación gotera</td><td>150€</td></tr><tr><td>Reforma teja cerámica (m²)</td><td>50€</td></tr><tr><td>Reforma teja mixta (m²)</td><td>60€</td></tr><tr><td>Impermeabilización (m²)</td><td>45€</td></tr><tr><td>Canalón (metros)</td><td>25€</td></tr><tr><td>Aislamiento térmico (m²)</td><td>30€</td></tr></table></section><section class='que-incluye'><h2>¿Qué incluye un presupuesto?</h2><p>Análisis técnico completo, materiales específicos para clima de ${city}, mano de obra cualificada, garantía 10 años.</p></section><section class='cta'><h2>Solicita presupuesto gratuito</h2><p><a href='/contacto.html' class='btn btn-primary'>📨 Pedir Presupuesto Gratis</a></p></section>`
    }),
    
    urgencias: (city, slug) => ({
        id: `urgencias-tejados-${CITY_DATA[city].slug}`,
        slug: `urgencias-tejados-${CITY_DATA[city].slug}`,
        type: 'urgencias',
        city: city,
        title: `Urgencias Tejados ${city} | 24h Fines de Semana ☎️ 693 743 627`,
        metaDescription: `Urgencias tejados en ${city} 24/7. Emergencias goteras fin de semana. Respuesta inmediata. Llama ahora.`,
        h1: `Urgencias Tejados en ${city} - 24h Todos los Días`,
        subtitle: `No cerramos. Emergencias a cualquier hora`,
        heroText: `${city} necesita tejados 24/7. Madrugadas, domingos, festivos. Tu tejado gotea cuando TE TOCA, no cuando nos conviene.`,
        breadcrumb: `Inicio > ${city} > Urgencias Tejados`,
        imagen: `/img/urgencias-${CITY_DATA[city].slug}.jpg`,
        texto: `<section class='disponibilidad'><p><strong>24 HORAS, 7 DÍAS A LA SEMANA.</strong> No cerramos Christmas ni Réveillon. Una gotera no entiende de festivos.</p></section><section class='respuesta'><h2>Respuesta garantizada</h2><p>Técnico en ${city} típicamente en 1-2 horas desde llamada. Incluso de madrugada. Incluso en Navidad.</p></section><section class='tipos-emergencia'><h2>Emergencias que resolvemos 24/7</h2><p><strong>Goteras:</strong> Filtraciones urgentes.</p><p><strong>Desprendimientos:</strong> Tejas o canalones sueltos.</p><p><strong>Roturas:</strong> Daños por temporal.</p><p><strong>Inundaciones:</strong> Agua entrando en casa.</p></section><section class='cta'><h2>Emergencia ahora</h2><p><a href='tel:+34693743627' class='btn btn-urgent btn-lg'>☎️ LLAMAR AHORA - 693 743 627</a></p><p class='badge24'>24h Garantizado - Respuesta en 2 horas</p></section>`
    }),
    
    trabajos: (city, slug) => ({
        id: `trabajos-realizados-${CITY_DATA[city].slug}`,
        slug: `trabajos-realizados-${CITY_DATA[city].slug}`,
        type: 'trabajos',
        city: city,
        title: `Trabajos Realizados ${city} | Portfolio Tejados ☎️ 693 743 627`,
        metaDescription: `Trabajos realizados tejados ${city}. Portfolio 25+ años. Opiniones reales clientes. Reformas integrales garantizadas.`,
        h1: `Trabajos Realizados en ${city} - Portfolio de Confianza`,
        subtitle: `25+ años de reformas integrales garantizadas`,
        heroText: `Más de 300 tejados reparados en ${city}. Cada proyecto cuenta historia. Fotos, clientes satisfechos, garantía que cumple.`,
        breadcrumb: `Inicio > ${city} > Trabajos Realizados`,
        imagen: `/img/trabajos-${CITY_DATA[city].slug}.jpg`,
        texto: `<section class='experiencia'><p><strong>Cubiertas David EN ${city}: 25 años de historia.</strong> Más de 300 tejados reparados. Cada reforma es referencia.</p></section><section class='tipos-trabajos'><h2>Tipo de trabajos que realizamos en ${city}</h2><p><strong>Reformas integrales:</strong> Sustitución completa de cubierta.</p><p><strong>Reparaciones especializadas:</strong> Goteras puntuales, refuerzos.</p><p><strong>Rehabilitación histórica:</strong> Respeto al patrimonio.</p></section><section class='zonas'><h2>Zonas de ${city} donde hemos trabajado</h2><p>${CITY_DATA[city].features}</p></section><section class='garantia'><h2>Garantía en cada trabajo</h2><p><strong>10 años</strong> en reformas integrales. <strong>2 años</strong> en reparaciones. Escrito. Cumplido.</p></section><section class='cta'><h2>Ver más trabajos</h2><p><a href='/trabajos-realizados.html' class='btn btn-primary'>Ver Portfolio Completo</a></p></section>`
    }),
    
    precios: (city, slug) => ({
        id: `precios-reforma-tejado-${CITY_DATA[city].slug}`,
        slug: `precios-reforma-tejado-${CITY_DATA[city].slug}`,
        type: 'precios',
        city: city,
        title: `Precios Reforma Tejado ${city} | Tabla Completa ☎️ 693 743 627`,
        metaDescription: `Precios reforma tejado ${city}. Tabla completa con m². Presupuesto gratis. Transparencia total. ¡Consulta!`,
        h1: `Precios Reforma Tejado en ${city} - Tabla Completa`,
        subtitle: `Precios por metro cuadrado sin sorpresas`,
        heroText: `En ${city}, los precios de tejados varían según material, complejidad, acceso. Te damos tabla completa para que entiendas.`,
        breadcrumb: `Inicio > ${city} > Precios Reforma`,
        imagen: `/img/precios-${CITY_DATA[city].slug}.jpg`,
        texto: `<section class='intro-precios'><p><strong>Transparencia en precios es nuestro compromiso.</strong> Tabla completa, sin letras pequeñas, sin sorpresas.</p></section><section class='tabla-completa'><h2>Tabla completa precios ${city}</h2><table><tr><th>Material</th><th>€/m²</th><th>Incluye</th></tr><tr><td>Teja Cerámica</td><td>50-70€</td><td>Materiales + mano + garantía</td></tr><tr><td>Teja Mixta</td><td>55-75€</td><td>Materiales + mano + garantía</td></tr><tr><td>Pizarra Natural</td><td>90-120€</td><td>Pizarra asturiana + mano</td></tr><tr><td>EPDM (Imperm.)</td><td>40-55€</td><td>Material + aplicación</td></tr><tr><td>Aislamiento</td><td>25-35€</td><td>Lana roca o poliuretano</td></tr><tr><td>Panel Sándwich</td><td>35-50€</td><td>Instalación completa</td></tr></table></section><section class='factores-precio'><h2>Factores que afectan precio en ${city}</h2><p><strong>Material elegido:</strong> Teja vs pizarra vs EPDM.</p><p><strong>Estado actual:</strong> Reforma desde cero vs reparación.</p><p><strong>Accesibilidad:</strong> Fácil acceso baja precio, difícil sube precio.</p><p><strong>Complejidad:</strong> Tejado simple vs volumetrías complejas.</p><p><strong>Aislamiento:</strong> Incluir o no aislamiento térmico.</p></section><section class='cta'><h2>¿Cuánto cuesta tu tejado?</h2><p><a href='/contacto.html' class='btn btn-primary'>Presupuesto Personalizado</a></p></section>`
    })
};

// Generar todas las páginas
const pages = [];

CITIES.forEach(city => {
    // Tipo Goteras
    pages.push(TEMPLATES.goteras(city, CITY_DATA[city].slug));
    // Tipo Presupuesto
    pages.push(TEMPLATES.presupuesto(city, CITY_DATA[city].slug));
    // Tipo Urgencias
    pages.push(TEMPLATES.urgencias(city, CITY_DATA[city].slug));
    // Tipo Trabajos
    pages.push(TEMPLATES.trabajos(city, CITY_DATA[city].slug));
    // Tipo Precios
    pages.push(TEMPLATES.precios(city, CITY_DATA[city].slug));
});

// Guardar JSON
const outputPath = './src/pages-conversion.json';
fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2), 'utf8');

console.log(`\n✅ Archivo ${outputPath} generado`);
console.log(`📊 Total páginas creadas: ${pages.length}`);
console.log(`   • Goteras: ${CITIES.length}`);
console.log(`   • Presupuesto: ${CITIES.length}`);
console.log(`   • Urgencias: ${CITIES.length}`);
console.log(`   • Trabajos: ${CITIES.length}`);
console.log(`   • Precios: ${CITIES.length}\n`);
