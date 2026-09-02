export interface GeneratedArticle {
  title: string;
  heading: string;
  subheading: string;
  contentParagraph: string;
  metaDescription: string;
  keywords: string;
  faqList: Array<{ question: string; answer: string }>;
  features: Array<{ icon: string; title: string; desc: string }>;
}

export interface PromoItem {
  id: string;
  title: string;
  tag: string;
  category: 'welcome' | 'deposit' | 'cashback' | 'rollingan' | 'event' | 'freebet' | 'vip';
  badgeColor: string;
  discountOrBonus: string;
  minDeposit: string;
  turnoverReq: string;
  maxBonus: string;
  claimUrl: string;
  description: string;
  terms: string[];
  bannerUrl?: string;
  hot?: boolean;
}

export const PROMO_PRESETS: PromoItem[] = [
  {
    id: 'promo-new-member-100',
    title: 'Bonus New Member 100% Depo Awal',
    tag: 'SPESIAL MEMBER BARU',
    category: 'welcome',
    badgeColor: 'from-amber-500 to-yellow-400',
    discountOrBonus: '100% BONUS',
    minDeposit: 'Rp 25.000',
    turnoverReq: 'TO x 5 Bebas IP',
    maxBonus: 'Rp 1.000.000',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Klaim bonus sambutan spesial deposit pertama untuk semua permainan Slot Gacor pilihan. Tanpa potongan saldo awal.',
    terms: [
      'Berlaku khusus untuk pendaftaran akun member baru pertama kali.',
      'Minimal deposit Rp 25.000 via Bank / E-Wallet / QRIS.',
      'Syarat Turnover hanya 5x sebelum penarikan (withdraw).',
      'Bebas Buy Spin dan bebas kesamaan IP Address.',
    ],
    hot: true,
  },
  {
    id: 'promo-garansi-kekalahan-100',
    title: 'Garansi Kekalahan 100% Saldo Kembali',
    tag: 'ANTI RUNGKAD',
    category: 'welcome',
    badgeColor: 'from-rose-600 to-red-500',
    discountOrBonus: 'GARANSI 100%',
    minDeposit: 'Rp 50.000',
    turnoverReq: 'TO x 3',
    maxBonus: 'Rp 500.000',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Main tanpa resiko! Jika saldo deposit pertama habis tanpa kemenangan, klaim cashback 100% langsung masuk ke akun.',
    terms: [
      'Berlaku untuk deposit pertama member baru jika tidak klaim bonus lain.',
      'Klaim melalui CS LiveChat atau WhatsApp 24 jam sebelum deposit kedua.',
      'Turnover penarikan saldo garansi hanya 3x.',
    ],
    hot: true,
  },
  {
    id: 'promo-depo-harian-20',
    title: 'Bonus Deposit Harian 20% Tiap Hari',
    tag: 'HARIAN RELOAD',
    category: 'deposit',
    badgeColor: 'from-emerald-500 to-teal-400',
    discountOrBonus: '20% EXTRA',
    minDeposit: 'Rp 20.000',
    turnoverReq: 'TO x 3',
    maxBonus: 'Rp 2.000.000',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Tambah modal bermain setiap hari dengan bonus reload deposit 20% dapat diklaim 1x per hari.',
    terms: [
      'Dapat diklaim oleh seluruh member aktif setiap hari.',
      'Maksimal bonus hingga Rp 2.000.000 per transaksi klaim.',
      'Dukungan deposit QRIS instan tanpa antri.',
    ],
    hot: false,
  },
  {
    id: 'promo-rollingan-slot',
    title: 'Komisi Rollingan Slot 0.8% Tanpa Batas',
    tag: 'REBATE MINGGUAN',
    category: 'rollingan',
    badgeColor: 'from-purple-600 to-indigo-500',
    discountOrBonus: '0.8% ROLLINGAN',
    minDeposit: 'Otomatis',
    turnoverReq: 'Tanpa Syarat TO',
    maxBonus: 'UNLIMITED',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Dapatkan bagi hasil perputaran taruhan setiap hari Selasa dibagikan otomatis ke saldo utama.',
    terms: [
      'Dihitung berdasarkan total perputaran (Turnover) selama 1 minggu.',
      'Dibagikan otomatis setiap hari Selasa pukul 14:00 WIB.',
      'Bonus langsung bisa di-withdraw tanpa syarat perputaran lagi.',
    ],
    hot: false,
  },
  {
    id: 'promo-cashback-10',
    title: 'Cashback Kekalahan Mingguan Up To 10%',
    tag: 'CASHBACK VIP',
    category: 'cashback',
    badgeColor: 'from-cyan-500 to-blue-600',
    discountOrBonus: '10% CASHBACK',
    minDeposit: 'Rp 100.000 Total',
    turnoverReq: 'TO x 1',
    maxBonus: 'Rp 10.000.000',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Perlindungan saldo mingguan dari total kekalahan dihitung transparan setiap awal pekan.',
    terms: [
      'Dihitung dari total kekalahan bersih Senin - Minggu.',
      'Tier cashback 5% hingga 10% sesuai tingkatan level VIP akun.',
    ],
    hot: false,
  },
  {
    id: 'promo-petir-maxwin',
    title: 'Event Petir Perkalian Zeus & Princess x500 x1000',
    tag: 'EXTRA JACKPOT',
    category: 'event',
    badgeColor: 'from-yellow-400 to-amber-600',
    discountOrBonus: 'EXTRA Rp 5.000.000',
    minDeposit: 'Rp 10.000',
    turnoverReq: 'Klaim Bukti SS',
    maxBonus: 'Rp 5.000.000',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Dapat sambaran petir x500 atau x1000 saat freespin? Klaim uang tunai ekstra langsung ke rekening Anda.',
    terms: [
      'Screenshot riwayat putaran petir x500 / x1000 yang pecah.',
      'Kirimkan ke grup Telegram atau CS WhatsApp resmi.',
      'Bonus dikirimkan langsung ke saldo akun tanpa potongan.',
    ],
    hot: true,
  },
  {
    id: 'promo-qris-instan',
    title: 'Deposit QRIS 1 Detik Bebas Biaya Admin',
    tag: 'QRIS ALL PAYMENT',
    category: 'deposit',
    badgeColor: 'from-pink-500 to-rose-600',
    discountOrBonus: 'EXTRA Rp 10.000',
    minDeposit: 'Rp 10.000',
    turnoverReq: 'TO x 1',
    maxBonus: 'Setiap Hari',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Metode deposit paling praktis scan via BCA Mobile, Livin Mandiri, BRImo, DANA, OVO, Gopay, atau ShopeePay.',
    terms: [
      'Scan barcode QRIS dinamis yang tertera pada form deposit.',
      'Saldo otomatis masuk dalam 1 hingga 5 detik tanpa perlu upload bukti transfer.',
    ],
    hot: false,
  },
  {
    id: 'promo-referral-seumur-hidup',
    title: 'Bonus Referral Ajak Teman 1% Seumur Hidup',
    tag: 'PASSIVE INCOME',
    category: 'vip',
    badgeColor: 'from-emerald-600 to-green-500',
    discountOrBonus: '1% KOMISI AKTIF',
    minDeposit: 'Rp 0',
    turnoverReq: 'Tanpa Modal',
    maxBonus: 'UNLIMITED',
    claimUrl: 'https://rebrand.ly/DAFTAR-BIGCAT',
    description: 'Bagikan link referral akun Anda di media sosial dan nikmati komisi pasif dari setiap putaran member bawahan selamanya.',
    terms: [
      'Daftarkan akun dan ambil kode link referral Anda di menu profil.',
      'Komisi masuk otomatis ke akun setiap hari Senin.',
      'Dapat langsung ditarik ke rekening bank atau e-wallet Anda.',
    ],
    hot: false,
  },
];

