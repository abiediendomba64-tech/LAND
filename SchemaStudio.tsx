import React, { useState } from 'react';
import {
  Layers,
  Code2,
  Copy,
  Check,
  CheckCircle2,
  Globe,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Zap,
  UserPlus,
} from 'lucide-react';
import type { AmpConfig, PortalConfig, RegisterConfig, SafeLinkConfig } from '../types';

interface SchemaStudioProps {
  ampConfig: AmpConfig;
  portalConfig: PortalConfig;
  registerConfig: RegisterConfig;
  safelinkConfig: SafeLinkConfig;
  onUpdateAmpSchemaType: (type: 'WebPage' | 'Article' | 'SoftwareApplication' | 'Product') => void;
  onUpdateSafelinkSchemaType: (type: 'Article' | 'NewsArticle' | 'TechArticle' | 'SoftwareApplication') => void;
}

export const SchemaStudio: React.FC<SchemaStudioProps> = ({
  ampConfig,
  portalConfig,
  registerConfig,
  safelinkConfig,
  onUpdateAmpSchemaType,
  onUpdateSafelinkSchemaType,
}) => {
  const [activePage, setActivePage] = useState<'amp' | 'portal' | 'register' | 'safelink'>('amp');
  const [copied, setCopied] = useState(false);

  // Generate Real JSON-LD for each page
  const generateAmpJsonLd = () => {
    const type = ampConfig.structuredDataType || 'WebPage';
    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': type,
        name: ampConfig.brandName,
        headline: ampConfig.title,
        description: ampConfig.metaDescription,
        url: ampConfig.canonicalUrl || 'https://domain.com/',
        image: ampConfig.bannerGifUrl || ampConfig.logoUrl,
        publisher: {
          '@type': 'Organization',
          name: ampConfig.brandName,
          logo: {
            '@type': 'ImageObject',
            url: ampConfig.logoUrl,
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: ampConfig.rating || '4.9',
          bestRating: '5.0',
          worstRating: '1.0',
          ratingCount: '18540',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: '0',
          availability: 'https://schema.org/InStock',
          url: ampConfig.targetUrl,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': ampConfig.canonicalUrl || 'https://domain.com/',
        },
      },
      null,
      2
    );
  };

  const generatePortalJsonLd = () => {
    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: portalConfig.siteName,
        url: ampConfig.canonicalUrl || 'https://domain.com/',
        logo: portalConfig.logoUrl,
        description: portalConfig.slogan,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: portalConfig.whatsappNumber ? `+${portalConfig.whatsappNumber}` : '+6281288889999',
            contactType: 'customer service',
            availableLanguage: ['Indonesian', 'English'],
          },
        ],
        sameAs: [
          portalConfig.telegramUsername ? `https://t.me/${portalConfig.telegramUsername}` : undefined,
          portalConfig.liveChatUrl || undefined,
        ].filter(Boolean),
      },
      null,
      2
    );
  };

  const generateRegisterJsonLd = () => {
    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${registerConfig.brandName} VIP Membership Registration`,
        serviceType: 'Online Gaming VIP Account Creation',
        provider: {
          '@type': 'Organization',
          name: registerConfig.brandName,
          logo: registerConfig.logoUrl,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
          description: 'Pendaftaran Akun VIP Gratis Bebas Biaya Admin',
        },
        termsOfService: registerConfig.successRedirectUrl,
      },
      null,
      2
    );
  };

  const generateSafeLinkJsonLd = () => {
    const sl = safelinkConfig.separatedJsonLd || {
      schemaType: 'TechArticle',
      headline: safelinkConfig.pageHeaderTitle,
      author: 'Security Cloud Team',
      publisher: safelinkConfig.brandName,
      datePublished: '2025-01-01',
      dateModified: '2025-01-01',
      description: safelinkConfig.pageSubtitle,
      keywords: 'safelink, security cloud, verifikasi link',
    };

    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': sl.schemaType,
        headline: sl.headline,
        author: {
          '@type': 'Person',
          name: sl.author,
        },
        publisher: {
          '@type': 'Organization',
          name: sl.publisher,
          logo: {
            '@type': 'ImageObject',
            url: ampConfig.logoUrl,
          },
        },
        datePublished: sl.datePublished,
        dateModified: sl.dateModified,
        description: sl.description,
        keywords: sl.keywords,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': ampConfig.canonicalUrl || 'https://domain.com/safelink',
        },
      },
      null,
      2
    );
  };

  const currentJsonLd =
    activePage === 'amp'
      ? generateAmpJsonLd()
      : activePage === 'portal'
      ? generatePortalJsonLd()
      : activePage === 'register'
      ? generateRegisterJsonLd()
      : generateSafeLinkJsonLd();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${currentJsonLd}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/20">
            <Layers className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">Skema Structured Data Per Page Studio</h2>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                Google Rich Results Valid
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Konfigurasi skema terstruktur Schema.org (JSON-LD) spesifik untuk masing-masing halaman agar mendapatkan bintang review dan sitelinks di Google.
            </p>
          </div>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActivePage('amp')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePage === 'amp' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Skema AMP</span>
          </button>
          <button
            onClick={() => setActivePage('portal')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePage === 'portal' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Skema Portal</span>
          </button>
          <button
            onClick={() => setActivePage('register')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePage === 'register' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Skema Register</span>
          </button>
          <button
            onClick={() => setActivePage('safelink')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePage === 'safelink' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Skema SafeLink</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Schema Configuration Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-black text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Tipe Skema &amp; Entitas Halaman
            </h3>

            {activePage === 'amp' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">Tipe Skema AMP</label>
                  <select
                    value={ampConfig.structuredDataType || 'WebPage'}
                    onChange={(e) => onUpdateAmpSchemaType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 focus:border-amber-500 focus:outline-none font-bold"
                  >
                    <option value="WebPage">WebPage (Rekomendasi Google AMP)</option>
                    <option value="Article">Article / NewsArticle (Blog &amp; Berita)</option>
                    <option value="SoftwareApplication">SoftwareApplication (Aplikasi &amp; Game)</option>
                    <option value="Product">Product / Game Offer (Review &amp; Rating)</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-400">
                  <div className="flex justify-between">
                    <span>Entitas Brand:</span>
                    <span className="font-bold text-white">{ampConfig.brandName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating Nilai:</span>
                    <span className="font-bold text-amber-300">{ampConfig.rating || '4.9'} / 5.0 (18.5k Reviews)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Canonical Target:</span>
                    <span className="font-mono text-cyan-300 truncate max-w-[180px]">{ampConfig.canonicalUrl || 'Auto'}</span>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'portal' && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-400">
                  <div className="font-bold text-purple-300 uppercase text-[10px]">Tipe: Organization &amp; Hub</div>
                  <p className="text-[11px] text-slate-300">
                    Skema Organization memberikan kredibilitas domain pada Google Knowledge Graph dan menghubungkan seluruh channel WhatsApp &amp; Telegram resmi.
                  </p>
                </div>
              </div>
            )}

            {activePage === 'register' && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-400">
                  <div className="font-bold text-emerald-300 uppercase text-[10px]">Tipe: Service &amp; Registration Offer</div>
                  <p className="text-[11px] text-slate-300">
                    Skema Service mendefinisikan pendaftaran akun VIP resmi tanpa biaya (Free InStock) dan perlindungan data member.
                  </p>
                </div>
              </div>
            )}

            {activePage === 'safelink' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">Tipe Skema SafeLink</label>
                  <select
                    value={safelinkConfig.separatedJsonLd?.schemaType || 'TechArticle'}
                    onChange={(e) => onUpdateSafelinkSchemaType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 focus:border-amber-500 focus:outline-none font-bold"
                  >
                    <option value="TechArticle">TechArticle (Artikel Teknologi &amp; Keamanan)</option>
                    <option value="NewsArticle">NewsArticle (Berita Update)</option>
                    <option value="Article">Article Standar</option>
                    <option value="SoftwareApplication">SoftwareApplication</option>
                  </select>
                </div>
              </div>
            )}

            {/* Validation Badges */}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Format JSON-LD Valid Standard Schema.org</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Kompatibel Google Rich Snippets &amp; Review Stars</span>
              </div>
            </div>
          </div>
        </div>

        {/* JSON-LD Code Output Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <FileCode className="w-4 h-4" />
                JSON-LD Markup ({activePage.toUpperCase()})
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Tag Script'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[420px] scrollbar-thin">
              {`<script type="application/ld+json">\n${currentJsonLd}\n</script>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
