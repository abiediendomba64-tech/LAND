import type { CyberShieldConfig } from '../types';

export const defaultCyberShieldConfig: CyberShieldConfig = {
  enabled: true,
  blockRightClick: true,
  blockCtrlU: true,
  blockDevInspect: true,
  blockTextCopy: true,
  blockSaveAndPrint: true,
  enableAntiDebugger: true,
  enableSoundAlert: true,
  blockCyberPatrolBots: true,
  enableAntiBotCloak: true,
  noIndexTransitPages: true,
  enforceSearchSafeRel: true,
  warningTitle: '🚨 PERINGATAN KEAMANAN SIBER RESMI',
  warningMessage: 'Akses inspect element (F12), view-source (Ctrl+U), dan copy source code dilarang keras! Seluruh konten, algoritma, dan desain dilindungi oleh Hak Cipta & Skema Cyber Shield Protection.',
  badgeText: '🛡️ CYBER SHIELD PROTECTION ACTIVE',
  autoCloseTimeout: 5,
};

/**
 * Returns Google-compliant search engine safe rel attributes
 * for promotional, affiliate, and outbound redirect links.
 */
export function getSearchSafeRel(isSponsored: boolean = true): string {
  return isSponsored
    ? 'rel="nofollow noopener noreferrer sponsored"'
    : 'rel="noopener noreferrer"';
}

/**
 * Generates meta robots tags according to page indexing policy:
 * - Clean AMP / Portal Home: index, follow (Safe whitehat SEO)
 * - SafeLink / Register / Doorways: noindex, nofollow (Avoid penalization and hide from cyber patrol scrapers)
 */
export function getMetaRobotsDirective(isTransitPage: boolean = false): string {
  if (isTransitPage) {
    return `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta name="googlebot" content="noindex, nofollow">
  <!-- Cyber Institution Crawler Blocker -->
  <meta http-equiv="X-Robots-Tag" content="noindex, nofollow">`;
  }
  return `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`;
}

/**
 * Play a synthesized cyber alarm sound using Web Audio API
 */
export function playCyberWarningSound() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15); // Drop to A4
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
    osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // Audio might be blocked by autoplay policies until user interaction
  }
}

/**
 * Generates the full HTML script + style tag for injection into generated pages
 */
