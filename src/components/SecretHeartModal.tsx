import React, { useEffect, useState } from 'react';
import { TANNU_DATA } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Heart, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecretHeartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretHeartModal: React.FC<SecretHeartModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      sounds.playHeartbeat();
      sounds.playFlowerChime();
      setStep(1);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#e28292', '#fbbf24', '#fbcfe8', '#ffffff'],
      });

      const t1 = setTimeout(() => setStep(2), 1200);
      const t2 = setTimeout(() => setStep(3), 2600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Background glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-romance-rose/20 blur-3xl pointer-events-none animate-pulse" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="parchment-card deckled-paper relative w-full max-w-md p-6 sm:p-9 text-[#2b1810] shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-scaleUp rotate-[-0.5deg] text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#6d4c41] hover:text-black hover:bg-black/5"
        >
          <X size={18} />
        </button>

        {/* Secret Heart Icon */}
        <div className="relative inline-block mb-3">
          <Heart size={36} className="text-romance-wine fill-romance-rose mx-auto animate-bounce" />
          <Sparkles size={16} className="absolute -top-1 -right-2 text-romance-candleGold animate-spin-slow" />
        </div>

        {/* Step 1: Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4a1c27] mb-3">
          {TANNU_DATA.secretHeart.title}
        </h3>

        {/* Step 2: There wasn't supposed to be anything here */}
        <div className="space-y-4 min-h-[110px] flex flex-col items-center justify-center">
          {step >= 2 && (
            <p className="font-script text-xl sm:text-2xl text-[#5c3826] animate-fadeIn">
              "{TANNU_DATA.secretHeart.line1}"
            </p>
          )}

          {/* Step 3: Love confession */}
          {step >= 3 && (
            <p className="font-script text-2xl sm:text-3xl text-romance-wine font-bold animate-fadeIn leading-relaxed">
              "{TANNU_DATA.secretHeart.line2}"
            </p>
          )}
        </div>

        <div className="mt-6 pt-3 border-t border-[#a87f58]/30 flex items-center justify-between text-xs text-[#7a5840]">
          <span>Secret #29.09</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#4a1c27] text-white hover:bg-[#682435] text-xs font-sans"
          >
            Keep secret close ♡
          </button>
        </div>
      </div>
    </div>
  );
};
