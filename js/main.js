// ============================================
// Configuración e Inicialización
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    initNavbar();
    initThemeToggle();
    initStarsLayer();
    initMobileMenu();
    initScrollToTop();
    initTypingEffect();
    initCounters();
    initProjectFilter();
    initContactForm();
    initScrollAnimations();
    initCVDownloadTracking();
    initCurrentYear();
    initAboutVideo();
}

// ============================================
// Navegación
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navegación suave y activar enlace actual con offset milimétrico exacto
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    // Coordenada exacta del inicio de la sección (evita que asome la sección anterior)
                    const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
                    const exactTarget = Math.max(0, sectionTop - navHeight);
                    window.scrollTo({
                        top: exactTarget,
                        behavior: 'smooth'
                    });
                }
            }

            // Actualizar link activo
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Cerrar menú móvil si está abierto
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Activar enlace según sección visible (Scroll Spy exacto)
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const navHeight = navbar ? navbar.offsetHeight : 80;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            if (window.scrollY >= sectionTop - navHeight - 30) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    }, { passive: true });
}

// ============================================
// Menú Móvil
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// Toggle Tema Claro/Oscuro (H-01, H-04)
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    if (!themeToggle) return;

    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) {
        console.warn('localStorage no disponible para tema, usando default dark.');
    }

    applyTheme(savedTheme);

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        applyTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (err) {
            // Ignorar fallo de storage en modo privado/sandboxed
        }
    });
}

function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        html.classList.add('dark-theme');
        html.classList.remove('light-theme');
    } else {
        html.classList.add('light-theme');
        html.classList.remove('dark-theme');
    }
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;

    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ============================================
