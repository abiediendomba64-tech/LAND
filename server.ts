import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// AI Google Page 1 Rank 1 Content & Schema Generator
app.post('/api/ai/page1-seo', async (req, res) => {
  try {
    const {
      brandName = 'VIP OFFICIAL',
      targetKeyword = 'Slot Gacor Hari Ini',
      niche = 'Slot Online & RTP Live',
      schemaType = 'FAQPage',
      targetUrl = 'https://vip-official.pages.dev',
      minDeposit = 'Rp 10.000',
      rtpRate = '98.8%',
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // High-quality deterministic fallback if no API key is set
      const cleanBrand = brandName.trim() || 'VIP OFFICIAL';
      const cleanKeyword = targetKeyword.trim() || 'Slot Gacor Hari Ini';

      const page1Title = `${cleanBrand} ⚡ ${cleanKeyword} Terpercaya & RTP Live ${rtpRate} Maxwin 2025`;
      const metaDescription = `Daftar di ${cleanBrand}, situs ${cleanKeyword} resmi dengan bocoran RTP Live ${rtpRate}, min deposit ${minDeposit}, pola gacor harian, dan garansi bayar 100%.`;
      const lsiKeywords = [
        `${cleanKeyword}`,
        `${cleanKeyword.toLowerCase()} malam ini`,
        `rtp live slot ${cleanBrand.toLowerCase()}`,
        `bocoran slot gacor maxwin`,
        `situs slot deposit ${minDeposit.toLowerCase()}`,
        `daftar link alternatif ${cleanBrand.toLowerCase()}`,
      ];

      const faqItems = [
        {
          question: `Apa keuntungan bermain ${cleanKeyword} di ${cleanBrand}?`,
          answer: `${cleanBrand} memberikan garansi pembayaran 100% cepat, RTP Live terverifikasi hingga ${rtpRate}, serta layanan VIP 24 jam nonstop.`,
        },
        {
          question: `Berapa minimal deposit di ${cleanBrand}?`,
          answer: `Minimal deposit sangat terjangkau yaitu ${minDeposit} dengan metode Bank Transfer, QRIS, E-Wallet, dan Pulsa tanpa potongan.`,
        },
        {
          question: `Apakah ada bocoran jam gacor dan pola spin?`,
          answer: `Ya, ${cleanBrand} menyediakan fitur bocoran jam hoki dan persentase RTP real-time yang diupdate otomatis setiap 2 menit.`,
        },
      ];

      const jsonLdSchema = {
        '@context': 'https://schema.org',
        '@type': schemaType === 'FAQPage' ? 'FAQPage' : 'WebPage',
        name: page1Title,
        description: metaDescription,
        url: targetUrl,
        publisher: {
          '@type': 'Organization',
          name: cleanBrand,
        },
        ...(schemaType === 'FAQPage'
          ? {
              mainEntity: faqItems.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            }
          : {}),
      };

      return res.json({
        success: true,
        source: 'smart-engine',
        data: {
          page1Title,
          metaDescription,
          lsiKeywords,
          seoHeading: `Situs Resmi ${cleanKeyword} & Portal RTP Live Terupdate di ${cleanBrand}`,
          seoParagraph: `Selamat datang di ${cleanBrand}, destinasi resmi ${cleanKeyword} dengan lisensi terpercaya. Kami menghadirkan ekosistem bermain modern dengan rate kemenangan tinggi, keamanan Cyber Shield mutakhir, serta pengalaman bermain demo dan real-play tanpa hambatan. Dapatkan akses eksklusif link alternatif resmi bebas blokir setiap saat.`,
          faqItems,
          jsonLdSchema,
          trendingTopics: [
            'Slot Gacor Malam Ini',
            'Pola Maxwin Olympus 1000',
            'Bocoran Mahjong Ways 2',
            'RTP Live Pragmatic 98%',
            'Link Alternatif Bebas Blokir',
          ],
        },
      });
    }

    const ai = getGenAI();
    const prompt = `Sebagai pakar SEO Google Page 1 Rank 1 dan Master Copywriter iGaming / Portal Landing Page:
Buat paket optimasi SEO lengkap dan Schema JSON-LD untuk:
- Brand Name: "${brandName}"
- Target Keyword: "${targetKeyword}"
- Niche: "${niche}"
- Skema yang dipilih: "${schemaType}"
- Target Link / Canonical: "${targetUrl}"
- Min Deposit: "${minDeposit}"
- RTP Rate: "${rtpRate}"

Kembalikan HANYA JSON murni (valid JSON tanpa backticks) dengan format:
{
  "page1Title": "Title tag persuasif 55-60 karakter dengan CTR tinggi",
  "metaDescription": "Meta description 150-160 karakter menarik dengan ajakan bertindak",
  "lsiKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
  "seoHeading": "Heading H1/H2 yang kuat dan mengandung keyword utama",
  "seoParagraph": "Paragraf artikel SEO 80-120 kata yang mengalir natural dan bernilai informatif",
  "faqItems": [
    {"question": "Pertanyaan 1?", "answer": "Jawaban 1."},
    {"question": "Pertanyaan 2?", "answer": "Jawaban 2."},
    {"question": "Pertanyaan 3?", "answer": "Jawaban 3."}
  ],
  "jsonLdSchema": { ... valid schema.org JSON object sesuai schemaType ... },
  "trendingTopics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
    });

    const responseText = response.text || '';
    const cleanJson = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);

    return res.json({
      success: true,
      source: 'gemini-3.7-flash',
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating Page 1 SEO via Gemini:', error);
    // Fallback response if AI call encounters issue
    return res.status(200).json({
      success: true,
      source: 'fallback',
      data: {
        page1Title: `${req.body.brandName || 'VIP OFFICIAL'} ⚡ ${req.body.targetKeyword || 'Slot Gacor Hari Ini'} | Link Resmi RTP Live 98.8%`,
        metaDescription: `Daftar dan mainkan ${req.body.targetKeyword || 'Slot Gacor Hari Ini'} di ${req.body.brandName || 'VIP OFFICIAL'}. Nikmati live RTP tinggi, bocoran jam gacor hoki, deposit terjangkau & pembayaran instan.`,
        lsiKeywords: ['slot gacor hari ini', 'link alternatif resmi', 'rtp live slot', 'bocoran pragmatic maxwin'],
        seoHeading: `Pusat Informasi & Link Resmi ${req.body.targetKeyword || 'Slot Gacor Hari Ini'}`,
        seoParagraph: `Temukan sensasi bermain terbaik dengan tingkat RTP tertinggi di situs resmi kami. Menyajikan pilihan provider terlengkap, pola spin jitu, dan proteksi keamanan tingkat tinggi.`,
        faqItems: [
          { question: 'Apakah aman bermain di situs ini?', answer: 'Sangat aman dengan proteksi SSL enkripsi 256-bit dan server anti-blokir.' },
          { question: 'Bagaimana cara melihat RTP live?', answer: 'RTP live terupdate otomatis secara real-time pada tabel bocoran di halaman ini.' }
        ],
        jsonLdSchema: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${req.body.brandName || 'VIP OFFICIAL'} Official`,
        },
        trendingTopics: ['Slot Gacor Hari Ini', 'Pola Zeus 1000', 'Mahjong Ways Scatter Hitam'],
      },
    });
  }
});

// Setup Vite development vs static production serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Landing Page & Portal Suite running on http://0.0.0.0:${PORT}`);
  });
}

start();
