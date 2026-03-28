import type { Lang } from './ui';

interface CategoryInfo {
  slug: string;
  en: string;
  'zh-TW': string;
}

const categoryMap: Record<string, CategoryInfo> = {
  '🤖 人工智慧': { slug: 'ai', en: 'AI', 'zh-TW': '🤖 人工智慧' },
  '🧑‍💻 程式語言': { slug: 'programming', en: 'Programming', 'zh-TW': '🧑‍💻 程式語言' },
  '🧰️ 我的工具箱': { slug: 'tools', en: 'Tools', 'zh-TW': '🧰️ 我的工具箱' },
  '🏠 智慧家庭': { slug: 'smart-home', en: 'Smart Home', 'zh-TW': '🏠 智慧家庭' },
  '💣 各種踩雷': { slug: 'troubleshooting', en: 'Troubleshooting', 'zh-TW': '💣 各種踩雷' },
  '📖 Hexo': { slug: 'hexo', en: 'Hexo', 'zh-TW': '📖 Hexo' },
  '💾 Synology': { slug: 'synology', en: 'Synology', 'zh-TW': '💾 Synology' },
  '☁️ 雲端平台': { slug: 'cloud', en: 'Cloud', 'zh-TW': '☁️ 雲端平台' },
  '🌐 網路': { slug: 'networking', en: 'Networking', 'zh-TW': '🌐 網路' },
  '🏗 Infra': { slug: 'infra', en: 'Infra', 'zh-TW': '🏗 Infra' },
  技術分享: { slug: 'tech-sharing', en: 'Tech Sharing', 'zh-TW': '技術分享' },
};

const slugToCategory = new Map<string, CategoryInfo & { original: string }>();
for (const [original, info] of Object.entries(categoryMap)) {
  slugToCategory.set(info.slug, { ...info, original });
}

/** Get English slug from original category name */
export function getCategorySlug(category: string): string {
  return categoryMap[category]?.slug ?? category.toLowerCase().replace(/\s+/g, '-');
}

/** Get category info by English slug */
export function getCategoryBySlug(slug: string) {
  return slugToCategory.get(slug) ?? null;
}

/** Get display name for a category based on language */
export function getCategoryDisplayName(category: string, lang: Lang): string {
  const info = categoryMap[category];
  if (!info) return category;
  return info[lang] ?? info['zh-TW'];
}

/** Get display name from slug based on language */
export function getCategoryDisplayNameBySlug(slug: string, lang: Lang): string {
  const info = slugToCategory.get(slug);
  if (!info) return slug;
  return info[lang] ?? info['zh-TW'];
}

/** Get original category name from slug */
export function getOriginalCategory(slug: string): string {
  return slugToCategory.get(slug)?.original ?? slug;
}
