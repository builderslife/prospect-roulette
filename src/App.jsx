import { useState, useRef, useEffect } from 'react';

// ==========================================
// DATABASE PROFIL, LOKASI & OBJECTION
// ==========================================
export const SLOT_DATA = {
  beginner: {
    demografi: [
      "Pria, 28 Thn, Single (Jakarta)", "Wanita, 25 Thn, Single (Surabaya)",
      "Pria, 35 Thn, Menikah, 1 Anak Balita (Bandung)", "Wanita, 32 Thn, Sedang Hamil (Medan)",
      "Pria, 40 Thn, Menikah, 2 Anak SD (Semarang)", "Wanita, 29 Thn, Single (Makassar)",
      "Pria, 38 Thn, Menikah, Istri IRT (Tangerang)", "Wanita, 45 Thn, Single (Bali)",
      "Pria, 31 Thn, Menikah Baru 1 Tahun (Balikpapan)", "Wanita, 36 Thn, Cerai, 1 Anak (Palembang)",
      "Pria, 27 Thn, Single, Tinggal Sama Ortu (Depok)", "Wanita, 30 Thn, Menikah, Belum Punya Anak (Bekasi)",
      "Pria, 34 Thn, Menikah, 2 Anak Balita (Batam)", "Wanita, 28 Thn, Single, Perantau (Pekanbaru)",
      "Pria, 42 Thn, Menikah, 1 Anak SMP (Yogyakarta)", "Wanita, 39 Thn, Menikah, 3 Anak (Samarinda)",
      "Pria, 33 Thn, Single (Malang)", "Wanita, 26 Thn, Single, Siap Menikah (Bogor)",
      "Pria, 37 Thn, Menikah, Anak Kembar (Manado)", "Wanita, 41 Thn, Menikah, Istri Bekerja (Pontianak)"
    ],
    finansial: [
      "Karyawan Swasta (10-15 Jt/bln)", "Manajer Area (25-35 Jt/bln)",
      "Pengusaha F&B (50 Jt+/bln)", "IT Developer (18-25 Jt/bln)",
      "Pegawai Bank (12-15 Jt/bln)", "Supervisor Pabrik (8-12 Jt/bln)",
      "Dokter Spesialis (40 Jt+/bln)", "Digital Marketer (15-20 Jt/bln)",
      "Dosen / Akademisi (10-15 Jt/bln)", "Pemilik Toko Grosir (30 Jt+/bln)",
      "PNS/ASN Golongan III (7-10 Jt/bln)", "Freelance Consultant (15-30 Jt/bln)",
      "HR Manager (20-25 Jt/bln)", "Sales Otomotif (10-20 Jt/bln fluktuatif)",
      "Arsitek (15-25 Jt/bln)", "Pemilik Franchise Kecil (20-30 Jt/bln)",
      "Content Creator (10-50 Jt/bln fluktuatif)", "Auditor Internal (12-18 Jt/bln)",
      "Chef / Executive (15-20 Jt/bln)", "Karyawan BUMN (15-25 Jt/bln)"
    ],
    tanggungan: [
      "Sedang fokus kumpul DP Rumah", "Rutin menabung dana pendidikan anak",
      "Cicilan KPR rumah tinggal 3 tahun", "Punya asuransi kantor limit kecil",
      "Suka traveling luar negeri 2x setahun", "Suka otomotif, modifikasi mobil",
      "FOMO barang branded / konsumtif", "Suka nongkrong di cafe tiap hari",
      "Rutin donasi/zakat jumlah lumayan", "Investasi rutin di Reksadana/Saham",
      "Cicilan mobil baru jalan 1 tahun", "Mempersiapkan biaya pernikahan",
      "Membantu uang saku bulanan adik kuliah", "Punya hobi sepeda / golf mahal",
      "Baru beli rumah kedua (investasi)", "Cicilan apartemen di pusat kota",
      "Fokus bayar les privat anak-anak", "Biaya perawatan hewan peliharaan mahal",
      "Sering treat teman/keluarga makan besar", "Gaya hidup sehat (catering diet & gym mahal)"
    ],
    twist: [
      "Sangat sadar kesehatan, rutin gym", "Merasa asuransi kantor sudah cukup",
      "Baru mendapat bonus tahunan/warisan", "Sedang merencanakan pensiun dini",
      "Pernah beli unit link tapi kecewa", "Sangat analitis, suka bandingkan tabel",
      "Sibuk parah, meeting maksimal 15 menit", "Ada teman dekat yang juga agen asuransi",
      "Menginginkan instrumen syariah saja", "Percaya mitos asuransi buang uang",
      "Baru saja promosi jabatan", "Sedang cari instrumen potong pajak",
      "Istri/suaminya sangat dominan soal uang", "Pernah klaim kesehatan dan puas",
      "Sangat peduli perlindungan anak", "Gaptek, kurang paham investasi",
      "Suka produk tradisional (non-unit link)", "Nasabah VIP di bank",
      "Punya pengalaman buruk dengan agen lama yang kabur", "Selalu menawar/minta diskon atau cashback"
    ]
  },
  hardcore: {
    demografi: [
      "Pria, 50 Thn, Pemilik Perusahaan Manufaktur (Surabaya)",
      "Wanita, 45 Thn, Direktur Keuangan / CFO (Jakarta Selatan)",
      "Pria, 60 Thn, Konglomerat Properti, 3 Anak Dewasa (Bali)",
      "Wanita, 38 Thn, Pewaris Bisnis Keluarga Generasi ke-3 (Medan)",
      "Pria, 42 Thn, Komisaris Perusahaan Tbk (Jakarta Pusat)",
      "Wanita, 55 Thn, Pengusaha Ekspor-Impor, Janda Kaya (Semarang)",
      "Pria, 35 Thn, Founder Tech Startup, Baru Dapat Funding (Bandung)",
      "Pria, 48 Thn, Ekspatriat / WNA Level Eksekutif (Jakarta Selatan)",
      "Wanita, 40 Thn, Pemilik Jaringan Klinik Kecantikan (Makassar)",
      "Pria, 52 Thn, Pejabat / Komisaris Independen BUMN (Tangerang)",
      "Wanita, 65 Thn, Sosialita, Punya Banyak Aset Properti (Surabaya)",
      "Pria, 39 Thn, Pemilik Tambang Batu Bara Menengah (Samarinda)",
      "Wanita, 43 Thn, Pengacara Perusahaan / Partner Lawfirm (Jakarta)",
      "Pria, 58 Thn, Pemilik Jaringan RS Swasta (Yogyakarta)",
      "Wanita, 50 Thn, Istri Pengusaha Daerah Tingkat VVIP (Palembang)",
      "Pria, 46 Thn, Investor Saham / Fund Manager Pribadi (Jakarta)",
      "Pria, 62 Thn, Pemilik Jaringan Hotel Lokal (Bali)",
      "Wanita, 36 Thn, Selebriti / Influencer Papan Atas (Jakarta Selatan)",
      "Pria, 54 Thn, Kontraktor Proyek Pemerintah (Balikpapan)",
      "Pria, 41 Thn, Pemain Crypto / Web3 Whale (Bandung)"
    ],
    finansial: [
      "Income > Rp 200 Jt/bln, Mayoritas Aset di Properti Tersebar",
      "Net Worth > Rp 50 Miliar, Sebagian Besar di Portofolio Saham",
      "Pasif Income Rp 150 Jt/bln dari Sewa Kos/Ruko Eksklusif",
      "Menerima Dividen Bisnis Tahunan > Rp 2 Miliar",
      "Income Fluktuatif Tinggi (Rp 100 Jt - Rp 500 Jt/bln)",
      "Cash Rich, Punya Deposito > Rp 10 Miliar Nganggur",
      "Portofolio Investasi Dikelola Penuh oleh Private Banker",
      "Income Rp 80 Jt/bln tapi Mayoritas Aset Disimpan di Luar Negeri",
      "Profit Bisnis Bulanan Rp 300 Jt (Uang Bercampur dengan Perusahaan)",
      "Punya Banyak Tanah (Aset Triliunan) tapi Kurang Uang Cash Likuid",
      "Gaji Eksekutif Rp 150 Jt/bln + Bonus Saham (ESOP)",
      "Kekayaan Tertanam Kuat di Alat Berat & Aset Bisnis",
      "Income Mayoritas Menggunakan Mata Uang Asing (USD/SGD)",
      "Baru Menjual Saham Startup (Cash Out Tunai Rp 20 Miliar)",
      "Pendapatan Bersih Pribadi Stabil > Rp 400 Jt/bln",
      "Aset Dominan Berupa Koleksi Barang Mewah / Supercar / Jam Tangan",
      "Menguasai Rantai Pasok Grosir (Perputaran Uang Tunai Cepat)",
      "Income Rp 250 Jt/bln, Punya Rekening Offshore",
      "Pasif Income dari Royalties / Hak Paten (Rp 100 Jt/bln)",
      "Menunggu Pencairan Hak Waris Berupa Lahan Strategis (Estate)"
    ],
    tanggungan: [
      "Concern Pajak Warisan (Estate Tax) & Biaya Balik Nama Aset ke Anak",
      "Mempersiapkan Suksesi Bisnis ke Anak (Butuh Key Person Insurance)",
      "Gaya Hidup Sangat Tinggi (Membership Golf, Supercar, Yacht)",
      "Menanggung Biaya Kuliah 3 Anak di Universitas Amerika/Inggris",
      "Menanggung Hutang Modal Kerja Bank Puluhan Miliar (Corporate Loan)",
      "Ingin Membangun Dana Abadi (Philanthropy/Yayasan Amal Privat)",
      "Terlalu Banyak Aset Tidak Likuid, Susah Tarik Cash Cepat Jika Darurat",
      "Sedang Mengatur Pembagian Harta Gono-Gini yang Sangat Kompleks",
      "Mengalokasikan Dana Besar di Kripto / Instrumen High Risk Lainnya",
      "Punya Cicilan Properti Mewah Ekstra Besar (Miliaran per bulan)",
      "Fokus Utama Mencari Instrumen Bebas Pajak (Tax Shelter/Avoidance)",
      "Menanggung Biaya RS VVIP Orang Tua Secara Rutin di Singapura",
      "Perputaran Uang Kas Tertahan di Piutang Klien (Cashflow Ketat)",
      "Mengoleksi Barang Antik/Seni (Risiko Nilai Turun/Hilang)",
      "Rutin Membayar Pajak Progresif yang Sangat Membebani",
      "Ingin Menghindari Sengketa Warisan Panjang Antar Anak dari Beda Istri",
      "Sedang Mempersiapkan Syarat Finansial untuk Golden Visa Luar Negeri",
      "Ingin Diversifikasi Aset karena Khawatir dengan Risiko Politik Lokal",
      "Menjaga Likuiditas Uang Tunai Perusahaan Saat Ekonomi Makro Lesu",
      "Membiayai Gaya Hidup Istri/Keluarga Besar yang Sangat Konsumtif"
    ],
    twist: [
      "Sangat Arogan: 'Kalau saya sakit, saya bisa beli rumah sakitnya sekalian.'",
      "Semua Urusan Keuangan Di-handle Private Banker, Menolak Bicara dengan Agen",
      "Pernah Beli Polis Jumbo, tapi Kecewa Karena Agennya Resign/Kabur",
      "Hasil Executive Checkup Terakhir Menunjukkan Ada Indikasi Penyumbatan Jantung",
      "Sangat Susah Ditemui, Hanya Bisa Berkomunikasi Lewat Asisten Pribadi",
      "Memiliki Gejala Penyakit Khas CEO: Stress Berat, Hipertensi, & Insomnia Parah",
      "Sangat Rahasia, Tidak Mau Nama atau Nilai Hartanya Terlacak (Concern Privasi)",
      "Hanya Mau Deal Bisnis di Lapangan Golf atau Sambil Makan Malam Mewah",
      "Merasa Return Bisnisnya (30%/tahun) Jauh Lebih Menguntungkan daripada Asuransi",
      "Anti Asuransi Konvensional, Minta Solusi Syariah tapi dengan Plafon Jumbo",
      "Sudah Punya Banyak Sekali Polis dari Teman/Kerabat yang Terpaksa Dibeli",
      "Merasa Aman Karena Punya Tim Dokter Pribadi yang Standby 24 Jam",
      "Merasa Dirinya Kebal Risiko Karena Hartanya Tidak Akan Habis 7 Turunan",
      "Keluarga Besar Memiliki Sejarah Penyakit Genetik (Kanker/Stroke di Usia Muda)",
      "Sangat Kritis & Detail, Meminta Anda Membuat Tabel Komparasi dari 5 Perusahaan",
      "Terlihat Menghindari Pertanyaan Soal Riwayat Kesehatan (Ada Sakit Tersembunyi)",
      "Sangat Sering Bepergian (Traveling/Bisnis), Hampir Tidak Pernah Berada di Indonesia",
      "Sedang Diselidiki Pajak atau Memiliki Masalah Likuidasi Bisnis",
      "Memandang Remeh Profesi Agen Asuransi, Merasa Level Anda di Bawah Dia",
      "Terbiasa dengan Service VVIP, Sangat Mudah Tersinggung Jika Anda Kurang Wawasan"
    ]
  }
};