export type ContentTopic =
  | 'rtp-gacor'
  | 'daftar-panduan'
  | 'provider-review'
  | 'safelink-security'
  | 'transaksi-qris'
  | 'bocoran-pola';

export interface ContentGenerationOptions {
  brandName: string;
  targetKeyword: string;
  topic: ContentTopic;
  tone: 'persuasive' | 'informative' | 'clickbait' | 'luxury-vip';
  wordCount: 'short' | 'medium' | 'long';
  targetUrl: string;
  minDeposit?: string;
  rtpRate?: string;
}

export function generateSmartSeoArticle(options: ContentGenerationOptions): GeneratedArticle {
  const brand = options.brandName || 'NEXUS VIP';
  const kw = options.targetKeyword || 'Slot Gacor Hari Ini';
  const minDep = options.minDeposit || 'Rp 10.000';
  const rtp = options.rtpRate || '98.8%';
  const year = new Date().getFullYear();

  switch (options.topic) {
    case 'rtp-gacor': {
      return {
        title: `${brand}: Situs ${kw} RTP Live ${rtp} Maxwin Terbaru ${year}`,
        heading: `Pusat Informasi ${kw} & Bocoran RTP Live Terakurat ${year}`,
        subheading: `Nikmati sensasi menang mudah bersama ${brand} dengan dukungan server super cepat dan garansi pembayaran lunas 100%.`,
        contentParagraph: `${brand} hadir sebagai pilihan utama bagi para pecinta permainan game digital di Indonesia. Dengan pembaruan sistem berkala dan integrasi algoritma RTP Live ${rtp}, setiap pemain memiliki kesempatan emas meraih kemenangan jackpot maxwin hingga ribuan kali lipat. Dapatkan akses eksklusif ke link alternatif resmi anti blokir dengan minimal deposit terjangkau mulai dari ${minDep} saja. Proses deposit dan penarikan dana diproses instan melalui sistem otomatis 24 jam nonstop.`,
        metaDescription: `Daftar akun resmi di ${brand} sekarang. Dapatkan info bocoran ${kw} dengan winrate RTP Live ${rtp} malam ini. Transaksi instan QRIS & Bank lunas 100%.`,
        keywords: `${kw}, ${brand}, rtp slot hari ini, bocoran slot gacor, link login ${brand}, rtp live ${rtp}, situs terpercaya`,
        faqList: [
          {
            question: `Berapa minimal deposit dan withdraw di ${brand}?`,
            answer: `Minimal deposit di ${brand} sangat terjangkau yaitu hanya ${minDep}, dan minimal withdraw adalah Rp 50.000 tanpa potongan biaya administrasi.`,
          },
          {
            question: `Apakah link alternatif ${brand} aman dan anti blokir?`,
            answer: `Ya, ${brand} menyediakan link alternatif resmi berlisensi internasional dengan teknologi enkripsi SSL 256-bit dan AMP Google Valid yang selalu aktif 24 jam.`,
          },
          {
            question: `Apa saja metode pembayaran yang didukung?`,
            answer: `Kami menerima deposit via QRIS Instan All Payment, Transfer Bank (BCA, Mandiri, BRI, BNI, BSI, Danamon), dan E-Wallet (DANA, OVO, GoPay, LinkAja, ShopeePay).`,
          },
        ],
        features: [
          { icon: 'Zap', title: `RTP Winrate ${rtp}`, desc: 'Tingkat kemenangan tertinggi dengan live update per 5 menit.' },
          { icon: 'ShieldCheck', title: 'Lisensi Resmi PAGCOR', desc: 'Sistem permainan adil (Fair Play) tanpa bot atau campur tangan admin.' },
          { icon: 'DollarSign', title: `Deposit ${minDep}`, desc: 'Mulai bermain dengan modal ringan dan raih jutaan rupiah.' },
          { icon: 'Clock', title: 'Transaksi 1 Detik', desc: 'Sistem auto-deposit QRIS instan tanpa upload bukti struk.' },
        ],
      };
    }

    case 'bocoran-pola': {
      return {
        title: `${brand}: Bocoran Pola ${kw} & Jam Hoki Paling Gacor Hari Ini`,
        heading: `Trik & Rahasia Pola ${kw} Terbaik di ${brand}`,
        subheading: `Tingkatkan peluang Maxwin x5000 Anda dengan mengikuti panduan pola putaran teruji dari komunitas pemain profesional ${brand}.`,
        contentParagraph: `Mencapai kemenangan konsisten dalam permainan ${kw} membutuhkan strategi dan pemahaman pola putaran yang tepat. Di ${brand}, kami menyajikan data statistik real-time yang mencakup persentase kemenangan terkini, waktu putaran paling aktif, serta variasi pola spin manual dan turbo. Mulai petualangan Anda dengan modal ${minDep} dan manfaatkan bonus new member untuk melipatgandakan modal taruhan Anda dengan aman.`,
        metaDescription: `Temukan rahasia pola ${kw} dan jam hoki paling akurat di ${brand}. Winrate tinggi ${rtp}, deposit via QRIS ${minDep} proses kilat 24 jam.`,
        keywords: `pola ${kw}, jam hoki ${brand}, trik maxwin, bocoran slot, rtp ${rtp}, daftar ${brand}`,
        faqList: [
          {
            question: `Kapan jam paling hoki untuk bermain di ${brand}?`,
            answer: `Berdasarkan data statistik server, jam paling aktif dengan RTP puncak berada pada pukul 19:30 - 23:45 WIB dan subuh pukul 01:00 - 04:30 WIB.`,
          },
          {
            question: `Bagaimana cara klaim bonus deposit member baru?`,
            answer: `Setelah mendaftar dan melakukan deposit pertama minimal ${minDep}, masuk ke menu Promosi atau hubungi CS LiveChat untuk mengaktifkan bonus 100%.`,
          },
        ],
        features: [
          { icon: 'Flame', title: 'Pola Terverifikasi', desc: 'Rangkuman pola spin turbo dan manual paling efektif.' },
          { icon: 'TrendingUp', title: 'Grafik Volatilitas', desc: 'Pemantauan fluktuasi multiplier perkalian secara live.' },
          { icon: 'Gift', title: 'Event Petir Ekstra', desc: 'Klaim hadiah tunai tambahan jika mendapatkan sambaran multiplier besar.' },
          { icon: 'Headphones', title: 'Panduan CS 24 Jam', desc: 'Customer service ramah siap membantu analisis pola setiap saat.' },
        ],
      };
    }

    case 'provider-review': {
      return {
        title: `${brand}: Kumpulan Provider ${kw} Terlengkap & Resmi di Indonesia`,
        heading: `Daftar Provider Game Online Paling Populer di ${brand}`,
        subheading: `Akses lebih dari 1.000+ game pilihan dari provider terkemuka dunia dengan 1 User ID tanpa perlu pindah saldo.`,
        contentParagraph: `${brand} bekerja sama secara resmi dengan pengembang software game ternama dunia seperti Pragmatic Play, PG Soft, Habanero, Spadegaming, Microgaming, Joker123, dan Nolimit City. Setiap game telah lulus uji sertifikasi RNG (Random Number Generator) internasional dari BMM Testlabs dan Gaming Laboratories International (GLI), memastikan pengalaman bermain yang adil, transparan, dan terpercaya.`,
        metaDescription: `Mainkan ratusan game ${kw} dari PG Soft, Pragmatic Play, dan Habanero hanya di ${brand}. RTP Live ${rtp}, deposit ${minDep} via QRIS.`,
        keywords: `provider ${kw}, pg soft gacor, pragmatic play ${brand}, habanero slot, demo slot ${brand}`,
        faqList: [
          {
            question: `Apa saja provider game favorit di ${brand}?`,
            answer: `Provider paling diminati saat ini adalah Pragmatic Play (Gates of Olympus, Starlight Princess) dan PG Soft (Mahjong Ways 2, Lucky Neko) dengan RTP di atas ${rtp}.`,
          },
          {
            question: `Apakah tersedia versi demo gratis untuk latihan?`,
            answer: `Ya, ${brand} menyediakan fitur akun demo gratis tanpa perlu deposit untuk mencoba pola dan fitur permainan sebelum bermain dengan uang asli.`,
          },
        ],
        features: [
          { icon: 'Gamepad2', title: '1.000+ Koleksi Game', desc: 'Pilihan permainan terlengkap dengan grafis HD dan audio imersif.' },
          { icon: 'Smartphone', title: 'HTML5 & AMP Ringan', desc: 'Akses lancar dari smartphone Android dan iOS tanpa lag.' },
          { icon: 'Award', title: 'Sertifikasi GLI', desc: 'Standar keadilan global dengan algoritma RNG berlisensi resmi.' },
          { icon: 'Sparkles', title: 'Jackpot Progresif', desc: 'Total hadiah akumulasi jackpot miliaran rupiah setiap hari.' },
        ],
      };
    }

    case 'safelink-security': {
      return {
        title: `SafeLink Cloud Security: Jalur Verifikasi Aman Menuju ${brand}`,
        heading: `Sistem Enkripsi & Verifikasi Keamanan SafeLink ${brand}`,
        subheading: `Perlindungan koneksi tingkat tinggi dari serangan malware, phishing, dan pemblokiran jaringan ISP.`,
        contentParagraph: `Halaman ini berfungsi sebagai gerbang verifikasi keamanan (SafeLink Protocol) untuk memastikan koneksi Anda terhubung secara aman dan terenkripsi menuju server utama ${brand}. Sistem kami secara otomatis melakukan pemindaian integritas tautan, mencegah sniffing data, dan mengarahkan Anda ke server mirror resmi dengan latensi terendah.`,
        metaDescription: `Verifikasi keamanan SafeLink menuju portal resmi ${brand}. Lindungi akun Anda dengan koneksi aman berenkripsi SSL 256-bit.`,
        keywords: `safelink ${brand}, verifikasi link aman, link login anti blokir, server mirror ${brand}`,
        faqList: [
          {
            question: `Mengapa saya dialihkan melalui halaman SafeLink?`,
            answer: `Halaman SafeLink bertindak sebagai filter keamanan dan pengoptimal rute jaringan untuk memastikan Anda tidak mengakses situs tiruan atau phishing.`,
          },
          {
            question: `Apakah proses verifikasi memerlukan unduhan aplikasi?`,
            answer: `Tidak. Verifikasi berjalan otomatis secara server-side dalam hitungan detik dan Anda akan langsung diarahkan ke tombol resmi.`,
          },
        ],
        features: [
          { icon: 'Shield', title: 'Enkripsi SSL 256-Bit', desc: 'Keamanan data dan privasi pengguna terlindungi sepenuhnya.' },
          { icon: 'Cpu', title: 'Anti DDOS Shield', desc: 'Infrastruktur cloud berkecepatan tinggi dengan uptime 99.9%.' },
          { icon: 'CheckCircle', title: 'Verifikasi Otomatis', desc: 'Pengalihan mulus dalam 3-5 detik tanpa captchas yang rumit.' },
          { icon: 'Globe', title: 'Global CDN Routing', desc: 'Akses cepat dari seluruh jaringan provider internet di Indonesia.' },
        ],
      };
    }

    case 'transaksi-qris':
    default: {
      return {
        title: `${brand}: Transaksi Deposit QRIS 1 Detik & Layanan 24 Jam Nonstop`,
        heading: `Kemudahan Transaksi Deposit & Withdraw Tercepat di ${brand}`,
        subheading: `Sistem perbankan otomatis terintegrasi dengan semua bank nasional dan dompet digital di Indonesia.`,
        contentParagraph: `Kecepatan dan kenyamanan transaksi adalah prioritas utama kami di ${brand}. Kami menghadirkan inovasi QRIS Dinamis Otomatis yang memproses saldo masuk hanya dalam waktu 1 hingga 5 detik tanpa perlu konfirmasi manual. Selain QRIS, kami juga melayani transaksi melalui Bank BCA, Mandiri, BNI, BRI, Danamon, CIMB, serta E-Wallet DANA, OVO, GoPay, dan ShopeePay dengan minimal deposit ${minDep}.`,
        metaDescription: `Deposit kilat QRIS 1 detik di ${brand}. Minimal deposit ${minDep}, withdraw tanpa potongan, layanan customer service 24 jam.`,
        keywords: `deposit qris ${brand}, slot deposit qris, ${brand} e-wallet, withdraw cepat, daftar ${kw}`,
        faqList: [
          {
            question: `Berapa lama proses deposit dan withdraw di ${brand}?`,
            answer: `Deposit via QRIS dan E-Wallet diproses instan 1-5 detik, sedangkan withdraw rata-rata selesai dalam 1-3 menit.`,
          },
          {
            question: `Apakah ada biaya admin untuk transaksi QRIS?`,
            answer: `Sama sekali tidak ada. Semua transaksi deposit di ${brand} bebas biaya admin 100%.`,
          },
        ],
        features: [
          { icon: 'QrCode', title: 'QRIS All Payment', desc: 'Scan dari aplikasi mobile banking atau e-wallet apa saja.' },
          { icon: 'Clock', title: 'Proses 1 Detik', desc: 'Saldo otomatis bertambah tanpa antre dan tanpa kirim slip transfer.' },
          { icon: 'Lock', title: 'Keamanan Perbankan', desc: 'Didukung sistem API perbankan resmi dengan enkripsi terstandar.' },
          { icon: 'Headset', title: 'CS Solutif 24/7', desc: 'Tim bantuan siap menangani kendala transaksi kapan pun Anda butuhkan.' },
        ],
      };
    }
  }
}
