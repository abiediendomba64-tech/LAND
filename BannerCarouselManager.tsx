import React, { useState } from 'react';
import {
  Sliders,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Layers,
  Sparkles,
  Zap,
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  Link as LinkIcon,
  HelpCircle,
  FileText,
} from 'lucide-react';
import type { CarouselBanner } from '../types';
import { ImageInputWithAutoCdn } from './ImageInputWithAutoCdn';

interface BannerCarouselManagerProps {
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  banners: CarouselBanner[];
  onChangeBanners: (banners: CarouselBanner[]) => void;
  interval?: number;
  onChangeInterval?: (interval: number) => void;
  autoPlay?: boolean;
  onChangeAutoPlay?: (autoPlay: boolean) => void;
  fallbackSingleBannerUrl: string;
}

export const BannerCarouselManager: React.FC<BannerCarouselManagerProps> = ({
  enabled,
  onToggleEnabled,
  banners,
  onChangeBanners,
  interval = 4,
  onChangeInterval,
  autoPlay = true,
  onChangeAutoPlay,
  fallbackSingleBannerUrl,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [bulkInputOpen, setBulkInputOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const handleAddSlide = () => {
    const newSlide: CarouselBanner = {
      id: `banner-${Date.now()}`,
      imageUrl: '',
      title: `Promo Banner #${banners.length + 1}`,
      linkUrl: '#',
      badge: 'PROMO',
    };
    const updated = [...banners, newSlide];
    onChangeBanners(updated);
    setActiveSlideIndex(updated.length - 1);
  };

  const handleRemoveSlide = (index: number) => {
    const updated = banners.filter((_, i) => i !== index);
    onChangeBanners(updated);
    if (activeSlideIndex >= updated.length) {
      setActiveSlideIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= banners.length) return;
    const updated = [...banners];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChangeBanners(updated);
    setActiveSlideIndex(targetIndex);
  };

  const handleUpdateSlide = (index: number, field: keyof CarouselBanner, value: string) => {
    const updated = banners.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChangeBanners(updated);
  };

  const handleBulkAdd = () => {
    if (!bulkText.trim()) return;
    // Extract any http/https links
    const lines = bulkText.split(/\r?\n|\s+/).filter((l) => l.startsWith('http://') || l.startsWith('https://'));
    if (lines.length === 0) {
      alert('Tidak ditemukan URL valid (harus diawali http:// atau https://)');
      return;
    }

    const newBanners: CarouselBanner[] = lines.map((url, idx) => ({
      id: `banner-bulk-${Date.now()}-${idx}`,
      imageUrl: url.trim(),
      title: `Banner Slide #${banners.length + idx + 1}`,
      linkUrl: '#',
      badge: 'HOT',
    }));

    onChangeBanners([...banners, ...newBanners]);
    setBulkText('');
    setBulkInputOpen(false);
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      {/* Header & Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
              <span>Multi-Banner Carousel Slider</span>
              <span className="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
                COURSEL
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Rotasi banner promo otomatis dengan slide navigation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => onToggleEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
      </div>

      {enabled && (
        <div className="space-y-4 pt-2 border-t border-slate-800/80">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[11px]">
            <div className="flex items-center gap-3">
              {onChangeInterval && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-400">Durasi Slide:</span>
                  <select
                    value={interval}
                    onChange={(e) => onChangeInterval(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-[11px] rounded px-2 py-1 focus:outline-none"
                  >
                    <option value={2.5}>2.5 Detik (Cepat)</option>
                    <option value={3}>3 Detik</option>
                    <option value={4}>4 Detik (Standar)</option>
                    <option value={5}>5 Detik</option>
                    <option value={6}>6 Detik</option>
                  </select>
                </div>
              )}

              {onChangeAutoPlay && (
                <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => onChangeAutoPlay(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                  />
                  <span>Auto-Play</span>
                </label>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setBulkInputOpen(!bulkInputOpen)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-semibold transition border border-slate-700 flex items-center gap-1"
                title="Paste beberapa URL banner sekaligus"
              >
                <FileText className="w-3 h-3 text-sky-400" />
                <span>Bulk Import URLs</span>
              </button>
              <button
                type="button"
                onClick={handleAddSlide}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-[10px] font-bold transition flex items-center gap-1 shadow"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah Slide</span>
              </button>
            </div>
          </div>

          {/* Bulk Import Drawer */}
          {bulkInputOpen && (
            <div className="p-3 bg-slate-900 border border-sky-500/40 rounded-xl space-y-2 animate-fadeIn">
              <label className="block text-[11px] font-bold text-sky-300">
                Paste Multiple Image URLs (Satu URL per baris):
              </label>
              <textarea
                rows={3}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="https://files.sitestatic.xyz/banners/banner_1.webp&#10;https://files.sitestatic.xyz/banners/banner_2.webp"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-[11px] focus:outline-none focus:border-sky-500"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBulkInputOpen(false)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-[11px]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleBulkAdd}
                  className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-[11px] transition shadow"
                >
                  Import ke Slider ({bulkText.split(/\r?\n/).filter((l) => l.trim().startsWith('http')).length} Banners)
                </button>
              </div>
            </div>
          )}

          {/* Slides List & Editor */}
          {banners.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 space-y-2">
              <Layers className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs">Belum ada slide banner dalam carousel.</p>
              <button
                type="button"
                onClick={handleAddSlide}
                className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition"
              >
                + Tambah Slide Banner Pertama
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Slide Tabs Navigation */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {banners.map((b, idx) => (
                  <button
                    key={b.id || idx}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                      activeSlideIndex === idx
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>Slide #{idx + 1}</span>
                    {b.imageUrl ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Active Slide Form */}
              {banners[activeSlideIndex] && (
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                      Konfigurasi Slide #{activeSlideIndex + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={activeSlideIndex === 0}
                        onClick={() => handleMoveSlide(activeSlideIndex, 'up')}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                        title="Geser ke urutan sebelumnya"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={activeSlideIndex === banners.length - 1}
                        onClick={() => handleMoveSlide(activeSlideIndex, 'down')}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                        title="Geser ke urutan berikutnya"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlide(activeSlideIndex)}
                        className="p-1 text-slate-500 hover:text-red-400 ml-1"
                        title="Hapus slide ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <ImageInputWithAutoCdn
                    label={`Gambar Banner Slide #${activeSlideIndex + 1}`}
                    value={banners[activeSlideIndex].imageUrl}
                    onChange={(val) => handleUpdateSlide(activeSlideIndex, 'imageUrl', val)}
                    placeholder="https://files.sitestatic.xyz/banners/...webp"
                    description="Paste URL banner (Auto CDN / Direct supported)"
                    defaultProvider="weserv"
                    maxWidth={1200}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                        Judul / Alt Teks Slide
                      </label>
                      <input
                        type="text"
                        value={banners[activeSlideIndex].title || ''}
                        onChange={(e) => handleUpdateSlide(activeSlideIndex, 'title', e.target.value)}
                        placeholder="Promo Spesial Maxwin..."
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                        Target Link (Klik Banner)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={banners[activeSlideIndex].linkUrl || ''}
                          onChange={(e) => handleUpdateSlide(activeSlideIndex, 'linkUrl', e.target.value)}
                          placeholder="https://..."
                          className="w-full pl-7 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs font-mono focus:border-amber-500 focus:outline-none"
                        />
                        <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
