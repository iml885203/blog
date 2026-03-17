export function initShare() {
  const nativeBtn = document.getElementById('share-native') as HTMLButtonElement | null;
  const copyBtn = document.getElementById('share-copy') as HTMLButtonElement | null;

  if (nativeBtn && navigator.share) {
    nativeBtn.classList.remove('hidden');
    nativeBtn.classList.add('inline-flex');
    nativeBtn.addEventListener('click', async () => {
      try {
        await navigator.share({ title: document.title, url: window.location.href });
      } catch {}
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = window.location.href;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      const originalHTML = copyBtn.innerHTML;
      copyBtn.textContent = '已複製！';
      setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 1500);
    });
  }
}
