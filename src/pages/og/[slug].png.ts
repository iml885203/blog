import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { formatDate } from '@/utils/date';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const fontPath = join(process.cwd(), 'src/fonts/NotoSansSC-Regular.ttf');
const buf = readFileSync(fontPath);
const fontData = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const { title, date, category, tags } = post.data;

  const bg = '#1e1e2e';
  const accent = '#a6e3a1'; // green
  const accentAlt = '#89b4fa'; // blue
  const textMain = '#cdd6f4';
  const textSub = '#a6adc8';
  const textMuted = '#6c7086';

  const displayTitle = title.length > 55 ? title.slice(0, 53) + '…' : title;
  const displayCategory = escapeHtml(category ?? tags?.[0] ?? '');
  const displayDate = escapeHtml(formatDate(date));
  const displayTitleEscaped = escapeHtml(displayTitle);
  const titleFontSize = displayTitle.length > 30 ? '50px' : '62px';

  const categoryBadge = displayCategory
    ? `<div style="background: rgba(166,227,161,0.1); border: 1px solid rgba(166,227,161,0.3); border-radius: 6px; padding: 4px 14px; color: ${accent}; font-size: 22px; display: flex; align-items: center;">${displayCategory}</div>`
    : '';

  const markup = `
<div style="display: flex; width: 1200px; height: 630px; background: ${bg}; font-family: 'Noto Sans SC', sans-serif; position: relative; overflow: hidden;">
  <!-- Left accent bar -->
  <div style="position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: linear-gradient(180deg, ${accent} 0%, ${accentAlt} 100%); display: flex;"></div>

  <!-- Background circle 1 -->
  <div style="position: absolute; right: -80px; top: -80px; width: 400px; height: 400px; border-radius: 50%; background: rgba(137,180,250,0.05); display: flex;"></div>

  <!-- Background circle 2 -->
  <div style="position: absolute; right: 100px; bottom: -100px; width: 300px; height: 300px; border-radius: 50%; background: rgba(166,227,161,0.05); display: flex;"></div>

  <!-- Main content -->
  <div style="display: flex; flex-direction: column; justify-content: space-between; padding: 60px 72px 60px 80px; width: 100%; height: 100%;">

    <!-- Top row: category badge + dots -->
    <div style="display: flex; align-items: center; gap: 16px;">
      ${categoryBadge}
      <div style="display: flex; gap: 6px; align-items: center;">
        <div style="width: 6px; height: 6px; border-radius: 50%; background: ${accent}; display: flex;"></div>
        <div style="width: 6px; height: 6px; border-radius: 50%; background: ${accentAlt}; display: flex;"></div>
        <div style="width: 6px; height: 6px; border-radius: 50%; background: ${textMuted}; display: flex;"></div>
      </div>
    </div>

    <!-- Title -->
    <div style="display: flex; flex: 1; align-items: center; padding-top: 20px; padding-bottom: 20px;">
      <div style="color: ${textMain}; font-size: ${titleFontSize}; font-weight: 700; line-height: 1.3; letter-spacing: -0.5px; display: flex; flex-wrap: wrap;">
        ${displayTitleEscaped}
      </div>
    </div>

    <!-- Bottom row -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end;">

      <!-- Author + date -->
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <!-- Avatar circle -->
          <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, ${accent} 0%, ${accentAlt} 100%); display: flex; align-items: center; justify-content: center; color: ${bg}; font-size: 16px; font-weight: 700;">
            L
          </div>
          <div style="color: ${textSub}; font-size: 22px; font-weight: 500; display: flex;">Logan</div>
        </div>
        <div style="color: ${textMuted}; font-size: 20px; padding-left: 46px; display: flex;">${displayDate}</div>
      </div>

      <!-- Site name -->
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
        <div style="color: ${accent}; font-size: 24px; font-weight: 700; display: flex;">Logan 的隨手筆記</div>
        <div style="color: ${textMuted}; font-size: 18px; display: flex;">blog.dotw.me</div>
      </div>

    </div>
  </div>
</div>
`;

  const vNode = html(markup);

  const svg = await satori(vNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Noto Sans SC',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
