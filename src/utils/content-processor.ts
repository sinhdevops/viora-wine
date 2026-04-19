/**
 * Sanitizes HTML content to prevent mid-word line breaks caused by:
 * – Newlines/tabs inside text nodes (from rich-text editors saving raw \n)
 * – Zero-width spaces (U+200B) and soft hyphens (U+00AD)
 * – <wbr> tags
 * – &nbsp; entities that should be normal spaces
 *
 * Only collapses whitespace inside text nodes (between > and <),
 * never inside tag attributes.
 */
export function sanitizeHtmlContent(html: string): string {
  return html
    .replace(/&nbsp;/g, ' ')                          // &nbsp; → normal space
    .replace(/[\u200B\u200C\u200D\u00AD]/g, '')       // zero-width & soft-hyphen
    .replace(/<wbr\s*\/?>/gi, '')                     // remove <wbr>
    .replace(/>([^<]*)</g, (_, text) =>               // collapse whitespace in text nodes only
      '>' + text.replace(/\s+/g, ' ') + '<'
    );
}

/**
 * Processes raw HTML content for blog/article pages:
 * – Injects unique `id` attributes into every <h2> and <h3> element
 *   (so anchor links and the IntersectionObserver can target them).
 * – Returns the ordered list of headings for the Table of Contents.
 */

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Convert plain text to a URL-safe, Vietnamese-friendly slug. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // strip any inner HTML
    .replace(/[^\w\u00C0-\u024F\u1E00-\u1EFF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 60);
}

/**
 * @param html  Raw HTML string (already DOMPurify-sanitised is fine)
 * @returns     { processedHtml, headings }
 *              processedHtml – same HTML with id="…" on every h2/h3
 *              headings      – ordered TOC items
 */
export function processContent(html: string): {
  processedHtml: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  const usedIds = new Set<string>();
  let idx = 0;

  const processedHtml = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag[1], 10) as 2 | 3;
      const rawText = inner.replace(/\<[^\>]+\>/g, '').trim();
      // Decode HTML entities so TOC text shows real characters (e.g. &nbsp; → space)
      const text = rawText
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/\s+/g, ' ')
        .trim();
      let id = slugify(text) || `heading-${idx}`;

      // Guarantee uniqueness
      if (usedIds.has(id)) id = `${id}-${idx}`;
      usedIds.add(id);
      idx++;

      headings.push({ id, text, level });

      // Remove any existing id attr before injecting ours
      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, '');
      return `<${tag}${cleanAttrs} id="${id}">${inner}</${tag}>`;
    }
  );

  return { processedHtml, headings };
}

/**
 * Calculates estimated reading time from an HTML string.
 * Strips tags, counts words, divides by wordsPerMinute (default 200).
 * Returns a Vietnamese label e.g. "5 phút đọc".
 */
export function calculateReadingTime(html: string, wordsPerMinute = 200): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(' ').filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} phút đọc`;
}

/**
 * Ensures every <img> in an HTML string has a non-empty alt attribute.
 * Injects fallbackAlt on any <img> that is missing alt or has alt="".
 */
export function ensureImgAlt(html: string, fallbackAlt: string): string {
  const escaped = fallbackAlt.replace(/"/g, '&quot;');
  return html.replace(/<img([^>]*)>/gi, (_, attrs: string) => {
    if (/\balt\s*=\s*"[^"]+"/.test(attrs)) return `<img${attrs}>`;
    // Remove empty alt="" if present, then inject fallback
    const cleanAttrs = attrs.replace(/\s*\balt\s*=\s*"[^"]*"/gi, '');
    return `<img${cleanAttrs} alt="${escaped}">`;
  });
}

/**
 * Splits processedHtml at the position of the second <h2> tag.
 * Returns [firstSection, remainder].
 * If there is no second <h2>, returns [html, ''].
 */
export function splitAtSecondH2(html: string): [string, string] {
  let count = 0;
  const regex = /<h2/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    count++;
    if (count === 2) {
      return [html.slice(0, match.index), html.slice(match.index)];
    }
  }

  return [html, ''];
}
