import React, { useState } from 'react';
import {
  ShieldCheck,
  Copy,
  Check,
  UploadCloud,
  Code2,
  FileJson,
  ArrowRight,
  ExternalLink,
  Zap,
} from 'lucide-react';
import type { SafeLinkConfig, ViewportMode, DynamicScript } from '../types';
import {
  generateSafeLinkHtml,
  generateSeparatedSchemaJsonLd,
} from '../services/generator';
import { ImageInputWithAutoCdn } from './ImageInputWithAutoCdn';
import { autoConvertLinkToCdn } from '../utils/cdnUtils';

interface SafeLinkGeneratorProps {
  config: SafeLinkConfig;
  scripts: DynamicScript[];
  onChange: (config: SafeLinkConfig) => void;
  onSaveToDrive: () => void;
  onOpenCodePreview: () => void;
  viewportMode: ViewportMode;
}

export const SafeLinkGenerator: React.FC<SafeLinkGeneratorProps> = ({
  config,
  scripts,
  onChange,
  onSaveToDrive,
  onOpenCodePreview,
  viewportMode,
}) => {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<'safelink' | 'schema'>('safelink');
  const [cdnSuccessToast, setCdnSuccessToast] = useState<string | null>(null);

  const generatedHtml = generateSafeLinkHtml(config, scripts);
  const separatedSchema = generateSeparatedSchemaJsonLd(config);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(separatedSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleAutoConvertAllToCdn = () => {
    let updatedBanner = config.bannerImageUrl;
    if (updatedBanner && !updatedBanner.includes('.statically.io')) {
      updatedBanner = autoConvertLinkToCdn(updatedBanner, 'statically', 'webp', 800);
    }
    onChange({
      ...config,
      bannerImageUrl: updatedBanner,
    });
    setCdnSuccessToast('Banner SafeLink berhasil dikonversi ke CDN WebP!');
    setTimeout(() => setCdnSuccessToast(null), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Configuration Panel */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                SafeLink Shield &amp; JSON-LD
              </h2>
              <span className="text-[11px] text-slate-400">Page 4 Gateway &amp; SEO Schema Isolator</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAutoConvertAllToCdn}
              className="p-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
              title="Auto Convert Gambar ke CDN"
            >
              <Zap className="w-3.5 h-3.5 fill-sky-400" />
            </button>
            <button
              onClick={onSaveToDrive}
              className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold transition"
              title="Simpan ke Google Drive"
            >
              <UploadCloud className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyHtml}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition border border-slate-700"
              title="Salin Kode SafeLink HTML"
            >
              {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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

        {cdnSuccessToast && (
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 fill-emerald-400" />
            <span>{cdnSuccessToast}</span>
          </div>
        )}

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('safelink')}
            className={`py-1.5 px-3 rounded-lg font-bold transition ${
              activeTab === 'safelink' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            SafeLink Gateway
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-1.5 px-3 rounded-lg font-bold transition ${
              activeTab === 'schema' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Skema JSON-LD Terpisah
          </button>
        </div>

        {/* Tab 1: SafeLink Settings */}
        {activeTab === 'safelink' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Brand Name / Publisher</label>
              <input
                type="text"
                value={config.brandName}
                onChange={(e) => onChange({ ...config, brandName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-medium focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">URL Tujuan Akhir (Destination URL)</label>
              <input
                type="text"
                value={config.destinationUrl}
                onChange={(e) => onChange({ ...config, destinationUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-teal-400 font-mono text-[11px] focus:border-teal-500 focus:outline-none"
              />
            </div>

            <ImageInputWithAutoCdn
              label="Banner / Ilustrasi Header Gateway"
              value={config.bannerImageUrl || ''}
              onChange={(val) => onChange({ ...config, bannerImageUrl: val })}
              placeholder="https://..."
              targetWidth={800}
            />

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                Hitung Mundur Aman (Countdown): {config.countdownSeconds} detik
              </label>
              <input
                type="range"
                min="2"
                max="15"
                value={config.countdownSeconds}
                onChange={(e) => onChange({ ...config, countdownSeconds: parseInt(e.target.value) })}
                className="w-full accent-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Judul Gateway Header</label>
              <input
                type="text"
                value={config.pageHeaderTitle}
                onChange={(e) => onChange({ ...config, pageHeaderTitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Sub-judul / Petunjuk Pengguna</label>
              <input
                type="text"
                value={config.pageSubtitle}
                onChange={(e) => onChange({ ...config, pageSubtitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Teks Tombol Lanjut ke Tujuan</label>
              <input
                type="text"
                value={config.buttonReadyText}
                onChange={(e) => onChange({ ...config, buttonReadyText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Teks Security Notice / Disclaimer</label>
              <textarea
                rows={2}
                value={config.securityNoticeText}
                onChange={(e) => onChange({ ...config, securityNoticeText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Separated JSON-LD Schema */}
        {activeTab === 'schema' && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-300 text-xs">
              <span className="font-bold block mb-1">💡 Schema.org JSON-LD Terpisah:</span>
              Gunakan kode ini untuk disematkan pada header CMS/Blog Anda untuk menaikkan trust score dan perlindungan pengarah.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Tipe Skema</label>
                <select
                  value={config.separatedJsonLd.schemaType}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      separatedJsonLd: {
                        ...config.separatedJsonLd,
                        schemaType: e.target.value as any,
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:outline-none"
                >
                  <option value="Article">Article</option>
                  <option value="NewsArticle">NewsArticle</option>
                  <option value="SoftwareApplication">SoftwareApplication</option>
                  <option value="WebPage">WebPage</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Publisher</label>
                <input
                  type="text"
                  value={config.separatedJsonLd.publisher}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      separatedJsonLd: {
                        ...config.separatedJsonLd,
                        publisher: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-medium focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Headline Artikel</label>
              <input
                type="text"
                value={config.separatedJsonLd.headline}
                onChange={(e) =>
                  onChange({
                    ...config,
                    separatedJsonLd: {
                      ...config.separatedJsonLd,
                      headline: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Deskripsi SEO Schema</label>
              <textarea
                rows={2}
                value={config.separatedJsonLd.description}
                onChange={(e) =>
                  onChange({
                    ...config,
                    separatedJsonLd: {
                      ...config.separatedJsonLd,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs focus:outline-none"
              />
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                  <FileJson className="w-3.5 h-3.5 text-teal-400" /> Output Skema JSON-LD
                </span>
                <button
                  onClick={handleCopySchema}
                  className="text-teal-400 hover:text-teal-300 text-[11px] font-bold flex items-center gap-1"
                >
                  {copiedSchema ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSchema ? 'Tersalin' : 'Salin JSON-LD'}</span>
                </button>
              </div>
              <pre className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-teal-300 overflow-x-auto max-h-36">
                {separatedSchema}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Live Preview Box */}
      <div className="lg:col-span-7 sticky top-24 space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Live Gateway Sandbox
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {viewportMode === 'mobile' ? '390 x 844 px' : viewportMode === 'tablet' ? '768 x 1024 px' : '100% Fluid'}
          </span>
        </div>

        <div className="flex justify-center bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 min-h-[580px] shadow-2xl">
          <div
            className={`transition-all duration-300 bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col ${
              viewportMode === 'mobile'
                ? 'w-[390px] h-[720px]'
                : viewportMode === 'tablet'
                ? 'w-[680px] h-[720px]'
                : 'w-full h-[720px]'
            }`}
          >
            <iframe
              srcDoc={generatedHtml}
              title="SafeLink Gateway Preview"
              className="w-full h-full border-0 bg-slate-950"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
