import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Copy,
  Check,
  UploadCloud,
  Code2,
  Crown,
  MessageSquare,
  Sparkles,
  Zap,
  Sliders,
  FolderPlus,
  Filter,
  Search,
  RotateCcw,
  Flame,
  Gamepad2,
  ShieldCheck,
  Scale,
  TrendingUp,
  Clock,
  ExternalLink,
} from 'lucide-react';
import type { PortalConfig, ViewportMode, DynamicScript, CarouselBanner, GameDemoItem } from '../types';
import { generatePortalHtml } from '../services/generator';
import { ImageInputWithAutoCdn } from './ImageInputWithAutoCdn';
import { BannerCarouselManager } from './BannerCarouselManager';
import { autoConvertLinkToCdn } from '../utils/cdnUtils';
import {
  CATEGORY_GAMES_DATABASE,
  getAllCategoryGames,
  getSummaryCategories,
  getGamesByCategory,
  OFFICIAL_DEMO_GAMES_DATABASE,
  DEFAULT_RTP_GIMMICK_CONFIG,
  DEFAULT_RESPONSIBLE_LEGAL_CONFIG,
  type CategoryProviderItem,
} from '../data/categoryGamesData';
import { generateGameFallbackBadge } from '../utils/gameIcons';

interface PortalGeneratorProps {
  config: PortalConfig;
  scripts: DynamicScript[];
  onChange: (config: PortalConfig) => void;
  onSaveToDrive: () => void;
  onOpenCodePreview: () => void;
  viewportMode: ViewportMode;
}

