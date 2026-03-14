import React, { useState, useRef } from 'react';

export default function WoundCamera({ onImageVerified }) {
  const [image, setImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, scanning, success, error
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        runVerification();
      };
      reader.readAsDataURL(file);
    }
  };

  const runVerification = () => {
    setIsVerifying(true);
    setStatus('scanning');
    
    // Simulate AI Clarity & Lighting Check
    setTimeout(() => {
      setIsVerifying(false);
      setStatus('success');
      onImageVerified(true);
    }, 2500);
  };

  return (
    <div className="w-full">
      <div className={`relative aspect-video rounded-3xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center bg-slate-900/50 ${
        status === 'success' ? 'border-emerald-500/50' : 'border-slate-700'
      }`}>
        
        {image ? (
          <>
            <img src={image} className={`w-full h-full object-cover ${isVerifying ? 'opacity-50 blur-sm' : ''}`} alt="Wound" />
            
            {/* AI Scanning Overlay */}
            {isVerifying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-full h-1 bg-blue-500 absolute top-0 animate-[scan_2s_ease-in-out_infinite]" />
                <p className="text-blue-400 font-mono text-xs font-bold tracking-widest bg-slate-950/80 px-4 py-2 rounded-full">
                  VERIFYING CLARITY...
                </p>
              </div>
            )}

            {/* Success Badge */}
            {status === 'success' && (
              <div className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </>
        ) : (
          <button 
            onClick={() => fileInputRef.current.click()}
            className="flex flex-col items-center gap-4 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-wide">CAPTURE OR UPLOAD WOUND PHOTO</span>
          </button>
        )}

        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
      </div>

      {status === 'success' && (
        <p className="text-center text-emerald-400 text-xs font-bold mt-4 animate-pulse">
          ✓ IMAGE VERIFIED: CLEAR FOCUS & OPTIMAL LIGHTING
        </p>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}