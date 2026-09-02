import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  Copy,
  Eye,
  FileText,
  Zap,
} from 'lucide-react';
import { parseUploadedTemplate, ParsedTemplateResult } from '../utils/templateParser';

interface TemplateUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToAmp: (parsed: ParsedTemplateResult) => void;
  onApplyToPortal: (parsed: ParsedTemplateResult) => void;
  onApplyToSchemaStudio: (parsed: ParsedTemplateResult) => void;
}

export const TemplateUploadModal: React.FC<TemplateUploadModalProps> = ({
  isOpen,
  onClose,
  onApplyToAmp,
  onApplyToPortal,
  onApplyToSchemaStudio,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedResult, setParsedResult] = useState<ParsedTemplateResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'summary' | 'jsonld' | 'raw'>('summary');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setRawText(text);
      const res = parseUploadedTemplate(text, file.name);
      setParsedResult(res);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleManualParse = () => {
    if (!rawText.trim()) return;
    const res = parseUploadedTemplate(rawText, 'pasted-template.html');
    setParsedResult(res);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
              <UploadCloud className="w-5 h-5 font-black" />
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                Drop / Upload Custom Template &amp; Skema HTML
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono">
                  Smart AI Parser
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tarik &amp; drop file <code className="text-amber-300">.html</code>, <code className="text-amber-300">.amp</code>, <code className="text-amber-300">.json</code> atau paste source code skema baru Anda.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                : 'border-slate-700 hover:border-amber-500/50 bg-slate-950/40 hover:bg-slate-950/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.htm,.json,.txt,.amp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <FileCode className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-white mb-1">
              Klik untuk browse file atau Tarik &amp; Lepaskan file HTML / Skema ke sini
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Mendukung template AMP valid, Landing Page HTML5, JSON-LD Schema file, skema provider, atau portal responsif.
            </p>
            {fileName && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>File terpilih: {fileName}</span>
              </div>
            )}
          </div>

          {/* Paste Raw Code Option */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" /> Atau Paste Source Code HTML / Skema Langsung:
              </label>
              {rawText && (
                <button
                  type="button"
                  onClick={() => {
                    setRawText('');
                    setParsedResult(null);
                    setFileName(null);
                  }}
                  className="text-[11px] text-slate-400 hover:text-red-400 transition"
                >
                  Bersihkan
                </button>
              )}
            </div>
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste template <!doctype html> atau script JSON-LD schema ke sini..."
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
            {rawText && !parsedResult && (
              <button
                type="button"
                onClick={handleManualParse}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition flex items-center justify-center gap-2 shadow"
              >
                <Sparkles className="w-4 h-4" /> Analisa &amp; Ekstrak Template Baru
              </button>
            )}
          </div>

          {/* Parsed Result Showcase */}
          {parsedResult && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono uppercase">
                    Terdeteksi: {parsedResult.detectedType}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold truncate max-w-sm">
                    {parsedResult.title}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActivePreviewTab('summary')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      activePreviewTab === 'summary'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Ringkasan
                  </button>
                  <button
                    onClick={() => setActivePreviewTab('jsonld')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      activePreviewTab === 'jsonld'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    JSON-LD ({parsedResult.parsedSchemas?.length || 0})
                  </button>
                </div>
              </div>

              {activePreviewTab === 'summary' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Brand Inferred</span>
                    <span className="font-bold text-amber-300">{parsedResult.brandName || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Target URL Inferred</span>
                    <span className="font-mono text-slate-300 truncate block">
                      {parsedResult.targetUrl || 'N/A'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1 md:col-span-2">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Meta Description</span>
                    <p className="text-slate-300 italic">{parsedResult.metaDescription || 'Tidak ditemukan meta description'}</p>
                  </div>
                  {parsedResult.keywords && (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1 md:col-span-2">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Keywords</span>
                      <p className="text-slate-300 font-mono text-[11px]">{parsedResult.keywords}</p>
                    </div>
                  )}
                  {parsedResult.extractedLinks && parsedResult.extractedLinks.length > 0 && (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1 md:col-span-2">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">
                        Links Ditemukan ({parsedResult.extractedLinks.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {parsedResult.extractedLinks.slice(0, 6).map((l, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono"
                          >
                            {l.text || l.url}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activePreviewTab === 'jsonld' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Parsed JSON-LD Schema:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(parsedResult.rawJsonLd || '{}')}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
                    >
                      <Copy className="w-3 h-3" /> {copied ? 'Tersalin!' : 'Copy Schema'}
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-48">
                    {parsedResult.rawJsonLd || '// Tidak ada script JSON-LD terdeteksi dalam template'}
                  </pre>
                </div>
              )}

              {/* 1-Click Action Buttons */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Pilih Tindakan Penerapan Skema:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onApplyToAmp(parsedResult);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <Zap className="w-4 h-4" /> Terapkan ke AMP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyToPortal(parsedResult);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <Layers className="w-4 h-4 text-cyan-400" /> Terapkan ke Portal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyToSchemaStudio(parsedResult);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" /> Terapkan ke Schema
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
