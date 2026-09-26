import React, { useState } from 'react';
import { TANNU_DATA, MemoryPhoto } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Camera, Sparkles, Heart, RotateCw, X } from 'lucide-react';

export const MemoryBoxSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleOpenPhoto = (photo: MemoryPhoto) => {
    sounds.playPaperRustle();
    setActivePhoto(photo);
    setIsFlipped(false);
  };

  return (
    <section
      id="memories"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0a0d18] via-[#120d16] to-[#0d0f1c]"
    >
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-romance-rose/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2">
          <Camera size={12} className="text-romance-blush" />
          <span className="font-serif text-xs text-romance-blush tracking-widest uppercase">
            Keepsake Box
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          Our Little Memories ♡
        </h2>

        <p className="font-script text-xl sm:text-2xl text-romance-roseSoft mt-1">
          "A few moments I never want to forget"
        </p>

        <p className="font-serif italic text-xs sm:text-sm text-romance-candleGold/80 mt-1">
          "Some moments deserve to stay."
        </p>
      </div>

      {/* Memory Box Desk Display */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Keepsake Wooden Container Frame */}
        <div className="relative rounded-3xl p-5 sm:p-8 border border-[#5d4037]/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-gradient-to-br from-[#1a1114] via-[#24171d] to-[#120e14]">
          {/* Subtle wooden texture & dried petals decoration */}
          <div className="text-center mb-6">
            <span className="font-script text-lg sm:text-xl text-romance-blush/80">
              Tap any photo to look closer and flip to read the back ♡
            </span>
          </div>

          {/* Polaroids Grid / Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 items-center justify-center">
            {TANNU_DATA.memories.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handleOpenPhoto(photo)}
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                }}
                className="interactive-card polaroid-frame cursor-pointer transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-20 text-center"
              >
                {/* Photo image */}
                <div className="aspect-[4/4] bg-neutral-900 overflow-hidden rounded-sm relative">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/rose_closeup.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="mt-3 px-1">
                  <p className="font-script text-lg sm:text-xl text-[#2b1810] font-bold leading-tight">
                    {photo.caption}
                  </p>
                  <p className="font-sans text-[10px] text-[#8d6e53] mt-0.5">
                    {photo.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sweet quote card placed in the memory box */}
          <div className="mt-8 text-center pt-4 border-t border-white/10">
            <p className="font-script text-xl sm:text-2xl text-romance-candleGold">
              "I wish we had more pictures together. ♡ Soon, we won't need to count miles."
            </p>
          </div>
        </div>
      </div>

      {/* Polaroid Detail Modal (Flippable) */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm flex flex-col items-center"
          >
            {/* Flip toggle button */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="mb-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-sans transition-colors"
            >
              <RotateCw size={13} className={isFlipped ? 'rotate-180 transition-transform' : ''} />
              <span>{isFlipped ? 'Show Photo Front' : 'Flip to Read Back'}</span>
            </button>

            {/* The Polaroid Card */}
            <div
              className={`w-full transition-all duration-500 transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {!isFlipped ? (
                /* Front Side */
                <div className="polaroid-frame rounded-sm text-center shadow-2xl">
                  <div className="aspect-[4/4] bg-neutral-900 rounded-sm overflow-hidden mb-3">
                    <img
                      src={activePhoto.image}
                      alt={activePhoto.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-script text-2xl text-[#2b1810] font-bold">
                    {activePhoto.caption}
                  </h4>
                  <p className="font-sans text-xs text-[#8d6e53] mt-1">
                    {activePhoto.date}
                  </p>
                </div>
              ) : (
                /* Back Side */
                <div className="parchment-card deckled-paper p-6 text-[#2b1810] shadow-2xl rounded-sm min-h-[340px] flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#a87f58]/30 pb-2 mb-3">
                      <span className="font-serif text-xs text-[#7a482b] tracking-wider uppercase">
                        Memory Note
                      </span>
                      <span className="font-sans text-xs text-[#8d6e53]">
                        {activePhoto.date}
                      </span>
                    </div>

                    <h4 className="font-script text-2xl text-[#4a1c27] font-bold mb-2">
                      {activePhoto.caption}
                    </h4>

                    <p className="font-script text-xl leading-relaxed text-[#2c131a]">
                      "{activePhoto.noteBack}"
                    </p>
                  </div>

                  <div className="border-t border-[#a87f58]/20 pt-3 text-right">
                    <span className="font-script text-lg text-romance-wine">
                      For Tannu ♡
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setActivePhoto(null)}
              className="mt-4 text-xs font-sans text-white/60 hover:text-white"
            >
              Tap to close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
