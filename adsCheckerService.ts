export interface AdUnitConfig {
  id: string;
  name: string;
  network: 'adsense' | 'admanager' | 'propeller' | 'popads' | 'custom-banner' | 'sticky-bottom';
  enabled: boolean;
  position: 'top-banner' | 'middle-content' | 'bottom-sticky' | 'sidebar' | 'interstitial';
  adClient?: string; // ca-pub-xxx
  adSlot?: string; // 123456789
  width: number;
  height: number;
  bannerImgUrl?: string;
  targetLink?: string;
  altText?: string;
  responsive: boolean;
}

export interface AdsAuditReport {
  score: number; // 0 - 100
  totalAdUnits: number;
  enabledAdUnits: number;
  adDensitySafe: boolean; // Not exceeding 30% screen height
  hasCtaCollision: boolean; // Whether ad covers primary buttons
  ampAdScriptIncluded: boolean;
  cloakingPolicySafe: boolean;
  recommendations: string[];
}

export const DEFAULT_AD_UNITS: AdUnitConfig[] = [
  {
    id: 'ad-top-header',
    name: 'Top Header Banner (728x90 / Responsive)',
    network: 'custom-banner',
    enabled: false,
    position: 'top-banner',
    width: 728,
    height: 90,
    bannerImgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=728&h=90&fit=crop',
    targetLink: 'https://rebrand.ly/DAFTAR-BIGCAT',
    altText: 'Sponsor Resmi VIP Slot',
    responsive: true,
  },
  {
    id: 'ad-sticky-footer',
    name: 'Floating Sticky Bottom Bar Ad (320x50)',
    network: 'sticky-bottom',
    enabled: true,
    position: 'bottom-sticky',
    width: 320,
    height: 50,
    bannerImgUrl: '',
    targetLink: 'https://rebrand.ly/DAFTAR-BIGCAT',
    altText: 'Klaim Bonus Ekstra 100%',
    responsive: true,
  },
  {
    id: 'ad-adsense-native',
    name: 'Google AdSense AMP Unit (300x250)',
    network: 'adsense',
    enabled: false,
    position: 'middle-content',
    adClient: 'ca-pub-1234567890123456',
    adSlot: '9876543210',
    width: 300,
    height: 250,
    responsive: true,
  },
];

export function auditAdsCompliance(
  adUnits: AdUnitConfig[],
  pageType: 'amp' | 'portal' | 'safelink'
): AdsAuditReport {
  const activeAds = adUnits.filter((a) => a.enabled);
  const recommendations: string[] = [];

  let score = 100;
  let hasCtaCollision = false;

  // Check ad density
  const adDensitySafe = activeAds.length <= 3;
  if (!adDensitySafe) {
    score -= 25;
    recommendations.push('Jumlah unit iklan melebihi 3 per halaman. Disarankan maksimal 2-3 unit iklan agar loading tetap secepat kilat dan tidak mengganggu user.');
  }

  // Check sticky collision
  const stickyAds = activeAds.filter((a) => a.position === 'bottom-sticky');
  if (stickyAds.length > 1) {
    hasCtaCollision = true;
    score -= 30;
    recommendations.push('Ditemukan lebih dari satu unit iklan Sticky Bottom. Ini dapat menutupi tombol navigasi utama (Daftar & Login).');
  }

  // AMP Ads script check
  const hasAdSenseOrNetwork = activeAds.some((a) => a.network === 'adsense' || a.network === 'admanager');
  const ampAdScriptIncluded = hasAdSenseOrNetwork;

  if (pageType === 'amp' && hasAdSenseOrNetwork) {
    recommendations.push('Pastikan menyertakan script <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script> di dalam <head>.');
  }

  // SafeLink cloaking / policy check
  const cloakingPolicySafe = pageType !== 'safelink' || activeAds.length <= 2;
  if (!cloakingPolicySafe) {
    score -= 20;
    recommendations.push('Untuk halaman SafeLink, batasi penempatan iklan agar tidak memicu deteksi misleading navigation oleh Google Safe Browsing.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Struktur iklan dan tata letak banner telah memenuhi standar Google AdSense Policy & AMP Ads Performance.');
  }

  return {
    score: Math.max(0, score),
    totalAdUnits: adUnits.length,
    enabledAdUnits: activeAds.length,
    adDensitySafe,
    hasCtaCollision,
    ampAdScriptIncluded,
    cloakingPolicySafe,
    recommendations,
  };
}

export function generateAmpAdSnippet(ad: AdUnitConfig): string {
  if (ad.network === 'adsense') {
    return `<amp-ad width="${ad.width}" height="${ad.height}"
  type="adsense"
  data-ad-client="${ad.adClient || 'ca-pub-XXXXXXXXXXXXXXXX'}"
  data-ad-slot="${ad.adSlot || 'XXXXXXXXXX'}"
  ${ad.responsive ? 'layout="responsive"' : 'layout="fixed"'}>
</amp-ad>`;
  }

  if (ad.network === 'admanager') {
    return `<amp-ad width="${ad.width}" height="${ad.height}"
  type="doubleclick"
  data-slot="${ad.adSlot || '/1234567/sports'}"
  ${ad.responsive ? 'layout="responsive"' : 'layout="fixed"'}>
</amp-ad>`;
  }

  // Custom Banner / Affiliate Banner
  return `<div class="ad-container my-3 text-center">
  <a href="${ad.targetLink || '#'}" target="_blank" rel="noopener noreferrer nofollow">
    <amp-img src="${ad.bannerImgUrl || 'https://via.placeholder.com/728x90'}" 
      width="${ad.width}" 
      height="${ad.height}" 
      layout="${ad.responsive ? 'responsive' : 'fixed'}" 
      alt="${ad.altText || 'Sponsor Iklan'}">
    </amp-img>
  </a>
</div>`;
}