// Botón Scroll to Top
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Efecto de Texto con Escritura
// ============================================
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = [
        'Desarrollador Backend',
        'C#/.NET Developer',
        'Python & Django Developer',
        'Diseño de sistemas claros',
        'Aprendizaje continuo'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pausa al final
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ============================================
// Contador Animado (Estadísticas)
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    let hasRun = false;

    const runCounters = () => {
        if (hasRun) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / speed;

            const updateCount = () => {
                const count = parseInt(counter.textContent);

                if (count < target) {
                    counter.textContent = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCount();
        });

        hasRun = true;
    };

    // Ejecutar cuando la sección about sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounters();
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ============================================
// Filtro de Proyectos
// ============================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrar proyectos
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// Formulario de Contacto
// ============================================
// ============================================
// Formulario de Contacto con Validación en Tiempo Real
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    const fields = [
        {
            input: form.querySelector('#name'),
            feedback: form.querySelector('#nameFeedback'),
            validate: (val) => {
                if (!val.trim()) return 'Por favor ingresa tu nombre completo.';
                if (val.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
                return '';
            }
        },
        {
            input: form.querySelector('#email'),
            feedback: form.querySelector('#emailFeedback'),
            validate: (val) => {
                if (!val.trim()) return 'Por favor ingresa tu correo electrónico.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                if (!emailRegex.test(val.trim())) return 'Ingresa un correo válido (ejemplo: contacto@dominio.com).';
                return '';
            }
        },
        {
            input: form.querySelector('#subject'),
            feedback: form.querySelector('#subjectFeedback'),
            validate: (val) => {
                if (!val.trim()) return 'Por favor ingresa el asunto de tu mensaje.';
                if (val.trim().length < 4) return 'El asunto debe tener al menos 4 caracteres.';
                return '';
            }
        },
        {
            input: form.querySelector('#message'),
            feedback: form.querySelector('#messageFeedback'),
            validate: (val) => {
                if (!val.trim()) return 'Por favor ingresa tu mensaje.';
                if (val.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres para entender tu consulta.';
                return '';
            }
        }
    ];

    function validateField(fieldConfig, showFeedback = true) {
        const { input, feedback, validate } = fieldConfig;
        if (!input) return true;

        const errorMsg = validate(input.value);
        const formGroup = input.closest('.form-group');

        if (errorMsg) {
            if (showFeedback) {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                if (formGroup) formGroup.classList.add('has-error');
                if (feedback) {
                    feedback.innerHTML = `<i class="fas fa-exclamation-circle" aria-hidden="true"></i> ${errorMsg}`;
                }
            }
            return false;
        } else {
            input.classList.remove('is-invalid');
            if (input.value.trim().length > 0) {
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
            }
            if (formGroup) formGroup.classList.remove('has-error');
            if (feedback) feedback.textContent = '';
            return true;
        }
    }

    // Escuchar eventos en vivo: al desenfocar o al escribir
    fields.forEach((fieldConfig) => {
        const { input } = fieldConfig;
        if (!input) return;

        input.addEventListener('blur', () => {
            validateField(fieldConfig, true);
        });

        input.addEventListener('input', () => {
            // Si el campo ya tiene error visual, validar en tiempo real para quitarlo al corregir
            if (input.classList.contains('is-invalid')) {
                validateField(fieldConfig, true);
            } else if (input.value.trim().length > 0) {
                validateField(fieldConfig, false);
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar todos los campos antes de enviar
        let isFormValid = true;
        let firstInvalidField = null;

        fields.forEach((fieldConfig) => {
            const isValid = validateField(fieldConfig, true);
            if (!isValid) {
                isFormValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = fieldConfig.input;
                }
            }
        });

        if (!isFormValid) {
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            showFormMessage('Por favor completa los campos requeridos correctamente.', 'error');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.innerHTML;

        // Deshabilitar botón y mostrar estado de carga
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        formMessage.textContent = '';

        try {
            // Enviar formulario por AJAX a Formspree
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormMessage('¡Mensaje enviado con éxito! Te responderé a la brevedad.', 'success');
                form.reset();
                // Limpiar marcas de validación
                fields.forEach(({ input, feedback }) => {
                    if (input) {
                        input.classList.remove('is-valid', 'is-invalid');
                        const group = input.closest('.form-group');
                        if (group) group.classList.remove('has-error');
                    }
                    if (feedback) feedback.textContent = '';
                });
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            showFormMessage('Hubo un inconveniente al enviar el mensaje. También puedes escribirme directamente a WhatsApp o correo.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = buttonText;
        }
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 6000);
}

// ============================================
// Animaciones al Hacer Scroll (100% Nativo Vanilla JS - Staggered Transitions)
// ============================================
function initScrollAnimations() {
    // IMPORTANTE: .timeline-item se excluye aquí — sus animaciones de entrada
    // son controladas exclusivamente por initTimelineInteractiveBeam() en animations.js.
    const animatedElements = document.querySelectorAll(
        '[data-aos]:not(.timeline-item)'
    );
    if (!animatedElements.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible', 'aos-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => {
            // Si el elemento ya está visible en la pantalla inicial (ej. Hero), activarlo de inmediato
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('is-visible', 'aos-animate');
            } else {
                observer.observe(el);
            }
        });
    } else {
        // Fallback para navegadores sin IntersectionObserver
        animatedElements.forEach(el => el.classList.add('is-visible', 'aos-animate'));
    }
}

// ============================================
// Telemetría Ligera / Webhook Descarga CV (Opcional)
// ============================================
function initCVDownloadTracking() {
    const cvButtons = document.querySelectorAll('a[href*="CV"], a[download]');
    // Coloca tu URL de Webhook de Discord aquí cuando desees recibir notificaciones:
    const DISCORD_WEBHOOK_URL = ''; 

    cvButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!DISCORD_WEBHOOK_URL) return; // Si no hay webhook configurado, no hace nada

            const payload = {
                username: "jorgez.tech Bot",
                avatar_url: "https://jorgez.tech/img/logo2.png",
                embeds: [{
                    title: "📄 ¡Descarga de CV Registrada!",
                    description: "Un visitante ha hecho clic en descargar tu CV desde tu portafolio.",
                    color: 18347, // Color Azul Cobalto (#0047AB) en formato decimal
                    fields: [
                        { name: "Fecha y Hora", value: new Date().toLocaleString('es-CL'), inline: true },
                        { name: "Dispositivo", value: /Mobi|Android/i.test(navigator.userAgent) ? 'Móvil' : 'Desktop', inline: true },
                        { name: "Origen", value: window.location.href, inline: false }
                    ],
                    footer: { text: "jorgez.tech · Portafolio Profesional" }
                }]
            };

            fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(err => console.warn('Error enviando telemetría de CV:', err));
        });
    });
}

