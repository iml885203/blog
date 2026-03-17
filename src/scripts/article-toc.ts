/** Mobile TOC toggle + sidebar active highlight */
export function initToc() {
  // Mobile toggle
  const toggleBtn = document.getElementById('toc-inline-toggle');
  const tocList = document.getElementById('toc-inline-list');
  const tocIcon = document.getElementById('toc-inline-icon');
  if (toggleBtn && tocList && tocIcon) {
    toggleBtn.addEventListener('click', () => {
      const hidden = tocList.classList.toggle('hidden');
      tocIcon.style.transform = hidden ? 'rotate(-90deg)' : '';
    });
  }

  // Sidebar active highlight
  const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
  if (tocLinks.length === 0) return;

  const headingEls: HTMLElement[] = [];
  tocLinks.forEach(link => {
    const el = link.dataset.tocSlug ? document.getElementById(link.dataset.tocSlug) : null;
    if (el) headingEls.push(el);
  });

  function setActive(id: string) {
    tocLinks.forEach(link => {
      const active = link.dataset.tocSlug === id;
      link.classList.toggle('text-[#42b883]', active);
      link.classList.toggle('dark:text-[#65cfa0]', active);
      link.classList.toggle('border-[#42b883]', active);
      link.classList.toggle('font-medium', active);
      link.classList.toggle('text-gray-600', !active);
      link.classList.toggle('border-transparent', !active);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) setActive(visible[0].target.id);
    },
    { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
  );

  headingEls.forEach(el => observer.observe(el));
}

/** Code block: wrapper, language badge, copy button */
export function initCodeBlocks() {
  document.querySelectorAll('pre').forEach(pre => {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative group/code';
    pre.parentNode!.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const langMatch = pre.className.match(/language-(\w+)/);
    if (langMatch) {
      const badge = document.createElement('span');
      badge.textContent = langMatch[1];
      badge.style.cssText = 'position:absolute;top:0.5rem;right:2.5rem;font-size:0.65rem;font-family:monospace;color:#94a3b8;letter-spacing:0.05em;text-transform:uppercase';
      wrapper.appendChild(badge);
    }

    const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;

    const btn = document.createElement('button');
    btn.innerHTML = copyIcon;
    btn.title = '複製';
    btn.className = 'absolute top-2 right-2 p-1.5 rounded opacity-0 group-hover/code:opacity-100 transition-opacity bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white';
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText ?? pre.innerText;
      await navigator.clipboard.writeText(code);
      btn.innerHTML = checkIcon;
      btn.classList.add('bg-green-600', 'text-white');
      setTimeout(() => {
        btn.innerHTML = copyIcon;
        btn.classList.remove('bg-green-600', 'text-white');
      }, 1500);
    });
    wrapper.appendChild(btn);
  });
}
