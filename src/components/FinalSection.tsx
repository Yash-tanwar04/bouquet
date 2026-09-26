import React from 'react';
import { TANNU_DATA } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Heart, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalSectionProps {
  onReturnToBouquet: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onReturnToBouquet }) => {
  const handleReturn = () => {
    sounds.playFlowerChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#f4a6b4', '#e28292', '#fbbf24', '#ffffff'],
    });
    onReturnToBouquet();
  };

  return (
    <section
      id="closing"
      className="relative min-h-[90vh] flex flex-col items-center justify-center py-24 px-4 sm:px-6 overflow-hidden text-center bg-gradient-to-b from-[#0a0d18] via-[#160d18] to-[#06070e]"
    >
      {/* Warm glowing window / candlelight atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-romance-rose/15 to-romance-candleAmber/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating gentle petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/5 text-2xl animate-float-slow">🌸</div>
        <div className="absolute bottom-1/3 right-1/4 text-xl animate-float-slow" style={{ animationDelay: '1.5s' }}>✨</div>
      </div>

      {/* Content Container */}
      <div className="max-w-xl mx-auto relative z-10 space-y-6">
        {/* Intimate Greeting */}
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-romance-roseSoft font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(224,122,139,0.5)]">
          {TANNU_DATA.finalPage.greeting}
        </h2>

        {/* Cinematic Letter Paragraphs */}
        <div className="space-y-4 font-serif text-lg sm:text-xl md:text-2xl font-light text-romance-cream/90 leading-relaxed px-2">
          <p>
            "{TANNU_DATA.finalPage.message1}"
          </p>
          <p className="text-romance-blush font-normal italic">
            "{TANNU_DATA.finalPage.message2}"
          </p>
          <p className="text-sm sm:text-base text-romance-cream/70 font-sans max-w-md mx-auto pt-2">
            I couldn't give you a birthday where I could physically be beside you. So I made you a little place where, for a few minutes, I could.
          </p>
        </div>

        {/* 29 September Birthday Wish */}
        <div className="py-4">
          <p className="font-script text-3xl sm:text-4xl md:text-5xl text-romance-candleGold font-bold tracking-wide">
            {TANNU_DATA.finalPage.wish}
          </p>
          <p className="font-sans text-xs tracking-widest text-romance-cream/50 uppercase mt-2">
            29 • 09 • Forever & Always
          </p>
        </div>

        {/* Return Button */}
        <div className="pt-4">
          <button
            onClick={handleReturn}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-romance-rose via-romance-dustyRose to-romance-rose hover:from-romance-dustyRose hover:to-romance-wine text-white font-sans text-sm tracking-wide shadow-[0_4px_25px_rgba(224,122,139,0.5)] hover:shadow-[0_6px_35px_rgba(224,122,139,0.8)] active:scale-95 transition-all duration-300"
          >
            <Heart size={16} className="fill-white text-white group-hover:scale-125 transition-transform" />
            <span>{TANNU_DATA.finalPage.buttonText}</span>
            <ArrowUp size={14} className="opacity-70 group-hover:-translate-y-1 transition-transform" />
          </button>

          <p className="font-script text-base text-romance-blush/70 mt-3">
            "{TANNU_DATA.finalPage.closing}"
          </p>
        </div>
      </div>
    </section>
  );
};
