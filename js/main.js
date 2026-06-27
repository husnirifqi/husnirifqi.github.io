/**
 * HUSNI M. RIFQI — Portfolio Website
 * Main JavaScript
 *
 * Features:
 * - Sticky navbar with scroll-based styling
 * - Active section highlighting in nav
 * - Mobile navigation toggle
 * - Scroll reveal animations (IntersectionObserver)
 * - Back-to-top button
 * - Dynamic copyright year
 * - Smooth scroll polyfill fallback
 */

'use strict';

/* =====================================================
   DOM Ready
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initActiveNav();
  initBackToTop();
  initCopyrightYear();
  initHeroPhotoParallax();
});

/* =====================================================
   1. NAVBAR — Scroll styling
   ===================================================== */
function initNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 60;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* =====================================================
   2. MOBILE NAV TOGGLE
   ===================================================== */
function initMobileNav() {
  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    // Prevent body scroll when nav is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* =====================================================
   3. SCROLL REVEAL — IntersectionObserver
   ===================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling elements for a cascading effect
          const siblings = getSiblingRevealElements(entry.target);
          const index    = siblings.indexOf(entry.target);
          const delay    = Math.min(index * 80, 400); // cap at 400ms stagger

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

/**
 * Get sibling reveal elements within the same parent container
 * Used to create staggered animations.
 */
function getSiblingRevealElements(el) {
  const parent = el.parentElement;
  if (!parent) return [el];
  return Array.from(
    parent.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  ).filter(sibling => sibling.parentElement === parent);
}

/* =====================================================
   4. ACTIVE NAV — Highlight current section
   ===================================================== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const NAVBAR_HEIGHT = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '68'
  );

  if (!('IntersectionObserver' in window)) {
    // Fallback: use scroll event
    window.addEventListener('scroll', () => updateActiveNavByScroll(sections, navLinks, NAVBAR_HEIGHT), { passive: true });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    {
      threshold: 0,
      rootMargin: `-${NAVBAR_HEIGHT + 10}px 0px -60% 0px`
    }
  );

  sections.forEach(section => observer.observe(section));
}

function updateActiveNavByScroll(sections, navLinks, navHeight) {
  const scrollPos = window.scrollY + navHeight + 20;
  let activeId = '';

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      activeId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

/* =====================================================
   5. BACK TO TOP
   ===================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =====================================================
   6. COPYRIGHT YEAR
   ===================================================== */
function initCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* =====================================================
   7. HERO PHOTO SUBTLE PARALLAX (Desktop only)
   ===================================================== */
function initHeroPhotoParallax() {
  // Skip on touch devices to avoid jank
  if (window.matchMedia('(hover: none)').matches) return;

  const frame = document.querySelector('.hero-photo-frame');
  if (!frame) return;

  let ticking = false;

  function onMouseMove(e) {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const rect   = frame.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (window.innerWidth  / 2);
      const dy     = (e.clientY - cy) / (window.innerHeight / 2);
      const rotateX = dy * -4;  // max ±4deg
      const rotateY = dx *  4;

      frame.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
      ticking = false;
    });
  }

  function onMouseLeave() {
    frame.style.transform = '';
  }

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
    heroSection.addEventListener('mouseleave', onMouseLeave);
  }
}

/* =====================================================
   8. SMOOTH SCROLL — Polyfill for anchor links
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '68'
    );

    const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});
