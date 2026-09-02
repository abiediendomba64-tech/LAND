import React, { useState } from 'react';
import {
  Link2,
  RefreshCw,
  Image as ImageIcon,
  Check,
  Zap,
  Globe,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Flame,
  Search,
  Sparkles,
  Layers,
  MessageCircle,
  ShieldAlert,
} from 'lucide-react';
import { ImageInputWithAutoCdn } from './ImageInputWithAutoCdn';
import type { AmpTemplatePreset } from '../types';

export interface BrandPresetItem {
  id: AmpTemplatePreset;
  name: string;
  badge: string;
  badgeColor: string;
  brandName: string;
  logoUrl: string;
  bannerUrl: string;
  registerUrl: string;
  loginUrl: string;
  liveChatUrl: string;
  altUrl: string;
  canonicalUrl: string;
  tagline?: string;
  themeColor?: string;
  accentColor?: string;
  bgColor?: string;
}

export const BRAND_PRESETS: BrandPresetItem[] = [
  {
    id: 'rtp-zenvia',
    name: 'RTP Slot Live Maxwin',
    badge: 'SKEMA 1: ZENVIA',
    badgeColor: 'from-purple-600 to-indigo-600',
    brandName: 'RTP SLOT',
    logoUrl: 'https://www.dothanmetalbuildings.com/img/logo.png',
    bannerUrl: 'https://www.dothanmetalbuildings.com/img/rtp.png',
    registerUrl: 'https://heylink.id/vexana',
    loginUrl: 'https://heylink.id/vexana',
    liveChatUrl: 'https://heylink.id/vexana',
    altUrl: 'https://heylink.id/vexana',
    canonicalUrl: 'https://www.dothanmetalbuildings.com/',
    tagline: 'Agen Situs Slot Dengan RTP Live 98% Pasti Maxwin Malam Ini',
    themeColor: '#0a0518',
    accentColor: '#00d4ff',
    bgColor: '#0a0518',
  },
  {
    id: 'beton-cyber',
    name: 'BETON138 Cyber Gold',
    badge: 'SKEMA 2: CYBER GLOW',
    badgeColor: 'from-amber-600 to-yellow-500',
    brandName: 'BETON138',
    logoUrl: 'https://asset777.b-cdn.net/gif-icon/gif-beton138/GIF%20LOGO%20ANIMATION%20BETON138.gif',
    bannerUrl: 'https://asset777.b-cdn.net/BETON138/baner-16.webp',
    registerUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    loginUrl: 'https://rebrand.ly/betonlogin-MS',
    liveChatUrl: 'https://rebrand.ly/beton138livechat',
    altUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    canonicalUrl: 'https://ratskeller-niedernhausen.com/',
    tagline: 'Situs Slot Gacor Hari Ini & Bocoran RTP Live 24 Jam',
    themeColor: '#0F0B02',
    accentColor: '#bbbe00',
    bgColor: '#0F0B02',
  },
  {
    id: 'toto-red',
    name: 'TOTO12 Red Glass Shine',
    badge: 'SKEMA 3: RED SHINE',
    badgeColor: 'from-red-600 to-rose-700',
    brandName: 'TOTO12',
    logoUrl: 'https://photosaya.io/images/2024/07/09/toto12-ezgif.com-resize.gif',
    bannerUrl: 'https://photosaya.io/images/2025/03/29/500x500-BANDAR-TERPECAYA.jpg',
    registerUrl: 'https://sayakale.me/UCxZJD',
    loginUrl: 'https://kitakale.me/kqsqCP',
    liveChatUrl: 'https://kitakale.me/LIVECHAT',
    altUrl: 'https://gacorbos.me/n0E7u2',
    canonicalUrl: 'https://toto12.online/',
    tagline: 'Link Alternatif Resmi Terpercaya 24 Jam',
    themeColor: '#ff0000',
    accentColor: '#ffffff',
    bgColor: '#000000',
  },
  {
    id: 'nagabet-galaxy',
    name: 'NAGABET76 Galaxy Petir',
    badge: 'SKEMA 4: GALAXY BOLT',
    badgeColor: 'from-amber-500 to-red-600',
    brandName: 'NAGABET76',
    logoUrl: 'https://www.lestedosol.com/img/nagabet76-logo.png',
    bannerUrl: 'https://i.imgur.com/PkbO0tE.jpeg',
    registerUrl: 'https://petir-nagabet76.pages.dev',
    loginUrl: 'https://petir-nagabet76.pages.dev',
    liveChatUrl: 'https://petir-nagabet76.pages.dev',
    altUrl: 'https://petir-nagabet76.pages.dev',
    canonicalUrl: 'https://www.lestedosol.com/contos/almanaques',
    tagline: 'Solusi Terbaik Untuk Pemula Mudah Menang Bermain Game Online Digital',
    themeColor: '#8b1118',
    accentColor: '#f2c94c',
    bgColor: '#050000',
  },
  {
    id: 'toto-carousel',
    name: 'TOTO12 Carousel & Bank Grid',
    badge: 'SKEMA 5: CAROUSEL BANK',
    badgeColor: 'from-blue-600 to-emerald-600',
    brandName: 'TOTO12',
    logoUrl: 'https://photosaya.io/images/2024/07/09/toto12-ezgif.com-resize.gif',
    bannerUrl: 'https://imagme.com/images/2025/04/23/slide-cari-kita-2.jpeg',
    registerUrl: 'https://kitakale.me/daftartoto12',
    loginUrl: 'https://sayakale.me/toto12',
    liveChatUrl: 'https://kitakale.me/LIVECHAT',
    altUrl: 'https://kitakale.me/daftartoto12',
    canonicalUrl: 'https://toto12.com/',
    tagline: 'Situs Judi Online & Slot Terpercaya',
    themeColor: '#ff0303',
    accentColor: '#ffc107',
    bgColor: '#111111',
  },
  {
    id: 'demo-grid',
    name: 'Demo Slot PG & Pragmatic Grid',
    badge: 'SKEMA 6: DEMO SELECTOR',
    badgeColor: 'from-cyan-600 to-blue-700',
    brandName: 'Demo Slot PG Soft',
    logoUrl: 'https://www.dothanmetalbuildings.com/img/logo.png',
    bannerUrl: 'https://www.dothanmetalbuildings.com/img/rtp.png',
    registerUrl: 'https://chill.ly/daftarkayutogel',
    loginUrl: 'https://chill.ly/kayutogel',
    liveChatUrl: 'https://cutt.ly/Cs-kayutogel',
    altUrl: 'https://chill.ly/daftarkayutogel',
    canonicalUrl: 'https://pgsoftgame.bond/',
    tagline: 'Akun Demo Gratis Gampang Menang x25000',
    themeColor: '#000814',
    accentColor: '#facc15',
    bgColor: '#040914',
  },
];

