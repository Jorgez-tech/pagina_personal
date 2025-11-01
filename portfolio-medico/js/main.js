// Reutiliza el mismo JS base del proyecto de abogado
AOS && AOS.init({ duration: 700, once: true });

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const key = 'theme';
    const apply = t => document.documentElement.dataset.theme = t;
    apply(localStorage.getItem(key) || 'light');
    themeToggle.addEventListener('click', () => {
      const next = (document.documentElement.dataset.theme === 'light') ? 'dark' : 'light';
      apply(next); localStorage.setItem(key, next);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));

  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if (form && msg) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = 'Enviando...';
      try {
        await new Promise(r => setTimeout(r, 900));
        msg.textContent = '¡Mensaje enviado! Te responderemos pronto.';
        form.reset();
      } catch {
        msg.textContent = 'Error al enviar. Intenta nuevamente.';
      }
    });
  }
});
