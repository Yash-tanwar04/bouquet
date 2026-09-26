import React, { useEffect, useState, useRef } from 'react';

interface TrailItem {
  id: number;
  x: number;
  y: number;
}

interface TouchParticleItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const HeartCursorAndTouch: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [trails, setTrails] = useState<TrailItem[]>([]);
  const [touchParticles, setTouchParticles] = useState<TouchParticleItem[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const trailCountRef = useRef(0);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Detect touch capability
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    let lastTrailTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Spawn trail heart every 70ms while moving
      const now = Date.now();
      if (now - lastTrailTime > 65) {
        lastTrailTime = now;
        trailCountRef.current += 1;
        const newTrail: TrailItem = {
          id: trailCountRef.current,
          x: e.clientX,
          y: e.clientY,
        };
        setTrails((prev) => [...prev.slice(-8), newTrail]);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-flower') ||
        target.closest('.interactive-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Mobile touch interaction: spawn micro heart particles on tap
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      particleIdRef.current += 1;
      const emojis = ['♡', '✨', '🌸', '💖', ' petal'];
      const chosen = emojis[Math.floor(Math.random() * emojis.length)];

      const newParticle: TouchParticleItem = {
        id: particleIdRef.current,
        x: touch.clientX,
        y: touch.clientY,
        emoji: chosen,
      };

      setTouchParticles((prev) => [...prev.slice(-10), newParticle]);

      // Remove after 1.2s
      setTimeout(() => {
        setTouchParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1200);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <>
      {/* Desktop Heart Cursor (hidden on touch-only mobile devices) */}
      {!isTouchDevice && (
        <>
          {/* Subtle cursor trail */}
          {trails.map((t) => (
            <div
              key={t.id}
              className="cursor-trail-heart text-romance-roseSoft text-xs select-none pointer-events-none"
              style={{ left: `${t.x}px`, top: `${t.y}px` }}
            >
              ♡
            </div>
          ))}

          {/* Main glowing cursor */}
          <div
            className={`fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out select-none ${
              isHovered ? 'scale-135' : 'scale-100'
            }`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
            }}
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`text-sm select-none transition-all duration-300 drop-shadow-[0_0_8px_rgba(244,166,180,0.85)] ${
                  isHovered ? 'text-romance-rose animate-pulse' : 'text-romance-roseSoft'
                }`}
              >
                ♥
              </span>
              <div
                className={`absolute inset-0 rounded-full blur-sm bg-romance-rose/30 transition-all ${
                  isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-60'
                }`}
              />
            </div>
          </div>
        </>
      )}

      {/* Mobile Touch Ripple Particles */}
      {touchParticles.map((tp) => (
        <div
          key={tp.id}
          className="touch-heart-particle fixed pointer-events-none z-[99999] select-none text-romance-rose font-serif text-sm drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
          style={{ left: `${tp.x}px`, top: `${tp.y}px` }}
        >
          {tp.emoji}
        </div>
      ))}
    </>
  );
};
