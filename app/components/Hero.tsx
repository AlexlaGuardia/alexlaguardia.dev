import { Starfield } from "./Starfield";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Starfield */}
      <Starfield count={130} />

      {/* Business card flip-in */}
      <div className="business-card-wrap">
        <div className="business-card">
          {/* Top row: name + title */}
          <div className="bc-top">
            <h1 className="bc-name">Alex LaGuardia</h1>
            <p className="bc-title">AI / Backend Engineer</p>
          </div>

          {/* Divider */}
          <div className="bc-divider" aria-hidden="true" />

          {/* One-liner */}
          <p className="bc-tagline">
            I ship production systems by directing a fleet of AI agents
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
