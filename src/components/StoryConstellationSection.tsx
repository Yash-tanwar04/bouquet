import React, { useState } from 'react';
import { TANNU_DATA, ConstellationStory } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Heart, Star, Moon, MessageCircleHeart, Smile, Infinity, X } from 'lucide-react';

export const StoryConstellationSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<ConstellationStory | null>(null);

  const getIcon = (iconName: string, isSpecial?: boolean) => {
    const props = {
      size: isSpecial ? 18 : 14,
      className: isSpecial ? 'text-romance-rose fill-romance-rose animate-pulse' : 'text-romance-candleGold fill-romance-candleGold',
    };
    switch (iconName) {
      case 'Sparkles': return <Sparkles {...props} />;
      case 'MessageCircleHeart': return <MessageCircleHeart {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Moon': return <Moon {...props} />;
      case 'Infinity': return <Infinity {...props} />;
      default: return <Star {...props} />;
    }
  };

  const handleStarClick = (story: ConstellationStory) => {
    sounds.playFlowerChime();
    setSelectedStory(story);
  };

  return (
    <section
      id="our-story"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0a0d18] via-[#090b16] to-[#0d0f1e]"
    >
      {/* Background Starry Nebula & Constellation Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-romance-rose/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Shooting Star Animation */}
      <div className="absolute top-16 right-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rotate-[-25deg] animate-pulse pointer-events-none opacity-60" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-20 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2">
          <Star size={12} className="text-romance-candleGold animate-spin-slow" />
          <span className="font-serif text-xs text-romance-blush tracking-widest uppercase">
            Written In The Stars
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          Our Story ♡
        </h2>

        <p className="font-script text-xl sm:text-2xl text-romance-roseSoft mt-1">
          "Somehow, a random meeting turned into my favourite story"
        </p>

        <p className="font-sans text-xs text-romance-cream/60 max-w-sm mx-auto mt-2">
          Follow the constellation of moments that brought us here. Tap each star to revisit the memories.
        </p>
      </div>

      {/* Constellation Canvas / Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Desktop Arched Constellation */}
        <div className="hidden md:block relative h-72 w-full my-6">
          {/* Celestial curved line */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
            <defs>
              <linearGradient id="starLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(251, 191, 36, 0.2)" />
                <stop offset="50%" stopColor="rgba(224, 122, 139, 0.7)" />
                <stop offset="100%" stopColor="rgba(251, 191, 36, 0.2)" />
              </linearGradient>
            </defs>
            <path
              d="M 50,150 Q 250,50 450,110 T 850,130"
              fill="none"
              stroke="url(#starLineGrad)"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="animate-pulse"
            />
          </svg>

          {/* Stars placed along the arc */}
          {TANNU_DATA.storyMilestones.map((item, idx) => {
            const positions = [
              { left: '6%', top: '48%' },
              { left: '22%', top: '24%' },
              { left: '40%', top: '34%' },
              { left: '56%', top: '30%' }, // Central 20 Sept confession
              { left: '74%', top: '42%' },
              { left: '92%', top: '40%' },
            ];
            const pos = positions[idx] || { left: '50%', top: '50%' };

            return (
              <div
                key={item.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: pos.left, top: pos.top }}
              >
                <button
                  onClick={() => handleStarClick(item)}
                  className={`group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-115 focus:outline-none`}
                >
                  {/* Star glowing aura */}
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-lg transition-all ${
                      item.isSpecial
                        ? 'bg-romance-wine border-romance-rose shadow-[0_0_20px_rgba(224,122,139,0.8)] animate-pulse'
                        : 'bg-black/60 border-romance-candleGold/40 hover:border-romance-candleGold shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                    }`}
                  >
                    {getIcon(item.icon, item.isSpecial)}
                  </span>

                  {/* Label under star */}
                  <div className="mt-2 text-center whitespace-nowrap bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                    <p className={`font-serif text-xs ${item.isSpecial ? 'text-romance-rose font-semibold' : 'text-romance-cream'}`}>
                      {item.title}
                    </p>
                    {item.date && (
                      <p className="font-script text-xs text-romance-candleGold">
                        {item.date}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Flowing Constellation */}
        <div className="md:hidden relative pl-6 pr-2 py-4">
          {/* Vertical dashed starlight line */}
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-romance-candleGold/20 via-romance-rose/60 to-romance-candleGold/20 border-l border-dashed border-romance-rose/50" />

          <div className="space-y-7 relative">
            {TANNU_DATA.storyMilestones.map((item) => (
              <div
                key={item.id}
                onClick={() => handleStarClick(item)}
                className={`relative flex items-start gap-4 p-3.5 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 active:scale-98 ${
                  item.isSpecial
                    ? 'bg-gradient-to-r from-romance-wine/70 to-romance-burgundy/80 border-romance-rose/60 shadow-[0_4px_20px_rgba(224,122,139,0.25)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-romance-candleGold/40'
                }`}
              >
                {/* Node icon on timeline */}
                <div
                  className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border shadow-md ${
                    item.isSpecial
                      ? 'bg-romance-wine border-romance-rose text-romance-rose'
                      : 'bg-black/60 border-romance-candleGold/40 text-romance-candleGold'
                  }`}
                >
                  {getIcon(item.icon, item.isSpecial)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-serif text-sm sm:text-base font-normal ${item.isSpecial ? 'text-romance-roseSoft' : 'text-romance-cream'}`}>
                      {item.title}
                    </h3>
                    {item.date && (
                      <span className="font-script text-xs sm:text-sm text-romance-candleGold px-2 py-0.5 rounded bg-black/40 border border-romance-candleGold/20">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-romance-cream/70 mt-1 line-clamp-2">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Memory Detail Modal */}
      {selectedStory && (
        <div
          onClick={() => setSelectedStory(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="parchment-card deckled-paper relative w-full max-w-md p-6 sm:p-8 text-[#2b1810] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-[#6d4c41] hover:text-black hover:bg-black/5"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#7a482b]">
              {getIcon(selectedStory.icon, selectedStory.isSpecial)}
              <span className="font-serif text-xs uppercase tracking-widest">
                Milestone Memory
              </span>
            </div>

            <h4 className="font-serif text-2xl font-bold text-[#4a1c27] mb-1">
              {selectedStory.title}
            </h4>

            {selectedStory.date && (
              <p className="font-script text-lg text-romance-candleAmber mb-3">
                {selectedStory.date}
              </p>
            )}

            <p className="font-script text-xl sm:text-2xl leading-relaxed text-[#2c131a] mb-5">
              "{selectedStory.text}"
            </p>

            <div className="border-t border-[#a87f58]/30 pt-3 text-right">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-4 py-1.5 rounded-full bg-[#4a1c27] text-white hover:bg-[#682435] text-xs font-sans"
              >
                Close memory
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
