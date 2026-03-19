"use client";

import { useReveal } from "../hooks/useReveal";

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="about" className="reveal py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-8">
          <span className="font-mono text-accent text-lg">01.</span>
          About Me
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            I&apos;m a self-taught software engineer who found his way into code
            through pure curiosity and a refusal to accept &ldquo;that&apos;s
            not possible.&rdquo; What started as tinkering became an obsession
            with building — not just websites, but complete systems that solve
            real problems.
          </p>
          <p>
            Today I work across the full stack and then some: Python backends
            with FastAPI, React frontends with Next.js, trading systems that
            manage real capital, a game engine written from scratch in Rust, and
            AI systems that route thoughts to different language models based on
            complexity. I don&apos;t just use tools — I build them.
          </p>
          <p>
            My philosophy is simple:{" "}
            <span className="text-foreground font-medium">
              ship things that work, then make them better.
            </span>{" "}
            I believe in craftsman&apos;s pride — doing it right the first time,
            owning the full problem, and never hiding behind &ldquo;that&apos;s
            not my layer.&rdquo;
          </p>
          <p>
            When I&apos;m not building, I&apos;m probably sketching out the next
            system in my head. I think in architectures, not features.
          </p>
        </div>
      </div>
    </section>
  );
}
