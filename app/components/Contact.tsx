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
          I&apos;m currently open to full-stack and AI engineering roles, as
          well as interesting freelance projects. If you&apos;re building
          something ambitious and need an engineer who can own the full stack
          from infrastructure to interface, I&apos;d love to hear about it.
        </p>
        <a
          href="mailto:alex@alexlaguardia.dev"
          className="inline-block px-8 py-4 border border-accent/40 text-accent rounded hover:bg-accent/10 transition-colors font-mono text-sm"
        >
          alex@alexlaguardia.dev
        </a>
      </div>
    </section>
  );
}
