import React, { useEffect } from 'react';
import { FlowerItem } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { ChevronLeft, ChevronRight, X, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlowerModalProps {
  flower: FlowerItem | null;
  flowers: FlowerItem[];
  openedIds: number[];
  onClose: () => void;
  onSelectFlower: (flower: FlowerItem) => void;
}

export const FlowerModal: React.FC<FlowerModalProps> = ({
  flower,
  flowers,
  openedIds,
  onClose,
  onSelectFlower,
}) => {
  if (!flower) return null;

  const currentIndex = flowers.findIndex((f) => f.id === flower.id);
  const total = flowers.length;
  const discoveredCount = openedIds.length;
  const isAllDiscovered = discoveredCount === total;

  useEffect(() => {
    sounds.playPaperRustle();
    sounds.playFlowerChime();

    // Trigger subtle gentle confetti if all 12 flowers just unlocked
    if (isAllDiscovered) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f4a6b4', '#e28292', '#fde047', '#fff'],
      });
    }
  }, [flower.id, isAllDiscovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + total) % total;
    onSelectFlower(flowers[prevIdx]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % total;
    onSelectFlower(flowers[nextIdx]);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Background radial candle glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-romance-rose/15 blur-3xl pointer-events-none" />

      {/* Main Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#1c131a] via-[#14121f] to-[#0d0f1a] border border-romance-rose/25 rounded-2xl p-4 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.8)] text-romance-cream transition-all duration-300"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-romance-blush/80 hover:text-romance-cream px-2 py-1 rounded-full bg-white/5 border border-white/10 transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Back to Bouquet</span>
          </button>

          {/* Progress counter */}
          <div className="flex items-center gap-2 text-xs font-serif tracking-wider text-romance-candleGold">
            <Sparkles size={13} className="text-romance-candleGold animate-pulse" />
            <span>
              {currentIndex + 1} / {total} discovered
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content container */}
        <div className="mt-4 flex flex-col md:flex-row items-center gap-5">
          {/* Flower Visual */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex-shrink-0 flex items-center justify-center">
            {/* Soft blooming glow ring */}
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-60 animate-pulse"
              style={{ backgroundColor: flower.color }}
            />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 p-2 flex items-center justify-center">
              <img
                src={flower.ghibliImage || flower.image}
                alt={flower.alt}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = flower.image || '/assets/images/rose_closeup.jpg';
                }}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-2 bg-romance-wine/90 backdrop-blur-sm border border-romance-rose/40 px-3 py-0.5 rounded-full text-[11px] font-sans text-romance-blush shadow-lg flex items-center gap-1">
              <Heart size={10} className="fill-romance-rose text-romance-rose" />
              <span>{flower.name}</span>
            </div>
          </div>

          {/* Handwritten Parchment Note */}
          <div className="w-full flex-1">
            <div className="parchment-card deckled-paper p-5 sm:p-6 text-romance-burgundy shadow-2xl relative rotate-[-0.5deg]">
              {/* Botanical sketch accent header */}
              <div className="flex items-center justify-between border-b border-[#a87f58]/30 pb-2 mb-2">
                <span className="font-script text-2xl sm:text-3xl font-bold text-[#4a1c27]">
                  {flower.category} ♡
                </span>
                <span className="text-[10px] font-sans tracking-widest text-[#7a5840] uppercase">
                  No. {flower.id < 10 ? `0${flower.id}` : flower.id}
                </span>
              </div>

              {/* Note Title */}
              <h4 className="font-serif italic text-sm sm:text-base text-[#7c2d12] font-semibold mb-2">
                "{flower.noteTitle}"
              </h4>

              {/* Personal handwritten note text */}
              <p className="font-script text-lg sm:text-xl md:text-[21px] leading-relaxed text-[#2c131a] mb-4">
                "{flower.noteText}"
              </p>

              {/* Footer with botanical meaning */}
              <div className="border-t border-[#a87f58]/20 pt-2 flex items-center justify-between text-[11px] font-sans text-[#6e4e37]">
                <span className="italic">{flower.botanicalNote}</span>
                <span className="font-script text-base text-romance-wine font-semibold">From Yash to Tannu ♡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation controls */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-sans text-romance-blush hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {isAllDiscovered ? (
            <div className="text-center">
              <div className="font-script text-base text-romance-candleGold">
                You found them all ♡
              </div>
              <div className="text-[11px] font-sans text-white/60">
                Scroll down for your surprises
              </div>
            </div>
          ) : (
            <div className="text-[11px] font-sans text-white/50 text-center">
              Tap next to see more reasons
            </div>
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-sans text-romance-blush hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
