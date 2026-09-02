import type { AmpConfig } from '../types';

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* =========================================================================
   SKEMA 1: RTP SLOT / ZENVIA (Splash Screen, Purple Glow, 4-Info Grid, Bottom Nav)
   ========================================================================= */
export const generateAmpRtpZenvia = (config: AmpConfig): string => {
  const brand = escapeHtml(config.brandName || 'RTP SLOT');
  const title = escapeHtml(config.title || `${brand} © Agen Situs Slot Dengan RTP Live 98% Pasti Maxwin Malam Ini`);
  const logo = escapeHtml(config.logoUrl || 'https://www.dothanmetalbuildings.com/img/logo.png');
  const banner = escapeHtml(config.bannerGifUrl || 'https://www.dothanmetalbuildings.com/img/rtp.png');
  const daftarUrl = escapeHtml(config.targetUrl || 'https://heylink.id/vexana');
  const loginUrl = escapeHtml(config.ctaSecondaryUrl || config.targetUrl || 'https://heylink.id/vexana');
  const chatUrl = escapeHtml(config.liveChatUrl || config.targetUrl || 'https://heylink.id/vexana');
  const canonical = escapeHtml(config.canonicalUrl || 'https://www.dothanmetalbuildings.com/');
  const desc = escapeHtml(config.metaDescription || `${brand} adalah situs rtp live slot online terlengkap dengan info bocoran rtp pragmatic play tertinggi.`);
  const themeColor = config.themeColor || '#0a0518';
  const rtpRate = escapeHtml(config.rtpRate || '98%');
  const rating = escapeHtml(config.rating || '9.8/10');

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: config.brandName || 'RTP SLOT',
    url: config.canonicalUrl || 'https://www.dothanmetalbuildings.com/',
    description: config.metaDescription,
    logo: config.logoUrl,
  };

  return `<!DOCTYPE html>
<html amp lang="id-ID">
<head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1">
    <title>${title}</title>
    <link rel="canonical" href="${canonical}"/>
    <meta property="og:title" content="${title}"/>
    <meta property="og:description" content="${desc}"/>
    <meta property="og:image" content="${banner}"/>
    <meta property="og:url" content="${canonical}"/>
    <meta property="og:site_name" content="${brand}"/>
    <meta name="robots" content="index, follow">
    <meta name="description" content="${desc}">
    <meta name="theme-color" content="${themeColor}"/>
    <link rel="icon" type="image/x-icon" href="${logo}">
    <link rel="preload" as="image" href="${banner}"/>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet"/>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

    <style amp-custom>:root{--neon-blue:#00d4ff;--neon-purple:#7c3aed;--neon-pink:#ec4899;--deep-purple:#1e1b4b;--bg-dark:${themeColor};--card-bg:rgba(15,10,30,.92);--text-main:#e8e0f5;--glow-blue:rgba(0,212,255,.4);--glow-purple:rgba(124,58,237,.4);--gradient-gold:linear-gradient(135deg,#f59e0b,#d97706)}*{box-sizing:border-box;margin:0;padding:0;outline:none;${config.cyberShield?.enabled && config.cyberShield?.blockTextCopy ? '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' : ''}}body{font-family:'Inter',sans-serif;background-color:var(--bg-dark);color:var(--text-main);overflow-x:hidden;line-height:1.7;min-height:100vh}.bg-elegant{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse at 20% 50%,rgba(124,58,237,.08) 0%,transparent 60%) , radial-gradient(ellipse at 80% 50%,rgba(0,212,255,.06) 0%,transparent 60%) , radial-gradient(ellipse at 50% 100%,rgba(236,72,153,.05) 0%,transparent 50%)}.bg-elegant::after{content:'';position:absolute;inset:0;background-image:radial-gradient(1px 1px at 15% 25%,rgba(255,255,255,.3) 50%,transparent) , radial-gradient(1px 1px at 55% 65%,rgba(255,255,255,.2) 50%,transparent) , radial-gradient(1px 1px at 75% 15%,rgba(255,255,255,.3) 50%,transparent) , radial-gradient(1px 1px at 85% 85%,rgba(255,255,255,.2) 50%,transparent) , radial-gradient(1px 1px at 35% 90%,rgba(255,255,255,.15) 50%,transparent);background-size:300px 300px;opacity:.5}.splash-container{position:fixed;inset:0;z-index:9999;display:flex;justify-content:center;align-items:center;background:var(--bg-dark);animation:splashFade .8s ease 2s forwards}.splash-content{text-align:center;animation:splashPulse 1.2s ease-in-out infinite alternate}.splash-icon{width:80px;height:80px;margin:0 auto 20px;border-radius:20px;background:linear-gradient(135deg,var(--neon-blue),var(--neon-purple));display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;color:#fff;box-shadow:0 0 40px var(--glow-blue) , 0 0 80px var(--glow-purple);font-family:'Orbitron',sans-serif}.splash-title{font-family:'Orbitron',sans-serif;font-size:26px;font-weight:900;background:linear-gradient(135deg,#fff 0%,var(--neon-blue) 50%,var(--neon-purple) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:3px}.splash-sub{font-size:12px;color:rgba(255,255,255,.5);letter-spacing:6px;margin-top:8px;text-transform:uppercase}.splash-loader{width:120px;height:2px;margin:20px auto 0;background:rgba(255,255,255,.1);border-radius:2px;overflow:hidden}.splash-loader::after{content:'';display:block;width:40%;height:100%;background:linear-gradient(90deg,var(--neon-blue),var(--neon-purple));border-radius:2px;animation:loaderMove 1.2s ease-in-out infinite alternate}@keyframes splashPulse { from { transform: scale(0.95); opacity: 0.8; } to { transform: scale(1.05); opacity: 1; } }@keyframes loaderMove { from { transform: translateX(0); } to { transform: translateX(150%); } }@keyframes splashFade { to { opacity: 0; visibility: hidden; pointer-events: none; } }.header{position:fixed;top:0;width:100%;z-index:100;background:rgba(15,10,26,.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(124,58,237,.15);padding:10px 15px;display:flex;justify-content:center;align-items:center}.header-logo amp-img{filter:drop-shadow(0 0 10px var(--glow-blue))}.spacer{height:72px}.content-wrap{position:relative;z-index:2;max-width:680px;margin:0 auto;padding:15px}.hero-card{background:var(--card-bg);border:1px solid rgba(124,58,237,.2);border-radius:20px;padding:24px;margin-bottom:20px;backdrop-filter:blur(12px);box-shadow:0 20px 60px rgba(0,0,0,.5)}.hero-img-wrap{position:relative;border-radius:16px;overflow:hidden;border:1px solid rgba(124,58,237,.2);margin-bottom:24px;aspect-ratio:1/1;width:100%;background:var(--bg-dark)}.hero-img-wrap amp-img{width:100%;height:100%;object-fit:contain}.hero-img-wrap::before{content:'';position:absolute;inset:-2px;border-radius:18px;background:linear-gradient(135deg,var(--neon-blue),transparent 40%,transparent 60%,var(--neon-purple));z-index:-1;opacity:.3;animation:borderGlow 4s ease-in-out infinite alternate}@keyframes borderGlow { 0% { opacity: 0.2; } 100% { opacity: 0.5; } }.btn-group{display:flex;gap:14px;margin-bottom:24px}.btn-elegant{flex:1;padding:16px 10px;border-radius:12px;text-align:center;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;transition:all .3s ease;position:relative;overflow:hidden}.btn-daftar{background:linear-gradient(135deg,var(--neon-blue),var(--neon-purple));color:#fff;box-shadow:0 4px 20px var(--glow-blue)}.btn-daftar:hover{transform:translateY(-2px);box-shadow:0 8px 30px var(--glow-blue)}.btn-login{background:transparent;color:#fff;border:2px solid rgba(124,58,237,.4)}.btn-login:hover{border-color:var(--neon-blue);background:rgba(0,212,255,.05);box-shadow:0 0 30px var(--glow-blue)}h1{font-family:'Orbitron',sans-serif;font-size:18px;font-weight:700;color:#fff;text-align:center;margin-bottom:18px;line-height:1.5;text-shadow:0 0 30px var(--glow-blue)}p{font-size:14px;color:#c8bfe0;text-align:justify;margin-bottom:14px;line-height:1.8}a{color:var(--neon-blue);text-decoration:none;transition:all .3s;font-weight:600}a:hover{color:var(--neon-purple)}.info-grid-wrapper{margin:20px 0 24px;display:grid;grid-template-columns:1fr 1fr;gap:12px}.info-item{background:rgba(255,255,255,.03);border:1px solid rgba(124,58,237,.15);border-radius:12px;padding:14px 10px;text-align:center;transition:all .3s ease}.info-item:hover{border-color:var(--neon-blue);background:rgba(0,212,255,.03)}.info-item span{display:block;font-family:'Orbitron',sans-serif;font-size:16px;color:#fff;font-weight:700;margin-bottom:4px;background:linear-gradient(135deg,var(--neon-blue),var(--neon-purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent}.info-item small{font-size:9px;color:#88a;letter-spacing:1px;text-transform:uppercase}.footer{text-align:center;padding:20px 0 95px;font-size:11px;color:#658;border-top:1px solid rgba(124,58,237,.08);margin-top:20px;letter-spacing:.5px}.bottom-nav{position:fixed;bottom:0;left:0;right:0;z-index:100;background:rgba(15,10,26,.97);backdrop-filter:blur(14px);border-top:1px solid rgba(124,58,237,.15);display:flex;justify-content:space-around;padding:8px 0 env(safe-area-inset-bottom,10px);border-radius:20px 20px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,.4)}.nav-item{display:flex;flex-direction:column;align-items:center;gap:2px;color:#658;font-size:9px;font-weight:600;letter-spacing:.5px;text-decoration:none;padding:6px 14px;transition:all .3s;text-transform:uppercase}.nav-item.active,.nav-item:hover{color:var(--neon-blue)}.nav-icon{font-size:18px;margin-bottom:1px}.nav-item.active .nav-icon{filter:drop-shadow(0 0 8px var(--glow-blue))}</style>

    <script type="application/ld+json">
    ${JSON.stringify(schemaJson, null, 4)}
    </script>
</head>
<body>

    <!-- Background Elegan -->
    <div class="bg-elegant"></div>

    <!-- Splash Screen Elegan -->
    <div class="splash-container">
        <div class="splash-content">
            <div class="splash-icon">⚡</div>
            <div class="splash-title">${brand}</div>
            <div class="splash-sub">Live RTP &amp; Slot Online</div>
            <div class="splash-loader"></div>
        </div>
    </div>

    <!-- Header -->
    <header class="header">
        <a href="${daftarUrl}" class="header-logo" target="_blank" rel="noopener noreferrer">
            <amp-img src="${logo}" alt="${brand}" width="180" height="65" layout="fixed"></amp-img>
        </a>
    </header>
    <div class="spacer"></div>

    <!-- Main Content -->
    <main class="content-wrap">
        <article class="hero-card">
            <!-- Banner -->
            <div class="hero-img-wrap" style="white-space:nowrap!important;flex-wrap:nowrap!important;overflow:hidden;display:block;">
                <amp-img src="${banner}" alt="${brand} Hero" title="${brand}" width="600" height="600" layout="responsive"></amp-img>
            </div>

            <!-- Tombol Clean Elegan -->
            <div class="btn-group">
                <a href="${daftarUrl}" class="btn-elegant btn-daftar" target="_blank" rel="nofollow noopener noreferrer sponsored">
                    ${escapeHtml(config.ctaText || 'Daftar Sekarang')}
                </a>
                <a href="${loginUrl}" class="btn-elegant btn-login" target="_blank" rel="nofollow noopener noreferrer sponsored">
                    ${escapeHtml(config.ctaSecondaryText || 'Login')}
                </a>
            </div>

            <h1>${escapeHtml(config.seoHeading || title)}</h1>

            <!-- Info Grid -->
            <div class="info-grid-wrapper">
                <div class="info-item">
                    <span>${rating}</span>
                    <small>Penilaian Pengguna</small>
                </div>
                <div class="info-item">
                    <span>${rtpRate}</span>
                    <small>RTP Live Rate</small>
                </div>
                <div class="info-item">
                    <span>24 Jam</span>
                    <small>Layanan Support</small>
                </div>
                <div class="info-item">
                    <span>All Device</span>
                    <small>Akses Platform</small>
                </div>
            </div>

            <p>${escapeHtml(config.seoParagraph || `${brand} merupakan platform informasi resmi dan terpercaya dengan persentase rtp live tertinggi setiap hari. Nikmati kemudahan akses dan layanan 24 jam non-stop.`)}</p>

            <div class="footer">
                &copy; ${new Date().getFullYear()} ${brand} — Official License<br>
                RTP Live • Update Slot Terkini
            </div>
        </article>
    </main>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <a href="${daftarUrl}" class="nav-item active" target="_blank" rel="nofollow noopener noreferrer sponsored">
            <span class="nav-icon">🏠</span> Home
        </a>
        <a href="${loginUrl}" class="nav-item" target="_blank" rel="nofollow noopener noreferrer sponsored">
            <span class="nav-icon">🎰</span> Login
        </a>
        <a href="${daftarUrl}" class="nav-item" target="_blank" rel="nofollow noopener noreferrer sponsored">
            <span class="nav-icon">✨</span> Daftar
        </a>
        <a href="${chatUrl}" class="nav-item" target="_blank" rel="nofollow noopener noreferrer sponsored">
            <span class="nav-icon">💬</span> Chat
        </a>
    </nav>
</body>
</html>`;
};

