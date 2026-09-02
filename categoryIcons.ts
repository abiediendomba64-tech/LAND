/**
 * Uniform High-Resolution Vector & SVG Data-URI Icons for Gaming Categories
 * Guaranteed 100% uptime, zero external network dependency, immune to ISP blocking / adblockers.
 */

// Premium Luxury Gold Vector SVG Badges
function createGoldVectorSvg(iconSvgPath: string, badgeLabel?: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="goldBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2a2010" />
        <stop offset="50%" stop-color="#141824" />
        <stop offset="100%" stop-color="#0b0f17" />
      </linearGradient>
      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="35%" stop-color="#f59e0b" />
        <stop offset="70%" stop-color="#d97706" />
        <stop offset="100%" stop-color="#fbbf24" />
      </linearGradient>
      <linearGradient id="goldIcon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="25%" stop-color="#fef08a" />
        <stop offset="60%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#b45309" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <!-- Background Plate -->
    <rect x="5" y="5" width="90" height="90" rx="22" fill="url(#goldBg)" stroke="url(#goldBorder)" stroke-width="2.5" />
    <rect x="8" y="8" width="84" height="84" rx="19" fill="none" stroke="rgba(245, 158, 11, 0.2)" stroke-width="1" />
    <!-- Center Icon -->
    <g fill="url(#goldIcon)" filter="url(#glow)">
      ${iconSvgPath}
    </g>
    ${
      badgeLabel
        ? `<rect x="22" y="74" width="56" height="16" rx="8" fill="#d97706" stroke="#fef08a" stroke-width="0.8"/>
           <text x="50" y="85" fill="#000" font-size="8" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="0.5">${badgeLabel}</text>`
        : ''
    }
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Uniform 3D Neon Cyber Vector Badges
function createCyberVectorSvg(iconSvgPath: string, neonColor = '#06b6d4'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="cyberBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#cyberBg)" stroke="${neonColor}" stroke-width="2" />
    <g fill="${neonColor}">
      ${iconSvgPath}
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Icon Paths for Gaming Categories
const PATH_SLOTS = `<path d="M26 22h48a4 4 0 0 1 4 4v44a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4zm4 10a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V34a2 2 0 0 0-2-2H30zm15 0a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V34a2 2 0 0 0-2-2H45zm15 0a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V34a2 2 0 0 0-2-2H60zM35 40l-2 12h4l-2-12zm15 0l-2 12h4l-2-12zm15 0l-2 12h4l-2-12zM80 38h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v-14zM86 34a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />`;

const PATH_CASINO = `<path d="M50 20a30 30 0 1 0 30 30 30 30 0 0 0-30-30zm0 10a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm0 8a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm-3 8h6v8h-6zm-8-3l6 4-3 5-6-4zm16 0l3 5-6 4-3-5zm-11 16l3-5 5 3-3 5zm11 0l-3-5 5-3 3 5z" />`;

const PATH_LIVEGAMES = `<path d="M50 18a12 12 0 0 0-12 12c0 4.5 2.5 8.5 6.2 10.5L34 68h32l-10.2-27.5A12 12 0 0 0 50 18zm0 6a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm-18 8a22 22 0 0 0-8 17h6a16 16 0 0 1 6-12.5l-4-4.5zm36 0l-4 4.5A16 16 0 0 1 70 49h6a22 22 0 0 0-8-17zm-28 42h20l3 8H37l3-8z" />`;

const PATH_SPORTS = `<path d="M50 20a30 30 0 1 0 30 30 30 30 0 0 0-30-30zm-2 9.2l12 8.7-4.6 14.1H40.6L36 37.9zm-13.8 6.4l7.6 5.5-3.6 11.2-11.8-3.8A24 24 0 0 1 34.2 35.6zm31.6 0a24 24 0 0 1 7.8 12.9l-11.8 3.8-3.6-11.2zm-28.5 25.1l11.8 3.8 3.6 11.2a24 24 0 0 1-13.4-3.8zm25.4 0l-2 11.2a24 24 0 0 1-13.4 3.8l3.6-11.2z" />`;

const PATH_COCKFIGHT = `<path d="M42 22c-8 0-14 6-14 14 0 5 2.5 9.5 6.3 12.2L28 62h12l4-8 6 14h8l-6-20c5-3 8-8.5 8-14.5 0-7.7-6.3-13.7-14-13.7zm10 8a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm14 8l8 4-8 4v-8zm-32 4c-3 0-5.5-2-6-5 2.5.5 5 0 7-1.5-.3 3.5-1.5 6.5-1 6.5z" />`;

const PATH_FISH = `<path d="M68 34c-12-10-32-6-44 6 10 10 24 18 44 6l12 10V24L68 34zm-22 6a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm-14 8c4 3 9 5 14 5-5 4-10 6-14 7v-12zm38 2c-6 4-13 6-20 6 7 4 14 5 20 3v-9z" />`;

const PATH_LOTTERY = `<path d="M26 24h48a4 4 0 0 1 4 4v44a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4zm6 10v32h36V34H32zm6 6h24v6H38v-6zm0 10h16v6H38v-6zm0 10h20v4H38v-4z" />`;

const PATH_EGAMES = `<path d="M50 18l12 24 26 4-19 18 4 26-23-12-23 12 4-26-19-18 26-4 12-24zm0 14l-6 12-13 2 9.5 9-2.2 13 11.7-6 11.7 6-2.2-13 9.5-9-13-2-6-12z" />`;

const PATH_PROMO = `<path d="M26 34h48v10H26zm4 14h40v26a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V48zm16-24a6 6 0 0 0-6 6c0 4 6 8 6 8s6-4 6-8a6 6 0 0 0-6-6zm8 24h-8v26h8V48z" />`;

const PATH_SUPPORT = `<path d="M50 18a26 26 0 0 0-26 26v18a6 6 0 0 0 6 6h6V46h-6v-2a20 20 0 0 1 40 0v2h-6v22h6a6 6 0 0 0 6-6V44a26 26 0 0 0-26-26zm-8 44h8v6h-8z" />`;

export const UNIFORM_GOLD_ICONS = {
  slots: createGoldVectorSvg(PATH_SLOTS, 'SLOT 777'),
  casino: createGoldVectorSvg(PATH_CASINO, 'CASINO'),
  livegames: createGoldVectorSvg(PATH_LIVEGAMES, 'LIVE'),
  sports: createGoldVectorSvg(PATH_SPORTS, 'SPORT'),
  cockfight: createGoldVectorSvg(PATH_COCKFIGHT, 'SV388'),
  fish: createGoldVectorSvg(PATH_FISH, 'TEMBAK'),
  lottery: createGoldVectorSvg(PATH_LOTTERY, 'TOGEL 4D'),
  egames: createGoldVectorSvg(PATH_EGAMES, 'ARCADE'),
  promo: createGoldVectorSvg(PATH_PROMO, 'BONUS'),
  support: createGoldVectorSvg(PATH_SUPPORT, 'CS 24H'),
};

export const UNIFORM_CYBER_ICONS = {
  slots: createCyberVectorSvg(PATH_SLOTS, '#06b6d4'),
  casino: createCyberVectorSvg(PATH_CASINO, '#3b82f6'),
  livegames: createCyberVectorSvg(PATH_LIVEGAMES, '#ec4899'),
  sports: createCyberVectorSvg(PATH_SPORTS, '#10b981'),
  cockfight: createCyberVectorSvg(PATH_COCKFIGHT, '#f59e0b'),
  fish: createCyberVectorSvg(PATH_FISH, '#06b6d4'),
  lottery: createCyberVectorSvg(PATH_LOTTERY, '#a855f7'),
  egames: createCyberVectorSvg(PATH_EGAMES, '#eab308'),
  promo: createCyberVectorSvg(PATH_PROMO, '#ef4444'),
  support: createCyberVectorSvg(PATH_SUPPORT, '#14b8a6'),
};
