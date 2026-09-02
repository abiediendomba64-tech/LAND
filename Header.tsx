import React from 'react';
import {
  Zap,
  Layers,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Code2,
  HardDrive,
  Eye,
  Download,
  LogOut,
  CloudCheck,
  CloudUpload,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Wrench,
  FileCode,
  FolderArchive,
  TrendingUp,
  UploadCloud,
} from 'lucide-react';
import type { ActiveTab, UserProfile, ViewportMode } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile | null;
  onOpenDriveModal: () => void;
  onOpenPreview: () => void;
  onDownloadCurrent: () => void;
  onOpenDeployModal?: () => void;
  onOpenUploadModal?: () => void;
  onLogin: () => void;
  onLogout: () => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  autoUploadEnabled?: boolean;
  onToggleAutoUpload?: () => void;
  isSyncing?: boolean;
  lastSyncTime?: Date | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenDriveModal,
  onOpenPreview,
  onDownloadCurrent,
  onOpenDeployModal,
  onOpenUploadModal,
  onLogin,
  onLogout,
  viewportMode,
  setViewportMode,
  autoUploadEnabled = false,
  onToggleAutoUpload,
  isSyncing = false,
  lastSyncTime = null,
}) => {
  const tabs = [
    { id: 'amp' as ActiveTab, label: 'AMP Landing Page', icon: Zap, badge: 'Google Valid' },
    { id: 'portal' as ActiveTab, label: 'Portal Utama', icon: Layers, badge: 'Hub' },
    { id: 'register' as ActiveTab, label: 'Registrasi VIP', icon: UserPlus, badge: 'Form' },
    { id: 'safelink' as ActiveTab, label: 'SafeLink Bridge', icon: ShieldCheck, badge: 'Page 4' },
    { id: 'page1-seo' as ActiveTab, label: 'Page 1 Rank 1', icon: TrendingUp, badge: 'AI SEO' },
    { id: 'content-promo' as ActiveTab, label: 'Content & Promo', icon: Sparkles, badge: 'Copywriter' },
    { id: 'schema-studio' as ActiveTab, label: 'Skema Per Page', icon: FileCode, badge: 'JSON-LD' },
    { id: 'error-audit' as ActiveTab, label: 'Auto Analisa Error', icon: Wrench, badge: 'Fix Bug' },
    { id: 'ads-checker' as ActiveTab, label: 'Cek Ads & Safe-Zone', icon: Eye, badge: 'Audit' },
    { id: 'cdn-scripts' as ActiveTab, label: 'CDN & Scripts', icon: Code2, badge: 'Pixel' },
    { id: 'cyber-shield' as ActiveTab, label: 'Cyber Shield', icon: ShieldAlert, badge: 'Anti-Copy' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">
                  Landing Page &amp; Portal Suite
                </span>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  AMP Pro &amp; Drive Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Generator Landing Page Valid, Portal Responsif, VIP Register &amp; SafeLink Bridge
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2.5">
            {/* Viewport switcher */}
            <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewportMode('mobile')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  viewportMode === 'mobile'
                    ? 'bg-amber-500 text-slate-950 shadow font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mobile (390px)"
              >
                Mobile
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  viewportMode === 'tablet'
                    ? 'bg-amber-500 text-slate-950 shadow font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tablet (768px)"
              >
                Tablet
              </button>
              <button
                onClick={() => setViewportMode('desktop')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  viewportMode === 'desktop'
                    ? 'bg-amber-500 text-slate-950 shadow font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Full Desktop"
              >
                Desktop
              </button>
            </div>

            {/* Auto Uploads Status & Toggle Button */}
            <button
              onClick={onToggleAutoUpload || onOpenDriveModal}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                autoUploadEnabled && user
                  ? isSyncing
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-300 hover:border-slate-700'
              }`}
              title={
                !user
                  ? 'Login dengan Google untuk mengaktifkan Auto Uploads'
                  : autoUploadEnabled
                  ? `Auto-Uploads Aktif (Tersinkronisasi otomatis ke Google Drive)${
                      lastSyncTime ? ` • Terakhir: ${lastSyncTime.toLocaleTimeString('id-ID')}` : ''
                    }`
                  : 'Klik untuk mengaktifkan Auto-Uploads ke Google Drive'
              }
            >
              {isSyncing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
              ) : autoUploadEnabled && user ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <CloudUpload className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span className="hidden md:inline">
                {isSyncing
                  ? 'Auto-Syncing...'
                  : autoUploadEnabled && user
                  ? 'Auto-Upload ON'
                  : 'Auto-Upload'}
              </span>
            </button>

            {/* Upload / Drop Template Button */}
            {onOpenUploadModal && (
              <button
                onClick={onOpenUploadModal}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 hover:border-amber-500 flex items-center gap-1.5 transition shadow-sm"
                title="Drop atau Upload HTML / AMP / Skema Template Baru"
              >
                <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Upload HTML</span>
              </button>
            )}

            {/* Quick Preview */}
            <button
              onClick={onOpenPreview}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              title="Lihat Kode & Preview Iframe"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview</span>
            </button>

            {/* Download HTML */}
            <button
              onClick={onDownloadCurrent}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              title="Download file HTML halaman ini"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">HTML</span>
            </button>

            {/* Deploy / Export ZIP Bundle */}
            {onOpenDeployModal && (
              <button
                onClick={onOpenDeployModal}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition"
                title="Ekspor Paket Siap Deploy ke Cloudflare, GitHub, cPanel, & Antigravity"
              >
                <FolderArchive className="w-3.5 h-3.5" />
                <span>Deploy ZIP</span>
              </button>
            )}

            {/* Google Drive Button */}
            <button
              onClick={onOpenDriveModal}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-1.5 transition"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Google Drive</span>
            </button>

            {/* User Login/Logout */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-7 h-7 rounded-full border border-slate-700 object-cover cursor-pointer"
                    onClick={onOpenDriveModal}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    onClick={onOpenDriveModal}
                    className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition"
                  title="Logout Akun Google"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs shadow transition border border-slate-300"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>Google Sign-In</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
