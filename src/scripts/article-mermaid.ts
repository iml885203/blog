export async function initMermaid() {
  const codeBlocks = Array.from(
    document.querySelectorAll<HTMLElement>('pre[data-language="mermaid"] > code')
  );
  if (!codeBlocks.length) return;

  const [{ default: mermaid }] = await Promise.all([
    import('mermaid'),
    document.fonts.ready,
  ]);

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

  const divs: HTMLDivElement[] = [];
  for (const code of codeBlocks) {
    const pre = code.parentElement;
    if (!pre) continue;
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = code.textContent ?? '';
    pre.replaceWith(div);
    divs.push(div);
  }

  await mermaid.run({ querySelector: '.mermaid' });

  // Trim bloated viewBox: mermaid sometimes adds excessive padding.
  for (const div of divs) {
    const svg = div.querySelector('svg');
    if (!svg) continue;
    try {
      const bbox = svg.getBBox();
      const pad = 20;
      svg.setAttribute('viewBox', `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`);
      svg.removeAttribute('height');
      svg.setAttribute('width', '100%');
      svg.style.maxWidth = `${bbox.width + pad * 2}px`;
    } catch { /* skip if getBBox fails */ }
  }
}