export const OBJECTIONS = [
  "Uang saya lebih baik diputar di bisnis atau deposito.",
  "Asuransi kantor saya sudah cover semuanya, ngapain dobel?",
  "Saya harus diskusi dan minta izin istri/suami saya dulu.",
  "Preminya kemahalan, saya lagi banyak pengeluaran cicilan.",
  "Teman saya klaimnya susah dan ditolak, asuransi itu nipu.",
  "Nanti saja ya, saya masih muda dan sehat kok.",
  "Saya sudah punya BPJS, itu saja sudah cukup.",
  "Beli asuransi jiwa itu pamali, kayak nyumpahin cepat mati.",
  "Uang di asuransi itu hangus kalau tidak sakit, rugi dong.",
  "Saya tidak percaya sama agen asuransi, banyak yang kabur.",
  "Saya lagi fokus kumpulin uang buat beli rumah/mobil.",
  "Nanti kalau butuh saya hubungi kamu, jangan di-push sekarang.",
  "Kalau perusahaan asuransinya bangkrut, uang saya hilang dong?",
  "Saya mau investasi saham/kripto saja, returnnya lebih pasti.",
  "Saya bandingkan dulu dengan proposal dari perusahaan lain ya.",
  "Penghasilan saya lagi nggak menentu bulan ini.",
  "Keluarga saya umur panjang semua, jarang ada yang sakit parah.",
  "Saya trauma ditawari unit link, saldo saya habis dimakan biaya.",
  "Agama saya tidak memperbolehkan asuransi konvensional.",
  "Kamu itu agen baru kan? Saya maunya dilayani sama manajer."
];

