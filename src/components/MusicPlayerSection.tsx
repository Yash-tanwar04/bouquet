import React, { useState, useEffect } from 'react';
import { TANNU_DATA } from '../data/tannuData';
import { sounds } from '../utils/soundEffects';
import { Play, Pause, Music, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

export const MusicPlayerSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(24);
  const [isMuted, setIsMuted] = useState(false);
  const [beatPulse, setBeatPulse] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      sounds.stopMusic();
      setIsPlaying(false);
    } else {
      sounds.startMusic((beat) => {
        setBeatPulse(beat);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
  };

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      id="soundtrack"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(13, 15, 28, 0.94), rgba(28, 16, 22, 0.9), rgba(10, 13, 24, 0.96)), url('/assets/images/vintage_turntable.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background warm candlelight glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-romance-candleAmber/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-romance-rose/20 backdrop-blur-md mb-2">
          <Music size={12} className="text-romance-roseSoft animate-bounce" />
          <span className="font-serif text-xs text-romance-blush tracking-widest uppercase">
            Vintage Turntable
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romance-cream tracking-wide">
          Our Little Soundtrack ♡
        </h2>

        <p className="font-script text-xl sm:text-2xl text-romance-roseSoft mt-1">
          "{TANNU_DATA.music.caption}"
        </p>
      </div>

      {/* Turntable & Player Card Container */}
      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
        {/* Spinning Vinyl Record Visual */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 flex items-center justify-center">
          {/* Vinyl Disc */}
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-950 border-4 border-neutral-700/50 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex items-center justify-center ${
              isPlaying ? 'animate-spin-slow' : 'animate-spin-slow-paused'
            }`}
            style={{
              boxShadow: '0 0 0 8px rgba(255,255,255,0.02), 0 0 0 16px rgba(255,255,255,0.01), 0 15px 35px rgba(0,0,0,0.8)',
            }}
          >
            {/* Center Heart Label */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-romance-blush via-romance-rose to-romance-wine flex flex-col items-center justify-center shadow-inner border border-white/30 text-center p-1">
              <Heart size={14} className="fill-white text-white mb-0.5" />
              <span className="font-script text-[11px] text-white font-bold leading-none">
                Tannu & Yash
              </span>
              <span className="text-[8px] font-sans text-white/80">29.09</span>
            </div>
          </div>

          {/* Tone Arm Simulation */}
          <div
            className={`absolute -top-3 -right-2 w-16 h-24 origin-top-right transition-transform duration-700 pointer-events-none ${
              isPlaying ? 'rotate-[-8deg]' : 'rotate-[-28deg]'
            }`}
          >
            <div className="w-1.5 h-20 bg-gradient-to-b from-[#d4af37] to-[#aa8022] rounded-full mx-auto shadow-md" />
            <div className="w-3.5 h-5 bg-[#333] rounded-sm mx-auto shadow-sm" />
          </div>
        </div>

        {/* Music Player Glass Card */}
        <div className="w-full glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/10 text-romance-cream">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-romance-wine/60 border border-romance-rose/30 flex items-center justify-center shadow-md">
                <Music size={20} className="text-romance-roseSoft" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-romance-cream">
                  {TANNU_DATA.music.title}
                </h3>
                <p className="font-sans text-xs text-romance-blush/70">
                  {TANNU_DATA.music.artist}
                </p>
              </div>
            </div>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="flex items-end justify-center gap-1 h-8 my-4">
            {Array.from({ length: 28 }).map((_, i) => {
              const heights = [35, 60, 85, 45, 95, 30, 75, 50, 90, 40, 65, 80, 55, 100];
              const h = isPlaying ? heights[(i + beatPulse) % heights.length] : 20;

              return (
                <div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-romance-wine to-romance-roseSoft transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    opacity: isPlaying ? 0.9 : 0.25,
                  }}
                />
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-romance-rose to-romance-candleGold h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans text-white/50">
              {isPlaying ? '0:48' : '0:00'}
            </span>

            {/* Main Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-romance-rose hover:bg-romance-dustyRose active:scale-95 text-white flex items-center justify-center shadow-[0_0_20px_rgba(224,122,139,0.5)] transition-all duration-200"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>

            <span className="text-[11px] font-sans text-white/50">3:01</span>
          </div>

          {/* Handwritten Subtext Note */}
          <div className="mt-5 pt-3 border-t border-white/10 text-center">
            <p className="font-script text-lg text-romance-candleGold">
              "{TANNU_DATA.music.subtext}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
