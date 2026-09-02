/**
 * Smart HTML, AMP, and JSON-LD Schema Parser & Drag-and-Drop Importer
 */

import type { AmpConfig, PortalConfig } from '../types';

export interface ParsedTemplateResult {
  detectedType: 'amp' | 'portal' | 'schema' | 'generic-html';
  title?: string;
  brandName?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  targetUrl?: string;
  logoUrl?: string;
  bannerUrl?: string;
  themeColor?: string;
  rawJsonLd?: string;
  parsedSchemas?: any[];
  extractedLinks?: { text: string; url: string }[];
  seoHeading?: string;
  seoParagraph?: string;
  ampCustomCss?: string;
  rawHtml?: string;
}

export function parseUploadedTemplate(rawContent: string, fileName?: string): ParsedTemplateResult {
  const content = rawContent.trim();
  const lower = content.toLowerCase();

  const isJson = (content.startsWith('{') && content.endsWith('}')) || (content.startsWith('[') && content.endsWith(']'));
  const isAmp = lower.includes('<html ⚡') || lower.includes('<html amp') || lower.includes('amp-boilerplate') || lower.includes('cdn.ampproject.org');
  const isPortal = lower.includes('game') || lower.includes('provider') || lower.includes('jackpot') || lower.includes('rtp');

  let detectedType: ParsedTemplateResult['detectedType'] = 'generic-html';
  if (isJson || (fileName && fileName.endsWith('.json'))) {
    detectedType = 'schema';
  } else if (isAmp || (fileName && fileName.includes('amp'))) {
    detectedType = 'amp';
  } else if (isPortal) {
    detectedType = 'portal';
  }

  // If it's purely JSON schema
  if (detectedType === 'schema' && isJson) {
    try {
      const parsed = JSON.parse(content);
      const mainEntity = Array.isArray(parsed) ? parsed[0] : parsed;
      return {
        detectedType: 'schema',
        title: mainEntity.name || mainEntity.headline || 'Schema Baru',
        brandName: mainEntity.publisher?.name || mainEntity.name || 'VIP OFFICIAL',
        metaDescription: mainEntity.description || '',
        canonicalUrl: mainEntity.url || '',
        rawJsonLd: JSON.stringify(parsed, null, 2),
        parsedSchemas: Array.isArray(parsed) ? parsed : [parsed],
      };
    } catch {
      // Fall through to HTML regex parsing
    }
  }

  // Regex Extraction for HTML / AMP templates
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    content.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  const metaDescription = descMatch ? descMatch[1].trim() : '';

  const kwMatch = content.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i);
  const keywords = kwMatch ? kwMatch[1].trim() : '';

  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    content.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : '';

  const themeColorMatch = content.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
  const themeColor = themeColorMatch ? themeColorMatch[1].trim() : '#f59e0b';

  const ogImageMatch = content.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  const bannerUrl = ogImageMatch ? ogImageMatch[1].trim() : '';

  const ogSiteNameMatch = content.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
  let brandName = ogSiteNameMatch ? ogSiteNameMatch[1].trim() : '';

  if (!brandName && title) {
    const parts = title.split(/[-–|:©]/);
    if (parts.length > 1) {
      brandName = parts[0].trim();
    } else {
      brandName = title.substring(0, 20);
    }
  }

  // Extract JSON-LD Schemas inside <script type="application/ld+json">
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  const parsedSchemas: any[] = [];
  let jsonMatch: RegExpExecArray | null;
  while ((jsonMatch = jsonLdRegex.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(jsonMatch[1].trim());
      parsedSchemas.push(parsed);
    } catch {
      // Ignore malformed sub-scripts
    }
  }

  // Extract Links
  const linkRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const extractedLinks: { text: string; url: string }[] = [];
  let aMatch: RegExpExecArray | null;
  while ((aMatch = linkRegex.exec(content)) !== null) {
    const textClean = aMatch[2].replace(/<[^>]+>/g, '').trim();
    if (aMatch[1] && !aMatch[1].includes('schema.org') && !aMatch[1].includes('ampproject.org')) {
      extractedLinks.push({ text: textClean || 'Link', url: aMatch[1] });
    }
  }

  // Target URL fallback from first primary link
  const targetUrl = extractedLinks[0]?.url || '';

  // Extract H1 / H2 headings
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const seoHeading = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // Extract first substantial paragraph
  const pMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const seoParagraph = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Extract AMP custom CSS
  const cssMatch = content.match(/<style\s+amp-custom[^>]*>([\s\S]*?)<\/style>/i);
  const ampCustomCss = cssMatch ? cssMatch[1].trim() : '';

  return {
    detectedType,
    title: title || fileName || 'Imported Template',
    brandName: brandName || 'VIP OFFICIAL',
    metaDescription,
    keywords,
    canonicalUrl,
    targetUrl,
    bannerUrl,
    themeColor,
    rawJsonLd: parsedSchemas.length > 0 ? JSON.stringify(parsedSchemas[0], null, 2) : '',
    parsedSchemas,
    extractedLinks,
    seoHeading,
    seoParagraph,
    ampCustomCss,
    rawHtml: content,
  };
}

/**
 * Apply parsed template directly into existing AmpConfig
 */
export function applyParsedToAmpConfig(currentConfig: AmpConfig, parsed: ParsedTemplateResult): AmpConfig {
  return {
    ...currentConfig,
    title: parsed.title || currentConfig.title,
    brandName: parsed.brandName || currentConfig.brandName,
    metaDescription: parsed.metaDescription || currentConfig.metaDescription,
    keywords: parsed.keywords || currentConfig.keywords,
    canonicalUrl: parsed.canonicalUrl || currentConfig.canonicalUrl,
    targetUrl: parsed.targetUrl || currentConfig.targetUrl,
    bannerGifUrl: parsed.bannerUrl || currentConfig.bannerGifUrl,
    themeColor: parsed.themeColor || currentConfig.themeColor,
    seoHeading: parsed.seoHeading || currentConfig.seoHeading,
    seoParagraph: parsed.seoParagraph || currentConfig.seoParagraph,
    additionalMeta: parsed.rawJsonLd ? `<script type="application/ld+json">\n${parsed.rawJsonLd}\n</script>` : currentConfig.additionalMeta,
  };
}

/**
 * Apply parsed template directly into PortalConfig
 */
export function applyParsedToPortalConfig(currentConfig: PortalConfig, parsed: ParsedTemplateResult): PortalConfig {
  return {
    ...currentConfig,
    siteName: parsed.brandName || currentConfig.siteName,
    heroBannerUrl: parsed.bannerUrl || currentConfig.heroBannerUrl,
    primaryCtaUrl: parsed.targetUrl || currentConfig.primaryCtaUrl,
    footerText: parsed.metaDescription || currentConfig.footerText,
  };
}
