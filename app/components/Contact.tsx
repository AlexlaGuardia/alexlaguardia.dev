"use client";

import { useReveal } from "../hooks/useReveal";

export function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="contact" className="reveal relative py-32 px-6 overflow-hidden">
      {/* Ambient glow — subtle, just enough to differentiate the section */}
      <div className="contact-glow" aria-hidden="true" />

      <div className="relative max-w-xl mx-auto text-center">
        <p className="font-mono text-sm text-accent mb-4 tracking-wide">
          05. What&apos;s Next
        </p>
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Let&apos;s Build Something
        </h2>
        <p className="text-muted leading-relaxed mb-10">
          I&apos;m looking for <span className="text-foreground font-medium">full-time
          AI and backend engineering roles</span>: building LLM systems, APIs, and
          the infrastructure that runs them. Available to start immediately. If
          you need an engineer who can own a problem from data model to
          deployment and actually ship it, let&apos;s talk.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:alex@alexlaguardia.dev"
            className="inline-block px-8 py-4 bg-accent/10 border border-accent/40 text-accent rounded hover:bg-accent/20 transition-colors font-mono text-sm"
          >
            alex@alexlaguardia.dev
          </a>
          <a
            href="/resume"
            className="inline-block px-6 py-4 border border-border text-muted rounded hover:text-foreground hover:border-accent/30 transition-colors font-mono text-sm"
          >
            Resume &rarr;
          </a>
          <a
            href="https://linkedin.com/in/alex-laguardia-a28a37216"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-4 border border-border text-muted rounded hover:text-foreground hover:border-accent/30 transition-colors font-mono text-sm"
          >
            LinkedIn &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
