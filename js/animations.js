// ==========================================================================
// Animaciones Visuales de Alto Impacto (Canvas 2D & Efectos Tech)
// Jorge Zuta - Portafolio Profesional
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTechParticlesCanvas();
    initTimelineInteractiveBeam();
});

// ============================================
// Red de Nodos Interactiva / Canvas 2D Estilo Tech
// ============================================
function initTechParticlesCanvas() {
    const container = document.getElementById('particles');
    const heroSection = document.getElementById('home') || document.querySelector('.hero');
    if (!container || !heroSection) return;

    // Crear y configurar elemento canvas
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'heroCanvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let particles = [];
    let animationFrameId = null;
    let isVisible = true;

    // Estado del cursor interactivo
    const mouse = {
        x: null,
        y: null,
        radius: 140
    };

    function resize() {
        const rect = heroSection.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        initNodes();
    }

    // Clase para representar cada nodo de la red
    class TechNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1.2;
            this.baseAlpha = Math.random() * 0.5 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulse = Math.random() * Math.PI;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Rebote suave en los bordes
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Pulso sutil de brillo
            this.pulse += this.pulseSpeed;

            // Interacción con el cursor del mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    // Suave atracción/repulsión electromagnética
                    this.x -= Math.cos(angle) * force * 1.5;
                    this.y -= Math.sin(angle) * force * 1.5;
                }
            }
        }

        draw(isDark) {
            const currentAlpha = this.baseAlpha + Math.sin(this.pulse) * 0.2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark
                ? `rgba(59, 130, 246, ${Math.max(0.1, currentAlpha)})`
                : `rgba(0, 71, 171, ${Math.max(0.15, currentAlpha)})`;
            ctx.fill();
        }
    }

    function initNodes() {
        particles = [];
        // Densidad adaptativa según el ancho de pantalla
        const nodeCount = width < 768 ? 35 : 65;
        for (let i = 0; i < nodeCount; i++) {
            particles.push(new TechNode());
        }
    }

    function animate() {
        if (!isVisible) return;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.clearRect(0, 0, width, height);

        const connectionDistance = width < 768 ? 95 : 125;

        // Conectar nodos cercanos entre sí
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(isDark);

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * (isDark ? 0.22 : 0.16);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = isDark
                        ? `rgba(96, 165, 250, ${alpha})`
                        : `rgba(0, 71, 171, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // Conectar nodos cercanos al cursor del mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const mouseAlpha = (1 - dist / mouse.radius) * (isDark ? 0.45 : 0.3);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = isDark
                        ? `rgba(14, 165, 233, ${mouseAlpha})`
                        : `rgba(0, 71, 171, ${mouseAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // Eventos del mouse sobre la sección Hero
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Optimización de CPU con IntersectionObserver
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(animate);
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);

    // Ajustar en redimensionamiento de ventana
    window.addEventListener('resize', () => {
        clearTimeout(window._resizeTimer);
        window._resizeTimer = setTimeout(resize, 200);
    });

    resize();
    animate();
}

// ============================================
// Haz de Luz Láser Interactivo para la Línea de Tiempo (Opción A)
// ============================================
function initTimelineInteractiveBeam() {
    const timeline = document.getElementById('timeline') || document.querySelector('.timeline');
    const timelineBeam = document.getElementById('timelineBeam');
    if (!timeline || !timelineBeam) return;

    const items = timeline.querySelectorAll('.timeline-item');
    if (!items.length) return;

    // Respeto por preferencias de reducción de movimiento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timelineBeam.style.height = '100%';
        items.forEach(el => el.classList.add('is-active', 'is-visible'));
        return;
    }

    let ticking = false;

    function updateBeamProgress() {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Nivel focal para cálculo del haz dinámico: ~70% de la ventana
        const focalPoint = windowHeight * 0.70;
        const totalHeight = rect.height;

        // Calcular progreso del haz entre 0% y 100%
        const scrolled = focalPoint - rect.top;
        const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);

        timelineBeam.style.height = `${(progress * 100).toFixed(1)}%`;

        // Posición actual del haz en píxeles respecto al contenedor de la línea
        const currentBeamPx = progress * totalHeight;

        // Activar / desactivar nodos y tarjetas según el avance del haz y la ventana de visión (bidireccional)
        items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const icon = item.querySelector('.timeline-icon');
            const iconRect = icon ? icon.getBoundingClientRect() : itemRect;

            // Distancia del centro del nodo relativo al inicio del timeline
            const iconCenterRelativeToTimeline = (iconRect.top + iconRect.height / 2) - rect.top;

            // 1. El haz de luz alcanzó la altura del nodo interactivo
            const beamReached = currentBeamPx >= (iconCenterRelativeToTimeline - 20);

            // 2. El elemento se encuentra dentro del rango focal visible de la pantalla
            // (entra por abajo al ~85% del viewport y se repliega si sale completamente por arriba del navbar o baja)
            const inActiveViewport = itemRect.bottom >= 70 && itemRect.top <= (windowHeight * 0.85);

            if (beamReached && inActiveViewport) {
                // En foco: entra con slide-in elástico
                item.classList.add('is-active', 'is-visible');
            } else {
                // Fuera de foco o retroceso de scroll: sale suavemente para permitir re-animación continua
                item.classList.remove('is-active', 'is-visible');
            }
        });

        ticking = false;
    }

    function onScrollOrResize() {
        if (!ticking) {
            requestAnimationFrame(updateBeamProgress);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Ejecutar cálculo inicial
    setTimeout(updateBeamProgress, 100);
}
