import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { stripMarkdown } from '../utils/markdown';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toISOString(date: Date | string): string {
  return new Date(date).toISOString();
}

/**
 * Convert relative URLs in HTML/Markdown to absolute URLs.
 * Handles: href="/...", src="/..."
 */
function makeAbsoluteUrls(text: string, siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return text
    // href="/path"
    .replace(/href="\/([^"]*)"/g, `href="${base}/$1"`)
    // src="/path"
    .replace(/src="\/([^"]*)"/g, `src="${base}/$1"`)
    // Markdown links [text](/path)
    .replace(/\]\(\/([^)]*)\)/g, `](${base}/$1)`)
    // Markdown images ![alt](/path)
    .replace(/!\[([^\]]*)\]\(\/([^)]*)\)/g, `![$1](${base}/$2)`);
}

export async function GET(context: APIContext) {
  const siteUrl = context.site?.toString().replace(/\/$/, '') ?? 'https://blog.dotw.me';
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const updated = sortedPosts.length > 0 ? toISOString(sortedPosts[0].data.date) : new Date().toISOString();

  const entries = sortedPosts.map((post) => {
    const url = `${siteUrl}/${post.id}/`;
    const rawDesc = post.data.description || post.data.title;
    const plainDesc = stripMarkdown(makeAbsoluteUrls(rawDesc, siteUrl));
    const pubDate = toISOString(post.data.date);

    return `  <entry>
    <title>${escapeXml(post.data.title)}</title>
    <link href="${escapeXml(url)}" />
    <id>${escapeXml(url)}</id>
    <updated>${pubDate}</updated>
    <published>${pubDate}</published>
    <author>
      <name>Logan</name>
    </author>
    <summary type="text">${escapeXml(plainDesc)}</summary>
  </entry>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="zh-tw">
  <title>Logan 的隨手筆記</title>
  <subtitle>關於技術、生活與思考的個人部落格</subtitle>
  <link href="${escapeXml(siteUrl + '/')}" />
  <link rel="self" type="application/atom+xml" href="${escapeXml(siteUrl + '/atom.xml')}" />
  <updated>${updated}</updated>
  <id>${escapeXml(siteUrl + '/')}</id>
  <author>
    <name>Logan</name>
  </author>
${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
