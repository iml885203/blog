/** Reading progress bar — persists across View Transitions via id */
export function initReadingProgress() {
  let bar = document.getElementById('reading-progress-bar') as HTMLElement | null;
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'reading-progress-bar';
    bar.style.cssText =
      'position:fixed;top:0;left:0;height:3px;width:0%;background:#42b883;z-index:9999;transition:width 0.1s linear;pointer-events:none';
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
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 300) {
        btn.classList.remove('opacity-0', 'translate-y-4');
        btn.classList.add('opacity-100', 'translate-y-0');
      } else {
        btn.classList.add('opacity-0', 'translate-y-4');
        btn.classList.remove('opacity-100', 'translate-y-0');
      }
    },
    { passive: true },
  );
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/** Medium-style lightbox + zoom/pan (wheel on desktop, pinch on mobile) */
export function initLightbox() {
  const IMG_BASE_STYLE =
    'position:fixed;object-fit:contain;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5);opacity:0;user-select:none;-webkit-user-drag:none;touch-action:none;transition:all 0.3s ease';
  const TRANSITION_MS = 300;

  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0);pointer-events:none;transition:background 0.3s ease;overflow:hidden;touch-action:none';
  const img = document.createElement('img');
  img.style.cssText = IMG_BASE_STYLE;
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  let sourceEl: HTMLImageElement | null = null;
  let closing = false;

  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let dismissY = 0;
  let dragging = false;
  let didDrag = false; // survives mouseup → click sequence
  let startX = 0;
  let startY = 0;
  let panStartX = 0;
  let panStartY = 0;
  let pinching = false;
  let lastPinchDist = 0;
  let pinchStartZoom = 1;
  let rafId = 0;
  const CLOSE_THRESHOLD = 100;

  // Abort controller for window/document listeners — prevents stacking on View Transitions
  let ac: AbortController | null = null;

  function isOpen() {
    return overlay.style.pointerEvents === 'auto' && !closing;
  }

  function scheduleTransform(animated = false) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      flushTransform(animated);
    });
  }

  function flushTransform(animated: boolean) {
    img.style.transition = animated ? 'transform 0.3s ease,opacity 0.3s ease' : 'none';
    if (zoom <= 1 && dismissY !== 0) {
      const progress = Math.min(Math.abs(dismissY) / 300, 1);
      overlay.style.background = `rgba(0,0,0,${0.85 * (1 - progress)})`;
      img.style.transform = `translateY(${dismissY}px) scale(${1 - progress * 0.15})`;
      img.style.opacity = `${1 - progress * 0.5}`;
    } else {
      overlay.style.background = 'rgba(0,0,0,0.85)';
      img.style.transform = `scale(${zoom}) translate(${panX}px, ${panY}px)`;
      img.style.opacity = '1';
    }
    overlay.style.cursor = zoom > 1 ? 'grab' : 'zoom-out';
  }

  // For immediate updates (animated transitions, open/close)
  function applyTransform(animated = false) {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    flushTransform(animated);
  }

  function resetState() {
    zoom = 1;
    panX = 0;
    panY = 0;
    dismissY = 0;
    dragging = false;
    didDrag = false;
    pinching = false;
  }

  function resetZoom() {
    zoom = 1;
    panX = 0;
    panY = 0;
    applyTransform(true);
  }

  // Calculate centered target rect for the image (respecting 90vw/90vh)
  function getTargetRect(naturalW: number, naturalH: number) {
    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.9;
    const ratio = Math.min(maxW / naturalW, maxH / naturalH, 1);
    const w = naturalW * ratio;
    const h = naturalH * ratio;
    return {
      left: (window.innerWidth - w) / 2,
      top: (window.innerHeight - h) / 2,
      width: w,
      height: h,
    };
  }

  function setImgRect(r: { left: number; top: number; width: number; height: number }) {
    img.style.left = `${r.left}px`;
    img.style.top = `${r.top}px`;
    img.style.width = `${r.width}px`;
    img.style.height = `${r.height}px`;
  }

  function bindGlobalListeners() {
    ac?.abort();
    ac = new AbortController();
    const { signal } = ac;

    window.addEventListener(
      'mousemove',
      (e) => {
        if (!dragging) return;
        didDrag = true;
        panX = panStartX + (e.clientX - startX) / zoom;
        panY = panStartY + (e.clientY - startY) / zoom;
        scheduleTransform();
      },
      { signal },
    );

    window.addEventListener(
      'mouseup',
      () => {
        if (!dragging) return;
        dragging = false;
        overlay.style.cursor = zoom > 1 ? 'grab' : 'zoom-out';
      },
      { signal },
    );

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape' && isOpen()) close();
      },
      { signal },
    );
  }

  const open = (el: HTMLImageElement) => {
    sourceEl = el;
    img.src = el.src;
    resetState();
    bindGlobalListeners();

    // FLIP: start at source image position
    const from = el.getBoundingClientRect();
    img.style.transition = 'none';
    setImgRect(from);
    img.style.opacity = '1';
    img.style.transform = 'none';
    img.style.borderRadius = getComputedStyle(el).borderRadius;

    overlay.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
    void img.offsetHeight; // force reflow

    // Animate to centered position
    const target = getTargetRect(el.naturalWidth || from.width, el.naturalHeight || from.height);
    img.style.transition = 'all 0.3s ease';
    setImgRect(target);
    img.style.borderRadius = '8px';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.cursor = 'zoom-out';
  };

  const close = () => {
    if (closing) return;
    closing = true;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    overlay.style.background = 'rgba(0,0,0,0)';
    void img.offsetHeight;
    img.style.transition = `all ${TRANSITION_MS}ms ease`;

    if (dismissY !== 0) {
      const target = dismissY > 0 ? dismissY + 150 : dismissY - 150;
      img.style.transform = `translateY(${target}px) scale(0.7)`;
      img.style.opacity = '0';
    } else {
      // Try to animate back to source image position
      const sourceRect = sourceEl?.getBoundingClientRect();
      const inViewport =
        sourceRect && sourceRect.top < window.innerHeight && sourceRect.bottom > 0 && sourceRect.width > 0;

      if (inViewport && sourceRect) {
        setImgRect(sourceRect);
        img.style.borderRadius = sourceEl ? getComputedStyle(sourceEl).borderRadius : '8px';
        img.style.opacity = '0.6';
      } else {
        img.style.transform = 'scale(0.9)';
        img.style.opacity = '0';
      }
    }

    setTimeout(() => {
      overlay.style.pointerEvents = 'none';
      document.body.style.overflow = '';
      img.src = '';
      img.style.cssText = IMG_BASE_STYLE;
      sourceEl = null;
      closing = false;
      resetState();
      ac?.abort();
      ac = null;
    }, TRANSITION_MS);
  };

  // --- Desktop: wheel → zoom ---
  overlay.addEventListener(
    'wheel',
    (e) => {
      if (!isOpen()) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      const newZoom = Math.min(Math.max(zoom + delta, 1), 5);
      if (newZoom !== zoom) {
        const rect = img.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        const ratio = 1 - newZoom / zoom;
        panX += (cx * ratio) / zoom;
        panY += (cy * ratio) / zoom;
        zoom = newZoom;
      }
      if (zoom < 1.05) {
        zoom = 1;
        panX = 0;
        panY = 0;
      }
      scheduleTransform();
    },
    { passive: false },
  );

  // --- Desktop: click / double-click ---
  overlay.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (didDrag) {
      didDrag = false;
      return;
    }
    if (zoom > 1.05) {
      resetZoom();
    } else {
      close();
    }
  });

  overlay.addEventListener('dblclick', (e) => {
    if (!isOpen()) return;
    e.stopPropagation();
    if (zoom > 1.05) {
      resetZoom();
    } else {
      zoom = 2.5;
      panX = (overlay.clientWidth / 2 - e.clientX) / zoom;
      panY = (overlay.clientHeight / 2 - e.clientY) / zoom;
      applyTransform(true);
    }
  });

  // --- Desktop: mouse drag (pan when zoomed) ---
  overlay.addEventListener('mousedown', (e) => {
    if (!isOpen() || zoom <= 1) return;
    e.preventDefault();
    dragging = true;
    didDrag = false;
    startX = e.clientX;
    startY = e.clientY;
    panStartX = panX;
    panStartY = panY;
    overlay.style.cursor = 'grabbing';
  });

  // --- Mobile: touch ---
  function getTouchDist(t1: Touch, t2: Touch) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  }

  overlay.addEventListener(
    'touchstart',
    (e) => {
      if (!isOpen()) return;
      if (e.touches.length === 2) {
        pinching = true;
        dragging = false;
        lastPinchDist = getTouchDist(e.touches[0], e.touches[1]);
        pinchStartZoom = zoom;
      } else if (e.touches.length === 1) {
        dragging = true;
        pinching = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        panStartX = panX;
        panStartY = panY;
        dismissY = 0;
      }
    },
    { passive: true },
  );

  overlay.addEventListener(
    'touchmove',
    (e) => {
      if (!isOpen()) return;
      if (e.touches.length === 2 && pinching) {
        e.preventDefault();
        const dist = getTouchDist(e.touches[0], e.touches[1]);
        zoom = Math.min(Math.max(pinchStartZoom * (dist / lastPinchDist), 1), 5);
        scheduleTransform();
      } else if (e.touches.length === 1 && dragging && !pinching) {
        e.preventDefault();
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (zoom > 1.05) {
          panX = panStartX + dx / zoom;
          panY = panStartY + dy / zoom;
        } else {
          dismissY = dy;
        }
        scheduleTransform();
      }
    },
    { passive: false },
  );

  overlay.addEventListener(
    'touchend',
    (e) => {
      if (!isOpen()) return;

      if (pinching) {
        pinching = false;
        if (zoom < 1.1) resetZoom();
        return;
      }

      if (!dragging) return;
      dragging = false;

      if (zoom <= 1.05) {
        if (Math.abs(dismissY) > CLOSE_THRESHOLD) {
          close();
        } else if (Math.abs(dismissY) > 0) {
          dismissY = 0;
          applyTransform(true);
        } else {
          const moved =
            Math.abs((e.changedTouches[0]?.clientX ?? 0) - startX) +
            Math.abs((e.changedTouches[0]?.clientY ?? 0) - startY);
          if (moved < 10) close();
        }
      }
    },
    { passive: true },
  );

  document.querySelectorAll<HTMLImageElement>('.prose img').forEach((el) => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => open(el));
  });
}

/** Heading anchor links */
export function initHeadingAnchors() {
  document.querySelectorAll('.prose h2, .prose h3, .prose h4').forEach((heading) => {
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
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (href) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
