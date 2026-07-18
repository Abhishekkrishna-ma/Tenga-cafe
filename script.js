// ============================================
// THENGA CAFE — shared behaviour
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', open);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 6px 20px rgba(43,42,36,0.06)'
        : 'none';
    }, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Menu page: category pills + scroll spy ---------- */
  const pills = document.querySelectorAll('.category-pill');
  const categories = document.querySelectorAll('.menu-category');

  if (pills.length && categories.length) {
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(pill.getAttribute('href'));
        if (!target) return;
        const offset = 140;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          pills.forEach(p => p.classList.toggle('active', p.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-150px 0px -60% 0px', threshold: 0 });

    categories.forEach(cat => spyObserver.observe(cat));
  }

});
