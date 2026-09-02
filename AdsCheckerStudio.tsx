import React, { useState } from 'react';
import {
  Eye,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Copy,
  Check,
  Plus,
  Trash2,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Monitor,
  Smartphone,
} from 'lucide-react';
import {
  AdUnitConfig,
  DEFAULT_AD_UNITS,
  auditAdsCompliance,
  generateAmpAdSnippet,
} from '../services/adsCheckerService';

interface AdsCheckerStudioProps {
  onInjectAdToAmp?: (adSnippet: string) => void;
}

export const AdsCheckerStudio: React.FC<AdsCheckerStudioProps> = ({ onInjectAdToAmp }) => {
  const [adUnits, setAdUnits] = useState<AdUnitConfig[]>(DEFAULT_AD_UNITS);
  const [pageAuditTarget, setPageAuditTarget] = useState<'amp' | 'portal' | 'safelink'>('amp');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const auditReport = auditAdsCompliance(adUnits, pageAuditTarget);

  const handleToggleAd = (id: string) => {
    setAdUnits((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, enabled: !ad.enabled } : ad))
    );
  };

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleAddNewAdUnit = () => {
    const newId = `ad-unit-${Date.now()}`;
    const newAd: AdUnitConfig = {
      id: newId,
      name: 'New Custom Banner Ad (300x250)',
      network: 'custom-banner',
      enabled: true,
      position: 'middle-content',
      width: 300,
      height: 250,
      bannerImgUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=250&fit=crop',
      targetLink: 'https://rebrand.ly/DAFTAR-BIGCAT',
      altText: 'Bonus Spesial Hari Ini',
      responsive: true,
    };
    setAdUnits([...adUnits, newAd]);
    setToastMessage('✅ Unit Iklan baru berhasil ditambahkan!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDeleteAdUnit = (id: string) => {
    setAdUnits(adUnits.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <Eye className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">Ads Checker &amp; Monetization Studio</h2>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                AdSense &amp; AMP Ads Safe
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Audit kepatuhan penempatan iklan, verifikasi unit Google AdSense &amp; AMP Ads, serta pencegahan pelanggaran tabrakan tombol (Safe-Zone).
            </p>
          </div>
        </div>

        {/* Add Unit Action */}
        <button
          type="button"
          onClick={handleAddNewAdUnit}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Slot Iklan Baru</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Audit Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Kepatuhan Iklan (Policy Score)</span>
          <div className="text-2xl font-black text-amber-400">{auditReport.score} / 100</div>
          <span className="text-[11px] text-slate-400">
            {auditReport.score >= 80 ? 'Aman dari Penalti AdSense' : 'Perlu Penyesuaian Posisi'}
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Status Safe-Zone Tabrakan CTA</span>
          <div className="text-2xl font-black flex items-center gap-2">
            {auditReport.hasCtaCollision ? (
              <span className="text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-5 h-5" /> Ada Tabrakan
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-5 h-5" /> Area Aman
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400">Tidak menutupi tombol DAFTAR/LOGIN</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Unit Iklan Aktif</span>
          <div className="text-2xl font-black text-cyan-400">
            {auditReport.enabledAdUnits} / {auditReport.totalAdUnits} Unit
          </div>
          <span className="text-[11px] text-slate-400">Rasio kepadatan seimbang</span>
        </div>
      </div>

      {/* Recommendations Box */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
        <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
          Rekomendasi &amp; Catatan Audit Iklan:
        </span>
        <div className="space-y-1.5 text-xs text-slate-300">
          {auditReport.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Units Manager List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center justify-between">
          <span>Daftar Unit &amp; Script Iklan AMP / HTML</span>
          <span className="text-[11px] font-normal text-slate-400">Format Otomatis AMP-AD &amp; Banner Responsive</span>
        </h3>

        <div className="space-y-4">
          {adUnits.map((ad) => {
            const snippet = generateAmpAdSnippet(ad);

            return (
              <div
                key={ad.id}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 transition hover:border-slate-700"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={ad.enabled}
                      onChange={() => handleToggleAd(ad.id)}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <div>
                      <h4 className="text-xs font-black text-white">{ad.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Posisi: {ad.position} • {ad.width}x{ad.height}px • Network: {ad.network}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopySnippet(snippet, ad.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      {copiedSnippetId === ad.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Salin Tag AMP-AD</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAdUnit(ad.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Hapus Unit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Snippet preview */}
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300/90 overflow-x-auto">
                  {snippet}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
