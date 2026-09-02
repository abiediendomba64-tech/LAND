import type {
  AmpConfig,
  PortalConfig,
  RegisterConfig,
  SafeLinkConfig,
  DynamicScript,
  GameDemoItem,
  RtpGimmickConfig,
  ResponsibleLegalConfig,
} from '../types';
import { OFFICIAL_DEMO_GAMES_DATABASE, DEFAULT_RTP_GIMMICK_CONFIG, DEFAULT_RESPONSIBLE_LEGAL_CONFIG } from '../data/categoryGamesData';
import { generateCyberShieldScript } from '../utils/cyberShield';
import {
  generateAmpRtpZenvia,
  generateAmpBetonCyber,
  generateAmpTotoRed,
  generateAmpNagabetGalaxy,
  generateAmpTotoCarousel,
  generateAmpDemoGrid,
} from './ampTemplates';

export const compileScripts = (scripts: DynamicScript[] = [], targetPosition: 'head' | 'body-start' | 'body-end'): string => {
  return scripts
    .filter((s) => s.enabled && s.position === targetPosition)
    .map((s) => {
      if (s.type === 'gtm') {
        if (targetPosition === 'head') {
          return `<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.codeOrId}');</script>\n<!-- End Google Tag Manager -->`;
        } else if (targetPosition === 'body-start') {
          return `<!-- Google Tag Manager (noscript) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${s.codeOrId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n<!-- End Google Tag Manager (noscript) -->`;
        }
      }
      if (s.type === 'ga4' && targetPosition === 'head') {
        return `<!-- Google Analytics 4 -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${s.codeOrId}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${s.codeOrId}');\n</script>`;
      }
      if (s.type === 'facebook' && targetPosition === 'head') {
        return `<!-- Meta Pixel Code -->\n<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${s.codeOrId}');fbq('track', 'PageView');</script>`;
      }
      if (s.type === 'tiktok' && targetPosition === 'head') {
        return `<!-- TikTok Pixel Code -->\n<script>!function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}; ttq.load('${s.codeOrId}'); ttq.page(); }(window, document, 'ttq');</script>`;
      }
      return s.codeOrId;
    })
    .join('\n');
};

