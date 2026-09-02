import React, { useState } from 'react';
import {
  Zap,
  Sparkles,
  Sliders,
  FileCheck,
  Globe,
  Palette,
  Image as ImageIcon,
  Flame,
  Plus,
  Trash2,
  Copy,
  Check,
  UploadCloud,
  Code2,
  RefreshCw,
  Layers,
  Star,
  DollarSign,
  TrendingUp,
  Percent,
  ShieldAlert,
  MessageCircle,
} from 'lucide-react';
import type { AmpConfig, ViewportMode, CarouselBanner, AmpTemplatePreset } from '../types';
import { generateAmpHtml } from '../services/generator';
import { ImageInputWithAutoCdn } from './ImageInputWithAutoCdn';
import { BannerCarouselManager } from './BannerCarouselManager';
import { autoConvertLinkToCdn } from '../utils/cdnUtils';

interface AmpGeneratorProps {
  config: AmpConfig;
  onChange: (config: AmpConfig) => void;
  onSaveToDrive: () => void;
  onOpenCodePreview: () => void;
  viewportMode: ViewportMode;
}

const TEMPLATE_PRESET_OPTIONS: { id: AmpTemplatePreset; name: string; desc: string; tag: string; color: string }[] = [
  { id: 'rtp-zenvia', name: 'RTP Slot Zenvia', desc: 'Splash Screen + 4-Grid + Neon Purple/Cyan + Sticky Bar', tag: 'Skema 1', color: 'from-purple-600 to-indigo-600' },
  { id: 'beton-cyber', name: 'BETON138 Cyber Gold', desc: 'Scanlines CRT + Glowing Buttons + Stats Grid + Spec Table', tag: 'Skema 2', color: 'from-amber-600 to-yellow-500' },
  { id: 'toto-red', name: 'TOTO12 Red Glass', desc: 'Light Beam Glass + Dual Server Action + Responsive Grid', tag: 'Skema 3', color: 'from-red-600 to-rose-700' },
  { id: 'nagabet-galaxy', name: 'NAGABET76 Galaxy', desc: 'Space Meteors + Thunder Bolt + Glowing Cyan Badges', tag: 'Skema 4', color: 'from-amber-500 to-red-600' },
  { id: 'toto-carousel', name: 'TOTO12 Carousel & Bank', desc: 'AMP Carousel Slider + Bank Status Indicator Grid', tag: 'Skema 5', color: 'from-blue-600 to-emerald-600' },
  { id: 'demo-grid', name: 'Demo PG Slot Grid', desc: 'Interactive AMP Game Selector Grid + Maxwin Badges', tag: 'Skema 6', color: 'from-cyan-600 to-blue-700' },
  { id: 'standard', name: 'Standard AMP Classic', desc: 'Custom Modular Hero + Feature Cards + SEO Article', tag: 'Classic', color: 'from-slate-600 to-slate-800' },
];

