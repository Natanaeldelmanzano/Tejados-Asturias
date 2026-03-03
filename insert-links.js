const fs = require('fs');
const path = require('path');

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// ============================================================================
// UTILIDADES
// ============================================================================

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  const line = '═'.repeat(70);
  log(`\n${line}`, 'bright');
  log(title, 'bright');
  log(`${line}\n`, 'bright');
}

function logSection(title) {
  log(`\n📋 ${title}`, 'cyan');
  log('─'.repeat(70), 'dim');
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    throw new Error(`Error leyendo ${filePath}: ${err.message}`);
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
  } catch (err) {
    throw new Error(`Error escribiendo ${filePath}: ${err.message}`);
  }
}

function getSlugFromFilename(filename) {
  return filename.replace('.html', '').toLowerCase();
}

function getPageTypeFromSlug(slug) {
  if (slug.includes('goteras')) return 'goteras';
  if (slug.includes('presupuesto')) return 'presupuesto';
  if (slug.includes('urgencias')) return 'urgencias';
  if (slug.includes('trabajos-realizados')) return 'trabajos';
  if (slug.includes('precios-reforma')) return 'precios';
  if (slug.startsWith('tejados-')) return 'zona';
  return 'base';
}

function getCityFromSlug(slug) {
  const ciudades = ['oviedo', 'gijon', 'aviles', 'siero', 'langreo', 'mieres', 'castrillon', 'llanera', 'corvera'];
  for (const ciudad of ciudades) {
    if (slug.includes(ciudad)) return ciudad;
  }
  return null;
}

// ============================================================================
// GESTIÓN DE INTERLINKING
// ============================================================================

class InterlinksManager {
  constructor(configPath) {
    this.config = JSON.parse(readFile(configPath));
    this.stats = {
      pagesProcessed: 0,
      linksInserted: 0,
      linksModified: 0,
      errors: []
    };
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  replaceCity(text, city) {
    if (!text || typeof text !== 'string') return text;
    if (!city || typeof city !== 'string') return text;
    return text.replace('{ciudad}', city);
  }

  /**
   * Construye URL del enlace basado en slug
   */
  buildLinkUrl(slug) {
    return `/${slug}.html`;
  }

  /**
   * Selecciona destinos de enlace basados en matriz de interlinking
   */
  selectLinkTargets(pageType, pageCity, count) {
    const matrix = this.config.interlinking_matrix[pageType];
    if (!matrix) return [];

    const targets = [];
    const allTargets = [
      ...(matrix.obligatorio || []),
      ...(matrix.recomendado || []),
      ...(matrix.opcional || [])
    ];

    // Reemplaza {ciudad} con la ciudad actual
    const expandedTargets = allTargets.map(t => {
      if (t.includes('{ciudad}')) {
        return this.replaceCity(t, pageCity);
      }
      return t;
    });

    // Selecciona 'count' destinos aleatorios evitando duplicados
    const shuffled = expandedTargets.sort(() => 0.5 - Math.random());
    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      if (!targets.includes(shuffled[i])) {
        targets.push(shuffled[i]);
      }
    }

    return targets;
  }

  /**
   * Obtiene textos de anclaje para un destino
   */
  getAnchorTexts(targetType) {
    const key = `${targetType}`;
    return this.config.anchor_texts[key] || [];
  }

  /**
   * Inserta enlaces en secciones específicas del HTML
   */
  insertLinksInHTML(html, pageSlug, pageType, pageCity) {
    let modifiedHtml = html;
    const insertedLinks = [];

    // Identifica secciones
    const sectionRegex = {
      intro: /<section[^>]*class="[^"]*urgencia-[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
      services: /<section[^>]*class="[^"]*tipos-[^"]*|servicios[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
      content: /<section[^>]*class="[^"]*proceso|tabla|que-incluye[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
      cta: /<section[^>]*class="[^"]*cta[^"]*"[^>]*>([\s\S]*?)<\/section>/i
    };

    // Intenta insertar en secciones en orden de prioridad
    const insertionPoints = [
      { key: 'intro', minLinks: 2, types: ['zona', 'servicio'] },
      { key: 'services', minLinks: 3, types: ['conversion', 'servicio'] },
      { key: 'content', minLinks: 2, types: ['conversion', 'zona'] },
      { key: 'cta', minLinks: 1, types: ['conversion'] }
    ];

    for (const point of insertionPoints) {
      if (sectionRegex[point.key].test(modifiedHtml)) {
        modifiedHtml = modifiedHtml.replace(
          sectionRegex[point.key],
          (match, content) => {
            const links = this.generateLinksForSection(pageType, pageCity, point.minLinks, insertedLinks);
            if (links.length > 0) {
              insertedLinks.push(...links);
              // Inserta links después del primer párrafo
              const updatedContent = content.replace(
                /(<p[^>]*>.*?<\/p>)/,
                (pMatch) => pMatch + '\n' + links.map(l => `<a href="${l.url}" class="internal-link" rel="noopener">${l.anchor}</a>`).join(' ')
              );
              return match.replace(content, updatedContent);
            }
            return match;
          }
        );
      }
    }

    return { modifiedHtml, linksInserted: insertedLinks.length };
  }