export function generateCyberShieldScript(
  config: CyberShieldConfig = defaultCyberShieldConfig,
  brandName: string = 'SISTEM RESMI'
): string {
  if (!config || !config.enabled) {
    return '';
  }

  const sanitizedTitle = (config.warningTitle || 'PERINGATAN KEAMANAN').replace(/"/g, '\\"');
  const sanitizedMsg = (config.warningMessage || 'Aksi ini tidak diizinkan!').replace(/"/g, '\\"');
  const sanitizedBrand = (brandName || 'SISTEM RESMI').replace(/"/g, '\\"');
  const sanitizedBadge = (config.badgeText || 'CYBER SHIELD ACTIVE').replace(/"/g, '\\"');
  const autoCloseSec = Number(config.autoCloseTimeout) || 5;

  return `<!-- ======================================================== -->
<!-- 🛡️ CYBER SHIELD SECURITY SYSTEM (ANTI-INSPECT & ANTI-COPY) -->
<!-- ======================================================== -->
<style id="cyber-shield-style">
  ${
    config.blockTextCopy
      ? `/* Disable selection, dragging and tap highlight */
  body, html, * {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    -webkit-touch-callout: none !important;
  }
  input, textarea, select {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
  }
  img, a {
    -webkit-user-drag: none !important;
    user-drag: none !important;
  }`
      : ''
  }

  #cyber-alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(4, 7, 13, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 999999999;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    animation: cyberFadeIn 0.2s ease-out forwards;
  }

  #cyber-alert-modal {
    background: linear-gradient(145deg, #0d121f 0%, #080c14 100%);
    border: 2px solid #ef4444;
    border-radius: 16px;
    box-shadow: 0 0 40px rgba(239, 68, 68, 0.4), inset 0 0 20px rgba(239, 68, 68, 0.1);
    max-width: 480px;
    width: 100%;
    padding: 24px;
    color: #f8fafc;
    text-align: center;
    position: relative;
    transform: scale(0.95);
    animation: cyberPopIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes cyberFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes cyberPopIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .cyber-shield-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.15);
    border: 2px solid rgba(239, 68, 68, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px auto;
    color: #ef4444;
    font-size: 28px;
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
    animation: cyberPulse 1.5s infinite;
  }

  @keyframes cyberPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
    50% { transform: scale(1.06); box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
  }

  .cyber-badge {
    display: inline-block;
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.4);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1px;
    padding: 3px 10px;
    border-radius: 9999px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .cyber-title {
    font-size: 18px;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .cyber-desc {
    font-size: 13px;
    color: #cbd5e1;
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .cyber-info-box {
    background: #04070d;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 10px;
    font-size: 11px;
    color: #94a3b8;
    margin-bottom: 18px;
    text-align: left;
    font-family: monospace;
  }

  .cyber-btn {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: #ffffff;
    font-weight: 800;
    font-size: 13px;
    padding: 10px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
    transition: all 0.2s;
    width: 100%;
  }

  .cyber-btn:hover {
    background: #f87171;
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.6);
  }
</style>

<div id="cyber-alert-overlay" onclick="closeCyberAlert(event)">
  <div id="cyber-alert-modal" onclick="event.stopPropagation()">
    <div class="cyber-shield-icon">🛡️</div>
    <span class="cyber-badge">${sanitizedBadge}</span>
    <h3 class="cyber-title">${sanitizedTitle}</h3>
    <p class="cyber-desc" id="cyber-alert-reason">${sanitizedMsg}</p>
    <div class="cyber-info-box">
      <div>🔒 <b>Status:</b> Akses Mencurigakan Ditolak (Blocked)</div>
      <div>🛡️ <b>Target:</b> ${sanitizedBrand} Protected Gateway</div>
      <div>🕒 <b>Waktu:</b> <span id="cyber-timestamp">--</span></div>
      <div>⚠️ <b>Peringatan:</b> Upaya inspect, copy, dan pencurian kode tercatat.</div>
    </div>
    <button class="cyber-btn" onclick="hideCyberModal()">MENGERTI &amp; TUTUP</button>
  </div>
</div>

<script>
(function() {
  var cyberConfig = {
    blockRightClick: ${config.blockRightClick ? 'true' : 'false'},
    blockCtrlU: ${config.blockCtrlU ? 'true' : 'false'},
    blockDevInspect: ${config.blockDevInspect ? 'true' : 'false'},
    blockTextCopy: ${config.blockTextCopy ? 'true' : 'false'},
    blockSaveAndPrint: ${config.blockSaveAndPrint ? 'true' : 'false'},
    enableAntiDebugger: ${config.enableAntiDebugger ? 'true' : 'false'},
    enableSoundAlert: ${config.enableSoundAlert ? 'true' : 'false'},
    blockCyberPatrolBots: ${config.blockCyberPatrolBots ? 'true' : 'false'},
    enableAntiBotCloak: ${config.enableAntiBotCloak ? 'true' : 'false'},
    autoCloseSec: ${autoCloseSec}
  };

  var closeTimer = null;

  // Anti-Cyber Institution Scanner & Headless Bot Detector
  if (cyberConfig.blockCyberPatrolBots) {
    try {
      var ua = (navigator.userAgent || '').toLowerCase();
      var isHeadless = navigator.webdriver || window.__webdriver_evaluate || window.__selenium_evaluate || window._phantom;
      var isPatrolUA = ua.includes('headless') || ua.includes('phantom') || ua.includes('puppeteer') || ua.includes('selenium') || ua.includes('python-requests') || ua.includes('curl/') || ua.includes('wget') || ua.includes('shodan') || ua.includes('censys') || ua.includes('virustotal') || ua.includes('trustwave');
      
      if (isHeadless || isPatrolUA) {
        if (cyberConfig.enableAntiBotCloak) {
          // Serve benign educational technology disguise
          document.addEventListener("DOMContentLoaded", function() {
            document.body.innerHTML = '<div style="font-family:sans-serif;max-width:700px;margin:80px auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;color:#334155;">' +
              '<h2 style="color:#0f172a;">Cloud Network Gateway & Security Handshake</h2>' +
              '<p>This node is an authorized cloud routing endpoint verified under TLS 1.3 encryption protocols. No direct indexing payload found.</p>' +
              '<p style="font-size:12px;color:#64748b;">Status: 200 OK | Protocol: Verified | Time: ' + new Date().toUTCString() + '</p>' +
              '</div>';
          });
        }
      }
    } catch (botErr) {}
  }

  function triggerCyberWarning(reason) {
    var overlay = document.getElementById('cyber-alert-overlay');
    var reasonEl = document.getElementById('cyber-alert-reason');
    var timeEl = document.getElementById('cyber-timestamp');

    if (reasonEl && reason) {
      reasonEl.innerText = reason;
    }
    if (timeEl) {
      timeEl.innerText = new Date().toLocaleString('id-ID');
    }

    if (overlay) {
      overlay.style.display = 'flex';
    }

    if (cyberConfig.enableSoundAlert) {
      try {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          var ctx = new AudioCtx();
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.25);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        }
      } catch (e) {}
    }

    if (closeTimer) clearTimeout(closeTimer);
    if (cyberConfig.autoCloseSec > 0) {
      closeTimer = setTimeout(function() {
        if (overlay) overlay.style.display = 'none';
      }, cyberConfig.autoCloseSec * 1000);
    }
  }

  window.hideCyberModal = function() {
    var overlay = document.getElementById('cyber-alert-overlay');
    if (overlay) overlay.style.display = 'none';
  };

  window.closeCyberAlert = function(e) {
    if (e.target && e.target.id === 'cyber-alert-overlay') {
      window.hideCyberModal();
    }
  };

  // 1. Block Context Menu (Right Click)
  if (cyberConfig.blockRightClick) {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      triggerCyberWarning("Klik kanan dinonaktifkan untuk melindungi hak cipta dan keamanan source code.");
      return false;
    }, true);
  }

  // 2. Keyboard Interceptions (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+S, Ctrl+P, etc.)
  document.addEventListener('keydown', function(e) {
    var isCtrlOrMeta = e.ctrlKey || e.metaKey;
    var key = e.key ? e.key.toLowerCase() : '';
    var code = e.keyCode || e.which;

    // F12 (DevTools)
    if (cyberConfig.blockDevInspect && (code === 123 || key === 'f12')) {
      e.preventDefault();
      e.stopPropagation();
      triggerCyberWarning("Akses Developer Tools (F12) tidak diizinkan pada sistem yang dilindungi ini.");
      return false;
    }

    // Ctrl + U / Cmd + Opt + U (View Source)
    if (cyberConfig.blockCtrlU && (isCtrlOrMeta && (key === 'u' || code === 85))) {
      e.preventDefault();
      e.stopPropagation();
      triggerCyberWarning("Melihat Source Code (Ctrl + U) telah diblokir demi keamanan sistem.");
      return false;
    }

    // Ctrl + Shift + I / J / C (Inspect Element / Console / Picker)
    if (cyberConfig.blockDevInspect && (isCtrlOrMeta && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || code === 73 || code === 74 || code === 67))) {
      e.preventDefault();
      e.stopPropagation();
      triggerCyberWarning("Akses Inspect Element (Ctrl + Shift + " + key.toUpperCase() + ") diblokir oleh Cyber Shield.");
      return false;
    }

    // Save Page (Ctrl+S) & Print (Ctrl+P)
    if (cyberConfig.blockSaveAndPrint && isCtrlOrMeta && (key === 's' || key === 'p' || code === 83 || code === 80)) {
      e.preventDefault();
      e.stopPropagation();
      triggerCyberWarning("Aksi Menyimpan Halaman (Ctrl+S) atau Mencetak (Ctrl+P) dinonaktifkan.");
      return false;
    }

    // Copy (Ctrl+C), Cut (Ctrl+X), Select All (Ctrl+A)
    if (cyberConfig.blockTextCopy && isCtrlOrMeta && (key === 'c' || key === 'x' || key === 'a' || code === 67 || code === 88 || code === 65)) {
      var targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (targetTag !== 'input' && targetTag !== 'textarea') {
        e.preventDefault();
        e.stopPropagation();
        triggerCyberWarning("Menyalin teks (Ctrl + " + key.toUpperCase() + ") tidak diizinkan pada halaman ini.");
        return false;
      }
    }
  }, true);

  // 3. Block Selection, Copy & Cut events
  if (cyberConfig.blockTextCopy) {
    document.addEventListener('copy', function(e) {
      var targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (targetTag !== 'input' && targetTag !== 'textarea') {
        e.preventDefault();
        triggerCyberWarning("Penyalinan konten (Copy) dilarang oleh protokol keamanan.");
      }
    }, true);

    document.addEventListener('cut', function(e) {
      var targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (targetTag !== 'input' && targetTag !== 'textarea') {
        e.preventDefault();
      }
    }, true);

    document.addEventListener('selectstart', function(e) {
      var targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (targetTag !== 'input' && targetTag !== 'textarea') {
        e.preventDefault();
      }
    }, true);

    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
    }, true);
  }

  // 4. Anti-Debugger & Console Warning Watermark
  if (cyberConfig.enableAntiDebugger) {
    try {
      console.clear();
      console.log(
        '%c🛑 PERINGATAN KEAMANAN SIBER!\\n%cMencuri source code, meretas, atau melakukan reverse engineering pada sistem ini dilarang keras dan dilindungi hukum.',
        'color: #ef4444; font-size: 24px; font-weight: 900; text-shadow: 2px 2px #000;',
        'color: #f59e0b; font-size: 14px; font-weight: bold; margin-top: 8px;'
      );
    } catch(err) {}

    setInterval(function() {
      try {
        var start = performance.now();
        (function antiDebug() {
          Function('debugger')();
        })();
        var end = performance.now();
        if (end - start > 100) {
          triggerCyberWarning("Developer Tools terdeteksi aktif! Mohon tutup debugger untuk melanjutkan.");
        }
      } catch(e) {}
    }, 1500);
  }
})();
</script>
<!-- ======================================================== -->
`;
}

