import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Search,
  CheckCircle2,
  Copy,
  Layers,
  ArrowRight,
  Globe,
  Star,
  HelpCircle,
  Code2,
  RefreshCw,
  Zap,
  Flame,
  ShieldCheck,
  Check,
} from 'lucide-react';
import type { AmpConfig, PortalConfig } from '../types';

interface Page1Rank1StudioProps {
  brandName: string;
  targetUrl: string;
  minDeposit?: string;
  rtpRate?: string;
  onApplyToAmp: (seoData: {
    title: string;
    metaDescription: string;
    keywords: string;
    seoHeading: string;
    seoParagraph: string;
    jsonLdSchema: any;
  }) => void;
  onApplyToPortal: (seoData: {
    siteName: string;
    footerText: string;
  }) => void;
}

const TRENDING_NICHES = [
  { id: 'slot-gacor', name: '⚡ Slot Gacor & RTP Live', keyword: 'Slot Gacor Hari Ini', schema: 'FAQPage' },
  { id: 'pola-maxwin', name: '🔥 Pola Maxwin Pragmatic & PG Soft', keyword: 'Bocoran Slot Gacor Maxwin', schema: 'Game' },
  { id: 'link-resmi', name: '🛡️ Link Alternatif Bebas Blokir', keyword: 'Link Alternatif Resmi Terpercaya', schema: 'FAQPage' },
  { id: 'togel-4d', name: '🎯 Togel Online SGP HK 4D', keyword: 'Bandar Togel Terpercaya 4D', schema: 'HowTo' },
  { id: 'live-casino', name: '👑 Live Casino & Baccarat VIP', keyword: 'Situs Live Casino Online VIP', schema: 'Organization' },
  { id: 'bonus-promo', name: '🎁 Bonus New Member & Garansi', keyword: 'Slot Bonus New Member 100%', schema: 'Article' },
];

const SCHEMA_TYPES = [
  { id: 'FAQPage', name: 'FAQ Page (Accordion Rich Snippet)', icon: HelpCircle },
  { id: 'Game', name: 'Game & App (Star Rating 4.9★)', icon: Star },
  { id: 'Article', name: 'Article (Google Discover / News)', icon: Globe },
  { id: 'ItemList', name: 'ItemList (Carousel Grid Snippet)', icon: Layers },
  { id: 'HowTo', name: 'HowTo (Step-by-Step Guide)', icon: CheckCircle2 },
  { id: 'Organization', name: 'Organization (Knowledge Graph)', icon: ShieldCheck },
];

