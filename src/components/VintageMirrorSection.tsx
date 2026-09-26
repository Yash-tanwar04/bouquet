import React, { useState } from 'react';
import { TANNU_DATA } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Heart } from 'lucide-react';

export const VintageMirrorSection: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [activeWordsCount, setActiveWordsCount] = useState(0);

  const handleMirrorTap = () => {
    if (revealed) return;
    sounds.playFlowerChime();
    setRevealed(true);

    // Stagger word reveals
    TANNU_DATA.mirrorWords.forEach((_, idx) => {
      setTimeout(() => {
        setActiveWordsCount((prev) => Math.max(prev, idx + 1));
      }, (idx + 1) * 260);
    });
  };

  return (
    <section
      id="mirror"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(13, 9, 20, 0.94), rgba(24, 12, 22, 0.88), rgba(10, 13, 24, 0.96)), url('/assets/images/vintage_mirror.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background candle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-romance-candleAmber/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2">
          <Sparkles size={12} className="text-romance-candleGold" />
          <span className="font-serif text-xs text-romance-blush tracking-widest uppercase">
            A Glimpse Through My Eyes
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          The Vintage Mirror ♡
        </h2>

        <p className="font-script text-xl sm:text-2xl text-romance-roseSoft mt-1">
          {revealed ? 'What I see every single day' : 'Touch the mirror to see what I see...'}
        </p>
      </div>

      {/* Mirror Container */}
      <div className="max-w-md mx-auto relative z-10">
        <div
          onClick={handleMirrorTap}
          className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl p-4 sm:p-6 overflow-hidden cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-2 border-[#d4af37]/60 group transition-all duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 45%, #251624 0%, #160e18 60%, #0c0810 100%)',
          }}
        >
          {/* Subtle ornate gold border shine */}
          <div className="absolute inset-0 border-4 border-[#b8860b]/30 rounded-3xl pointer-events-none" />
          <div className="absolute inset-2 border border-[#ffd700]/20 rounded-2xl pointer-events-none" />

          {/* Glowing Aura inside mirror */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              revealed ? 'opacity-100' : 'opacity-30 group-hover:opacity-50'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, rgba(224, 122, 139, 0.1) 50%, transparent 80%)',
            }}
          />

          {!revealed ? (
            /* Tap Prompt when unrevealed */
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 select-none">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-romance-candleGold/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(251,191,36,0.4)]">
                <Sparkles size={24} className="text-romance-candleGold animate-pulse" />
              </div>
              <p className="font-serif text-lg text-romance-cream/90">
                Touch the mirror
              </p>
              <p className="font-script text-base text-romance-blush/70 mt-1">
                (A secret waiting for Tannu)
              </p>
            </div>
          ) : (
            /* Words & Quote Revealed */
            <div className="relative h-full flex flex-col justify-between py-2 sm:py-4 select-none">
              {/* Floating Affirmation Words */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs mx-auto">
                {TANNU_DATA.mirrorWords.map((word, idx) => (
                  <span
                    key={word}
                    className={`font-serif italic text-xs sm:text-sm px-2.5 py-1 rounded-full border transition-all duration-500 transform ${
                      idx < activeWordsCount
                        ? 'opacity-100 translate-y-0 scale-100 bg-romance-wine/70 border-romance-candleGold/40 text-romance-cream shadow-md'
                        : 'opacity-0 translate-y-4 scale-90'
                    }`}
                  >
                    ✨ {word}
                  </span>
                ))}
              </div>

              {/* The deeply heartfelt quote */}
              <div
                className={`text-center my-auto px-2 transition-all duration-1000 ${
                  activeWordsCount >= TANNU_DATA.mirrorWords.length
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="parchment-card deckled-paper p-5 sm:p-6 shadow-2xl text-[#2b1810] rotate-[-0.5deg]">
                  <p className="font-script text-xl sm:text-2xl text-[#3b171f] font-semibold leading-relaxed mb-3">
                    "{TANNU_DATA.mirrorQuote.line1}"
                  </p>
                  <p className="font-script text-2xl sm:text-3xl text-romance-wine font-bold leading-relaxed">
                    "{TANNU_DATA.mirrorQuote.line2}"
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#7a5840] font-sans">
                    <Heart size={10} className="fill-romance-rose text-romance-rose" />
                    <span>Always the most beautiful to me</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-[11px] font-sans text-white/40">
                You are loved beyond measure.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
