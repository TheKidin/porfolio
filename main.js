/* =============================================
   THEKINDIN PORTFOLIO — JAVASCRIPT
   ============================================= */

// =============================================
// PAGE NAVIGATION
// =============================================
const pages = ['home', 'projects', 'about', 'contact'];

function showPage(name) {
  // Hide all pages
  pages.forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (el) el.classList.remove('active');
  });

  // Update nav links
  pages.forEach(p => {
    const link = document.getElementById(`nav-${p}`);
    if (link) link.classList.remove('active');
  });

  // Show target page
  const target = document.getElementById(`page-${name}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Activate nav link
  const activeLink = document.getElementById(`nav-${name}`);
  if (activeLink) activeLink.classList.add('active');

  // Close mobile menu
  const navLinks = document.querySelector('.nav__links');
  if (navLinks) navLinks.classList.remove('open');

  return false; // prevent anchor jump
}

// =============================================
// NAVIGATION SCROLL EFFECT
// =============================================
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Start with scrolled if page doesn't start at top
if (window.scrollY > 30) nav.classList.add('scrolled');

// =============================================
// MOBILE HAMBURGER MENU
// =============================================
function toggleMenu() {
  const navLinks = document.querySelector('.nav__links');
  navLinks.classList.toggle('open');
}

// =============================================
// PROJECT DATA
// =============================================
// Para proyectos en Vercel, la imagen se obtiene automáticamente
// via Microlink API (screenshot en tiempo real).
// Para los demás, se usa la imagen local en images/

const MICROLINK = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

const projectData = {
  AplicacionMovile: {
    title: 'Dashboard de Administrador',
    tags: ['JavaScript', 'Móvil', '🟢 En Vivo — Vercel'],
    desc: 'Panel de administración para aplicación móvil (Clinova App) desarrollado con JavaScript. Incluye gestión de usuarios, estadísticas en tiempo real y control total del sistema desde el navegador.',
    link: 'https://github.com/TheKidin/AplicacionMovile',
    vercel: 'https://clinova-app.vercel.app/',
    images: [MICROLINK('https://clinova-app.vercel.app/'), 'images/clinova2.png', 'images/clinova3.png', 'images/clinova4.png', 'images/clinova5.png', 'images/clinova6.png', 'images/clinova7.png'],
  },
  GestorInventario: {
    title: 'Gestor de Inventario',
    tags: ['C#', '.NET', 'Desktop', 'SQL Server'],
    desc: 'Sistema completo de gestión de inventario desarrollado en C#. Control de productos, stock, categorías y reportes desde una interfaz de escritorio profesional.',
    link: 'https://github.com/TheKidin/PIA1.0',
    vercel: null,
    images: ['images/inventario1.jpeg', 'images/inventario2.jpeg', 'images/inventario3.jpeg'],
  },
  PAGINASUPLES: {
    title: 'Tienda de Suplementos',
    tags: ['C# MVC', 'Bootstrap', 'HTML', 'CSS', 'JavaScript'],
    desc: 'Sitio web completo para tienda de suplementos deportivos desarrollado con ASP.NET MVC y Bootstrap. Catálogo de productos, diseño responsivo y experiencia de compra optimizada.',
    link: 'https://github.com/TheKidin/PAGINASUPLES',
    vercel: null,
    images: ['images/suples-1.png', 'images/suples-2.png', 'images/suples-3.png', 'images/suples-4.png', 'images/suples-5.png', 'images/suples-6.png'],
  },
  PAGINADED: {
    title: 'Página DED',
    tags: ['JavaScript', 'HTML', 'CSS', 'Vercel'],
    desc: 'Sitio web interactivo construido con JavaScript. Interfaz dinámica con funcionalidades modernas, animaciones fluidas y experiencia de usuario optimizada. Desplegado en Vercel.',
    link: 'https://github.com/TheKidin/PAGINADED',
    vercel: 'https://dedsafiomr.vercel.app/',
    // Screenshot automático vía Microlink (se carga al abrir el modal)
    images: [MICROLINK('https://dedsafiomr.vercel.app/'), 'images/ded1.png', 'images/ded2.png'],
  },
};


// =============================================
// MODAL FUNCTIONS — with image carousel
// =============================================
let currentModalImages = [];
let currentImgIndex = 0;

function openModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  const overlay    = document.getElementById('modal-overlay');
  const modalImg   = document.getElementById('modal-img');
  const modalTags  = document.getElementById('modal-tags');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc  = document.getElementById('modal-desc');
  const modalLink  = document.getElementById('modal-link');

  // --- Image carousel setup ---
  currentModalImages = data.images || [];
  currentImgIndex = 0;
  renderModalImage(modalImg);

  // --- Tags ---
  modalTags.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // --- Text ---
  modalTitle.textContent = data.title;
  modalDesc.textContent  = data.desc;
  modalLink.href         = data.link;
  modalLink.textContent  = 'Ver en GitHub \u2192';

  // --- Vercel button ---
  const existingDemo = document.getElementById('modal-demo-btn');
  if (existingDemo) existingDemo.remove();
  if (data.vercel) {
    const demoBtn = document.createElement('a');
    demoBtn.id        = 'modal-demo-btn';
    demoBtn.href      = data.vercel;
    demoBtn.target    = '_blank';
    demoBtn.className = 'btn-primary';
    demoBtn.style.marginLeft = '12px';
    demoBtn.textContent = '\ud83d\udfe2 Ver Demo en Vivo \u2197';
    modalLink.parentNode.appendChild(demoBtn);
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderModalImage(modalImg) {
  const imgs  = currentModalImages;
  const idx   = currentImgIndex;
  const total = imgs.length;

  if (!total) {
    modalImg.innerHTML = '';
    modalImg.style.background = 'var(--bg-3)';
    return;
  }

  let html = `<div class="modal-carousel">
    <img src="${imgs[idx]}" alt="Screenshot ${idx + 1}" class="modal-carousel__img" />`;

  if (total > 1) {
    html += `
    <button class="modal-carousel__btn modal-carousel__btn--prev" onclick="changeModalImg(-1)">&#8249;</button>
    <button class="modal-carousel__btn modal-carousel__btn--next" onclick="changeModalImg(1)">&#8250;</button>
    <div class="modal-carousel__dots">
      ${imgs.map((_, i) => `<span class="modal-dot ${i === idx ? 'active' : ''}" onclick="goModalImg(${i})"></span>`).join('')}
    </div>
    <div class="modal-carousel__counter">${idx + 1} / ${total}</div>`;
  }

  html += `</div>`;
  modalImg.innerHTML = html;
  modalImg.style.backgroundImage = 'none';
  modalImg.style.background = 'var(--bg-3)';
}

function changeModalImg(dir) {
  const total = currentModalImages.length;
  if (!total) return;
  currentImgIndex = (currentImgIndex + dir + total) % total;
  renderModalImage(document.getElementById('modal-img'));
}

function goModalImg(idx) {
  currentImgIndex = idx;
  renderModalImage(document.getElementById('modal-img'));
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on ESC, navigate with arrow keys
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape')      closeModal();
  if (e.key === 'ArrowRight')  changeModalImg(1);
  if (e.key === 'ArrowLeft')   changeModalImg(-1);
});

// =============================================
// CONTACT FORM (AJAX)
// =============================================
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  fetch('https://formsubmit.co/ajax/brauliomanzano004@hotmail.com', {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    form.reset();
    btn.textContent = 'Enviar Mensaje →';
    btn.disabled = false;
    success.style.display = 'block';

    setTimeout(() => {
      success.style.display = 'none';
    }, 4000);
  })
  .catch(error => {
    console.error(error);
    btn.textContent = 'Error. Intenta de nuevo.';
    btn.disabled = false;
  });
}



// =============================================
// INTERSECTION OBSERVER — SCROLL ANIMATIONS
// =============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to animatable elements when page becomes visible
function initAnimations() {
  const animatables = document.querySelectorAll(
    '.work-card, .skill-item, .skill-card, .project-card, ' +
    '.project-featured, .timeline-item, .contact-item, .section-title'
  );

  animatables.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
    observer.observe(el);
  });
}

// Initialize on load and when switching pages
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

// Re-init animations when navigating between pages
const originalShowPage = window.showPage;
