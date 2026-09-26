import React, { useState, useCallback, useRef } from 'react';
import { TANNU_DATA, FlowerItem } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { BouquetCanvas } from '../three/BouquetCanvas';
import { Sparkles, Wind, Heart, ChevronDown } from 'lucide-react';

interface BouquetSectionProps {
  openedFlowerIds: number[];
  onSelectFlower:  (flower: FlowerItem) => void;
  onSecretHeartFound: () => void;
  onBreezeTrigger: () => void;
  windActive: boolean;
}

export const BouquetSection: React.FC<BouquetSectionProps> = ({
  openedFlowerIds,
  onSelectFlower,
  onSecretHeartFound,
  onBreezeTrigger,
  windActive,
}) => {
  const tagClicksRef   = useRef(0);
  const [windDir, setWindDir] = useState({ x: 0.6, z: 0.4 });

  // Derived wind strength for Three.js (0 = idle gentle, 1 = full breeze)
  const windStrength = windActive ? 1.0 : 0.08;

  const totalFlowers   = TANNU_DATA.flowers.length;
  const discoveredCount = openedFlowerIds.length;
  const allDiscovered  = discoveredCount === totalFlowers;

  // Called by BouquetCanvas when a flower is raycasted
  const handleFlowerClick = useCallback((flowerId: number) => {
    const flower = TANNU_DATA.flowers.find((f) => f.id === flowerId);
    if (flower) {
      sounds.playFlowerChime();
      onSelectFlower(flower);
    }
  }, [onSelectFlower]);

  // Easter-egg tag: tapping the tag area near the canvas bottom
  const handleTagClick = () => {
    sounds.playHeartbeat();
    tagClicksRef.current += 1;
    if (tagClicksRef.current >= 3) {
      onSecretHeartFound();
      tagClicksRef.current = 0;
    }
  };

  // Trigger breeze with a random natural wind direction each time
  const handleBreezeTrigger = () => {
    const angle = Math.random() * Math.PI * 2;
    setWindDir({ x: Math.cos(angle), z: Math.sin(angle) });
    onBreezeTrigger();
  };

  return (
    <section
      id="bouquet"
      className="relative min-h-[100svh] flex flex-col items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, #200f1c 0%, #0f0e1e 55%, #060810 100%)',
      }}
    >
      {/* Ambient candle glow blobs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-romance-candleAmber/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-romance-rose/12 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-romance-rose/6 blur-[80px] pointer-events-none" />

      {/* ── Header ── */}
      <div className="w-full max-w-xl text-center z-20 pt-6 px-4 flex-shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2 shadow-sm">
          <Sparkles size={12} className="text-romance-candleGold animate-pulse" />
          <span className="font-script text-base sm:text-lg text-romance-blush tracking-wider">
            {TANNU_DATA.header.greeting}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-light text-romance-cream tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {TANNU_DATA.header.title}
        </h1>

        <p className="font-serif italic text-xs sm:text-sm text-romance-blush/80 mt-1">
          "I made you a little place."
        </p>

        <p className="font-sans text-[11px] text-romance-cream/55 mt-1 max-w-xs mx-auto px-2 leading-relaxed">
          {TANNU_DATA.header.subtitle}
        </p>

        {/* Controls row */}
        <div className="mt-3 flex items-center justify-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-sans text-romance-candleGold bg-black/40 px-3 py-1 rounded-full border border-romance-candleGold/30 backdrop-blur-sm">
            <Heart size={11} className="fill-romance-rose text-romance-rose" />
            <span>
              {discoveredCount} / {totalFlowers} flowers discovered
            </span>
          </div>

          <button
            onClick={handleBreezeTrigger}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all duration-300 ${
              windActive
                ? 'bg-romance-rose/30 border-romance-rose text-white animate-pulse'
                : 'bg-white/5 border-white/15 text-romance-cream/70 hover:text-white hover:bg-white/10'
            }`}
            title="Trigger gentle breeze — or shake your phone!"
          >
            <Wind size={12} />
            <span>Breeze</span>
          </button>
        </div>

        <div className="mt-2">
          <span className="font-script text-xl sm:text-2xl text-romance-roseSoft tracking-wide animate-pulse select-none">
            Touch a flower ♡
          </span>
        </div>

        {/* Mobile hint */}
        <p className="font-sans text-[10px] text-romance-cream/35 mt-1">
          Shake your phone for a windy surprise ♡
        </p>
      </div>

      {/* ── 3D Bouquet Canvas ── */}
      <div className="relative w-full max-w-3xl flex-1 min-h-[66svh] sm:min-h-[74vh] z-20 px-2 sm:px-4 mt-2 mb-2">
        {/* Canvas fills the container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          <BouquetCanvas
            windStrength={windStrength}
            windDirX={windDir.x}
            windDirZ={windDir.z}
            onFlowerClick={handleFlowerClick}
            openedFlowerIds={openedFlowerIds}
            isBreezing={windActive}
          />

          {/* Atmospheric gradient at top (scene bleeds into header) */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#140c18] to-transparent pointer-events-none" />

          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07060e]/90 to-transparent pointer-events-none" />

          {/* Tag easter egg — overlaid at bottom of canvas */}
          <button
            onClick={handleTagClick}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 rotate-[-5deg] bg-[#e6d0b5] hover:bg-[#faebd7] text-[#4a2e1d] font-script text-sm sm:text-base px-2 py-0.5 rounded shadow border border-[#c4a480]/80 cursor-pointer hover:scale-110 active:scale-95 transition-all z-10"
            title="A secret little tag (tap 3×)"
          >
            29 Sept ♡
          </button>
        </div>
      </div>

      {/* ── Bottom section ── */}
      <div className="w-full max-w-sm text-center z-20 pb-8 px-4 flex-shrink-0">
        {allDiscovered ? (
          <div className="bg-gradient-to-r from-romance-wine/80 via-romance-burgundy/90 to-romance-wine/80 border border-romance-candleGold/50 rounded-2xl p-3 shadow-xl backdrop-blur-md">
            <p className="font-script text-xl sm:text-2xl text-romance-candleGold">
              You found them all ♡
            </p>
            <p className="font-sans text-xs text-romance-blush/90 mt-0.5">
              "But I still have more for you."
            </p>
            <a
              href="#garden"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-sans text-white bg-romance-rose hover:bg-romance-dustyRose px-4 py-1.5 rounded-full shadow-md transition-colors"
            >
              <span>Continue to the Garden</span>
              <ChevronDown size={14} />
            </a>
          </div>
        ) : (
          <a
            href="#garden"
            className="inline-flex items-center gap-1 text-xs font-sans text-romance-blush/60 hover:text-white transition-colors"
          >
            <span>Or see all flowers in the Garden</span>
            <ChevronDown size={14} className="animate-bounce" />
          </a>
        )}
      </div>
    </section>
  );
};
