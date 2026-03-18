const projects = [
  {
    title: "Guardia Content",
    subtitle: "AI-Powered SaaS Platform",
    description:
      "A social media automation platform serving paying clients. Content flows through an AI pipeline — styling, caption generation, quality control, scheduling, and publishing — all orchestrated by named AI agents with isolated worker processes.",
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "React",
      "SQLite",
      "Tailwind",
      "Stripe",
      "AI Pipeline",
    ],
    highlights: [
      "Full content automation: upload to published post with zero manual steps",
      "Multi-agent architecture: Artemis (style), Mercury (captions), Argus (QC)",
      "Production SaaS with Stripe billing, OAuth, and custom domain support",
    ],
  },
  {
    title: "Supra Engine",
    subtitle: "3D Game Engine in Rust",
    description:
      "A custom 3D FPS game engine built from scratch in Rust. Features a hand-rolled Entity Component System, wgpu-based rendering, rapier3d physics, and a full movement state machine inspired by Apex Legends. Designed for multiplayer from day one.",
    tech: [
      "Rust",
      "wgpu",
      "rapier3d",
      "Custom ECS",
      "Lua Scripting",
      "glam",
    ],
    highlights: [
      "85K+ lines of Rust across 8 crates (render, physics, ECS, input, assets, scripting)",
      "Movement system: walk, sprint, slide, wall-run, wall-bounce, bunny hop, mantle",
      "\"Rust for the engine, Lua for the game\" — clean separation of systems and gameplay",
    ],
  },
  {
    title: "Paradise",
    subtitle: "Multi-Strategy Trading System",
    description:
      "An autonomous trading intelligence platform running four independent strategies across forex, stocks, and prediction markets. Features institutional-grade risk management with a three-layer oversight system.",
    tech: [
      "Python",
      "OANDA API",
      "Alpaca API",
      "Polymarket",
      "SQLite",
      "PM2",
    ],
    highlights: [
      "4 strategies (position trading, scalping, prediction markets, funding rate arbitrage)",
      "3-layer risk system: signal quality gate, portfolio risk management, discipline enforcement",
      "Thesis-driven investment pipeline with automated research cycles",
    ],
  },
  {
    title: "Akatskii",
    subtitle: "Cognitive AI Architecture",
    description:
      "A multi-LLM cognitive layer that routes thoughts to different language models based on complexity — fast pattern matching to Groq, deep reasoning to Claude, vision to Gemini. Features semantic memory with vector embeddings and an agentic tool loop.",
    tech: [
      "Python",
      "FastAPI",
      "Groq",
      "Anthropic",
      "Google AI",
      "fastembed",
      "ONNX",
    ],
    highlights: [
      "Thought routing: complexity-based LLM selection optimizing cost and latency",
      "Semantic memory with cosine similarity search and hybrid recall",
      "Context compaction: extracts facts, drops noise, creates continuity across sessions",
    ],
  },
  {
    title: "Guardia MCP",
    subtitle: "Model Context Protocol Server",
    description:
      "A custom MCP server exposing 70+ tools across business operations, trading, creative writing, and infrastructure. Features frame-based filtering — each interface sees only the tools relevant to its context.",
    tech: ["Python", "MCP Protocol", "SSE Transport", "OAuth", "Tool Registry"],
    highlights: [
      "70+ tools organized by domain with decorator-based auto-registration",
      "Frame filtering: core (14), serberus (23), paradise (25), luna (55), all (95+)",
      "Bridges AI assistants to every system in the stack via a single protocol",
    ],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="group relative">
      {/* Card */}
      <div
        className={`relative border border-border rounded-lg p-8 hover:border-accent/30 transition-all duration-300 bg-surface ${
          isEven ? "" : "md:ml-12"
        }`}
      >
        {/* Header */}
        <p className="font-mono text-sm text-accent mb-1">{project.subtitle}</p>
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted leading-relaxed mb-6">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted">
              <span className="text-accent mt-1 shrink-0">&#9656;</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1 rounded-full bg-accent/5 text-accent/80 border border-accent/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-16">
          <span className="font-mono text-accent text-lg">02.</span>
          What I&apos;ve Built
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
