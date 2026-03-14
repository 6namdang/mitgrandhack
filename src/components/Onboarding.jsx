import React, { useState } from "react";
import { useNavigate } from "react-router";
import WoundCamera from "./WoundCamera";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isPhotoOk, setIsPhotoOk] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    cause: "", // substance
    timeAgo: "",
    painLevel: 5,
    pcpEmail: ""
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    // Save to Supabase logic would go here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-500' : 'bg-slate-800'}`} />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h1 className="text-3xl font-bold">Patient Details</h1>
              <p className="text-slate-400 mt-2">Let's start with the basics.</p>
            </header>
            
            <div className="space-y-4">
              <Input label="Full Name" placeholder="John Doe" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" placeholder="25" value={formData.age} onChange={(v) => setFormData({...formData, age: v})} />
                <Input label="Cause of Burn" placeholder="Hot Water, Fire..." value={formData.cause} onChange={(v) => setFormData({...formData, cause: v})} />
              </div>
              <Input label="How long ago? (minutes/hours)" placeholder="20 minutes ago" value={formData.timeAgo} onChange={(v) => setFormData({...formData, timeAgo: v})} />
            </div>

            <button onClick={nextStep} disabled={!formData.name} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-2xl font-bold transition-all mt-8">
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Clinical Data & Photo */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h1 className="text-3xl font-bold">Wound Assessment</h1>
              <p className="text-slate-400 mt-2">Capture a clear photo of the area.</p>
            </header>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pain Level: {formData.painLevel}/10</label>
              <input 
                type="range" min="1" max="10" 
                value={formData.painLevel} 
                onChange={(e) => setFormData({...formData, painLevel: e.target.value})}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
              />
            </div>

            <WoundCamera onImageVerified={setIsPhotoOk} />

            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 bg-slate-800 py-4 rounded-2xl font-bold">Back</button>
              <button 
                onClick={nextStep} 
                disabled={!isPhotoOk} 
                className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20"
              >
                Verify & Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Care Team Integration */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h1 className="text-3xl font-bold">Connect Care Team</h1>
              <p className="text-slate-400 mt-2">Enter your Primary Care Physician's email to sync reports.</p>
            </header>

            <Input label="Physician Email" type="email" placeholder="doctor@hospital.com" value={formData.pcpEmail} onChange={(v) => setFormData({...formData, pcpEmail: v})} />
            
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-sm text-emerald-400 font-medium">HIPAA Secure: All data is encrypted and shared only with verified providers.</p>
            </div>

            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 bg-slate-800 py-4 rounded-2xl font-bold">Back</button>
              <button onClick={handleSubmit} className="flex-[2] bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold">Complete Setup</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Reusable UI Component
function Input({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
}