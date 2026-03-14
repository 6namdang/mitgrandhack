import { useState, useEffect } from "react";

const steps = [
  {
    id: 0,
    tag: "WELCOME",
    headline: "Burn care,\nreimagined.",
    sub: "Burx puts expert-level wound management in your hands — at home, on your schedule.",
    cta: "Get Started",
    visual: "flame",
  },
  {
    id: 1,
    tag: "STEP 01",
    headline: "Snap.\nAnalyze.\nKnow.",
    sub: "Take a photo of the burn. Our AI grades severity, flags infection risk, and gives you care instructions in seconds.",
    cta: "Continue",
    visual: "camera",
  },
  {
    id: 2,
    tag: "STEP 02",
    headline: "Ask anything,\nanytime.",
    sub: "From dressing changes to pain management — ask our AI anything about your wound. No waiting rooms.",
    cta: "Continue",
    visual: "ai",
  },
  {
    id: 3,
    tag: "STEP 03",
    headline: "Your physician,\none tap away.",
    sub: "Escalate instantly. Share your wound history and AI assessments directly with your care team.",
    cta: "Start Healing",
    visual: "doctor",
  },
];

// --- VIBRANT BLUE VISUALS ---

const FlameVisual = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <div className="relative">
      <div className="absolute inset-0 rounded-full blur-3xl opacity-40 bg-blue-600 scale-[2.5] animate-pulse" />
      <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
        <defs>
          <linearGradient id="blueFlame" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
        <path
          d="M70 10 C70 10 95 45 100 80 C105 115 88 135 88 155 C88 155 110 140 115 110 C120 80 100 55 100 55 C100 55 130 80 125 115 C120 148 95 170 70 170 C45 170 20 148 15 115 C10 80 40 55 40 55 C40 55 20 80 25 110 C30 140 52 155 52 155 C52 135 35 115 40 80 C45 45 70 10 70 10Z"
          fill="url(#blueFlame)"
          className="animate-[flicker_2s_ease-in-out_infinite]"
        />
      </svg>
    </div>
  </div>
);

const CameraVisual = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      <rect x="30" y="50" width="100" height="80" rx="16" stroke="#3B82F6" strokeWidth="3" />
      <circle cx="80" cy="90" r="25" stroke="#3B82F6" strokeWidth="3" />
      <circle cx="80" cy="90" r="10" fill="#3B82F6" className="animate-pulse" />
      <path d="M60 35 H100 L110 50 H50 L60 35Z" stroke="#3B82F6" strokeWidth="3" />
      <line x1="40" y1="90" x2="120" y2="90" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 4" className="animate-[scan_2s_linear_infinite]" />
    </svg>
  </div>
);

const AIVisual = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="40" stroke="#3B82F6" strokeWidth="2" strokeDasharray="8 4" className="animate-[spin_10s_linear_infinite]" />
      <path d="M60 80 L80 60 L100 80 L80 100 Z" fill="#3B82F6" opacity="0.8" />
      <circle cx="80" cy="80" r="15" fill="#1E40AF" stroke="#60A5FA" strokeWidth="2" />
      {[0, 90, 180, 270].map((deg, i) => (
        <circle key={i} cx={80 + 50 * Math.cos(deg * Math.PI / 180)} cy={80 + 50 * Math.sin(deg * Math.PI / 180)} r="5" fill="#3B82F6" />
      ))}
    </svg>
  </div>
);

const DoctorVisual = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      <rect x="45" y="20" width="70" height="120" rx="14" stroke="#3B82F6" strokeWidth="3" />
      <circle cx="80" cy="65" r="15" stroke="#3B82F6" strokeWidth="2" />
      <path d="M60 100 Q80 85 100 100" stroke="#3B82F6" strokeWidth="2" fill="none" />
      <circle cx="110" cy="30" r="6" fill="#10B981" />
    </svg>
  </div>
);

const visuals = { flame: <FlameVisual />, camera: <CameraVisual />, ai: <AIVisual />, doctor: <DoctorVisual /> };

export default function BurxOnboarding() {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const current = steps[step];

  const next = () => {
    if (step === steps.length - 1) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center font-sans overflow-hidden">
      <style>{`
        @keyframes flicker { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(0.98); } }
        @keyframes scan { 0% { transform: translateY(-30px); } 100% { transform: translateY(30px); } }
        .slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .bg-grid { background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 30px 30px; }
      `}</style>

      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid opacity-40" />
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />

      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center p-8 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="font-black text-xl tracking-tighter">burx</span>
        </div>
        <button onClick={() => setStep(steps.length - 1)} className="text-xs font-mono text-blue-400 uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
          Skip
        </button>
      </header>

      {/* Main Visual */}
      <div className="flex-1 w-full flex items-center justify-center z-10 relative">
        <div key={step} className="slide-up w-full h-64">
          {visuals[current.visual]}
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full max-w-md px-8 z-10">
        <div key={`text-${step}`} className={`${animating ? 'opacity-0' : 'slide-up'}`}>
          <span className="text-xs font-mono text-blue-500 font-bold tracking-[0.3em]">{current.tag}</span>
          <h1 className="text-4xl font-bold mt-4 leading-[1.1] tracking-tight whitespace-pre-line">
            {current.headline}
          </h1>
          <p className="text-slate-400 mt-4 text-lg leading-relaxed font-light">
            {current.sub}
          </p>
        </div>
      </div>

      {/* Footer / UI */}
      <footer className="w-full max-w-md p-8 pt-12 z-10 flex flex-col gap-8">
        <div className="flex gap-2 justify-start">
          {steps.map((s, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${step === i ? 'w-12 bg-blue-500' : 'w-2 bg-slate-800'}`} 
            />
          ))}
        </div>

        <button 
          onClick={next}
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20"
        >
          {current.cta}
        </button>
        
        <p className="text-center text-[10px] text-slate-500 font-mono uppercase tracking-widest">
          Secure • HIPAA Compliant • AI-Powered
        </p>
      </footer>
    </div>
  );
}