  /**
   * Genera enlaces para una sección específica
   */
  generateLinksForSection(pageType, pageCity, count, alreadyInsertedLinks) {
    const targets = this.selectLinkTargets(pageType, pageCity, count);
    const links = [];

    for (const target of targets) {
      // Evita duplicados
      const urlTarget = this.buildLinkUrl(target);
      if (alreadyInsertedLinks.some(l => l.url === urlTarget)) continue;

      const anchorTexts = this.getAnchorTexts(target.split('-')[0] || 'zona');
      if (anchorTexts.length > 0) {
        const anchor = this.getRandomItem(anchorTexts);
        links.push({
          url: urlTarget,
          target: target,
          anchor: anchor
        });
      }

      if (links.length >= count) break;
    }

    return links;
  }

  /**
   * Reemplaza una frase por un enlace EN PÁRRAFOS DE TEXTO SOLAMENTE
   * Muy conservador para evitar romper HTML
   */
  replacePhraseWithLink(html, phrase, targetUrl, anchor) {
    try {
      // Escapar caracteres especiales de regex
      const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // SOLO buscar dentro de <p> abiertos, con o sin atributos </p>
      const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
      
      let replaced = false;
      const result = html.replace(paragraphRegex, (match, content) => {
        try {
          // Si el párrafo ya contiene un enlace, sáltalo
          if (/<a[^>]*>[\s\S]*?<\/a>/.test(content)) {
            return match;
          }
          
          // Reemplaza la frase dentro del párrafo
          const phraseRegex = new RegExp(`\\b${escapedPhrase}\\b`, 'i');
          if (phraseRegex.test(content)) {
            const newContent = content.replace(
              phraseRegex,
              `<a href="${targetUrl}" class="internal-link" rel="noopener">${anchor}</a>`
            );
            replaced = true;
            // Extrae los atributos originales de <p ...>
            const openTagMatch = match.match(/<p([^>]*)>/);
            const attrs = openTagMatch ? openTagMatch[1] : '';
            return `<p${attrs}>` + newContent + '</p>';
          }
          
          return match;
        } catch (e) {
          return match; // Retorna sin cambios si hay error
        }
      });

      return { modifiedHtml: result, replaced };
    } catch (e) {
      return { modifiedHtml: html, replaced: false };
    }
  }

  /**
   * Inserta enlaces con seguridad máxima - solo en párrafos
   */
  insertLinksByPhrases(html, pageType, pageCity) {
    try {
      let modifiedHtml = html;
      const phraseConfigs = this.config.phrases_to_link[pageType];
      let linksInserted = 0;

      if (!phraseConfigs || !Array.isArray(phraseConfigs) || phraseConfigs.length === 0) {
        return { modifiedHtml, linksInserted: 0 };
      }

      // Ordena por descending length para evitar reemplazar partes de frases más largas
      const sortedConfigs = phraseConfigs
        .filter(c => {
          return c && 
                 typeof c === 'object' && 
                 c.phrase && 
                 typeof c.phrase === 'string' &&
                 c.target && 
                 typeof c.target === 'string' &&
                 c.anchor &&
                 typeof c.anchor === 'string';
        })
        .sort((a, b) => (b.phrase.length || 0) - (a.phrase.length || 0));

      for (const config of sortedConfigs) {
        if (linksInserted >= this.config.rules.max_links_per_page) break;

        try {
          const phrase = this.replaceCity(config.phrase, pageCity);
          const targetUrl = this.buildLinkUrl(this.replaceCity(config.target, pageCity));
          const anchor = config.anchor;

          if (!phrase || !targetUrl || !anchor) continue;

          const { modifiedHtml: newHtml, replaced } = this.replacePhraseWithLink(
            modifiedHtml,
            phrase,
            targetUrl,
            anchor
          );

          if (replaced) {
            modifiedHtml = newHtml;
            linksInserted++;
          }
        } catch (e) {
          // Continúa con el siguiente config si hay error
          continue;
        }
      }

      return { modifiedHtml, linksInserted };
    } catch (e) {
      return { modifiedHtml: html, linksInserted: 0 };
    }
  }

