const MAX_HTML_BYTES = 5 * 1024 * 1024;
const MAX_ASSETS = 500;
const TIMEOUT_MS = 15000;

function json(body, status = 200) {
  return {
    statusCode: status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    body: JSON.stringify(body),
  };
}

function isPrivateIPv4(hostname) {
  const m = hostname.match(/^\d{1,3}(?:\.\d{1,3}){3}$/);
  if (!m) return false;
  const p = hostname.split('.').map(Number);
  if (p.some(n => n > 255)) return true;
  return p[0] === 10 || p[0] === 127 || p[0] === 0 ||
    (p[0] === 172 && p[1] >= 16 && p[1] <= 31) ||
    (p[0] === 192 && p[1] === 168) ||
    (p[0] === 169 && p[1] === 254);
}

function assertPublicHttpUrl(value) {
  const u = new URL(value);
  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('URL harus menggunakan http atau https.');
  const h = u.hostname.toLowerCase();
  if (h === 'localhost' || h === '::1' || h.endsWith('.localhost') || isPrivateIPv4(h)) {
    throw new Error('Alamat lokal/private tidak diizinkan.');
  }
  return u;
}

function addUrl(set, value, base) {
  if (!value) return;
  const raw = value.trim().replace(/^['"]|['"]$/g, '');
  if (!raw || raw.startsWith('data:') || raw.startsWith('javascript:') || raw.startsWith('#')) return;
  try {
    const u = new URL(raw, base);
    if (u.protocol === 'http:' || u.protocol === 'https:') set.add(u.href);
  } catch {}
}

export default async function handler(event) {
  if (event.httpMethod !== 'POST') return json({ success: false, error: 'Method not allowed' }, 405);

  try {
    const body = JSON.parse(event.body || '{}');
    const targetUrl = body.url || body.targetUrl;
    if (!targetUrl) return json({ success: false, error: 'URL wajib diisi.' }, 400);

    const target = assertPublicHttpUrl(targetUrl);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response;
    try {
      response = await fetch(target.href, {
        signal: controller.signal,
        redirect: 'follow',
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; AssetFetcher/1.0)', accept: 'text/html,application/xhtml+xml' },
      });
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) throw new Error(`Target mengembalikan HTTP ${response.status}.`);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html') && !type.includes('application/xhtml+xml')) throw new Error('URL target bukan HTML.');

    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength > MAX_HTML_BYTES) throw new Error('Halaman terlalu besar.');

    const html = await response.text();
    if (new TextEncoder().encode(html).byteLength > MAX_HTML_BYTES) throw new Error('Halaman terlalu besar.');

    const assets = new Set();
    let m;
    const attr = /(?:src|href|poster|data-src|data-lazy-src)\s*=\s*["']([^"']+)["']/gi;
    while ((m = attr.exec(html)) && assets.size < MAX_ASSETS) addUrl(assets, m[1], response.url || target.href);

    const srcset = /(?:srcset|data-srcset)\s*=\s*["']([^"']+)["']/gi;
    while ((m = srcset.exec(html)) && assets.size < MAX_ASSETS) {
      m[1].split(',').forEach(item => addUrl(assets, item.trim().split(/\s+/)[0], response.url || target.href));
    }

    const css = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
    while ((m = css.exec(html)) && assets.size < MAX_ASSETS) addUrl(assets, m[1], response.url || target.href);

    return json({ success: true, source: response.url || target.href, count: assets.size, assets: [...assets] });
  } catch (error) {
    return json({ success: false, error: error?.name === 'AbortError' ? 'Request timeout.' : (error?.message || 'Gagal mengambil assets.') }, 500);
  }
}
