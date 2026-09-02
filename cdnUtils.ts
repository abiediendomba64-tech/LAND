// Smart CDN Auto-Converter, Image Optimizer & Carousel Utilities

export type CdnProvider = 'direct' | 'weserv' | 'statically' | 'jsdelivr';
export type ImageFormat = 'webp' | 'png' | 'jpg';

/**
 * Checks if a given string is already an active CDN or proxy URL
 */
export function isCdnUrl(url: string): boolean {
  if (!url) return false;
  const clean = url.toLowerCase();
  return (
    clean.includes('cdn.statically.io') ||
    clean.includes('images.weserv.nl') ||
    clean.includes('cdn.jsdelivr.net') ||
    clean.includes('cdnjs.cloudflare.com') ||
    clean.includes('unpkg.com')
  );
}

/**
 * Extracts the original, raw target image URL from any known CDN/proxy wrapper
 */
export function extractOriginalUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If statically wrapper: https://cdn.statically.io/img/domain.com/path/to/img.webp?params
  if (trimmed.includes('cdn.statically.io/img/')) {
    const afterPrefix = trimmed.split('cdn.statically.io/img/')[1];
    if (afterPrefix) {
      const cleanPath = afterPrefix.split('?')[0];
      return `https://${cleanPath}`;
    }
  }

  // If weserv wrapper: https://images.weserv.nl/?url=...
  if (trimmed.includes('images.weserv.nl')) {
    try {
      const urlObj = new URL(trimmed);
      const rawTarget = urlObj.searchParams.get('url');
      if (rawTarget) {
        return decodeURIComponent(rawTarget);
      }
    } catch (e) {
      const match = trimmed.match(/[?&]url=([^&]+)/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    }
  }

  // If jsdelivr wrapper from github: https://cdn.jsdelivr.net/gh/user/repo/path
  if (trimmed.includes('cdn.jsdelivr.net/gh/')) {
    return trimmed.replace('https://cdn.jsdelivr.net/gh/', 'https://raw.githubusercontent.com/');
  }

  return trimmed;
}

/**
 * Automatically converts any standard image URL into a fast CDN or Direct URL
 */
export function autoConvertLinkToCdn(
  url: string,
  provider: CdnProvider = 'weserv',
  format: ImageFormat = 'webp',
  width?: number,
  height?: number
): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If it's a data URI or SVG inline, return as is
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Extract clean original URL first to allow flexible switching between providers
  const original = extractOriginalUrl(trimmed);

  // If provider is 'direct', return the pure original URL without any proxy
  if (provider === 'direct') {
    return original;
  }

  // If not a valid HTTP URL, return as is
  if (!original.startsWith('http://') && !original.startsWith('https://')) {
    return original;
  }

  // Handle GitHub links to jsDelivr
  if (original.includes('github.com') || original.includes('raw.githubusercontent.com')) {
    const jsdelivrUrl = original
      .replace('https://github.com/', 'https://cdn.jsdelivr.net/gh/')
      .replace('https://raw.githubusercontent.com/', 'https://cdn.jsdelivr.net/gh/')
      .replace('/raw/', '/');
    if (provider === 'jsdelivr') return jsdelivrUrl;
  }

  // Provider: Weserv Image Proxy & Global Cache (Most reliable for arbitrary domains)
  if (provider === 'weserv') {
    const params: string[] = [`url=${encodeURIComponent(original)}`];
    if (width) params.push(`w=${width}`);
    if (height) params.push(`h=${height}`);
    if (format) params.push(`output=${format}`);
    params.push('we=1'); // webp fallback
    return `https://images.weserv.nl/?${params.join('&')}`;
  }

  // Provider: Statically Multi-CDN (Fast, supports WebP on-the-fly)
  if (provider === 'statically') {
    const cleanUrl = original.replace(/^https?:\/\//, '');
    const params: string[] = [];
    if (width) params.push(`w=${width}`);
    if (height) params.push(`h=${height}`);
    if (format) params.push(`f=${format}`);
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    return `https://cdn.statically.io/img/${cleanUrl}${queryString}`;
  }

  // Provider: jsDelivr
  if (provider === 'jsdelivr') {
    return original.replace('github.com', 'cdn.jsdelivr.net/gh');
  }

  return original;
}

/**
 * Batch converts a list of URLs to CDN URLs
 */
export function batchConvertLinksToCdn(
  urls: string[],
  provider: CdnProvider = 'weserv',
  format: ImageFormat = 'webp'
): { original: string; cdn: string }[] {
  return urls
    .map((u) => u.trim())
    .filter((u) => u.length > 0)
    .map((raw) => {
      const orig = extractOriginalUrl(raw);
      return {
        original: orig,
        cdn: autoConvertLinkToCdn(orig, provider, format),
      };
    });
}

/**
 * Automatically parses any HTML string and converts all image `src`, `srcset`, `<amp-img>`,
 * `<amp-anim>`, and CSS `background: url(...)` to fast CDN links
 */
export function convertHtmlImagesToCdn(
  html: string,
  provider: CdnProvider = 'weserv',
  format: ImageFormat = 'webp'
): { modifiedHtml: string; convertedCount: number } {
  if (!html) return { modifiedHtml: '', convertedCount: 0 };

  let convertedCount = 0;

  // Replace src="https://..." in img, amp-img, amp-anim
  const srcRegex = /(<(?:img|amp-img|amp-anim)[^>]*?\ssrc=["'])(https?:\/\/[^"'>\s]+)(["'])/gi;
  const modifiedHtml = html.replace(srcRegex, (_match, prefix, url, suffix) => {
    if (isCdnUrl(url) && provider !== 'direct') return _match;
    const cdnUrl = autoConvertLinkToCdn(url, provider, format);
    convertedCount++;
    return `${prefix}${cdnUrl}${suffix}`;
  });

  return { modifiedHtml, convertedCount };
}

/**
 * Reads a local file and converts it into a high-performance Base64 Data URL or WebP
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
