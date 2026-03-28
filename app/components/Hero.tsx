"use client";

import { useMemo } from "react";

// Deterministic pseudo-random — avoids hydration mismatch
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

export function Hero() {
  const stars = useStars(130);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Starfield */}
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

      {/* Business card flip-in */}
      <div className="business-card-wrap">
        <div className="business-card">
          {/* Top row: name + title */}
          <div className="bc-top">
            <h1 className="bc-name">Alex LaGuardia</h1>
            <p className="bc-title">Software Engineer</p>
          </div>

          {/* Divider */}
          <div className="bc-divider" aria-hidden="true" />

          {/* One-liner */}
          <p className="bc-tagline">
            AI systems &nbsp;·&nbsp; production platforms &nbsp;·&nbsp; game engines
          </p>

          {/* Contact row */}
          <div className="bc-contact">
            <span className="bc-mono">alex@alexlaguardia.dev</span>
            <div className="bc-links">
              <span className="bc-mono">github.com/alexlaguardia</span>
              <span className="bc-mono-sep" aria-hidden="true">|</span>
              <span className="bc-mono">alexlaguardia.dev</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="hero-cta">
        <a
          href="#projects"
          className="px-6 py-3 bg-accent/10 border border-accent/40 text-accent rounded hover:bg-accent/20 transition-colors text-sm font-medium"
        >
          See my work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-border text-muted rounded hover:text-foreground hover:border-foreground/30 transition-colors text-sm font-medium"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
