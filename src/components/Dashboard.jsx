import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/SupabaseClient.js";

const API_KEY = import.meta.env.VITE_API_KEY
const MODEL = "nvidia/nemotron-nano-12b-v2-vl:free";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [streamedText, setStreamedText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleLogout = async () => await supabase.auth.signOut();

  const processFiles = async (files) => {
    const newImages = await Promise.all(files.map(async (file) => {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
      return { preview: URL.createObjectURL(file), base64 };
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const runStreamingAnalysis = async () => {
    if (images.length === 0) return;
    setIsAnalyzing(true);
    setStreamedText("");

    const messageContent = [
      {
        type: "text",
        text: "Act as a specialist dermatologist. Analyze this burn sequence. Format your response clearly with these headers: ### 1. Does this patient got better?, ### 2. Prognosis, ### 3. Pathological Progression, ### 4. Recommended Interventions (including specific exercises for mobility)."
      },
      ...images.map(img => ({ type: "image_url", image_url: { url: img.base64 } }))
    ];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: messageContent }],
          stream: true 
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const json = JSON.parse(data);
              const content = json.choices[0]?.delta?.content || "";
              setStreamedText(prev => prev + content);
            } catch (e) { /* End of stream */ }
          }
        }
      }
    } catch (error) {
      setStreamedText("Analysis failed. Please check connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20" />
          <span className="font-black text-xl tracking-tighter text-white uppercase italic">burx</span>
        </div>
        <button onClick={handleLogout} className="mt-auto text-slate-500 hover:text-red-400 text-sm font-bold flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeWidth="2" strokeLinecap="round" /></svg>
          LOGOUT
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Clinical VLM Dashboard</h1>
            <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">NVIDIA-NEMOTRON-NANO // LIVE STREAM</p>
          </div>
          <button 
            onClick={runStreamingAnalysis} 
            disabled={isAnalyzing || images.length === 0}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 px-8 py-4 rounded-2xl font-bold text-white shadow-xl shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? "STREAMING ANALYSIS..." : "RUN FULL DIAGNOSTIC"}
          </button>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left: Sequence Input */}
          <div className="xl:col-span-1 space-y-6">
            <div 
              onClick={() => document.getElementById('fileInput').click()}
              className="h-48 border-2 border-dashed border-white/10 rounded-[2rem] bg-slate-900/40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all group"
            >
              <input id="fileInput" type="file" multiple className="hidden" onChange={(e) => processFiles(Array.from(e.target.files))} />
              <p className="text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors">Add Progression Images</p>
              <span className="text-[10px] text-slate-600 mt-2 font-mono">JPG, PNG supported</span>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((img, i) => (
                <div key={i} className="relative flex-shrink-0">
                  <img src={img.preview} className="w-24 h-24 object-cover rounded-2xl border border-white/10 shadow-lg" />
                  <div className="absolute top-1 left-1 bg-black/60 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase">Day {i+1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: The Streamed Report */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 min-h-[600px] shadow-2xl relative overflow-hidden">
               
               {/* Cleaned up Markdown Display */}
               {!streamedText && !isAnalyzing ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 py-40">
                      <p className="font-mono text-xs uppercase tracking-widest text-center italic">Awaiting Clinical Data Sequence...</p>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none 
                      prose-headings:text-blue-400 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-headings:mt-8 first:prose-headings:mt-0
                      prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
                      prose-strong:text-white prose-strong:font-bold
                      prose-li:text-slate-300">
                      
                      <ReactMarkdown>
                        {streamedText}
                      </ReactMarkdown>

                      {isAnalyzing && (
                        <span className="inline-block w-2 h-5 bg-blue-500 animate-pulse ml-2 align-middle" />
                      )}
                    </div>
                  )}
            </div>

            {/* Quick Action Reference Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionCard title="Immediate Wound Care" icon="💧" items={["Apply Silver Sulfadiazine", "Non-adherent dressing", "Debride necrotic tissue"]} />
              <ActionCard title="Rehabilitation" icon="🧘" items={["Passive ROM stretches", "Tendon glides (2x daily)", "Scar massage (once closed)"]} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ActionCard({ title, icon, items }) {
  return (
    <div className="bg-slate-900/60 border border-white/5 p-6 rounded-[2rem] hover:bg-slate-900 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">{title}</h4>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-300 flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}