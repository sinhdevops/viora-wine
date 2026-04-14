/**
 * Internal Link Suggestion Engine
 *
 * Scans article HTML for predefined keywords and replaces the FIRST
 * occurrence (that is not already inside an <a> tag) with an internal link.
 *
 * Usage:
 *   import { injectInternalLinks } from '@/utils/internal-links';
 *   const linkedHtml = injectInternalLinks(sanitisedHtml);
 */

export interface InternalLinkMap {
  [keyword: string]: string; // keyword → URL path
}

/** Default keyword → path map for Viora Wine. Extend as needed. */
export const DEFAULT_LINK_MAP: InternalLinkMap = {
  // Target keywords — long phrases first (processed before shorter ones)
  'rượu vang Úc Cabernet Sauvignon': '/products?region=australia&varietal=cabernet-sauvignon',
  'vang Úc Cabernet Sauvignon': '/products?region=australia&varietal=cabernet-sauvignon',
  'rượu vang Úc Shiraz': '/products?region=australia&varietal=shiraz',
  'vang Úc Shiraz': '/products?region=australia&varietal=shiraz',
  'rượu vang Úc cho người mới': '/products?region=australia&tag=beginner',
  'rượu vang Úc dưới 1 triệu': '/products?region=australia&maxPrice=1000000',
  'vang Úc dưới 1 triệu': '/products?region=australia&maxPrice=1000000',
  'rượu vang Úc làm quà tặng': '/gifts',
  'rượu vang Úc nhập khẩu chính hãng': '/products?region=australia',
  'shop rượu vang Úc': '/products?region=australia',
  'rượu vang Úc': '/products?region=australia',
  // Gift & price
  'quà tặng rượu vang': '/gifts',
  'rượu vang làm quà tặng': '/gifts',
  'vang dưới 1 triệu': '/products?maxPrice=1000000',
  'vang dưới 500k': '/products?maxPrice=500000',
  // Grape varieties
  'Cabernet Sauvignon': '/products?varietal=cabernet-sauvignon',
  'Shiraz': '/products?varietal=shiraz',
  // Regions
  'vang Chile': '/products?region=chile',
  'vang Pháp': '/products?region=france',
  'vang Úc': '/products?region=australia',
  'vang Ý': '/products?region=italy',
  // Type
  'rượu vang đỏ': '/products?type=red-wine',
  'rượu vang trắng': '/products?type=white-wine',
  'vang hồng': '/products?type=rose-wine',
  'vang nổ': '/products?type=sparkling',
  'champagne': '/products?category=champagne',
  // Other
  'vang BBQ': '/products?tag=bbq',
};

/**
 * Replace the first occurrence of each keyword (outside existing <a> tags)
 * with a styled internal anchor.
 *
 * @param html      Sanitised HTML string
 * @param customMap Optional overrides / additions to the default map
 */
export function injectInternalLinks(
  html: string,
  customMap?: InternalLinkMap
): string {
  const map: InternalLinkMap = { ...DEFAULT_LINK_MAP, ...customMap };

  // Process longer phrases first to avoid partial matches
  const keywords = Object.keys(map).sort((a, b) => b.length - a.length);
  let processed = html;

  for (const keyword of keywords) {
    const path = map[keyword];

    // Skip if this path is already linked somewhere in the content
    if (processed.includes(`href="${path}"`)) continue;

    const idx = processed.indexOf(keyword);
    if (idx === -1) continue;

    // Verify the keyword is in a text node, not inside an HTML tag.
    // We look at the character before: if it immediately follows a closing '>'
    // or is preceded by whitespace/text, it's safe to replace.
    const charBefore = processed[idx - 1];
    const insideTag = (() => {
      // Scan backward to see if there's an unclosed '<'
      const slice = processed.slice(Math.max(0, idx - 500), idx);
      const lastOpen = slice.lastIndexOf('<');
      const lastClose = slice.lastIndexOf('>');
      return lastOpen > lastClose; // still inside a tag
    })();

    if (insideTag) continue;

    // Also skip if we're inside an existing <a>…</a>
    const sliceBefore = processed.slice(0, idx);
    const openAnchor = sliceBefore.lastIndexOf('<a ');
    const closeAnchor = sliceBefore.lastIndexOf('</a>');
    if (openAnchor > closeAnchor) continue; // inside <a>

    processed =
      processed.slice(0, idx) +
      `<a href="${path}" class="text-brand-primary font-medium underline-offset-2 hover:underline" title="${keyword}">` +
      keyword +
      `</a>` +
      processed.slice(idx + keyword.length);
  }

  return processed;
}