  /**
   * Procesa una página HTML para insertar enlaces
   */
  processPage(filename, distPath) {
    try {
      const filePath = path.join(distPath, filename);
      const html = readFile(filePath);
      
      const slug = getSlugFromFilename(filename);
      const pageType = getPageTypeFromSlug(slug);
      let pageCity = getCityFromSlug(slug);

      // Para páginas sin ciudad, usa 'oviedo' como default
      if (!pageCity) {
        pageCity = 'oviedo';
      }

      // Método 1: Inserción por frases configuradas
      let { modifiedHtml, linksInserted: phraseLinks } = this.insertLinksByPhrases(
        html,
        pageType,
        pageCity
      );

      // Valida que no exceda el máximo
      if (phraseLinks > this.config.rules.max_links_per_page) {
        log(`⚠️  ${filename}: Demasiados enlaces (${phraseLinks})`, 'yellow');
      }

      // Guarda el archivo modificado
      writeFile(filePath, modifiedHtml);

      return {
        success: true,
        filename,
        type: pageType,
        city: pageCity,
        linksInserted: phraseLinks
      };
    } catch (err) {
      this.stats.errors.push({ file: filename, error: err.message });
      return { success: false, filename, error: err.message };
    }
  }

  /**
   * Procesa todas las páginas en el directorio dist
   */
  processAllPages(distPath) {
    logHeader('🔗 PROCESADOR DE INTERLINKING');
    logSection('Procesando páginas HTML');

    const files = fs.readdirSync(distPath).filter(f => f.endsWith('.html'));
    log(`📁 Se encontraron ${files.length} páginas HTML\n`, 'cyan');

    let successCount = 0;
    let totalLinks = 0;

    for (const file of files) {
      const result = this.processPage(file, distPath);
      
      if (result.success) {
        successCount++;
        totalLinks += result.linksInserted;
        const arrow = '✅';
        log(`${arrow} [${result.type.toUpperCase()}] ${file}`, 'green');
        log(`   └─ ${result.linksInserted} enlaces insertados`, 'dim');
      } else {
        log(`❌ Errorroyendo ${file}: ${result.error || result.reason}`, 'red');
      }
    }

    return { successCount, totalFiles: files.length, totalLinks };
  }
}

// ============================================================================
// EJECUCIÓN PRINCIPAL
// ============================================================================

async function main() {
  try {
    const distPath = path.join(__dirname, 'dist');
    const configPath = path.join(__dirname, 'src', 'interlinking-config.json');

    // Valida que existan los directorios
    if (!fs.existsSync(distPath)) {
      throw new Error(`No se encontró directorio ${distPath}`);
    }
    if (!fs.existsSync(configPath)) {
      throw new Error(`No se encontró configuración en ${configPath}`);
    }

    const manager = new InterlinksManager(configPath);
    const results = manager.processAllPages(distPath);

    // Reporte final
    logSection('📊 RESUMEN DE INTERLINKING');
    log(`✅ Páginas procesadas exitosamente: ${results.successCount}/${results.totalFiles}`);
    log(`🔗 Enlaces totales insertados: ${results.totalLinks}`);
    
    if (manager.stats.errors.length > 0) {
      log(`\n⚠️  Errores encontrados: ${manager.stats.errors.length}`, 'yellow');
      manager.stats.errors.forEach(err => {
        log(`   • ${err.file}: ${err.error}`, 'yellow');
      });
    }

    log(`\n✨ ¡PROCESAMIENTO DE INTERLINKING COMPLETADO!`, 'green');
    log(`📁 Páginas actualizadas en: ${distPath}\n`, 'green');

  } catch (err) {
    log(`\n❌ ERROR: ${err.message}`, 'red');
    process.exit(1);
  }
}

main();
