import { useNavigate } from "react-router";

// --- CUSTOM SVG VISUALS (Consolidated) ---
const FlameVisual = () => (
  <div className="relative flex items-center justify-center w-full h-48">
    <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-blue-600 scale-[2] animate-pulse" />
    <svg width="100" height="130" viewBox="0 0 140 180" fill="none" className="z-10">
      <defs>
        <linearGradient id="blueFlame" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <path d="M70 10 C70 10 95 45 100 80 C105 115 88 135 88 155 C88 155 110 140 115 110 C120 80 100 55 100 55 C100 55 130 80 125 115 C120 148 95 170 70 170 C45 170 20 148 15 115 C10 80 40 55 40 55 C40 55 20 80 25 110 C30 140 52 155 52 155 C52 135 35 115 40 80 C45 45 70 10 70 10Z" fill="url(#blueFlame)" />
    </svg>
  </div>
);

const CameraVisual = () => (
  <svg width="60" height="60" viewBox="0 0 160 160" fill="none">
    <rect x="30" y="50" width="100" height="80" rx="16" stroke="#3B82F6" strokeWidth="6" />
    <circle cx="80" cy="90" r="25" stroke="#3B82F6" strokeWidth="6" />
    <line x1="40" y1="90" x2="120" y2="90" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 4" />
  </svg>
);

const AIVisual = () => (
  <svg width="60" height="60" viewBox="0 0 160 160" fill="none">
    <circle cx="80" cy="80" r="40" stroke="#3B82F6" strokeWidth="4" strokeDasharray="8 4" className="animate-spin" style={{animationDuration: '8s'}} />
    <circle cx="80" cy="80" r="15" fill="#1E40AF" stroke="#60A5FA" strokeWidth="4" />
  </svg>
);

const DoctorVisual = () => (
  <svg width="60" height="60" viewBox="0 0 160 160" fill="none">
    <rect x="45" y="20" width="70" height="120" rx="14" stroke="#10B981" strokeWidth="6" />
    <circle cx="110" cy="30" r="8" fill="#10B981" />
  </svg>
);

export default function BurxLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30">
      <style>{`
        .bg-grid { background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 40px 40px; }
        .hero-glow { background: radial-gradient(circle at 50% 50%, rgba(37,99,235,0.15) 0%, transparent 70%); }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-black text-xl tracking-tighter">burx</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/login")} className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors">Sign In</button>
            <button onClick={() => navigate("/signup")} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full h-[500px] hero-glow pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs font-mono text-blue-400 font-bold tracking-widest mb-8 animate-bounce">
            REIMAGINING RECOVERY
          </span>
          <h1 className="text-5xl md:text-8xl font-black leading-[1.05] tracking-tight mb-8">
            Burn care, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">reimagined.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            Expert-level wound management in your hands. High-accuracy AI analysis, 24/7 support, and instant physician escalation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate("/signup")} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/40 transition-all active:scale-95">
              Start Free Assessment
            </button>
            <button className="w-full sm:w-auto bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all">
              Watch Demo
            </button>
          </div>

          <div className="mt-20">
            <FlameVisual />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10 bg-slate-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                <CameraVisual />
              </div>
              <h3 className="text-2xl font-bold mb-4">Snap. Analyze. Know.</h3>
              <p className="text-slate-400 leading-relaxed font-light">
                Simply take a photo. Our AI identifies burn depth, infection markers, and provides immediate clinical instructions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="mb-6 group-hover:rotate-12 transition-transform duration-500">
                <AIVisual />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ask Anything, 24/7.</h3>
              <p className="text-slate-400 leading-relaxed font-light">
                Instant guidance on dressing changes and pain management. Our specialized AI is trained on thousands of clinical cases.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="mb-6 group-hover:translate-y-[-5px] transition-transform duration-500">
                <DoctorVisual />
              </div>
              <h3 className="text-2xl font-bold mb-4">Physician Triage.</h3>
              <p className="text-slate-400 leading-relaxed font-light">
                High-risk injuries are instantly flagged. Share your data history directly with your care team for seamless escalation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 text-center border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-12">Trusted Clinical Standards</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
            <span className="text-xl font-bold">HIPAA COMPLIANT</span>
            <span className="text-xl font-bold">FDA CLASS I</span>
            <span className="text-xl font-bold">AES-256 ENCRYPTED</span>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 px-6 text-center bg-gradient-to-t from-blue-900/20 to-transparent">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to heal better?</h2>
          <p className="text-slate-400 mb-10 font-light text-lg">
            Join thousands of users managing recovery with clinical confidence.
          </p>
          <button onClick={() => navigate("/signup")} className="bg-white text-blue-950 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-white/10">
            Create Your Account
          </button>
          <div className="mt-12 text-slate-600 text-sm font-mono flex items-center justify-center gap-4">
            <span>© 2024 BURX INC</span>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <span>PRIVACY POLICY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}