interface GlobalBrandSyncBarProps {
  autoSync: boolean;
  onToggleAutoSync: () => void;
  onManualSyncAll: () => void;
  brandName: string;
  logoUrl: string;
  bannerUrl: string;
  registerUrl: string;
  loginUrl: string;
  liveChatUrl?: string;
  altUrl?: string;
  canonicalUrl?: string;
  currentTemplatePreset?: AmpTemplatePreset;
  onApplyBrandPreset?: (preset: BrandPresetItem) => void;
  onBatchFindReplace?: (findUrl: string, replaceUrl: string) => void;
  onUpdateGlobalBrand: (updates: {
    brandName?: string;
    logoUrl?: string;
    bannerUrl?: string;
    registerUrl?: string;
    loginUrl?: string;
    liveChatUrl?: string;
    altUrl?: string;
    canonicalUrl?: string;
  }) => void;
}

export const GlobalBrandSyncBar: React.FC<GlobalBrandSyncBarProps> = ({
  autoSync,
  onToggleAutoSync,
  onManualSyncAll,
  brandName,
  logoUrl,
  bannerUrl,
  registerUrl,
  loginUrl,
  liveChatUrl = '',
  altUrl = '',
  canonicalUrl = '',
  currentTemplatePreset = 'rtp-zenvia',
  onApplyBrandPreset,
  onBatchFindReplace,
  onUpdateGlobalBrand,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBatchReplacer, setShowBatchReplacer] = useState(false);
  const [syncedToast, setSyncedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Batch replacer inputs
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setSyncedToast(true);
    setTimeout(() => {
      setSyncedToast(false);
      setToastMessage('');
    }, 2500);
  };

  const handleTriggerSync = () => {
    onManualSyncAll();
    triggerToast('✅ Berhasil! Logo, Banner, dan Link telah disinkronkan ke seluruh halaman.');
  };

  const handleApplyPreset = (preset: BrandPresetItem) => {
    if (onApplyBrandPreset) {
      onApplyBrandPreset(preset);
    } else {
      onUpdateGlobalBrand({
        brandName: preset.brandName,
        logoUrl: preset.logoUrl,
        bannerUrl: preset.bannerUrl,
        registerUrl: preset.registerUrl,
        loginUrl: preset.loginUrl,
        liveChatUrl: preset.liveChatUrl,
        altUrl: preset.altUrl,
        canonicalUrl: preset.canonicalUrl,
      });
    }
    triggerToast(`✨ Berhasil memuat data & link skema: ${preset.name}`);
  };

  const handleExecuteBatchReplace = () => {
    if (!findText.trim()) return;
    if (onBatchFindReplace) {
      onBatchFindReplace(findText.trim(), replaceText.trim());
    } else {
      // Fallback manual replacement
      const repl = (val: string) => (val && val.includes(findText) ? val.replaceAll(findText, replaceText) : val);
      onUpdateGlobalBrand({
        registerUrl: repl(registerUrl),
        loginUrl: repl(loginUrl),
        liveChatUrl: repl(liveChatUrl),
        altUrl: repl(altUrl),
        canonicalUrl: repl(canonicalUrl),
        logoUrl: repl(logoUrl),
        bannerUrl: repl(bannerUrl),
      });
    }
    triggerToast(`🔄 Link "${findText}" berhasil diganti menjadi "${replaceText}" di semua halaman.`);
    setFindText('');
    setReplaceText('');
  };

  return (
    <div className="mb-6 bg-slate-900/95 backdrop-blur border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 shadow-xl transition-all">
      {/* Top compact row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
            autoSync
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-sm shadow-amber-500/20'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            <Zap className={`w-5 h-5 ${autoSync ? 'fill-amber-400 text-amber-400 animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Ganti Brand &amp; Link Batch / Massal
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                autoSync
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {autoSync ? '⚡ AUTO-SYNC AKTIF' : 'MANUAL'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Ubah link brand batch / pilih skema template baru, langsung teraplikasi otomatis ke seluruh halaman.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBatchReplacer(!showBatchReplacer)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              showBatchReplacer
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-indigo-500/30'
            }`}
            title="Buka Alat Ganti Link Massal (Find & Replace URL)"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Ganti Link Batch</span>
          </button>

          <button
            type="button"
            onClick={onToggleAutoSync}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              autoSync
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Aktifkan/Nonaktifkan Sinkronisasi Otomatis Semua Halaman"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>{autoSync ? 'Auto-Sync ON' : 'Auto-Sync OFF'}</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerSync}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            title="Sinkronkan logo, banner, dan link saat ini ke seluruh tab"
          >
            {syncedToast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <RefreshCw className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">Sinkronkan Semua</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs transition"
            title={isExpanded ? 'Tutup Master Brand Editor' : 'Buka Master Brand Editor'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {syncedToast && (
        <div className="mt-3 p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Skema Template Quick Select Badges */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-[10px] font-black text-slate-400 uppercase shrink-0 flex items-center gap-1">
          <Layers className="w-3 h-3 text-amber-400" /> Preset Skema Baru:
        </span>
        {BRAND_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
              currentTemplatePreset === preset.id
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
            title={`Terapkan data link & tema ${preset.name}`}
          >
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${preset.badgeColor}`} />
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* Batch Find & Replace URL Drawer */}
      {showBatchReplacer && (
        <div className="mt-3 p-3.5 bg-slate-950 border border-indigo-500/40 rounded-xl space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              Alat Ganti Link Batch (Find &amp; Replace URL Massal)
            </span>
            <span className="text-[10px] text-slate-400">Ganti link lama di seluruh konfigurasi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-5">
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Cari Link Lama (misal: heylink.id/lama)"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-rose-300 placeholder:text-slate-500 font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-5">
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Ganti Dengan Link Baru (misal: rebrand.ly/baru)"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-emerald-300 placeholder:text-slate-500 font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={handleExecuteBatchReplace}
                disabled={!findText.trim()}
                className="w-full h-full min-h-[32px] px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ganti Semua</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Quick Brand Master Editor */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Master Brand &amp; Link Controller (Ubah Sekali, Berubah di Semua Halaman)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">100% Real-Time Synchronized</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 block">
                Nama Brand / Situs Utama
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => onUpdateGlobalBrand({ brandName: e.target.value })}
                placeholder="Contoh: BETON138 / TOTO12"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none font-bold"
              />
            </div>

            {/* Canonical URL / Main Domain */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 block">
                Canonical URL / Domain Utama
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => onUpdateGlobalBrand({ canonicalUrl: e.target.value })}
                placeholder="https://example.com/"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-purple-300 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            {/* Logo Master */}
            <div>
              <ImageInputWithAutoCdn
                label="Master Logo Website (Sinkron ke AMP, Portal & Register)"
                value={logoUrl}
                onChange={(newUrl) => onUpdateGlobalBrand({ logoUrl: newUrl })}
                placeholder="https://..."
                defaultCdn="weserv"
                preferredFormat="webp"
                previewHeight={40}
              />
            </div>

            {/* Banner Master */}
            <div>
              <ImageInputWithAutoCdn
                label="Master Banner / Hero Banner (Sinkron ke AMP & Portal)"
                value={bannerUrl}
                onChange={(newUrl) => onUpdateGlobalBrand({ bannerUrl: newUrl })}
                placeholder="https://..."
                defaultCdn="weserv"
                preferredFormat="webp"
                previewHeight={40}
              />
            </div>

            {/* Master Register Link */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>Link Pendaftaran / Daftar Akun (Tombol Utama)</span>
              </label>
              <input
                type="url"
                value={registerUrl}
                onChange={(e) => onUpdateGlobalBrand({ registerUrl: e.target.value })}
                placeholder="https://domain.com/register"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            {/* Master Login Link */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-cyan-400" />
                <span>Link Masuk / Login Resmi (Tombol Sekunder)</span>
              </label>
              <input
                type="url"
                value={loginUrl}
                onChange={(e) => onUpdateGlobalBrand({ loginUrl: e.target.value })}
                placeholder="https://domain.com/login"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-cyan-300 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            {/* Master Livechat Link */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span>Link LiveChat 24 Jam</span>
              </label>
              <input
                type="url"
                value={liveChatUrl}
                onChange={(e) => onUpdateGlobalBrand({ liveChatUrl: e.target.value })}
                placeholder="https://domain.com/livechat"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-300 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            {/* Master Link Alternatif */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-yellow-400" />
                <span>Link Alternatif Resmi</span>
              </label>
              <input
                type="url"
                value={altUrl}
                onChange={(e) => onUpdateGlobalBrand({ altUrl: e.target.value })}
                placeholder="https://domain.com/alternatif"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-yellow-300 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

