import React from 'react';
import { TANNU_DATA, FlowerItem } from '../data/tannuData';
import { Sparkles, Heart } from 'lucide-react';

interface GardenSectionProps {
  openedFlowerIds: number[];
  onSelectFlower: (flower: FlowerItem) => void;
}

export const GardenSection: React.FC<GardenSectionProps> = ({
  openedFlowerIds,
  onSelectFlower,
}) => {
  return (
    <section
      id="garden"
      className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden bg-transparent"
    >
      {/* Soft atmospheric background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-romance-rose/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2 shadow-sm">
          <Sparkles size={12} className="text-romance-candleGold" />
          <span className="font-serif text-xs text-romance-blush tracking-widest uppercase">
            Ghibli Garden • Curated For Tannu
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          A Garden of Reasons ♡
        </h2>

        <p className="font-script text-xl sm:text-2xl text-romance-roseSoft mt-1">
          "Each flower is a little thought Yash has had about you"
        </p>

        <p className="font-sans text-xs text-romance-cream/60 max-w-md mx-auto mt-2 leading-relaxed">
          Twelve blooms painted with Studio Ghibli warmth. Tap any flower to unveil Yash's personal note written just for you.
        </p>
      </div>

      {/* 12 Flowers Grid (2 cols on small mobile, 3 cols tablet, 4 cols desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5 relative z-10">
        {TANNU_DATA.flowers.map((fl) => {
          const isOpened = openedFlowerIds.includes(fl.id);

          return (
            <button
              key={fl.id}
              onClick={() => onSelectFlower(fl)}
              className="interactive-card group relative flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-romance-rose/40 transition-all duration-300 transform hover:-translate-y-1 text-center shadow-lg"
            >
              {/* Status Badge */}
              <div className="absolute top-2 right-2 z-10">
                {isOpened ? (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-romance-rose/30 border border-romance-rose text-romance-roseSoft text-[10px]">
                    ♥
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-romance-candleGold/60 animate-ping inline-block" />
                )}
              </div>

              {/* Studio Ghibli Flower Illustration */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden mb-3 border border-white/10 bg-black/20 shadow-inner flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:scale-105">
                <div
                  className="absolute inset-0 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity"
                  style={{ backgroundColor: fl.color }}
                />
                <img
                  src={fl.ghibliImage}
                  alt={fl.alt}
                  className="relative w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                  onError={(e) => {
                    // Fallback to fl.image if needed
                    (e.target as HTMLImageElement).src = fl.image;
                  }}
                />
              </div>

              {/* Category Name */}
              <h3 className="font-serif text-sm sm:text-base text-romance-cream group-hover:text-romance-roseSoft transition-colors line-clamp-1 font-medium">
                {fl.category}
              </h3>

              {/* Intimate Subtitle */}
              <p className="font-script text-xs sm:text-sm text-romance-candleGold/90 mt-0.5 line-clamp-1">
                "{fl.noteTitle}"
              </p>

              {/* Micro call to action */}
              <span className="mt-2 text-[10px] font-sans text-romance-blush/60 group-hover:text-romance-candleGold transition-colors flex items-center gap-1">
                <Heart size={9} className="fill-current text-romance-rose" />
                <span>{isOpened ? 'Read Yash\'s note ✓' : 'Open note ♡'}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
