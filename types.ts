export type ActiveTab =
  | 'amp'
  | 'portal'
  | 'register'
  | 'safelink'
  | 'page1-seo'
  | 'flow-router'
  | 'content-promo'
  | 'schema-studio'
  | 'error-audit'
  | 'ads-checker'
  | 'cdn-scripts'
  | 'cyber-shield'
  | 'drive';

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';

export interface CyberShieldConfig {
  enabled: boolean;
  blockRightClick: boolean;
  blockCtrlU: boolean;
  blockDevInspect: boolean; // F12, Ctrl+Shift+I/J/C, Cmd+Opt+I/J/C
  blockTextCopy: boolean; // Ctrl+C, Ctrl+A, Ctrl+X, selectstart, copy
  blockSaveAndPrint: boolean; // Ctrl+S, Ctrl+P
  enableAntiDebugger: boolean;
  enableSoundAlert: boolean;
  blockCyberPatrolBots?: boolean; // Anti-Surveillance / Security Scanners / Headless Bots
  enableAntiBotCloak?: boolean; // Serve clean tech article disguise to scrapers
  noIndexTransitPages?: boolean; // Set noindex, nofollow on SafeLink & Register bridges
  enforceSearchSafeRel?: boolean; // Force rel="nofollow noopener noreferrer sponsored"
  warningTitle: string;
  warningMessage: string;
  badgeText: string;
  autoCloseTimeout: number; // in seconds, 0 for manual close only
}

export interface PageDomainFlowConfig {
  // Dedicated canonical domains for each page
  ampDomain: string; // e.g. https://amp-official.pages.dev/
  portalDomain: string; // e.g. https://portal-resmi.hub.net/
  registerDomain: string; // e.g. https://vip-daftar.secure-reg.com/
  safelinkDomain: string; // e.g. https://verify-cloud.linkshield.info/
  
  // Pipeline strategy
  flowPipeline: 'amp-safelink-portal-register' | 'amp-portal-register' | 'amp-safelink-register' | 'custom-routing';
  
  // Explicit button router targets
  ampPrimaryTarget: 'portal' | 'register' | 'safelink' | 'external';
  ampSecondaryTarget: 'portal' | 'register' | 'safelink' | 'external';
  ampLiveChatTarget: 'livechat' | 'safelink' | 'portal';
  portalPrimaryTarget: 'register' | 'safelink' | 'external';
  portalSecondaryTarget: 'login' | 'safelink' | 'register';
  portalGameCardsTarget: 'safelink' | 'register' | 'external';
  safelinkTarget: 'register' | 'portal' | 'external';
  registerSuccessTarget: 'external' | 'portal';
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
}

export interface CarouselBanner {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  title?: string;
  badge?: string;
}

export type AmpTemplatePreset =
  | 'standard'
  | 'rtp-zenvia'
  | 'beton-cyber'
  | 'toto-red'
  | 'nagabet-galaxy'
  | 'toto-carousel'
  | 'demo-grid';

export interface AmpConfig {
  templatePreset?: AmpTemplatePreset;
  title: string;
  brandName: string;
  tagline: string;
  logoUrl: string;
  bannerGifUrl: string;
  enableCarousel?: boolean;
  carouselBanners?: CarouselBanner[];
  carouselInterval?: number; // in seconds
  runningText: string;
  runningTextSpeed: number; // in seconds
  runningTextBg: string;
  runningTextColor: string;
  canonicalUrl: string;
  targetUrl: string;
  themeColor: string;
  accentColor: string;
  bgColor: string;
  metaDescription: string;
  keywords: string;
  seoHeading: string;
  seoParagraph: string;
  features: Array<{ icon: string; title: string; desc: string }>;
  ctaText: string;
  ctaSubtext: string;
  ctaSecondaryText: string;
  ctaSecondaryUrl: string;
  liveChatUrl?: string;
  altUrl?: string;
  rating?: string;
  minDeposit?: string;
  minWithdraw?: string;
  rtpRate?: string;
  bonusText?: string;
  depositMethods?: string;
  minBet?: string;
  enableStructuredData: boolean;
  structuredDataType: 'WebPage' | 'Article' | 'SoftwareApplication' | 'Product';
  additionalMeta: string;
  cyberShield?: CyberShieldConfig;
  rtpGimmick?: RtpGimmickConfig;
  responsibleLegal?: ResponsibleLegalConfig;
}