export const Page1Rank1Studio: React.FC<Page1Rank1StudioProps> = ({
  brandName,
  targetUrl,
  minDeposit = 'Rp 10.000',
  rtpRate = '98.8%',
  onApplyToAmp,
  onApplyToPortal,
}) => {
  const [selectedNiche, setSelectedNiche] = useState(TRENDING_NICHES[0]);
  const [customKeyword, setCustomKeyword] = useState('Slot Gacor Hari Ini');
  const [selectedSchema, setSelectedSchema] = useState<string>('FAQPage');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Result state
  const [seoResult, setSeoResult] = useState<{
    page1Title: string;
    metaDescription: string;
    lsiKeywords: string[];
    seoHeading: string;
    seoParagraph: string;
    faqItems: { question: string; answer: string }[];
    jsonLdSchema: any;
    trendingTopics: string[];
  }>({
    page1Title: `${brandName || 'VIP OFFICIAL'} ⚡ Slot Gacor Hari Ini & RTP Live 98.8% Pasti Maxwin`,
    metaDescription: `Daftar di ${brandName || 'VIP OFFICIAL'}, situs slot gacor hari ini resmi dengan bocoran RTP Live 98.8%, min deposit ${minDeposit}, pola hoki, dan garansi bayar 100%.`,
    lsiKeywords: [
      'slot gacor hari ini',
      'rtp live slot tertinggi',
      'bocoran slot pragmatic',
      'link alternatif resmi',
      'slot deposit 10rb qris',
    ],
    seoHeading: `Pusat Informasi ${customKeyword} & RTP Live Terlengkap di ${brandName || 'VIP OFFICIAL'}`,
    seoParagraph: `Selamat datang di portal resmi ${brandName || 'VIP OFFICIAL'}, pilihan utama bagi penikmat permainan dengan persentase kemenangan terbaik. Kami menyajikan update real-time jam hoki, pola spin jitu terverifikasi, serta proteksi keamanan Cyber Shield tanpa hambatan. Nikmati pengalaman bermain berlisensi resmi dengan transaksi instan 24 jam.`,
    faqItems: [
      {
        question: `Mengapa memilih ${brandName || 'VIP OFFICIAL'} sebagai situs slot gacor?`,
        answer: `${brandName || 'VIP OFFICIAL'} memiliki lisensi resmi, sistem RTP Live akurat, penarikan dana tanpa batas, dan keamanan Cyber Shield.`,
      },
      {
        question: `Berapa modal awal minimal bermain di sini?`,
        answer: `Cukup dengan ${minDeposit}, Anda sudah dapat memainkan seluruh provider slot kelas dunia dan klaim promo menarik.`,
      },
      {
        question: `Bagaimana cara mendapatkan bocoran pola gacor?`,
        answer: `Cek tabel RTP live di halaman utama yang selalu diperbarui setiap beberapa menit dengan jam hoki dan persentase real-time.`,
      },
    ],
    jsonLdSchema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Mengapa memilih ${brandName || 'VIP OFFICIAL'}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Lisensi resmi dengan RTP Live ${rtpRate} dan proses cepat 24 jam.`,
          },
        },
      ],
    },
    trendingTopics: ['Slot Gacor Hari Ini', 'Pola Olympus 1000', 'Mahjong Ways Scatter Hitam', 'RTP Pragmatic 98%'],
  });

  const handleGenerateAI = async () => {
    setIsLoading(true);
    setSyncStatus(null);
    try {
      const res = await fetch('/api/ai/page1-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandName || 'VIP OFFICIAL',
          targetKeyword: customKeyword.trim() || selectedNiche.keyword,
          niche: selectedNiche.name,
          schemaType: selectedSchema,
          targetUrl: targetUrl || 'https://vip-official.pages.dev',
          minDeposit,
          rtpRate,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setSeoResult(data.data);
      }
    } catch (err) {
      console.error('AI Page 1 SEO generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyAll = () => {
    onApplyToAmp({
      title: seoResult.page1Title,
      metaDescription: seoResult.metaDescription,
      keywords: seoResult.lsiKeywords.join(', '),
      seoHeading: seoResult.seoHeading,
      seoParagraph: seoResult.seoParagraph,
      jsonLdSchema: seoResult.jsonLdSchema,
    });
    onApplyToPortal({
      siteName: brandName || 'VIP OFFICIAL',
      footerText: seoResult.metaDescription,
    });
    setSyncStatus('✅ Berhasil Sync ke AMP, Portal & Schema JSON-LD!');
    setTimeout(() => setSyncStatus(null), 3500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">
                Google Page 1 Rank 1 AI Auto-Sync Engine
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
                Live SERP Snippet
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Otomasi keyword ranking #1, High-CTR meta tags, LSI keyword cluster, &amp; Swift Schema Switcher.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isLoading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 shrink-0 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Menghitung Page 1 AI...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate AI Page 1 Rank 1
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Control Panel + Live SERP Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Target & Schema Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Niche & Keyword Presets */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Pilih Topik Trending Page 1:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TRENDING_NICHES.map((niche) => (
                <button
                  key={niche.id}
                  type="button"
                  onClick={() => {
                    setSelectedNiche(niche);
                    setCustomKeyword(niche.keyword);
                    setSelectedSchema(niche.schema);
                  }}
                  className={`p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center justify-between border ${
                    selectedNiche.id === niche.id
                      ? 'bg-amber-500/10 border-amber-500/60 text-amber-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="truncate">{niche.name}</span>
                  {selectedNiche.id === niche.id && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-bold text-slate-400">Target Keyword Utama:</label>
              <input
                type="text"
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                placeholder="Contoh: Slot Gacor Hari Ini"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>
          </div>

          {/* 2. Swift AI Schema Switcher */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Swift AI Schema Switcher:
              </label>
              <span className="text-[10px] text-amber-400 font-mono font-bold">{selectedSchema}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SCHEMA_TYPES.map((sc) => {
                const IconComponent = sc.icon;
                const isSel = selectedSchema === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedSchema(sc.id)}
                    className={`p-2 rounded-xl text-left text-xs transition border flex items-center gap-2 ${
                      isSel
                        ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate text-[11px]">{sc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1-Click Sync Button */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <button
              type="button"
              onClick={handleApplyAll}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Zap className="w-4 h-4" /> 1-Click Sync ke AMP, Portal &amp; Schema
            </button>
            {syncStatus && (
              <div className="text-center text-xs font-bold text-emerald-400 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 animate-in fade-in">
                {syncStatus}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Live SERP Preview + SEO Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Live Google Page 1 SERP Simulator */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-amber-400" /> Google Search SERP Simulator (Rank #1)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                100% CTR Score
              </span>
            </div>

            {/* Google Result Card */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2.5">
              {/* URL Breadcrumbs & Favicon */}
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[11px] text-amber-400 font-bold border border-slate-700">
                  ⚡
                </div>
                <div className="truncate">
                  <div className="text-slate-200 font-semibold text-[11px] leading-none truncate">
                    {brandName || 'VIP OFFICIAL'}
                  </div>
                  <div className="text-slate-400 text-[10px] font-mono leading-tight truncate">
                    {targetUrl || 'https://vip-official.pages.dev'} › {customKeyword.toLowerCase().replace(/\s+/g, '-')}
                  </div>
                </div>
              </div>

              {/* Title Link */}
              <h3 className="text-base font-bold text-blue-400 hover:underline cursor-pointer leading-snug">
                {seoResult.page1Title}
              </h3>

              {/* Star Rating Rich Snippet */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-amber-300 font-bold">Rating: 4.9/5.0</span>
                <span>·</span>
                <span>14,820 Votes</span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">Min Depo: {minDeposit}</span>
              </div>

              {/* Meta Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {seoResult.metaDescription}
              </p>

              {/* FAQ Accordion in SERP */}
              {selectedSchema === 'FAQPage' && seoResult.faqItems && (
                <div className="space-y-1 pt-1 border-t border-slate-800/80">
                  {seoResult.faqItems.slice(0, 2).map((faq, i) => (
                    <details key={i} className="text-xs text-slate-300 group cursor-pointer">
                      <summary className="font-semibold text-blue-300 hover:text-blue-200 list-none flex items-center justify-between py-1">
                        <span>{faq.question}</span>
                        <span className="text-slate-500 group-open:rotate-180 transition">▼</span>
                      </summary>
                      <p className="text-[11px] text-slate-400 pl-2 pb-1">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>

            {/* LSI Keywords Cluster */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400">LSI Keyword Cluster (High Search Volume):</span>
              <div className="flex flex-wrap gap-1.5">
                {seoResult.lsiKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-300 font-mono flex items-center gap-1"
                  >
                    <span>#</span> {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Deep Content Block */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300">Generated SEO Article Snippet:</span>
              <button
                type="button"
                onClick={() => handleCopy(`${seoResult.seoHeading}\n\n${seoResult.seoParagraph}`, 'article')}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono text-[11px]"
              >
                <Copy className="w-3 h-3" /> {copied === 'article' ? 'Tersalin!' : 'Copy'}
              </button>
            </div>
            <h4 className="font-black text-amber-300 text-sm">{seoResult.seoHeading}</h4>
            <p className="text-slate-300 leading-relaxed">{seoResult.seoParagraph}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
