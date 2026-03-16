/**
 * Estimate reading time in minutes (Chinese: ~300 chars/min, code blocks count less).
 */
export function readingTime(content: string): number {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ''))
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/<[^>]+>/g, '');
  const charCount = cleanContent.replace(/\s/g, '').length;
  return Math.max(1, Math.round(charCount / 300));
}

/**
 * Strip Markdown syntax from a string for plain-text display.
 * Handles: links, images, bold, italic, code, headings, blockquotes, HTML tags.
 */
export function stripMarkdown(text: string | undefined | null): string {
  if (!text) return '';

  return text
    // Remove images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove links [text](url)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove reference-style links [text][ref]
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
    // Remove bold/italic ***text*** or **text** or *text* or ___text___ or __text__ or _text_
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    // Remove inline code `code`
    .replace(/`([^`]+)`/g, '$1')
    // Remove headings ## Heading (line-start or inline after sentence)
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\s#{1,6}\s+/g, ' ')
    // Remove blockquotes > text
    .replace(/^>\s+/gm, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Collapse multiple spaces / newlines
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
