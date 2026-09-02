import React, { useState, useEffect, useRef } from 'react';
import {
  HardDrive,
  UploadCloud,
  FileCode,
  ExternalLink,
  Trash2,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Search,
  Upload,
  Zap,
  Check,
} from 'lucide-react';
import type { GoogleDriveFile, UserProfile } from '../types';
import {
  listDriveFiles,
  uploadFileToDrive,
  uploadBlobToDrive,
  getDriveFileContent,
  deleteDriveFile,
} from '../services/drive';
import { ConfirmDialog } from './ConfirmDialog';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  accessToken: string | null;
  onLogin: () => Promise<void>;
  isLoggingIn: boolean;
  currentContentToSave?: {
    filename: string;
    content: string;
    type: string;
  };
  onLoadContent?: (content: string, filename: string) => void;
  autoUploadEnabled?: boolean;
  onToggleAutoUpload?: () => void;
  isSyncing?: boolean;
  lastSyncTime?: Date | null;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  user,
  accessToken,
  onLogin,
  isLoggingIn,
  currentContentToSave,
  onLoadContent,
  autoUploadEnabled = false,
  onToggleAutoUpload,
  isSyncing = false,
  lastSyncTime = null,
}) => {
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [customFilename, setCustomFilename] = useState(
    currentContentToSave?.filename || `landing-page-${Date.now()}.html`
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Destructive delete confirmation state
  const [fileToDelete, setFileToDelete] = useState<GoogleDriveFile | null>(null);

  useEffect(() => {
    if (currentContentToSave?.filename) {
      setCustomFilename(currentContentToSave.filename);
    }
  }, [currentContentToSave]);

  const loadFiles = async () => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      const driveFiles = await listDriveFiles(accessToken);
      setFiles(driveFiles);
    } catch (err: any) {
      setError(err?.message || 'Gagal memuat file dari Google Drive');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && accessToken) {
      loadFiles();
    }
  }, [isOpen, accessToken]);

  const handleSaveToDrive = async () => {
    if (!accessToken || !currentContentToSave?.content) return;
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const finalName =
        customFilename.endsWith('.html') || customFilename.endsWith('.json')
          ? customFilename
          : `${customFilename}.html`;

      const mimeType = finalName.endsWith('.json') ? 'application/json' : 'text/html';
      const uploaded = await uploadFileToDrive(
        accessToken,
        finalName,
        currentContentToSave.content,
        mimeType
      );

      setSuccessMessage(`Berhasil menyimpan "${uploaded.name}" ke Google Drive!`);
      await loadFiles();
    } catch (err: any) {
      setError(err?.message || 'Gagal mengunggah file ke Google Drive');
    } finally {
      setSaving(false);
    }
  };

  const handleDirectFileUpload = async (file: File) => {
    if (!accessToken) return;
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const uploaded = await uploadBlobToDrive(accessToken, file);
      setSuccessMessage(`File "${uploaded.name}" berhasil di-upload otomatis ke Google Drive!`);
      await loadFiles();
    } catch (err: any) {
      setError(err?.message || 'Gagal mengunggah file ke Google Drive');
    } finally {
      setSaving(false);
    }
  };

  const handleReadFile = async (file: GoogleDriveFile) => {
    if (!accessToken || !onLoadContent) return;
    setLoading(true);
    try {
      const content = await getDriveFileContent(accessToken, file.id);
      onLoadContent(content, file.name);
      setSuccessMessage(`File "${file.name}" berhasil dimuat ke editor!`);
    } catch (err: any) {
      setError(err?.message || 'Gagal membaca konten file');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteFile = async () => {
    if (!accessToken || !fileToDelete) return;
    const target = fileToDelete;
    setFileToDelete(null);
    setLoading(true);
    try {
      await deleteDriveFile(accessToken, target.id);
      setSuccessMessage(`File "${target.name}" berhasil dihapus dari Google Drive.`);
      setFiles((prev) => prev.filter((f) => f.id !== target.id));
    } catch (err: any) {
      setError(err?.message || 'Gagal menghapus file');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                Google Drive Storage &amp; Auto-Sync
              </h2>
              <p className="text-xs text-slate-400">
                Simpan &amp; sinkronkan template landing page, script, dan asset gambar ke Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-grow">
          {/* Notification Banners */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Auth State Checking */}
          {!user || !accessToken ? (
            <div className="text-center py-10 px-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <HardDrive className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Hubungkan Akun Google Drive</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Masuk dengan akun Google Anda untuk mengaktifkan Auto-Uploads dan menyimpan template secara otomatis di Google Drive Anda.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={onLogin}
                  disabled={isLoggingIn}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs shadow-lg transition border border-slate-300 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{isLoggingIn ? 'Menghubungkan...' : 'Sign in with Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Account Status Info & Auto-Upload Toggle */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-9 h-9 rounded-full border border-slate-700 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.displayName?.[0] || 'U'}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-white">{user.displayName || 'Google User'}</div>
                      <div className="text-[11px] text-slate-400">{user.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={loadFiles}
                      disabled={loading}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                      title="Refresh file"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Auto-Uploads Switch Card */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Auto-Uploads ke Google Drive</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Otomatis simpan project ke Drive setiap ada perubahan
                      {lastSyncTime && ` • Sync: ${lastSyncTime.toLocaleTimeString('id-ID')}`}
                    </div>
                  </div>

                  <button
                    onClick={onToggleAutoUpload}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      autoUploadEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        autoUploadEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Drag & Drop File Auto-Uploader Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingFile(true);
                }}
                onDragLeave={() => setIsDraggingFile(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingFile(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleDirectFileUpload(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`p-4 rounded-xl border-2 border-dashed transition text-center cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  isDraggingFile
                    ? 'border-blue-400 bg-blue-500/10'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleDirectFileUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-200">
                  Tarik &amp; Letakkan File Disini untuk Auto-Upload ke Drive
                </div>
                <div className="text-[10px] text-slate-500">
                  Mendukung file .html, .json, gambar (.png, .webp, .jpg), dan asset web
                </div>
              </div>

              {/* Save Current Workspace to Google Drive */}
              {currentContentToSave && (
                <div className="p-4 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 rounded-xl border border-blue-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4" /> Simpan {currentContentToSave.type} ke Google Drive
                    </span>
                    <span className="text-[10px] text-slate-400">Format: HTML / JSON</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customFilename}
                      onChange={(e) => setCustomFilename(e.target.value)}
                      placeholder="nama-file.html"
                      className="flex-grow px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                    <button
                      onClick={handleSaveToDrive}
                      disabled={saving || !currentContentToSave.content}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition shadow-lg shadow-blue-600/20 flex items-center gap-1.5 disabled:opacity-50 shrink-0"
                    >
                      {saving ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Menyimpan...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Simpan ke Drive</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Saved Files List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-amber-400" /> File di Google Drive ({files.length})
                  </h4>
                  <div className="relative w-48">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Cari file..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 focus:outline-none focus:border-slate-600"
                    />
                  </div>
                </div>

                {loading && files.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-400" />
                    Memuat daftar file dari Google Drive...
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="text-center py-8 bg-slate-950/40 rounded-xl border border-slate-800/60 text-slate-500 text-xs space-y-1">
                    <FileText className="w-6 h-6 mx-auto text-slate-600 mb-1" />
                    <p>Belum ada file landing page yang disimpan di Google Drive.</p>
                    <p className="text-[10px] text-slate-600">Gunakan tombol simpan atau drop file di atas.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="p-3 bg-slate-950/80 hover:bg-slate-850 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                            <FileCode className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-200 truncate">{file.name}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(file.modifiedTime).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              {file.size && <span>{(parseInt(file.size) / 1024).toFixed(1)} KB</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {onLoadContent && (
                            <button
                              onClick={() => handleReadFile(file)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 border border-slate-700 transition"
                              title="Muat file ini ke editor"
                            >
                              Buka
                            </button>
                          )}

                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
                              title="Buka di Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <button
                            onClick={() => setFileToDelete(file)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-800/60 transition"
                            title="Hapus dari Google Drive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>Google Drive v3 API Verified Integration</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!fileToDelete}
        title="Hapus File dari Google Drive"
        message={`Apakah Anda yakin ingin menghapus file "${fileToDelete?.name}" secara permanen dari akun Google Drive Anda? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus Sekarang"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={confirmDeleteFile}
        onCancel={() => setFileToDelete(null)}
      />
    </div>
  );
};
