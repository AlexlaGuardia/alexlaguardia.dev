"use client";

import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

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
    detail: [
      {
        heading: "The pipeline",
        content:
          "Content enters as a raw upload and flows through a chain of AI agents, each with a single responsibility. Artemis handles visual styling via Replicate SDXL, transforming images to match a client\u2019s brand aesthetic. Mercury generates captions using Groq\u2019s Llama 3.3 70B \u2014 fast, cheap, and surprisingly good at matching brand voice. Argus runs quality control, scoring each piece before it\u2019s allowed to publish. Everything runs as isolated PM2 workers, so a failure in styling doesn\u2019t block caption generation.",
      },
      {
        heading: "Real users, real constraints",
        content:
          "This isn\u2019t a side project \u2014 it processes content for paying clients on a recurring schedule. That changes every decision. Error recovery has to be graceful. The scheduling system handles timezone-aware posting windows. Stripe handles billing with tiered plans and add-on services. Custom domain support lets clients serve their content hub on their own domain via Cloudflare for SaaS. When you\u2019re processing someone else\u2019s content on a deadline, reliability isn\u2019t optional.",
      },
      {
        heading: "Infrastructure",
        content:
          "Python/FastAPI backend with 48 concurrent PM2 services on a single VPS, Next.js frontend, 7 SQLite databases, and Cloudflare tunnel for zero-port-exposure hosting. The whole thing runs on an 8GB Hetzner box. Resource discipline matters when you\u2019re not throwing money at infrastructure.",
      },
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
      '"Rust for the engine, Lua for the game" \u2014 clean separation of systems and gameplay',
    ],
    detail: [
      {
        heading: "Why build from scratch?",
        content:
          "Every game engine makes tradeoffs that become your constraints. I wanted to understand the render pipeline at the metal level \u2014 how frames get to the screen, how physics ticks sync with render ticks, how an ECS actually works under the hood. Building from scratch means owning every decision and every line. When something breaks at 3am, there\u2019s no mystery.",
      },
      {
        heading: "The movement system",
        content:
          "Movement is the most important system in an FPS. If it doesn\u2019t feel right in the first 10 seconds, players leave. Supra\u2019s movement is a velocity-driven state machine: walk, sprint, slide, jump, air-strafe, bunny hop, wall-run, wall-bounce, and mantle. Each state defines its own physics \u2014 slide has friction decay, wall-run has gravity reduction and a timer, bunny hop preserves momentum on frame-perfect jumps. The goal was a parkour playground that\u2019s fun with zero objectives.",
      },
      {
        heading: "Architecture",
        content:
          "8 Rust crates organized as a workspace: core, window (winit), render (wgpu pipeline), input, ECS (custom archetype-based), assets (async loading), physics (rapier3d), and engine. Every component is serializable and physics is deterministic \u2014 designed for multiplayer from day one. The philosophy: Rust for the engine, Lua for the game. A scripting layer lets gameplay logic iterate without recompiling the engine.",
      },
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
    detail: [
      {
        heading: "Four cats, four personalities",
        content:
          'Each strategy operates independently with its own thesis, timeframe, and risk parameters. Lion is patient \u2014 weekly and daily charts, position trading, thesis-driven entries. Cheetah is fast \u2014 M5 timeframe, London session scalping. Tiger scans Polymarket for prediction market opportunities. Jaguar runs funding rate arbitrage: long spot, short perpetual, delta-neutral, collecting the spread across three exchanges. They don\u2019t coordinate. They don\u2019t need to.',
      },
      {
        heading: "The birds",
        content:
          "Risk oversight runs in three layers. The signal quality gate filters entries before they reach execution \u2014 bad thesis, bad risk/reward, no trade. Hawk monitors portfolio-level risk in real-time: position sizing, correlation, exposure limits. Eagle enforces discipline: no revenge trading, no overtrading, mandatory cooldowns after losses. The system protects capital from the most dangerous risk factor in trading \u2014 the trader.",
      },
      {
        heading: "Paper to production",
        content:
          "Everything runs in paper trading mode through OANDA and Alpaca. The discipline of treating paper money like real money is the point \u2014 same position sizes, same rules, same journaling. Every position has a documented thesis, automated research refreshes, and clear invalidation criteria. When the track record proves out across market conditions, real capital follows.",
      },
    ],
  },
  {
    title: "Akatskii",
    subtitle: "Cognitive AI Architecture",
    description:
      "A multi-LLM cognitive layer that routes thoughts to different language models based on complexity \u2014 fast pattern matching to Groq, deep reasoning to Claude, vision to Gemini. Features semantic memory with vector embeddings and an agentic tool loop.",
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
    github: "https://github.com/AlexlaGuardia/Akatskii",
    detail: [
      {
        heading: "The routing problem",
        content:
          "Different tasks need different LLMs. A quick status check shouldn\u2019t cost the same as deep architectural reasoning. The thought router analyzes incoming requests and selects the optimal model: fast pattern matching to Groq (Llama 3.3 70B), complex reasoning to Claude, vision tasks to Gemini. The router considers complexity, required capabilities, cost, and latency. Most requests resolve on the cheapest model. The ones that need more get it automatically. The routing logic was mature enough to extract into a standalone open-source library \u2014 llm-route (github.com/AlexlaGuardia/llm-route).",
      },
      {
        heading: "Memory that persists",
        content:
          "LLMs forget everything between sessions. Akatskii doesn\u2019t. Semantic memory uses fastembed with all-MiniLM-L6-v2 \u2014 a 22MB embedding model running on ONNX Runtime, no PyTorch required. Recall is hybrid: keyword search plus cosine similarity, with a boost for memories found by both methods. Below a 0.25 similarity threshold, results are treated as noise. The result is genuine continuity across conversations.",
      },
      {
        heading: "Context compaction",
        content:
          "As conversations grow, context windows fill with noise. The compaction layer extracts structured facts \u2014 decisions made, code written, problems identified \u2014 and drops the filler. This compressed context carries forward across sessions, giving continuity without token waste. The system also runs an agentic tool loop: think, decide on a tool, execute, observe, repeat \u2014 until the task is complete or it decides to ask for help.",
      },
    ],
  },
  {
    title: "Guardia MCP",
    subtitle: "Model Context Protocol Server",
    description:
      "A custom MCP server exposing 70+ tools across business operations, trading, creative writing, and infrastructure. Features frame-based filtering \u2014 each interface sees only the tools relevant to its context.",
    tech: ["Python", "MCP Protocol", "SSE Transport", "OAuth", "Tool Registry"],
    highlights: [
      "70+ tools organized by domain with decorator-based auto-registration",
      "Frame filtering: core (14), serberus (23), paradise (25), luna (55), all (95+)",
      "Bridges AI assistants to every system in the stack via a single protocol",
    ],
    github: "https://github.com/AlexlaGuardia/guardia-mcp",
    detail: [
      {
        heading: "The problem with 70+ tools",
        content:
          "When an AI assistant connects to a server with 95 tools, it drowns in schemas. Frame-based filtering solves this: each interface declares its context (trading, creative writing, system admin), and the server returns only the relevant tools. My trading interface sees trading tools. My fiction-writing interface sees lore tools. Frames only affect discovery \u2014 all tools remain callable regardless, so an interface can reach across domains when needed.",
      },
      {
        heading: "Auto-registration",
        content:
          "Every tool is a decorated Python function. The decorator captures the function\u2019s name, docstring, and type hints, then auto-generates the MCP schema. Adding a new tool means writing a function and dropping it in the right module. No manual schema files. No registration boilerplate. The registry handles discovery, filtering, and execution dispatch.",
      },
      {
        heading: "Bridging everything",
        content:
          "Through a single SSE connection, an AI assistant can query databases, restart services, check trading positions, read creative lore, manage client content, and orchestrate background tasks. It turns any MCP-compatible client into an operator for the entire infrastructure. One protocol, one endpoint, every system.",
      },
    ],
  },
  {
    title: "mcpcat",
    subtitle: "MCP Server CLI Inspector",
    description:
      "A CLI tool that connects to any MCP server and pretty-prints available tools, schemas, and lets you call them interactively. Like curl, but for the Model Context Protocol.",
    tech: ["Python", "Typer", "httpx", "Rich", "MCP Protocol"],
    highlights: [
      "4 commands: tools, inspect, call, ping \u2014 everything you need to debug an MCP server",
      "Auto-detects transport mode (streamable HTTP vs SSE) \u2014 point it at a URL, it figures out the rest",
      "~250 lines across two files. Pip-installable. Fills a tooling gap in the MCP ecosystem.",
    ],
    github: "https://github.com/AlexlaGuardia/MCPcat",
    devto:
      "https://dev.to/alexlaguardia/i-built-a-cli-inspector-for-mcp-servers-2f1m",
    detail: [
      {
        heading: "The gap",
        content:
          "MCP is new enough that the tooling gap is wide open. When building a 70+ tool MCP server, every schema change meant reading source code or wiring up a test client to verify what was exposed. There was no curl equivalent \u2014 no way to just point at a server and see what\u2019s there. That\u2019s the gap mcpcat fills.",
      },
      {
        heading: "Transport detection",
        content:
          "MCP has two transport modes: the original SSE-based flow and the newer streamable HTTP. The first version only handled SSE and hung against my own server, which uses streamable HTTP. The fix: try a plain GET first. If the server returns JSON with protocol info, it\u2019s streamable HTTP. If not, fall back to SSE. Simple, but it took a real failure to discover the need.",
      },
      {
        heading: "Keep it small",
        content:
          "The entire tool is about 250 lines across two files. Python, Typer for the CLI, httpx for HTTP, Rich for pretty tables. Four commands: tools, inspect, call, ping. Sometimes the most useful tools are the smallest ones.",
      },
    ],
  },
];

