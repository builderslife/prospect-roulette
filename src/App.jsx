import { useState, useRef, useEffect } from 'react';

// ==========================================
// DATABASE PROFIL & OBJECTION
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
// ==========================================

export default function App() {
  const [phase, setPhase] = useState('SETUP');
  const [mode, setMode] = useState('');
  const [result, setResult] = useState({ slot1: '', slot2: '', slot3: '', slot4: '' });
  const [answers, setAnswers] = useState({ product: '', approach: '', transition: '', handling: '' });
  const [objection, setObjection] = useState('');

  const [spinState, setSpinState] = useState([true, true, true, true]);
  const [tempResult, setTempResult] = useState({ slot1: '...', slot2: '...', slot3: '...', slot4: '...' });
  const [copiedText, setCopiedText] = useState(false);
  
  // Kontrol Audio BGM
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const audioRef = useRef(null);
  const spinAudioRef = useRef(null);

  // Logika BGM (Looping sepanjang sesi & Penyesuaian Volume)
  useEffect(() => {
    if (audioRef.current) {
      if (bgmPlaying) {
        audioRef.current.play().catch(() => setBgmPlaying(false));
      } else {
        audioRef.current.pause();
      }

      // Volume 100% di halaman depan, 70% di halaman selanjutnya
      if (phase === 'SETUP') {
        audioRef.current.volume = 1.0;
      } else {
        audioRef.current.volume = 0.7;
      }
    }
  }, [bgmPlaying, phase]);

  const playSuccessSound = () => new Audio('/success.mp3').play().catch(() => {});
  const playClapSound = () => new Audio('/clap.mp3').play().catch(() => {});

  const startSpin = (selectedMode) => {
    setMode(selectedMode);
    setPhase('SPINNING');
    setSpinState([true, true, true, true]);
    
    if (phase === 'SETUP') {
      setAnswers({ product: '', approach: '', transition: '', handling: '' });
    }

    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play().catch(() => {});
    }

    const data = SLOT_DATA[selectedMode];
    const final1 = data.demografi[Math.floor(Math.random() * data.demografi.length)];
    const final2 = data.finansial[Math.floor(Math.random() * data.finansial.length)];
    const final3 = data.tanggungan[Math.floor(Math.random() * data.tanggungan.length)];
    const final4 = data.twist[Math.floor(Math.random() * data.twist.length)];
    
    setResult({ slot1: final1, slot2: final2, slot3: final3, slot4: final4 });

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
      setTempResult({ slot1: final1, slot2: final2, slot3: final3, slot4: final4 });
      
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
      }
      playSuccessSound(); 
    }, 4000);
  };

  const generateObjection = () => {
    if (!objection) {
      const randomObj = OBJECTIONS[Math.floor(Math.random() * OBJECTIONS.length)];
      setObjection(randomObj);
    }
    setPhase('OBJECTION');
  };

  const getFormatText = () => {
    return `📋 *STUDY CASE DRILLING*\n\n👤 *Mode:* ${mode.toUpperCase()}\n\n🎰 *PROFIL NASABAH*\n• Demografi: ${result.slot1}\n• Kapasitas: ${result.slot2}\n• Tanggungan: ${result.slot3}\n• Kondisi: ${result.slot4}\n\n💡 *STRATEGY*\n• *Product & Why:* ${answers.product}\n• *Networking:* ${answers.approach}\n• *Transition:* ${answers.transition}\n\n🎯 *OBJECTION*\nNasabah: "${objection}"\n• *Handling:* ${answers.handling}`;
  };

  const copyOnlyText = () => {
    navigator.clipboard.writeText(getFormatText()).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  const copyToWhatsApp = () => {
    navigator.clipboard.writeText(getFormatText()).catch(() => {});
    window.open(`https://wa.me/?text=${encodeURIComponent(getFormatText())}`, '_blank');
  };

  const handleReset = () => {
    setObjection('');
    setPhase('SETUP');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
      
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.8; }
        }
        .animate-subtle-pulse {
          animation: subtlePulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* HEADER GLOBAL KIRI (Kecuali Setup) */}
      {phase !== 'SETUP' && (
        <div className="absolute top-5 left-5 md:top-8 md:left-10 z-50 pointer-events-none flex flex-col gap-1">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
            Prospect Roulette
          </span>
          <span className="text-[8px] md:text-[10px] text-gray-500 italic lowercase tracking-wider">
            by the builders of life community
          </span>
        </div>
      )}

      {/* TOMBOL KONTROL BGM GLOBAL KANAN */}
      <button 
        onClick={() => setBgmPlaying(!bgmPlaying)} 
        className="absolute top-5 right-5 md:top-8 md:right-10 z-50 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition px-3 py-1 border border-gray-800 rounded-full"
      >
        {bgmPlaying ? '🎵 BGM: ON' : '🔇 BGM: OFF'}
      </button>

      {/* Elemen Audio */}
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />
      <audio ref={spinAudioRef} src="/spin.mp3" loop preload="auto" />

      {/* PHASE 1: SETUP */}
      {phase === 'SETUP' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative">
          <img src="/Logo.jpg" alt="The Builders" className="h-20 md:h-28 object-contain mb-8 rounded" onError={(e) => e.target.style.display = 'none'} />
          
          <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] mb-1 uppercase animate-subtle-pulse">
            Prospect Roulette
          </h1>
          <p className="text-gray-500 text-[10px] md:text-xs italic mb-4 lowercase tracking-widest">
            by the builders of life community
          </p>
          <p className="text-gray-500 tracking-[0.3em] text-[10px] md:text-xs uppercase mb-16 mt-2">
            The Builders: Case Study Simulator
          </p>
          
          <div className="flex flex-col w-full max-w-sm gap-4">
            <button onClick={() => startSpin('beginner')} className="w-full bg-white text-black py-4 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase">
              Beginner Mode
            </button>
            <button onClick={() => startSpin('hardcore')} className="w-full bg-transparent border border-[#3A3A3A] text-white py-4 font-bold tracking-widest text-sm hover:border-white transition uppercase">
              Hardcore Mode
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: SPINNING */}
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
                <div className={`flex-1 transition-all duration-300 ${item.state ? 'opacity-30 blur-[2px] animate-pulse' : `opacity-100 font-bold text-base md:text-lg ${item.color || 'text-white'}`}`}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          {!spinState[3] && (
            <div className="mt-12 flex flex-col md:flex-row w-full max-w-3xl gap-4">
              <button onClick={() => setPhase('SETUP')} className="flex-1 bg-transparent border border-[#3A3A3A] text-gray-400 px-4 py-4 font-bold tracking-widest text-sm hover:text-white hover:border-white transition uppercase">
                Kembali
              </button>
              <button onClick={() => startSpin(mode)} className="flex-1 bg-transparent border border-white text-white px-4 py-4 font-bold tracking-widest text-sm hover:bg-white hover:text-black transition uppercase">
                Spin Ulang
              </button>
              <button onClick={() => setPhase('STRATEGY')} className="flex-[2] bg-white text-black px-4 py-4 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase animate-pulse">
                Lanjutkan
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: STRATEGY */}
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
                <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">1. Product & Why</label>
                <textarea value={answers.product} className="w-full bg-transparent border-b border-[#3A3A3A] focus:border-white outline-none transition py-3 resize-none" rows="2" placeholder="Solusi produk yang ditawarkan..." onChange={(e) => setAnswers({...answers, product: e.target.value})}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">2. Networking Approach</label>
                <textarea value={answers.approach} className="w-full bg-transparent border-b border-[#3A3A3A] focus:border-white outline-none transition py-3 resize-none" rows="2" placeholder="Cara membuka obrolan..." onChange={(e) => setAnswers({...answers, approach: e.target.value})}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">3. Transition</label>
                <textarea value={answers.transition} className="w-full bg-transparent border-b border-[#3A3A3A] focus:border-white outline-none transition py-3 resize-none" rows="2" placeholder="Kalimat jembatan ke asuransi..." onChange={(e) => setAnswers({...answers, transition: e.target.value})}></textarea>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row justify-end gap-4 pb-12 md:pb-0">
              <button onClick={() => setPhase('SPINNING')} className="bg-transparent border border-[#3A3A3A] text-gray-400 px-8 py-4 font-bold tracking-widest text-sm hover:text-white hover:border-white transition uppercase">
                Kembali
              </button>
              <button onClick={generateObjection} className="bg-white text-black px-10 py-4 font-bold tracking-widest text-sm hover:bg-gray-200 transition uppercase">
                Submit Strategy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 4: OBJECTION */}
      {phase === 'OBJECTION' && (
        <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden pt-16 md:pt-0">
          <div className="hidden md:flex w-1/3 bg-[#121212] p-16 border-r border-[#2A2A2A] flex-col justify-center">
            <h2 className="text-[10px] tracking-[0.3em] text-gray-500 font-bold mb-8 uppercase">Current Target</h2>
            <div className="space-y-6 opacity-75 text-sm">
              <p><strong className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2">Demografi:</strong> {result.slot1}</p>
              <p><strong className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2">Kapasitas:</strong> {result.slot2}</p>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 p-8 md:p-20 overflow-y-auto flex-1 flex flex-col justify-center hide-scrollbar mt-4 md:mt-0">
            <h1 className="text-[10px] font-bold tracking-[0.3em] text-red-500 mb-6 uppercase animate-pulse">Objection Triggered</h1>
            <p className="text-3xl md:text-5xl font-bold mb-12 text-white leading-tight">"{objection}"</p>
            
            <div className="bg-black border border-[#2A2A2A] rounded-sm p-6 md:p-8 mb-10">
              <p className="text-[10px] tracking-widest text-gray-500 uppercase font-bold mb-5">Guidelines: Universal Objection Circle</p>
              <ul className="text-xs md:text-sm text-gray-400 space-y-4">
                <li><strong className="text-white">Acknowledge:</strong> "Saya ngerti, saya paham..." (Validasi)</li>
                <li><strong className="text-white">Ask:</strong> Beri pertanyaan untuk membongkar ketakutan.</li>
                <li><strong className="text-white">Solution & Example:</strong> Kasih analogi/solusi sederhana.</li>
                <li><strong className="text-white">Relatable:</strong> Pastikan contoh nyambung dengan keseharian.</li>
              </ul>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">Your Handling Response</label>
              <textarea value={answers.handling} className="w-full bg-transparent border-b-2 border-red-500 focus:border-white outline-none transition py-3 resize-none text-base md:text-lg" rows="4" placeholder="Ketik respons Anda di sini..." onChange={(e) => setAnswers({...answers, handling: e.target.value})}></textarea>
            </div>

            <div className="mt-12 flex flex-col md:flex-row gap-4 pb-12">
              <button onClick={() => setPhase('STRATEGY')} className="w-full md:w-auto bg-transparent border border-[#3A3A3A] text-gray-400 px-8 py-4 font-bold tracking-widest text-sm hover:text-white hover:border-white transition uppercase">
                Kembali
              </button>
              <button onClick={() => { playClapSound(); setPhase('FINISHED'); }} className="w-full md:w-auto bg-red-600 text-white px-12 py-4 font-bold tracking-widest text-sm hover:bg-red-700 transition uppercase">
                Finalize Case
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 5: FINISHED */}
      {phase === 'FINISHED' && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 pt-20 md:pt-12">
          <div className="w-full max-w-3xl bg-[#121212] p-8 md:p-12 border border-[#2A2A2A] mb-8 rounded-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-center border-b border-[#2A2A2A] pb-6">Case Summary</h2>
            <div className="text-sm md:text-base space-y-6 text-gray-400 leading-relaxed">
              <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-2">Profile:</strong> <span className="text-white">{result.slot1} | {result.slot2}</span></p>
              <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-2">Product:</strong> <span className="text-white">{answers.product}</span></p>
              <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-2">Objection:</strong> <span className="text-white">"{objection}"</span></p>
              <p><strong className="text-gray-500 text-[10px] uppercase tracking-wider block mb-2">Handling:</strong> <span className="text-white">{answers.handling}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl gap-4">
            <button onClick={() => setPhase('OBJECTION')} className="bg-transparent border border-[#3A3A3A] text-gray-400 py-4 font-bold tracking-widest text-xs hover:text-white hover:border-white transition uppercase">
              Kembali
            </button>
            <button onClick={copyOnlyText} className="bg-transparent border border-white text-white py-4 font-bold tracking-widest text-xs hover:bg-white hover:text-black transition uppercase relative">
              {copiedText ? 'Copied!' : 'Copy Text'}
            </button>
            <button onClick={copyToWhatsApp} className="bg-[#25D366] text-black py-4 font-bold tracking-widest text-xs hover:bg-green-400 transition uppercase">
              WhatsApp
            </button>
            <button onClick={handleReset} className="bg-white text-black py-4 font-bold tracking-widest text-xs hover:bg-gray-200 transition uppercase">
              New Drill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}