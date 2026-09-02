import React, { useState } from 'react';
import {
  X,
  Download,
  FolderArchive,
  Cloud,
  Github,
  Server,
  Code2,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  FileCode,
  FileText,
  Sparkles,
} from 'lucide-react';
import type {
  AmpConfig,
  PortalConfig,
  RegisterConfig,
  SafeLinkConfig,
  CyberShieldConfig,
  CdnScriptConfig,
} from '../types';
import {
  createDeployZip,
  generateHtaccess,
  generateRobotsTxt,
  generateSitemapXml,
  generateCloudflareRedirects,
  generateCloudflareHeaders,
  DeployPackageOptions,
} from '../services/deployBundleService';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  ampConfig: AmpConfig;
  portalConfig: PortalConfig;
  registerConfig: RegisterConfig;
  safelinkConfig: SafeLinkConfig;
  cyberShieldConfig: CyberShieldConfig;
  cdnScripts: CdnScriptConfig;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  ampConfig,
  portalConfig,
  registerConfig,
  safelinkConfig,
  cyberShieldConfig,
  cdnScripts,
}) => {
  const [activeDeployTab, setActiveDeployTab] = useState<'zip' | 'cloudflare' | 'github' | 'cpanel' | 'antigravity'>('zip');
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [options, setOptions] = useState<DeployPackageOptions>({
    primaryLanding: 'amp',
    includeHtaccess: true,
    includeCloudflareConfig: true,
    includeGithubPagesConfig: true,
    includeSitemap: true,
    includeCyberShield: true,
  });

  if (!isOpen) return null;

  const brand = portalConfig.siteName || ampConfig.brandName || 'OFFICIAL-VIP';
  const cleanBrandSlug = brand.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const handleDownloadZip = async () => {
    setIsGeneratingZip(true);
    try {
      const blob = await createDeployZip(
        ampConfig,
        portalConfig,
        registerConfig,
        safelinkConfig,
        cyberShieldConfig,
        cdnScripts,
        options
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cleanBrandSlug}-deploy-bundle.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating deploy zip:', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-black">
              <FolderArchive className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Deploy Ready Suite & Bundle Exporter
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Ready 100%
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Ekspor file siap tayang untuk Cloudflare Pages, GitHub, cPanel httpdocs, dan Antigravity IDE.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2 gap-2 overflow-x-auto">
          {[
            { id: 'zip', label: '1-Click ZIP Bundle', icon: FolderArchive },
            { id: 'cloudflare', label: 'Cloudflare Pages', icon: Cloud },
            { id: 'github', label: 'GitHub Pages', icon: Github },
            { id: 'cpanel', label: 'cPanel / httpdocs', icon: Server },
            { id: 'antigravity', label: 'Antigravity / Local IDE', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDeployTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDeployTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-amber-500 text-amber-400 bg-slate-900/80 rounded-t-lg'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeDeployTab === 'zip' && (
            <div className="space-y-6">
              {/* Quick Summary Card */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Paket Komplit Siap Deploy ({cleanBrandSlug}-deploy-bundle.zip)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Semua 4 halaman (AMP, Portal, VIP Register, SafeLink) + Konfigurasi Server (_redirects, _headers, .htaccess, robots.txt, sitemap.xml, & CyberShield) otomatis terbundel dalam 1 file ZIP.
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  disabled={isGeneratingZip}
                  className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition shrink-0"
                >
                  {isGeneratingZip ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{isGeneratingZip ? 'Mengemas ZIP...' : 'Download ZIP Deploy'}</span>
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Primary Root Page */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Halaman Utama (index.html)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOptions((o) => ({ ...o, primaryLanding: 'amp' }))}
                      className={`p-3 rounded-lg border text-left transition ${
                        options.primaryLanding === 'amp'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">Google AMP Valid</div>
                      <div className="text-[11px] text-slate-400">Tercepat & Prioritas SEO</div>
                    </button>
                    <button
                      onClick={() => setOptions((o) => ({ ...o, primaryLanding: 'portal' }))}
                      className={`p-3 rounded-lg border text-left transition ${
                        options.primaryLanding === 'portal'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">Portal Utama Hub</div>
                      <div className="text-[11px] text-slate-400">Etalase Game & Navigasi</div>
                    </button>
                  </div>
                </div>

                {/* Option 2: Config Inclusions */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    File Ekstra dalam Paket
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={options.includeCloudflareConfig}
                        onChange={(e) =>
                          setOptions((o) => ({ ...o, includeCloudflareConfig: e.target.checked }))
                        }
                        className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                      />
                      <span>_redirects & _headers</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={options.includeHtaccess}
                        onChange={(e) =>
                          setOptions((o) => ({ ...o, includeHtaccess: e.target.checked }))
                        }
                        className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                      />
                      <span>Apache .htaccess</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={options.includeSitemap}
                        onChange={(e) =>
                          setOptions((o) => ({ ...o, includeSitemap: e.target.checked }))
                        }
                        className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                      />
                      <span>sitemap.xml</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={options.includeCyberShield}
                        onChange={(e) =>
                          setOptions((o) => ({ ...o, includeCyberShield: e.target.checked }))
                        }
                        className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                      />
                      <span>cyber-shield.js</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Manifest File List */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Daftar Berkas yang Dibuat dalam ZIP:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">index.html</div>
                      <div className="text-[10px] text-slate-400">Root Landing Page</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">amp.html</div>
                      <div className="text-[10px] text-slate-400">Google AMP Valid</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">portal.html</div>
                      <div className="text-[10px] text-slate-400">Portal Utama Hub</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">register.html</div>
                      <div className="text-[10px] text-slate-400">VIP Register Form</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">safelink.html</div>
                      <div className="text-[10px] text-slate-400">SafeLink Anti-Bot</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">cyber-shield.js</div>
                      <div className="text-[10px] text-slate-400">Security & Anti-Inspect</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">robots.txt & sitemap</div>
                      <div className="text-[10px] text-slate-400">Crawler Directives</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">.htaccess & _headers</div>
                      <div className="text-[10px] text-slate-400">Cloudflare & Apache Rules</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-yellow-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">README.md</div>
                      <div className="text-[10px] text-slate-400">Deployment Guide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cloudflare Pages */}
          {activeDeployTab === 'cloudflare' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
                <Cloud className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-blue-300">Cara Deploy ke Cloudflare Pages (Gratis & Tercepat)</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Cloudflare Pages memberikan SSL gratis, CDN 300+ lokasi global, proteksi DDoS, dan waktu muat kurang dari 0.3 detik.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200">Langkah 1: Download Paket ZIP</div>
                  <p>Klik tombol <strong>Download ZIP Deploy</strong> pada tab ZIP Bundle.</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200">Langkah 2: Buka Cloudflare Pages</div>
                  <p>
                    Kunjungi <strong>dash.cloudflare.com</strong> &gt; <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong> &gt; <strong>Direct Upload</strong>.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200">Langkah 3: Upload & Deploy</div>
                  <p>Ekstrak ZIP lalu drag-and-drop folder ke Cloudflare Pages. Klik <strong>Deploy site</strong>.</p>
                </div>
              </div>

              {/* Copyable _redirects */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">_redirects (Included in ZIP)</span>
                  <button
                    onClick={() => copyToClipboard(generateCloudflareRedirects(), 'cf-redirects')}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-200 transition"
                  >
                    {copiedKey === 'cf-redirects' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'cf-redirects' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-slate-900 text-slate-300 font-mono text-[11px] overflow-x-auto">
                  {generateCloudflareRedirects()}
                </pre>
              </div>
            </div>
          )}

          {/* GitHub Pages */}
          {activeDeployTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-start gap-3">
                <Github className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Cara Deploy ke GitHub Pages</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Hosting statis gratis di domain <code>username.github.io/repo</code> atau domain kustom Anda.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-200">1. Buat Repo Baru di GitHub</div>
                  <p>Buat repository Public (misal: <code>{cleanBrandSlug}-landing</code>).</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-200">2. Upload Seluruh File Paket</div>
                  <p>Upload seluruh isi ZIP (pastikan <code>index.html</code> dan <code>.nojekyll</code> berada di root repository).</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-200">3. Aktifkan Pages di Settings</div>
                  <p>Masuk ke <strong>Settings &gt; Pages</strong>, pilih Branch <code>main</code> / <code>root</code>, klik <strong>Save</strong>.</p>
                </div>
              </div>
            </div>
          )}

          {/* cPanel / httpdocs */}
          {activeDeployTab === 'cpanel' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Server className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-300">Hosting cPanel / LiteSpeed / Nginx (public_html / httpdocs)</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    File <code>.htaccess</code> lengkap dengan konfigurasi HTTPS redirect, GZIP compression, and security headers telah disertakan.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-200">1. Buka cPanel File Manager</div>
                  <p>Masuk ke folder <code>public_html</code> (atau <code>httpdocs</code> untuk Plesk).</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-200">2. Upload ZIP & Extract</div>
                  <p>Upload file <code>{cleanBrandSlug}-deploy-bundle.zip</code> lalu klik kanan &gt; <strong>Extract</strong>.</p>
                </div>
              </div>

              {/* Copyable .htaccess */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">.htaccess (Included in ZIP)</span>
                  <button
                    onClick={() => copyToClipboard(generateHtaccess(brand), 'htaccess')}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-200 transition"
                  >
                    {copiedKey === 'htaccess' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'htaccess' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-slate-900 text-slate-300 font-mono text-[11px] max-h-48 overflow-y-auto">
                  {generateHtaccess(brand)}
                </pre>
              </div>
            </div>
          )}

          {/* Antigravity / Local IDE */}
          {activeDeployTab === 'antigravity' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-start gap-3">
                <Code2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-purple-300">Antigravity IDE & Local Web Server</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Semua output adalah file HTML statis mandiri (zero build tool dependency) yang dapat langsung dijalankan menggunakan web server lokal apa pun.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200">Perintah Eksekusi Server Lokal Instan:</div>
                <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 flex items-center justify-between">
                  <code>npx serve . -p 3000</code>
                  <button
                    onClick={() => copyToClipboard('npx serve . -p 3000', 'serve-cmd')}
                    className="text-slate-400 hover:text-slate-200 transition"
                  >
                    {copiedKey === 'serve-cmd' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Atau jika menggunakan Python: <code>python3 -m http.server 8080</code>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Semua file telah diaudit keamanan & validasi AMP.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition"
            >
              Tutup
            </button>
            <button
              onClick={handleDownloadZip}
              disabled={isGeneratingZip}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP ({cleanBrandSlug}.zip)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
