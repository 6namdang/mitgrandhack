import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import navigate
import { supabase } from "../lib/SupabaseClient.js";

export default function Login({ onSwitch }) {
  const navigate = useNavigate(); // Initialize
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error: sbError } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (sbError) {
      setError(sbError.message);
      setLoading(false);
    } else {
      // Direct redirect to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] shadow-2xl transition-all duration-500">
      <div className="mb-10">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
        <p className="text-slate-400 mt-2 font-medium">Please enter your details to sign in.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Password</label>
            <button type="button" className="text-[11px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-wider transition-colors">Forgot?</button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 transition-all duration-300"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="group relative w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 active:scale-[0.98] flex justify-center items-center shadow-xl shadow-blue-600/20"
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : "Continue"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-500 text-sm font-medium">
          New to Burx?{" "}
          <button onClick={onSwitch} className="text-white hover:text-blue-400 font-bold transition-colors ml-1">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}