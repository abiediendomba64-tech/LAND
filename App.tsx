import React, { useState, useEffect, useRef } from 'react';
import type {
  ActiveTab,
  ViewportMode,
  UserProfile,
  AmpConfig,
  PortalConfig,
  RegisterConfig,
  SafeLinkConfig,
  CdnScriptConfig,
  CyberShieldConfig,
} from './types';
import { initAuth, googleSignIn, logout, getAccessToken } from './services/auth';
import {
  generateAmpHtml,
  generatePortalHtml,
  generateVipRegisterHtml,
  generateSafeLinkHtml,
} from './services/generator';
import { uploadFileToDrive } from './services/drive';
import { defaultCyberShieldConfig, generateCyberShieldScript } from './utils/cyberShield';
import { Header } from './components/Header';
import { AmpGenerator } from './components/AmpGenerator';
import { PortalGenerator } from './components/PortalGenerator';
import { VipRegisterGenerator } from './components/VipRegisterGenerator';
import { SafeLinkGenerator } from './components/SafeLinkGenerator';
import { CdnScriptStudio } from './components/CdnScriptStudio';
import { CyberShieldStudio } from './components/CyberShieldStudio';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { CodePreviewModal } from './components/CodePreviewModal';
import { DeployModal } from './components/DeployModal';
import { GlobalBrandSyncBar, BrandPresetItem } from './components/GlobalBrandSyncBar';
import { ContentPromoStudio } from './components/ContentPromoStudio';
import { SchemaStudio } from './components/SchemaStudio';
import { ErrorBugAnalyzerStudio } from './components/ErrorBugAnalyzerStudio';
import { AdsCheckerStudio } from './components/AdsCheckerStudio';
import { Page1Rank1Studio } from './components/Page1Rank1Studio';
import { TemplateUploadModal } from './components/TemplateUploadModal';
import { applyParsedToAmpConfig, applyParsedToPortalConfig, ParsedTemplateResult } from './utils/templateParser';
import { GeneratedArticle, PromoItem } from './services/contentPromoService';
import { getAllCategoryGames, getSummaryCategories } from './data/categoryGamesData';

const initialAmpConfig: AmpConfig = {
  title: 'VIP Gaming Official - Daftar & Mainkan Sekarang',
  brandName: 'VIP OFFICIAL 77',
  tagline: 'Platform Resmi Hiburan Digital Terpercaya #1 di Asia',
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=360&auto=format&fit=crop&q=80',
  bannerGifUrl: 'https://files.sitestatic.xyz/banners/banner_1787668088_6a8da6786ff9b.webp',
  enableCarousel: true,
  carouselInterval: 4,
  carouselBanners: [
    {
      id: 'banner-1',
      imageUrl: 'https://files.sitestatic.xyz/banners/banner_1787668088_6a8da6786ff9b.webp',
      title: 'Promo Spesial VIP Bonus Maxwin',
      linkUrl: 'https://vip-official.pages.dev/register',
      badge: 'HOT EVENT',
    },
    {
      id: 'banner-2',
      imageUrl: 'https://files.sitestatic.xyz/banners/banner_1787668078_6a8da66eaca85.webp',
      title: 'Turnamen Mingguan Grand Prize',
      linkUrl: 'https://vip-official.pages.dev/register',
      badge: 'EXCLUSIVE',
    },
  ],
  runningText: '🔥 EVENT SPESIAL VIP BONUS 100% NEW MEMBER • DEPOSIT PROSES KILAT 30 DETIK • CS 24 JAM ONLINE RESPON CEPAT 🔥',
  runningTextSpeed: 12,
  runningTextBg: '#b45309',
  runningTextColor: '#ffffff',
  canonicalUrl: 'https://vip-official.pages.dev/amp',
  targetUrl: 'https://vip-official.pages.dev/register',
  themeColor: '#f59e0b',
  accentColor: '#eab308',
  bgColor: '#0b0f17',
  metaDescription: 'Portal resmi pendaftaran VIP dengan server berkecepatan tinggi, integrasi Google AMP valid, dan lisensi resmi terverifikasi.',
  keywords: 'vip gaming, link resmi, daftar akun vip, amp slot, slot gacor, jackpot maxwin',
  seoHeading: 'Keunggulan Menggunakan Landing Page Google AMP Resmi',
  seoParagraph: 'Landing page ini dioptimalkan secara ketat sesuai spesifikasi resmi Google AMP™ (Accelerated Mobile Pages). Memuat secepat kilat dengan konsumsi data minim, menjamin pengalaman pengguna bebas buffering serta peningkatan peringkat SEO di mesin pencari Google.',
  features: [
    { icon: '⚡', title: 'Server Kilat AMP', desc: 'Load time di bawah 0.8 detik' },
    { icon: '🛡️', title: 'Lisensi Resmi', desc: 'Keamanan data terenkripsi SSL 256' },
    { icon: '💳', title: 'Deposit Multi-Bank', desc: 'BCA, Mandiri, BRI, QRIS & E-Wallet' },
    { icon: '👑', title: 'Prioritas VIP', desc: 'Layanan CS WhatsApp 24 Jam' },
  ],
  ctaText: '⚡ DAFTAR AKUN VIP SEKARANG',
  ctaSubtext: 'Akses Instan & Bonus Selamat Datang Menanti Anda',
  ctaSecondaryText: 'MASUK / LOGIN RESMI',
  ctaSecondaryUrl: 'https://vip-official.pages.dev/login',
  enableStructuredData: true,
  structuredDataType: 'WebPage',
  additionalMeta: '',
};

