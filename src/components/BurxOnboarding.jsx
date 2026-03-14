import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

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
    <div className="absolute inset-0 rounded-full blur-3xl opacity-40 bg-blue-600 scale-[2.5] animate-pulse" />
    <svg width="140" height="180" viewBox="0 0 140 180" fill="none" className="z-10">
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
);

const CameraVisual = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-blue-500 scale-[2]" />
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="z-10">
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
    <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-blue-500 scale-[2]" />
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="z-10">
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
    <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-emerald-500/30 scale-[2]" />
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="z-10">
      <rect x="45" y="20" width="70" height="120" rx="14" stroke="#3B82F6" strokeWidth="3" />
      <circle cx="80" cy="65" r="15" stroke="#3B82F6" strokeWidth="2" />
      <path d="M60 100 Q80 85 100 100" stroke="#3B82F6" strokeWidth="2" fill="none" />
      <circle cx="110" cy="30" r="6" fill="#10B981" className="animate-pulse" />
    </svg>
  </div>
);

const visuals = { flame: <FlameVisual />, camera: <CameraVisual />, ai: <AIVisual />, doctor: <DoctorVisual /> };

export default function BurxOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const current = steps[step];
  const minSwipeDistance = 50;

  // Navigation Logic
  const next = useCallback(() => {
    if (animating) return;
    if (step === steps.length - 1) {
      navigate("/signup");
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 300);
  }, [step, animating, navigate]);

  const prev = useCallback(() => {
    if (animating || step === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimating(false);
    }, 300);
  }, [step, animating]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Swipe Gestures
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  return (
    <div 
      className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row font-sans overflow-hidden selection:bg-blue-500/30"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      <style>{`
        @keyframes flicker { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(0.98); } }
        @keyframes scan { 0% { transform: translateY(-30px); } 100% { transform: translateY(30px); } }
        .slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .bg-grid { background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 30px 30px; }
      `}</style>

      {/* Global Background Decor */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* --- LEFT SIDE: Visuals (Top on Mobile) --- */}
      <div className="relative w-full md:w-1/2 h-[45vh] md:h-screen flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-slate-800/50 bg-gradient-to-br from-blue-950/20 to-transparent">
        
        {/* Header - Absolute Positioned */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 md:p-10 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <div className="w-3.5 h-3.5 bg-white rounded-full" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">burx</span>
          </div>
          <button 
            onClick={() => navigate("/signup")} 
            className="md:hidden text-xs font-mono text-blue-400 uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity p-2"
          >
            Skip
          </button>
        </header>

        {/* Dynamic Visual */}
        <div key={`visual-${step}`} className={`w-full max-w-sm h-64 md:h-96 flex items-center justify-center ${animating ? 'opacity-0 scale-95' : 'fade-in'}`}>
          {visuals[current.visual]}
        </div>
      </div>

      {/* --- RIGHT SIDE: Content & Controls (Bottom on Mobile) --- */}
      <div className="relative w-full md:w-1/2 flex-1 flex flex-col justify-between md:justify-center p-8 md:p-16 lg:p-24 z-10">
        
        {/* Desktop Skip Button */}
        <div className="hidden md:flex absolute top-10 right-10">
          <button 
            onClick={() => navigate("/signup")} 
            className="text-sm font-mono text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
          >
            Skip Intro
          </button>
        </div>

        {/* Text Content */}
        <div className="flex-1 md:flex-none flex flex-col justify-center max-w-lg mx-auto w-full">
          <div key={`text-${step}`} className={`${animating ? 'opacity-0 translate-y-4' : 'slide-up'}`}>
            <span className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs font-mono text-blue-400 font-bold tracking-[0.2em] mb-6">
              {current.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight whitespace-pre-line text-slate-50">
              {current.headline}
            </h1>
            <p className="text-slate-400 mt-6 text-lg md:text-xl leading-relaxed font-light">
              {current.sub}
            </p>
          </div>
        </div>

        {/* Controls & Footer */}
        <div className="w-full max-w-lg mx-auto mt-12 flex flex-col gap-8">
          
          {/* Progress Indicators */}
          <div className="flex gap-2 justify-start items-center">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 hover:bg-blue-400 ${
                  step === i ? 'w-16 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-3 bg-slate-800'
                }`} 
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
             {/* Show a back button if not on the first step */}
            <button 
              onClick={prev}
              disabled={step === 0}
              className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              aria-label="Previous Step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button 
              onClick={next}
              className="flex-1 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all text-white py-4 md:py-5 rounded-2xl font-bold text-lg shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 group"
            >
              {current.cta}
              {step !== steps.length - 1 && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </div>
          
          <p className="text-center md:text-left text-[11px] text-slate-500 font-mono uppercase tracking-widest mt-2 flex items-center justify-center md:justify-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Secure • HIPAA Compliant • AI-Powered
          </p>
        </div>

      </div>
    </div>
  );
}