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
            with building, not just websites but complete systems that solve
            real problems.
          </p>
          <p>
            Today I work across the full stack and then some: Python backends
            with FastAPI, React frontends with Next.js, a multi-strategy trading
            system with institutional-style risk controls (paper-traded), a game
            engine written from scratch in Rust, and AI systems that route
            thoughts to different language models based on complexity. I
            don&apos;t just use tools. I build them.
          </p>
          <p>
            My philosophy is simple:{" "}
            <span className="text-foreground font-medium">
              ship things that work, then make them better.
            </span>{" "}
            I believe in craftsman&apos;s pride: doing it right the first time,
            owning the full problem, and never hiding behind &ldquo;that&apos;s
            not my layer.&rdquo;
          </p>
          <p>
            When I&apos;m not building, I&apos;m probably sketching out the next
            system in my head. I think in architectures, not features.
          </p>
        </div>

        {/* 2026 shipping timeline */}
        <div className="mt-14">
          <h3 className="font-mono text-sm text-accent mb-2 tracking-wide">
            2026: A Year of Shipping
          </h3>
          <p className="text-muted text-sm mb-8">
            Eleven projects and five distributed packages, built and shipped in
            a single year.
          </p>
          <ol className="space-y-7 border-l border-border pl-6">
            {timeline.map((phase) => (
              <li key={phase.period} className="relative">
                <span className="absolute -left-[1.7rem] top-1.5 w-2.5 h-2.5 rounded-full bg-accent/70 ring-4 ring-background" />
                <p className="font-mono text-xs text-accent mb-1 tracking-wide">
                  {phase.period}
                </p>
                <p className="text-foreground font-medium mb-1">{phase.title}</p>
                <p className="text-muted text-sm leading-relaxed">{phase.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const timeline = [
  {
    period: "Early 2026",
    title: "Built the core ecosystem",
    detail:
      "Guardia Content (AI SaaS platform), Guardia MCP (95+ tool server), Akatskii (cognitive AI layer with multi-LLM routing), and Paradise (multi-strategy trading system). The foundation everything else grew from.",
  },
  {
    period: "Spring 2026",
    title: "Shipped & distributed standalone products",
    detail:
      "Vigil (agent observability, open-source on PyPI + hosted SaaS), Critik (AI code security scanner, PyPI + VS Code Marketplace), Stampwerk (freelancer business tool), and Supra (3D FPS engine from scratch in Rust).",
  },
  {
    period: "Mid 2026",
    title: "Distribution at scale & client work",
    detail:
      "The MCP Server Suite (262 tools across four PyPI packages), plus Scionbee, an operations and compliance platform built for a commercial greenhouse.",
  },
];
