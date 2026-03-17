/** Reading progress bar — persists across View Transitions via id */
export function initReadingProgress() {
  let bar = document.getElementById('reading-progress-bar') as HTMLElement | null;
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'reading-progress-bar';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:#42b883;z-index:9999;transition:width 0.1s linear;pointer-events:none';
    document.body.prepend(bar);
  } else {
    bar.style.width = '0%';
  }
  const update = () => {
    if (!bar) return;
    const doc = document.documentElement;
    const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
    bar.style.width = (isNaN(scrolled) ? 0 : Math.min(scrolled, 1)) * 100 + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/** Back to top button */
export function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'translate-y-4');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'translate-y-4');
      btn.classList.remove('opacity-100', 'translate-y-0');
    }
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/** Image lightbox */
export function initLightbox() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.85);cursor:zoom-out;align-items:center;justify-content:center';
  const img = document.createElement('img');
  img.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5)';
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  document.querySelectorAll<HTMLImageElement>('.prose img').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      img.src = el.src;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => { overlay.style.display = 'none'; document.body.style.overflow = ''; };
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') close();
  });
}

/** Heading anchor links */
export function initHeadingAnchors() {
  document.querySelectorAll('.prose h2, .prose h3, .prose h4').forEach(heading => {
    if (heading.id) {
      const a = document.createElement('a');
      a.href = '#' + heading.id;
      a.className = 'heading-anchor';
      a.textContent = '#';
      a.setAttribute('aria-label', '連結到此段落');
      heading.appendChild(a);
    }
  });
}

/** Smooth scroll for anchor links */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (href) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
