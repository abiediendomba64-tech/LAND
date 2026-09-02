import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  FileText,
  Flame,
  Check,
  Copy,
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
  Plus,
  RefreshCw,
  Send,
  Zap,
} from 'lucide-react';
import {
  PROMO_PRESETS,
  PromoItem,
  ContentTopic,
  generateSmartSeoArticle,
  GeneratedArticle,
} from '../services/contentPromoService';

interface ContentPromoStudioProps {
  brandName: string;
  targetUrl: string;
  minDeposit?: string;
  rtpRate?: string;
  onApplyArticleToAmpSeo: (article: GeneratedArticle) => void;
  onApplyPromoToAmp: (promo: PromoItem) => void;
  onApplyPromoToPortal: (promo: PromoItem) => void;
  onApplyPromoToRegister: (promo: PromoItem) => void;
}

export const ContentPromoStudio: React.FC<ContentPromoStudioProps> = ({
  brandName,
  targetUrl,
  minDeposit = 'Rp 10.000',
  rtpRate = '98.8%',
  onApplyArticleToAmpSeo,
  onApplyPromoToAmp,
  onApplyPromoToPortal,
  onApplyPromoToRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'promo'>('content');

  // Content Generator State
  const [topic, setTopic] = useState<ContentTopic>('rtp-gacor');
  const [targetKeyword, setTargetKeyword] = useState('Slot Gacor Hari Ini');
  const [tone, setTone] = useState<'persuasive' | 'informative' | 'clickbait' | 'luxury-vip'>('persuasive');
  const [wordCount, setWordCount] = useState<'short' | 'medium' | 'long'>('medium');
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle>(() =>
    generateSmartSeoArticle({
      brandName,
      targetKeyword: 'Slot Gacor Hari Ini',
      topic: 'rtp-gacor',
      tone: 'persuasive',
      wordCount: 'medium',
      targetUrl,
      minDeposit,
      rtpRate,
    })
  );

  // Promo Generator State
  const [selectedPromos, setSelectedPromos] = useState<PromoItem[]>(PROMO_PRESETS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateArticle = () => {
    const article = generateSmartSeoArticle({
      brandName: brandName || 'NEXUS VIP',
      targetKeyword: targetKeyword.trim() || 'Slot Gacor Hari Ini',
      topic,
      tone,
      wordCount,
      targetUrl: targetUrl || 'https://rebrand.ly/DAFTAR-BIGCAT',
      minDeposit,
      rtpRate,
    });
    setGeneratedArticle(article);
    showToast('✨ Artikel SEO & Konten Baru Berhasil Digenerate!');
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPromos =
    filterCategory === 'all'
      ? selectedPromos
      : selectedPromos.filter((p) => p.category === filterCategory);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Studio Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <Sparkles className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">Content &amp; Promo Generator Studio</h2>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                AI Powered &amp; 1-Click Sync
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Generate artikel SEO organik berkualitas tinggi dan paket banner promosi event menarik untuk meningkatkan CTR dan konversi pemain.
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'content'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>SEO Content Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('promo')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'promo'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Promo &amp; Event Generator</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn shadow-lg">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TAB 1: SEO CONTENT GENERATOR */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Parameter Pembuatan Konten
              </h3>

              {/* Topic Select */}
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">Topik Konten / Sudut Pandang</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as ContentTopic)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-500 focus:outline-none font-bold"
                >
                  <option value="rtp-gacor">RTP Live &amp; Bocoran Slot Gacor Hari Ini</option>
                  <option value="bocoran-pola">Bocoran Pola Spin &amp; Jam Hoki Maxwin</option>
                  <option value="provider-review">Review Provider Game Populer (PG Soft, Pragmatic)</option>
                  <option value="transaksi-qris">Sistem Transaksi QRIS 1 Detik &amp; Bank 24 Jam</option>
                  <option value="safelink-security">Keamanan Jaringan &amp; SafeLink Protocol</option>
                </select>
              </div>

              {/* Target Keyword */}
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">Target Keyword Utama (SEO)</label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="Misal: Slot Gacor Hari Ini / Togel Online"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 focus:border-amber-500 focus:outline-none font-bold"
                />
              </div>

              {/* Tone of Voice */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">Gaya Bahasa (Tone)</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="persuasive">Persuasif &amp; Menarik</option>
                    <option value="informative">Informatif Edukatif</option>
                    <option value="clickbait">Clickbait Elegan</option>
                    <option value="luxury-vip">Eksklusif VIP</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">Panjang Artikel</label>
                  <select
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="short">Ringkas (150 Kata)</option>
                    <option value="medium">Standar (250 Kata)</option>
                    <option value="long">Mendalam (400+ Kata)</option>
                  </select>
                </div>
              </div>

              {/* Quick Details */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400 block">Nama Brand Aktif:</span>
                  <span className="text-xs font-black text-white">{brandName || 'NEXUS VIP'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">RTP Winrate Terpasang:</span>
                  <span className="text-xs font-black text-emerald-400">{rtpRate}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateArticle}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Generate Artikel &amp; FAQ Baru</span>
              </button>
            </div>

            {/* 1-Click Injection Buttons */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                Suntikkan Hasil Generate Ke Halaman:
              </span>
              <button
                type="button"
                onClick={() => {
                  onApplyArticleToAmpSeo(generatedArticle);
                  showToast('⚡ Konten, Heading, Meta & FAQ berhasil disinkronkan ke AMP Generator!');
                }}
                className="w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-bold transition flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Terapkan ke AMP Landing Page</span>
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Result Output Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Pratinjau Artikel SEO Siap Pakai
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      `${generatedArticle.heading}\n\n${generatedArticle.contentParagraph}\n\nMeta Description:\n${generatedArticle.metaDescription}`,
                      'full-article'
                    )
                  }
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  {copiedId === 'full-article' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Semua Teks</span>
                </button>
              </div>

              {/* Title & Heading */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-mono">H1 / Main Heading</span>
                <h4 className="text-sm font-black text-white">{generatedArticle.heading}</h4>
                <p className="text-xs text-amber-400/90 font-medium italic">{generatedArticle.subheading}</p>
              </div>

              {/* Content Paragraph */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Body Paragraph (SEO Natural)</span>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {generatedArticle.contentParagraph}
                </div>
              </div>

              {/* Meta Description & Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Meta Description</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{generatedArticle.metaDescription}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Target SEO Keywords</span>
                  <p className="text-amber-300/90 text-[11px] font-mono">{generatedArticle.keywords}</p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono block">
                  FAQ Schema Questions &amp; Answers
                </span>
                <div className="space-y-2">
                  {generatedArticle.faqList.map((faq, i) => (
                    <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs space-y-1">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>Q:</span> {faq.question}
                      </div>
                      <div className="text-slate-400 pl-4 text-[11px]">
                        <span>A:</span> {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROMO & EVENT GENERATOR */}
      {activeTab === 'promo' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs font-black text-slate-400 uppercase shrink-0">Kategori Promo:</span>
            {[
              { id: 'all', label: 'Semua Promo' },
              { id: 'welcome', label: 'Member Baru' },
              { id: 'deposit', label: 'Deposit & Reload' },
              { id: 'cashback', label: 'Cashback' },
              { id: 'rollingan', label: 'Rollingan' },
              { id: 'event', label: 'Event Petir' },
              { id: 'vip', label: 'VIP & Referral' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  filterCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Promos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPromos.map((promo) => (
              <div
                key={promo.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4.5 space-y-3.5 shadow-lg transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-gradient-to-r ${promo.badgeColor} text-slate-950 font-mono`}>
                      {promo.tag}
                    </span>
                    {promo.hot && (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1 font-mono">
                        <Flame className="w-3 h-3 text-rose-500 fill-rose-500" /> HOT
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-black text-white">{promo.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{promo.description}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Min. Deposit:</span>
                      <span className="font-bold text-amber-300">{promo.minDeposit}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Syarat TO:</span>
                      <span className="font-bold text-emerald-400">{promo.turnoverReq}</span>
                    </div>
                  </div>

                  {/* Terms list */}
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400 space-y-1">
                    <span className="font-bold text-slate-300 uppercase block">Syarat &amp; Ketentuan:</span>
                    {promo.terms.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      onApplyPromoToAmp(promo);
                      showToast(`⚡ Promo "${promo.title}" berhasil disuntikkan ke AMP Running Text & Bonus Text!`);
                    }}
                    className="w-full py-1.5 px-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold transition flex items-center justify-between border border-amber-500/20"
                  >
                    <span>Pasang di AMP Landing Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onApplyPromoToPortal(promo);
                      showToast(`✨ Promo "${promo.title}" berhasil dipasang di Portal Utama!`);
                    }}
                    className="w-full py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition flex items-center justify-between"
                  >
                    <span>Pasang di Portal Utama</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
