import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence:
    // 0ms: Heart appears
    // 600ms: Text "for my Tannu ♡" fades in
    // 1400ms: Petals & glow bloom
    // 2200ms: Smooth fade-out starts
    // 2700ms: Completed
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => setFadingOut(true), 2300);
    const t4 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      onClick={() => {
        setFadingOut(true);
        setTimeout(onComplete, 400);
      }}
      className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#070912] transition-opacity duration-700 ease-out cursor-pointer ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 45%, #2a0f1b 0%, #0d0e1b 60%, #06070d 100%)',
      }}
    >
      {/* Background warm candlelight glow */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-romance-rose/15 blur-3xl animate-pulse" />

      {/* Floating loading petals */}
      {step >= 2 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 text-romance-roseSoft/40 text-xl animate-float-slow">🌸</div>
          <div className="absolute top-1/3 right-1/4 text-romance-blush/40 text-lg animate-float-slow" style={{ animationDelay: '1.2s' }}>✨</div>
          <div className="absolute bottom-1/3 left-1/3 text-romance-roseSoft/30 text-2xl animate-float-slow" style={{ animationDelay: '0.6s' }}>🌸</div>
        </div>
      )}

      {/* Pulsing heart */}
      <div className="relative mb-6">
        <div className="text-4xl md:text-5xl text-romance-rose animate-bounce drop-shadow-[0_0_20px_rgba(224,122,139,0.7)] select-none">
          ♥
        </div>
        <div className="absolute inset-0 rounded-full bg-romance-rose/25 blur-md animate-ping" />
      </div>

      {/* Subtitle */}
      <div
        className={`transition-all duration-700 transform ${
          step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h2 className="font-serif text-2xl md:text-3xl text-romance-blush tracking-wider font-light text-center">
          for my <span className="font-script text-3xl md:text-4xl text-romance-roseSoft font-normal">Tannu</span> ♡
        </h2>
        <p className="font-sans text-xs tracking-widest text-romance-cream/50 text-center mt-2 uppercase">
          Creating a little universe...
        </p>
      </div>

      {/* Skip button for impatience */}
      <div className="absolute bottom-8 text-[11px] tracking-widest text-romance-cream/30 uppercase font-sans">
        Tap anywhere to enter
      </div>
    </div>
  );
};
