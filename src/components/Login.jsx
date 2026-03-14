import React, { useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function Login({ onSwitch }) {
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
      password,
    });

    if (sbError) {
      setError(sbError.message);
    } else {
      console.log("Logged in successfully:", data.user);
      // We will handle the redirect to the dashboard in the next modular step
    }
    setLoading(false);
  };

  return (
    <div className="slide-up w-full max-w-md px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white">Welcome Back</h2>
        <p className="text-slate-400 font-light">Access your secure burn care assessments.</p>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-mono text-blue-400 uppercase tracking-widest ml-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-xl px-4 py-4 text-white placeholder:text-slate-600 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Password</label>
            <button type="button" className="text-[10px] font-mono text-slate-500 hover:text-blue-400 uppercase">Forgot?</button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-xl px-4 py-4 text-white placeholder:text-slate-600 transition-all"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 mt-2 transition-all active:scale-[0.98]"
        >
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>

      <button onClick={onSwitch} className="w-full text-center mt-8 text-sm text-slate-500">
        New to Burx? <span className="text-blue-500 font-semibold">Create account</span>
      </button>
    </div>
  );
}