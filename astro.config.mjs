// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import icon from 'astro-icon';
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.dotw.me',
  integrations: [
    sitemap(),
    pagefind(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkGithubBlockquoteAlert],
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
