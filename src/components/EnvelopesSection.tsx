import React, { useState } from 'react';
import { TANNU_DATA, EnvelopeLetter } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Heart, Mail, MailOpen, X } from 'lucide-react';

export const EnvelopesSection: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<EnvelopeLetter | null>(null);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<number[]>([]);

  const handleOpenEnvelope = (letter: EnvelopeLetter) => {
    sounds.playPaperRustle();
    sounds.playHeartbeat();
    setActiveLetter(letter);
    if (!openedEnvelopes.includes(letter.id)) {
      setOpenedEnvelopes((prev) => [...prev, letter.id]);
    }
  };

  return (
    <section
      id="letters"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-transparent"
    >
      {/* Ambient candle aura */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-romance-rose/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2">
          <Mail size={12} className="text-romance-roseSoft" />
          <span className="font-serif text-xs text-romance-blush tracking-widest uppercase">
            Wax-Sealed Letters
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          Messages I Never Said Properly ♡
        </h2>

        <p className="font-script text-xl sm:text-2xl text-romance-roseSoft mt-1">
          "Open a letter whenever you need a little reminder..."
        </p>

        <p className="font-sans text-xs text-romance-cream/60 max-w-md mx-auto mt-2">
          Keep these letters close. Whenever a day feels hard, lonely, or ordinary, break the seal on the one you need most.
        </p>
      </div>

      {/* Envelopes Grid (2 cols mobile, 3 cols tablet/desktop matching Panel 6) */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 relative z-10">
        {TANNU_DATA.envelopes.map((env) => {
          const isOpened = openedEnvelopes.includes(env.id);

          return (
            <div
              key={env.id}
              onClick={() => handleOpenEnvelope(env)}
              className="interactive-card group relative cursor-pointer"
            >
              {/* Envelope Body */}
              <div className="relative aspect-[16/11] rounded-xl bg-gradient-to-br from-[#f8ede3] via-[#eddccb] to-[#dfc9b3] border border-[#d2b89d] shadow-[0_12px_30px_rgba(0,0,0,0.5)] p-4 flex flex-col justify-between overflow-hidden transform group-hover:-translate-y-1.5 transition-all duration-300">
                {/* Envelope Flap Lines (CSS craft envelope folds) */}
                <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#cca785]/40 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-[#ebd8c5]/70 pointer-events-none" />

                {/* Date Tag */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-sans text-[#7a5840] tracking-wider uppercase">
                    {env.dateTag}
                  </span>
                  {isOpened && (
                    <span className="text-[10px] font-sans text-romance-wine flex items-center gap-1 font-semibold">
                      <MailOpen size={11} />
                      <span>Opened</span>
                    </span>
                  )}
                </div>

                {/* Center Wax Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div
                    className="wax-seal w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
                    style={{
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
                    }}
                  >
                    <Heart size={16} className="text-[#ffebee] fill-[#ffebee] drop-shadow-sm" />
                  </div>
                </div>

                {/* Envelope Label */}
                <div className="relative z-10 text-center mt-auto pt-6">
                  <h3 className="font-script text-xl sm:text-2xl text-[#3b1d11] font-bold tracking-wide group-hover:text-romance-wine transition-colors">
                    {env.label}
                  </h3>
                  <p className="text-[10px] font-sans text-[#8d6e53] mt-0.5">
                    {isOpened ? 'Tap to re-read ♡' : 'Tap to break seal ♡'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Letter Reading Modal */}
      {activeLetter && (
        <div
          onClick={() => setActiveLetter(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="parchment-card deckled-paper relative w-full max-w-lg p-6 sm:p-9 text-[#2b1810] shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-scaleUp rotate-[-0.3deg]"
          >
            <button
              onClick={() => setActiveLetter(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#6d4c41] hover:text-black hover:bg-black/5"
            >
              <X size={18} />
            </button>

            {/* Letter Header */}
            <div className="border-b border-[#a87f58]/30 pb-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-serif uppercase tracking-widest text-[#7a482b]">
                <Heart size={12} className="text-romance-rose fill-romance-rose" />
                <span>To my Tannu</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#4a1c27] mt-1">
                {activeLetter.label}
              </h3>
            </div>

            {/* Letter Body Text */}
            <div className="py-2">
              <p className="font-script text-xl sm:text-2xl md:text-[23px] leading-relaxed text-[#2c131a] whitespace-pre-line">
                "{activeLetter.message}"
              </p>
            </div>

            {/* Letter Sign-off */}
            <div className="border-t border-[#a87f58]/20 pt-4 mt-4 flex items-center justify-between">
              <span className="font-script text-lg text-romance-wine font-semibold">
                Yours, always & forever ♡
              </span>
              <button
                onClick={() => setActiveLetter(null)}
                className="px-4 py-1.5 rounded-full bg-[#4a1c27] text-white hover:bg-[#682435] text-xs font-sans transition-colors"
              >
                Fold letter
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
