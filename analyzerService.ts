export interface AuditIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: 'amp' | 'seo' | 'security' | 'links' | 'performance';
  title: string;
  description: string;
  location?: string;
  canAutoFix: boolean;
  fixActionName?: string;
}

export interface AuditResult {
  score: number; // 0 - 100
  totalChecks: number;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  issues: AuditIssue[];
  ampValid: boolean;
  securityScore: number;
  seoScore: number;
  timestamp: string;
}

export function auditCodeAndConfig(params: {
  ampHtml: string;
  portalHtml: string;
  registerHtml: string;
  safelinkHtml: string;
  brandName: string;
  targetUrl: string;
  logoUrl: string;
  bannerUrl: string;
  canonicalUrl: string;
  cyberShieldEnabled?: boolean;
}): AuditResult {
  const issues: AuditIssue[] = [];

  const { ampHtml, portalHtml, registerHtml, safelinkHtml, brandName, targetUrl, logoUrl, bannerUrl, canonicalUrl, cyberShieldEnabled } = params;

  // 1. AMP SPECIFIC AUDIT
  if (!ampHtml.includes('⚡') && !ampHtml.includes('amp')) {
    issues.push({
      id: 'amp-missing-attribute',
      type: 'error',
      category: 'amp',
      title: 'Missing AMP Lightning Flag (⚡ / amp)',
      description: 'Halaman AMP wajib memiliki atribut ⚡ atau amp pada tag <html ⚡>.',
      location: 'AMP HTML (<html ⚡>)',
      canAutoFix: true,
      fixActionName: 'Tambahkan atribut ⚡ ke <html>',
    });
  }

  if (!ampHtml.includes('https://cdn.ampproject.org/v0.js')) {
    issues.push({
      id: 'amp-missing-runtime',
      type: 'error',
      category: 'amp',
      title: 'Missing AMP JS Runtime Script',
      description: 'Tag script async https://cdn.ampproject.org/v0.js wajib ada di dalam <head>.',
      location: 'AMP <head>',
      canAutoFix: true,
      fixActionName: 'Suntikkan AMP Runtime',
    });
  }

  if (!ampHtml.includes('amp-boilerplate') || !ampHtml.includes('amp-custom')) {
    issues.push({
      id: 'amp-boilerplate-missing',
      type: 'warning',
      category: 'amp',
      title: 'AMP Boilerplate / Custom Style Warning',
      description: 'Format <style amp-boilerplate> dan <style amp-custom> harus sesuai standar Google AMP.',
      location: 'AMP <head>',
      canAutoFix: true,
      fixActionName: 'Format ulang Boilerplate AMP',
    });
  }

  // Detect forbidden standard <img> tags in AMP (should be <amp-img> or <amp-anim>)
  // But allow inside <noscript>
  const imgRegex = /<img\s+[^>]*>/gi;
  const matchesImg = ampHtml.match(imgRegex);
  if (matchesImg && matchesImg.length > 0) {
    const isInsideNoscript = ampHtml.includes('<noscript>') && ampHtml.includes('</noscript>');
    if (!isInsideNoscript) {
      issues.push({
        id: 'amp-forbidden-img-tag',
        type: 'error',
        category: 'amp',
        title: 'Penggunaan Tag <img> Terlarang di AMP',
        description: 'Google AMP melarang tag <img> biasa. Harus menggunakan <amp-img> atau <amp-anim> dengan atribut width, height, layout.',
        location: 'AMP Body',
        canAutoFix: true,
        fixActionName: 'Konversi <img> ke <amp-img>',
      });
    }
  }

  // 2. LINK & SSL AUDIT
  const allUrls = [targetUrl, logoUrl, bannerUrl, canonicalUrl].filter(Boolean);
  const httpUrls = allUrls.filter((u) => u.startsWith('http://'));
  if (httpUrls.length > 0) {
    issues.push({
      id: 'links-insecure-http',
      type: 'error',
      category: 'security',
      title: 'Protokol Tidak Aman (Insecure HTTP Ditemukan)',
      description: `Ditemukan ${httpUrls.length} URL yang masih menggunakan http:// bukan https://. Hal ini menyebabkan peringatan Mixed Content di browser modern.`,
      location: 'Global URLs',
      canAutoFix: true,
      fixActionName: 'Tingkatkan semua URL ke HTTPS (SSL)',
    });
  }

  if (!targetUrl || targetUrl.trim() === '' || targetUrl.includes('example.com')) {
    issues.push({
      id: 'links-missing-target',
      type: 'error',
      category: 'links',
      title: 'Target Link Pendaftaran Belum Dikonfigurasi',
      description: 'Link tujuan pendaftaran/login masih default atau kosong. Pastikan mengarahkan ke link affiliate/domain tujuan Anda.',
      location: 'Target URL',
      canAutoFix: false,
    });
  }

  if (!canonicalUrl || canonicalUrl.trim() === '') {
    issues.push({
      id: 'seo-missing-canonical',
      type: 'warning',
      category: 'seo',
      title: 'Canonical URL Belum Ditentukan',
      description: 'Tag <link rel="canonical"> sangat krusial untuk mencegah duplikasi konten di Google Index.',
      location: 'SEO <head>',
      canAutoFix: true,
      fixActionName: 'Set Canonical URL otomatis',
    });
  }

  // 3. SEO & CONTENT AUDIT
  if (!brandName || brandName.trim().length < 2) {
    issues.push({
      id: 'seo-short-brandname',
      type: 'warning',
      category: 'seo',
      title: 'Nama Brand Terlalu Pendek atau Kosong',
      description: 'Nama brand yang jelas membantu mesin pencari mengidentifikasi entitas situs Anda.',
      location: 'Brand Config',
      canAutoFix: false,
    });
  }

  if (!ampHtml.includes('application/ld+json')) {
    issues.push({
      id: 'seo-missing-jsonld',
      type: 'warning',
      category: 'seo',
      title: 'Skema Terstruktur JSON-LD Belum Terdeteksi',
      description: 'Google Rich Results membutuhkan Structured Data schema.org (WebPage/Article/Product).',
      location: 'Structured Data',
      canAutoFix: true,
      fixActionName: 'Aktifkan Skema JSON-LD',
    });
  }

  // 4. SECURITY & ANTI-INSPECT AUDIT
  if (!cyberShieldEnabled) {
    issues.push({
      id: 'security-cybershield-disabled',
      type: 'info',
      category: 'security',
      title: 'Cyber Shield Anti-Inspect Sedang Nonaktif',
      description: 'Proteksi klik kanan, Ctrl+U (Lihat Sumber), F12 Inspect Element, dan Anti-Copy sedang dimatikan.',
      location: 'Cyber Shield Module',
      canAutoFix: true,
      fixActionName: 'Aktifkan Proteksi Cyber Shield',
    });
  }

  // 5. RESPONSIVE & META VIEWPORT
  if (!ampHtml.includes('name="viewport"') || !portalHtml.includes('name="viewport"')) {
    issues.push({
      id: 'perf-missing-viewport',
      type: 'error',
      category: 'performance',
      title: 'Meta Viewport Hilang',
      description: 'Tag meta viewport wajib ada agar tampilan ramah ponsel (Mobile Friendly).',
      location: '<head> Viewport',
      canAutoFix: true,
      fixActionName: 'Tambahkan Meta Viewport Responsive',
    });
  }

  // Calculate scores
  const errorCount = issues.filter((i) => i.type === 'error').length;
  const warningCount = issues.filter((i) => i.type === 'warning').length;
  const infoCount = issues.filter((i) => i.type === 'info').length;

  let score = 100 - errorCount * 25 - warningCount * 10 - infoCount * 3;
  if (score < 0) score = 0;

  const ampValid = errorCount === 0 && ampHtml.includes('⚡') && ampHtml.includes('https://cdn.ampproject.org/v0.js');
  const securityScore = Math.max(20, 100 - (httpUrls.length > 0 ? 30 : 0) - (!cyberShieldEnabled ? 15 : 0));
  const seoScore = Math.max(30, 100 - (!canonicalUrl ? 20 : 0) - (!ampHtml.includes('application/ld+json') ? 25 : 0));

  return {
    score,
    totalChecks: 18,
    errorCount,
    warningCount,
    infoCount,
    issues,
    ampValid,
    securityScore,
    seoScore,
    timestamp: new Date().toLocaleTimeString('id-ID'),
  };
}
