import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import { Heart, Volume2, VolumeX, Wind, Menu, X, Compass, Flower2, Mail, Sparkles, Music } from 'lucide-react';

interface FloatingNavProps {
  onBreezeTrigger: () => void;
  windActive: boolean;
  onSecretHeartFound: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  onBreezeTrigger,
  windActive,
  onSecretHeartFound,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
  };

  const handleHeartSecretTap = () => {
    sounds.playHeartbeat();
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 29) {
      onSecretHeartFound();
      setTapCount(0);
    }
  };

  const navLinks = [
    { label: 'The Bouquet', href: '#bouquet', icon: Flower2 },
    { label: 'Garden of Reasons', href: '#garden', icon: Sparkles },
    { label: '29 Little Things', href: '#little-things', icon: Heart },
    { label: 'Our Story', href: '#our-story', icon: Compass },
    { label: 'Letters', href: '#letters', icon: Mail },
    { label: 'Memories', href: '#memories', icon: Heart },
    { label: 'Soundtrack', href: '#soundtrack', icon: Music },
    { label: 'Distance', href: '#distance', icon: Compass },
    { label: 'The Mirror', href: '#mirror', icon: Sparkles },
    { label: 'Closing Note', href: '#closing', icon: Heart },
  ];

  return (
    <>
      {/* Floating Action Controls on Top / Bottom */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {/* Sound Mute/Unmute */}
        <button
          onClick={toggleSound}
          className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-romance-roseSoft" />}
        </button>

        {/* Breeze Wind button */}
        <button
          onClick={onBreezeTrigger}
          className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center shadow-lg transition-all active:scale-90 ${
            windActive
              ? 'bg-romance-rose text-white border-romance-rose animate-pulse'
              : 'bg-black/60 border-white/15 text-white/80 hover:text-white'
          }`}
          aria-label="Gentle breeze"
          title="Gentle wind effect"
        >
          <Wind size={16} />
        </button>

        {/* Minimal Floating Heart / Menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative px-3.5 h-10 rounded-full bg-gradient-to-r from-romance-wine/90 to-romance-burgundy/90 backdrop-blur-md border border-romance-rose/40 text-romance-blush hover:text-white flex items-center gap-1.5 shadow-[0_4px_20px_rgba(224,122,139,0.3)] transition-all active:scale-95"
          aria-label="Navigation menu"
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleHeartSecretTap();
            }}
            className="cursor-pointer text-sm animate-pulse hover:scale-125 transition-transform"
            title="A tiny secret heart (tap 29 times)"
          >
            ♥
          </span>
          <span className="font-serif text-xs hidden sm:inline">Universe</span>
          {isOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Slide-out Romantic Menu Drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs h-full bg-gradient-to-b from-[#180f1a] via-[#120e18] to-[#0a0c16] border-l border-romance-rose/20 p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-romance-cream">
                    Tannu's Universe ♡
                  </h3>
                  <p className="font-script text-sm text-romance-roseSoft">
                    Happy 29th September
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.08] text-romance-cream/80 hover:text-white transition-all text-sm font-sans"
                    >
                      <Icon size={16} className="text-romance-roseSoft" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer with subtle 29.09 Easter Egg */}
            <div className="pt-6 border-t border-white/10 text-center">
              <p className="font-script text-base text-romance-candleGold">
                "Made with all my heart for you."
              </p>
              <button
                onClick={handleHeartSecretTap}
                className="mt-2 text-[10px] font-sans text-white/30 tracking-widest hover:text-romance-roseSoft transition-colors"
              >
                29.09 • FOREVER ({tapCount > 0 ? `${tapCount}/29` : 'SECRET'})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