function ProjectCard({
  project,
  index,
  expanded,
  onToggle,
}: {
  project: (typeof projects)[0];
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="group relative">
      <div
        className={`relative border rounded-lg p-8 transition-all duration-300 bg-surface overflow-hidden ${
          expanded
            ? "project-card-expanded border-accent/30"
            : "border-border hover:border-accent/20"
        } ${isEven ? "" : "md:ml-12"}`}
      >
        {/* Left accent bar — animates in when expanded */}
        <div className="project-card-bar" aria-hidden="true" />

        {/* Clickable header */}
        <div
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-accent mb-1">
                {project.subtitle}
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {project.title}
              </h3>
            </div>
            {/* Chevron — morphs on expand */}
            <div
              className={`shrink-0 mt-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                expanded
                  ? "bg-accent/15 text-accent"
                  : "bg-transparent text-muted group-hover:text-foreground"
              }`}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

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

        {/* Expandable detail */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pt-8 mt-6 border-t border-border">
              {/* Deep dive sections — staggered fade-in */}
              <div className="space-y-6">
                {project.detail.map((section, i) => (
                  <div
                    key={i}
                    className={expanded ? "detail-section" : ""}
                    style={
                      expanded
                        ? { animationDelay: `${0.05 + i * 0.08}s` }
                        : undefined
                    }
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {section.heading}
                    </h4>
                    <p className="text-muted leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Links */}
              {(project.github || project.devto) && (
                <div
                  className={`flex flex-wrap gap-3 mt-8 pt-6 border-t border-border/50 ${expanded ? "detail-section" : ""}`}
                  style={
                    expanded
                      ? { animationDelay: `${0.05 + project.detail.length * 0.08}s` }
                      : undefined
                  }
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-4 py-2 border border-accent/40 text-accent rounded hover:bg-accent/10 transition-colors"
                    >
                      View on GitHub &rarr;
                    </a>
                  )}
                  {project.devto && (
                    <a
                      href={project.devto}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-4 py-2 text-muted hover:text-foreground transition-colors"
                    >
                      Read on Dev.to &rarr;
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="projects" className="reveal py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-16">
          <span className="font-mono text-accent text-lg">02.</span>
          What I&apos;ve Built
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              expanded={expandedIndex === i}
              onToggle={() =>
                setExpandedIndex(expandedIndex === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