export const generateAmpHtml = (config: AmpConfig): string => {
  if (config.templatePreset === 'rtp-zenvia') {
    return generateAmpRtpZenvia(config);
  }
  if (config.templatePreset === 'beton-cyber') {
    return generateAmpBetonCyber(config);
  }
  if (config.templatePreset === 'toto-red') {
    return generateAmpTotoRed(config);
  }
  if (config.templatePreset === 'nagabet-galaxy') {
    return generateAmpNagabetGalaxy(config);
  }
  if (config.templatePreset === 'toto-carousel') {
    return generateAmpTotoCarousel(config);
  }
  if (config.templatePreset === 'demo-grid') {
    return generateAmpDemoGrid(config);
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': config.structuredDataType || 'WebPage',
    name: config.title,
    headline: config.title,
    description: config.metaDescription,
    url: config.canonicalUrl || 'https://example.com',
    publisher: {
      '@type': 'Organization',
      name: config.brandName,
      logo: {
        '@type': 'ImageObject',
        url: config.logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.canonicalUrl || 'https://example.com',
    },
  };

  return `<!doctype html>
<html ⚡ lang="id">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(config.title)}</title>
  <link rel="canonical" href="${escapeHtml(config.canonicalUrl || 'https://example.com')}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="description" content="${escapeHtml(config.metaDescription)}">
  <meta name="keywords" content="${escapeHtml(config.keywords)}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="${config.themeColor}">
  <meta property="og:title" content="${escapeHtml(config.title)}">
  <meta property="og:description" content="${escapeHtml(config.metaDescription)}">
  <meta property="og:url" content="${escapeHtml(config.canonicalUrl || 'https://example.com')}">
  <meta property="og:type" content="website">

  <!-- AMP Scripts -->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
  <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>

  <!-- AMP Boilerplate Code -->
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(schemaJson, null, 2)}
  </script>

  <!-- AMP Custom Styles -->
  <style amp-custom>
    :root {
      --primary: ${config.themeColor};
      --accent: ${config.accentColor};
      --bg: ${config.bgColor};
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      ${config.cyberShield?.enabled && config.cyberShield?.blockTextCopy ? '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none;' : ''}
    }
    body {
      background-color: var(--bg);
      color: #ffffff;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      width: 100%;
      max-width: 540px;
      padding: 16px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      padding: 20px 0 10px;
    }
    .logo-box {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 240px;
      max-height: 72px;
      margin: 0 auto 14px;
      padding: 2px;
    }
    .logo-box amp-img {
      max-width: 100%;
      max-height: 100%;
    }
    .logo-box amp-img img {
      object-fit: contain !important;
      object-position: center;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #ffffff;
      text-transform: uppercase;
    }
    .tagline {
      font-size: 13px;
      color: #94a3b8;
      margin-top: 4px;
    }
    /* Running Text / Marquee */
    .running-box {
      background: ${config.runningTextBg};
      color: ${config.runningTextColor};
      padding: 10px 14px;
      border-radius: 8px;
      margin: 16px 0;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .running-content {
      display: inline-block;
      padding-left: 100%;
      animation: marquee ${config.runningTextSpeed}s linear infinite;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.5px;
    }
    @keyframes marquee {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
    }
    /* GIF / Banner Box (Guaranteed Zero-Wrap) */
    .banner-card {
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.15);
      background: #0b0f17;
      margin-bottom: 18px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      position: relative;
      aspect-ratio: 16 / 8.5;
      display: block;
      width: 100%;
      max-width: 100%;
      white-space: nowrap !important;
      flex-wrap: nowrap !important;
      box-sizing: border-box;
    }
    .banner-card amp-anim,
    .banner-card amp-img {
      width: 100%;
      height: 100%;
      display: block;
      white-space: nowrap;
    }
    .banner-card amp-anim img,
    .banner-card amp-img img {
      object-fit: cover !important;
      object-position: center;
      width: 100%;
      height: 100%;
      display: block;
    }
    /* CTA Buttons */
    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }
    .btn-primary {
      display: block;
      width: 100%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #ffffff;
      text-decoration: none;
      text-align: center;
      font-weight: 800;
      font-size: 17px;
      padding: 16px 20px;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.2);
    }
    .btn-secondary {
      display: block;
      width: 100%;
      background: #1c222d;
      color: #f1f5f9;
      text-decoration: none;
      text-align: center;
      font-weight: 700;
      font-size: 15px;
      padding: 14px 18px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .btn-subtext {
      display: block;
      font-size: 11px;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 2px;
      text-transform: none;
    }
    /* Features Grid */
    .feature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 24px;
    }
    .feature-card {
      background: #161b24;
      border: 1px solid #28303f;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }
    .feature-icon {
      font-size: 20px;
      margin-bottom: 6px;
      display: block;
    }
    .feature-title {
      font-size: 13px;
      font-weight: 700;
      color: #f8fafc;
    }
    .feature-desc {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 2px;
    }
    /* SEO Text Section */
    .seo-section {
      background: #12161f;
      border-radius: 10px;
      padding: 18px;
      border: 1px solid #232a38;
      font-size: 13px;
      color: #cbd5e1;
      margin-bottom: 24px;
    }
    .seo-heading {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .footer {
      text-align: center;
      font-size: 11px;
      color: #64748b;
      padding: 20px 0;
      border-top: 1px solid #1e293b;
      width: 100%;
    }
    .amp-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(52, 211, 153, 0.1);
      color: #34d399;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 999px;
      margin-top: 8px;
      border: 1px solid rgba(52, 211, 153, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <div class="logo-box">
        <amp-img src="${escapeHtml(config.logoUrl)}" width="220" height="68" layout="intrinsic" alt="${escapeHtml(config.brandName)} Logo"></amp-img>
      </div>
      <h1 class="brand-title">${escapeHtml(config.brandName)}</h1>
      <p class="tagline">${escapeHtml(config.tagline)}</p>
      <div class="amp-badge">⚡ Official AMP Certified</div>
    </header>

    <!-- Animated Running Text Marquee -->
    <div class="running-box">
      <div class="running-content">${escapeHtml(config.runningText)}</div>
    </div>

    <!-- Banner / Carousel Section -->
    <div class="banner-card">
      ${
        config.enableCarousel && config.carouselBanners && config.carouselBanners.filter((b) => b.imageUrl).length > 0
          ? `<amp-carousel width="600" height="315" layout="responsive" type="slides" autoplay delay="${(config.carouselInterval || 4) * 1000}" loop>
        ${config.carouselBanners
          .filter((b) => b.imageUrl)
          .map(
            (b) => `<div>
          ${b.linkUrl && b.linkUrl !== '#' ? `<a href="${escapeHtml(b.linkUrl)}" target="_blank" rel="noopener noreferrer">` : ''}
            <amp-img src="${escapeHtml(b.imageUrl)}" width="600" height="315" layout="responsive" alt="${escapeHtml(b.title || config.brandName)}"></amp-img>
          ${b.linkUrl && b.linkUrl !== '#' ? `</a>` : ''}
        </div>`
          )
          .join('\n        ')}
      </amp-carousel>`
          : `<amp-anim src="${escapeHtml(config.bannerGifUrl)}" width="600" height="315" layout="responsive" alt="${escapeHtml(config.brandName)} Banner">
        <amp-img placeholder src="${escapeHtml(config.bannerGifUrl)}" width="600" height="315" layout="responsive" alt="Loading..."></amp-img>
      </amp-anim>`
      }
    </div>

    <!-- Action Buttons -->
    <div class="btn-group">
      <a href="${escapeHtml(config.targetUrl)}" class="btn-primary" target="_blank" rel="nofollow noopener noreferrer sponsored">
        ${escapeHtml(config.ctaText)}
        <span class="btn-subtext">${escapeHtml(config.ctaSubtext)}</span>
      </a>
      ${
        config.ctaSecondaryText
          ? `<a href="${escapeHtml(config.ctaSecondaryUrl || config.targetUrl)}" class="btn-secondary" target="_blank" rel="nofollow noopener noreferrer sponsored">
        ${escapeHtml(config.ctaSecondaryText)}
      </a>`
          : ''
      }
    </div>

    <!-- Highlights Features -->
    <div class="feature-grid">
      ${config.features
        .map(
          (f) => `<div class="feature-card">
        <span class="feature-icon">${f.icon}</span>
        <div class="feature-title">${escapeHtml(f.title)}</div>
        <div class="feature-desc">${escapeHtml(f.desc)}</div>
      </div>`
        )
        .join('\n      ')}
    </div>

    <!-- SEO Content Section -->
    <section class="seo-section">
      <h2 class="seo-heading">${escapeHtml(config.seoHeading)}</h2>
      <p>${escapeHtml(config.seoParagraph)}</p>
    </section>

    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(config.brandName)}. All rights reserved.</p>
      <p style="margin-top: 4px;">Powered by Google AMP™ Accelerated Mobile Pages</p>
    </footer>
  </div>
</body>
</html>`;
};

export const generatePortalHtml = (config: PortalConfig, scripts: DynamicScript[] = []): string => {
  const headScripts = compileScripts(scripts, 'head');
  const bodyStartScripts = compileScripts(scripts, 'body-start');
  const bodyEndScripts = compileScripts(scripts, 'body-end');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(config.siteName)} - Official Responsive Portal</title>
  <meta name="description" content="${escapeHtml(config.slogan)}">
  <!-- Tailwind CDN for Portal -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.4); }
      50% { box-shadow: 0 0 30px rgba(234, 179, 8, 0.8); }
    }
    .jackpot-glow {
      animation: pulse-glow 2s infinite ease-in-out;
    }
    .marquee-scroll {
      animation: marquee 18s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  </style>
  ${headScripts}
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
  ${bodyStartScripts}

  <!-- Header Navigation -->
  <header class="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <div class="h-10 sm:h-12 max-w-[140px] sm:max-w-[200px] shrink-0 flex items-center justify-start">
          <img src="${escapeHtml(config.logoUrl)}" alt="${escapeHtml(config.siteName)}" class="max-h-full max-w-full w-auto object-contain drop-shadow select-none">
        </div>
        <div class="min-w-0 flex-1">
          <span class="font-extrabold text-base sm:text-lg text-white tracking-wider truncate block leading-tight">${escapeHtml(config.siteName)}</span>
          <span class="block text-[10px] sm:text-xs text-amber-400 font-semibold uppercase tracking-widest truncate mt-0.5">${escapeHtml(config.slogan)}</span>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <a href="${escapeHtml(config.secondaryCtaUrl)}" class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition whitespace-nowrap">
          ${escapeHtml(config.secondaryCtaText)}
        </a>
        <a href="${escapeHtml(config.primaryCtaUrl)}" class="px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 whitespace-nowrap">
          ${escapeHtml(config.primaryCtaText)}
        </a>
      </div>
    </div>

    <!-- Announcement Bar -->
    <div class="bg-amber-500/10 border-t border-b border-amber-500/20 py-1.5 px-4 overflow-hidden">
      <div class="max-w-7xl mx-auto flex items-center">
        <span class="bg-amber-500 text-slate-950 text-xs font-black uppercase px-2 py-0.5 rounded mr-3 shrink-0">
          <i class="fa-solid fa-bullhorn mr-1"></i> UPDATE
        </span>
        <div class="overflow-hidden whitespace-nowrap w-full">
          <div class="inline-block marquee-scroll text-xs text-amber-300 font-medium">
            ${escapeHtml(config.announcementText)}
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Portal Body -->
  <main class="flex-grow max-w-7xl mx-auto px-4 py-6 w-full space-y-6">
    <!-- Hero Banner / Carousel Slider -->
    ${
      config.enableBannerCarousel && config.carouselBanners && config.carouselBanners.filter((b) => b.imageUrl).length > 0
        ? `<div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl aspect-[16/7] md:aspect-[21/9] w-full group select-none" id="portalBannerCarousel">
      <!-- Slides Wrapper -->
      <div class="relative w-full h-full flex transition-transform duration-500 ease-out" id="carouselSlidesTrack">
        ${config.carouselBanners
          .filter((b) => b.imageUrl)
          .map(
            (b, idx) => `<div class="min-w-full h-full relative flex-shrink-0">
          ${b.linkUrl && b.linkUrl !== '#' ? `<a href="${escapeHtml(b.linkUrl)}" target="_blank" rel="noopener noreferrer" class="block w-full h-full">` : ''}
            <img src="${escapeHtml(b.imageUrl)}" alt="${escapeHtml(b.title || 'Promo Banner')}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-5 md:p-8">
              <div class="space-y-1.5 max-w-2xl">
                ${b.badge ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase rounded-full shadow">${escapeHtml(b.badge)}</span>` : ''}
                <h2 class="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow">${escapeHtml(b.title || config.siteName)}</h2>
              </div>
            </div>
          ${b.linkUrl && b.linkUrl !== '#' ? `</a>` : ''}
        </div>`
          )
          .join('\n        ')}
      </div>

      <!-- Left Arrow -->
      <button type="button" onclick="movePortalSlide(-1)" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition opacity-0 group-hover:opacity-100 z-20 shadow-lg">
        <i class="fa-solid fa-chevron-left text-sm"></i>
      </button>

      <!-- Right Arrow -->
      <button type="button" onclick="movePortalSlide(1)" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition opacity-0 group-hover:opacity-100 z-20 shadow-lg">
        <i class="fa-solid fa-chevron-right text-sm"></i>
      </button>

      <!-- Dot Indicators -->
      <div class="absolute bottom-3 right-4 flex items-center gap-1.5 z-20 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-800" id="carouselDots">
        ${config.carouselBanners
          .filter((b) => b.imageUrl)
          .map(
            (_, idx) => `<button type="button" onclick="goToPortalSlide(${idx})" class="carousel-dot w-2 h-2 rounded-full transition ${idx === 0 ? 'bg-amber-400 w-5' : 'bg-slate-500'}"></button>`
          )
          .join('')}
      </div>
    </div>`
        : `<div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl aspect-[16/7] md:aspect-[21/9] w-full flex items-center justify-center group">
      <img src="${escapeHtml(config.heroBannerUrl)}" alt="Hero Banner" class="w-full h-full object-cover group-hover:scale-105 transition duration-700">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5 md:p-8">
        <div class="space-y-2 max-w-2xl">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-full backdrop-blur-sm">
            <i class="fa-solid fa-crown text-[10px]"></i> VIP PORTAL ACCESS
          </span>
          <h1 class="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight">${escapeHtml(config.siteName)} - Official Hub</h1>
          <p class="text-xs sm:text-sm md:text-base text-slate-300 line-clamp-2">${escapeHtml(config.slogan)}</p>
        </div>
      </div>
    </div>`
    }

    ${
      config.showJackpotTicker
        ? `<!-- Jackpot Live Ticker -->
    <div class="rounded-xl bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-amber-950/40 border border-amber-500/40 p-4 md:p-6 text-center jackpot-glow">
      <span class="text-xs uppercase tracking-widest font-black text-amber-400 block mb-1">
        <i class="fa-solid fa-crown mr-1"></i> GRAND PROGRESSIVE JACKPOT
      </span>
      <div class="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 font-mono">
        ${escapeHtml(config.jackpotPrefix)} <span id="jackpotCounter">${escapeHtml(config.jackpotAmount)}</span>
      </div>
    </div>`
        : ''
    }

    <!-- Live RTP & Demo Games Gimmick Showcase -->
    ${
      config.rtpGimmick?.enabled !== false
        ? (() => {
            const rtpConf = config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG;
            const demoGames = (rtpConf.demoGames && rtpConf.demoGames.length > 0) ? rtpConf.demoGames : OFFICIAL_DEMO_GAMES_DATABASE;
            return `<!-- Live RTP & Demo Slot Section -->
    <div class="space-y-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 p-4 sm:p-6 border border-amber-500/30 shadow-2xl relative overflow-hidden" id="rtpDemoSection">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider animate-pulse">
              <i class="fa-solid fa-signal mr-1"></i> LIVE UPDATE
            </span>
            <span class="text-xs text-amber-400 font-mono font-bold" id="rtpLiveClock"></span>
          </div>
          <h2 class="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
            <i class="fa-solid fa-chart-line text-amber-400"></i> ${escapeHtml(rtpConf.headline || 'RTP Live & Demo Slot Gacor Hari Ini')}
          </h2>
          <p class="text-xs text-slate-400 max-w-2xl mt-0.5">${escapeHtml(rtpConf.subheadline || 'Persentase RTP live update otomatis, bocoran jam gacor, pola spin, dan uji coba demo gratis langsung tanpa deposit.')}</p>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" onclick="refreshRtpFluctuation(true)" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow">
            <i class="fa-solid fa-arrows-rotate" id="rtpRefreshIcon"></i>
            <span>Update RTP</span>
          </button>
        </div>
      </div>

      <!-- Demo Games Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        ${demoGames.map((game, idx) => {
          const rtpPercent = game.rtpPercent || 98.0;
          const isHigh = rtpPercent >= 97.5;
          const statusText = isHigh ? 'SANGAT TINGGI' : 'TINGGI';
          const badgeColor = isHigh ? 'from-emerald-500 to-teal-400 text-slate-950' : 'from-amber-500 to-yellow-400 text-slate-950';

          return `<div class="rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-3 flex flex-col justify-between transition group shadow-md hover:shadow-amber-500/10 relative overflow-hidden" data-demo-id="${escapeHtml(game.id)}">
            ${game.hot ? `<span class="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-black z-10 shadow">HOT</span>` : ''}
            
            <div>
              <div class="flex items-center gap-2.5 mb-2.5">
                <div class="w-12 h-12 rounded-lg bg-slate-950 p-1.5 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative">
                  <img src="${escapeHtml(game.iconUrl)}" alt="${escapeHtml(game.name)}" class="max-w-full max-h-full object-contain" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100\\' height=\\'100\\' rx=\\'16\\' fill=\\'%230f172a\\'/><text x=\\'50\\' y=\\'55\\' font-size=\\'36\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>⚡</text></svg>';">
                </div>
                <div class="min-w-0 flex-1">
                  <h3 class="text-xs font-black text-white truncate group-hover:text-amber-400 transition uppercase">${escapeHtml(game.name)}</h3>
                  <span class="text-[10px] text-slate-400 font-semibold block">${escapeHtml(game.provider)}</span>
                  ${game.maxwinX ? `<span class="text-[9px] text-amber-400 font-mono font-bold">${escapeHtml(game.maxwinX)}</span>` : ''}
                </div>
              </div>

              <!-- Live RTP Percentage Bar -->
              <div class="space-y-1 my-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-slate-400 font-medium">Live RTP</span>
                  <span class="font-black font-mono text-amber-300 rtp-val" data-base="${rtpPercent}">${rtpPercent.toFixed(1)}%</span>
                </div>
                <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r ${badgeColor} rounded-full transition-all duration-700 rtp-bar" style="width: ${rtpPercent}%;"></div>
                </div>
                <div class="flex items-center justify-between text-[9px] text-slate-400 pt-0.5">
                  <span>Winrate: <strong class="text-emerald-400">${statusText}</strong></span>
                  <span>Vol: <strong class="text-amber-300">${escapeHtml(game.volatility || 'High')}</strong></span>
                </div>
              </div>

              ${rtpConf.showJamGacor && game.jamGacor ? `<div class="text-[10px] bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded text-amber-300 mb-2 flex items-center gap-1.5">
                <i class="fa-solid fa-clock text-[9px]"></i>
                <span class="truncate">Jam: ${escapeHtml(game.jamGacor)}</span>
              </div>` : ''}

              ${rtpConf.showPolaGacor && game.polaSpin ? `<div class="text-[10px] bg-slate-950 p-1.5 rounded border border-slate-800 text-slate-300 mb-2.5">
                <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Pola Spin:</div>
                <div class="text-[10px] font-mono text-amber-200 truncate" title="${escapeHtml(game.polaSpin)}">${escapeHtml(game.polaSpin)}</div>
              </div>` : ''}
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-1.5 pt-1">
              <button type="button" onclick="openDemoLauncher('${escapeHtml(game.name)}', '${escapeHtml(game.demoUrl)}', '${escapeHtml(game.realPlayUrl || config.primaryCtaUrl)}')" class="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1 border border-slate-700">
                <i class="fa-solid fa-play text-[10px] text-amber-400"></i> Demo
              </button>
              <a href="${escapeHtml(game.realPlayUrl || config.primaryCtaUrl)}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="px-2 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black transition flex items-center justify-center gap-1 shadow">
                <i class="fa-solid fa-bolt text-[10px]"></i> Main
              </a>
            </div>
          </div>`;
        }).join('\n        ')}
      </div>
    </div>`;
          })()
        : ''
    }

    <!-- Games / Services Grid with Interactive Category Tabs -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <h2 class="text-lg font-black text-white flex items-center gap-2">
            <i class="fa-solid fa-fire text-amber-400"></i> Kategori Game & Provider Resmi
          </h2>
          <p class="text-xs text-slate-400">Pilih kategori permainan favorit Anda untuk langsung menuju ke lobby resmi</p>
        </div>
        <div class="flex items-center gap-2">
          ${
            config.gamesOrServices.length > 6
              ? `<div class="relative w-full sm:w-48">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
            <input type="text" id="gameSearchInput" onkeyup="filterPortalGames()" placeholder="Cari kategori / game..." class="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none">
          </div>`
              : ''
          }
          <span class="text-xs font-mono px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-amber-400 font-bold whitespace-nowrap" id="gamesCountBadge">
            ${config.gamesOrServices.length} Kategori
          </span>
        </div>
      </div>

      <!-- Category Filter Pills Bar (Shown if > 1 category exists) -->
      ${
        Array.from(new Set(config.gamesOrServices.map((g) => g.category || 'General'))).length > 2 && config.gamesOrServices.length > 10
          ? `<div class="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 text-xs">
        <button type="button" onclick="selectGameCategory('all')" data-cat="all" class="cat-pill-btn active px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap bg-amber-500 text-slate-950 shadow-md">
          <i class="fa-solid fa-border-all text-[11px]"></i>
          <span>Semua</span>
          <span class="text-[10px] opacity-75 font-mono">(${config.gamesOrServices.length})</span>
        </button>
        ${Array.from(new Set(config.gamesOrServices.map((g) => g.category || 'General'))).map((catName) => {
          const count = config.gamesOrServices.filter((g) => (g.category || 'General') === catName).length;
          let iconClass = 'fa-solid fa-gamepad';
          const lower = catName.toLowerCase();
          if (lower.includes('slot')) iconClass = 'fa-solid fa-gamepad';
          else if (lower.includes('live') || lower.includes('casino')) iconClass = 'fa-solid fa-tower-broadcast';
          else if (lower.includes('sport')) iconClass = 'fa-solid fa-futbol';
          else if (lower.includes('ayam') || lower.includes('cockfight')) iconClass = 'fa-solid fa-feather';
          else if (lower.includes('ikan') || lower.includes('fish')) iconClass = 'fa-solid fa-fish';
          else if (lower.includes('lot') || lower.includes('togel')) iconClass = 'fa-solid fa-ticket';
          else if (lower.includes('e-game') || lower.includes('egame') || lower.includes('arcade')) iconClass = 'fa-solid fa-ghost';
          return `<button type="button" onclick="selectGameCategory('${escapeHtml(catName)}')" data-cat="${escapeHtml(catName)}" class="cat-pill-btn px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800">
            <i class="${iconClass} text-[11px]"></i>
            <span>${escapeHtml(catName)}</span>
            <span class="text-[10px] text-slate-500 font-mono">(${count})</span>
          </button>`;
        }).join('\n        ')}
      </div>`
          : ''
      }

      <!-- Grid Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4" id="gamesGridContainer">
        ${config.gamesOrServices
          .map(
            (item) => `<a href="${escapeHtml(item.linkUrl)}" target="_blank" rel="noopener noreferrer" data-category="${escapeHtml(item.category || 'General')}" data-title="${escapeHtml((item.title + ' ' + (item.category || '')).toLowerCase())}" class="game-item-card group bg-slate-900 hover:bg-slate-850 rounded-xl p-3.5 border border-slate-800 hover:border-amber-500/50 transition duration-200 flex flex-col items-center text-center relative overflow-hidden shadow-sm hover:shadow-lg hover:shadow-amber-500/10">
          ${
            item.hot
              ? `<span class="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow z-10 animate-pulse">HOT</span>`
              : item.badge
              ? `<span class="absolute top-2 right-2 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow z-10">${escapeHtml(item.badge)}</span>`
              : ''
          }
          <div class="w-16 h-16 rounded-xl bg-slate-950 p-2 mb-2.5 flex items-center justify-center overflow-hidden group-hover:scale-105 transition border border-slate-800/80 shadow-inner relative">
            <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy" referrerpolicy="no-referrer" class="max-w-full max-h-full object-contain" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.classList.remove('hidden');">
            <div class="hidden w-full h-full flex flex-col items-center justify-center text-amber-400 bg-gradient-to-b from-amber-950/40 to-slate-900 rounded-lg">
              <i class="fa-solid ${
                (item.category || item.title || '').toLowerCase().includes('slot') ? 'fa-gamepad' :
                (item.category || item.title || '').toLowerCase().includes('casino') ? 'fa-dice' :
                (item.category || item.title || '').toLowerCase().includes('live') ? 'fa-tower-broadcast' :
                (item.category || item.title || '').toLowerCase().includes('sport') ? 'fa-futbol' :
                (item.category || item.title || '').toLowerCase().includes('ayam') ? 'fa-feather' :
                (item.category || item.title || '').toLowerCase().includes('ikan') || (item.category || item.title || '').toLowerCase().includes('fish') ? 'fa-fish' :
                (item.category || item.title || '').toLowerCase().includes('togel') || (item.category || item.title || '').toLowerCase().includes('lot') ? 'fa-ticket' :
                (item.category || item.title || '').toLowerCase().includes('promo') || (item.category || item.title || '').toLowerCase().includes('bonus') ? 'fa-gift' :
                (item.category || item.title || '').toLowerCase().includes('bantuan') || (item.category || item.title || '').toLowerCase().includes('chat') ? 'fa-headset' :
                'fa-star'
              } text-xl mb-0.5"></i>
              <span class="text-[8px] font-black text-amber-300 uppercase">${escapeHtml(item.title.slice(0, 7))}</span>
            </div>
          </div>
          <span class="text-xs font-black text-slate-100 group-hover:text-amber-400 transition line-clamp-1 tracking-wide uppercase">${escapeHtml(item.title)}</span>
          <span class="text-[10px] text-slate-400 mt-1 line-clamp-1">${escapeHtml(item.category || 'Resmi')}</span>
        </a>`
          )
          .join('\n        ')}
      </div>
      <div id="noGamesFoundNotice" class="hidden text-center py-10 bg-slate-900/50 rounded-xl border border-slate-800">
        <i class="fa-solid fa-magnifying-glass text-slate-600 text-3xl mb-2"></i>
        <p class="text-sm font-bold text-slate-400">Tidak ada kategori yang cocok</p>
        <p class="text-xs text-slate-500">Coba kata kunci lain atau pilih kategori Semua</p>
      </div>
    </div>
  </main>

  <!-- Interactive Demo Game Launcher Modal -->
  <div id="demoModal" class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md hidden items-center justify-center p-3 sm:p-6">
    <div class="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
      <div class="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2 min-w-0">
          <span class="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase">DEMO MODE</span>
          <h3 id="demoModalTitle" class="text-sm sm:text-base font-bold text-white truncate">Demo Game</h3>
        </div>
        <div class="flex items-center gap-2">
          <a id="demoModalRealPlayBtn" href="${escapeHtml(config.primaryCtaUrl)}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition">
            Main Uang Asli <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-[10px]"></i>
          </a>
          <button type="button" onclick="closeDemoModal()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center transition">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="relative flex-1 min-h-[420px] bg-black flex items-center justify-center">
        <iframe id="demoIframe" src="" class="w-full h-full min-h-[450px] border-0" allowfullscreen allow="autoplay; fullscreen; encrypted-media"></iframe>
        <div id="demoFallbackNotice" class="hidden absolute inset-0 bg-slate-900 p-6 flex flex-col items-center justify-center text-center">
          <i class="fa-solid fa-gamepad text-amber-400 text-4xl mb-3"></i>
          <h4 class="text-base font-bold text-white mb-1">Buka di Tab Resmi Provider</h4>
          <p class="text-xs text-slate-400 max-w-md mb-4">Beberapa server provider membatasi iframe langsung. Klik tombol di bawah untuk meluncurkan demo resmi:</p>
          <a id="demoDirectLaunchBtn" href="#" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm shadow hover:bg-amber-400 transition">
            <i class="fa-solid fa-play mr-1.5"></i> Buka Demo Resmi
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Non-Coercive 18+ & Responsible Gaming Notice / Disclaimer -->
  ${
    config.responsibleLegal?.enableAgeGate !== false
      ? (() => {
          const legConf = config.responsibleLegal || DEFAULT_RESPONSIBLE_LEGAL_CONFIG;
          return `<div id="ageDisclaimerBar" class="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 transition-transform duration-300 select-none">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-3 text-slate-300">
        <span class="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center font-black text-xs shrink-0">
          ${escapeHtml(legConf.ageLimitText || '18+')}
        </span>
        <p class="text-[11px] sm:text-xs text-slate-400 leading-snug">
          <strong class="text-slate-200">${escapeHtml(legConf.modalTitle || 'Responsible Gaming & Validasi Usia')}</strong>: ${escapeHtml(legConf.disclaimerText || 'Platform ini menyajikan info RTP dan demo simulasi semata. Tidak ada paksaan bermain maupun jaminan keuntungan.')}
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button type="button" onclick="openLegalModal()" class="text-[11px] text-amber-400 hover:underline px-2 py-1">
          Ketentuan Hukum
        </button>
        <button type="button" onclick="acceptAgeDisclaimer()" class="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition">
          Saya 18+ &amp; Mengerti
        </button>
        <button type="button" onclick="dismissAgeDisclaimer()" class="text-slate-500 hover:text-slate-300 p-1" title="Tutup">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Legal & Terms Modal -->
  <div id="legalTermsModal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl text-left">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="text-base font-black text-white flex items-center gap-2">
          <i class="fa-solid fa-scale-balanced text-amber-400"></i> Ketentuan Hukum &amp; Tanggung Jawab
        </h3>
        <button type="button" onclick="closeLegalModal()" class="text-slate-400 hover:text-white">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="space-y-3 text-xs text-slate-300 max-h-[60vh] overflow-y-auto pr-1">
        <p>1. <strong>Batas Usia Legal (18+)</strong>: Akses ke platform ini hanya diperbolehkan bagi individu yang telah mencapai usia dewasa legal (18 tahun ke atas) sesuai peraturan perundang-undangan di yurisdiksi Anda.</p>
        <p>2. <strong>Bebas Paksaan (Non-Coercive)</strong>: Penggunaan informasi, bocoran RTP live, jam gacor, dan simulasi demo permainan sepenuhnya bersifat sukarela dan ditujukan untuk hiburan serta edukasi teknis semata.</p>
        <p>3. <strong>Tanpa Jaminan Keuntungan Finansial</strong>: Persentase RTP teoritis dan simulator demo tidak menjamin hasil kemenangan di masa depan pada permainan uang asli.</p>
        <p>4. <strong>Responsible Gambling</strong>: Kami mendorong seluruh pengunjung untuk bermain secara bijak dan menetapkan batas waktu serta anggaran pribadi secara bertanggung jawab.</p>
      </div>
      <div class="pt-2 flex justify-end">
        <button type="button" onclick="closeLegalModal()" class="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-bold text-xs">
          Tutup &amp; Paham
        </button>
      </div>
    </div>
  </div>`;
        })()
      : ''
  }

  <!-- Floating Contact Shortcuts -->
  ${
    config.showFloatingContact
      ? `<div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
    ${
      config.whatsappNumber
        ? `<a href="https://wa.me/${escapeHtml(config.whatsappNumber)}" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition transform hover:scale-110" title="WhatsApp 24/7">
      <i class="fa-brands fa-whatsapp text-2xl"></i>
    </a>`
        : ''
    }
    ${
      config.telegramUsername
        ? `<a href="https://t.me/${escapeHtml(config.telegramUsername)}" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 transition transform hover:scale-110" title="Telegram">
      <i class="fa-brands fa-telegram text-2xl"></i>
    </a>`
        : ''
    }
  </div>`
      : ''
  }

  <!-- Footer -->
  <footer class="bg-slate-900 border-t border-slate-800 py-8 px-4 mt-12 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto space-y-4">
      <!-- Responsible Gaming Badges -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-red-500/30 text-red-400 text-[11px] font-black">
          <i class="fa-solid fa-circle-exclamation text-red-400"></i> 18+ Adult Gaming Only
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-semibold">
          <i class="fa-solid fa-shield-halved text-emerald-400"></i> BMM Testlabs Certified
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-semibold">
          <i class="fa-solid fa-certificate text-amber-400"></i> GLI-19 Standard
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-semibold">
          <i class="fa-solid fa-lock text-sky-400"></i> 256-Bit SSL Encrypted
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-semibold">
          <i class="fa-solid fa-hand-holding-heart text-purple-400"></i> BeGambleAware
        </span>
      </div>

      <p class="text-slate-400">${escapeHtml(config.footerText)}</p>
      <p class="text-[11px] text-slate-500">&copy; ${new Date().getFullYear()} ${escapeHtml(config.siteName)}. All Rights Reserved. Seluruh konten permainan, demo, dan live RTP disajikan untuk tujuan hiburan & simulasi legal.</p>
    </div>
  </footer>

  <script>
    // Live Jackpot Simulated Counter
    const counterEl = document.getElementById('jackpotCounter');
    if (counterEl) {
      setInterval(() => {
        let current = parseInt(counterEl.innerText.replace(/[^0-9]/g, '')) || 884729000;
        current += Math.floor(Math.random() * 1250) + 120;
        counterEl.innerText = current.toLocaleString('id-ID');
      }, 2500);
    }

    // RTP Live Clock Engine
    function updateRtpClock() {
      const clockEl = document.getElementById('rtpLiveClock');
      if (clockEl) {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.innerText = hrs + ':' + mins + ':' + secs + ' WIB';
      }
    }
    updateRtpClock();
    setInterval(updateRtpClock, 1000);

    // RTP Live Fluctuation Engine (Gimmick)
    function refreshRtpFluctuation(showSpin) {
      const icon = document.getElementById('rtpRefreshIcon');
      if (showSpin && icon) {
        icon.classList.add('fa-spin');
        setTimeout(() => icon.classList.remove('fa-spin'), 600);
      }
      const rtpVals = document.querySelectorAll('.rtp-val');
      const rtpBars = document.querySelectorAll('.rtp-bar');

      rtpVals.forEach((valEl, idx) => {
        const base = parseFloat(valEl.getAttribute('data-base')) || 97.5;
        const delta = (Math.random() * 0.8 - 0.4);
        let newRtp = Math.min(99.4, Math.max(95.5, base + delta));
        valEl.innerText = newRtp.toFixed(1) + '%';
        if (rtpBars[idx]) {
          rtpBars[idx].style.width = newRtp + '%';
        }
      });
    }

    // Auto update fluctuation periodically
    ${config.rtpGimmick?.enableLiveFluctuation !== false ? `
    setInterval(() => {
      refreshRtpFluctuation(false);
    }, ${(config.rtpGimmick?.updateIntervalSeconds || 90) * 1000});
    ` : ''}

    // Interactive Demo Launcher Modal Logic
    function openDemoLauncher(name, demoUrl, realPlayUrl) {
      const modal = document.getElementById('demoModal');
      const titleEl = document.getElementById('demoModalTitle');
      const iframe = document.getElementById('demoIframe');
      const realBtn = document.getElementById('demoModalRealPlayBtn');
      const directLaunchBtn = document.getElementById('demoDirectLaunchBtn');
      const fallbackNotice = document.getElementById('demoFallbackNotice');

      if (!modal) {
        window.open(demoUrl, '_blank');
        return;
      }

      if (titleEl) titleEl.innerText = 'Demo: ' + name;
      if (realBtn) realBtn.href = realPlayUrl;
      if (directLaunchBtn) directLaunchBtn.href = demoUrl;

      if (iframe) {
        iframe.src = demoUrl;
        if (fallbackNotice) fallbackNotice.classList.add('hidden');
        iframe.style.display = 'block';

        // Check if iframe loaded successfully
        iframe.onerror = function() {
          iframe.style.display = 'none';
          if (fallbackNotice) fallbackNotice.classList.remove('hidden');
        };
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeDemoModal() {
      const modal = document.getElementById('demoModal');
      const iframe = document.getElementById('demoIframe');
      if (iframe) iframe.src = '';
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    // 18+ Non-Coercive Age Verification & Legal Disclaimer
    function acceptAgeDisclaimer() {
      try {
        localStorage.setItem('portal_age_verified_18', 'true');
      } catch (e) {}
      dismissAgeDisclaimer();
    }

    function dismissAgeDisclaimer() {
      const bar = document.getElementById('ageDisclaimerBar');
      if (bar) {
        bar.style.transform = 'translateY(100%)';
        setTimeout(() => bar.remove(), 300);
      }
    }

    function openLegalModal() {
      const modal = document.getElementById('legalTermsModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }

    function closeLegalModal() {
      const modal = document.getElementById('legalTermsModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    // Check if age already accepted
    try {
      if (localStorage.getItem('portal_age_verified_18') === 'true') {
        const bar = document.getElementById('ageDisclaimerBar');
        if (bar) bar.style.display = 'none';
      }
    } catch (e) {}

    // Portal Banner Carousel Engine
    let currentPortalSlide = 0;
    const slidesTrack = document.getElementById('carouselSlidesTrack');
    const totalPortalSlides = slidesTrack ? slidesTrack.children.length : 0;
    let carouselTimer = null;

    function updatePortalCarousel() {
      if (!slidesTrack || totalPortalSlides <= 0) return;
      slidesTrack.style.transform = 'translateX(-' + (currentPortalSlide * 100) + '%)';
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentPortalSlide) {
          dot.className = 'carousel-dot w-5 h-2 rounded-full bg-amber-400 transition';
        } else {
          dot.className = 'carousel-dot w-2 h-2 rounded-full bg-slate-500 transition';
        }
      });
    }

    function movePortalSlide(dir) {
      if (totalPortalSlides <= 1) return;
      currentPortalSlide = (currentPortalSlide + dir + totalPortalSlides) % totalPortalSlides;
      updatePortalCarousel();
      resetPortalCarouselTimer();
    }

    function goToPortalSlide(idx) {
      currentPortalSlide = idx;
      updatePortalCarousel();
      resetPortalCarouselTimer();
    }

    function resetPortalCarouselTimer() {
      if (carouselTimer) clearInterval(carouselTimer);
      ${config.carouselAutoPlay !== false ? `
      if (totalPortalSlides > 1) {
        carouselTimer = setInterval(() => {
          movePortalSlide(1);
        }, ${(config.carouselInterval || 4) * 1000});
      }` : ''}
    }

    if (totalPortalSlides > 1) {
      resetPortalCarouselTimer();
      const carouselContainer = document.getElementById('portalBannerCarousel');
      if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => { if (carouselTimer) clearInterval(carouselTimer); });
        carouselContainer.addEventListener('mouseleave', () => resetPortalCarouselTimer());
      }
    }

    // Category Tabs & Game Filtering Engine
    let activeCategoryFilter = 'all';

    function selectGameCategory(cat) {
      activeCategoryFilter = cat;
      const pills = document.querySelectorAll('.cat-pill-btn');
      pills.forEach((p) => {
        if (p.getAttribute('data-cat') === cat) {
          p.className = 'cat-pill-btn active px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap bg-amber-500 text-slate-950 shadow-md';
        } else {
          p.className = 'cat-pill-btn px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800';
        }
      });
      filterPortalGames();
    }

    function filterPortalGames() {
      const searchInput = document.getElementById('gameSearchInput');
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const cards = document.querySelectorAll('.game-item-card');
      const badge = document.getElementById('gamesCountBadge');
      const notice = document.getElementById('noGamesFoundNotice');
      let visibleCount = 0;

      cards.forEach((card) => {
        const itemCat = card.getAttribute('data-category') || 'General';
        const itemTitle = card.getAttribute('data-title') || '';
        const matchesCategory = (activeCategoryFilter === 'all') || (itemCat.toLowerCase() === activeCategoryFilter.toLowerCase());
        const matchesQuery = !query || itemTitle.includes(query) || itemCat.toLowerCase().includes(query);

        if (matchesCategory && matchesQuery) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (badge) {
        badge.innerText = visibleCount + ' Provider';
      }
      if (notice) {
        if (visibleCount === 0) {
          notice.classList.remove('hidden');
        } else {
          notice.classList.add('hidden');
        }
      }
    }
  </script>
  ${generateCyberShieldScript(config.cyberShield, config.siteName)}
  ${bodyEndScripts}
</body>
</html>`;
};

export const generateVipRegisterHtml = (config: RegisterConfig, scripts: DynamicScript[] = []): string => {
  const headScripts = compileScripts(scripts, 'head');
  const bodyStartScripts = compileScripts(scripts, 'body-start');
  const bodyEndScripts = compileScripts(scripts, 'body-end');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(config.pageTitle)} - VIP Official Register</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  ${headScripts}
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4">
  ${bodyStartScripts}

  <div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
    <!-- Header Banner -->
    <div class="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 p-6 text-center text-slate-950">
      <div class="h-14 max-w-[220px] mx-auto mb-3 flex items-center justify-center">
        <img src="${escapeHtml(config.logoUrl)}" alt="Logo" class="max-h-full max-w-full w-auto object-contain drop-shadow-md">
      </div>
      <h1 class="text-2xl font-black uppercase tracking-tight">${escapeHtml(config.formHeadline)}</h1>
      <p class="text-xs font-semibold text-slate-900 mt-1">${escapeHtml(config.formSubheadline)}</p>
    </div>

    <!-- VIP Perks Badges -->
    <div class="bg-slate-950/80 px-6 py-3 border-b border-slate-800 flex flex-wrap justify-center gap-2">
      ${config.vipPerks
        .map(
          (perk) => `<span class="inline-flex items-center text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
        <i class="fa-solid fa-check-circle mr-1 text-emerald-400"></i> ${escapeHtml(perk)}
      </span>`
        )
        .join('')}
    </div>

    <!-- Registration Form -->
    <form id="regForm" class="p-6 md:p-8 space-y-4" onsubmit="handleRegistration(event)">
      ${config.fields
        .map((field) => {
          if (field.type === 'select' && field.options) {
            return `<div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                ${escapeHtml(field.label)} ${field.required ? '<span class="text-red-500">*</span>' : ''}
              </label>
              <select id="${escapeHtml(field.id)}" name="${escapeHtml(field.id)}" ${field.required ? 'required' : ''} class="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                ${field.options.map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join('')}
              </select>
            </div>`;
          }
          return `<div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              ${escapeHtml(field.label)} ${field.required ? '<span class="text-red-500">*</span>' : ''}
            </label>
            <input type="${field.type}" id="${escapeHtml(field.id)}" name="${escapeHtml(field.id)}" placeholder="${escapeHtml(field.placeholder)}" ${field.required ? 'required' : ''} class="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
          </div>`;
        })
        .join('\n      ')}

      <!-- Payment / Bank Selection -->
      <div>
        <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Metode Transaksi Utama</label>
        <div class="grid grid-cols-3 gap-2">
          ${config.paymentMethods
            .map(
              (m, idx) => `<label class="cursor-pointer border border-slate-700 rounded-lg p-2 text-center text-xs font-semibold bg-slate-800 hover:border-amber-500 transition flex items-center justify-center">
            <input type="radio" name="payment_method" value="${escapeHtml(m)}" ${idx === 0 ? 'checked' : ''} class="mr-1 text-amber-500 focus:ring-0"> ${escapeHtml(m)}
          </label>`
            )
            .join('')}
        </div>
      </div>

      <!-- Referral Code -->
      ${
        config.requireReferralCode
          ? `<div>
        <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Kode Referral VIP</label>
        <input type="text" id="referral_code" name="referral_code" value="${escapeHtml(config.defaultReferral)}" class="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 font-mono text-sm focus:outline-none focus:border-amber-500">
      </div>`
          : ''
      }

      <div class="pt-2">
        <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black uppercase text-sm rounded-xl tracking-wider shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5">
          <i class="fa-solid fa-bolt mr-1.5"></i> Daftar & Dapatkan Bonus VIP
        </button>
      </div>
    </form>

    <div class="px-6 py-4 bg-slate-950/60 border-t border-slate-800 text-center text-xs text-slate-500">
      Dengan mendaftar, Anda menyetujui Syarat & Ketentuan Layanan ${escapeHtml(config.brandName)}.
    </div>
  </div>

  <script>
    function handleRegistration(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const username = data.username || data.name || 'User VIP';
      const waNumber = "${escapeHtml(config.whatsappNotifyNumber)}";
      const redirectUrl = "${escapeHtml(config.successRedirectUrl || '#')}";

      if (waNumber) {
        const msg = encodeURIComponent("Halo Admin ${escapeHtml(config.brandName)}, saya baru saja melakukan pendaftaran akun VIP: " + username);
        window.open("https://wa.me/" + waNumber + "?text=" + msg, "_blank");
      }

      if (redirectUrl && redirectUrl !== '#') {
        window.location.href = redirectUrl;
      } else {
        alert("Pendaftaran Berhasil! Selamat bergabung di ${escapeHtml(config.brandName)}.");
      }
    }
  </script>
  ${generateCyberShieldScript(config.cyberShield, config.brandName)}
  ${bodyEndScripts}
</body>
</html>`;
};

export const generateSafeLinkHtml = (config: SafeLinkConfig, scripts: DynamicScript[] = []): string => {
  const headScripts = compileScripts(scripts, 'head');
  const bodyStartScripts = compileScripts(scripts, 'body-start');
  const bodyEndScripts = compileScripts(scripts, 'body-end');

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': config.separatedJsonLd.schemaType,
    headline: config.separatedJsonLd.headline,
    description: config.separatedJsonLd.description,
    author: {
      '@type': 'Person',
      name: config.separatedJsonLd.author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.separatedJsonLd.publisher,
    },
    datePublished: config.separatedJsonLd.datePublished || new Date().toISOString(),
    dateModified: config.separatedJsonLd.dateModified || new Date().toISOString(),
    keywords: config.separatedJsonLd.keywords,
  };

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(config.title)}</title>
  <meta name="description" content="${escapeHtml(config.separatedJsonLd.description)}">
  <meta name="robots" content="index, follow">

  <!-- Separated High Authority Schema JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(jsonLdData, null, 2)}
  </script>

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  ${headScripts}
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-between p-4 font-sans">
  ${bodyStartScripts}

  <!-- Header -->
  <header class="w-full max-w-3xl py-4 border-b border-slate-800 flex items-center justify-between">
    <div class="flex items-center space-x-2 font-black text-lg text-white">
      <i class="fa-solid fa-shield-halved text-emerald-400"></i>
      <span>${escapeHtml(config.brandName)} SafeLink Shield</span>
    </div>
    <span class="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono">
      SSL 256-Bit Encrypted
    </span>
  </header>

  <!-- Safe Link Gateway Card -->
  <main class="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 my-8 shadow-2xl text-center space-y-6">
    <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 text-2xl">
      <i class="fa-solid fa-lock"></i>
    </div>

    <div>
      <h1 class="text-xl md:text-2xl font-bold text-white">${escapeHtml(config.pageHeaderTitle)}</h1>
      <p class="text-xs text-slate-400 mt-1">${escapeHtml(config.pageSubtitle)}</p>
    </div>

    ${
      config.bannerImageUrl
        ? `<div class="rounded-2xl overflow-hidden border border-slate-800 aspect-video w-full bg-slate-950 shadow-inner flex items-center justify-center">
      <img src="${escapeHtml(config.bannerImageUrl)}" alt="Safety Check" class="w-full h-full object-cover">
    </div>`
        : ''
    }

    <!-- Countdown & Trigger Container -->
    <div class="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
      <div id="countdownBox" class="space-y-1">
        <span class="text-xs text-slate-400 block">Menghubungkan ke server tujuan aman dalam:</span>
        <div id="timerNumber" class="text-3xl font-black text-amber-400 font-mono">${config.countdownSeconds}s</div>
      </div>

      <div id="actionContainer" class="hidden">
        <a id="destinationBtn" href="${escapeHtml(config.destinationUrl)}" target="_blank" rel="noopener noreferrer" class="inline-block w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5">
          <i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> ${escapeHtml(config.buttonReadyText)}
        </a>
      </div>
    </div>

    <!-- Security Notice -->
    <p class="text-[11px] text-slate-500 leading-relaxed">
      ${escapeHtml(config.securityNoticeText)}
    </p>
  </main>

  <!-- Footer -->
  <footer class="w-full max-w-3xl py-4 border-t border-slate-900 text-center text-xs text-slate-600">
    &copy; ${new Date().getFullYear()} ${escapeHtml(config.brandName)}. Secure Protected Gateway.
  </footer>

  <script>
    let timeLeft = ${config.countdownSeconds};
    const timerEl = document.getElementById('timerNumber');
    const actionEl = document.getElementById('actionContainer');
    const countBox = document.getElementById('countdownBox');

    const countdownInterval = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.innerText = timeLeft + 's';
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        if (countBox) countBox.classList.add('hidden');
        if (actionEl) actionEl.classList.remove('hidden');
      }
    }, 1000);
  </script>
  ${generateCyberShieldScript(config.cyberShield, config.brandName)}
  ${bodyEndScripts}
