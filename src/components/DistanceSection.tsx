import React from 'react';
import { TANNU_DATA } from '../data/tannuData';
import { Heart, Sparkles, Navigation } from 'lucide-react';

export const DistanceSection: React.FC = () => {
  return (
    <section
      id="distance"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0a0d18] via-[#0b0e20] to-[#0d0914]"
    >
      {/* Background Star Clusters & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-xl mx-auto text-center mb-12 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2">
          <Navigation size={12} className="text-romance-roseSoft" />
          <span className="font-serif text-xs text-romance-blush tracking-widest uppercase">
            Beyond The Miles
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          Different Places.
        </h2>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-roseSoft tracking-wide mt-1">
          Same Sky. Still Us. ♡
        </h2>
      </div>

      {/* Celestial Arc Map */}
      <div className="max-w-xl mx-auto relative z-10 my-4">
        {/* Sky Arc Graphic */}
        <div className="relative h-44 sm:h-52 w-full flex items-center justify-between px-4 sm:px-8">
          {/* SVG Animated Glowing Arch */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
            <defs>
              <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e28292" stopOpacity="1" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing connecting arc path */}
            <path
              d="M 60,130 Q 280,20 500,130"
              fill="none"
              stroke="url(#arcGlow)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              filter="url(#glowFilter)"
              className="animate-pulse"
            />
          </svg>

          {/* Star 1: Him */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-romance-wine/70 border border-romance-candleGold/60 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                <Sparkles size={16} className="text-romance-candleGold animate-spin-slow" />
              </div>
              <div className="absolute inset-0 rounded-full bg-romance-candleGold/20 blur-md animate-ping" />
            </div>
            <div className="mt-2 text-center bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="font-serif text-xs text-white block">Me</span>
              <span className="font-sans text-[10px] text-romance-candleGold">
                ({TANNU_DATA.distance.hisCity})
              </span>
            </div>
          </div>

          {/* Center Floating Love Pulse */}
          <div className="relative z-20 flex flex-col items-center -translate-y-8 sm:-translate-y-12">
            <div className="w-10 h-10 rounded-full bg-romance-rose/30 border border-romance-rose flex items-center justify-center shadow-[0_0_25px_rgba(224,122,139,0.8)] animate-pulse">
              <Heart size={16} className="fill-romance-rose text-romance-rose animate-bounce" />
            </div>
            <span className="font-script text-base text-romance-blush mt-1">
              One Heart ♡
            </span>
          </div>

          {/* Star 2: Tannu */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-romance-burgundy/80 border border-romance-rose flex items-center justify-center shadow-[0_0_20px_rgba(224,122,139,0.7)]">
                <Sparkles size={16} className="text-romance-roseSoft animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full bg-romance-rose/25 blur-md animate-ping" />
            </div>
            <div className="mt-2 text-center bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="font-serif text-xs text-romance-roseSoft font-medium block">
                Tannu
              </span>
              <span className="font-sans text-[10px] text-romance-blush/80">
                ({TANNU_DATA.distance.herCity})
              </span>
            </div>
          </div>
        </div>

        {/* Parchment Quote Card */}
        <div className="mt-8 parchment-card deckled-paper p-5 sm:p-7 text-center shadow-2xl relative rotate-[-0.5deg]">
          <p className="font-script text-2xl sm:text-3xl text-[#3b171f] font-bold leading-relaxed">
            "{TANNU_DATA.distance.quote}"
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs font-sans text-[#7a5840]">
            <span>29 September</span>
            <span>•</span>
            <span className="font-script text-base text-romance-wine">Always with you</span>
          </div>
        </div>
      </div>
    </section>
  );
};