const initialPortalConfig: PortalConfig = {
  siteName: 'VIP OFFICIAL HUB',
  slogan: 'One-Stop Official Entertainment Gateway',
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=360&auto=format&fit=crop&q=80',
  heroBannerUrl: 'https://files.sitestatic.xyz/banners/banner_1787668088_6a8da6786ff9b.webp',
  enableBannerCarousel: true,
  carouselAutoPlay: true,
  carouselInterval: 4,
  carouselBanners: [
    {
      id: 'banner-1',
      imageUrl: 'https://files.sitestatic.xyz/banners/banner_1787668088_6a8da6786ff9b.webp',
      title: 'Grand Tournament & Mega Jackpot',
      linkUrl: 'https://vip-official.pages.dev/register',
      badge: 'HOT EVENT',
    },
    {
      id: 'banner-2',
      imageUrl: 'https://files.sitestatic.xyz/banners/banner_1787668078_6a8da66eaca85.webp',
      title: 'Bonus Garansi Kekalahan 100%',
      linkUrl: 'https://vip-official.pages.dev/register',
      badge: 'PROMO VIP',
    },
  ],
  announcementText: 'SELAMAT DATANG DI PORTAL UTAMA RESMI • NIKMATI TRANSAKSI INSTAN VIA QRIS ALL PAYMENT & WITHDRAW TANPA LIMIT TIAP HARI!',
  primaryCtaText: 'DAFTAR VIP',
  primaryCtaUrl: 'https://vip-official.pages.dev/register',
  secondaryCtaText: 'LOGIN',
  secondaryCtaUrl: 'https://vip-official.pages.dev/login',
  themePreset: 'gold-luxury',
  gamesOrServices: getSummaryCategories(),
  showJackpotTicker: true,
  jackpotAmount: '1.482.905.750',
  jackpotPrefix: 'IDR',
  showFloatingContact: true,
  whatsappNumber: '6281288889999',
  telegramUsername: 'vipofficial_admin',
  liveChatUrl: 'https://tawk.to',
  footerText: 'Pusat Layanan dan Komunikasi Resmi VIP Hub Indonesia.',
};

const initialRegisterConfig: RegisterConfig = {
  pageTitle: 'Pendaftaran Akun VIP Resmi',
  brandName: 'VIP OFFICIAL 77',
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=360&auto=format&fit=crop&q=80',
  formHeadline: 'REGISTRASI VIP MEMBER',
  formSubheadline: 'Dapatkan Akses Penuh ke Semua Layanan dan Bonus Eksklusif',
  successRedirectUrl: 'https://vip-official.pages.dev/welcome',
  themeColor: '#f59e0b',
  requireReferralCode: true,
  defaultReferral: 'VIPMAX77',
  paymentMethods: ['BCA', 'MANDIRI', 'BRI', 'BNI', 'DANA', 'QRIS'],
  fields: [
    {
      id: 'username',
      label: 'Nama Pengguna (Username)',
      type: 'text',
      placeholder: 'Minimal 6 karakter alfanumerik',
      required: true,
    },
    {
      id: 'password',
      label: 'Kata Sandi (Password)',
      type: 'password',
      placeholder: 'Gunakan kombinasi huruf & angka',
      required: true,
    },
    {
      id: 'whatsapp',
      label: 'Nomor WhatsApp Aktif',
      type: 'tel',
      placeholder: '081234567890',
      required: true,
    },
    {
      id: 'email',
      label: 'Alamat Email',
      type: 'email',
      placeholder: 'emailanda@gmail.com',
      required: true,
    },
  ],
  vipPerks: [
    'Bonus Deposit 100%',
    'Garansi Rungkad 100%',
    'Layanan CS Prioritas 24/7',
    'Bebas Biaya Transaksi',
  ],
  whatsappNotifyNumber: '6281288889999',
  whatsappMessageTemplate: 'Halo Admin, saya baru saja mendaftar VIP',
};

const initialSafeLinkConfig: SafeLinkConfig = {
  title: 'Mengalihkan ke Server Aman - SafeLink Shield',
  brandName: 'VIP OFFICIAL',
  destinationUrl: 'https://vip-official.pages.dev',
  countdownSeconds: 5,
  bannerImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
  pageHeaderTitle: 'Verifikasi Keamanan Gateway Tautan',
  pageSubtitle: 'Sistem sedang memverifikasi koneksi enkripsi SSL dan sertifikasi perlindungan bot...',
  securityNoticeText: 'Tautan ini dilindungi dengan enkripsi SHA-256 end-to-end. Pastikan alamat URL di bilah peramban Anda sesuai sebelum melanjutkan.',
  enableCaptchaSimulation: true,
  buttonInitialText: 'Sedang Memeriksa Sambungan...',
  buttonReadyText: 'LANJUT KE SITUS TUJUAN (KLIK DISINI)',
  separatedJsonLd: {
    schemaType: 'Article',
    headline: 'Panduan Akses Aman Server Digital Berkecepatan Tinggi',
    author: 'Cyber Security Analyst',
    publisher: 'Nexus Security Shield Group',
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    description: 'Dokumentasi teknis perlindungan gateway safe link dan panduan integrasi sistem pengalihan berkecepatan tinggi.',
    keywords: 'safelink, pengarah aman, redirect link, google amp, seo boost',
  },
};

