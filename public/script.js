/* =============================================
   ANORA — Luxury Fragrance Brand
   script.js
   ============================================= */

'use strict';

/* --- Ensure background videos always autoplay and loop on mobile --- */
function initBackgroundVideos() {
  const videos = document.querySelectorAll('.hero-video, .heritage-video');
  videos.forEach((vid) => {
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    // Force play; browsers may silently block — retry on visibility
    const playVideo = () => {
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          // Retry once user interacts with the page
          document.addEventListener('touchstart', () => vid.play(), { once: true });
          document.addEventListener('click', () => vid.play(), { once: true });
        });
      }
    };
    playVideo();
    // Resume if paused (e.g. tab hidden then visible, or mobile browser pause)
    vid.addEventListener('pause', () => {
      if (!document.hidden) vid.play();
    });
  });
}

document.addEventListener('DOMContentLoaded', initBackgroundVideos);

/* --- Loader --- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.cursor = 'none';
    initReveal();
  }, 1800);
});

/* --- Custom Cursor --- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

const hoverTargets = 'a, button, .product-card, .carousel-card, .testimonial-card, .timeline-item, .note-tag, input';

document.addEventListener('mouseover', (e) => {
  if (e.target.closest(hoverTargets)) {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.closest(hoverTargets)) {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  }
});

/* --- Header Scroll --- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* --- Mobile Menu --- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navToggle.setAttribute('aria-expanded', String(menuOpen));
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* --- Scroll Reveal --- */
function initReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay || 0);
        const stagger = parseFloat(entry.target.dataset.stagger || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (delay + stagger) * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Add staggered delays to grid items
  document.querySelectorAll('.products-grid .product-card').forEach((el, i) => {
    el.dataset.stagger = i * 0.12;
  });
  document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((el, i) => {
    el.dataset.stagger = i * 0.12;
  });
  document.querySelectorAll('.carousel-card').forEach((el, i) => {
    el.dataset.stagger = i * 0.1;
  });
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.dataset.stagger = i * 0.1;
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Floating Particles --- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 30}%;
      --duration: ${5 + Math.random() * 8}s;
      --delay: ${Math.random() * 6}s;
      --drift: ${(Math.random() - 0.5) * 60}px;
      width: ${1 + Math.random()}px;
      height: ${1 + Math.random()}px;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}

createParticles();

/* --- Fragrance Notes Pyramid --- */
const pyramidBtns = document.querySelectorAll('.pyramid-btn');
const noteContents = {
  top: document.getElementById('topContent'),
  heart: document.getElementById('heartContent'),
  base: document.getElementById('baseContent'),
};

pyramidBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const layer = btn.dataset.layer;

    pyramidBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    Object.keys(noteContents).forEach(key => {
      noteContents[key].classList.add('hidden');
    });

    if (noteContents[layer]) {
      noteContents[layer].classList.remove('hidden');
    }
  });
});

/* --- Carousel --- */
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (carousel && prevBtn && nextBtn) {
  const getCardWidth = () => {
    const card = carousel.querySelector('.carousel-card');
    if (!card) return 0;
    const style = window.getComputedStyle(carousel);
    const gap = parseInt(style.gap || '24', 10);
    return card.offsetWidth + gap;
  };

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });
}

/* --- Parallax on Hero Bottle --- */
const heroBottle = document.querySelector('.hero-bottle');

window.addEventListener('scroll', () => {
  if (!heroBottle) return;
  const scrolled = window.scrollY;
  const rate = scrolled * 0.18;
  heroBottle.style.transform = `translateY(calc(-50% - ${rate}px))`;
}, { passive: true });

/* --- Newsletter Form --- */
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const btn   = newsletterForm.querySelector('button[type="submit"]');
    const email = input.value.trim();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = 'rgba(180,60,60,0.8)';
      input.focus();
      setTimeout(() => { input.style.borderColor = ''; }, 2500);
      return;
    }

    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    input.disabled = true;

    const resetBtn = (text, color, delay) => {
      setTimeout(() => {
        btn.textContent = text;
        btn.style.background = color || '';
        input.disabled = false;
        btn.disabled = false;
      }, delay);
    };

    try {
      const response = await fetch(newsletterForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(newsletterForm),
      });

      if (response.ok) {
        btn.textContent = 'Thank You ✦';
        btn.style.background = 'rgba(200,164,106,0.85)';
        input.value = '';
        resetBtn(originalText, '', 5000);
      } else {
        // Formspree returns 422 if form not activated — show friendly message
        const data = await response.json().catch(() => ({}));
        const msg = (data && data.errors && data.errors[0] && data.errors[0].message) || 'Try Again';
        btn.textContent = msg.length < 20 ? msg : 'Try Again';
        btn.style.background = 'rgba(180,60,60,0.7)';
        resetBtn(originalText, '', 3500);
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.style.background = 'rgba(180,60,60,0.7)';
      resetBtn(originalText, '', 3500);
    }
  });
}

/* --- Video Autoplay Fallback ---
   Mobile browsers (iOS Safari, Chrome Android) require a user gesture
   before playing video. This fires play() on first touch/click. */
(function videoAutoplayFallback() {
  const videos = [
    document.getElementById('heroVideo'),
    document.getElementById('heritageVideo'),
  ].filter(Boolean);

  if (videos.length === 0) return;

  function tryPlay() {
    videos.forEach(v => {
      if (v.paused) {
        v.play().catch(() => {});
      }
    });
  }

  // Try immediately
  tryPlay();

  // Retry on first user interaction (mobile requirement)
  const events = ['touchstart', 'click', 'keydown', 'scroll'];
  function onInteraction() {
    tryPlay();
    events.forEach(ev => document.removeEventListener(ev, onInteraction));
  }
  events.forEach(ev => document.addEventListener(ev, onInteraction, { once: true, passive: true }));
})();

/* --- Smooth Anchor Scrolling --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* --- Add to Cart Feedback is handled by cart.js --- */

/* --- Buy Now (handled by cart.js) --- */