</body>
</html>`;
};

export const generateSeparatedSchemaJsonLd = (config: SafeLinkConfig): string => {
  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': config.separatedJsonLd.schemaType,
    headline: config.separatedJsonLd.headline,
    description: config.separatedJsonLd.description,
    author: {
      '@type': 'Person',
      name: config.separatedJsonLd.author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.separatedJsonLd.publisher,
    },
    datePublished: config.separatedJsonLd.datePublished || new Date().toISOString(),
    dateModified: config.separatedJsonLd.dateModified || new Date().toISOString(),
    keywords: config.separatedJsonLd.keywords,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.destinationUrl,
    },
  };

  return JSON.stringify(schemaObj, null, 2);
};

export const generateCdnUrl = (
  originalUrl: string,
  provider: 'statically' | 'jsdelivr' | 'weserv' | 'direct',
  width?: number,
  height?: number,
  format?: 'webp' | 'png' | 'jpg'
): string => {
  if (!originalUrl) return '';
  const cleanUrl = originalUrl.replace(/^https?:\/\//, '');

  if (provider === 'statically') {
    let params = [];
    if (width) params.push(`w=${width}`);
    if (height) params.push(`h=${height}`);
    if (format) params.push(`f=${format}`);
    const paramStr = params.length ? `?${params.join('&')}` : '';
    return `https://cdn.statically.io/img/${cleanUrl}${paramStr}`;
  }

  if (provider === 'weserv') {
    let params = [`url=${encodeURIComponent(originalUrl)}`];
    if (width) params.push(`w=${width}`);
    if (height) params.push(`h=${height}`);
    if (format) params.push(`output=${format}`);
    return `https://images.weserv.nl/?${params.join('&')}`;
  }

  if (provider === 'jsdelivr') {
    return originalUrl.replace('github.com', 'cdn.jsdelivr.net/gh');
  }

  return originalUrl;
};

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