/* =========================================================================
   SKEMA 2: BETON138 (Cyber Sci-Fi Gold & Scanlines, Stat Grid, Spec Table)
   ========================================================================= */
export const generateAmpBetonCyber = (config: AmpConfig): string => {
  const brand = escapeHtml(config.brandName || 'BETON138');
  const title = escapeHtml(config.title || `${brand} ✈️ Rekomendasi Situs Slot Gacor Hari Ini Dengan Info RTP Slot Terbaru 24 Jam`);
  const logo = escapeHtml(config.logoUrl || 'https://asset777.b-cdn.net/gif-icon/gif-beton138/GIF%20LOGO%20ANIMATION%20BETON138.gif');
  const banner = escapeHtml(config.bannerGifUrl || 'https://asset777.b-cdn.net/BETON138/baner-16.webp');
  const daftarUrl = escapeHtml(config.targetUrl || 'https://rebrand.ly/DAFTAR-BIGCAT');
  const loginUrl = escapeHtml(config.ctaSecondaryUrl || config.targetUrl || 'https://rebrand.ly/betonlogin-MS');
  const chatUrl = escapeHtml(config.liveChatUrl || config.targetUrl || 'https://rebrand.ly/beton138livechat');
  const canonical = escapeHtml(config.canonicalUrl || 'https://ratskeller-niedernhausen.com/');
  const desc = escapeHtml(config.metaDescription || `${brand} bikin pemain lebih gampang cari game lewat info RTP slot terbaru yang bisa dipantau kapan saja.`);
  const rating = escapeHtml(config.rating || '⭐⭐⭐⭐⭐');
  const depo = escapeHtml(config.minDeposit || '10.000 IDR');
  const rtp = escapeHtml(config.rtpRate || '97%');
  const wede = escapeHtml(config.minWithdraw || '30.000 IDR');
  const minBet = escapeHtml(config.minBet || 'Rp 400');
  const bonus = escapeHtml(config.bonusText || 'LUCKY SPIN SETIAP HARI');
  const depositMethods = escapeHtml(config.depositMethods || 'QRIS, EWALLET, BANK');

  return `<!doctype html>
<html ⚡ lang="id-ID">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <link rel="canonical" href="${canonical}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#000d1a">
    <link rel="shortcut icon" href="${logo}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1,user-scalable=no">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta name="author" content="${brand}">
    <meta property="og:locale" content="id_ID">
    <meta property="og:title" content="${title}">
    <meta property="og:type" content="website">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${banner}">
    <meta property="og:url" content="${canonical}">

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

    <style amp-custom>:root{--gold:#bbbe00;--gold-dim:#00ffd0;--blue:#00ffe5;--blue-dim:#37d4bf;--dark:#0F0B02;--dark-card:#1D1607;--border:rgba(0,255,208,0.35);--text:#FFFFFF;--text-dim:#37d4bf;--teal-glow:rgba(255,215,0,0.65)}*,::after,::before{box-sizing:border-box;margin:0;padding:0;${config.cyberShield?.enabled && config.cyberShield?.blockTextCopy ? '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' : ''}}body{font-family:Rajdhani,sans-serif;background:var(--dark);min-height:100vh;overflow-x:hidden}.hero-bg{position:fixed;inset:0;z-index:0;background:radial-gradient(circle at top,rgba(0,255,123,0.12),transparent 60%),linear-gradient(180deg,#181302 0,#070501 100%)}.hero-bg amp-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.18) saturate(1.2) hue-rotate(40deg)}.scanlines{position:fixed;inset:0;z-index:1;background-image:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,208,0.03) 3px,rgba(0,255,208,0.03) 4px);pointer-events:none}.overlay{position:relative;z-index:10;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px 16px}.card{width:100%;max-width:420px;background:linear-gradient(180deg,rgba(0,255,195,0.06),rgba(0,0,0,0.95));border-radius:16px;overflow:hidden;border:1px solid rgb(176,153,0);box-shadow:0 0 25px rgba(0,251,255,0.15),0 0 60px rgba(0,255,187,0.08);backdrop-filter:blur(4px)}.topbar{height:58px;display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg,#031d1a,#06302c,#031d1b);border-bottom:1px solid rgb(176,153,0);position:relative}.topbar amp-img{height:50px;position:relative;z-index:1;filter:drop-shadow(0 0 5px rgb(176,153,0)) drop-shadow(0 0 15px rgba(190,0,0,0.5))}.banner{position:relative;overflow:hidden;border-top:4px double rgb(176,153,0);border-bottom:4px double rgb(117,101,0)}.banner amp-img{width:100%;display:block}.titlebar{padding:11px 16px;text-align:center;font-family:Orbitron,monospace;font-weight:700;font-size:11px;letter-spacing:1.5px;color:rgb(255 255 255);text-transform:uppercase;background:linear-gradient(90deg,#021713,#e6d600,#02170f);border-bottom:1px solid rgb(176,153,0);text-shadow:0 0 10px rgba(177,135,0,0.7),0 0 25px rgba(133,102,0,0.7)}.content{padding:16px;background:linear-gradient(180deg,#031b15 0,#021411 45%,#000000 100%)}.btns{display:flex;gap:7px;flex-direction:column;padding:10px}.btn{flex:1;height:46px;line-height:44px;text-align:center;text-decoration:none;font-family:Orbitron,monospace;font-weight:800;border-radius:8px;font-size:13px;letter-spacing:2px;text-transform:uppercase;transition:all .25s ease;display:block}.btn-daftar{background:linear-gradient(135deg,rgb(176,153,0) 0,rgba(177,135,0,0.7) 50%,#5f5900 100%);color:#ffffff;border:2px solid rgb(176,153,0);cursor:pointer;animation:glowPulse 1.5s infinite ease-in-out;transition:transform .2s;text-shadow:0 1px 2px rgba(255,255,255,0.3)}.btn-daftar:hover{transform:scale(1.08)}@keyframes glowPulse { 0% { box-shadow: 0 0 5px rgba(60,65,0,0.74),0 0 12px rgba(205,219,0,0.74); transform: scale(1); } 50% { box-shadow: 0 0 20px rgba(203,218,0,0.726),0 0 45px rgba(173,185,0,0.726); transform: scale(1.05); } 100% { box-shadow: 0 0 5px rgba(122,131,0,0.726),0 0 12px rgba(55,59,0,0.726); transform: scale(1); } }.btn-login{background:#727400;border:2px solid rgb(176,153,0);color:rgb(255 255 255);box-shadow:0 0 12px rgba(0,255,179,0.2)}.info{background:linear-gradient(180deg,rgba(0,255,179,0.04),rgba(0,0,0,0.95));border-radius:10px;border:1px solid rgb(176,153,0);overflow:hidden}.row{display:flex;padding:10px 14px;border-bottom:1px solid rgba(0,255,191,0.12)}.row:last-child{border-bottom:none}.label{width:45%;color:#ffffff;font-weight:600;font-size:13px;letter-spacing:.5px;text-transform:uppercase}.value{width:55%;color:var(--text);font-size:13px;font-weight:600}.stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}.stat-badge{background:linear-gradient(135deg,rgba(0,255,225,0.06),rgba(0,0,0,.95));border:1px solid rgb(176,153,0);border-radius:8px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between}.stat-label{font-family:Orbitron,monospace;font-size:9px;color:#c9cc00;letter-spacing:1px;text-transform:uppercase}.stat-value{font-family:Orbitron,monospace;font-size:13px;font-weight:700;color:rgb(255 255 255);text-shadow:0 0 10px rgba(255,255,255,0.6)}.footer{margin-top:14px;text-align:center;font-size:11px;color:#727400;letter-spacing:1px;text-transform:uppercase;font-family:Orbitron,monospace;padding-top:10px;border-top:1px solid rgba(0,255,208,0.15)}.footer span{color:rgb(0,255,238);text-shadow:0 0 10px rgba(0,255,217,0.6)}.copyright a{color:rgb(221,192,0);text-decoration:none}</style>
</head>
<body>
    <div class="hero-bg">
        <amp-img src="${banner}" layout="fill" object-fit="cover" alt="${brand} Background"></amp-img>
    </div>
    <div class="scanlines"></div>
    <div class="overlay">
        <div class="card">
            <div class="topbar">
                <amp-img src="${logo}" width="160" height="48" layout="intrinsic" alt="${brand} LOGO"></amp-img>
            </div>
            <div class="banner" style="white-space:nowrap!important;flex-wrap:nowrap!important;overflow:hidden;display:block;">
                <amp-img src="${banner}" width="600" height="315" layout="responsive" alt="${brand} Banner"></amp-img>
            </div>
            <div class="titlebar">${brand} ✈️ ${escapeHtml(config.tagline || 'Situs Slot Gacor & Bocoran RTP Live 24 Jam')}</div>
            <div class="btns">
                <a href="${daftarUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="btn btn-daftar">${escapeHtml(config.ctaText || 'KLIK UNTUK DAFTAR')}</a>
                <a href="${loginUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="btn btn-login">${escapeHtml(config.ctaSecondaryText || 'KLIK UNTUK LOGIN')}</a>
                <a href="${chatUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="btn btn-login">LIVE CHAT ${brand}</a>
            </div>
            <div class="content">
                <div class="stats-grid">
                    <div class="stat-badge"><span class="stat-label">RATING</span><span class="stat-value">${rating}</span></div>
                    <div class="stat-badge"><span class="stat-label">DEPO</span><span class="stat-value">${depo}</span></div>
                    <div class="stat-badge"><span class="stat-label">RTP RATE</span><span class="stat-value">${rtp}</span></div>
                    <div class="stat-badge"><span class="stat-label">WEDE</span><span class="stat-value">${wede}</span></div>
                </div>
                <div class="info">
                    <div class="row">
                        <div class="label">Nama Situs</div>
                        <div class="value">${brand}</div>
                    </div>
                    <div class="row">
                        <div class="label">Min Betting</div>
                        <div class="value">${minBet}</div>
                    </div>
                    <div class="row">
                        <div class="label">Bonus</div>
                        <div class="value">${bonus}</div>
                    </div>
                    <div class="row">
                        <div class="label">Deposit</div>
                        <div class="value">${depositMethods}</div>
                    </div>
                </div>
                <div class="footer">
                    <p class="copyright"><strong>&copy; ${new Date().getFullYear()} <a href="${canonical}">${brand}</a> - All Rights Reserved.</strong></p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
};

/* =========================================================================
   SKEMA 3: TOTO12 (Red Glass Shine Animation, Dual Server CTA)
   ========================================================================= */
export const generateAmpTotoRed = (config: AmpConfig): string => {
  const brand = escapeHtml(config.brandName || 'TOTO12');
  const title = escapeHtml(config.title || `${brand} - Link Alternatif Resmi Terpercaya`);
  const logo = escapeHtml(config.logoUrl || 'https://photosaya.io/images/2024/07/09/toto12-ezgif.com-resize.gif');
  const banner = escapeHtml(config.bannerGifUrl || 'https://photosaya.io/images/2025/03/29/500x500-BANDAR-TERPECAYA.jpg');
  const daftarUrl = escapeHtml(config.targetUrl || 'https://sayakale.me/UCxZJD');
  const loginUrl = escapeHtml(config.ctaSecondaryUrl || config.targetUrl || 'https://kitakale.me/kqsqCP');
  const chatUrl = escapeHtml(config.liveChatUrl || config.targetUrl || 'https://kitakale.me/LIVECHAT');
  const altUrl = escapeHtml(config.altUrl || config.targetUrl || 'https://gacorbos.me/n0E7u2');
  const canonical = escapeHtml(config.canonicalUrl || 'https://toto12.online/');
  const desc = escapeHtml(config.metaDescription || `${brand} adalah solusi tepat dengan akses cadangan yang selalu aktif 24 jam.`);

  return `<!DOCTYPE html>
<html amp lang="id">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="width=device-width,initial-scale=1" name="viewport">
    <title>${title}</title>
    <meta content="${desc}" name="description">
    <meta content="index,follow" name="robots">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${banner}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${brand}">
    <link href="${canonical}" rel="canonical">
    <link href="${logo}" rel="icon" type="image/x-icon">
    <script async src="https://cdn.ampproject.org/v0.js"></script>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

    <style amp-custom>
        body {
            background-color: #000;
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            color: #fff;
            ${config.cyberShield?.enabled && config.cyberShield?.blockTextCopy ? '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' : ''}
        }
        a { text-decoration: none; color: inherit; }
        header {
            display: flex;
            width: 100%;
            background-color: #000;
            justify-content: center;
            position: fixed;
            top: 0;
            z-index: 99;
            height: 70px;
            border-bottom: 1px solid #333;
            contain: layout size;
        }
        .vs7gvnk {
            width: 280px;
            height: 60px;
            margin-top: 5px;
            position: relative;
            overflow: hidden;
            border-radius: 6px;
        }
        .vs7gvnk a::after {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .7) 50%, rgba(255, 255, 255, 0) 100%);
            transform: skewX(-25deg);
            pointer-events: none;
            animation: glassShine 3s infinite;
        }
        .container {
            width: 100%;
            max-width: 500px;
            margin: 80px auto 0;
            padding: 10px;
            box-sizing: border-box;
            display: block;
        }
        .centerbyv {
            margin-bottom: 15px;
            text-align: center;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid #ff0000;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
        }
        .server, .server-full {
            width: 100%;
            display: block;
        }
        .se {
            display: flex;
            gap: 10px;
            margin: 5px 0;
        }
        .se a, .server-full a {
            flex: 1;
            display: block;
        }
        .eg, .eg-long {
            width: 100%;
            height: 56px;
            font-size: 17px;
            cursor: pointer;
            background: linear-gradient(to bottom, #ff0000 0, #000000 40%, #ff0000 100%);
            color: #ffffff;
            font-weight: 800;
            border: none;
            border-top: 1px solid rgb(255, 0, 0);
            border-bottom: 4px solid #ff0000;
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        @keyframes glassShine {
            0% { left: -150%; }
            100% { left: 150%; }
        }
        .eg-long::before, .eg::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgb(255, 255, 255) 0, rgba(255, 255, 255, .6) 50%, rgba(255, 255, 255, 0) 100%);
            transform: skewX(-25deg);
            pointer-events: none;
            will-change: left;
            animation: glassShine 2s infinite;
        }
        .divider {
            border: none;
            height: 1px;
            background: #333;
            margin: 10px 0;
        }
        .copyright {
            text-align: center;
            color: #888;
            margin: 25px 0 40px;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <header>
        <div class="vs7gvnk">
            <a href="${canonical}">
                <amp-img alt="${brand}" height="65" src="${logo}" width="280" layout="fixed"></amp-img>
            </a>
        </div>
    </header>
    <div class="container">
        <div class="centerbyv" style="white-space:nowrap!important;flex-wrap:nowrap!important;overflow:hidden;display:block;">
            <a href="${daftarUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored">
                <amp-img alt="${brand}" height="500" src="${banner}" width="500" layout="responsive"></amp-img>
            </a>
        </div>
        <div class="server">
            <div class="se">
                <a href="${daftarUrl}" rel="nofollow noopener noreferrer sponsored" target="_blank">
                    <button class="eg">${escapeHtml(config.ctaText || 'DAFTAR')}</button>
                </a>
                <a href="${loginUrl}" rel="nofollow noopener noreferrer sponsored" target="_blank">
                    <button class="eg">${escapeHtml(config.ctaSecondaryText || 'MASUK')}</button>
                </a>
            </div>
        </div>
        <div class="divider"></div>
        <div class="server-full">
            <a href="${chatUrl}" rel="nofollow noopener noreferrer sponsored" target="_blank">
                <button class="eg eg-long">LIVECHAT 24 JAM</button>
            </a>
        </div>
        <div class="divider"></div>
        <div class="server-full">
            <a href="${altUrl}" rel="nofollow noopener noreferrer sponsored" target="_blank">
                <button class="eg eg-long">LINK ALTERNATIF RESMI</button>
            </a>
        </div>
    </div>
    <div class="copyright">&copy; ${new Date().getFullYear()} ${brand} | All Rights Reserved.</div>
</body>
</html>`;
};

/* =========================================================================
   SKEMA 4: NAGABET76 (Galaxy Nebula, Stars, Meteors, Lightning Bolt Strikes)
   ========================================================================= */
export const generateAmpNagabetGalaxy = (config: AmpConfig): string => {
  const brand = escapeHtml(config.brandName || 'NAGABET76');
  const title = escapeHtml(config.title || `Kunjungi ${brand} | Solusi Terbaik Untuk Pemula Mudah Menang Bermain Game Online Digital`);
  const logo = escapeHtml(config.logoUrl || 'https://www.lestedosol.com/img/nagabet76-logo.png');
  const banner = escapeHtml(config.bannerGifUrl || 'https://i.imgur.com/PkbO0tE.jpeg');
  const daftarUrl = escapeHtml(config.targetUrl || 'https://petir-nagabet76.pages.dev');
  const loginUrl = escapeHtml(config.ctaSecondaryUrl || config.targetUrl || 'https://petir-nagabet76.pages.dev');
  const altUrl = escapeHtml(config.altUrl || config.targetUrl || 'https://petir-nagabet76.pages.dev');
  const canonical = escapeHtml(config.canonicalUrl || 'https://www.lestedosol.com/contos/almanaques');
  const desc = escapeHtml(config.metaDescription || `Kunjungi ${brand}, solusi praktis bagi pemula untuk mengenal game online digital dengan mudah. Nikmati pilihan game populer dan akses nyaman.`);
  const bonus = escapeHtml(config.bonusText || 'Claim Bonus New Member Sekarang !!');

  return `<!DOCTYPE html>
<html amp lang="id-ID">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index,follow">
  <link rel="shortcut icon" type="image/x-icon" href="${logo}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${brand}">
  <meta property="og:image" content="${banner}">
  <link rel="preload" as="image" href="${logo}">
  <link rel="preload" as="image" href="${banner}">
  <script async src="https://cdn.ampproject.org/v0.js"></script>

  <style amp-boilerplate>
    body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}
    @-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  </style>
  <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

  <style amp-custom>
    :root{
      --yellow:#f2c94c;
      --yellow-light:#ffe9a3;
      --amber:#c9962e;
      --deep:#8b1118;
      --red:#b5121b;
      --red-dark:#5c0b10;
      --white:#fff4d6;
      --muted:#d8c7a4;
    }
    *{box-sizing:border-box;margin:0;padding:0;${config.cyberShield?.enabled && config.cyberShield?.blockTextCopy ? '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' : ''}}
    html{background:#070303;scroll-behavior:smooth}
    body{min-width:320px;min-height:100vh;overflow-x:hidden;color:var(--white);font-family:Arial,Helvetica,sans-serif;background:#000000}
    a{color:inherit;text-decoration:none}
    .galaxy{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
    .galaxy::before{content:"";position:absolute;inset:-20%;background:radial-gradient(circle at 20% 30%,rgba(242,201,76,.10),transparent 23%),radial-gradient(circle at 74% 34%,rgba(181,18,27,.10),transparent 22%),radial-gradient(circle at 52% 84%,rgba(201,150,46,.08),transparent 25%);filter:blur(18px);animation:nebulaMove 10s ease-in-out infinite alternate}
    .galaxy::after{content:"";position:absolute;inset:-28%;opacity:0;background:linear-gradient(118deg,transparent 38%,rgba(255,244,214,.16) 47%,rgba(242,201,76,.52) 50%,rgba(255,244,214,.13) 53%,transparent 62%);filter:blur(3px);animation:galaxyFlash 2.7s ease-in-out infinite}
    .stars{position:absolute;inset:0}
    .star{position:absolute;width:4px;height:4px;border-radius:50%;background:#ffe9a3;box-shadow:0 0 7px #ffe9a3,0 0 13px var(--yellow);animation:starBlink 2.2s ease-in-out infinite}
    .star:nth-child(1){left:4%;top:12%;animation-delay:.1s}
    .star:nth-child(2){left:11%;top:42%;animation-delay:.7s}
    .star:nth-child(3){left:18%;top:72%;animation-delay:1.1s}
    .star:nth-child(4){left:25%;top:23%;animation-delay:.4s}
    .star:nth-child(5){left:33%;top:58%;animation-delay:1.5s}
    .star:nth-child(6){left:41%;top:9%;animation-delay:.9s}
    .star:nth-child(7){left:48%;top:83%;animation-delay:.2s}
    .star:nth-child(8){left:56%;top:36%;animation-delay:1.3s}
    .star:nth-child(9){left:63%;top:68%;animation-delay:.6s}
    .star:nth-child(10){left:71%;top:17%;animation-delay:1.7s}
    .star:nth-child(11){left:78%;top:49%;animation-delay:.3s}
    .star:nth-child(12){left:84%;top:79%;animation-delay:1s}
    .star:nth-child(13){left:91%;top:30%;animation-delay:1.4s}
    .star:nth-child(14){left:96%;top:61%;animation-delay:.5s}
    .meteor{position:absolute;width:120px;height:2px;opacity:0;background:linear-gradient(90deg,transparent,#fff,var(--yellow),var(--red),transparent);box-shadow:0 0 8px var(--yellow),0 0 15px var(--red);transform:rotate(-22deg);animation:meteorRun 4.6s linear infinite}
    .meteor.m1{left:-25%;top:18%}
    .meteor.m2{left:-30%;top:48%;animation-delay:1.55s}
    .meteor.m3{left:-20%;top:77%;animation-delay:3s}
    .bolt{position:absolute;width:64px;height:300px;opacity:0;clip-path:polygon(46% 0,73% 0,55% 30%,78% 30%,38% 66%,63% 66%,18% 100%,34% 58%,14% 58%,45% 26%,27% 26%);background:linear-gradient(#fff,#fff5c9 24%,var(--yellow) 48%,var(--red) 70%,transparent);filter:drop-shadow(0 0 7px #fff) drop-shadow(0 0 15px var(--yellow)) drop-shadow(0 0 25px var(--red));animation:boltStrike 2.35s ease-in-out infinite}
    .bolt.b1{left:1%;top:7vh}
    .bolt.b2{left:14%;top:17vh;transform:scale(.65);animation-delay:.58s}
    .bolt.b3{right:14%;top:12vh;transform:scaleX(-1) scale(.66);animation-delay:1.16s}
    .bolt.b4{right:1%;top:5vh;transform:scaleX(-1);animation-delay:1.73s}
    @keyframes nebulaMove{from{transform:translate3d(-2%,-1%,0) scale(1)}to{transform:translate3d(2%,2%,0) scale(1.08)}}
    @keyframes galaxyFlash{0%,68%,100%{opacity:0;transform:translateX(-78%) rotate(-7deg)}70%{opacity:.9}72%{opacity:.08}74%{opacity:.66}81%{opacity:0;transform:translateX(78%) rotate(-7deg)}}
    @keyframes starBlink{0%,100%{opacity:.22;transform:scale(.55)}50%{opacity:1;transform:scale(1.35)}}
    @keyframes meteorRun{0%,12%{opacity:0;transform:translateX(0) translateY(0) rotate(-22deg)}18%{opacity:1}48%{opacity:0;transform:translateX(145vw) translateY(36vh) rotate(-22deg)}100%{opacity:0}}
    @keyframes boltStrike{0%,74%,100%{opacity:0}76%{opacity:1}78%{opacity:.07}80%{opacity:.96}84%{opacity:0}}
    .page{position:relative;z-index:2;width:100%;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:22px 12px 30px}
    .container{position:relative;width:100%;max-width:980px;padding:24px;overflow:hidden;border:1px solid #642126;border-radius:30px;background:#050000;box-shadow:0 0 34px rgba(242,201,76,.24),0 0 72px rgba(181,18,27,.24),0 28px 70px rgba(0,0,0,.78),inset 0 0 32px rgba(242,201,76,.06)}
    .container::before{content:"";position:absolute;inset:-50%;pointer-events:none;background:conic-gradient(transparent,rgba(181,18,27,.17),transparent,rgba(242,201,76,.11),transparent,rgba(255,244,214,.05),transparent);animation:panelRotate 15s linear infinite}
    .container::after{content:"";position:absolute;top:0;bottom:0;left:-70%;width:42%;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(255,244,214,.11),rgba(242,201,76,.20),rgba(181,18,27,.12),transparent);transform:skewX(-20deg);animation:panelSweep 2.5s linear infinite}
    @keyframes panelRotate{to{transform:rotate(360deg)}}
    @keyframes panelSweep{to{left:140%}}
    .content{position:relative;z-index:3}
    .layout{display:grid;grid-template-columns:minmax(0,.88fr) minmax(0,1.12fr);gap:26px;align-items:center}
    .left,.right{min-width:0}
    .logo-wrapper{position:relative;text-align:left;margin-bottom:15px}
    .logo-wrapper::before{content:"";position:absolute;left:135px;top:50%;width:300px;height:105px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(242,201,76,.34),rgba(181,18,27,.16) 42%,transparent 68%);filter:blur(14px);animation:logoAura 1.7s ease-in-out infinite alternate}
    .logo-img{position:relative;z-index:2;filter:drop-shadow(0 0 12px rgba(242,201,76,.75)) drop-shadow(0 0 25px rgba(181,18,27,.45));animation:logoFloat 2.5s ease-in-out infinite}
    @keyframes logoAura{from{opacity:.42;transform:translate(-50%,-50%) scale(.92)}to{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
    @keyframes logoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    .welcome{display:inline-flex;align-items:center;gap:8px;margin-bottom:16px;padding:8px 11px;border:1px solid rgba(242,201,76,.38);border-radius:999px;color:#f2c94c;background:rgba(181,18,27,.14);font-size:10px;font-weight:900;letter-spacing:.5px;text-transform:uppercase;box-shadow:inset 0 0 14px rgba(242,201,76,.06)}
    .welcome::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--yellow);box-shadow:0 0 10px var(--yellow),0 0 16px var(--red);animation:statusPulse 1s ease-in-out infinite alternate}
    @keyframes statusPulse{to{transform:scale(1.35)}}
    .headline{margin:0 0 11px;color:#f2c94c;font-size:26px;line-height:1.28;font-weight:900;text-transform:uppercase;text-shadow:0 0 9px rgba(242,201,76,.58),0 0 22px rgba(181,18,27,.35)}
    .subcopy{margin:0 0 18px;color:var(--muted);font-size:12px;line-height:1.65}
    .buttons{display:grid;grid-template-columns:1fr 1fr;gap:11px}
    .btn{position:relative;display:flex;align-items:center;justify-content:center;min-height:53px;padding:13px;overflow:hidden;border:1px solid rgba(242,201,76,.56);border-radius:14px;font-size:13px;font-weight:900;letter-spacing:.7px;text-align:center;text-transform:uppercase;box-shadow:0 9px 22px rgba(0,0,0,.48)}
    .btn::before{content:"";position:absolute;top:0;bottom:0;left:-70%;width:42%;background:linear-gradient(90deg,transparent,rgba(255,244,214,.45),transparent);transform:skewX(-22deg);animation:buttonSweep 1.7s linear infinite}
    .btn::after{content:"";position:absolute;inset:3px;border:1px solid rgba(255,240,205,.15);border-radius:10px;pointer-events:none}
    .btn-daftar{color:#1a0a03;background:linear-gradient(90deg,#ffe9a3,#d49b28,#f2c94c,#8b1118,#f2c94c,#a66f16);background-size:300% 100%;animation:buttonFlow 1.25s ease-in-out infinite alternate}
    .btn-login{color:#ffe9a3;background:linear-gradient(90deg,#080303,#5c0b10,#180506,#c9962e,#080303);background-size:280% 100%;text-shadow:0 0 8px rgba(242,201,76,.52);animation:buttonFlow 1.4s ease-in-out infinite alternate-reverse}
    .btn-alt{grid-column:1/-1;color:#fff4d6;background:linear-gradient(90deg,#6e0c14,#c9962e,#a3131c,#6e0c14);background-size:260% 100%;animation:buttonFlow 1.35s ease-in-out infinite alternate}
    @keyframes buttonSweep{to{left:140%}}
    @keyframes buttonFlow{from{background-position:0 50%}to{background-position:100% 50%}}
    .warning{position:relative;margin-top:14px;padding:13px 12px 12px 46px;overflow:hidden;border:1px solid #c9962e;border-radius:14px;color:#e5d6b7;background:linear-gradient(90deg,rgba(181,18,27,.16),rgba(7,3,3,.80),rgba(242,201,76,.09));font-size:10px;line-height:1.55;box-shadow:inset 0 0 16px rgba(242,201,76,.06)}
    .warning::before{content:"!";position:absolute;left:12px;top:13px;display:flex;align-items:center;justify-content:center;width:25px;height:25px;border-radius:7px;color:#5c0b10;background:var(--yellow);font-size:18px;font-weight:900;box-shadow:0 0 12px rgba(242,201,76,.42),0 0 20px rgba(181,18,27,.25)}
    .warning strong{color:#f2c94c}
    .hero-shell{position:relative;padding:4px;overflow:hidden;border-radius:23px;background:linear-gradient(90deg,#5c0b10,#ffe9a3,#f2c94c,#c9962e,#8b1118,#d49b28,#5c0b10);background-size:320% 100%;box-shadow:0 0 25px rgba(242,201,76,.32),0 0 48px rgba(181,18,27,.28);animation:heroBorder 1.5s ease-in-out infinite alternate}
    .hero-card{position:relative;overflow:hidden;border-radius:19px;background:#000000}
    .hero-card::before{content:"";position:absolute;top:-70%;left:-70%;width:42%;height:240%;z-index:2;pointer-events:none;background:linear-gradient(120deg,transparent 0%,rgba(255,245,220,0) 26%,rgba(255,233,163,.62) 50%,rgba(255,245,220,0) 74%,transparent 100%);transform:rotate(24deg);animation:heroShine 2.1s ease-in-out infinite}
    .hero-card amp-img{display:block}
    @keyframes heroBorder{from{background-position:0 50%}to{background-position:100% 50%}}
    @keyframes heroShine{0%{left:-70%;opacity:0}18%{opacity:1}58%{left:115%;opacity:.95}100%{left:130%;opacity:0}}
    .copyright{margin-top:20px;padding:12px 10px;border:1px solid rgba(242,201,76,.32);border-radius:13px;color:#e5d6b7;background:linear-gradient(90deg,rgba(181,18,27,.10),rgba(7,3,3,.74),rgba(242,201,76,.07));font-size:11px;line-height:1.55;text-align:center}
    .copyright a{color:var(--yellow);font-weight:900;text-shadow:0 0 8px rgba(242,201,76,.36)}
    @media(max-width:760px){.page{padding:10px 8px 18px}.container{max-width:520px;padding:18px 13px;border-radius:23px}.layout{grid-template-columns:1fr;gap:19px}.logo-wrapper{text-align:center}.logo-wrapper::before{left:50%}.headline{font-size:20px;text-align:center}.welcome{display:flex;width:max-content;max-width:100%;margin-left:auto;margin-right:auto}.subcopy{text-align:center}.buttons{grid-template-columns:1fr}.btn-alt{grid-column:auto}.b2,.b3{display:none}.bolt{transform:scale(.72)}.b4{transform:scaleX(-1) scale(.72)}}
  </style>
</head>
<body>
  <div class="galaxy" aria-hidden="true">
    <div class="stars">
      <span class="star"></span><span class="star"></span><span class="star"></span>
      <span class="star"></span><span class="star"></span><span class="star"></span>
      <span class="star"></span><span class="star"></span><span class="star"></span>
      <span class="star"></span><span class="star"></span><span class="star"></span>
      <span class="star"></span><span class="star"></span>
    </div>
    <span class="meteor m1"></span>
    <span class="meteor m2"></span>
    <span class="meteor m3"></span>
    <span class="bolt b1"></span>
    <span class="bolt b2"></span>
    <span class="bolt b3"></span>
    <span class="bolt b4"></span>
  </div>

  <main class="page">
    <section class="container">
      <div class="content">
        <div class="layout">
          <div class="left">
            <div class="logo-wrapper">
              <a href="${canonical}">
                <amp-img class="logo-img" src="${logo}" alt="${brand}" width="320" height="120" layout="intrinsic"></amp-img>
              </a>
            </div>

            <div class="welcome">
              ${bonus}
            </div>

            <h1 class="headline">
              ${escapeHtml(config.seoHeading || title)}
            </h1>

            <p class="subcopy">
              ${escapeHtml(config.seoParagraph || `Cari situs slot gacor dengan petir x1000 & peluang maxwin nyata? ${brand} adalah jawabannya. Daftar sekarang juga dan buktikan sendiri keseruannya!`)}
            </p>

            <div class="buttons">
              <a href="${loginUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" role="button" class="btn btn-login">
                ${escapeHtml(config.ctaSecondaryText || 'LOGIN MEMBER')}
              </a>
              <a href="${daftarUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" role="button" class="btn btn-daftar">
                ${escapeHtml(config.ctaText || 'DAFTAR AKUN')}
              </a>
              <a href="${altUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" role="button" class="btn btn-alt">
                LINK ALTERNATIF VIP
              </a>
            </div>

            <aside class="warning">
              <strong>Yang Mau Maxwin Aja!</strong>
              Kesempatan Maxwin Tidak Datang Dua Kali. Petir x1000 Menanti. Klaim Sekarang Dan Rasakan Kemenangan!
            </aside>
          </div>

          <div class="right">
            <div class="hero-shell">
              <div class="hero-card">
                <amp-img src="${banner}" width="600" height="600" layout="responsive" alt="${brand} Slot"></amp-img>
              </div>
            </div>
          </div>
        </div>

        <p class="copyright">
          &copy; ${new Date().getFullYear()} All Rights Reserved | 
          <a href="${canonical}"><strong>${brand} OFFICIAL</strong></a>
        </p>
      </div>
    </section>
  </main>
</body>
</html>`;
};

/* =========================================================================
   SKEMA 5: TOTO12 CAROUSEL & BANK GRID (AMP Carousel, LiveChat Floating, Banks)
   ========================================================================= */
export const generateAmpTotoCarousel = (config: AmpConfig): string => {
  const brand = escapeHtml(config.brandName || 'TOTO12');
  const title = escapeHtml(config.title || `${brand} Situs Judi Online & Slot Online Dengan Layanan Terpercaya`);
  const logo = escapeHtml(config.logoUrl || 'https://photosaya.io/images/2024/07/09/toto12-ezgif.com-resize.gif');
  const banner = escapeHtml(config.bannerGifUrl || 'https://imagme.com/images/2025/04/23/slide-cari-kita-2.jpeg');
  const daftarUrl = escapeHtml(config.targetUrl || 'https://kitakale.me/daftartoto12');
  const loginUrl = escapeHtml(config.ctaSecondaryUrl || config.targetUrl || 'https://sayakale.me/toto12');
  const chatUrl = escapeHtml(config.liveChatUrl || config.targetUrl || 'https://kitakale.me/LIVECHAT');
  const canonical = escapeHtml(config.canonicalUrl || 'https://toto12.com/');
  const desc = escapeHtml(config.metaDescription || `${brand} adalah situs judi online dan slot terkemuka yang menawarkan layanan terpercaya.`);
  const marquee = escapeHtml(config.runningText || `${brand} adalah situs judi online dan slot terkemuka yang menawarkan layanan terpercaya. Daftar sekarang dan rasakan pengalaman bermain yang aman!`);
  const minDepo = escapeHtml(config.minDeposit || 'Rp. 5.000');
  const minWd = escapeHtml(config.minWithdraw || 'Rp. 50.000');
  const methods = escapeHtml(config.depositMethods || 'Transfer Bank, E-Wallet, Scan Qris');

  return `<!doctype html>
<html ⚡ lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="author" content="${brand}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${banner}">
    <meta property="og:url" content="${canonical}">
    <link rel="canonical" href="${canonical}" />
    <link rel="shortcut icon" type="image/x-icon" href="${logo}" />

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>
    <script async src="https://cdn.ampproject.org/v0.js"></script>

    <style amp-custom>
        *{box-sizing:border-box;margin:0;padding:0;${config.cyberShield?.enabled && config.cyberShield?.blockTextCopy ? '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' : ''}}
        body {
            background: #111;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #ffffff;
            display: flex;
            justify-content: center;
            padding: 10px;
        }
        .the-main-container {
            width: 100%;
            max-width: 540px;
        }
        .main-body {
            background: #000000ed;
            color: #ffffff;
            box-shadow: 0px 5px 22px #ff0303;
            border: 1px solid #ff0303;
            overflow: hidden;
            border-radius: 14px;
        }
        .page-header {
            padding: 14px 20px;
            background: #111111;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #d88f07;
        }
        .buttonWrap.buttonlc2.button-orange {
            background: linear-gradient(to bottom, #d80707 0%, #a00 100%);
            color: #ffffff;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
            border: 2px groove #FFFFFF;
            border-radius: 8px;
            padding: 8px 14px;
            text-decoration: none;
            display: inline-block;
        }
        .marquee {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            background: #1a0505;
            padding: 6px 0;
            font-size: 12px;
            color: #ffc107;
            font-weight: bold;
            border-bottom: 1px solid #ff0303;
        }
        .marquee span {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 22s linear infinite;
        }
        @keyframes marquee { 0% { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
        .featured-image {
            width: 100%;
            background: #000;
        }
        .content-body {
            padding: 15px;
        }
        .buttonWrap.button-blue {
            padding: 14px;
            display: block;
            background: linear-gradient(to bottom, #007bff 0%, #004085 100%);
            border-radius: 12px;
            font-weight: 800;
            font-size: 16px;
            text-align: center;
            color: #fff;
            text-decoration: none;
            margin-bottom: 10px;
            border: 1px solid #0056b3;
            letter-spacing: 1px;
        }
        .buttonWrap.button-green {
            padding: 14px;
            display: block;
            background: linear-gradient(to bottom, #28a745 0%, #155724 100%);
            border-radius: 12px;
            font-weight: 800;
            font-size: 16px;
            text-align: center;
            color: #fff;
            text-decoration: none;
            margin-bottom: 15px;
            border: 1px solid #1e7e34;
            letter-spacing: 1px;
        }
        .center-bank {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin: 15px 0;
        }
        .bank-item {
            background: #ffffff;
            color: #000;
            border-radius: 8px;
            padding: 8px 4px;
            text-align: center;
            font-size: 11px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            border: 2px groove #ff0303;
        }
        table {
            width: 100%;
            color: #fff;
            text-align: left;
            background-color: #161616;
            border: 1px solid #ff0303;
            border-collapse: collapse;
            border-radius: 8px;
            overflow: hidden;
            margin-top: 10px;
            font-size: 13px;
        }
        table thead th {
            background-color: #ff0303;
            color: #ffffff;
            font-weight: bold;
            padding: 10px;
            text-align: center;
            text-transform: uppercase;
        }
        table td {
            padding: 9px 12px;
            border-bottom: 1px solid #282828;
        }
        table tr:nth-child(even) {
            background: rgba(255,255,255,0.02);
        }
        .footer {
            font-size: 11px;
            color: #888;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="the-main-container">
        <div class="main-body">
            <div class="page-header">
                <a href="${canonical}">
                    <amp-img src="${logo}" width="160" height="42" layout="fixed" alt="${brand} Logo"></amp-img>
                </a>
                <a href="${chatUrl}" target="_blank" rel="noopener noreferrer" class="buttonWrap buttonlc2 button-orange">Live Chat</a>
            </div>

            <p class="marquee">
                <span>${marquee}</span>
            </p>

            <div class="featured-image" style="white-space:nowrap!important;flex-wrap:nowrap!important;overflow:hidden;display:block;">
                <amp-carousel width="600" height="315" layout="responsive" type="slides" autoplay delay="3000" loop>
                    <amp-img src="${banner}" width="600" height="315" layout="responsive" alt="${brand} 1"></amp-img>
                    <amp-img src="${banner}" width="600" height="315" layout="responsive" alt="${brand} 2"></amp-img>
                </amp-carousel>
            </div>

            <div class="content-body">
                <a href="${loginUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="buttonWrap button-blue">LOGIN AKUN RESMI</a>
                <a href="${daftarUrl}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="buttonWrap button-green">DAFTAR AKUN VIP</a>

                <!-- Bank Transfer & E-Wallet Status Grid -->
                <div class="center-bank">
                    <div class="bank-item">🟢 BCA</div>
                    <div class="bank-item">🟢 MANDIRI</div>
                    <div class="bank-item">🟢 BRI</div>
                    <div class="bank-item">🟢 BNI</div>
                    <div class="bank-item">🟢 CIMB</div>
                    <div class="bank-item">🟢 DANAMON</div>
                    <div class="bank-item">🟢 DANA</div>
                    <div class="bank-item">🟢 OVO</div>
                    <div class="bank-item">🟢 QRIS 24H</div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th colspan="2">INFORMASI RESMI SITUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nama Situs</td>
                            <td><strong>${brand}</strong></td>
                        </tr>
                        <tr>
                            <td>Metode Deposit</td>
                            <td>${methods}</td>
                        </tr>
                        <tr>
                            <td>Minimal Deposit</td>
                            <td>${minDepo}</td>
                        </tr>
                        <tr>
                            <td>Minimal Withdraw</td>
                            <td>${minWd}</td>
                        </tr>
                        <tr>
                            <td>Pelayanan</td>
                            <td>Online 24 Jam Non-stop</td>
                        </tr>
                    </tbody>
                </table>

                <div class="footer">
                    &copy; ${new Date().getFullYear()} <a href="${canonical}" style="color:#ffc107;">${brand}</a> | All Rights Reserved.
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
};

/* =========================================================================
   SKEMA 6: DEMO SLOT PG SOFT & PRAGMATIC GRID (Interactive Game Selector)
   ========================================================================= */
export const generateAmpDemoGrid = (config: AmpConfig): string => {
  const brand = escapeHtml(config.brandName || 'Demo Slot PG Soft');
  const title = escapeHtml(config.title || `Demo Slot Mahjong Free Spin PG Soft Jp X25000, Akun Demo Gratis Gampang Menang`);
  const logo = escapeHtml(config.logoUrl || '/img/kayutogeldemo.webp');
  const banner = escapeHtml(config.bannerGifUrl || '/img/demo2026.webp');
  const daftarUrl = escapeHtml(config.targetUrl || 'https://chill.ly/daftarkayutogel');
  const loginUrl = escapeHtml(config.ctaSecondaryUrl || config.targetUrl || 'https://chill.ly/kayutogel');
  const chatUrl = escapeHtml(config.liveChatUrl || config.targetUrl || 'https://cutt.ly/Cs-kayutogel');
  const canonical = escapeHtml(config.canonicalUrl || 'https://pgsoftgame.bond/');
  const desc = escapeHtml(config.metaDescription || `Nikmati demo slot mahjong PG Soft dengan akun slot demo gratis gampang menang.`);

  return `<!doctype html>
<html amp lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
    <link rel="canonical" href="${canonical}" />
    <link rel="shortcut icon" href="${logo}">
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="robots" content="index, follow" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

    <style amp-custom>
      :root {
        --clr-bg: #000814;
        --clr-accent: #ffffff;
        --clr-white: #ffffff;
        --clr-link: #3b82f6de;
        --clr-bg1: linear-gradient(135deg, #8a1e1e 0%, #af1e1e 30%, #570f0f 70%, #000814 100%);
        --shadow-strong: 0 0 10px rgba(175, 30, 30, 0.6), 0 0 30px rgba(0, 45, 155, 0.25);
      }
      * { box-sizing: border-box; ${config.cyberShield?.enabled && config.cyberShield?.blockTextCopy ? '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' : ''} }
      body {
        font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        padding: 54px 0 52px;
        background: #040914;
        color: #fff;
      }
      a { color: var(--clr-link); text-decoration: none; }
      .u-container { align-self: center; margin: 5px auto; width: 100%; max-width: 980px; padding: 0 8px; }
      .u-center { text-align: center; }
      .u-grid-3 { display: grid; gap: 6px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .header {
        position: fixed;
        inset: 0 0 auto 0;
        z-index: 99;
        padding: 6px 12px;
        background: var(--clr-bg1);
        border-bottom: 2px solid var(--clr-accent);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .footer {
        position: fixed;
        inset: auto 0 0 0;
        z-index: 99;
        background: var(--clr-bg1);
        border-top: 2px solid var(--clr-accent);
      }
      .footer__nav {
        display: flex;
        justify-content: space-around;
        padding: 6px 0;
      }
      .footer__link {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        color: #e6e6e6;
        font-size: 10px;
        font-weight: 700;
      }
      .btn {
        border: 1px solid #facc15;
        border-radius: 8px;
        text-shadow: var(--shadow-strong);
        text-decoration: none;
        font-weight: 800;
        text-transform: uppercase;
        padding: 14px 20px;
        text-align: center;
        font-size: 16px;
        letter-spacing: 1.5px;
        flex: 1;
        display: block;
      }
      .btn--primary {
        background: linear-gradient(135deg, #fff7c2 0%, #facc15 25%, #eab308 55%, #a16207 85%, #7c2d12 100%);
        color: #000;
      }
      .btn--solid {
        background: #111827;
        color: #fff;
      }
      .game-section {
        background: linear-gradient(160deg, #0f172a, #000814);
        border: 2px solid #1e40afaa;
        border-radius: 12px;
        padding: 10px 8px;
        box-shadow: 0 0 10px rgba(30, 64, 175, 0.45);
        margin: 10px auto;
        max-width: 980px;
      }
      .grid-heading {
        background: rgba(230, 235, 255, 0.06);
        border-radius: 6px;
        padding: 8px 10px;
        margin-bottom: 10px;
        text-align: center;
        font-weight: 700;
        font-size: 1.1rem;
        text-transform: uppercase;
        color: #fefce8;
      }
      .game-card {
        background: #000a19;
        border: 1px solid #1e40afaa;
        border-radius: 8px;
        padding: 4px;
        text-align: center;
      }
      .game-card__title {
        font-weight: 600;
        font-size: 10px;
        color: #fefce8;
        margin-top: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .img-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.5);
        border-radius: 8px;
        opacity: 0;
      }
      .img-cta {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        border-radius: 999px;
        background: #facc15;
        color: #000;
        font-weight: 800;
        font-size: 11px;
        opacity: 0;
        pointer-events: none;
      }
      amp-selector.game-card__img [option][selected] .img-overlay,
      amp-selector.game-card__img [option][selected] .img-cta {
        opacity: 1;
        pointer-events: auto;
      }
      .copy { text-align: center; padding: 15px 0 60px; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class="header">
      <a href="${canonical}">
        <amp-img src="${logo}" width="160" height="45" layout="fixed" alt="${brand}"></amp-img>
      </a>
    </div>

    <div class="u-container" style="white-space:nowrap!important;flex-wrap:nowrap!important;overflow:hidden;display:block;">
      <amp-img src="${banner}" width="600" height="300" layout="responsive" alt="${brand} Demo Banner"></amp-img>
    </div>

    <div class="u-container" style="display:flex;gap:8px;margin-top:10px;">
      <a href="${daftarUrl}" class="btn btn--primary" target="_blank" rel="nofollow noopener noreferrer sponsored">${escapeHtml(config.ctaText || 'DAFTAR')}</a>
      <a href="${loginUrl}" class="btn btn--solid" target="_blank" rel="nofollow noopener noreferrer sponsored">${escapeHtml(config.ctaSecondaryText || 'MASUK')}</a>
    </div>

    <section class="game-section u-w-100">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding:0 4px;">
        <h2 class="grid-heading" style="margin:0;font-size:14px;color:#f59e0b;">🔥 Demo Pragmatic Play 1000X</h2>
        <span style="font-size:10px;background:#059669;color:#fff;padding:2px 6px;border-radius:4px;font-weight:bold;">LIVE RTP 98.8%</span>
      </div>
      <div class="u-grid-3">
        <article class="game-card">
          <amp-selector id="g1" class="game-card__img" layout="container">
            <div option>
              <amp-img src="https://images.weserv.nl/?url=raw.githubusercontent.com/fresns/icons/main/png/games.png&w=200&output=webp" width="100" height="100" layout="responsive" alt="Gates of Olympus 1000"></amp-img>
              <span class="img-overlay"></span>
              <a class="img-cta" href="https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=id&cur=IDR&gameSymbol=vs20olympx" target="_blank" rel="noopener noreferrer">DEMO</a>
            </div>
          </amp-selector>
          <div class="game-card__title">Gates of Olympus 1000</div>
          <div style="font-size:9px;color:#34d399;text-align:center;font-weight:bold;margin-top:2px;">RTP: 98.8% | x1000</div>
        </article>

        <article class="game-card">
          <amp-selector id="g2" class="game-card__img" layout="container">
            <div option>
              <amp-img src="https://images.weserv.nl/?url=raw.githubusercontent.com/fresns/icons/main/png/diamond.png&w=200&output=webp" width="100" height="100" layout="responsive" alt="Sweet Bonanza 1000"></amp-img>
              <span class="img-overlay"></span>
              <a class="img-cta" href="https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=id&cur=IDR&gameSymbol=vs20bonz1000" target="_blank" rel="noopener noreferrer">DEMO</a>
            </div>
          </amp-selector>
          <div class="game-card__title">Sweet Bonanza 1000</div>
          <div style="font-size:9px;color:#34d399;text-align:center;font-weight:bold;margin-top:2px;">RTP: 98.2% | x1000</div>
        </article>

        <article class="game-card">
          <amp-selector id="g3" class="game-card__img" layout="container">
            <div option>
              <amp-img src="https://images.weserv.nl/?url=raw.githubusercontent.com/fresns/icons/main/png/fire.png&w=200&output=webp" width="100" height="100" layout="responsive" alt="Starlight Princess 1000"></amp-img>
              <span class="img-overlay"></span>
              <a class="img-cta" href="https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=id&cur=IDR&gameSymbol=vs20starlightx" target="_blank" rel="noopener noreferrer">DEMO</a>
            </div>
          </amp-selector>
          <div class="game-card__title">Starlight Princess 1000</div>
          <div style="font-size:9px;color:#34d399;text-align:center;font-weight:bold;margin-top:2px;">RTP: 98.5% | x1000</div>
        </article>
      </div>
    </section>

    <section class="game-section u-w-100">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding:0 4px;">
        <h2 class="grid-heading" style="margin:0;font-size:14px;color:#f59e0b;">⚡ Demo PG Soft Gacor</h2>
        <span style="font-size:10px;background:#059669;color:#fff;padding:2px 6px;border-radius:4px;font-weight:bold;">LIVE RTP 98.9%</span>
      </div>
      <div class="u-grid-3">
        <article class="game-card">
          <amp-selector id="pg1" class="game-card__img" layout="container">
            <div option>
              <amp-img src="https://images.weserv.nl/?url=raw.githubusercontent.com/fresns/icons/main/png/trophy.png&w=200&output=webp" width="100" height="100" layout="responsive" alt="Mahjong Ways 2"></amp-img>
              <span class="img-overlay"></span>
              <a class="img-cta" href="https://m.pgsoft-games.com/65/index.html?ot=pgsoft&btt=2&language=id-ID" target="_blank" rel="noopener noreferrer">DEMO</a>
            </div>
          </amp-selector>
          <div class="game-card__title">Mahjong Ways 2</div>
          <div style="font-size:9px;color:#34d399;text-align:center;font-weight:bold;margin-top:2px;">RTP: 98.9% | x100.000</div>
        </article>

        <article class="game-card">
          <amp-selector id="pg2" class="game-card__img" layout="container">
            <div option>
              <amp-img src="https://images.weserv.nl/?url=raw.githubusercontent.com/fresns/icons/main/png/star.png&w=200&output=webp" width="100" height="100" layout="responsive" alt="Lucky Neko"></amp-img>
              <span class="img-overlay"></span>
              <a class="img-cta" href="https://m.pgsoft-games.com/89/index.html?ot=pgsoft&btt=2&language=id-ID" target="_blank" rel="noopener noreferrer">DEMO</a>
            </div>
          </amp-selector>
          <div class="game-card__title">Lucky Neko</div>
          <div style="font-size:9px;color:#34d399;text-align:center;font-weight:bold;margin-top:2px;">RTP: 97.8% | x20.000</div>
        </article>

        <article class="game-card">
          <amp-selector id="pg3" class="game-card__img" layout="container">
            <div option>
              <amp-img src="https://images.weserv.nl/?url=raw.githubusercontent.com/fresns/icons/main/png/shield.png&w=200&output=webp" width="100" height="100" layout="responsive" alt="Wild Bandito"></amp-img>
              <span class="img-overlay"></span>
              <a class="img-cta" href="https://m.pgsoft-games.com/104/index.html?ot=pgsoft&btt=2&language=id-ID" target="_blank" rel="noopener noreferrer">DEMO</a>
            </div>
          </amp-selector>
          <div class="game-card__title">Wild Bandito</div>
          <div style="font-size:9px;color:#34d399;text-align:center;font-weight:bold;margin-top:2px;">RTP: 97.5% | x25.000</div>
        </article>
      </div>
    </section>

    <!-- Responsible Gaming 18+ Non-Coercive Disclaimer -->
    <div style="margin:16px 8px 8px;padding:10px;background:#0f172a;border:1px solid #1e293b;border-radius:8px;font-size:10px;color:#94a3b8;text-align:center;line-height:1.4;">
      <div style="color:#ef4444;font-weight:bold;margin-bottom:4px;">🔞 18+ RESPONSIBLE GAMING NOTICE</div>
      Seluruh simulasi demo dan bocoran persentase RTP ditujukan untuk tujuan edukasi serta hiburan semata tanpa paksaan bermain. Harap bermain secara bijak dan bertanggung jawab.
    </div>

    <div class="copy">&copy; ${new Date().getFullYear()} ${brand} - All Rights Reserved.</div>

    <footer class="footer">
      <nav class="footer__nav">
        <a class="footer__link" href="${daftarUrl}" target="_blank" rel="noopener noreferrer">🎁 PROMO</a>
        <a class="footer__link" href="${loginUrl}" target="_blank" rel="noopener noreferrer">🔑 LOGIN</a>
        <a class="footer__link" href="${daftarUrl}" target="_blank" rel="noopener noreferrer">✨ DAFTAR</a>
        <a class="footer__link" href="${chatUrl}" target="_blank" rel="noopener noreferrer">💬 LIVECHAT</a>
      </nav>
    </footer>
</body>
</html>`;
};
