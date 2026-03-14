import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import navigate
import { supabase } from "../lib/SupabaseClient.js";

export default function SignUp({ onSwitch }) {
  const navigate = useNavigate(); // Initialize
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error: sbError } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    
    if (sbError) {
      setError(sbError.message);
      setLoading(false);
    } else {
      // Since email confirm is off, session is created immediately
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] shadow-2xl transition-all duration-500">
      <div className="mb-10">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
        <p className="text-slate-400 mt-2 font-medium">Join Burx to start your care journey today.</p>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {error}
        </div>
      )}
      
      <form onSubmit={handleSignUp} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-slate-950/50 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="w-full bg-slate-950/50 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 transition-all duration-300"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 active:scale-[0.98] flex justify-center items-center shadow-xl shadow-indigo-600/20 mt-4"
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : "Get Started"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-white hover:text-indigo-400 font-bold transition-colors ml-1">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}