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
        title: `Presupuesto Tejados ${city} 2026 | Gratis y Sin Compromiso ☎️ 693 743 627`,
        metaDescription: `Solicita presupuesto gratuito para tejados en ${city}. Cubiertas David — técnico local, visita gratis, respuesta en 2 horas. Sin sorpresas, precio cerrado.`,
        h1: `Presupuesto de Tejados en ${city} — Gratis, Transparente y Sin Letra Pequeña`,
        subtitle: `Visita gratuita a domicilio · Presupuesto cerrado · Sin sorpresas`,
        heroText: `En Cubiertas David damos presupuestos que se cumplen. Visitamos tu propiedad en ${city} sin coste, analizamos el tejado y te entregamos un precio cerrado por escrito. Lo que pone en el papel, eso pagas.`,
        breadcrumb: `Inicio > ${city} > Presupuesto Tejados`,
        imagen: `/img/presupuesto-${CITY_DATA[city].slug}.jpg`,
        texto: `<section class='intro-presupuesto'>
<p><strong>Pedir presupuesto para un tejado en ${city} no debería ser complicado.</strong> En Cubiertas David lo hemos simplificado al máximo: nos llamas, vamos a tu casa, analizamos el tejado y te damos un precio cerrado por escrito. Sin visitas previas de pago, sin estimaciones telefónicas que luego suben, sin sorpresas.</p>
<p>Trabajamos en ${city} y todo el concejo desde hace más de 25 años. Conocemos el clima, los materiales que aguantan y los que no, y los precios reales del mercado asturiano.</p>
</section>

<section class='como-funciona'>
<h2>¿Cómo funciona pedir presupuesto con Cubiertas David?</h2>
<h3>Paso 1 — Nos llamas o escribes (5 minutos)</h3>
<p>Llama al <strong>693 743 627</strong> o rellena el formulario. Nos cuentas brevemente el problema o la reforma que necesitas. No hace falta que sepas el tipo de teja ni las medidas — para eso vamos nosotros.</p>
<h3>Paso 2 — Visita gratuita a tu tejado (sin coste)</h3>
<p>Un técnico se desplaza a tu domicilio en ${city} de forma totalmente gratuita. Inspeccionamos el tejado completo: estado de tejas, estructura, canalones, impermeabilización y puntos débiles. Tardamos entre 30 y 60 minutos.</p>
<h3>Paso 3 — Presupuesto cerrado por escrito</h3>
<p>En 24-48 horas recibes el presupuesto detallado: materiales, mano de obra, plazo de ejecución y garantía. <strong>Precio cerrado</strong> — lo que pone en el presupuesto es lo que pagas, aunque surjan imprevistos menores.</p>
<h3>Paso 4 — Decides sin presión</h3>
<p>El presupuesto tiene validez de 30 días. No hay ninguna obligación de aceptar. Si tienes dudas o quieres comparar con otra empresa, adelante — confiamos en nuestros precios y calidad.</p>
</section>

<section class='tabla-precios-completa'>
<h2>Tabla de Precios Orientativos — Tejados en ${city}</h2>
<p>Estos son precios medios para ${city} en 2026. El presupuesto final depende del estado actual, accesibilidad y materiales elegidos. La visita gratuita es para darte el precio exacto.</p>
<table class='precios-tabla'>
<thead><tr><th>Servicio</th><th>Precio orientativo</th><th>Incluye</th></tr></thead>
<tbody>
<tr><td>Reparación de gotera puntual</td><td>150 – 350 €</td><td>Desplazamiento, localización, sellado, garantía 2 años</td></tr>
<tr><td>Reforma teja cerámica</td><td>50 – 65 €/m²</td><td>Retirada teja antigua, colocación nueva, impermeabilización base</td></tr>
<tr><td>Reforma teja mixta</td><td>55 – 75 €/m²</td><td>Materiales + mano de obra + limpieza</td></tr>
<tr><td>Tejado de pizarra natural</td><td>90 – 130 €/m²</td><td>Pizarra asturiana + estructura + acabados</td></tr>
<tr><td>Impermeabilización cubierta plana</td><td>40 – 60 €/m²</td><td>Membrana EPDM o lámina bituminosa + garantía 10 años</td></tr>
<tr><td>Instalación canalones aluminio</td><td>20 – 35 €/metro</td><td>Canalón continuo sin juntas + bajantes</td></tr>
<tr><td>Aislamiento térmico bajo cubierta</td><td>25 – 40 €/m²</td><td>Lana de roca o poliuretano proyectado</td></tr>
<tr><td>Panel sándwich industrial</td><td>35 – 55 €/m²</td><td>Panel + instalación + remates</td></tr>
<tr><td>Limpieza de musgo + tratamiento</td><td>8 – 15 €/m²</td><td>Limpieza a presión + tratamiento fungicida preventivo</td></tr>
</tbody>
</table>
<p class='nota-precios'><em>Precios sin IVA. El IVA aplicable es del 10% para obras de rehabilitación en vivienda habitual.</em></p>
</section>

<section class='que-incluye-presupuesto'>
<h2>¿Qué incluye exactamente el presupuesto?</h2>
<ul>
<li><strong>Análisis técnico completo:</strong> Inspeccionamos toda la cubierta, no solo el punto visible del problema.</li>
<li><strong>Materiales especificados:</strong> Indicamos marca, referencia y calidad de cada material.</li>
<li><strong>Mano de obra cualificada:</strong> Equipo propio, no subcontratas. Los mismos técnicos siempre.</li>
<li><strong>Plazo de ejecución:</strong> Fecha de inicio y duración estimada de los trabajos.</li>
<li><strong>Garantía por escrito:</strong> 10 años en reformas integrales, 2 años en reparaciones.</li>
<li><strong>Sin costes ocultos:</strong> El desplazamiento, la inspección y la elaboración del presupuesto son gratuitos.</li>
</ul>
</section>

<section class='zonas-${CITY_DATA[city].slug}'>
<h2>Zonas de ${city} donde Realizamos Presupuestos</h2>
<p>Nos desplazamos a cualquier punto de ${city} y municipios limítrofes sin coste adicional. Si tienes dudas de si llegamos a tu zona, llama al 693 743 627 y te confirmamos en el momento.</p>
</section>

<section class='garantia-presupuesto'>
<h2>Nuestra Garantía de Presupuesto</h2>
<p>En Cubiertas David aplicamos una política de <strong>precio cerrado garantizado</strong>: una vez aceptado el presupuesto, el precio no varía salvo que tú solicites cambios o aparezcan daños estructurales ocultos que no eran visibles en la inspección. En ese caso, te avisamos antes de seguir y aprobamos juntos cualquier incremento.</p>
<p>Esta forma de trabajar nos ha permitido mantener una tasa de satisfacción del cliente del 98% y más de 300 obras completadas en Asturias sin reclamaciones.</p>
</section>

<section class='preguntas-frecuentes-presupuesto'>
<h2>Preguntas Frecuentes sobre Presupuestos de Tejados en ${city}</h2>
<h3>¿Cuánto tarda en llegar el presupuesto?</h3>
<p>Hacemos la visita en 24-72 horas desde tu llamada. El presupuesto lo recibes en 24-48 horas después de la visita. En total, en menos de una semana tienes el precio cerrado.</p>
<h3>¿El presupuesto tiene algún coste?</h3>
<p>No. La visita, la inspección y la elaboración del presupuesto son completamente gratuitos y sin compromiso.</p>
<h3>¿Puedo pedir presupuesto para una reparación pequeña?</h3>
<p>Sí. Hacemos presupuestos desde reparaciones de gotera puntual (150€) hasta reformas integrales de comunidades de vecinos. No hay mínimo.</p>
<h3>¿Trabajáis con seguros y comunidades de propietarios?</h3>
<p>Sí. Tenemos experiencia en gestión de siniestros con compañías de seguros y en obras para comunidades de propietarios. Aportamos toda la documentación necesaria.</p>
<h3>¿Qué pasa si el presupuesto es más alto de lo que esperaba?</h3>
<p>Sin problema. Podemos estudiar alternativas de materiales o fases de obra para ajustar el coste a tu presupuesto disponible, sin comprometer la calidad ni la garantía.</p>
</section>

<section class='cta-presupuesto'>
<h2>Solicita tu Presupuesto Gratuito en ${city}</h2>
<p>Llama ahora al <a href='tel:+34693743627'><strong>693 743 627</strong></a> o rellena el formulario. Te respondemos en menos de 2 horas en horario laboral.</p>
<p><a href='tel:+34693743627' class='btn btn-primary btn-lg'>📞 Llamar Ahora — 693 743 627</a></p>
<p><a href='/contacto' class='btn btn-secondary'>📨 Formulario de Contacto</a></p>
</section>`
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
