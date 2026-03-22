import Link from "next/link";

const posts = [
  {
    title: "Give your AI agents a nervous system",
    slug: "/writing/vigil",
    date: "March 2026",
    summary:
      "How I extracted cognitive infrastructure from a 95-tool production system into Vigil \u2014 an open-source awareness layer with signals, knowledge, and session handoff.",
    tags: ["AI Agents", "Python", "MCP", "Open Source"],
  },
  {
    title: "I got tired of guessing what my MCP server was doing",
    slug: "/writing/mcpcat",
    date: "March 2026",
    summary:
      "So I built mcpcat — a CLI inspector for MCP servers. The build, the transport detection bug, and why the tooling gap exists.",
    tags: ["MCP", "Python", "CLI", "Open Source"],
  },
  {
    title: "How I built a cognitive AI layer that routes thoughts to the right brain",
    slug: "https://dev.to/alexlaguardia",
    date: "March 2026",
    summary:
      "Building Akatskii \u2014 a multi-LLM cognitive layer that routes thoughts based on complexity, manages semantic memory, and maintains continuity across sessions.",
    tags: ["AI", "LLMs", "Python", "Architecture"],
    external: true,
  },
];

export function Writing() {
  return (
    <section id="writing" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-16">
          <span className="font-mono text-accent text-lg">03.</span>
          Writing
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="space-y-6">
          {posts.map((post) => {
            const isExternal = "external" in post && post.external;
            const Wrapper = isExternal ? "a" : Link;
            const wrapperProps = isExternal
              ? { href: post.slug, target: "_blank", rel: "noopener noreferrer" }
              : { href: post.slug };

            return (
              <Wrapper
                key={post.slug}
                {...wrapperProps}
                className="group block border border-border rounded-lg p-6 hover:border-accent/30 transition-all duration-300 bg-surface"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {post.title}
                    {isExternal && (
                      <span className="inline-block ml-2 text-xs text-muted font-normal">&nearr;</span>
                    )}
                  </h3>
                  <span className="font-mono text-xs text-muted shrink-0 mt-1">
                    {post.date}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {post.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 rounded-full bg-accent/5 text-accent/70 border border-accent/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