// ============================================
// Actualización Automática del Año (Copyright)
// ============================================
function initCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear, .current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// ============================================
// Smooth Scroll para Navegadores Antiguos
// ============================================
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));

                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

smoothScrollPolyfill();

// ============================================
// Restaurar reproducción de video en Sobre Mí
// ============================================
function initAboutVideo() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const video = aboutSection.querySelector('video');
    if (!video) return;

    // Asegurar atributos correctos para autoplay sin restricciones
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Intentar reproducir; si falla (política del navegador), se intentará al ser visible
    const tryPlay = () => {
        const promise = video.play();
        if (promise !== undefined) {
            promise.catch(() => {
                // Silencioso: el observer lo intentará cuando la sección sea visible
            });
        }
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tryPlay();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });

    videoObserver.observe(aboutSection);
    tryPlay();
}

// ============================================
// Prevenir FOUC (Flash of Unstyled Content)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// Manejo de Errores de Imágenes
// ============================================
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
    }
}, true);

// ============================================
// Funciones de Utilidad
// ============================================

// Debounce para optimizar eventos de scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para eventos que ocurren muy frecuentemente
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimizar scroll con throttle
window.addEventListener('scroll', throttle(() => {
    // Aquí van las funciones que necesitan ejecutarse al hacer scroll
}, 100));

// ============================================
// Fondo Nocturno Inteligente / Capa de Estrellas (M-01, M-02)
// ============================================
function initStarsLayer() {
    const container = document.getElementById('starsLayer');
    if (!container) return;

    // Generar estrellas sutiles distribuidas en la ventana
    container.innerHTML = '';
    const starCount = window.innerWidth < 768 ? 32 : 55;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        const size = (Math.random() * 1.6 + 1.0).toFixed(1); // 1.0px a 2.6px
        const top = (Math.random() * 99).toFixed(2);
        const left = (Math.random() * 99).toFixed(2);
        const duration = (Math.random() * 3.5 + 2.5).toFixed(1); // 2.5s a 6.0s
        const delay = (Math.random() * 4).toFixed(1);

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        star.style.setProperty('--twinkle-delay', `${delay}s`);

        fragment.appendChild(star);
    }

    container.appendChild(fragment);
}

// ============================================
// Modal de Previsualización de Proyectos (H-04)
// ============================================
function openPreview(e) {
    if (e && e.preventDefault) e.preventDefault();
    const trigger = e ? (e.currentTarget || e.target.closest('.project-link')) : null;
    if (!trigger) return;

    const largeSrc = trigger.getAttribute('data-large') || trigger.getAttribute('href');
    const card = trigger.closest('.project-card');
    const title = card ? card.querySelector('h3')?.textContent : '';

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    if (modal && modalImg) {
        modalImg.src = largeSrc;
        if (modalCaption) modalCaption.textContent = title || '';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closePreview() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreview();
});

// Exponer en el objeto global para handlers inline en HTML
window.openPreview = openPreview;
window.closePreview = closePreview;

// ============================================
// Console Message (Opcional)
// ============================================
console.log(
    '%c¡Hola Developer! ',
    'color: #0047AB; font-size: 20px; font-weight: bold;'
);
console.log(
    '%c¿Curioseando el código? ¡Me gusta! \nSi quieres colaborar, ¡contáctame!',
    'color: #64748b; font-size: 14px;'
);

