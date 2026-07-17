import { useMemo, type CSSProperties } from 'react';

interface Flake {
  id: number;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: string;
}

function useReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Snow() {
  const reduceMotion = useReducedMotion();

  const flakes = useMemo<Flake[]>(() => {
    if (reduceMotion) return [];
    const count = typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 46;
    return Array.from({ length: count }, (_, id) => ({
      id,
      left: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 5,
      opacity: 0.35 + Math.random() * 0.5,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 14,
      drift: `${Math.random() * 60 - 30}px`,
    }));
  }, [reduceMotion]);

  return (
    <div className="snow-layer" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `-${flake.delay}s`,
            '--drift': flake.drift,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
