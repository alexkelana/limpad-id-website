/**
 * Limpad.id — interactive effects
 */
(function () {
  'use strict';

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const revealEls = document.querySelectorAll('.reveal, .service-card, .value-card, .stat-item, .service-detail, .faq-item, .contact-card, .form-box');
  if (revealEls.length && 'IntersectionObserver' in window) {
    revealEls.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--delay', (Math.min(i % 4, 3) * 80) + 'ms');
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('revealed'));
  }

  function parseStat(text) {
    const t = text.trim();
    const m = t.match(/^([\d.,]+)(.*)$/);
    if (!m) return null;
    const num = parseFloat(m[1].replace(/\./g, '').replace(',', '.'));
    return { value: num, suffix: m[2] || '' };
  }

  function animateCount(el, target, suffix, duration) {
    const start = performance.now();
    const isInt = Number.isInteger(target);
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      el.textContent =
        (isInt ? Math.round(current).toLocaleString('id-ID') : current.toFixed(0)) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toLocaleString('id-ID') + suffix;
    }
    requestAnimationFrame(frame);
  }

  const statStrong = document.querySelectorAll('.stat-item strong');
  if (statStrong.length && 'IntersectionObserver' in window) {
    const counted = new WeakSet();
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || counted.has(entry.target)) return;
          counted.add(entry.target);
          const parsed = parseStat(entry.target.textContent);
          if (parsed) animateCount(entry.target, parsed.value, parsed.suffix, 1400);
          cio.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    statStrong.forEach((el) => cio.observe(el));
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const form = document.querySelector('.form-box form, form#rfqForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"], .btn-primary');
      const original = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Mengirim...';
      }
      const data = new FormData(form);
      let msg = 'Halo Limpad.id, saya ingin minta penawaran:%0A';
      data.forEach((v, k) => {
        if (v) msg += '%0A' + encodeURIComponent(k) + ': ' + encodeURIComponent(v);
      });
      setTimeout(() => {
        window.open('https://wa.me/6281805950933?text=' + msg, '_blank');
        if (btn) {
          btn.disabled = false;
          btn.textContent = original || 'Terkirim';
        }
        form.reset();
      }, 400);
    });
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
