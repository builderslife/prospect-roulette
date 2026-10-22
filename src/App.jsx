import { useState, useRef, useEffect } from 'react';

// ==========================================
// DATABASE PROFIL & OBJECTION
// ==========================================
export const SLOT_DATA = {
  beginner: {
    demografi: [
      "Pria, 28 Thn, Single (Jakarta)", "Wanita, 25 Thn, Single (Surabaya)",
      "Pria, 35 Thn, Menikah, 1 Anak (Bandung)", "Wanita, 32 Thn, Sedang Hamil (Medan)",
      "Pria, 40 Thn, Menikah, 2 Anak (Semarang)"
    ],
    finansial: [
      "Karyawan Swasta (10-15 Jt/bln)", "Manajer Area (25-35 Jt/bln)",
      "Pengusaha F&B (50 Jt+/bln)", "IT Developer (18-25 Jt/bln)",
      "Pegawai Bank (12-15 Jt/bln)"
    ],
    tanggungan: [
      "Sedang fokus kumpul DP Rumah", "Rutin menabung dana pendidikan anak",
      "Cicilan KPR rumah tinggal 3 tahun", "Punya asuransi kantor limit kecil",
      "Suka traveling luar negeri 2x setahun"
    ],
    twist: [
      "Sangat sadar kesehatan, rutin gym", "Merasa asuransi kantor sudah cukup",
      "Baru mendapat bonus tahunan", "Sedang merencanakan pensiun dini",
      "Pernah beli unit link tapi kecewa"
    ]
  },
  hardcore: {
    demografi: [
      "Pria, 26 Thn, Tulang Punggung (Kab. Bogor)", "Wanita, 48 Thn, Suami Pensiun (Solo)",
      "Pria, 55 Thn, 4 Anak (Tasikmalaya)", "Pria, 30 Thn, Duda, 2 Anak Balita (Sidoarjo)",
      "Wanita, 50 Thn, Single Parent (Malang)"
    ],
    finansial: [
      "Admin Gudang (UMR 4,5 Jt/bln)", "Driver Taksi Online (4-7 Jt/bln)",
      "Freelancer Desain (3-6 Jt/bln)", "Pemilik Warung Kopi (5-8 Jt/bln)",
      "Karyawan Potong Gaji (3,5 Jt/bln)"
    ],
    tanggungan: [
      "Sandwich Generation berat", "Cicilan pinjol numpuk",
      "Bayar KPR & Mobil, sisa pas-pasan", "Orang tua masuk RS tanpa asuransi",
      "Gaji numpang lewat, nol dana darurat"
    ],
    twist: [
      "Riwayat Asam Urat & Kolesterol", "Perokok berat (2 bungkus/hari)",
      "Trauma klaim ayah ditolak", "Baru sebulan lalu kena PHK",
      "Anti-asuransi (menganggap penipuan)"
    ]
  }
};

export const OBJECTIONS = [
  "Uang saya lebih baik diputar di bisnis.",
  "Asuransi kantor saya sudah cover semuanya.",
  "Saya tanya istri/suami dulu ya.",
  "Preminya kemahalan, lagi banyak cicilan.",
  "Teman saya klaimnya susah, asuransi itu nipu.",
  "Nanti saja, saya masih muda dan sehat.",
  "Saya sudah punya BPJS, itu saja cukup.",
  "Rugi dong uang hangus kalau tidak sakit."
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