import React, { useState } from 'react';
import {
  UserPlus,
  Plus,
  Trash2,
  Copy,
  Check,
  UploadCloud,
  Code2,
  ShieldCheck,
  CreditCard,
  Zap,
} from 'lucide-react';
import type { RegisterConfig, ViewportMode, DynamicScript } from '../types';
import { generateVipRegisterHtml } from '../services/generator';
import { ImageInputWithAutoCdn } from './ImageInputWithAutoCdn';
import { autoConvertLinkToCdn } from '../utils/cdnUtils';

interface VipRegisterGeneratorProps {
  config: RegisterConfig;
  scripts: DynamicScript[];
  onChange: (config: RegisterConfig) => void;
  onSaveToDrive: () => void;
  onOpenCodePreview: () => void;
  viewportMode: ViewportMode;
}

export const VipRegisterGenerator: React.FC<VipRegisterGeneratorProps> = ({
  config,
  scripts,
  onChange,
  onSaveToDrive,
  onOpenCodePreview,
  viewportMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [newPerk, setNewPerk] = useState('');
  const [newPayment, setNewPayment] = useState('');
  const [convertedToast, setConvertedToast] = useState(false);

  const generatedHtml = generateVipRegisterHtml(config, scripts);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoConvertLogo = () => {
    const newLogo = autoConvertLinkToCdn(config.logoUrl, 'statically', 'webp');
    onChange({
      ...config,
      logoUrl: newLogo,
    });
    setConvertedToast(true);
    setTimeout(() => setConvertedToast(false), 2500);
  };

  const handleAddPerk = () => {
    if (!newPerk.trim()) return;
    onChange({ ...config, vipPerks: [...config.vipPerks, newPerk.trim()] });
    setNewPerk('');
  };

  const handleRemovePerk = (index: number) => {
    onChange({ ...config, vipPerks: config.vipPerks.filter((_, i) => i !== index) });
  };

  const handleAddPayment = () => {
    if (!newPayment.trim()) return;
    onChange({ ...config, paymentMethods: [...config.paymentMethods, newPayment.trim().toUpperCase()] });
    setNewPayment('');
  };

  const handleRemovePayment = (index: number) => {
    onChange({ ...config, paymentMethods: config.paymentMethods.filter((_, i) => i !== index) });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Configuration Panel */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                VIP Register Engine
              </h2>
              <span className="text-[11px] text-slate-400">Onboarding Form &amp; WhatsApp Dispatcher</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAutoConvertLogo}
              className="p-2 bg-amber-500/15 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
              title="Auto Convert Logo ke WebP CDN"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span className="hidden sm:inline">Auto CDN</span>
            </button>
            <button
              onClick={onSaveToDrive}
              className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold transition"
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
            <span>⚡ Logo berhasil dikonversi ke CDN WebP otomatis!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Nama Brand</label>
            <input
              type="text"
              value={config.brandName}
              onChange={(e) => onChange({ ...config, brandName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-medium focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Headline Form</label>
              <input
                type="text"
                value={config.formHeadline}
                onChange={(e) => onChange({ ...config, formHeadline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Sub-headline</label>
              <input
                type="text"
                value={config.formSubheadline}
                onChange={(e) => onChange({ ...config, formSubheadline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <ImageInputWithAutoCdn
              label="URL Logo Header"
              value={config.logoUrl}
              onChange={(val) => onChange({ ...config, logoUrl: val })}
              placeholder="https://example.com/logo.png"
              description="Auto convert link to CDN / drag & drop logo file"
              maxWidth={400}
            />
          </div>

          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Nomor WhatsApp Notifikasi Registrasi</label>
            <input
              type="text"
              value={config.whatsappNotifyNumber}
              onChange={(e) => onChange({ ...config, whatsappNotifyNumber: e.target.value })}
              placeholder="6281234567890"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">URL Pengalihan Sukses (Success Redirect)</label>
            <input
              type="text"
              value={config.successRedirectUrl}
              onChange={(e) => onChange({ ...config, successRedirectUrl: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* VIP Perks */}
          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1.5">
              Perks / Bonus VIP Badges ({config.vipPerks.length})
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPerk}
                onChange={(e) => setNewPerk(e.target.value)}
                placeholder="Contoh: Garansi Bebas Biaya Admin"
                className="flex-grow px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs"
              />
              <button
                onClick={handleAddPerk}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                + Tambah
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {config.vipPerks.map((perk, idx) => (
                <span
                  key={idx}
                  className="bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-[11px] text-slate-300 flex items-center gap-1.5"
                >
                  {perk}
                  <button onClick={() => handleRemovePerk(idx)} className="text-slate-500 hover:text-red-400">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1.5">
              Pilihan Pembayaran / Bank / E-Wallet
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPayment}
                onChange={(e) => setNewPayment(e.target.value)}
                placeholder="Contoh: QRIS / BCA"
                className="flex-grow px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs"
              />
              <button
                onClick={handleAddPayment}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                + Tambah
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {config.paymentMethods.map((p, idx) => (
                <span
                  key={idx}
                  className="bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-[11px] text-slate-300 font-mono flex items-center gap-1.5"
                >
                  {p}
                  <button onClick={() => handleRemovePayment(idx)} className="text-slate-500 hover:text-red-400">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Stage Preview */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col items-center">
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">Live Register Form Simulation</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Auto WhatsApp Payload Ready</span>
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
            title="Register Live Preview"
            srcDoc={generatedHtml}
            className="w-full h-full border-0 bg-slate-950"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
};
