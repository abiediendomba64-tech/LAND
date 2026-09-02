# LAND — deployment fix

## Struktur
Project ini dikembalikan ke struktur `src/components`, `src/services`, `src/utils`, dan `src/data` agar import relatif Vite/TypeScript konsisten.

## Netlify
Build command: `npm run build:client`
Publish directory: `dist`
Functions directory: `netlify/functions`

API yang tersedia:
- `POST /api/grab-url-assets`
- `GET /api/health`
- `POST /api/ai/page1-seo`

`/api/grab-url-assets` mengambil HTML secara server-side, mengikuti redirect terbatas, mengekstrak metadata, link, gambar, script, stylesheet, media, icon, `srcset`, dan CSS `url(...)`.

Crawler tidak menjalankan JavaScript dari situs target. Validasi URL dan pembatasan ukuran/timeouts digunakan untuk mengurangi risiko SSRF dan resource exhaustion.

## Environment
Set `GEMINI_API_KEY` di environment Netlify jika fitur AI ingin memakai Gemini. Tanpa key, Page 1 SEO tetap mengembalikan fallback deterministik.
