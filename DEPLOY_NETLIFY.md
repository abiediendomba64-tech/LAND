# Deploy LAND ke Netlify

1. Upload/push seluruh isi folder ini ke repository.
2. Di Netlify pilih repository tersebut.
3. Build command: `npm run build:client`
4. Publish directory: `dist`
5. Functions directory sudah diatur di `netlify.toml`.
6. Tambahkan environment variable `GEMINI_API_KEY` bila fitur AI Page 1 ingin aktif.
7. Deploy ulang.

### Verifikasi setelah deploy
- `GET /api/health` harus mengembalikan JSON `status: ok`.
- `POST /api/grab-url-assets` menerima `{ "url": "https://example.com" }`.
- Console browser tidak boleh lagi menunjukkan 404 `/api/grab-url-assets`.
- `POST /api/ai/page1-seo` tersedia; tanpa API key fungsi tetap memakai fallback.

Jangan deploy folder `dist` sebagai source repository. Netlify yang membangunnya dari source.
