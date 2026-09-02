import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  Upload,
  Copy,
  Check,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  X,
  Eye,
  AlertCircle,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import {
  autoConvertLinkToCdn,
  isCdnUrl,
  extractOriginalUrl,
  fileToDataUrl,
  type CdnProvider,
  type ImageFormat,
} from '../utils/cdnUtils';

interface ImageInputWithAutoCdnProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  defaultProvider?: CdnProvider;
  defaultFormat?: ImageFormat;
  maxWidth?: number;
  maxHeight?: number;
  autoConvertOnPaste?: boolean;
  targetWidth?: number;
}

export const ImageInputWithAutoCdn: React.FC<ImageInputWithAutoCdnProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://...',
  description,
  defaultProvider = 'weserv',
  defaultFormat = 'webp',
  maxWidth,
  maxHeight,
  autoConvertOnPaste = false,
  targetWidth,
}) => {
  const [provider, setProvider] = useState<CdnProvider>(defaultProvider);
  const [format, setFormat] = useState<ImageFormat>(defaultFormat);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false);
  const [aspectMode, setAspectMode] = useState<'contain' | 'cover'>(
    label.toLowerCase().includes('logo') || label.toLowerCase().includes('icon') ? 'contain' : 'cover'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCurrentCdn = isCdnUrl(value);
  const isLogo = label.toLowerCase().includes('logo') || label.toLowerCase().includes('icon');
  const rawOriginalUrl = extractOriginalUrl(value);

  // Reset load error when value changes
  useEffect(() => {
    setImgLoadError(false);
  }, [value]);

  const handleSwitchProvider = (newProvider: CdnProvider) => {
    setProvider(newProvider);
    if (!value) return;
    const converted = autoConvertLinkToCdn(rawOriginalUrl || value, newProvider, format, maxWidth || targetWidth, maxHeight);
    onChange(converted);
    setImgLoadError(false);
  };

  const handleUseDirect = () => {
    const raw = extractOriginalUrl(value);
    setProvider('direct');
    onChange(raw);
    setImgLoadError(false);
  };

  const handleUseWeserv = () => {
    const raw = extractOriginalUrl(value);
    setProvider('weserv');
    const converted = autoConvertLinkToCdn(raw, 'weserv', format, maxWidth || targetWidth, maxHeight);
    onChange(converted);
    setImgLoadError(false);
  };

  const handleUseStatically = () => {
    const raw = extractOriginalUrl(value);
    setProvider('statically');
    const converted = autoConvertLinkToCdn(raw, 'statically', format, maxWidth || targetWidth, maxHeight);
    onChange(converted);
    setImgLoadError(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (!autoConvertOnPaste) return;
    const pastedText = e.clipboardData.getData('text');
    if (
      pastedText &&
      (pastedText.startsWith('http://') || pastedText.startsWith('https://')) &&
      !isCdnUrl(pastedText) &&
      provider !== 'direct'
    ) {
      e.preventDefault();
      const converted = autoConvertLinkToCdn(pastedText, provider, format, maxWidth || targetWidth, maxHeight);
      onChange(converted);
      setImgLoadError(false);
    }
  };

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (.png, .jpg, .gif, .webp, .svg)');
      return;
    }
    setIsLoadingFile(true);
    setImgLoadError(false);
    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      console.error('File read error:', err);
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange('');
    setImgLoadError(false);
  };

  return (
    <div className="space-y-2 text-xs">
      {/* Label and Quick Actions */}
      <div className="flex items-center justify-between">
        <label className="text-slate-300 font-bold uppercase text-[10px] flex items-center gap-1.5">
          <span>{label}</span>
          {isCurrentCdn ? (
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
              CDN Active
            </span>
          ) : value ? (
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
              Direct Link
            </span>
          ) : null}
          <span className="text-[9px] font-normal text-slate-500 lowercase hidden sm:inline">
            ({isLogo ? 'mode logo: fit contain' : 'mode banner: proportional'})
          </span>
        </label>

        <div className="flex items-center gap-1">
          {/* Provider Quick Switch Pills */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[9px]">
            <button
              type="button"
              onClick={() => handleSwitchProvider('direct')}
              className={`px-1.5 py-0.5 rounded font-medium transition ${
                provider === 'direct' || (!isCurrentCdn && value)
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Gunakan Link Asli Langsung Tanpa Proxy"
            >
              Direct
            </button>
            <button
              type="button"
              onClick={() => handleSwitchProvider('weserv')}
              className={`px-1.5 py-0.5 rounded font-medium transition ${
                provider === 'weserv' && isCurrentCdn
                  ? 'bg-emerald-600/30 text-emerald-300 font-bold border border-emerald-500/40'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Gunakan Weserv CDN Global Cache (Direkomendasikan)"
            >
              Weserv
            </button>
            <button
              type="button"
              onClick={() => handleSwitchProvider('statically')}
              className={`px-1.5 py-0.5 rounded font-medium transition ${
                provider === 'statically' && isCurrentCdn
                  ? 'bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Gunakan Statically CDN Multi-CDN"
            >
              Statically
            </button>
          </div>
        </div>
      </div>

      {/* Input row & Upload trigger */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-grow">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setImgLoadError(false);
            }}
            onPaste={handlePaste}
            placeholder={placeholder}
            className="w-full pl-8 pr-14 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-[11px] focus:border-amber-500 focus:outline-none placeholder-slate-600"
          />
          <ImageIcon className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />

          <div className="absolute right-1.5 top-1.5 flex items-center gap-0.5">
            {value && (
              <>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 text-slate-500 hover:text-red-400 transition"
                  title="Hapus / Reset URL"
                >
                  <X className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 text-slate-500 hover:text-slate-200 transition"
                  title="Salin URL"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Upload local image button */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoadingFile}
          className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shrink-0"
          title="Upload file gambar lokal"
        >
          <Upload className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Upload</span>
        </button>
      </div>

      {/* Visual Live Aspect-Ratio Preserving Framing Preview Box */}
      {value ? (
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-semibold flex items-center gap-1 text-slate-300">
              <Eye className="w-3 h-3 text-amber-400" /> Live Framing Preview
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setAspectMode(aspectMode === 'contain' ? 'cover' : 'contain')}
                className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-400 hover:text-amber-300 transition"
                title="Ganti Mode Fitting (Contain / Cover)"
              >
                Fit: <strong className="uppercase text-amber-400">{aspectMode}</strong>
              </button>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-amber-400 flex items-center gap-0.5"
                title="Buka URL asli di tab baru"
              >
                <span>Buka</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Actual image display frame with checkerboard backdrop for transparency */}
          <div
            className={`w-full rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center relative ${
              isLogo ? 'h-16 bg-slate-900/90' : 'aspect-[16/7] max-h-44 bg-slate-900'
            }`}
            style={{
              backgroundImage:
                'radial-gradient(#1e293b 1px, transparent 1px), radial-gradient(#1e293b 1px, #0f172a 1px)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 8px 8px',
            }}
          >
            {!imgLoadError ? (
              <img
                src={value}
                alt="Preview"
                onError={() => {
                  setImgLoadError(true);
                }}
                className={`max-w-full transition duration-300 ${
                  isLogo
                    ? 'max-h-12 w-auto object-contain drop-shadow'
                    : aspectMode === 'cover'
                    ? 'w-full h-full object-cover'
                    : 'max-h-40 w-auto object-contain'
                }`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-3 text-center space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Gambar tidak dapat dimuat melalui proxy CDN saat ini</span>
                </div>
                <p className="text-[10px] text-slate-400 max-w-sm">
                  Domain asal mungkin membatasi proxy CDN atau memblokir scraper. Pilih opsi pemulihan di bawah:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={handleUseDirect}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] rounded-lg transition shadow flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" />
                    <span>Pakai Link Langsung (Direct)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleUseWeserv}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Coba Weserv CDN</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleUseStatically}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] rounded-lg transition flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Coba Statically</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State / Drag & Drop Helper */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`py-2 px-3 rounded-lg border transition text-[10px] flex items-center justify-between ${
            isDragging
              ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
              : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
          }`}
        >
          <span className="truncate">
            {isDragging
              ? 'Lepaskan gambar untuk upload...'
              : description ||
                (isLogo
                  ? 'Rasio Rekomendasi Logo: 3:1 atau 1:1 (PNG/WebP transparan)'
                  : 'Rasio Rekomendasi Banner: 16:9 atau 21:9')}
          </span>
          <span className="text-[9px] text-slate-600 font-mono shrink-0 ml-2">Drag &amp; Drop Ready</span>
        </div>
      )}
    </div>
  );
};
