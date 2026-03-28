export async function initMermaid() {
  // astro shiki adds data-language="mermaid" on pre
  const codeBlocks = Array.from(
    document.querySelectorAll<HTMLElement>('pre[data-language="mermaid"] > code')
  );
  if (!codeBlocks.length) return;

  // Wait for web fonts (Noto Sans TC) to load before measuring node sizes
  await document.fonts.ready;

  const { default: mermaid } = await import('mermaid');

  const isDark = document.documentElement.classList.contains('dark');
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: isDark ? 'dark' : 'neutral',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis',
    },
  });

  // Replace each <pre> with a <div class="mermaid">
  for (const code of codeBlocks) {
    const pre = code.parentElement;
    if (!pre) continue;
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = code.textContent ?? '';
    pre.replaceWith(div);
  }

  await mermaid.run({ querySelector: '.mermaid' });

  // Trim bloated viewBox: mermaid sometimes adds excessive padding.
  // Shrink viewBox to the actual rendered content (getBBox) + small margin.
  document.querySelectorAll<SVGSVGElement>('.mermaid svg').forEach(svg => {
    try {
      const bbox = svg.getBBox();
      const pad = 20;
      const vb = `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`;
      svg.setAttribute('viewBox', vb);
      svg.removeAttribute('height');
      svg.setAttribute('width', '100%');
      svg.style.maxWidth = `${bbox.width + pad * 2}px`;
    } catch { /* skip if getBBox fails */ }
  });
}
