import Link from "next/link";

const posts = [
  {
    title: "I built greenhouse software for one customer (on purpose)",
    slug: "/writing/scionbee",
    date: "May 2026",
    summary:
      "No signup, no billing, no multi-tenant scaffolding. Scionbee is a phone-first PWA for one wholesale grower in Pennsylvania \u2014 the bay grid, the schedule, the Ball Seed weeks, all molded to how the crew actually works.",
    tags: ["Next.js", "Prisma", "SQLite", "PWA", "Anti-SaaS"],
  },
  {
    title: "Three freelancer tools died in two months. I built the replacement.",
    slug: "https://dev.to/alexlaguardia/three-freelancer-tools-died-in-two-months-i-built-the-replacement-4dbe",
    date: "April 2026",
    summary:
      "HoneyBook hiked prices 89%. AND.CO shut down. Bonsai got acquired. Building Stampwerk \u2014 AI proposals, auto contracts, smart invoicing at $12/mo.",
    tags: ["Python", "FastAPI", "AI", "SaaS", "Freelance"],
    external: true,
  },
  {
    title: "Give your AI agents a nervous system",
    slug: "/writing/vigil",
    date: "March 2026",
    summary:
      "How I extracted cognitive infrastructure from a 95-tool production system into Vigil \u2014 from open-source library to hosted cloud platform with multi-tenant isolation, Stripe billing, and GitHub OAuth.",
    tags: ["AI Agents", "Python", "MCP", "SaaS", "Open Source"],
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
    title: "33 tools for Mailchimp in one MCP server",
    slug: "https://dev.to/alexlaguardia/33-tools-for-mailchimp-in-one-mcp-server-heres-how-i-built-it-295k",
    date: "March 2026",
    summary:
      "Building a production-grade MCP server for Mailchimp with 33 tools covering campaigns, audiences, templates, and automations.",
    tags: ["MCP", "Python", "Mailchimp"],
    external: true,
  },
  {
    title: "Managing a WooCommerce store from Claude \u2014 34 MCP tools",
    slug: "https://dev.to/alexlaguardia/managing-a-woocommerce-store-from-claude-34-mcp-tools-i-wish-existed-3d6l",
    date: "March 2026",
    summary:
      "34 MCP tools for WooCommerce covering products, orders, customers, reports, and webhooks \u2014 with URL normalization and array response handling.",
    tags: ["MCP", "Python", "WooCommerce"],
    external: true,
  },
  {
    title: "Zero to 33 tools: building the first MCP server for ActiveCampaign",
    slug: "https://dev.to/alexlaguardia",
    date: "March 2026",
    summary:
      "The first MCP server for ActiveCampaign \u2014 contacts, deals, automations, pipelines, and campaigns with client-side rate limiting.",
    tags: ["MCP", "Python", "ActiveCampaign"],
    external: true,
  },
  {
    title: "OAuth2, two APIs, and soft deletes \u2014 building an MCP server for FreshBooks",
    slug: "https://dev.to/alexlaguardia",
    date: "March 2026",
    summary:
      "Navigating FreshBooks\u2019 dual API surface, OAuth2 token refresh, and soft delete patterns while building a 25-tool MCP server.",
    tags: ["MCP", "Python", "FreshBooks", "OAuth2"],
    external: true,
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
