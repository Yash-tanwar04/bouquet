import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  rotation: number;
  rotSpeed: number;
  type: 'heart' | 'petal' | 'sparkle';
  color: string;
}

interface FloatingParticlesCanvasProps {
  windIntensity?: number;
}

export const FloatingParticlesCanvas: React.FC<FloatingParticlesCanvasProps> = ({ windIntensity = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const windRef = useRef<number>(windIntensity);

  useEffect(() => {
    windRef.current = windIntensity;
  }, [windIntensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 24 : 45;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Color palette for particles
    const colors = [
      'rgba(244, 166, 180, ', // blush
      'rgba(235, 115, 137, ', // rose
      'rgba(251, 191, 36, ',  // golden candle glow
      'rgba(255, 230, 235, ', // soft white
      'rgba(184, 167, 212, ', // lavender
    ];

    const createParticle = (initialY?: number): Particle => {
      const typeRand = Math.random();
      const type: 'heart' | 'petal' | 'sparkle' = 
        typeRand < 0.5 ? 'heart' : typeRand < 0.8 ? 'petal' : 'sparkle';

      return {
        x: Math.random() * canvas.width,
        y: initialY !== undefined ? initialY : canvas.height + Math.random() * 20,
        size: type === 'heart' ? 6 + Math.random() * 9 : type === 'petal' ? 8 + Math.random() * 10 : 3 + Math.random() * 4,
        speedY: 0.3 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0.15 + Math.random() * 0.55,
        fadeSpeed: 0.002 + Math.random() * 0.003,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Initialize particles spread across canvas
    particlesRef.current = Array.from({ length: count }, () => 
      createParticle(Math.random() * canvas.height)
    );

    // Draw Heart shape
    const drawHeart = (context: CanvasRenderingContext2D, size: number) => {
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight / 3, 0, size);
      // top right curve
      context.bezierCurveTo(size, topCurveHeight / 3, size / 2, -size / 2, 0, topCurveHeight);
      context.closePath();
      context.fill();
    };

    // Draw Petal shape
    const drawPetal = (context: CanvasRenderingContext2D, size: number) => {
      context.beginPath();
      context.moveTo(0, -size);
      context.quadraticCurveTo(size * 0.6, 0, 0, size);
      context.quadraticCurveTo(-size * 0.6, 0, 0, -size);
      context.closePath();
      context.fill();
    };

    // Draw Sparkle star
    const drawSparkle = (context: CanvasRenderingContext2D, size: number) => {
      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        context.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3));
      }
      context.closePath();
      context.fill();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentWind = windRef.current;

      particlesRef.current.forEach((p, idx) => {
        // Apply wind physics
        p.y -= p.speedY;
        p.x += p.speedX + currentWind * 3.5;
        p.rotation += p.rotSpeed + currentWind * 0.04;

        // Reset if drifted outside screen
        if (p.y < -30 || p.x > canvas.width + 40 || p.x < -40) {
          particlesRef.current[idx] = createParticle();
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowColor = 'rgba(244, 166, 180, 0.4)';
        ctx.shadowBlur = 8;

        if (p.type === 'heart') {
          drawHeart(ctx, p.size);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.size);
        } else {
          drawSparkle(ctx, p.size);
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ opacity: 0.9 }}
    />
  );
};