export const LOCATIONS = [
  "Antre kopi di Starbucks", "Lobby gedung perkantoran",
  "Tidak sengaja bertemu di kondangan", "Janjian makan siang kedua",
  "Menunggu anak bubaran sekolah", "Selesai main golf / olahraga bareng",
  "Duduk bersebelahan di pesawat/kereta", "Di sela-sela acara seminar bisnis"
];
// ==========================================

export default function App() {
  // Global States
  const [phase, setPhase] = useState('SETUP');
  const [mode, setMode] = useState('');
  
  // Data States
  const [result, setResult] = useState({ slot1: '', slot2: '', slot3: '', slot4: '', location: '' });
  const [objection, setObjection] = useState('');
  
  // Solo Mode States
  const [answers, setAnswers] = useState({ product: '', approach: '', transition: '', handling: '' });
  const [spinState, setSpinState] = useState([true, true, true, true]);
  const [tempResult, setTempResult] = useState({ slot1: '...', slot2: '...', slot3: '...', slot4: '...', location: '...' });
  const [copiedText, setCopiedText] = useState(false);
  
  // Versus Mode States
  const [vsP1Gender, setVsP1Gender] = useState('');
  const [vsP2Gender, setVsP2Gender] = useState('');
  const [vsSpinning, setVsSpinning] = useState(false);
  const [vsRolled, setVsRolled] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(420); // 7 menit = 420 detik
  const [foundTanggungan, setFoundTanggungan] = useState(false);
  const [foundKondisi, setFoundKondisi] = useState(false);
  const [timeStats, setTimeStats] = useState({ discoveryTime: 0, objectionTime: 0, status: 'WIN' });

  // Audio Refs
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const audioSetupRef = useRef(null);
  const audioGameRef = useRef(null);
  const spinAudioRef = useRef(null);

  // Audio Triggers
  const playSuccessSound = () => new Audio('/success.mp3').play().catch(() => {});
  const playClapSound = () => new Audio('/clap.mp3').play().catch(() => {});
  const playCheck1Sound = () => new Audio('/check1.mp3').play().catch(() => {});
  const playCheck2Sound = () => new Audio('/check2.mp3').play().catch(() => {});
  const playBuzzerSound = () => new Audio('/buzzer.mp3').play().catch(() => {});
  const playTimeLimitSound = () => new Audio('/timelimit.mp3').play().catch(() => {});
  const playFinalizedWinSound = () => new Audio('/finalizedwin.mp3').play().catch(() => {});
  const playFinalizedLostSound = () => new Audio('/finalizedlost.mp3').play().catch(() => {});
  const playFailSound = () => new Audio('/fail.mp3').play().catch(() => {});

  // BGM Logic (Setup BGM main terus di Home & Briefing, ganti ke BGM2 pas Gameplay)
  const isSetupPhase = phase === 'SETUP' || phase === 'VS_PUBLIC_BRIEFING';
  
  useEffect(() => {
    if (bgmPlaying) {
      if (isSetupPhase) {
        if (audioGameRef.current) audioGameRef.current.pause();
        if (audioSetupRef.current) {
          audioSetupRef.current.volume = 1.0;
          audioSetupRef.current.play().catch(() => setBgmPlaying(false));
        }
      } else {
        if (audioSetupRef.current) audioSetupRef.current.pause();
        if (audioGameRef.current) {
          audioGameRef.current.volume = 0.3;
          audioGameRef.current.play().catch(() => setBgmPlaying(false));
        }
      }
    } else {
      if (audioSetupRef.current) audioSetupRef.current.pause();
      if (audioGameRef.current) audioGameRef.current.pause();
    }
  }, [bgmPlaying, phase, isSetupPhase]);

  // Timer Countdown Logic
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Audio Triggers & Timeouts based on timeLeft
  useEffect(() => {
    if (timerActive) {
      // Trigger Warning Sound (Di bawah 3:30 / 210 detik)
      if (timeLeft === 210 && phase === 'VS_GAMEPLAY') {
        playTimeLimitSound();
      }

      // Kalah karena waktu habis
      if (timeLeft === 0) {
        setTimerActive(false);
        if (phase === 'VS_GAMEPLAY') {
          playFailSound();
          setTimeStats(prev => ({ ...prev, discoveryTime: 420, status: 'LOSE_DISCOVERY' }));
          setPhase('VS_STATS');
        } else if (phase === 'VS_OBJECTION_PLAY') {
          playFinalizedLostSound();
          setTimeStats(prev => ({ ...prev, objectionTime: 60, status: 'LOSE_OBJECTION' }));
          setPhase('VS_STATS');
        }
      }
    }
  }, [timeLeft, timerActive, phase]);

  // Utility Time Formatter
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // ==========================================
  // ACTION HANDLERS
  // ==========================================
  const getFilteredData = (selectedMode) => {
    let allDemografi = [...SLOT_DATA.beginner.demografi, ...SLOT_DATA.hardcore.demografi];
    let dataPool = {
      finansial: [...SLOT_DATA.beginner.finansial, ...SLOT_DATA.hardcore.finansial],
      tanggungan: [...SLOT_DATA.beginner.tanggungan, ...SLOT_DATA.hardcore.tanggungan],
      twist: [...SLOT_DATA.beginner.twist, ...SLOT_DATA.hardcore.twist]
    };

    if (selectedMode === 'versus_pria') {
      return { ...dataPool, demografi: allDemografi.filter(d => d.startsWith('Pria')) };
    } else if (selectedMode === 'versus_wanita') {
      return { ...dataPool, demografi: allDemografi.filter(d => d.startsWith('Wanita')) };
    }
    return SLOT_DATA[selectedMode]; // Beginner or Hardcore
  };

  const startSpin = (selectedMode) => {
    setMode(selectedMode);
    const data = getFilteredData(selectedMode);
    
    // SOLO MODE SPIN
    setPhase('SPINNING');
    setSpinState([true, true, true, true]);
    setAnswers({ product: '', approach: '', transition: '', handling: '' });
    
    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play().catch(() => {});
    }

    const final1 = data.demografi[Math.floor(Math.random() * data.demografi.length)];
    const final2 = data.finansial[Math.floor(Math.random() * data.finansial.length)];
    const final3 = data.tanggungan[Math.floor(Math.random() * data.tanggungan.length)];
    const final4 = data.twist[Math.floor(Math.random() * data.twist.length)];

    let interval = setInterval(() => {
      setTempResult({
        slot1: data.demografi[Math.floor(Math.random() * data.demografi.length)],
        slot2: data.finansial[Math.floor(Math.random() * data.finansial.length)],
        slot3: data.tanggungan[Math.floor(Math.random() * data.tanggungan.length)],
        slot4: data.twist[Math.floor(Math.random() * data.twist.length)],
      });
    }, 100);
    setTimeout(() => { setSpinState([false, true, true, true]); }, 1000);
    setTimeout(() => { setSpinState([false, false, true, true]); }, 2000);
    setTimeout(() => { setSpinState([false, false, false, true]); }, 3000);
    setTimeout(() => { 
      clearInterval(interval);
      setSpinState([false, false, false, false]); 
      setResult({ slot1: final1, slot2: final2, slot3: final3, slot4: final4, location: '' });
      if (spinAudioRef.current) spinAudioRef.current.pause();
      playSuccessSound(); 
    }, 4000);
  };

  const triggerVersusSpin = () => {
    setVsSpinning(true);
    setVsRolled(false);
    
    const data = getFilteredData(vsP2Gender === 'Pria' ? 'versus_pria' : 'versus_wanita');
    
    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play().catch(() => {});
    }

    const finalLoc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const final1 = data.demografi[Math.floor(Math.random() * data.demografi.length)];
    const final2 = data.finansial[Math.floor(Math.random() * data.finansial.length)];
    const final3 = data.tanggungan[Math.floor(Math.random() * data.tanggungan.length)];
    const final4 = data.twist[Math.floor(Math.random() * data.twist.length)];

    let interval = setInterval(() => {
      setTempResult({
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        slot1: data.demografi[Math.floor(Math.random() * data.demografi.length)],
        slot2: data.finansial[Math.floor(Math.random() * data.finansial.length)]
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setTempResult({ location: finalLoc, slot1: final1, slot2: final2 });
      setResult({ location: finalLoc, slot1: final1, slot2: final2, slot3: final3, slot4: final4 });
      setVsSpinning(false);
      setVsRolled(true);
      if (spinAudioRef.current) spinAudioRef.current.pause();
      playSuccessSound();
    }, 3000);
  };

  // --- VERSUS MECHANICS ---
  const handleCheck = (type) => {
    let newT = foundTanggungan;
    let newK = foundKondisi;

    if (type === 'tanggungan') { setFoundTanggungan(true); newT = true; }
    if (type === 'kondisi') { setFoundKondisi(true); newK = true; }

    if (newT && newK) {
      playCheck2Sound();
      setTimerActive(false);
      setTimeStats({ ...timeStats, discoveryTime: 420 - timeLeft });
      const randomObj = OBJECTIONS[Math.floor(Math.random() * OBJECTIONS.length)];
      setObjection(randomObj);
      setTimeout(() => setPhase('VS_OBJECTION_READ'), 1000);
    } else if (newT || newK) {
      playCheck1Sound();
    }
  };

  const handleRedFlag = () => {
    playBuzzerSound();
    document.body.classList.add('bg-red-900');
    setTimeout(() => document.body.classList.remove('bg-red-900'), 200);
    setTimeLeft(t => Math.max(0, t - 30));
  };

  const startObjectionTimer = () => {
    playTimeLimitSound();
    setTimeLeft(60); // 1 Menit
    setTimerActive(true);
    setPhase('VS_OBJECTION_PLAY');
  };

  const finalizeVersusCase = () => {
    playFinalizedWinSound();
    setTimerActive(false);
    setTimeStats(prev => ({ ...prev, objectionTime: 60 - timeLeft, status: 'WIN' }));
    setPhase('VS_STATS');
  };

  // ==========================================
  // RENDER UI
  // ==========================================
  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] font-sans selection:bg-white selection:text-black overflow-x-hidden relative transition-colors duration-200">
      
      <style>{`
        @keyframes subtlePulse { 
          0%, 100% { transform: scale(1); opacity: 1; } 
          50% { transform: scale(1.03); opacity: 0.8; } 
        }
        .animate-subtle-pulse { animation: subtlePulse 4s ease-in-out infinite; }
        
        @keyframes scaleWarning {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 1; }
        }
        .animate-scale-warning { animation: scaleWarning 3s ease-in-out infinite; }
        
        @keyframes blinkPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); box-shadow: 0 0 15px rgba(255,255,255,0.2); }
        }
        .animate-blink-pulse { animation: blinkPulse 2s infinite; }
      `}</style>

      {/* HEADER & BGM */}
      {phase !== 'SETUP' && (
        <div className="absolute top-5 left-5 md:top-8 md:left-10 z-50 pointer-events-none flex flex-col gap-1">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Prospect Roulette</span>
          <span className="text-[8px] md:text-[10px] text-gray-500 italic lowercase tracking-wider">by the builders of life community</span>
        </div>
      )}
      <button onClick={() => setBgmPlaying(!bgmPlaying)} className="absolute top-5 right-5 md:top-8 md:right-10 z-50 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition px-3 py-1 border border-gray-800 rounded-full">
        {bgmPlaying ? '🎵 BGM: ON' : '🔇 BGM: OFF'}
      </button>

      {/* Elemen Audio */}
      <audio ref={audioSetupRef} src="/bgm.mp3" loop preload="auto" />
      <audio ref={audioGameRef} src="/bgm2.mp3" loop preload="auto" />
      <audio ref={spinAudioRef} src="/spin.mp3" loop preload="auto" />

      {/* PHASE 1: SETUP */}
      {phase === 'SETUP' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative">
          <img src="/Logo.jpg" alt="The Builders" className="h-20 md:h-28 object-contain mb-8 rounded" onError={(e) => e.target.style.display = 'none'} />
          <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] mb-1 uppercase animate-subtle-pulse">Prospect Roulette</h1>
          <p className="text-gray-500 text-[10px] md:text-xs italic mb-4 lowercase tracking-widest">by the builders of life community</p>
          <p className="text-gray-500 tracking-[0.3em] text-[10px] md:text-xs uppercase mb-16 mt-2">The Builders: Case Study Simulator</p>
          
          <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
            <button onClick={() => startSpin('beginner')} className="w-full bg-white text-black py-4 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase">Beginner Mode</button>
            <button onClick={() => startSpin('hardcore')} className="w-full bg-transparent border border-[#3A3A3A] text-white py-4 font-bold tracking-widest text-sm hover:border-white transition uppercase">Hardcore Mode</button>
            <button onClick={() => { setPhase('VS_PUBLIC_BRIEFING'); setVsP1Gender(''); setVsP2Gender(''); setVsRolled(false); }} className="w-full bg-red-900 border border-red-700 text-white py-4 font-bold tracking-widest text-sm hover:bg-red-800 transition uppercase mt-4">Versus Mode (1v1)</button>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* JALUR VERSUS MODE (1v1) */}
      {/* ================================================== */}

      {/* VS 1: PUBLIC BRIEFING & GENDER SETUP */}
      {phase === 'VS_PUBLIC_BRIEFING' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full pt-16 md:pt-0">
          <div className="w-full max-w-2xl bg-[#121212] p-8 md:p-12 border border-[#2A2A2A] text-center shadow-2xl rounded-sm">
            <h2 className="text-[10px] tracking-[0.3em] text-red-500 font-bold uppercase mb-2 animate-pulse">Public Briefing</h2>
            
            {!vsRolled && !vsSpinning ? (
              // Player Selection
              <>
                <h1 className="text-xl md:text-2xl font-black uppercase mb-10 text-white">Player Setup</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-black border border-[#2A2A2A] p-6">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-bold">Pemain 1 (Agen)</p>
                    <div className="flex gap-2 justify-center">
                      <button onClick={()=>setVsP1Gender('Pria')} className={`flex-1 py-3 font-bold text-xs tracking-widest uppercase transition border ${vsP1Gender === 'Pria' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-[#3A3A3A] hover:border-white'}`}>Pria</button>
                      <button onClick={()=>setVsP1Gender('Wanita')} className={`flex-1 py-3 font-bold text-xs tracking-widest uppercase transition border ${vsP1Gender === 'Wanita' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-[#3A3A3A] hover:border-white'}`}>Wanita</button>
                    </div>
                  </div>
                  
                  <div className="bg-black border border-[#2A2A2A] p-6">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-bold">Pemain 2 (Target)</p>
                    <div className="flex gap-2 justify-center">
                      <button onClick={()=>setVsP2Gender('Pria')} className={`flex-1 py-3 font-bold text-xs tracking-widest uppercase transition border ${vsP2Gender === 'Pria' ? 'bg-red-600 text-white border-red-600' : 'bg-transparent text-gray-400 border-[#3A3A3A] hover:border-red-500'}`}>Pria</button>
                      <button onClick={()=>setVsP2Gender('Wanita')} className={`flex-1 py-3 font-bold text-xs tracking-widest uppercase transition border ${vsP2Gender === 'Wanita' ? 'bg-red-600 text-white border-red-600' : 'bg-transparent text-gray-400 border-[#3A3A3A] hover:border-red-500'}`}>Wanita</button>
                    </div>
                  </div>
                </div>

                <button 
                  disabled={!vsP1Gender || !vsP2Gender}
                  onClick={triggerVersusSpin} 
                  className={`w-full py-5 font-bold tracking-widest text-sm uppercase transition ${!vsP1Gender || !vsP2Gender ? 'bg-[#2A2A2A] text-gray-500 cursor-not-allowed border border-[#3A3A3A]' : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'}`}>
                  Roll Scenario
                </button>
                <button onClick={()=>setPhase('SETUP')} className="mt-6 text-[10px] uppercase text-gray-500 hover:text-white tracking-widest">Batal</button>
              </>
            ) : vsSpinning ? (
              // Spinning Roulette
              <>
                <h1 className="text-xl md:text-2xl font-black uppercase mb-10 text-white">Randomizing...</h1>
                <div className="bg-black border border-[#2A2A2A] p-6 mb-8 text-left space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center bg-[#121212] p-4">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest md:w-1/4">📍 Lokasi</span>
                    <div className="flex-1 opacity-30 blur-[2px] animate-pulse text-white font-bold">{tempResult.location}</div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center bg-[#121212] p-4">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest md:w-1/4">👤 Demografi</span>
                    <div className="flex-1 opacity-30 blur-[2px] animate-pulse text-white font-bold">{tempResult.slot1}</div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center bg-[#121212] p-4">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest md:w-1/4">💰 Kapasitas</span>
                    <div className="flex-1 opacity-30 blur-[2px] animate-pulse text-white font-bold">{tempResult.slot2}</div>
                  </div>
                </div>
              </>
            ) : (
              // Scenario Locked
              <>
                <h1 className="text-xl md:text-2xl font-black uppercase mb-8 text-white">Scenario Locked</h1>
                
                <div className="bg-black border border-[#2A2A2A] p-6 mb-8 text-left space-y-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">📍 Lokasi Pertemuan</p>
                    <p className="font-bold text-lg text-white">{result.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">👤 Target Demografi</p>
                    <p className="font-bold text-lg text-white">{result.slot1}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">💰 Kapasitas Finansial</p>
                    <p className="font-bold text-lg text-white">{result.slot2}</p>
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-900 p-5 mb-10 animate-scale-warning">
                  <p className="text-sm md:text-base text-red-400 font-black italic uppercase tracking-wider">⚠️ Pemain 1 (Agen) Silakan Balik Badan Sekarang!</p>
                  <p className="text-xs text-red-500/80 mt-2 leading-relaxed">Dilarang menyebut kata "Polis", "Asuransi", atau memaksa jualan sebelum menemukan titik luka target. Jika obrolan kaku/template, waktu akan dipotong!</p>
                </div>

                <button onClick={() => { setPhase('VS_GAMEPLAY'); setTimerActive(true); setTimeLeft(420); setFoundTanggungan(false); setFoundKondisi(false); }} className="w-full bg-white text-black py-5 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase animate-blink-pulse">
                  Target Ready (Start Timer)
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* VS 2: TARGET DASHBOARD (GAMEPLAY) */}
      {phase === 'VS_GAMEPLAY' && (
        <div className="flex flex-col min-h-screen pt-20 px-4 max-w-4xl mx-auto w-full">
          {/* Header Info */}
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">Target Dashboard</h2>
              <p className="text-[10px] text-gray-400 mt-1">Hanya dibaca oleh Pemain 2</p>
            </div>
            {/* Timer Dynamic Color */}
            <div className={`text-4xl md:text-6xl font-black font-mono tracking-tighter ${timeLeft <= 210 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Referensi Publik (Agar Pemain 2 tidak lupa) */}
          <div className="bg-[#121212] border border-[#2A2A2A] p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">📍 Lokasi</p><p className="font-bold text-sm text-white">{result.location}</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">👤 Demografi</p><p className="font-bold text-sm text-white">{result.slot1}</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">💰 Kapasitas</p><p className="font-bold text-sm text-white">{result.slot2}</p></div>
          </div>

          {/* Secret Info Box */}
          <div className="bg-black border border-red-900/50 p-6 mb-6">
            <div className="mb-6">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Rahasia 1: Tanggungan / Beban</p>
              <p className="text-lg font-bold text-white">{result.slot3}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Rahasia 2: Kondisi (Plot Twist)</p>
              <p className="text-lg font-bold text-red-400">{result.slot4}</p>
            </div>
          </div>

          {/* Dynamic Prompter (Muncul saat 3.5 menit terlewati / Di bawah 210 detik) */}
          {timeLeft <= 210 && (
            <div className="bg-yellow-900/40 border border-yellow-600 p-4 mb-6 animate-pulse text-center">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest">ACTING INSTRUCTION!</p>
              <p className="text-sm text-yellow-200 mt-1">Lihat jam tangan Anda sekarang, katakan: <i>"Eh sori, gue bentar lagi ada urusan nih. Tumben ngajak ketemuan, ada apa emangnya?"</i></p>
            </div>
          )}

          {/* Weapons / Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto mb-12">
            <button onClick={handleRedFlag} className="md:col-span-2 bg-red-950 border border-red-900 text-red-400 py-6 font-black tracking-widest text-lg hover:bg-red-900 hover:text-white transition uppercase shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              🚩 Kaku / Taboo Word (-30 Detik)
            </button>
            
            <button 
              disabled={foundTanggungan}
              onClick={() => handleCheck('tanggungan')} 
              className={`py-5 border transition font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${foundTanggungan ? 'bg-green-900/30 border-green-900 text-green-500 opacity-50' : 'bg-[#121212] border-[#3A3A3A] text-white hover:border-white'}`}
            >
              <div className={`w-5 h-5 border flex items-center justify-center ${foundTanggungan ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                {foundTanggungan && <span className="text-black text-xs">✓</span>}
              </div>
              Tanggungan Terbongkar
            </button>
            
            <button 
              disabled={foundKondisi}
              onClick={() => handleCheck('kondisi')} 
              className={`py-5 border transition font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${foundKondisi ? 'bg-green-900/30 border-green-900 text-green-500 opacity-50' : 'bg-[#121212] border-[#3A3A3A] text-white hover:border-white'}`}
            >
              <div className={`w-5 h-5 border flex items-center justify-center ${foundKondisi ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                {foundKondisi && <span className="text-black text-xs">✓</span>}
              </div>
              Kondisi Terbongkar
            </button>
          </div>
        </div>
      )}

      {/* VS 3: OBJECTION READ PHASE */}
      {phase === 'VS_OBJECTION_READ' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full">
          <div className="w-full max-w-3xl bg-[#121212] p-8 md:p-16 border-2 border-red-600 text-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            <h1 className="text-[10px] font-bold tracking-[0.3em] text-red-500 mb-6 uppercase animate-pulse">SUDDEN DEATH: Objection Triggered</h1>
            
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Pemain 2, bacakan bantahan ini dengan jelas:</p>
            <p className="text-3xl md:text-5xl font-bold mb-12 text-white leading-tight">"{objection}"</p>
            
            <button onClick={startObjectionTimer} className="w-full max-w-md mx-auto bg-white text-black py-5 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase block animate-blink-pulse">
              Start 1 Minute Countdown
            </button>
          </div>
        </div>
      )}

      {/* VS 4: OBJECTION ACTIVE PHASE */}
      {phase === 'VS_OBJECTION_PLAY' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full relative">
          <div className="absolute top-10 flex flex-col items-center">
             <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mb-2">Time to Handle</p>
             <div className="text-7xl md:text-9xl font-black font-mono tracking-tighter text-red-600 animate-pulse">
               {formatTime(timeLeft)}
             </div>
          </div>

          <div className="w-full max-w-3xl mt-32 text-center">
            <p className="text-xl md:text-3xl font-bold mb-16 text-gray-300">"{objection}"</p>
            
            <button onClick={finalizeVersusCase} className="w-full max-w-md mx-auto bg-red-600 text-white py-6 font-black tracking-widest text-sm hover:bg-red-700 transition uppercase shadow-xl block">
              ✅ Agen Berhasil Menjawab
            </button>
          </div>
        </div>
      )}

      {/* VS 5: STATS & LEADERBOARD */}
      {phase === 'VS_STATS' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 pt-20 md:pt-12">
          <h1 className={`text-2xl md:text-4xl font-black tracking-widest uppercase mb-2 ${timeStats.status === 'WIN' ? 'text-white' : 'text-red-500'}`}>
            {timeStats.status === 'WIN' ? 'Case Resolved' : 'Mission Failed'}
          </h1>
          <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mb-10">
            {timeStats.status === 'LOSE_DISCOVERY' ? 'Gagal: Waktu Habis Saat Menggali Data' : timeStats.status === 'LOSE_OBJECTION' ? 'Gagal: Waktu Habis Saat Menjawab Objection' : 'Time Attack Analytics'}
          </p>
          
          <div className="w-full max-w-2xl bg-[#121212] p-8 md:p-12 border border-[#2A2A2A] mb-8 rounded-sm">
            <div className="grid grid-cols-2 gap-8 mb-8 border-b border-[#2A2A2A] pb-8 text-center">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Discovery Time</p>
                <p className={`text-3xl font-mono font-bold ${timeStats.status === 'LOSE_DISCOVERY' ? 'text-red-600' : 'text-white'}`}>
                  {formatTime(timeStats.discoveryTime)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Handling Time</p>
                <p className={`text-3xl font-mono font-bold ${timeStats.status === 'LOSE_OBJECTION' ? 'text-red-600' : 'text-red-400'}`}>
                  {timeStats.status === 'LOSE_DISCOVERY' ? '--:--' : formatTime(timeStats.objectionTime)}
                </p>
              </div>
            </div>

            <div className="text-sm space-y-4 text-gray-400">
              <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Target:</strong> <span className="text-white">{result.slot1}</span></p>
              {timeStats.status !== 'LOSE_DISCOVERY' && (
                <>
                  <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Rahasia Terbongkar:</strong> <span className="text-white">{result.slot3} & {result.slot4}</span></p>
                  <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Objection Dihadapi:</strong> <span className="text-white">"{objection}"</span></p>
                </>
              )}
            </div>
          </div>

          <button onClick={() => setPhase('SETUP')} className="bg-transparent border border-white text-white px-12 py-4 font-bold tracking-widest text-xs hover:bg-white hover:text-black transition uppercase">
            Back to Menu
          </button>
        </div>
      )}

      {/* ================================================== */}
      {/* JALUR LAMA (SOLO DRILL MODE) DIBIARKAN UTUH */}
      {/* ================================================== */}
      
      {phase === 'SPINNING' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full pt-16 md:pt-0">
          <div className="w-full max-w-3xl bg-[#121212] p-8 md:p-12 border border-[#2A2A2A] flex flex-col gap-4 text-left shadow-2xl rounded-sm">
            <h2 className="text-[10px] md:text-xs tracking-[0.3em] text-gray-500 font-bold uppercase mb-6 text-center">Randomizing Target...</h2>
            {[
              { label: 'Demografi', val: tempResult.slot1, state: spinState[0] },
              { label: 'Kapasitas', val: tempResult.slot2, state: spinState[1] },
              { label: 'Tanggungan', val: tempResult.slot3, state: spinState[2] },
              { label: 'Kondisi', val: tempResult.slot4, state: spinState[3], color: 'text-red-400' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center bg-black border border-[#2A2A2A] p-5">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest md:w-1/4 mb-2 md:mb-0">{item.label}</span>
                <div className={`flex-1 transition-all duration-300 ${item.state ? 'opacity-30 blur-[2px] animate-pulse' : `opacity-100 font-bold text-base md:text-lg ${item.color || 'text-white'}`}`}>{item.val}</div>
              </div>
            ))}
          </div>
          {!spinState[3] && (
            <div className="mt-12 flex flex-col md:flex-row w-full max-w-3xl gap-4">
              <button onClick={() => setPhase('SETUP')} className="flex-1 bg-transparent border border-[#3A3A3A] text-gray-400 px-4 py-4 font-bold tracking-widest text-sm hover:text-white hover:border-white transition uppercase">Kembali</button>
              <button onClick={() => startSpin(mode)} className="flex-1 bg-transparent border border-white text-white px-4 py-4 font-bold tracking-widest text-sm hover:bg-white hover:text-black transition uppercase">Spin Ulang</button>
              <button onClick={() => setPhase('STRATEGY')} className="flex-[2] bg-white text-black px-4 py-4 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase animate-pulse">Lanjutkan</button>
            </div>
          )}
        </div>
      )}

      {phase === 'STRATEGY' && (
        <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden pt-16 md:pt-0">
          <div className="w-full md:w-1/3 bg-[#121212] p-8 md:p-16 border-b md:border-b-0 md:border-r border-[#2A2A2A] z-10 sticky top-0 md:static md:flex md:flex-col md:justify-center">
            <h2 className="text-[10px] tracking-[0.3em] text-gray-500 font-bold mb-8 uppercase">Target Profile</h2>
            <div className="space-y-6 text-sm md:text-base">
              <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Demografi</p><p className="font-bold">{result.slot1}</p></div>
              <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Kapasitas</p><p>{result.slot2}</p></div>
              <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Tanggungan</p><p>{result.slot3}</p></div>
              <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Kondisi</p><p className="text-red-400 font-bold">{result.slot4}</p></div>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-8 md:p-20 overflow-y-auto flex-1 hide-scrollbar">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-12 uppercase mt-4 md:mt-0">Formulate Strategy</h1>
            <div className="space-y-12">
              <div className="flex flex-col">
                <div className="mb-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 block">1. Product & Why</label>
                  <p className="text-[8px] md:text-[9px] text-gray-600 italic tracking-wider mt-1">Hint: Identifikasi risiko utama nasabah dan cocokan dengan produk.</p>
                </div>
                <textarea value={answers.product} className="w-full bg-transparent border-b border-[#3A3A3A] focus:border-white outline-none transition py-3 resize-none" rows="2" placeholder="Solusi produk..." onChange={(e) => setAnswers({...answers, product: e.target.value})}></textarea>
              </div>
              <div className="flex flex-col">
                <div className="mb-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 block">2. Networking Approach</label>
                  <p className="text-[8px] md:text-[9px] text-gray-600 italic tracking-wider mt-1">Hint: Gunakan metode F.O.R.M.</p>
                </div>
                <textarea value={answers.approach} className="w-full bg-transparent border-b border-[#3A3A3A] focus:border-white outline-none transition py-3 resize-none" rows="2" placeholder="Cara buka obrolan..." onChange={(e) => setAnswers({...answers, approach: e.target.value})}></textarea>
              </div>
              <div className="flex flex-col">
                <div className="mb-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 block">3. Transition</label>
                  <p className="text-[8px] md:text-[9px] text-gray-600 italic tracking-wider mt-1">Hint: Gunakan jembatan halus.</p>
                </div>
                <textarea value={answers.transition} className="w-full bg-transparent border-b border-[#3A3A3A] focus:border-white outline-none transition py-3 resize-none" rows="2" placeholder="Kalimat jembatan..." onChange={(e) => setAnswers({...answers, transition: e.target.value})}></textarea>
              </div>
            </div>
            <div className="mt-16 flex flex-col md:flex-row justify-end gap-4 pb-12 md:pb-0">
              <button onClick={() => setPhase('SPINNING')} className="bg-transparent border border-[#3A3A3A] text-gray-400 px-8 py-4 font-bold tracking-widest text-sm hover:text-white hover:border-white transition uppercase">Kembali</button>
              <button onClick={generateObjection} className="bg-white text-black px-10 py-4 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase">Submit Strategy</button>
            </div>
          </div>
        </div>
      )}

      {phase === 'OBJECTION' && (
        <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden pt-16 md:pt-0">
          <div className="hidden md:flex w-1/3 bg-[#121212] p-16 border-r border-[#2A2A2A] flex-col justify-center">
            <h2 className="text-[10px] tracking-[0.3em] text-gray-500 font-bold mb-8 uppercase">Current Target</h2>
            <div className="space-y-6 opacity-75 text-sm">
              <p><strong className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2">Demografi:</strong> {result.slot1}</p>
              <p><strong className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2">Kapasitas:</strong> {result.slot2}</p>
              <p><strong className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2">Tanggungan:</strong> {result.slot3}</p>
              <p><strong className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2">Kondisi:</strong> <span className="text-red-400 font-bold">{result.slot4}</span></p>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-8 md:p-20 overflow-y-auto flex-1 flex flex-col justify-center hide-scrollbar mt-4 md:mt-0">
            <h1 className="text-[10px] font-bold tracking-[0.3em] text-red-500 mb-6 uppercase animate-pulse">Objection Triggered</h1>
            <p className="text-3xl md:text-5xl font-bold mb-12 text-white leading-tight">"{objection}"</p>
            <div className="bg-black border border-[#2A2A2A] rounded-sm p-6 md:p-8 mb-10">
              <p className="text-[10px] tracking-widest text-gray-500 uppercase font-bold mb-5">Guidelines: Universal Objection Circle</p>
              <ul className="text-xs md:text-sm text-gray-400 space-y-4">
                <li><strong className="text-white">Acknowledge:</strong> "Saya ngerti..."</li>
                <li><strong className="text-white">Ask:</strong> Tanya untuk bongkar ketakutan.</li>
                <li><strong className="text-white">Solution:</strong> Beri analogi.</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">Your Handling Response</label>
              <textarea value={answers.handling} className="w-full bg-transparent border-b-2 border-red-500 focus:border-white outline-none transition py-3 resize-none text-base md:text-lg" rows="4" placeholder="Ketik respons..." onChange={(e) => setAnswers({...answers, handling: e.target.value})}></textarea>
            </div>
            <div className="mt-12 flex flex-col md:flex-row gap-4 pb-12">
              <button onClick={() => setPhase('STRATEGY')} className="w-full md:w-auto bg-transparent border border-[#3A3A3A] text-gray-400 px-8 py-4 font-bold tracking-widest text-sm hover:text-white hover:border-white transition uppercase">Kembali</button>
              <button onClick={() => { playClapSound(); setPhase('FINISHED'); }} className="w-full md:w-auto bg-red-600 text-white px-12 py-4 font-bold tracking-widest text-sm hover:bg-red-700 transition uppercase">Finalize Case</button>
            </div>
          </div>
        </div>
      )}

      {phase === 'FINISHED' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 pt-20 md:pt-12">
          <div className="w-full max-w-3xl bg-[#121212] p-8 md:p-12 border border-[#2A2A2A] mb-8 rounded-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-center border-b border-[#2A2A2A] pb-6">Case Summary</h2>
            <div className="text-sm md:text-base space-y-6 text-gray-400 leading-relaxed">
              <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-2">Profile:</strong> <span className="text-white">{result.slot1} | {result.slot2}</span></p>
              <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-2">Objection:</strong> <span className="text-white">"{objection}"</span></p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl gap-4">
            <button onClick={() => setPhase('OBJECTION')} className="bg-transparent border border-[#3A3A3A] text-gray-400 py-4 font-bold tracking-widest text-xs hover:text-white hover:border-white transition uppercase">Kembali</button>
            <button onClick={copyOnlyText} className="bg-transparent border border-white text-white py-4 font-bold tracking-widest text-xs hover:bg-white hover:text-black transition uppercase relative">{copiedText ? 'Copied!' : 'Copy Text'}</button>
            <button onClick={copyToWhatsApp} className="bg-[#25D366] text-black py-4 font-bold tracking-widest text-xs hover:bg-green-400 transition uppercase">WhatsApp</button>
            <button onClick={handleReset} className="bg-white text-black py-4 font-bold tracking-widest text-xs hover:bg-gray-200 transition uppercase">New Drill</button>
          </div>
        </div>
      )}
    </div>
  );
}