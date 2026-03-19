"use client";

import { useEffect, useRef, useState } from "react";

const CYCLE = [
  "AI pipelines.",
  "trading systems.",
  "game engines.",
  "cognitive architectures.",
  "things that think.",
];

const TYPING_SPEED = 55;    // ms per char
const DELETING_SPEED = 28;  // ms per char
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 300;

export function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [cycleIndex, setCycleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const gridRef = useRef<HTMLDivElement>(null);

  // Typewriter engine
  useEffect(() => {
    const target = CYCLE[cycleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
      }
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        timeout = setTimeout(() => {
          setCycleIndex((i) => (i + 1) % CYCLE.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, cycleIndex]);

  // Ambient grid parallax — subtle, ~8px max shift
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = ((e.clientX - cx) / cx) * 8;
      const dy = ((e.clientY - cy) / cy) * 8;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Ambient grid */}
      <div ref={gridRef} className="hero-grid" aria-hidden="true" />

      <div className="relative max-w-3xl">
        <p className="hero-line hero-line-1 font-mono text-sm text-accent mb-4 tracking-wide">
          Hi, my name is
        </p>
        <h1 className="hero-line hero-line-2 text-5xl md:text-7xl font-bold text-foreground leading-tight">
          Alex LaGuardia.
        </h1>
        <h2 className="hero-line hero-line-3 text-3xl md:text-5xl font-bold text-muted mt-2 leading-tight grid">
          {/* Invisible spacer — reserves height for the longest phrase */}
          <span className="invisible col-start-1 row-start-1" aria-hidden="true">
            I build cognitive architectures.
          </span>
          <span className="col-start-1 row-start-1">
            I build{" "}
            <span className="text-foreground">
              {displayed}
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </span>
        </h2>
        <p className="hero-line hero-line-4 mt-6 max-w-xl text-muted leading-relaxed text-lg">
          Full-stack software engineer specializing in AI-powered systems,
          production platforms, and low-level engine development. I turn ideas
          into running software — from React frontends to Rust game engines to
          multi-agent cognitive architectures.
        </p>
        <div className="hero-line hero-line-5 mt-10 flex gap-4">
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
      </div>
    </section>
  );
}
