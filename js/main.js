/* =============================================
   德裕新塑胶 / Deyuxin Plastics — main.js
   ============================================= */

/* ---------- Language Toggle ---------- */
const langBtns = document.querySelectorAll('.lang-btn');
const savedLang = localStorage.getItem('dyx-lang') || 'zh';
setLang(savedLang);

function setLang(lang) {
  document.body.classList.toggle('lang-en', lang === 'en');
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('dyx-lang', lang);
  // Update document lang attribute for SEO
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

/* ---------- Navbar Scroll ---------- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---------- Mobile Menu ---------- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  // Close on link click
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Active nav link ---------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  if (link.dataset.page === currentPage) link.classList.add('active');
});

/* ---------- Scroll Reveal Animation ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

/* ---------- Counter Animation ---------- */
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const counterEls = document.querySelectorAll('[data-counter]');
if (counterEls.length > 0) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObs.observe(el));
}

/* ---------- Contact Form ---------- */
const contactForm = document.querySelector('#inquiry-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="zh">发送中...</span><span class="en">Sending...</span>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<span class="zh">✓ 发送成功！我们将尽快回复您</span><span class="en">✓ Sent! We\'ll reply soon.</span>';
      btn.style.background = '#16a34a';
      // Re-apply lang state
      document.body.classList.contains('lang-en')
        ? (btn.querySelector('.zh').style.display = 'none')
        : (btn.querySelector('.en').style.display = 'none');
    }, 1500);
  });
}

/* ---------- Product Category Filter ---------- */
const catTabs = document.querySelectorAll('.cat-tab');
const prodSections = document.querySelectorAll('.product-section[data-category]');
if (catTabs.length > 0) {
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      prodSections.forEach(section => {
        if (cat === 'all' || section.dataset.category === cat) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
}

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- GLightbox ---------- */
if (typeof GLightbox !== 'undefined') {
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  });
}
