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
    // Remove headings ## Heading
    .replace(/^#{1,6}\s+/gm, '')
    // Remove blockquotes > text
    .replace(/^>\s+/gm, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Collapse multiple spaces / newlines
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
