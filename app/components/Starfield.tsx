"use client";

import { useMemo } from "react";

// Deterministic pseudo-random, avoids hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  delay: string;
  duration: string;
}

function useStars(count: number): Star[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${seededRandom(i * 3) * 100}%`,
      left: `${seededRandom(i * 3 + 1) * 100}%`,
      size: 1 + seededRandom(i * 3 + 2) * 2,
      opacity: 0.3 + seededRandom(i * 7) * 0.5,
      delay: `${(seededRandom(i * 5) * 8).toFixed(2)}s`,
      duration: `${(3 + seededRandom(i * 11) * 5).toFixed(2)}s`,
    }));
  }, [count]);
}

// Fixed, full-viewport twinkling starfield (z-0). Content sits above it via
// its own `relative z-10`. Shared by the homepage Hero and sub-pages so the
// background reads as one portfolio.
export function Starfield({ count = 130 }: { count?: number }) {
  const stars = useStars(count);
  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
            willChange: "opacity",
          }}
        />
      ))}
    </div>
  );
}
