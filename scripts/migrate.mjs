#!/usr/bin/env node
/**
 * migrate.mjs — Hexo → Astro Content Collections migration script
 *
 * Input:  ~/dev/logan/blog-source/source/_posts/**\/*.md
 * Output: ~/dev/logan/blog-astro/src/content/posts/*.md
 *         ~/dev/logan/blog-astro/public/images/posts/{slug}/  (local assets)
 */

import fs from 'fs';
import path from 'path';

const SRC_POSTS = path.resolve(process.env.HOME, 'dev/logan/blog-source/source/_posts');
const DEST_POSTS = path.resolve(process.env.HOME, 'dev/logan/blog-astro/src/content/posts');
const DEST_PUBLIC_IMAGES = path.resolve(process.env.HOME, 'dev/logan/blog-astro/public/images/posts');

// Make sure output dirs exist
fs.mkdirSync(DEST_POSTS, { recursive: true });
fs.mkdirSync(DEST_PUBLIC_IMAGES, { recursive: true });

// ------- helpers -------

/**
 * Parse YAML-ish frontmatter (we handle the specific patterns in Hexo posts)
 */
function parseFrontmatter(raw) {
  const result = {};
  const lines = raw.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // title: some text
    const titleMatch = line.match(/^title:\s*(.+)$/);
    if (titleMatch) { result.title = titleMatch[1].trim().replace(/^['"]|['"]$/g, ''); continue; }

    // date: 2022-08-10 13:33:00
    const dateMatch = line.match(/^date:\s*(.+)$/);
    if (dateMatch) { result.date = dateMatch[1].trim(); continue; }

    // categories: 🏠 智慧家庭  (single string, possibly with emoji)
    // or categories:\n  - foo\n  - bar
    const catMatch = line.match(/^categories:\s*(.*)$/);
    if (catMatch) {
      const inline = catMatch[1].trim();
      if (inline && !inline.startsWith('-')) {
        // Single category string, possibly with brackets
        if (inline.startsWith('[')) {
          // e.g. categories: [foo, bar]
          result.categories = inline.replace(/[\[\]]/g, '').split(',').map(s => s.trim());
        } else {
          result.categories = [inline];
        }
      } else {
        // Multi-line list
        const cats = [];
        let j = i + 1;
        while (j < lines.length && /^\s+-\s+/.test(lines[j])) {
          cats.push(lines[j].replace(/^\s+-\s+/, '').trim());
          j++;
        }
        result.categories = cats.length ? cats : [];
        i = j - 1;
      }
      continue;
    }

    // tags: [Javascript, 程式]  or multi-line
    const tagMatch = line.match(/^tags:\s*(.*)$/);
    if (tagMatch) {
      const inline = tagMatch[1].trim();
      if (inline.startsWith('[')) {
        result.tags = inline.replace(/[\[\]]/g, '').split(',').map(s => s.trim()).filter(Boolean);
      } else if (inline && !inline.startsWith('-')) {
        result.tags = [inline];
      } else {
        const tags = [];
        let j = i + 1;
        while (j < lines.length && /^\s+-\s+/.test(lines[j])) {
          tags.push(lines[j].replace(/^\s+-\s+/, '').trim());
          j++;
        }
        result.tags = tags.length ? tags : [];
        i = j - 1;
      }
      continue;
    }
  }

  return result;
}

/**
 * Extract cover URL: line after <!-- banner --> that matches ![](...) or ![alt](...)
 */
function extractCover(body) {
  const bannerMatch = body.match(/<!--\s*banner\s*-->\s*\n!\[.*?\]\((.*?)\)/);
  if (bannerMatch) return bannerMatch[1].trim();
  return null;
}

/**
 * Extract description: text between <!-- 前言 --> and <!-- more -->
 */
function extractDescription(body) {
  const descMatch = body.match(/<!--\s*前言\s*-->\s*\n([\s\S]*?)<!--\s*more\s*-->/);
  if (descMatch) {
    return descMatch[1].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
  }
  return null;
}

/**
 * Clean body: remove Hexo-specific markers and convert tags
 */
function cleanBody(body, slug) {
  let out = body;

  // Remove the banner block (<!-- banner --> + the image line)
  out = out.replace(/<!--\s*banner\s*-->\s*\n!\[.*?\]\(.*?\)\n?/, '');

  // Remove <!-- 前言 --> marker
  out = out.replace(/<!--\s*前言\s*-->\s*\n?/g, '');

  // Remove <!-- more --> marker
  out = out.replace(/<!--\s*more\s*-->\s*\n?/g, '');

  // Remove <!-- 文章開始 --> marker
  out = out.replace(/<!--\s*文章開始\s*-->\s*\n?/g, '');

  // Remove other common HTML comments we injected
  out = out.replace(/<!--.*?-->\s*\n?/g, '');

  // {% asset_img filename.ext [alt text] %} → ![alt text](/images/posts/{slug}/filename.ext)
  out = out.replace(/\{%\s*asset_img\s+(\S+)(?:\s+(.*?))?\s*%\}/g, (_, filename, alt) => {
    const altText = alt ? alt.trim() : '';
    return `![${altText}](/images/posts/${slug}/${filename})`;
  });

  // {% note info %} ... {% endnote %} → > (blockquote)
  out = out.replace(/\{%\s*note\s+[^%]+%\}\s*\n?([\s\S]*?)\{%\s*endnote\s*%\}/g, (_, content) => {
    return content.trim().split('\n').map(line => `> ${line}`).join('\n') + '\n';
  });

  // {% note info no-icon SomeTitle %} ... {% endnote %} (already handled above, but just in case)
  out = out.replace(/\{%\s*note\s+.*?%\}\s*\n?([\s\S]*?)\{%\s*endnote\s*%\}/g, (_, content) => {
    return content.trim().split('\n').map(line => `> ${line}`).join('\n') + '\n';
  });

  // {% btn url, text, icon, tooltip %} → [text](url)
  out = out.replace(/\{%\s*btn\s+([^,]+),\s*([^,]+)(?:,[^%]*)?\s*%\}/g, (_, url, text) => {
    return `[${text.trim()}](${url.trim()})`;
  });

  // {% grouppicture ... %} ... {% endgrouppicture %} → just keep inner content
  out = out.replace(/\{%\s*grouppicture[^%]*%\}\s*\n?([\s\S]*?)\{%\s*endgrouppicture\s*%\}/g, (_, content) => {
    return content.trim() + '\n';
  });

  // Remove any remaining {% ... %} Hexo tags
  out = out.replace(/\{%[^%]+%\}/g, '');

  return out.trim();
}

/**
 * Build Astro-compatible frontmatter string (YAML)
 */
function buildFrontmatter(meta) {
  const lines = ['---'];

  // title: use double quotes to handle special chars
  lines.push(`title: ${JSON.stringify(meta.title || '')}`);
  lines.push(`date: ${meta.date || ''}`);

  // category: single string (first one, strip emoji prefix)
  if (meta.categories && meta.categories.length > 0) {
    lines.push(`category: ${JSON.stringify(meta.categories[0])}`);
  }

  // tags: YAML list
  if (meta.tags && meta.tags.length > 0) {
    lines.push('tags:');
    for (const tag of meta.tags) {
      lines.push(`  - ${JSON.stringify(tag)}`);
    }
  } else {
    lines.push('tags: []');
  }

  if (meta.cover) {
    lines.push(`cover: ${JSON.stringify(meta.cover)}`);
  }

  if (meta.description) {
    // Escape multiline in YAML
    lines.push(`description: ${JSON.stringify(meta.description)}`);
  }

  lines.push('---');
  return lines.join('\n');
}

// ------- helpers -------

/**
 * Recursively find all .md files in a directory
 */
function findMd(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMd(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

// ------- main -------

const allMd = findMd(SRC_POSTS);
console.log(`Found ${allMd.length} posts`);

let success = 0;
let errors = [];

for (const srcFile of allMd) {
  const basename = path.basename(srcFile, '.md'); // e.g. "smart-home-and-matter"
  const slug = basename;
  const srcDir = path.dirname(srcFile);           // e.g. .../2022
  const assetDir = path.join(srcDir, basename);   // e.g. .../2022/smart-home-and-matter/

  try {
    const raw = fs.readFileSync(srcFile, 'utf8');

    // Split frontmatter and body
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fmMatch) {
      errors.push({ file: srcFile, error: 'No frontmatter found' });
      continue;
    }

    const fmRaw = fmMatch[1];
    const bodyRaw = fmMatch[2];

    // Parse
    const meta = parseFrontmatter(fmRaw);
    meta.cover = extractCover(bodyRaw);
    meta.description = extractDescription(bodyRaw);

    // Clean body
    const body = cleanBody(bodyRaw, slug);

    // Build output
    const fm = buildFrontmatter(meta);
    const output = `${fm}\n\n${body}\n`;

    // Write markdown
    const destFile = path.join(DEST_POSTS, `${slug}.md`);
    fs.writeFileSync(destFile, output, 'utf8');

    // Copy local image assets if folder exists
    if (fs.existsSync(assetDir)) {
      const destImgDir = path.join(DEST_PUBLIC_IMAGES, slug);
      fs.mkdirSync(destImgDir, { recursive: true });
      // Copy all image files
      const assetFiles = fs.readdirSync(assetDir);
      for (const af of assetFiles) {
        const srcImg = path.join(assetDir, af);
        const destImg = path.join(destImgDir, af);
        fs.copyFileSync(srcImg, destImg);
      }
      console.log(`  ✓ ${slug} (${assetFiles.length} assets)`);
    } else {
      console.log(`  ✓ ${slug}`);
    }

    success++;
  } catch (err) {
    errors.push({ file: srcFile, error: err.message });
    console.error(`  ✗ ${srcFile}: ${err.message}`);
  }
}

console.log(`\n✅ Migrated: ${success}/${allMd.length}`);
if (errors.length > 0) {
  console.log(`\n❌ Errors (${errors.length}):`);
  for (const e of errors) {
    console.log(`  ${e.file}: ${e.error}`);
  }
  process.exit(1);
} else {
  console.log('🎉 All posts migrated successfully!');
}
