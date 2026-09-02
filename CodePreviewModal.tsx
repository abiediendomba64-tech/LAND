import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  X,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  UploadCloud,
} from 'lucide-react';
import type { ViewportMode } from '../types';

interface CodePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
  filename: string;
  onSaveToDrive?: () => void;
}

export const CodePreviewModal: React.FC<CodePreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  code,
  filename,
  onSaveToDrive,
}) => {
  const [activeView, setActiveView] = useState<'code' | 'preview'>('code');
  const [viewport, setViewport] = useState<ViewportMode>('mobile');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {title}
                <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {filename}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveView('code')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeView === 'code' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </button>
              <button
                onClick={() => setActiveView('preview')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeView === 'preview' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Sandbox</span>
              </button>
            </div>

            {/* Actions */}
            {onSaveToDrive && (
              <button
                onClick={onSaveToDrive}
                className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Save to Drive</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-grow overflow-hidden bg-slate-950 relative">
          {activeView === 'code' ? (
            <div className="h-full overflow-auto p-4">
              <pre className="font-mono text-xs text-emerald-400/90 leading-relaxed whitespace-pre font-medium select-all">
                {code}
              </pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center p-4">
              <div className="flex items-center gap-2 mb-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1 ${
                    viewport === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1 ${
                    viewport === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" /> Tablet
                </button>
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1 ${
                    viewport === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
              </div>

              <div
                className={`transition-all duration-300 rounded-xl overflow-hidden border border-slate-800 bg-black shadow-2xl flex-grow ${
                  viewport === 'mobile'
                    ? 'w-[390px] max-h-full'
                    : viewport === 'tablet'
                    ? 'w-[640px] max-h-full'
                    : 'w-full max-h-full'
                }`}
              >
                <iframe
                  title="Code Preview Frame"
                  srcDoc={code}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
