import { useRef, useState, useCallback, useEffect } from 'react';

const BODY_REGIONS = [
  'Right forearm', 'Left forearm', 'Right upper arm', 'Left upper arm',
  'Right shoulder', 'Left shoulder', 'Chest', 'Abdomen', 'Back',
  'Right thigh', 'Left thigh', 'Right lower leg', 'Left lower leg',
  'Head / Face', 'Hands', 'Feet',
];

export default function BurnCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [mode, setMode] = useState('idle'); // idle | camera | preview | uploading
  const [facingMode, setFacingMode] = useState('environment');
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);
  const [region, setRegion] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [hasMultipleCams, setHasMultipleCams] = useState(false);

  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const cams = devices.filter(d => d.kind === 'videoinput');
        setHasMultipleCams(cams.length > 1);
      });
    }
  }, []);

  useEffect(() => {
    if (mode === 'camera' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(console.error);
    }
  }, [mode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async (facing = facingMode) => {
    setError(null);
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      setMode('camera');
    } catch (err) {
      setError("Camera access denied or unavailable.");
    }
  }, [facingMode, stopCamera]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(dataUrl);

    canvas.toBlob(blob => {
      setCapturedFile(new File([blob], `burn-${Date.now()}.jpg`, { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.95);

    stopCamera();
    setMode('preview');
  }, [facingMode, stopCamera]);

  const reset = () => {
    stopCamera();
    setCapturedImage(null);
    setRegion('');
    setNotes('');
    setMode('idle');
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      <canvas ref={canvasRef} className="hidden" />

      {/* --- IDLE STATE --- */}
      {mode === 'idle' && (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Wound Capture</h3>
            <p className="text-slate-400 text-sm mt-2">Position the wound in the center of the frame under bright lighting.</p>
          </div>
          {error && <div className="text-red-400 text-sm bg-red-400/10 py-2 px-4 rounded-lg">{error}</div>}
          <button 
            onClick={() => startCamera()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-medium transition-all active:scale-95 shadow-lg shadow-blue-600/20"
          >
            Open Camera
          </button>
        </div>
      )}

      {/* --- CAMERA FEED --- */}
      {mode === 'camera' && (
        <div className="relative h-full w-full">
          <video 
            ref={videoRef} 
            className={`h-full w-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`} 
            playsInline muted autoPlay 
          />
          
          {/* Scanning Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-0 right-0 px-8 flex items-center justify-between">
            <button onClick={reset} className="p-4 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <button 
              onClick={capturePhoto} 
              className="w-20 h-20 bg-white rounded-full border-4 border-slate-300 shadow-xl active:scale-90 transition-transform p-1"
            >
              <div className="w-full h-full rounded-full border-2 border-slate-900" />
            </button>
            {hasMultipleCams ? (
              <button onClick={() => {
                const n = facingMode === 'environment' ? 'user' : 'environment';
                setFacingMode(n); startCamera(n);
              }} className="p-4 bg-black/40 backdrop-blur-md rounded-full text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </button>
            ) : <div className="w-14" />}
          </div>
        </div>
      )}

      {/* --- PREVIEW & METADATA --- */}
      {(mode === 'preview' || mode === 'uploading') && (
        <div className="h-full flex flex-col bg-slate-900">
          <div className="relative h-1/2">
            <img src={capturedImage} className="h-full w-full object-cover" alt="Captured" />
            {mode === 'uploading' && (
              <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="mt-4 text-white font-medium">Analyzing Wound...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Body Region</label>
              <select 
                value={region} 
                onChange={e => setRegion(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">Select location...</option>
                {BODY_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Notes</label>
              <textarea 
                value={notes} 
                onChange={e => setNotes(e.target.value)}
                placeholder="Ex: Redness, pain level 4, visible blistering..."
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => startCamera()} 
                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-medium transition-all"
              >
                Retake
              </button>
              <button 
                disabled={!region || mode === 'uploading'}
                onClick={() => {
                  setMode('uploading');
                  setTimeout(() => onCapture({ image: capturedImage, file: capturedFile, region, notes }), 1500);
                }}
                className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                Start AI Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}