"use client";

import { useReveal } from "../hooks/useReveal";

const categories = [
  {
    title: "Languages",
    items: [
      { name: "Python", level: "Expert" },
      { name: "Rust", level: "Advanced" },
      { name: "TypeScript", level: "Proficient" },
      { name: "SQL", level: "Proficient" },
      { name: "Lua", level: "Intermediate" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "FastAPI" },
      { name: "Async Workers" },
      { name: "Queue Pipelines" },
      { name: "Daemon Architecture" },
      { name: "REST API Design" },
      { name: "OAuth2" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "Next.js 14" },
      { name: "React 18" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "App Router" },
      { name: "Responsive Design" },
    ],
  },
  {
    title: "AI & ML",
    items: [
      { name: "Multi-LLM Routing" },
      { name: "Agentic Tool Loops" },
      { name: "Vector Embeddings" },
      { name: "RAG Systems" },
      { name: "MCP Protocol" },
      { name: "Prompt Engineering" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { name: "PM2" },
      { name: "Cloudflare Tunnels" },
      { name: "SQLite" },
      { name: "Linux/Ubuntu" },
      { name: "SSH Hardening" },
      { name: "Automated Backups" },
    ],
  },
  {
    title: "Game Engine",
    items: [
      { name: "wgpu (WebGPU)" },
      { name: "rapier3d Physics" },
      { name: "Custom ECS" },
      { name: "State Machines" },
      { name: "Procedural Gen" },
      { name: "Lua Scripting" },
    ],
  },
];

export function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="skills" className="reveal py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-16">
          <span className="font-mono text-accent text-lg">03.</span>
          Skills & Tools
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-mono text-sm text-accent mb-4 tracking-wide">
                {cat.title}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted">{item.name}</span>
                    {"level" in item && item.level && (
                      <span className="font-mono text-xs text-accent/60">
                        {item.level}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
