/*
 * ═══════════════════════════════════════════════════════════════════
 * CARRUSEL DE ZONAS - JAVASCRIPT
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Funcionalidad completa del carrusel:
 * - Navegación manual (botones y dots)
 * - Auto-play opcional
 * - Swipe táctil para móviles
 * - Navegación por teclado
 * - Pausar al hover
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // CONFIGURACIÓN
    // ═══════════════════════════════════════════════════════════
    
    const CONFIG = {
        autoPlayEnabled: true,          // Auto-play activado por defecto
        autoPlayInterval: 5000,         // 5 segundos entre slides
        transitionDuration: 600,        // Duración de la transición (debe coincidir con CSS)
        swipeThreshold: 50,             // Píxeles mínimos para detectar swipe
        pauseOnHover: true              // Pausar auto-play al hacer hover
    };

    // ═══════════════════════════════════════════════════════════
    // ELEMENTOS DEL DOM
    // ═══════════════════════════════════════════════════════════
    
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const carouselContainer = document.querySelector('.zones-carousel');

    // Verificar que existen los elementos
    if (!track || !slides.length || !prevBtn || !nextBtn) {
        console.warn('Carrusel: Elementos del DOM no encontrados');
        return;
    }

    // ═══════════════════════════════════════════════════════════
    // ESTADO DEL CARRUSEL
    // ═══════════════════════════════════════════════════════════
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;
    let isTransitioning = false;

    // ═══════════════════════════════════════════════════════════
    // FUNCIONES PRINCIPALES
    // ═══════════════════════════════════════════════════════════
    
    /**
     * Ir a un slide específico
     * @param {number} index - Índice del slide (0-based)
     */
    function goToSlide(index) {
        // Prevenir transiciones múltiples simultáneas
        if (isTransitioning) return;
        
        // Normalizar el índice (wrap around)
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }

        // Marcar como en transición
        isTransitioning = true;

        // Actualizar posición del track
        const offset = -index * 100;
        track.style.transform = `translateX(${offset}%)`;

        // Actualizar indicadores
        updateIndicators(index);

        // Actualizar estado
        currentSlide = index;

        // Permitir nueva transición después de completarse
        setTimeout(() => {
            isTransitioning = false;
        }, CONFIG.transitionDuration);
    }

    /**
     * Slide anterior
     */
    function prevSlide() {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
    }

    /**
     * Slide siguiente
     */
    function nextSlide() {
        goToSlide(currentSlide + 1);
        resetAutoPlay();
    }

    /**
     * Actualizar indicadores visuales
     * @param {number} index - Índice activo
     */
    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════
    // AUTO-PLAY
    // ═══════════════════════════════════════════════════════════
    
    /**
     * Iniciar auto-play
     */
    function startAutoPlay() {
        if (!CONFIG.autoPlayEnabled) return;
        
        autoPlayTimer = setInterval(() => {
            nextSlide();
        }, CONFIG.autoPlayInterval);
    }

    /**
     * Detener auto-play
     */
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    /**
     * Reiniciar auto-play
     */
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // ═══════════════════════════════════════════════════════════
    // EVENT LISTENERS - NAVEGACIÓN MANUAL
    // ═══════════════════════════════════════════════════════════
    
    // Botones anterior/siguiente
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Indicadores (dots)
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
    });

    // ═══════════════════════════════════════════════════════════
    // NAVEGACIÓN POR TECLADO (Accesibilidad)
    // ═══════════════════════════════════════════════════════════
    
    document.addEventListener('keydown', (e) => {
        // Solo si el carrusel está en foco o visible
        if (!carouselContainer) return;

        switch(e.key) {
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                break;
            case 'Home':
                goToSlide(0);
                resetAutoPlay();
                break;
            case 'End':
                goToSlide(totalSlides - 1);
                resetAutoPlay();
                break;
        }
    });

    // ═══════════════════════════════════════════════════════════
    // TOUCH/SWIPE PARA MÓVILES
    // ═══════════════════════════════════════════════════════════
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    /**
     * Detectar dirección del swipe
     */
    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);

        // Ignorar swipes verticales (scroll)
        if (diffY > Math.abs(diffX)) return;

        // Swipe horizontal detectado
        if (Math.abs(diffX) > CONFIG.swipeThreshold) {
            if (diffX > 0) {
                // Swipe izquierda → siguiente
                nextSlide();
            } else {
                // Swipe derecha → anterior
                prevSlide();
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // PAUSAR AUTO-PLAY AL HOVER
    // ═══════════════════════════════════════════════════════════
    
    if (CONFIG.pauseOnHover && carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    // ═══════════════════════════════════════════════════════════
    // PAUSAR AUTO-PLAY CUANDO LA PESTAÑA NO ESTÁ VISIBLE
    // ═══════════════════════════════════════════════════════════
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    // ═══════════════════════════════════════════════════════════
    // RESPONSIVE - Ajustar al cambiar tamaño de ventana
    // ═══════════════════════════════════════════════════════════
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        // Debounce para evitar múltiples ejecuciones
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalcular posición al cambiar tamaño
            goToSlide(currentSlide);
        }, 250);
    });

    // ═══════════════════════════════════════════════════════════
    // PRELOAD DE IMÁGENES ADYACENTES (Mejora rendimiento)
    // ═══════════════════════════════════════════════════════════
    
    /**
     * Precargar imágenes del slide anterior y siguiente
     */
    function preloadAdjacentImages() {
        const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        const nextIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;

        [prevIndex, nextIndex].forEach(index => {
            const img = slides[index].querySelector('.slide-image');
            if (img && img.loading === 'lazy') {
                // Forzar carga de imagen
                img.loading = 'eager';
            }
        });
    }

    // ═══════════════════════════════════════════════════════════
    // INTERSECTION OBSERVER - Auto-play solo si visible
    // ═══════════════════════════════════════════════════════════
    
    if ('IntersectionObserver' in window && carouselContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, {
            threshold: 0.5 // 50% visible
        });

        observer.observe(carouselContainer);
    }

    // ═══════════════════════════════════════════════════════════
    // INICIALIZACIÓN
    // ═══════════════════════════════════════════════════════════
    
    /**
     * Inicializar el carrusel
     */
    function init() {
        // Asegurar que el primer slide está activo
        goToSlide(0);
        
        // Precargar imágenes adyacentes
        preloadAdjacentImages();
        
        // Iniciar auto-play
        startAutoPlay();

        console.log('✅ Carrusel de zonas inicializado correctamente');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ═══════════════════════════════════════════════════════════
    // API PÚBLICA (opcional - para control externo)
    // ═══════════════════════════════════════════════════════════
    
    window.ZonesCarousel = {
        goTo: goToSlide,
        next: nextSlide,
        prev: prevSlide,
        play: startAutoPlay,
        pause: stopAutoPlay,
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => totalSlides
    };

})();