export const AmpGenerator: React.FC<AmpGeneratorProps> = ({
  config,
  onChange,
  onSaveToDrive,
  onOpenCodePreview,
  viewportMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [convertedToast, setConvertedToast] = useState(false);
  const [activeSection, setActiveSection] = useState<'template' | 'content' | 'carousel' | 'marquee' | 'seo' | 'style'>('template');

  const currentPreset = config.templatePreset || 'rtp-zenvia';
  const generatedHtml = generateAmpHtml(config);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoConvertAllImages = () => {
    const newLogo = autoConvertLinkToCdn(config.logoUrl, 'weserv', 'webp');
    const newBanner = autoConvertLinkToCdn(config.bannerGifUrl, 'weserv', 'webp');
    const newCarousel = (config.carouselBanners || []).map((b) => ({
      ...b,
      imageUrl: autoConvertLinkToCdn(b.imageUrl, 'weserv', 'webp', 720),
    }));
    onChange({
      ...config,
      logoUrl: newLogo,
      bannerGifUrl: newBanner,
      carouselBanners: newCarousel,
    });
    setConvertedToast(true);
    setTimeout(() => setConvertedToast(false), 2500);
  };

  const handleSelectTemplatePreset = (presetId: AmpTemplatePreset) => {
    onChange({
      ...config,
      templatePreset: presetId,
    });
  };

  const handleAddFeature = () => {
    onChange({
      ...config,
      features: [
        ...config.features,
        { icon: '⭐', title: 'Fitur Baru VIP', desc: 'Deskripsi keunggulan layanan' },
      ],
    });
  };

  const handleRemoveFeature = (index: number) => {
    onChange({
      ...config,
      features: config.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...config.features];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...config, features: updated });
  };

  // Color presets
  const presets = [
    { name: 'Amber Gold', primary: '#f59e0b', accent: '#eab308', bg: '#0b0f17' },
    { name: 'Cyber Neon', primary: '#06b6d4', accent: '#3b82f6', bg: '#030712' },
    { name: 'Emerald VIP', primary: '#10b981', accent: '#059669', bg: '#061a14' },
    { name: 'Crimson Red', primary: '#ef4444', accent: '#dc2626', bg: '#14080a' },
    { name: 'Royal Purple', primary: '#a855f7', accent: '#8b5cf6', bg: '#0f081d' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Control Panel (5 Cols) */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Google AMP Designer
              </h2>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <FileCheck className="w-3 h-3" /> Valid ⚡ AMP HTML Specification
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAutoConvertAllImages}
              className="p-2 bg-amber-500/15 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
              title="Auto Convert Semua Link Gambar/GIF ke WebP CDN"
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
              title="Salin Kode AMP"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onOpenCodePreview}
              className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition"
              title="Lihat Full Code"
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {convertedToast && (
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>⚡ Semua link gambar &amp; GIF berhasil dikonversi ke CDN WebP otomatis!</span>
          </div>
        )}

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-6 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveSection('template')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center flex items-center justify-center gap-1 ${
              activeSection === 'template' ? 'bg-amber-500 text-slate-950 shadow' : 'text-amber-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Skema</span>
          </button>
          <button
            onClick={() => setActiveSection('content')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeSection === 'content' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Konten
          </button>
          <button
            onClick={() => setActiveSection('carousel')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center flex items-center justify-center gap-0.5 ${
              activeSection === 'carousel' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Slider</span>
            {config.enableCarousel && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>
          <button
            onClick={() => setActiveSection('marquee')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeSection === 'marquee' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Marquee
          </button>
          <button
            onClick={() => setActiveSection('seo')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeSection === 'seo' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            SEO
          </button>
          <button
            onClick={() => setActiveSection('style')}
            className={`py-1.5 px-1 rounded-lg font-bold transition text-center ${
              activeSection === 'style' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tema
          </button>
        </div>

        {/* Tab 0: Skema Template Presets */}
        {activeSection === 'template' && (
          <div className="space-y-3 animate-fadeIn text-xs">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Pilih Skema Template AMP Baru:
              </label>
              <span className="text-[10px] text-slate-400 font-mono">100% AMP Valid</span>
            </div>

            <div className="space-y-2">
              {TEMPLATE_PRESET_OPTIONS.map((tpl) => {
                const isSelected = currentPreset === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleSelectTemplatePreset(tpl.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-gradient-to-r ${tpl.color} text-white font-mono`}>
                          {tpl.tag}
                        </span>
                        <span className={`text-xs font-black ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                          {tpl.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {tpl.desc}
                      </p>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                        isSelected ? 'border-amber-400 bg-amber-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Template Specific Quick Info */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider block">
                Parameter Khusus Skema ({currentPreset}):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Min Deposit</label>
                  <input
                    type="text"
                    value={config.minDeposit || 'Rp 10.000'}
                    onChange={(e) => onChange({ ...config, minDeposit: e.target.value })}
                    placeholder="Rp 10.000"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-amber-300 font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Min Withdraw</label>
                  <input
                    type="text"
                    value={config.minWithdraw || 'Rp 50.000'}
                    onChange={(e) => onChange({ ...config, minWithdraw: e.target.value })}
                    placeholder="Rp 50.000"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">RTP Win Rate</label>
                  <input
                    type="text"
                    value={config.rtpRate || '98.8%'}
                    onChange={(e) => onChange({ ...config, rtpRate: e.target.value })}
                    placeholder="98.8%"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-emerald-400 font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Bonus / Event Text</label>
                  <input
                    type="text"
                    value={config.bonusText || 'Garansi Kekalahan 100%'}
                    onChange={(e) => onChange({ ...config, bonusText: e.target.value })}
                    placeholder="Garansi Kekalahan 100%"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-amber-300 font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Carousel / Slider (COURSEL) */}
        {activeSection === 'carousel' && (
          <div className="space-y-4">
            <BannerCarouselManager
              enabled={!!config.enableCarousel}
              onToggleEnabled={(enabled) => onChange({ ...config, enableCarousel: enabled })}
              banners={config.carouselBanners || []}
              onChangeBanners={(banners) => onChange({ ...config, carouselBanners: banners })}
              interval={config.carouselInterval || 4}
              onChangeInterval={(interval) => onChange({ ...config, carouselInterval: interval })}
              fallbackSingleBannerUrl={config.bannerGifUrl}
            />
          </div>
        )}

        {/* Tab 1: Konten */}
        {activeSection === 'content' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Nama Brand / Situs</label>
              <input
                type="text"
                value={config.brandName}
                onChange={(e) => onChange({ ...config, brandName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-medium focus:border-amber-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Judul Landing Page (Title Tag)</label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => onChange({ ...config, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-medium focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Tagline Singkat</label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => onChange({ ...config, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-medium focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <ImageInputWithAutoCdn
                label="URL Logo Header (HTTPS)"
                value={config.logoUrl}
                onChange={(val) => onChange({ ...config, logoUrl: val })}
                placeholder="https://example.com/logo.png"
                description="Auto convert link to CDN / drag & drop logo file"
                maxWidth={400}
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Target Link CTA (Tujuan Login / Register)</label>
              <input
                type="text"
                value={config.targetUrl}
                onChange={(e) => onChange({ ...config, targetUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono text-[11px] focus:border-amber-500 focus:outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Teks Tombol CTA Utama</label>
                <input
                  type="text"
                  value={config.ctaText}
                  onChange={(e) => onChange({ ...config, ctaText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Subtext Tombol CTA</label>
                <input
                  type="text"
                  value={config.ctaSubtext}
                  onChange={(e) => onChange({ ...config, ctaSubtext: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Link Login (Sekunder)</label>
                <input
                  type="text"
                  value={config.ctaSecondaryUrl || ''}
                  onChange={(e) => onChange({ ...config, ctaSecondaryUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-cyan-300 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Link LiveChat</label>
                <input
                  type="text"
                  value={config.liveChatUrl || ''}
                  onChange={(e) => onChange({ ...config, liveChatUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-300 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Feature list */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Fitur Keunggulan ({config.features.length})</label>
                <button
                  onClick={handleAddFeature}
                  className="text-amber-400 hover:text-amber-300 font-bold text-[10px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Tambah Fitur
                </button>
              </div>

              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {config.features.map((feat, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                    <input
                      type="text"
                      value={feat.icon}
                      onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                      className="w-8 text-center px-1 py-1 bg-slate-900 border border-slate-700 rounded text-sm"
                    />
                    <input
                      type="text"
                      value={feat.title}
                      placeholder="Judul"
                      onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                      className="w-1/3 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200 text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={feat.desc}
                      placeholder="Keterangan"
                      onChange={(e) => updateFeature(idx, 'desc', e.target.value)}
                      className="flex-grow px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200 text-xs"
                    />
                    <button
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Running Text & GIF */}
        {activeSection === 'marquee' && (
          <div className="space-y-4 text-xs">
            <div>
              <ImageInputWithAutoCdn
                label="Animasi GIF / Banner (amp-anim / amp-img)"
                value={config.bannerGifUrl}
                onChange={(val) => onChange({ ...config, bannerGifUrl: val })}
                placeholder="https://media.giphy.com/.../giphy.gif"
                description="Gunakan URL GIF atau CDN image untuk animasi Google AMP valid"
                maxWidth={720}
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                Teks Running Text (Marquee Bar)
              </label>
              <textarea
                rows={3}
                value={config.runningText}
                onChange={(e) => onChange({ ...config, runningText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Kecepatan Animasi: {config.runningTextSpeed} detik
                </label>
                <input
                  type="range"
                  min="6"
                  max="30"
                  value={config.runningTextSpeed}
                  onChange={(e) => onChange({ ...config, runningTextSpeed: parseInt(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Warna Latar Running Text
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.runningTextBg.startsWith('#') ? config.runningTextBg : '#b45309'}
                    onChange={(e) => onChange({ ...config, runningTextBg: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.runningTextBg}
                    onChange={(e) => onChange({ ...config, runningTextBg: e.target.value })}
                    className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SEO & Schema */}
        {activeSection === 'seo' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Canonical URL (Wajib AMP)</label>
              <input
                type="text"
                value={config.canonicalUrl}
                onChange={(e) => onChange({ ...config, canonicalUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={config.metaDescription}
                onChange={(e) => onChange({ ...config, metaDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Meta Keywords</label>
              <input
                type="text"
                value={config.keywords}
                onChange={(e) => onChange({ ...config, keywords: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Judul SEO Heading (H2)</label>
              <input
                type="text"
                value={config.seoHeading}
                onChange={(e) => onChange({ ...config, seoHeading: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Konten Paragraf SEO</label>
              <textarea
                rows={3}
                value={config.seoParagraph}
                onChange={(e) => onChange({ ...config, seoParagraph: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Theme Style */}
        {activeSection === 'style' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-2">Preset Palet Warna</label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      onChange({
                        ...config,
                        themeColor: preset.primary,
                        accentColor: preset.accent,
                        bgColor: preset.bg,
                      })
                    }
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left group"
                  >
                    <span className="font-semibold text-slate-200 text-xs">{preset.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.accent }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Primary</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.themeColor}
                    onChange={(e) => onChange({ ...config, themeColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.themeColor}
                    onChange={(e) => onChange({ ...config, themeColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-[10px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Accent</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => onChange({ ...config, accentColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.accentColor}
                    onChange={(e) => onChange({ ...config, accentColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-[10px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Background</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.bgColor}
                    onChange={(e) => onChange({ ...config, bgColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.bgColor}
                    onChange={(e) => onChange({ ...config, bgColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Live Visual Canvas Preview (7 Cols) */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col items-center">
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">Interactive Visual Stage</span>
            <span className="text-[10px] font-mono text-slate-400">
              ({viewportMode === 'mobile' ? '390px Mobile View' : viewportMode === 'tablet' ? '600px Tablet View' : 'Full Width'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
              ⚡ {currentPreset.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Responsive Frame */}
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
            title="AMP Live Preview"
            srcDoc={generatedHtml}
            className="w-full h-full border-0 bg-slate-950"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

