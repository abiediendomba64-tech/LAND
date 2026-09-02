import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  EyeOff,
  CopySlash,
  Terminal,
  Volume2,
  VolumeX,
  Play,
  Check,
  Copy,
  Code2,
  Download,
  AlertTriangle,
  RefreshCw,
  Zap,
  Info,
  Bug,
} from 'lucide-react';
import type { CyberShieldConfig } from '../types';
import { generateCyberShieldScript, playCyberWarningSound } from '../utils/cyberShield';

interface CyberShieldStudioProps {
  config: CyberShieldConfig;
  onChange: (config: CyberShieldConfig) => void;
  brandName?: string;
}

export const CyberShieldStudio: React.FC<CyberShieldStudioProps> = ({
  config,
  onChange,
  brandName = 'SISTEM RESMI VIP',
}) => {
  const [copied, setCopied] = useState(false);
  const [testSimulatedAlert, setTestSimulatedAlert] = useState<{
    visible: boolean;
    reason: string;
    timestamp: string;
  } | null>(null);

  const rawScript = generateCyberShieldScript(config, brandName);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(rawScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadScript = () => {
    const blob = new Blob([rawScript], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cyber-shield-anti-inspect.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerSimulator = (reason: string) => {
    if (config.enableSoundAlert) {
      playCyberWarningSound();
    }
    setTestSimulatedAlert({
      visible: true,
      reason,
      timestamp: new Date().toLocaleString('id-ID'),
    });

    if (config.autoCloseTimeout > 0) {
      setTimeout(() => {
        setTestSimulatedAlert(null);
      }, config.autoCloseTimeout * 1000);
    }
  };

  const updateSetting = <K extends keyof CyberShieldConfig>(
    key: K,
    value: CyberShieldConfig[K]
  ) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Shield Radar */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/70 border-2 border-red-500/40 p-6 md:p-8 shadow-2xl shadow-red-950/40">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-black tracking-wider uppercase">
              <ShieldAlert className="w-4 h-4 animate-pulse text-red-400" />
              <span>Cyber Shield Anti-Theft &amp; Anti-Inspect Suite</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Perlindungan Siber dari Skema Curang &amp; Pencurian Kode
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Memblokir <b className="text-amber-300">Ctrl + U (View-Source)</b>, <b className="text-amber-300">F12 &amp; Inspect Element</b>, <b className="text-amber-300">Copy-Paste Teks</b>, dan <b className="text-amber-300">Klik Kanan</b> untuk menjaga landing page Anda dari orang nakal dan bot pencuri konten.
            </p>
          </div>

          {/* Master Toggle */}
          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <span>Status Proteksi Siber:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase ${config.enabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}>
                {config.enabled ? 'AKTIF (PROTECTED)' : 'NONAKTIF'}
              </span>
            </div>
            <button
              onClick={() => updateSetting('enabled', !config.enabled)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.enabled ? 'bg-red-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.enabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-[10px] text-slate-400">
              {config.enabled ? 'Semua halaman otomatis terlindungi' : 'Klik untuk mengaktifkan'}
            </span>
          </div>
        </div>

        {/* Protection Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6 pt-6 border-t border-red-500/20">
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
            <EyeOff className="w-4 h-4 text-red-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200">Block Ctrl+U</div>
              <div className="text-[10px] text-slate-400">View Source</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
            <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200">Block F12 &amp; Inspect</div>
              <div className="text-[10px] text-slate-400">DevTools Window</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
            <CopySlash className="w-4 h-4 text-rose-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200">Anti-Copy &amp; Cut</div>
              <div className="text-[10px] text-slate-400">Pencurian Teks</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200">Anti-Right Click</div>
              <div className="text-[10px] text-slate-400">Context Menu</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
            <Bug className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200">Anti-Debugger Loop</div>
              <div className="text-[10px] text-slate-400">Trap Reverse Eng</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
            <Volume2 className="w-4 h-4 text-yellow-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200">Audio Alarm Siren</div>
              <div className="text-[10px] text-slate-400">Synthesizer Beep</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Controls + Simulator Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Switches (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Detailed Security Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-400" /> Pengaturan Blokir &amp; Intersepsi Siber
              </h2>
              <span className="text-[11px] text-slate-400">Atur skema pertahanan</span>
            </div>

            <div className="space-y-3">
              {/* Block Ctrl+U */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Blokir Pintasan View-Source (Ctrl + U)</span>
                    <span className="px-1.5 py-0.2 bg-red-500/20 text-red-300 text-[10px] rounded font-mono">Ctrl+U / Cmd+Opt+U</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Mencegah pengguna nakal melihat struktur source code HTML asli halaman.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.blockCtrlU}
                  onChange={(e) => updateSetting('blockCtrlU', e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Block F12 & Inspect */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Blokir Developer Tools &amp; Inspect Element</span>
                    <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded font-mono">F12 / Ctrl+Shift+I/J/C</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Memblokir tombol F12, Console browser, dan Element Inspector.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.blockDevInspect}
                  onChange={(e) => updateSetting('blockDevInspect', e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Block Right Click */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Blokir Klik Kanan (Context Menu)</span>
                    <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 text-[10px] rounded font-mono">oncontextmenu</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Menghilangkan menu klik kanan untuk inspect dan unduh aset web.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.blockRightClick}
                  onChange={(e) => updateSetting('blockRightClick', e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Block Copy & Text Selection */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Blokir Copy-Paste &amp; Seleksi Teks</span>
                    <span className="px-1.5 py-0.2 bg-rose-500/20 text-rose-300 text-[10px] rounded font-mono">Ctrl+C / user-select: none</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Mematikan seleksi teks (highlight) dan mencegah pintasan Ctrl+C / Ctrl+A.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.blockTextCopy}
                  onChange={(e) => updateSetting('blockTextCopy', e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Block Save Page & Print */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Blokir Simpan Halaman (Ctrl+S) &amp; Cetak (Ctrl+P)</span>
                    <span className="px-1.5 py-0.2 bg-blue-500/20 text-blue-300 text-[10px] rounded font-mono">Ctrl+S / Ctrl+P</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Mencegah pengguna mengunduh halaman secara offline atau mencetak dokumen.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.blockSaveAndPrint}
                  onChange={(e) => updateSetting('blockSaveAndPrint', e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Anti-Debugger Loop */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Anti-Debugger Loop &amp; Console Watermark</span>
                    <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded font-mono">debugger() trap</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Mengunci eksekusi jika seseorang mencoba membongkar script via debugger browser.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.enableAntiDebugger}
                  onChange={(e) => updateSetting('enableAntiDebugger', e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Sound Siren Alert */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Suara Alarm Cyber Peringatan (Audio Synth)</span>
                    <span className="px-1.5 py-0.2 bg-yellow-500/20 text-yellow-300 text-[10px] rounded font-mono">Web Audio API</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Memutar nada peringatan sirene ketika ada percobaan inspect / copy terlarang.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={playCyberWarningSound}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-yellow-400 text-xs flex items-center gap-1 border border-slate-700 transition"
                    title="Uji Suara Sirene"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Test</span>
                  </button>
                  <input
                    type="checkbox"
                    checked={config.enableSoundAlert}
                    onChange={(e) => updateSetting('enableSoundAlert', e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Warning Modal Customizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Kustomisasi Tampilan Peringatan (Cyber Modal)
            </h2>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Judul Modal Peringatan
                </label>
                <input
                  type="text"
                  value={config.warningTitle}
                  onChange={(e) => updateSetting('warningTitle', e.target.value)}
                  placeholder="Contoh: 🚨 PERINGATAN KEAMANAN SIBER"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Isi Pesan Peringatan (Alasan Pelarangan)
                </label>
                <textarea
                  rows={2}
                  value={config.warningMessage}
                  onChange={(e) => updateSetting('warningMessage', e.target.value)}
                  placeholder="Isi pesan peringatan detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Label Badge Sistem
                  </label>
                  <input
                    type="text"
                    value={config.badgeText}
                    onChange={(e) => updateSetting('badgeText', e.target.value)}
                    placeholder="Contoh: 🛡️ CYBER SHIELD ACTIVE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Durasi Otomatis Tutup (Detik)
                  </label>
                  <select
                    value={config.autoCloseTimeout}
                    onChange={(e) => updateSetting('autoCloseTimeout', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                  >
                    <option value={3}>3 Detik</option>
                    <option value={5}>5 Detik (Rekomendasi)</option>
                    <option value={8}>8 Detik</option>
                    <option value={0}>Manual Tutup (Klik Tombol Saja)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Simulator & Standalone Exporter (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Simulator Box */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" /> Uji Coba Serangan (Simulator)
              </h2>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Ready
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Tekan tombol simulasi di bawah untuk menguji respons sistem pertahanan siber seperti yang akan dilihat oleh pengunjung:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => triggerSimulator("Melihat Source Code (Ctrl + U) telah diblokir demi keamanan sistem.")}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/60 hover:bg-red-950/20 text-left transition group"
              >
                <div className="text-xs font-bold text-slate-200 group-hover:text-red-300 flex items-center justify-between">
                  <span>Ctrl + U</span>
                  <EyeOff className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Uji Coba View Source</div>
              </button>

              <button
                type="button"
                onClick={() => triggerSimulator("Akses Developer Tools (F12) tidak diizinkan pada sistem yang dilindungi ini.")}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 hover:bg-amber-950/20 text-left transition group"
              >
                <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 flex items-center justify-between">
                  <span>F12 / Inspect</span>
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Uji Coba DevTools</div>
              </button>

              <button
                type="button"
                onClick={() => triggerSimulator("Klik kanan dinonaktifkan untuk melindungi hak cipta dan keamanan source code.")}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 hover:bg-purple-950/20 text-left transition group"
              >
                <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300 flex items-center justify-between">
                  <span>Klik Kanan</span>
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Uji Context Menu</div>
              </button>

              <button
                type="button"
                onClick={() => triggerSimulator("Penyalinan konten (Copy Ctrl+C) dilarang oleh protokol keamanan.")}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/60 hover:bg-rose-950/20 text-left transition group"
              >
                <div className="text-xs font-bold text-slate-200 group-hover:text-rose-300 flex items-center justify-between">
                  <span>Copy / Cut</span>
                  <CopySlash className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Uji Coba Anti-Theft</div>
              </button>
            </div>

            {/* Interactive Sandbox Test Box */}
            <div
              onContextMenu={(e) => {
                if (config.blockRightClick) {
                  e.preventDefault();
                  triggerSimulator("Klik kanan dinonaktifkan di dalam zona perlindungan ini.");
                }
              }}
              className="p-4 rounded-xl border border-dashed border-red-500/30 bg-red-950/10 text-center space-y-2 select-none"
            >
              <div className="text-xs font-bold text-red-300">
                Zona Uji Coba Langsung (Klik Kanan / Coba Copy disini)
              </div>
              <p className="text-[11px] text-slate-400">
                Coba lakukan klik kanan atau sorot teks ini untuk merasakan pencegahan secara langsung.
              </p>
            </div>
          </div>

          {/* Standalone Script Exporter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" /> Standalone Anti-Inspect Script
              </h2>
              <span className="text-[11px] text-slate-400">Pure JS / Zero Lib</span>
            </div>

            <p className="text-xs text-slate-400">
              Gunakan script mandiri ini untuk dipasang di website atau landing page eksternal mana pun:
            </p>

            <div className="relative">
              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-300 max-h-36 overflow-y-auto">
                {rawScript}
              </pre>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyScript}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Kode Script</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadScript}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
                title="Download file HTML/JS"
              >
                <Download className="w-4 h-4" />
                <span>Unduh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Warning Modal Rendered on Trigger */}
      {testSimulatedAlert && testSimulatedAlert.visible && (
        <div
          onClick={() => setTestSimulatedAlert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-red-500 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl shadow-red-950/80 transform animate-popIn space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 text-red-400 flex items-center justify-center mx-auto text-3xl animate-pulse shadow-lg shadow-red-500/30">
              🛡️
            </div>

            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-black uppercase tracking-wider mb-2">
                {config.badgeText}
              </span>
              <h3 className="text-lg font-black text-white">{config.warningTitle}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {testSimulatedAlert.reason}
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left font-mono text-[11px] text-slate-400 space-y-1">
              <div>🔒 <b className="text-slate-200">Status:</b> Akses Mencurigakan Ditolak (Blocked)</div>
              <div>🛡️ <b className="text-slate-200">Target:</b> {brandName} Protected System</div>
              <div>🕒 <b className="text-slate-200">Waktu:</b> {testSimulatedAlert.timestamp}</div>
              <div>⚠️ <b className="text-slate-200">Catatan:</b> Tindakan dilarang keras oleh protokol hak cipta.</div>
            </div>

            <button
              type="button"
              onClick={() => setTestSimulatedAlert(null)}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition"
            >
              MENGERTI &amp; TUTUP SIMULASI
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