export const PortalGenerator: React.FC<PortalGeneratorProps> = ({
  config,
  scripts,
  onChange,
  onSaveToDrive,
  onOpenCodePreview,
  viewportMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [convertedToast, setConvertedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'carousel' | 'links' | 'rtp' | 'legal' | 'jackpot' | 'contact'>('links');
  const [editorCategoryFilter, setEditorCategoryFilter] = useState<string>('all');
  const [editorSearchQuery, setEditorSearchQuery] = useState<string>('');
  const [presetModalOpen, setPresetModalOpen] = useState(false);

  const generatedHtml = generatePortalHtml(config, scripts);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoConvertAllImages = () => {
    const newLogo = autoConvertLinkToCdn(config.logoUrl, 'weserv', 'webp');
    const newBanner = autoConvertLinkToCdn(config.heroBannerUrl, 'weserv', 'webp');
    const newCarousel = (config.carouselBanners || []).map((b) => ({
      ...b,
      imageUrl: autoConvertLinkToCdn(b.imageUrl, 'weserv', 'webp', 1200),
    }));
    const newGames = config.gamesOrServices.map((g) => ({
      ...g,
      imageUrl: autoConvertLinkToCdn(g.imageUrl, 'weserv', 'webp', 200),
    }));
    onChange({
      ...config,
      logoUrl: newLogo,
      heroBannerUrl: newBanner,
      carouselBanners: newCarousel,
      gamesOrServices: newGames,
    });
    setConvertedToast(true);
    setTimeout(() => setConvertedToast(false), 2500);
  };

  const handleImportSummaryCategories = (theme: 'gold' | 'cyber' = 'gold') => {
    const summary = getSummaryCategories(theme);
    const formatted = summary.map((item) => ({
      ...item,
      id: `sum-${item.id}-${Date.now()}`,
    }));
    onChange({
      ...config,
      gamesOrServices: formatted,
    });
    setPresetModalOpen(false);
    setConvertedToast(true);
    setTimeout(() => setConvertedToast(false), 2500);
  };

  const handleImportAllCategories = (append = false) => {
    const allProviders = getAllCategoryGames();
    const formatted = allProviders.map((item) => ({
      ...item,
      id: `imported-${item.id}-${Date.now()}`,
    }));
    onChange({
      ...config,
      gamesOrServices: append ? [...config.gamesOrServices, ...formatted] : formatted,
    });
    setPresetModalOpen(false);
    setConvertedToast(true);
    setTimeout(() => setConvertedToast(false), 2500);
  };

  const handleImportCategorySpecific = (categoryKey: string, append = false) => {
    const providers = getGamesByCategory(categoryKey);
    const formatted = providers.map((item) => ({
      ...item,
      id: `imported-${item.id}-${Date.now()}`,
    }));
    onChange({
      ...config,
      gamesOrServices: append ? [...config.gamesOrServices, ...formatted] : formatted,
    });
    setPresetModalOpen(false);
  };

  const handleAddGame = () => {
    const newId = `game-${Date.now()}`;
    onChange({
      ...config,
      gamesOrServices: [
        {
          id: newId,
          title: 'Provider Baru',
          category: editorCategoryFilter !== 'all' ? editorCategoryFilter : 'Slots',
          imageUrl: 'https://files.sitestatic.net/images/ppslot.gif?v=1.0',
          linkUrl: config.primaryCtaUrl || '#',
          hot: false,
        },
        ...config.gamesOrServices,
      ],
    });
  };

  const handleRemoveGame = (id: string) => {
    onChange({
      ...config,
      gamesOrServices: config.gamesOrServices.filter((g) => g.id !== id),
    });
  };

  const updateGame = (id: string, field: string, value: any) => {
    onChange({
      ...config,
      gamesOrServices: config.gamesOrServices.map((g) =>
        g.id === id ? { ...g, [field]: value } : g
      ),
    });
  };

  // Filter games inside the editor
  const filteredEditorGames = config.gamesOrServices.filter((item) => {
    const matchesCat =
      editorCategoryFilter === 'all' ||
      (item.category || '').toLowerCase() === editorCategoryFilter.toLowerCase();
    const matchesSearch =
      !editorSearchQuery ||
      item.title.toLowerCase().includes(editorSearchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(editorSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const uniqueCategories: string[] = Array.from(
    new Set<string>(config.gamesOrServices.map((g) => g.category || 'General'))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Configuration Panel */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Portal Utama Responsif
              </h2>
              <span className="text-[11px] text-slate-400">Multi-Channel Gaming &amp; Link Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAutoConvertAllImages}
              className="p-2 bg-amber-500/15 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
              title="Auto Convert Semua Link Gambar/Thumbnail ke WebP CDN"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span className="hidden sm:inline">Auto CDN</span>
            </button>
            <button
              onClick={onSaveToDrive}
              className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
              title="Simpan ke Google Drive"
            >
              <UploadCloud className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyCode}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition border border-slate-700"
              title="Salin Kode HTML"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onOpenCodePreview}
              className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition"
              title="Lihat Kode"
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {convertedToast && (
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>⚡ Logo, Banner Hero, dan semua thumbnail game berhasil dikonversi ke CDN WebP!</span>
          </div>
        )}

        {/* Section Tabs */}
        <div className="grid grid-cols-7 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeTab === 'general' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('carousel')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center flex items-center justify-center gap-0.5 ${
              activeTab === 'carousel' ? 'bg-amber-500 text-slate-950' : 'text-amber-400 hover:text-white'
            }`}
          >
            <span>Banner</span>
            {config.enableBannerCarousel && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeTab === 'links' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Links
          </button>
          <button
            onClick={() => setActiveTab('rtp')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center flex items-center justify-center gap-0.5 ${
              activeTab === 'rtp' ? 'bg-amber-500 text-slate-950' : 'text-emerald-400 hover:text-white'
            }`}
            title="RTP Live & Demo Slot Gimmick"
          >
            <span>RTP Demo</span>
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center flex items-center justify-center gap-0.5 ${
              activeTab === 'legal' ? 'bg-amber-500 text-slate-950' : 'text-red-400 hover:text-white'
            }`}
            title="Validasi Umur 18+ & Legal Disclaimer"
          >
            <span>18+ Legal</span>
          </button>
          <button
            onClick={() => setActiveTab('jackpot')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeTab === 'jackpot' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Jackpot
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeTab === 'contact' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kontak
          </button>
        </div>

        {/* Tab: Carousel / Slider (COURSEL) */}
        {activeTab === 'carousel' && (
          <div className="space-y-4">
            <BannerCarouselManager
              enabled={!!config.enableBannerCarousel}
              onToggleEnabled={(enabled) => onChange({ ...config, enableBannerCarousel: enabled })}
              banners={config.carouselBanners || []}
              onChangeBanners={(banners) => onChange({ ...config, carouselBanners: banners })}
              interval={config.carouselInterval || 4}
              onChangeInterval={(interval) => onChange({ ...config, carouselInterval: interval })}
              autoPlay={config.carouselAutoPlay !== false}
              onChangeAutoPlay={(autoPlay) => onChange({ ...config, carouselAutoPlay: autoPlay })}
              fallbackSingleBannerUrl={config.heroBannerUrl}
            />
          </div>
        )}

        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Nama Portal / Brand</label>
              <input
                type="text"
                value={config.siteName}
                onChange={(e) => onChange({ ...config, siteName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-medium focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Slogan Portal</label>
              <input
                type="text"
                value={config.slogan}
                onChange={(e) => onChange({ ...config, slogan: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <ImageInputWithAutoCdn
                label="URL Logo Portal"
                value={config.logoUrl}
                onChange={(val) => onChange({ ...config, logoUrl: val })}
                placeholder="https://example.com/logo.png"
                description="Auto convert link to CDN / drag & drop logo file"
                maxWidth={400}
              />
            </div>

            <div>
              <ImageInputWithAutoCdn
                label="Hero Banner Image URL"
                value={config.heroBannerUrl}
                onChange={(val) => onChange({ ...config, heroBannerUrl: val })}
                placeholder="https://example.com/hero.jpg"
                description="Auto convert link to CDN / drag & drop banner file"
                maxWidth={1200}
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Teks Pengumuman Berjalan (Marquee)</label>
              <textarea
                rows={2}
                value={config.announcementText}
                onChange={(e) => onChange({ ...config, announcementText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">CTA Utama (Daftar)</label>
                <input
                  type="text"
                  value={config.primaryCtaText}
                  onChange={(e) => onChange({ ...config, primaryCtaText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">CTA URL</label>
                <input
                  type="text"
                  value={config.primaryCtaUrl}
                  onChange={(e) => onChange({ ...config, primaryCtaUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Category & Game Provider Grid */}
        {activeTab === 'links' && (
          <div className="space-y-4 text-xs">
            {/* Preset Importer Action Card */}
            <div className="p-3 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-xl border border-amber-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-400 font-black text-xs uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preset Icon & Kategori Game</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Resmi & Cepat</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Pilih tampilan ringkas (icon kategori utama) atau impor seluruh provider resmi lengkap dengan gambar CDN.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleImportSummaryCategories('gold')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-black text-xs shadow-md transition flex items-center gap-1.5"
                  title="Icon Vektor Emas 3D Seragam (Anti-Rungkad & 100% Tampil)"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Icon Seragam Emas (10 Utama)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleImportSummaryCategories('cyber')}
                  className="px-2.5 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 rounded-lg font-bold text-xs border border-cyan-800 transition flex items-center gap-1.5"
                  title="Icon Vektor Cyber Neon Seragam (100% Tampil)"
                >
                  <Flame className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Icon Cyber Neon</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleImportAllCategories(false)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-slate-400" />
                  <span>Semua Provider (130+)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPresetModalOpen(!presetModalOpen)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium text-xs border border-slate-700 transition flex items-center gap-1"
                >
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pilih Kategori</span>
                </button>
              </div>

              {/* Dropdown specific category importer */}
              {presetModalOpen && (
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 mt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pilih Kategori Khusus untuk Dimuat:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CATEGORY_GAMES_DATABASE.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => handleImportCategorySpecific(cat.key, true)}
                        className="p-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded text-left text-[11px] font-medium transition flex items-center justify-between border border-slate-800"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] opacity-75 font-mono">+{cat.items.length}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* In-Editor Search & Category Filtering Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="relative flex-1">
                  <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={editorSearchQuery}
                    onChange={(e) => setEditorSearchQuery(e.target.value)}
                    placeholder="Cari item di editor..."
                    className="w-full pl-7 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddGame}
                  className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg font-bold text-xs flex items-center gap-1 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  type="button"
                  onClick={() => setEditorCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition whitespace-nowrap ${
                    editorCategoryFilter === 'all'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Semua ({config.gamesOrServices.length})
                </button>
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEditorCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition whitespace-nowrap ${
                      editorCategoryFilter.toLowerCase() === cat.toLowerCase()
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat} ({config.gamesOrServices.filter((g) => g.category === cat).length})
                  </button>
                ))}
              </div>
            </div>

            {/* List of Game Provider Items */}
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {filteredEditorGames.length === 0 ? (
                <div className="text-center py-6 text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                  Tidak ada provider yang cocok dengan filter.
                </div>
              ) : (
                filteredEditorGames.map((item) => (
                  <div key={item.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition">
                    <div className="flex items-center gap-2">
                      {/* Thumbnail Preview */}
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                              const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                              if (fallback) fallback.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`${item.imageUrl ? 'hidden' : ''} flex flex-col items-center justify-center text-amber-400`}>
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          value={item.title}
                          placeholder="Nama Provider"
                          onChange={(e) => updateGame(item.id, 'title', e.target.value)}
                          className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-100 font-bold text-xs focus:border-amber-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={item.category}
                          placeholder="Kategori"
                          onChange={(e) => updateGame(item.id, 'category', e.target.value)}
                          className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300 text-xs focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveGame(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-12 gap-1.5 items-center">
                      <div className="col-span-6 relative">
                        <input
                          type="text"
                          value={item.imageUrl}
                          placeholder="URL Gambar / Logo"
                          onChange={(e) => updateGame(item.id, 'imageUrl', e.target.value)}
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-[10px] focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-6">
                        <input
                          type="text"
                          value={item.linkUrl}
                          placeholder="URL Tujuan"
                          onChange={(e) => updateGame(item.id, 'linkUrl', e.target.value)}
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-amber-400 font-mono text-[10px] focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1 text-[10px] text-slate-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!item.hot}
                            onChange={(e) => updateGame(item.id, 'hot', e.target.checked)}
                            className="accent-red-500 rounded"
                          />
                          <span className="text-red-400 font-bold">Badge HOT</span>
                        </label>
                        <label className="flex items-center gap-1 text-[10px] text-slate-400">
                          <span>Badge:</span>
                          <input
                            type="text"
                            value={item.badge || ''}
                            placeholder="NEW / PROMO"
                            onChange={(e) => updateGame(item.id, 'badge', e.target.value)}
                            className="w-16 px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-amber-400 font-bold text-[9px] uppercase focus:outline-none"
                          />
                        </label>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const cdn = autoConvertLinkToCdn(item.imageUrl, 'weserv', 'webp', 200);
                            updateGame(item.id, 'imageUrl', cdn);
                          }}
                          className="px-1.5 py-0.5 bg-sky-500/15 text-sky-400 rounded text-[9px] font-bold hover:bg-sky-500/25 transition"
                          title="Convert ke Weserv WebP"
                        >
                          ⚡ Weserv
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab: RTP & Demo Slot Gimmick Engine */}
        {activeTab === 'rtp' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white block">Aktifkan Section RTP Live & Demo</span>
                <span className="text-[11px] text-slate-400">Menampilkan live rating RTP slot, jam gacor, pola spin, & demo player</span>
              </div>
              <input
                type="checkbox"
                checked={config.rtpGimmick?.enabled !== false}
                onChange={(e) =>
                  onChange({
                    ...config,
                    rtpGimmick: {
                      ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG),
                      enabled: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 accent-emerald-500"
              />
            </div>

            {config.rtpGimmick?.enabled !== false && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Headline Section RTP</label>
                  <input
                    type="text"
                    value={config.rtpGimmick?.headline || ''}
                    placeholder="RTP Live & Demo Slot Gacor Hari Ini"
                    onChange={(e) =>
                      onChange({
                        ...config,
                        rtpGimmick: {
                          ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG),
                          headline: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300 font-semibold">Live Fluktuasi Angka</span>
                    <input
                      type="checkbox"
                      checked={config.rtpGimmick?.enableLiveFluctuation !== false}
                      onChange={(e) =>
                        onChange({
                          ...config,
                          rtpGimmick: {
                            ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG),
                            enableLiveFluctuation: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-amber-500"
                    />
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300 font-semibold">Tampilkan Pola Spin</span>
                    <input
                      type="checkbox"
                      checked={config.rtpGimmick?.showPolaGacor !== false}
                      onChange={(e) =>
                        onChange({
                          ...config,
                          rtpGimmick: {
                            ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG),
                            showPolaGacor: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-white uppercase text-[10px]">Daftar Game Demo ({config.rtpGimmick?.demoGames?.length || OFFICIAL_DEMO_GAMES_DATABASE.length})</span>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...config,
                        rtpGimmick: {
                          ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG),
                          demoGames: OFFICIAL_DEMO_GAMES_DATABASE,
                        },
                      })
                    }
                    className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Demo Database
                  </button>
                </div>

                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {(config.rtpGimmick?.demoGames || OFFICIAL_DEMO_GAMES_DATABASE).map((demo, idx) => (
                    <div key={demo.id || idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={demo.iconUrl}
                            alt={demo.name}
                            className="w-6 h-6 rounded object-contain bg-slate-900 p-0.5"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = generateGameFallbackBadge(demo.name, demo.provider);
                            }}
                          />
                          <span className="font-bold text-slate-100">{demo.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({demo.provider})</span>
                        </div>
                        <span className="font-black text-amber-400 font-mono text-xs">{demo.rtpPercent}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <label className="text-slate-500 block">Jam Gacor</label>
                          <input
                            type="text"
                            value={demo.jamGacor || ''}
                            onChange={(e) => {
                              const updated = [...(config.rtpGimmick?.demoGames || OFFICIAL_DEMO_GAMES_DATABASE)];
                              updated[idx] = { ...updated[idx], jamGacor: e.target.value };
                              onChange({
                                ...config,
                                rtpGimmick: { ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG), demoGames: updated },
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 block">Pola Spin</label>
                          <input
                            type="text"
                            value={demo.polaSpin || ''}
                            onChange={(e) => {
                              const updated = [...(config.rtpGimmick?.demoGames || OFFICIAL_DEMO_GAMES_DATABASE)];
                              updated[idx] = { ...updated[idx], polaSpin: e.target.value };
                              onChange({
                                ...config,
                                rtpGimmick: { ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG), demoGames: updated },
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">URL Demo Sumber Asli</label>
                        <input
                          type="text"
                          value={demo.demoUrl}
                          onChange={(e) => {
                            const updated = [...(config.rtpGimmick?.demoGames || OFFICIAL_DEMO_GAMES_DATABASE)];
                            updated[idx] = { ...updated[idx], demoUrl: e.target.value };
                            onChange({
                              ...config,
                              rtpGimmick: { ...(config.rtpGimmick || DEFAULT_RTP_GIMMICK_CONFIG), demoGames: updated },
                            });
                          }}
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-[10px] text-sky-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Responsible Gaming & 18+ Legal Compliance */}
        {activeTab === 'legal' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white block">Validasi Umur 18+ Non-Koersif</span>
                <span className="text-[11px] text-slate-400">Menampilkan banner peringatan usia & kepatuhan hukum tanpa memblokir paksa</span>
              </div>
              <input
                type="checkbox"
                checked={config.responsibleLegal?.enableAgeGate !== false}
                onChange={(e) =>
                  onChange({
                    ...config,
                    responsibleLegal: {
                      ...(config.responsibleLegal || DEFAULT_RESPONSIBLE_LEGAL_CONFIG),
                      enableAgeGate: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 accent-red-500"
              />
            </div>

            {config.responsibleLegal?.enableAgeGate !== false && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Badge Usia Minimum</label>
                  <input
                    type="text"
                    value={config.responsibleLegal?.ageLimitText || '18+'}
                    onChange={(e) =>
                      onChange({
                        ...config,
                        responsibleLegal: {
                          ...(config.responsibleLegal || DEFAULT_RESPONSIBLE_LEGAL_CONFIG),
                          ageLimitText: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-red-400 font-bold focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Judul Peringatan Legal</label>
                  <input
                    type="text"
                    value={config.responsibleLegal?.modalTitle || ''}
                    placeholder="Responsible Gaming & Validasi Usia"
                    onChange={(e) =>
                      onChange({
                        ...config,
                        responsibleLegal: {
                          ...(config.responsibleLegal || DEFAULT_RESPONSIBLE_LEGAL_CONFIG),
                          modalTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Disclaimer Hukum (Non-Paksaan)</label>
                  <textarea
                    rows={3}
                    value={config.responsibleLegal?.disclaimerText || ''}
                    placeholder="Platform ini menyajikan info RTP dan demo simulasi semata. Tidak ada paksaan bermain maupun jaminan keuntungan."
                    onChange={(e) =>
                      onChange({
                        ...config,
                        responsibleLegal: {
                          ...(config.responsibleLegal || DEFAULT_RESPONSIBLE_LEGAL_CONFIG),
                          disclaimerText: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                    <ShieldCheck className="w-4 h-4" /> Kepatuhan Standar Industri &amp; Sertifikasi
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Badge sertifikasi otomatis aktif di footer: <strong>18+ Adult</strong>, <strong>BMM Testlabs</strong>, <strong>GLI-19 Standard</strong>, <strong>256-Bit SSL</strong>, dan <strong>BeGambleAware</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Jackpot */}
        {activeTab === 'jackpot' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white block">Tampilkan Ticker Jackpot</span>
                <span className="text-[11px] text-slate-400">Menghidupkan counter animasi progressive jackpot</span>
              </div>
              <input
                type="checkbox"
                checked={config.showJackpotTicker}
                onChange={(e) => onChange({ ...config, showJackpotTicker: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
            </div>

            {config.showJackpotTicker && (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Prefix Jackpot (Mata Uang)</label>
                  <input
                    type="text"
                    value={config.jackpotPrefix}
                    onChange={(e) => onChange({ ...config, jackpotPrefix: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Nominal Awal Jackpot</label>
                  <input
                    type="text"
                    value={config.jackpotAmount}
                    onChange={(e) => onChange({ ...config, jackpotAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Contact Shortcuts */}
        {activeTab === 'contact' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white block">Floating Contact Widgets</span>
                <span className="text-[11px] text-slate-400">Tombol melayang WhatsApp dan Telegram 24/7</span>
              </div>
              <input
                type="checkbox"
                checked={config.showFloatingContact}
                onChange={(e) => onChange({ ...config, showFloatingContact: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Nomor WhatsApp (Format: 62812...)</label>
              <input
                type="text"
                value={config.whatsappNumber}
                onChange={(e) => onChange({ ...config, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Username Telegram (Tanpa @)</label>
              <input
                type="text"
                value={config.telegramUsername}
                onChange={(e) => onChange({ ...config, telegramUsername: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sky-400 font-mono text-xs focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Teks Copyright Footer</label>
              <input
                type="text"
                value={config.footerText}
                onChange={(e) => onChange({ ...config, footerText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Live Visual Stage */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col items-center">
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">Portal Preview Stage</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Tailwind CSS + FontAwesome Engine</span>
        </div>

        <div
          className={`transition-all duration-300 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl ${
            viewportMode === 'mobile'
              ? 'w-[390px] h-[680px]'
              : viewportMode === 'tablet'
              ? 'w-[620px] h-[720px]'
              : 'w-full h-[720px]'
          }`}
        >
          <iframe
            title="Portal Live Preview"
            srcDoc={generatedHtml}
            className="w-full h-full border-0 bg-slate-950"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
};