export interface GameDemoItem {
  id: string;
  name: string;
  provider: string;
  category: string;
  iconUrl: string;
  demoUrl: string;
  realPlayUrl?: string;
  rtpPercent: number;
  volatility: 'Low' | 'Medium' | 'High' | 'Extreme';
  jamGacor: string;
  polaSpin: string;
  hot?: boolean;
  maxwinX?: string;
}

export interface RtpGimmickConfig {
  enabled: boolean;
  enableLiveFluctuation: boolean;
  updateIntervalSeconds: number;
  showPolaGacor: boolean;
  showJamGacor: boolean;
  showDemoModal: boolean;
  headline: string;
  subheadline: string;
  demoGames: GameDemoItem[];
}

export interface ResponsibleLegalConfig {
  enableAgeGate: boolean;
  ageLimitText: string;
  modalTitle: string;
  disclaimerText: string;
  nonCoerciveBadge: boolean;
  allowVoluntaryDismiss: boolean;
  complianceBadges: Array<'18+' | 'responsible-gaming' | 'bmm-testlabs' | 'gli-certified' | 'ssl-secure'>;
}

export interface PortalConfig {
  siteName: string;
  slogan: string;
  logoUrl: string;
  heroBannerUrl: string;
  enableBannerCarousel?: boolean;
  carouselBanners?: CarouselBanner[];
  carouselAutoPlay?: boolean;
  carouselInterval?: number; // in seconds
  announcementText: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  themePreset: 'neon-dark' | 'gold-luxury' | 'cyber-blue' | 'emerald-vip';
  gamesOrServices: Array<{
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    linkUrl: string;
    badge?: string;
    hot?: boolean;
  }>;
  showJackpotTicker: boolean;
  jackpotAmount: string;
  jackpotPrefix: string;
  showFloatingContact: boolean;
  whatsappNumber: string;
  telegramUsername: string;
  liveChatUrl: string;
  footerText: string;
  cyberShield?: CyberShieldConfig;
  rtpGimmick?: RtpGimmickConfig;
  responsibleLegal?: ResponsibleLegalConfig;
}

export interface RegisterConfig {
  pageTitle: string;
  brandName: string;
  logoUrl: string;
  formHeadline: string;
  formSubheadline: string;
  successRedirectUrl: string;
  themeColor: string;
  requireReferralCode: boolean;
  defaultReferral: string;
  paymentMethods: string[];
  fields: Array<{
    id: string;
    label: string;
    type: 'text' | 'tel' | 'email' | 'password' | 'select';
    placeholder: string;
    required: boolean;
    options?: string[];
  }>;
  vipPerks: string[];
  whatsappNotifyNumber: string;
  whatsappMessageTemplate: string;
  cyberShield?: CyberShieldConfig;
}

export interface SafeLinkConfig {
  title: string;
  brandName: string;
  destinationUrl: string;
  countdownSeconds: number;
  bannerImageUrl: string;
  pageHeaderTitle: string;
  pageSubtitle: string;
  securityNoticeText: string;
  enableCaptchaSimulation: boolean;
  buttonInitialText: string;
  buttonReadyText: string;
  separatedJsonLd: {
    schemaType: 'Article' | 'NewsArticle' | 'TechArticle' | 'SoftwareApplication';
    headline: string;
    author: string;
    publisher: string;
    datePublished: string;
    dateModified: string;
    description: string;
    keywords: string;
  };
  cyberShield?: CyberShieldConfig;
}

export interface DynamicScript {
  id: string;
  name: string;
  type: 'gtm' | 'ga4' | 'facebook' | 'tiktok' | 'histats' | 'custom';
  enabled: boolean;
  codeOrId: string;
  position: 'head' | 'body-start' | 'body-end';
}

export interface CdnScriptConfig {
  scripts: DynamicScript[];
  cdnImages: Array<{
    id: string;
    originalUrl: string;
    provider: 'statically' | 'jsdelivr' | 'weserv' | 'direct';
    optimizedUrl: string;
    width?: number;
    height?: number;
    format?: 'webp' | 'png' | 'jpg';
  }>;
}

export interface AppState {
  amp: AmpConfig;
  portal: PortalConfig;
  register: RegisterConfig;
  safelink: SafeLinkConfig;
  cdnScripts: CdnScriptConfig;
}
