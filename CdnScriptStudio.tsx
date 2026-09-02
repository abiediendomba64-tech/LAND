import React, { useState, useRef } from 'react';
import {
  Code2,
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Zap,
  Globe,
  Layers,
  Sparkles,
  Upload,
  FileCode,
  ArrowRight,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import type { CdnScriptConfig, DynamicScript } from '../types';
import {
  autoConvertLinkToCdn,
  batchConvertLinksToCdn,
  convertHtmlImagesToCdn,
  fileToDataUrl,
  type CdnProvider,
  type ImageFormat,
} from '../utils/cdnUtils';

interface CdnScriptStudioProps {
  config: CdnScriptConfig;
  onChange: (config: CdnScriptConfig) => void;
}

export const CdnScriptStudio: React.FC<CdnScriptStudioProps> = ({ config, onChange }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Single URL test
  const [testOriginalUrl, setTestOriginalUrl] = useState(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23'
  );
  const [testProvider, setTestProvider] = useState<CdnProvider>('statically');
  const [testWidth, setTestWidth] = useState<number>(400);
  const [testFormat, setTestFormat] = useState<ImageFormat>('webp');

  // Batch URLs converter
  const [batchInput, setBatchInput] = useState<string>(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23\nhttps://images.unsplash.com/photo-1511512578047-dfb367046420\nhttps://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzY5ZDI1NmExNTk5ZTMwMDRmOGM3MTRkYWI4MzQ2OTg0NWNjNTQwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26AHONQ79FdWZhAI0/giphy.gif'
  );
  const [batchResults, setBatchResults] = useState<{ original: string; cdn: string }[]>([]);

  // HTML Code CDN Converter
  const [htmlInput, setHtmlInput] = useState<string>(
    '<div class="banner">\n  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23" alt="Banner">\n  <amp-img src="https://images.unsplash.com/photo-1511512578047-dfb367046420" width="300" height="200" layout="responsive"></amp-img>\n</div>'
  );
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [convertedCount, setConvertedCount] = useState<number>(0);

  // Active sub-tab in CDN panel
  const [cdnToolTab, setCdnToolTab] = useState<'single' | 'batch' | 'html-code'>('single');

  // Drag & drop file
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generatedCdn = autoConvertLinkToCdn(
    testOriginalUrl,
    testProvider,
    testFormat,
    testWidth || undefined
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleScript = (id: string) => {
    onChange({
      ...config,
      scripts: config.scripts.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    });
  };

  const handleAddScript = () => {
    const newScript: DynamicScript = {
      id: `script-${Date.now()}`,
      name: 'Custom Tracking Pixel',
      type: 'custom',
      enabled: true,
      codeOrId: '<script>\n  console.log("Custom script loaded");\n</script>',
      position: 'head',
    };
    onChange({ ...config, scripts: [...config.scripts, newScript] });
  };

  const handleRemoveScript = (id: string) => {
    onChange({
      ...config,
      scripts: config.scripts.filter((s) => s.id !== id),
    });
  };

  const handleUpdateScript = (id: string, field: string, value: any) => {
    onChange({
      ...config,
      scripts: config.scripts.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    });
  };

  const handleRunBatchConvert = () => {
    const urls = batchInput.split('\n').filter((u) => u.trim().length > 0);
    const converted = batchConvertLinksToCdn(urls, testProvider, testFormat);
    setBatchResults(converted);
  };

  const handleRunHtmlConvert = () => {
    const { modifiedHtml, convertedCount: count } = convertHtmlImagesToCdn(
      htmlInput,
      testProvider,
      testFormat
    );
    setHtmlOutput(modifiedHtml);
    setConvertedCount(count);
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Pilih file gambar yang valid');
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setTestOriginalUrl(dataUrl);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Dynamic Script Loader Manager (5 cols) */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Dynamic Script Loader
              </h2>
              <span className="text-[11px] text-slate-400">GTM, Facebook Pixel, TikTok, Analytics</span>
            </div>
          </div>

          <button
            onClick={handleAddScript}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah
          </button>
        </div>

        <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
          {config.scripts.map((script) => (
            <div
              key={script.id}
              className={`p-3.5 rounded-xl border transition ${
                script.enabled
                  ? 'bg-slate-950/80 border-slate-700'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={script.enabled}
                    onChange={() => handleToggleScript(script.id)}
                    className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={script.name}
                    onChange={(e) => handleUpdateScript(script.id, 'name', e.target.value)}
                    className="bg-transparent font-bold text-xs text-slate-200 focus:outline-none border-b border-transparent focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={() => handleRemoveScript(script.id)}
                  className="text-slate-500 hover:text-red-400 p-1"
                  title="Hapus Script"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2 text-[10px]">
                <div>
                  <label className="text-slate-500 block mb-0.5">Tipe</label>
                  <select
                    value={script.type}
                    onChange={(e) => handleUpdateScript(script.id, 'type', e.target.value)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300 font-semibold"
                  >
                    <option value="gtm">Google Tag Manager (GTM)</option>
                    <option value="ga4">Google Analytics (GA4)</option>
                    <option value="facebook-pixel">Meta / Facebook Pixel</option>
                    <option value="tiktok-pixel">TikTok Pixel</option>
                    <option value="custom">Custom JS Code</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-500 block mb-0.5">Posisi HTML</label>
                  <select
                    value={script.position}
                    onChange={(e) => handleUpdateScript(script.id, 'position', e.target.value)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300 font-semibold"
                  >
                    <option value="head">&lt;head&gt; Section</option>
                    <option value="body-start">Top &lt;body&gt;</option>
                    <option value="body-end">Bottom &lt;/body&gt;</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-500 block text-[10px] mb-0.5">
                  {script.type === 'custom' ? 'Kode Script Lengkap' : 'Measurement ID / Pixel ID'}
                </label>
                <textarea
                  rows={script.type === 'custom' ? 3 : 1}
                  value={script.codeOrId}
                  onChange={(e) => handleUpdateScript(script.id, 'codeOrId', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono text-[11px] focus:outline-none focus:border-purple-500"
                  placeholder={script.type === 'custom' ? '<script>...</script>' : 'ID_KODE'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto Convert Link to CDN & Image Optimizer (7 cols) */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Zap className="w-4 h-4 fill-sky-400" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Auto Convert Link to CDN Studio
              </h2>
              <span className="text-[11px] text-slate-400">
                Otomatis Ubah Link Gambar / Banner ke WebP CDN Multi-Server
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setCdnToolTab('single')}
              className={`px-2.5 py-1 rounded-lg transition ${
                cdnToolTab === 'single' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Single URL
            </button>
            <button
              onClick={() => setCdnToolTab('batch')}
              className={`px-2.5 py-1 rounded-lg transition ${
                cdnToolTab === 'batch' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Batch URLs
            </button>
            <button
              onClick={() => setCdnToolTab('html-code')}
              className={`px-2.5 py-1 rounded-lg transition ${
                cdnToolTab === 'html-code' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              HTML Code
            </button>
          </div>
        </div>

        {/* Global CDN Settings Bar */}
        <div className="grid grid-cols-3 gap-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">CDN Provider</label>
            <select
              value={testProvider}
              onChange={(e) => setTestProvider(e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-semibold focus:outline-none focus:border-sky-500"
            >
              <option value="statically">Statically CDN (Global WebP)</option>
              <option value="weserv">Weserv Cache &amp; Proxy</option>
              <option value="jsdelivr">jsDelivr (GitHub Raw)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Format Output</label>
            <select
              value={testFormat}
              onChange={(e) => setTestFormat(e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-semibold focus:outline-none focus:border-sky-500"
            >
              <option value="webp">WebP (90% Lebih Ringan)</option>
              <option value="png">PNG Asli</option>
              <option value="jpg">JPG Optimized</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Max Width (Opsional)</label>
            <input
              type="number"
              placeholder="Auto"
              value={testWidth || ''}
              onChange={(e) => setTestWidth(parseInt(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Tab 1: Single URL Converter */}
        {cdnToolTab === 'single' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">
                  Original Image URL / Local Upload
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sky-400 hover:text-sky-300 font-bold text-[10px] flex items-center gap-1"
                >
                  <Upload className="w-3 h-3" /> Upload File Gambar
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0]);
                }}
                accept="image/*"
                className="hidden"
              />

              <input
                type="text"
                value={testOriginalUrl}
                onChange={(e) => setTestOriginalUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-[11px] focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Generated CDN Result Output */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-emerald-400" /> Hasil URL CDN Teroptimasi (WebP)
                </span>
                <button
                  onClick={() => handleCopy(generatedCdn, 'cdn-result')}
                  className="px-2.5 py-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 rounded-lg font-bold text-xs flex items-center gap-1 transition"
                >
                  {copiedId === 'cdn-result' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'cdn-result' ? 'Tersalin!' : 'Salin URL'}</span>
                </button>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 break-all select-all">
                {generatedCdn}
              </div>

              {/* Live Image Preview */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-500 block mb-1">Preview Realtime:</span>
                <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900 max-h-48 flex items-center justify-center p-2">
                  <img
                    src={generatedCdn}
                    alt="CDN Preview"
                    className="max-h-40 max-w-full object-contain rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = testOriginalUrl;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Batch URLs Converter */}
        {cdnToolTab === 'batch' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">
                  Daftar URL Gambar (Satu URL per baris)
                </label>
                <button
                  onClick={handleRunBatchConvert}
                  className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Auto Convert Semua</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-[11px] focus:outline-none focus:border-sky-500"
                placeholder="https://site.com/image1.png&#10;https://site.com/image2.jpg"
              />
            </div>

            {batchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span>Hasil Konversi ({batchResults.length} URL)</span>
                  <button
                    onClick={() => {
                      const allCdn = batchResults.map((r) => r.cdn).join('\n');
                      handleCopy(allCdn, 'batch-all');
                    }}
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedId === 'batch-all' ? 'Semua Tersalin!' : 'Salin Semua CDN Links'}</span>
                  </button>
                </div>

                {batchResults.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-500 truncate font-mono">
                      Original: {item.original}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] text-emerald-400 font-mono truncate">{item.cdn}</div>
                      <button
                        onClick={() => handleCopy(item.cdn, `batch-${idx}`)}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] shrink-0"
                      >
                        {copiedId === `batch-${idx}` ? 'OK' : 'Salin'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: HTML Code Auto-CDN Converter */}
        {cdnToolTab === 'html-code' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">
                  Tempel Kode HTML / AMP Anda
                </label>
                <button
                  onClick={handleRunHtmlConvert}
                  className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Auto Convert Semua Gambar di Kode HTML</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-[11px] focus:outline-none focus:border-sky-500"
                placeholder="<img src='...'> atau <amp-img src='...'>"
              />
            </div>

            {htmlOutput && (
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-emerald-400">
                    ⚡ {convertedCount} Link Gambar Berhasil Diubah ke CDN WebP!
                  </span>
                  <button
                    onClick={() => handleCopy(htmlOutput, 'html-output')}
                    className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-lg font-bold text-xs flex items-center gap-1"
                  >
                    {copiedId === 'html-output' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'html-output' ? 'HTML Tersalin!' : 'Salin Kode HTML'}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={5}
                  value={htmlOutput}
                  className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[10px] text-emerald-400 focus:outline-none select-all"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