const initialCdnScriptConfig: CdnScriptConfig = {
  scripts: [
    {
      id: 'script-gtm',
      name: 'Google Tag Manager (GTM)',
      type: 'gtm',
      enabled: false,
      codeOrId: 'GTM-XXXXXXX',
      position: 'head',
    },
    {
      id: 'script-fb',
      name: 'Meta / Facebook Pixel',
      type: 'facebook',
      enabled: false,
      codeOrId: '123456789012345',
      position: 'head',
    },
    {
      id: 'script-ga4',
      name: 'Google Analytics 4 (GA4)',
      type: 'ga4',
      enabled: false,
      codeOrId: 'G-XXXXXXXXXX',
      position: 'head',
    },
    {
      id: 'script-tiktok',
      name: 'TikTok Pixel',
      type: 'tiktok',
      enabled: false,
      codeOrId: 'CXXXXXXXXXXXXXX',
      position: 'head',
    },
  ],
  cdnImages: [],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('amp');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile');

  // App configurations
  const [ampConfig, setAmpConfig] = useState<AmpConfig>(initialAmpConfig);
  const [portalConfig, setPortalConfig] = useState<PortalConfig>(initialPortalConfig);
  const [registerConfig, setRegisterConfig] = useState<RegisterConfig>(initialRegisterConfig);
  const [safelinkConfig, setSafelinkConfig] = useState<SafeLinkConfig>(initialSafeLinkConfig);
  const [cdnScripts, setCdnScripts] = useState<CdnScriptConfig>(initialCdnScriptConfig);
  const [cyberShieldConfig, setCyberShieldConfig] = useState<CyberShieldConfig>(() => {
    try {
      const saved = localStorage.getItem('suite_cyber_shield');
      return saved ? JSON.parse(saved) : defaultCyberShieldConfig;
    } catch (e) {
      return defaultCyberShieldConfig;
    }
  });

  const handleUpdateCyberShield = (newConfig: CyberShieldConfig) => {
    setCyberShieldConfig(newConfig);
    try {
      localStorage.setItem('suite_cyber_shield', JSON.stringify(newConfig));
    } catch (e) {}
  };

  // Auto-Sync Brand & Links State (Default ON)
  const [autoSyncBrandAssets, setAutoSyncBrandAssets] = useState<boolean>(() => {
    const saved = localStorage.getItem('suite_autosync_brand');
    return saved !== null ? saved === 'true' : true;
  });

  const handleToggleAutoSync = () => {
    setAutoSyncBrandAssets((prev) => {
      const next = !prev;
      localStorage.setItem('suite_autosync_brand', String(next));
      return next;
    });
  };

  const handleUpdateAmpConfig = (newAmp: AmpConfig) => {
    if (autoSyncBrandAssets) {
      if (newAmp.logoUrl !== ampConfig.logoUrl) {
        setPortalConfig((p) => ({ ...p, logoUrl: newAmp.logoUrl }));
        setRegisterConfig((r) => ({ ...r, logoUrl: newAmp.logoUrl }));
      }
      if (newAmp.brandName !== ampConfig.brandName) {
        setPortalConfig((p) => ({ ...p, siteName: newAmp.brandName }));
        setRegisterConfig((r) => ({ ...r, brandName: newAmp.brandName }));
        setSafelinkConfig((s) => ({ ...s, brandName: newAmp.brandName }));
      }
      if (newAmp.bannerGifUrl !== ampConfig.bannerGifUrl) {
        setPortalConfig((p) => ({ ...p, heroBannerUrl: newAmp.bannerGifUrl }));
        setSafelinkConfig((s) => ({ ...s, bannerImageUrl: newAmp.bannerGifUrl }));
      }
      if (JSON.stringify(newAmp.carouselBanners) !== JSON.stringify(ampConfig.carouselBanners)) {
        setPortalConfig((p) => ({ ...p, carouselBanners: newAmp.carouselBanners }));
      }
      if (newAmp.targetUrl !== ampConfig.targetUrl) {
        setPortalConfig((p) => ({ ...p, primaryCtaUrl: newAmp.targetUrl }));
        setSafelinkConfig((s) => ({ ...s, destinationUrl: newAmp.targetUrl }));
      }
      if (newAmp.ctaSecondaryUrl !== ampConfig.ctaSecondaryUrl) {
        setPortalConfig((p) => ({ ...p, secondaryCtaUrl: newAmp.ctaSecondaryUrl || '' }));
      }
    }
    setAmpConfig(newAmp);
  };

  const handleUpdatePortalConfig = (newPortal: PortalConfig) => {
    if (autoSyncBrandAssets) {
      if (newPortal.logoUrl !== portalConfig.logoUrl) {
        setAmpConfig((a) => ({ ...a, logoUrl: newPortal.logoUrl }));
        setRegisterConfig((r) => ({ ...r, logoUrl: newPortal.logoUrl }));
      }
      if (newPortal.siteName !== portalConfig.siteName) {
        setAmpConfig((a) => ({ ...a, brandName: newPortal.siteName }));
        setRegisterConfig((r) => ({ ...r, brandName: newPortal.siteName }));
        setSafelinkConfig((s) => ({ ...s, brandName: newPortal.siteName }));
      }
      if (newPortal.heroBannerUrl !== portalConfig.heroBannerUrl) {
        setAmpConfig((a) => ({ ...a, bannerGifUrl: newPortal.heroBannerUrl }));
        setSafelinkConfig((s) => ({ ...s, bannerImageUrl: newPortal.heroBannerUrl }));
      }
      if (JSON.stringify(newPortal.carouselBanners) !== JSON.stringify(portalConfig.carouselBanners)) {
        setAmpConfig((a) => ({ ...a, carouselBanners: newPortal.carouselBanners }));
      }
      if (newPortal.primaryCtaUrl !== portalConfig.primaryCtaUrl) {
        setAmpConfig((a) => ({ ...a, targetUrl: newPortal.primaryCtaUrl }));
        setSafelinkConfig((s) => ({ ...s, destinationUrl: newPortal.primaryCtaUrl }));
      }
      if (newPortal.secondaryCtaUrl !== portalConfig.secondaryCtaUrl) {
        setAmpConfig((a) => ({ ...a, ctaSecondaryUrl: newPortal.secondaryCtaUrl }));
      }
    }
    setPortalConfig(newPortal);
  };

  const handleUpdateRegisterConfig = (newReg: RegisterConfig) => {
    if (autoSyncBrandAssets) {
      if (newReg.logoUrl !== registerConfig.logoUrl) {
        setAmpConfig((a) => ({ ...a, logoUrl: newReg.logoUrl }));
        setPortalConfig((p) => ({ ...p, logoUrl: newReg.logoUrl }));
      }
      if (newReg.brandName !== registerConfig.brandName) {
        setAmpConfig((a) => ({ ...a, brandName: newReg.brandName }));
        setPortalConfig((p) => ({ ...p, siteName: newReg.brandName }));
        setSafelinkConfig((s) => ({ ...s, brandName: newReg.brandName }));
      }
    }
    setRegisterConfig(newReg);
  };

  const handleUpdateSafeLinkConfig = (newSafe: SafeLinkConfig) => {
    if (autoSyncBrandAssets) {
      if (newSafe.brandName !== safelinkConfig.brandName) {
        setAmpConfig((a) => ({ ...a, brandName: newSafe.brandName }));
        setPortalConfig((p) => ({ ...p, siteName: newSafe.brandName }));
        setRegisterConfig((r) => ({ ...r, brandName: newSafe.brandName }));
      }
      if (newSafe.destinationUrl !== safelinkConfig.destinationUrl) {
        setAmpConfig((a) => ({ ...a, targetUrl: newSafe.destinationUrl }));
        setPortalConfig((p) => ({ ...p, primaryCtaUrl: newSafe.destinationUrl }));
      }
    }
    setSafelinkConfig(newSafe);
  };

  const handleManualSyncAll = () => {
    const masterLogo = ampConfig.logoUrl || portalConfig.logoUrl || registerConfig.logoUrl;
    const masterBrand = ampConfig.brandName || portalConfig.siteName || registerConfig.brandName;
    const masterBanner = ampConfig.bannerGifUrl || portalConfig.heroBannerUrl;
    const masterRegisterUrl = ampConfig.targetUrl || portalConfig.primaryCtaUrl;
    const masterLoginUrl = ampConfig.ctaSecondaryUrl || portalConfig.secondaryCtaUrl;
    const masterCarousel = ampConfig.carouselBanners || portalConfig.carouselBanners;

    setAmpConfig((a) => ({
      ...a,
      logoUrl: masterLogo,
      brandName: masterBrand,
      bannerGifUrl: masterBanner,
      carouselBanners: masterCarousel,
      targetUrl: masterRegisterUrl,
      ctaSecondaryUrl: masterLoginUrl,
    }));

    setPortalConfig((p) => ({
      ...p,
      logoUrl: masterLogo,
      siteName: masterBrand,
      heroBannerUrl: masterBanner,
      carouselBanners: masterCarousel,
      primaryCtaUrl: masterRegisterUrl,
      secondaryCtaUrl: masterLoginUrl,
    }));

    setRegisterConfig((r) => ({
      ...r,
      logoUrl: masterLogo,
      brandName: masterBrand,
    }));

    setSafelinkConfig((s) => ({
      ...s,
      brandName: masterBrand,
      destinationUrl: masterRegisterUrl,
      bannerImageUrl: masterBanner,
    }));
  };

  const handleUpdateGlobalBrand = (updates: {
    brandName?: string;
    logoUrl?: string;
    bannerUrl?: string;
    registerUrl?: string;
    loginUrl?: string;
    liveChatUrl?: string;
    altUrl?: string;
    canonicalUrl?: string;
  }) => {
    if (updates.logoUrl !== undefined) {
      setAmpConfig((a) => ({ ...a, logoUrl: updates.logoUrl! }));
      setPortalConfig((p) => ({ ...p, logoUrl: updates.logoUrl! }));
      setRegisterConfig((r) => ({ ...r, logoUrl: updates.logoUrl! }));
    }
    if (updates.brandName !== undefined) {
      setAmpConfig((a) => ({ ...a, brandName: updates.brandName! }));
      setPortalConfig((p) => ({ ...p, siteName: updates.brandName! }));
      setRegisterConfig((r) => ({ ...r, brandName: updates.brandName! }));
      setSafelinkConfig((s) => ({ ...s, brandName: updates.brandName! }));
    }
    if (updates.bannerUrl !== undefined) {
      setAmpConfig((a) => ({ ...a, bannerGifUrl: updates.bannerUrl! }));
      setPortalConfig((p) => ({ ...p, heroBannerUrl: updates.bannerUrl! }));
      setSafelinkConfig((s) => ({ ...s, bannerImageUrl: updates.bannerUrl! }));
    }
    if (updates.registerUrl !== undefined) {
      setAmpConfig((a) => ({ ...a, targetUrl: updates.registerUrl! }));
      setPortalConfig((p) => ({ ...p, primaryCtaUrl: updates.registerUrl! }));
      setSafelinkConfig((s) => ({ ...s, destinationUrl: updates.registerUrl! }));
    }
    if (updates.loginUrl !== undefined) {
      setAmpConfig((a) => ({ ...a, ctaSecondaryUrl: updates.loginUrl! }));
      setPortalConfig((p) => ({ ...p, secondaryCtaUrl: updates.loginUrl! }));
    }
    if (updates.liveChatUrl !== undefined) {
      setAmpConfig((a) => ({ ...a, liveChatUrl: updates.liveChatUrl! }));
      setPortalConfig((p) => ({ ...p, liveChatUrl: updates.liveChatUrl! }));
    }
    if (updates.altUrl !== undefined) {
      setAmpConfig((a) => ({ ...a, altUrl: updates.altUrl! }));
    }
    if (updates.canonicalUrl !== undefined) {
      setAmpConfig((a) => ({ ...a, canonicalUrl: updates.canonicalUrl! }));
    }
  };

  const handleApplyBrandPreset = (preset: BrandPresetItem) => {
    setAmpConfig((a) => ({
      ...a,
      templatePreset: preset.id,
      brandName: preset.brandName,
      logoUrl: preset.logoUrl,
      bannerGifUrl: preset.bannerUrl,
      targetUrl: preset.registerUrl,
      ctaSecondaryUrl: preset.loginUrl,
      liveChatUrl: preset.liveChatUrl,
      altUrl: preset.altUrl,
      canonicalUrl: preset.canonicalUrl,
      tagline: preset.tagline || a.tagline,
      themeColor: preset.themeColor || a.themeColor,
      accentColor: preset.accentColor || a.accentColor,
      bgColor: preset.bgColor || a.bgColor,
    }));

    setPortalConfig((p) => ({
      ...p,
      siteName: preset.brandName,
      logoUrl: preset.logoUrl,
      heroBannerUrl: preset.bannerUrl,
      primaryCtaUrl: preset.registerUrl,
      secondaryCtaUrl: preset.loginUrl,
      liveChatUrl: preset.liveChatUrl,
    }));

    setRegisterConfig((r) => ({
      ...r,
      brandName: preset.brandName,
      logoUrl: preset.logoUrl,
    }));

    setSafelinkConfig((s) => ({
      ...s,
      brandName: preset.brandName,
      destinationUrl: preset.registerUrl,
      bannerImageUrl: preset.bannerUrl,
    }));
  };

  const handleBatchFindReplace = (findUrl: string, replaceUrl: string) => {
    if (!findUrl) return;

    const rep = (val: string | undefined): string => {
      if (!val) return '';
      return val.includes(findUrl) ? val.replaceAll(findUrl, replaceUrl) : val;
    };

    setAmpConfig((a) => ({
      ...a,
      logoUrl: rep(a.logoUrl),
      bannerGifUrl: rep(a.bannerGifUrl),
      targetUrl: rep(a.targetUrl),
      ctaSecondaryUrl: rep(a.ctaSecondaryUrl),
      liveChatUrl: rep(a.liveChatUrl),
      altUrl: rep(a.altUrl),
      canonicalUrl: rep(a.canonicalUrl),
      carouselBanners: (a.carouselBanners || []).map((b) => ({
        ...b,
        imageUrl: rep(b.imageUrl),
        linkUrl: rep(b.linkUrl),
      })),
    }));

    setPortalConfig((p) => ({
      ...p,
      logoUrl: rep(p.logoUrl),
      heroBannerUrl: rep(p.heroBannerUrl),
      primaryCtaUrl: rep(p.primaryCtaUrl),
      secondaryCtaUrl: rep(p.secondaryCtaUrl),
      liveChatUrl: rep(p.liveChatUrl),
      carouselBanners: (p.carouselBanners || []).map((b) => ({
        ...b,
        imageUrl: rep(b.imageUrl),
        linkUrl: rep(b.linkUrl),
      })),
    }));

    setRegisterConfig((r) => ({
      ...r,
      logoUrl: rep(r.logoUrl),
      successRedirectUrl: rep(r.successRedirectUrl),
    }));

    setSafelinkConfig((s) => ({
      ...s,
      bannerImageUrl: rep(s.bannerImageUrl),
      destinationUrl: rep(s.destinationUrl),
    }));
  };

  // Content & Promo Handlers
  const handleApplyArticleToAmpSeo = (article: GeneratedArticle) => {
    setAmpConfig((a) => ({
      ...a,
      title: article.title,
      seoHeading: article.heading,
      seoParagraph: article.contentParagraph,
      metaDescription: article.metaDescription,
      keywords: article.keywords,
      features: article.features,
    }));
  };

  const handleApplyPromoToAmp = (promo: PromoItem) => {
    setAmpConfig((a) => ({
      ...a,
      runningText: `HOT PROMO: ${promo.title.toUpperCase()} • MIN. DEPO ${promo.minDeposit} • SYARAT ${promo.turnoverReq.toUpperCase()} • KLAIM SEKARANG JUGA!`,
      bonusText: `${promo.discountOrBonus} | ${promo.tag}`,
    }));
  };

  const handleApplyPromoToPortal = (promo: PromoItem) => {
    setPortalConfig((p) => ({
      ...p,
      announcementText: `SPESIAL EVENT: ${promo.title.toUpperCase()} • ${promo.description}`,
    }));
  };

  const handleApplyPromoToRegister = (promo: PromoItem) => {
    setRegisterConfig((r) => ({
      ...r,
      vipPerks: Array.from(new Set([...r.vipPerks, promo.title, `${promo.discountOrBonus} (${promo.turnoverReq})`])),
    }));
  };

  // Schema Studio Handlers
  const handleUpdateAmpSchemaType = (type: 'WebPage' | 'Article' | 'SoftwareApplication' | 'Product') => {
    setAmpConfig((a) => ({ ...a, structuredDataType: type, enableStructuredData: true }));
  };

  const handleUpdateSafelinkSchemaType = (type: 'Article' | 'NewsArticle' | 'TechArticle' | 'SoftwareApplication') => {
    setSafelinkConfig((s) => ({
      ...s,
      separatedJsonLd: {
        ...(s.separatedJsonLd || {
          headline: s.pageHeaderTitle,
          author: 'Security Cloud Team',
          publisher: s.brandName,
          datePublished: '2025-01-01',
          dateModified: '2025-01-01',
          description: s.pageSubtitle,
          keywords: 'safelink, verification, security',
        }),
        schemaType: type,
      },
    }));
  };

  // Auto-Fix All Errors Handler
  const handleAutoFixAll = () => {
    // 1. Upgrade HTTP to HTTPS
    const toHttps = (url?: string) => {
      if (!url) return '';
      if (url.startsWith('http://')) return url.replace('http://', 'https://');
      return url;
    };

    setAmpConfig((a) => ({
      ...a,
      logoUrl: toHttps(a.logoUrl),
      bannerGifUrl: toHttps(a.bannerGifUrl),
      targetUrl: toHttps(a.targetUrl),
      ctaSecondaryUrl: toHttps(a.ctaSecondaryUrl),
      canonicalUrl: a.canonicalUrl ? toHttps(a.canonicalUrl) : 'https://vip-official.pages.dev/',
      enableStructuredData: true,
    }));

    setPortalConfig((p) => ({
      ...p,
      logoUrl: toHttps(p.logoUrl),
      heroBannerUrl: toHttps(p.heroBannerUrl),
      primaryCtaUrl: toHttps(p.primaryCtaUrl),
      secondaryCtaUrl: toHttps(p.secondaryCtaUrl),
    }));

    setRegisterConfig((r) => ({
      ...r,
      logoUrl: toHttps(r.logoUrl),
      successRedirectUrl: toHttps(r.successRedirectUrl),
    }));

    setSafelinkConfig((s) => ({
      ...s,
      bannerImageUrl: toHttps(s.bannerImageUrl),
      destinationUrl: toHttps(s.destinationUrl),
    }));

    // 2. Enable CyberShield anti-inspect
    setCyberShieldConfig((c) => ({
      ...c,
      enabled: true,
      blockRightClick: true,
      blockCtrlU: true,
      blockDevInspect: true,
      blockTextCopy: true,
    }));
  };

  const handleFixSingleIssue = (issueId: string) => {
    if (issueId.includes('http') || issueId.includes('security')) {
      handleAutoFixAll();
    } else if (issueId.includes('canonical')) {
      setAmpConfig((a) => ({ ...a, canonicalUrl: 'https://vip-official.pages.dev/' }));
    } else if (issueId.includes('jsonld')) {
      setAmpConfig((a) => ({ ...a, enableStructuredData: true }));
    } else if (issueId.includes('cybershield')) {
      setCyberShieldConfig((c) => ({ ...c, enabled: true }));
    }
  };

  // Auth & Drive
  const [user, setUser] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Auto-Uploads state
  const [autoUploadEnabled, setAutoUploadEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('suite_auto_uploads');
    return saved !== null ? saved === 'true' : true;
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncedDriveFileIds, setSyncedDriveFileIds] = useState<Record<string, string>>({});

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    // Initialize Google Firebase Auth
    const unsubscribe = initAuth(
      (authUser, token) => {
        setUser({
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
        });
        setAccessToken(token);
      },
      () => {
        // Not signed in or needs refresh
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleToggleAutoUpload = () => {
    setAutoUploadEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('suite_auto_uploads', String(next));
      return next;
    });
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser({
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        });
        setAccessToken(result.accessToken);
      }
    } catch (err) {
      console.error('Google Sign In error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
  };

  // Content generators for active tab
  const getCurrentGeneratedOutput = () => {
    if (activeTab === 'amp') {
      return {
        title: 'Google AMP Valid Landing Page',
        filename: 'amp-landing-page.html',
        content: generateAmpHtml({ ...ampConfig, cyberShield: cyberShieldConfig }),
        type: 'Landing Page AMP',
      };
    }
    if (activeTab === 'portal') {
      return {
        title: 'Portal Utama Responsif',
        filename: 'portal-utama.html',
        content: generatePortalHtml({ ...portalConfig, cyberShield: cyberShieldConfig }, cdnScripts.scripts),
        type: 'Portal Utama',
      };
    }
    if (activeTab === 'register') {
      return {
        title: 'Registrasi VIP Form',
        filename: 'vip-register.html',
        content: generateVipRegisterHtml({ ...registerConfig, cyberShield: cyberShieldConfig }, cdnScripts.scripts),
        type: 'VIP Register',
      };
    }
    if (activeTab === 'safelink') {
      return {
        title: 'SafeLink Shield & JSON-LD (Page 4)',
        filename: 'safelink-page4.html',
        content: generateSafeLinkHtml({ ...safelinkConfig, cyberShield: cyberShieldConfig }, cdnScripts.scripts),
        type: 'SafeLink Bridge',
      };
    }
    if (activeTab === 'cyber-shield') {
      return {
        title: 'Cyber Shield Anti-Inspect & Anti-Theft Protection',
        filename: 'cyber-shield-security.html',
        content: generateCyberShieldScript(cyberShieldConfig, portalConfig.siteName || ampConfig.brandName),
        type: 'Cyber Shield Protection',
      };
    }
    return {
      title: 'Script Loader & CDN Configuration',
      filename: 'scripts-config.json',
      content: JSON.stringify(cdnScripts, null, 2),
      type: 'Scripts & CDN',
    };
  };

  const currentOutput = getCurrentGeneratedOutput();

  // Auto-Upload to Google Drive with debounce
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    if (!autoUploadEnabled || !accessToken || !currentOutput.content) {
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      setIsSyncing(true);
      try {
        const mimeType = currentOutput.filename.endsWith('.json')
          ? 'application/json'
          : 'text/html';

        const existingFileId = syncedDriveFileIds[currentOutput.filename];
        const uploaded = await uploadFileToDrive(
          accessToken,
          currentOutput.filename,
          currentOutput.content,
          mimeType,
          existingFileId
        );

        if (uploaded?.id) {
          setSyncedDriveFileIds((prev) => ({
            ...prev,
            [currentOutput.filename]: uploaded.id,
          }));
        }
        setLastSyncTime(new Date());
      } catch (err) {
        console.error('Auto upload to drive failed:', err);
      } finally {
        setIsSyncing(false);
      }
    }, 2500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [
    ampConfig,
    portalConfig,
    registerConfig,
    safelinkConfig,
    cdnScripts,
    cyberShieldConfig,
    activeTab,
    autoUploadEnabled,
    accessToken,
  ]);

  const handleDownload = () => {
    const blob = new Blob([currentOutput.content], {
      type: currentOutput.filename.endsWith('.json')
        ? 'application/json'
        : 'text/html;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentOutput.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenDriveModal={() => setIsDriveModalOpen(true)}
        onOpenPreview={() => setIsPreviewModalOpen(true)}
        onDownloadCurrent={handleDownload}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onLogin={handleGoogleLogin}
        onLogout={handleLogout}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        autoUploadEnabled={autoUploadEnabled}
        onToggleAutoUpload={handleToggleAutoUpload}
        isSyncing={isSyncing}
        lastSyncTime={lastSyncTime}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
        {/* Global Brand & Links Synchronizer Bar */}
        {['amp', 'portal', 'register', 'safelink'].includes(activeTab) && (
          <GlobalBrandSyncBar
            autoSync={autoSyncBrandAssets}
            onToggleAutoSync={handleToggleAutoSync}
            onManualSyncAll={handleManualSyncAll}
            brandName={ampConfig.brandName || portalConfig.siteName || registerConfig.brandName}
            logoUrl={ampConfig.logoUrl || portalConfig.logoUrl || registerConfig.logoUrl}
            bannerUrl={ampConfig.bannerGifUrl || portalConfig.heroBannerUrl}
            registerUrl={ampConfig.targetUrl || portalConfig.primaryCtaUrl}
            loginUrl={ampConfig.ctaSecondaryUrl || portalConfig.secondaryCtaUrl}
            liveChatUrl={ampConfig.liveChatUrl || portalConfig.liveChatUrl || ''}
            altUrl={ampConfig.altUrl || ''}
            canonicalUrl={ampConfig.canonicalUrl || ''}
            currentTemplatePreset={ampConfig.templatePreset || 'rtp-zenvia'}
            onApplyBrandPreset={handleApplyBrandPreset}
            onBatchFindReplace={handleBatchFindReplace}
            onUpdateGlobalBrand={handleUpdateGlobalBrand}
          />
        )}

        {activeTab === 'amp' && (
          <AmpGenerator
            config={{ ...ampConfig, cyberShield: cyberShieldConfig }}
            onChange={handleUpdateAmpConfig}
            onSaveToDrive={() => setIsDriveModalOpen(true)}
            onOpenCodePreview={() => setIsPreviewModalOpen(true)}
            viewportMode={viewportMode}
          />
        )}

        {activeTab === 'portal' && (
          <PortalGenerator
            config={{ ...portalConfig, cyberShield: cyberShieldConfig }}
            scripts={cdnScripts.scripts}
            onChange={handleUpdatePortalConfig}
            onSaveToDrive={() => setIsDriveModalOpen(true)}
            onOpenCodePreview={() => setIsPreviewModalOpen(true)}
            viewportMode={viewportMode}
          />
        )}

        {activeTab === 'register' && (
          <VipRegisterGenerator
            config={{ ...registerConfig, cyberShield: cyberShieldConfig }}
            scripts={cdnScripts.scripts}
            onChange={handleUpdateRegisterConfig}
            onSaveToDrive={() => setIsDriveModalOpen(true)}
            onOpenCodePreview={() => setIsPreviewModalOpen(true)}
            viewportMode={viewportMode}
          />
        )}

        {activeTab === 'safelink' && (
          <SafeLinkGenerator
            config={{ ...safelinkConfig, cyberShield: cyberShieldConfig }}
            scripts={cdnScripts.scripts}
            onChange={handleUpdateSafeLinkConfig}
            onSaveToDrive={() => setIsDriveModalOpen(true)}
            onOpenCodePreview={() => setIsPreviewModalOpen(true)}
            viewportMode={viewportMode}
          />
        )}

        {activeTab === 'page1-seo' && (
          <Page1Rank1Studio
            brandName={portalConfig.siteName || ampConfig.brandName}
            targetUrl={ampConfig.targetUrl || portalConfig.primaryCtaUrl}
            minDeposit={ampConfig.minDeposit}
            rtpRate={ampConfig.rtpRate}
            onApplyToAmp={(seo) => {
              setAmpConfig((prev) => ({
                ...prev,
                seoTitle: seo.title,
                metaDescription: seo.metaDescription,
                keywords: seo.keywords,
                seoArticleHeading: seo.seoHeading,
                seoArticleParagraph: seo.seoParagraph,
                enableStructuredData: true,
                schemaType: 'custom',
                customJsonLd: typeof seo.jsonLdSchema === 'string' ? seo.jsonLdSchema : JSON.stringify(seo.jsonLdSchema, null, 2),
              }));
            }}
            onApplyToPortal={(seo) => {
              setPortalConfig((prev) => ({
                ...prev,
                siteName: seo.siteName,
                footerText: seo.footerText,
              }));
            }}
          />
        )}

        {activeTab === 'content-promo' && (
          <ContentPromoStudio
            brandName={portalConfig.siteName || ampConfig.brandName}
            targetUrl={ampConfig.targetUrl || portalConfig.primaryCtaUrl}
            minDeposit={ampConfig.minDeposit}
            rtpRate={ampConfig.rtpRate}
            onApplyArticleToAmpSeo={handleApplyArticleToAmpSeo}
            onApplyPromoToAmp={handleApplyPromoToAmp}
            onApplyPromoToPortal={handleApplyPromoToPortal}
            onApplyPromoToRegister={handleApplyPromoToRegister}
          />
        )}

        {activeTab === 'schema-studio' && (
          <SchemaStudio
            ampConfig={ampConfig}
            portalConfig={portalConfig}
            registerConfig={registerConfig}
            safelinkConfig={safelinkConfig}
            onUpdateAmpSchemaType={handleUpdateAmpSchemaType}
            onUpdateSafelinkSchemaType={handleUpdateSafelinkSchemaType}
          />
        )}

        {activeTab === 'error-audit' && (
          <ErrorBugAnalyzerStudio
            ampConfig={ampConfig}
            portalConfig={portalConfig}
            registerConfig={registerConfig}
            safelinkConfig={safelinkConfig}
            cyberShieldConfig={cyberShieldConfig}
            onAutoFixAll={handleAutoFixAll}
            onFixSingleIssue={handleFixSingleIssue}
          />
        )}

        {activeTab === 'ads-checker' && (
          <AdsCheckerStudio />
        )}

        {activeTab === 'cdn-scripts' && (
          <CdnScriptStudio config={cdnScripts} onChange={setCdnScripts} />
        )}

        {activeTab === 'cyber-shield' && (
          <CyberShieldStudio
            config={cyberShieldConfig}
            onChange={handleUpdateCyberShield}
            brandName={portalConfig.siteName || ampConfig.brandName}
          />
        )}
      </main>

      {/* Google Drive Explorer Modal */}
      <GoogleDriveModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        user={user}
        accessToken={accessToken}
        onLogin={handleGoogleLogin}
        isLoggingIn={isLoggingIn}
        currentContentToSave={currentOutput}
        autoUploadEnabled={autoUploadEnabled}
        onToggleAutoUpload={handleToggleAutoUpload}
        isSyncing={isSyncing}
        lastSyncTime={lastSyncTime}
      />

      {/* Fullscreen Code & Sandbox Preview Modal */}
      <CodePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title={currentOutput.title}
        filename={currentOutput.filename}
        code={currentOutput.content}
        onSaveToDrive={() => {
          setIsPreviewModalOpen(false);
          setIsDriveModalOpen(true);
        }}
      />

      {/* Deploy & ZIP Export Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        ampConfig={ampConfig}
        portalConfig={portalConfig}
        registerConfig={registerConfig}
        safelinkConfig={safelinkConfig}
        cyberShieldConfig={cyberShieldConfig}
        cdnScripts={cdnScripts}
      />

      {/* Upload HTML / AMP / Schema Modal */}
      <TemplateUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onApplyParsedTemplate={(parsed) => {
          if (parsed.detectedType === 'amp') {
            setAmpConfig((prev) => applyParsedToAmpConfig(prev, parsed));
            setActiveTab('amp');
          } else {
            setPortalConfig((prev) => applyParsedToPortalConfig(prev, parsed));
            setActiveTab('portal');
          }
        }}
      />
    </div>
  );
}
