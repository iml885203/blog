import { getCollection } from 'astro:content';
import type { Lang } from './ui';

// Astro's glob loader normalizes directory names to lowercase,
// so zh-TW becomes zh-tw in post IDs.
const ZH_PREFIX = 'zh-tw/';
const EN_PREFIX = 'en/';

/** Extract slug from post id (removes lang prefix) */
export function getSlug(postId: string): string {
  return postId.replace(/^(zh-tw|en)\//, '');
}

/** Get posts for a specific language. Fallback: show zh-TW posts if no en version exists */
export async function getLocalizedPosts(lang: Lang) {
  const allPosts = await getCollection('posts', ({ data }) => !data.draft);

  const zhPosts = allPosts.filter((p) => p.id.startsWith(ZH_PREFIX));
  const enPosts = allPosts.filter((p) => p.id.startsWith(EN_PREFIX));

  if (lang === 'zh-TW') {
    return zhPosts;
  }

  // For English: use en version if available, fallback to zh-TW
  const enSlugs = new Set(enPosts.map((p) => getSlug(p.id)));
  const merged = [...enPosts, ...zhPosts.filter((p) => !enSlugs.has(getSlug(p.id)))];
  return merged;
}

/** Get a single post by slug for a specific language */
export async function getLocalizedPost(slug: string, lang: Lang) {
  const allPosts = await getCollection('posts', ({ data }) => !data.draft);

  if (lang === 'en') {
    const enPost = allPosts.find((p) => p.id === `${EN_PREFIX}${slug}`);
    if (enPost) return enPost;
  }

  return allPosts.find((p) => p.id === `${ZH_PREFIX}${slug}`) ?? null;
}

/** Check if a post has a translation in the other language */
export async function hasTranslation(slug: string, targetLang: Lang) {
  const allPosts = await getCollection('posts', ({ data }) => !data.draft);
  const prefix = targetLang === 'en' ? EN_PREFIX : ZH_PREFIX;
  return allPosts.some((p) => p.id === `${prefix}${slug}`);
}
