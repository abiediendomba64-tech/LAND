import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  RefreshCw,
  Wrench,
  Sparkles,
  Zap,
  Lock,
  Globe,
  FileCheck,
} from 'lucide-react';
import { auditCodeAndConfig, AuditResult, AuditIssue } from '../services/analyzerService';
import type { AmpConfig, PortalConfig, RegisterConfig, SafeLinkConfig, CyberShieldConfig } from '../types';
import { generateAmpHtml, generatePortalHtml, generateVipRegisterHtml, generateSafeLinkHtml } from '../services/generator';

interface ErrorBugAnalyzerStudioProps {
  ampConfig: AmpConfig;
  portalConfig: PortalConfig;
  registerConfig: RegisterConfig;
  safelinkConfig: SafeLinkConfig;
  cyberShieldConfig: CyberShieldConfig;
  onAutoFixAll: () => void;
  onFixSingleIssue: (issueId: string) => void;
}

export const ErrorBugAnalyzerStudio: React.FC<ErrorBugAnalyzerStudioProps> = ({
  ampConfig,
  portalConfig,
  registerConfig,
  safelinkConfig,
  cyberShieldConfig,
  onAutoFixAll,
  onFixSingleIssue,
}) => {
  const [fixedToast, setFixedToast] = useState<string | null>(null);

  // Compile pages for real-time audit
  const ampHtml = generateAmpHtml(ampConfig);
  const portalHtml = generatePortalHtml(portalConfig);
  const registerHtml = generateVipRegisterHtml(registerConfig);
  const safelinkHtml = generateSafeLinkHtml(safelinkConfig);

  const audit = auditCodeAndConfig({
    ampHtml,
    portalHtml,
    registerHtml,
    safelinkHtml,
    brandName: ampConfig.brandName,
    targetUrl: ampConfig.targetUrl,
    logoUrl: ampConfig.logoUrl,
    bannerUrl: ampConfig.bannerGifUrl,
    canonicalUrl: ampConfig.canonicalUrl,
    cyberShieldEnabled: cyberShieldConfig.enabled,
  });

  const handleRunAutoFix = () => {
    onAutoFixAll();
    setFixedToast('🛠️ Semua error & peringatan yang dapat diperbaiki otomatis telah diperbaiki secara instan!');
    setTimeout(() => setFixedToast(null), 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 70) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 via-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-rose-500/20">
            <Wrench className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">Auto Analisa Error, Bug &amp; Validator</h2>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                Real-Time Scanner
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pemeriksaan otomatis 18+ poin validitas Google AMP, keamanan link SSL/HTTPS, kepatuhan SEO, dan celah script error.
            </p>
          </div>
        </div>

        {/* 1-Click Fix All Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRunAutoFix}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl font-black text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Auto-Fix Semua Masalah (1-Klik)</span>
          </button>
        </div>
      </div>

      {fixedToast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{fixedToast}</span>
        </div>
      )}

      {/* Score Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl border ${getScoreColor(audit.score)} text-center space-y-1 shadow-lg`}>
          <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80">Skor Kesehatan Total</span>
          <div className="text-3xl font-black">{audit.score} / 100</div>
          <span className="text-[11px] font-bold">{audit.score >= 85 ? 'Sangat Sehat & Valid' : 'Perlu Perbaikan'}</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 text-center space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Status Google AMP</span>
          <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
            <Zap className="w-5 h-5 fill-amber-400" />
            <span>{audit.ampValid ? '100% VALID' : 'PERIKSA'}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Boilerplate &amp; Custom CSS</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 text-center space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Skor Keamanan (SSL &amp; Shield)</span>
          <div className="text-2xl font-black text-emerald-400 flex items-center justify-center gap-1">
            <Lock className="w-5 h-5" />
            <span>{audit.securityScore}%</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Anti-Inspect &amp; HTTPS</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 text-center space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Skor SEO &amp; Rich Snippet</span>
          <div className="text-2xl font-black text-cyan-400 flex items-center justify-center gap-1">
            <Globe className="w-5 h-5" />
            <span>{audit.seoScore}%</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Meta Tags &amp; JSON-LD</span>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white uppercase tracking-wider">
              Daftar Temuan Audit ({audit.issues.length})
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Scan terakhir: {audit.timestamp}</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="text-rose-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> {audit.errorCount} Error
            </span>
            <span className="text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {audit.warningCount} Warning
            </span>
            <span className="text-cyan-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> {audit.infoCount} Info
            </span>
          </div>
        </div>

        {audit.issues.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-base font-black text-white">Luar Biasa! Tidak Ditemukan Error atau Bug</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Seluruh kode landing page AMP, portal utama, form registrasi VIP, dan SafeLink telah memenuhi semua standar performa dan keamanan.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {audit.issues.map((issue) => {
              const isError = issue.type === 'error';
              const isWarn = issue.type === 'warning';

              return (
                <div
                  key={issue.id}
                  className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isError
                      ? 'bg-rose-500/5 border-rose-500/30'
                      : isWarn
                      ? 'bg-amber-500/5 border-amber-500/30'
                      : 'bg-cyan-500/5 border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isError ? (
                        <ShieldAlert className="w-5 h-5 text-rose-400" />
                      ) : isWarn ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Info className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white">{issue.title}</span>
                        {issue.location && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                            {issue.location}
                          </span>
                        )}
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          isError ? 'bg-rose-500/20 text-rose-300' : isWarn ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {issue.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{issue.description}</p>
                    </div>
                  </div>

                  {issue.canAutoFix && (
                    <button
                      type="button"
                      onClick={() => {
                        onFixSingleIssue(issue.id);
                        setFixedToast(`🛠️ Berhasil memperbaiki: ${issue.title}`);
                        setTimeout(() => setFixedToast(null), 2500);
                      }}
                      className="shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shadow self-start sm:self-auto"
                    >
                      <Wrench className="w-3.5 h-3.5 text-amber-400" />
                      <span>{issue.fixActionName || 'Perbaiki Otomatis'}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
