import type { Lang } from './ui';

interface TagInfo {
  slug: string;
  en: string;
  'zh-TW': string;
}

const tagMap: Record<string, TagInfo> = {
  NAT穿透: { slug: 'nat-traversal', en: 'NAT Traversal', 'zh-TW': 'NAT穿透' },
  學習筆記: { slug: 'learning-notes', en: 'Learning Notes', 'zh-TW': '學習筆記' },
  居家辦公: { slug: 'work-from-home', en: 'Work from Home', 'zh-TW': '居家辦公' },
  工具: { slug: 'tools', en: 'Tools', 'zh-TW': '工具' },
  工具比較: { slug: 'tool-comparison', en: 'Tool Comparison', 'zh-TW': '工具比較' },
  智慧家庭: { slug: 'smart-home', en: 'Smart Home', 'zh-TW': '智慧家庭' },
  水平擃展: { slug: 'horizontal-scaling', en: 'Horizontal Scaling', 'zh-TW': '水平擃展' },
  知識管理: { slug: 'knowledge-management', en: 'Knowledge Management', 'zh-TW': '知識管理' },
  程式: { slug: 'programming', en: 'Programming', 'zh-TW': '程式' },
  筆記: { slug: 'notes', en: 'Notes', 'zh-TW': '筆記' },
  經驗: { slug: 'experience', en: 'Experience', 'zh-TW': '經驗' },
  維護: { slug: 'maintenance', en: 'Maintenance', 'zh-TW': '維護' },
  網路: { slug: 'networking', en: 'Networking', 'zh-TW': '網路' },
  網頁開發: { slug: 'web-dev', en: 'Web Development', 'zh-TW': '網頁開發' },
  軟體開發: { slug: 'software-dev', en: 'Software Development', 'zh-TW': '軟體開發' },
  開源貢獻: { slug: 'open-source', en: 'Open Source', 'zh-TW': '開源貢獻' },
  開發工具: { slug: 'dev-tools', en: 'Dev Tools', 'zh-TW': '開發工具' },
  電腦: { slug: 'computer', en: 'Computer', 'zh-TW': '電腦' },
};

const slugToTag = new Map<string, TagInfo & { original: string }>();
for (const [original, info] of Object.entries(tagMap)) {
  slugToTag.set(info.slug, { ...info, original });
}

/** Get URL slug for a tag (English tags use lowercase as-is) */
export function getTagSlug(tag: string): string {
  if (tagMap[tag]) return tagMap[tag].slug;
  // English tags: lowercase and hyphenate
  return tag.toLowerCase().replace(/\s+/g, '-');
}

/** Get tag info by slug */
export function getTagBySlug(slug: string) {
  return slugToTag.get(slug) ?? null;
}

/** Get display name for a tag based on language */
export function getTagDisplayName(tag: string, lang: Lang): string {
  const info = tagMap[tag];
  if (!info) return tag; // English tags stay as-is
  return info[lang] ?? info['zh-TW'];
}

/** Get original tag name from slug */
export function getOriginalTag(slug: string): string {
  const info = slugToTag.get(slug);
  if (info) return info.original;
  // For English tags, the slug might be lowercase version
  // We need to find the original casing from posts
  return slug;
}
