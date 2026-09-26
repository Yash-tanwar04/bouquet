import React, { useState } from 'react';
import { TANNU_DATA, LittleThing } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Heart, X } from 'lucide-react';

export const LittleThingsSection: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<LittleThing | null>(null);
  const [openedNotes, setOpenedNotes] = useState<number[]>([]);

  const handleOpenNote = (note: LittleThing) => {
    sounds.playPaperRustle();
    setSelectedNote(note);
    if (!openedNotes.includes(note.id)) {
      setOpenedNotes((prev) => [...prev, note.id]);
    }
  };

  return (
    <section
      id="little-things"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-transparent"
    >
      {/* Glow aura */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-romance-candleAmber/15 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-romance-candleGold/30 backdrop-blur-md mb-2">
          <Sparkles size={12} className="text-romance-candleGold" />
          <span className="font-serif text-xs text-romance-candleGold tracking-widest uppercase">
            29.09 Special
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          29 Little Things About You ♡
        </h2>

        <p className="font-script text-xl sm:text-2xl text-romance-candleGold mt-1">
          "29 reasons why you're so special, because 29/09 is a day to celebrate you in every way"
        </p>

        {/* Counter */}
        <div className="mt-3 inline-flex items-center gap-2 text-xs font-sans text-romance-blush bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10">
          <Heart size={12} className="fill-romance-rose text-romance-rose" />
          <span>
            {openedNotes.length} / 29 notes uncovered
          </span>
        </div>
      </div>

      {/* Scattered Paper Notes Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
        {TANNU_DATA.littleThings.map((thing, index) => {
          const isOpened = openedNotes.includes(thing.id);
          const isSpecial29 = thing.id === 29;

          // Generate slight natural organic rotation angle (-2.5 to +2.5 deg)
          const rotationAngle = ((index * 7) % 7) - 3;

          return (
            <button
              key={thing.id}
              onClick={() => handleOpenNote(thing)}
              style={{
                transform: `rotate(${rotationAngle}deg)`,
              }}
              className={`interactive-card group relative p-3 sm:p-4 text-left transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-20 ${
                isSpecial29
                  ? 'col-span-2 sm:col-span-2 md:col-span-2 bg-gradient-to-br from-[#fef3c7] via-[#fde68a] to-[#f59e0b]/40 text-[#451a03] border-2 border-romance-candleGold shadow-[0_8px_25px_rgba(251,191,36,0.3)]'
                  : isOpened
                  ? 'bg-[#f7edd9] text-[#3e2723] shadow-md border border-[#c4a480]/40'
                  : 'bg-[#fffaf0] hover:bg-[#fff5e0] text-[#2b1810] shadow-md border border-[#c4a480]/60'
              } rounded-sm deckled-paper`}
            >
              {/* Card number badge */}
              <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#a87f58]/20">
                <span className="font-serif text-[11px] font-semibold tracking-wider text-[#7a482b]">
                  {thing.id < 10 ? `0${thing.id}` : thing.id}
                </span>
                <span className="text-[10px] text-romance-wine/70 font-sans">
                  {isOpened ? 'Read ✓' : 'Tap to read'}
                </span>
              </div>

              {/* Title snippet */}
              <h3 className="font-script text-lg sm:text-xl font-bold leading-snug line-clamp-2">
                {thing.title}
              </h3>

              {isSpecial29 && (
                <p className="font-script text-base text-[#7c2d12] mt-1 font-semibold">
                  (The most important one of all ♡)
                </p>
              )}

              {/* Tiny botanical leaf sketch at bottom corner */}
              <div className="text-right text-[10px] opacity-40 font-serif mt-1">
                ❦
              </div>
            </button>
          );
        })}
      </div>

      {/* Note Detail Modal / Unfolded Paper */}
      {selectedNote && (
        <div
          onClick={() => setSelectedNote(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="parchment-card deckled-paper relative w-full max-w-md p-6 sm:p-8 text-[#2b1810] shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-scaleUp rotate-[-0.5deg]"
          >
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-[#6d4c41] hover:text-black hover:bg-black/5"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#a87f58]/30 pb-2 mb-4">
              <span className="font-serif text-xs uppercase tracking-widest text-[#7a482b]">
                Reason #{selectedNote.id}
              </span>
              <span className="font-script text-lg text-romance-wine">For Tannu ♡</span>
            </div>

            {/* Title */}
            <h4 className="font-script text-2xl sm:text-3xl font-bold text-[#4a1c27] mb-3">
              {selectedNote.title}
            </h4>

            {/* Unfolded Full Note Text */}
            <p className="font-script text-xl sm:text-2xl leading-relaxed text-[#2c131a] mb-6">
              "{selectedNote.description}"
            </p>

            <div className="border-t border-[#a87f58]/20 pt-3 flex items-center justify-between text-xs font-sans text-[#7a5840]">
              <span>29.09 Forever</span>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-3 py-1 rounded bg-[#4a1c27] text-white hover:bg-[#682435] text-xs font-sans transition-colors"
              >
                Close note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
