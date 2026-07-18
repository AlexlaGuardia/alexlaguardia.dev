import Link from "next/link";

const posts = [
  {
    title:
      "An AI agent exported a patient record. Your logs can't say who told it to.",
    slug: "/writing/crumb",
    date: "July 2026",
    summary:
      "An agent running under a shared service account exports a patient record. The audit log says the bot did it, nothing about who told it to, and EU AI Act Article 12 asks for the actual person starting August 2026. I built Crumb, a gateway that pulls identity from the verified human session, never the model, mints an RFC 8693 delegation token nesting every hop back to that person, and anchors the ledger in Sigstore's public Rekor log so even the operator holding the signing key can't rewrite it undetected.",
    tags: ["MCP", "RFC 8693", "Agent Identity", "Sigstore", "Crumb"],
  },
  {
    title: "The model refused. Invisible characters changed its mind.",
    slug: "/writing/encoding-alignment-bypass",
    date: "July 2026",
    summary:
      "gpt-4.1-mini refused a plain-English exfil instruction six times out of six, then obeyed it six out of six once I put a zero-width space between every character. Same intent, one invisible codepoint. The obfuscation didn't slip past a filter in front of the model, it slipped past the model's own judgment. A homoglyph payload that was inert a week earlier went live on gpt-4o in the meantime, so \"the model won't act on it\" turned out to have an expiry date. Then I split the same directive across three fields instead of hiding it, and every model ignored it, thirty-six clean runs. Scanner-evasion and model-hijack are different axes. I shipped a deterministic normalize-before-scan fix in Vigil, and the run is the cleanest argument I have for attribution over detection.",
    tags: ["MCP", "Prompt Injection", "Agent Security", "Alignment", "Crumb"],
  },
  {
    title:
      "A shipped agent framework ran the hidden payload. My own scanner caught it.",
    slug: "/writing/agent-framework-value-slot",
    date: "July 2026",
    summary:
      "The exfil order sat in an enum value, not the tool description. HuggingFace smolagents handed all of it to the model untouched, because its adapter filters nothing, and gpt-oss-120b called the export tool on its own, seven runs of ten, six of them in a field the description scan never opens. llama-3.3-70b resisted every pure machine slot and obeyed only the prose channels. Same payload, opposite models. Then I ran the exact tool definitions through the registration-time scanner I built, Vigil's scan-tools, and it flagged every channel that hijacked the framework, pinned as a regression corpus.",
    tags: ["MCP", "Prompt Injection", "Agent Security", "Tool Poisoning", "Vigil"],
  },
  {
    title:
      "The tool swore it never exports data. The model read a different field.",
    slug: "/writing/value-slot-override",
    date: "July 2026",
    summary:
      "I hid the exfil order in an enum value, not the description. The description swore the tool was safe by design, the surface a human reviewer reads and a scanner classifies. gpt-4o and gpt-4.1-mini exported the record anyway, eight of eight against a clean control at zero. A specific in-writing denial of the exact action didn't lower the rate by a point. You can't review or description-scan your way out, because the field you're checking isn't the field the model obeys.",
    tags: ["MCP", "Prompt Injection", "Agent Security", "Tool Poisoning", "Crumb"],
  },
  {
    title:
      "ChatGPT asks permission before it acts. It just doesn't count a GET as acting.",
    slug: "/writing/chatgpt-get-consent-bypass",
    date: "July 2026",
    summary:
      "I moved the tool-poisoning attack out of the lab and into the shipping product. A poisoned custom-GPT Action drove ChatGPT to exfiltrate a record I only asked it to read, five of five against a clean control at zero. The theft rode a GET, and ChatGPT's consent gate only fires on POST, so the one mitigation built to catch this never ran.",
    tags: ["ChatGPT", "Prompt Injection", "Agent Security", "Data Exfiltration", "Crumb"],
  },
  {
    title:
      "Scan the tool description, I said. So I hid the payload somewhere else.",
    slug: "/writing/tool-definition-poisoning",
    date: "July 2026",
    summary:
      "A follow-up. The last piece said scan tool descriptions. So I moved the identical payload into a parameter field that reads 'the record id,' and into a schema property nobody fills in. Four models exfiltrated the record at the same rate as the prose. The attack surface is the whole tool definition, and instruction-hierarchy training only guards the tool-output door.",
    tags: ["MCP", "Prompt Injection", "Agent Security", "Instruction Hierarchy", "Crumb"],
  },
  {
    title:
      "I put the same attack in two places. The one everyone warns about was the safe one.",
    slug: "/writing/mcp-channel-asymmetry",
    date: "July 2026",
    summary:
      "I hid one prompt-injection payload in a tool's description and in the data the tool returns. Same bytes. The runtime channel the whole field benchmarks was the safe one; instruction-hierarchy training hardens tool output and leaves tool descriptions wide open. gpt-4o obeyed in the description and refused the identical text in the output.",
    tags: ["MCP", "Prompt Injection", "Agent Security", "Instruction Hierarchy", "Crumb"],
  },
  {
    title: "I pinned each issuer's public key. Then the IdP rotated it.",
    slug: "https://dev.to/alexlaguardia/i-pinned-each-issuers-public-key-then-the-idp-rotated-it-3jon",
    date: "July 2026",
    summary:
      "Crumb's verifier checks a delegation token against each issuer's key. I had them pinned as static PEMs, which breaks silently the day a real IdP rotates. The fix is fetching keys live by JWKS, and the careful part is that fetching a key is not the same as trusting it: keys come from the issuer, never from the log under audit.",
    tags: ["MCP", "OAuth", "JWKS", "Agent Identity", "Security"],
    external: true,
  },
  {
    title:
      "An AI agent acted across two companies. Whose audit log knows which human?",
    slug: "https://dev.to/alexlaguardia/an-ai-agent-acted-across-two-companies-whose-audit-log-knows-which-human-12nl",
    date: "June 2026",
    summary:
      "Cross-issuer delegation in Crumb: when an agent's work spans two identity providers, vanilla RFC 8693 discards the first issuer's signature and re-asserts the human, a trust-me point that breaks verify-without-trusting-the-operator. The fix is provenance stapling, and the chain still traces back to one human.",
    tags: ["MCP", "RFC 8693", "Agent Identity", "Sigstore", "Audit"],
  },
  {
    title: "Same question, three answers: building a governed MCP server",
    slug: "/writing/warden",
    date: "June 2026",
    summary:
      "Warden is an AI agent over enterprise data with RBAC enforced outside the model, OpenTelemetry traces on every run, and an eval suite where an honest denial scores as a pass. Live public console included.",
    tags: ["Python", "MCP", "OpenTelemetry", "LLM Evals", "Next.js"],
  },
  {
    title: "I built greenhouse software for one customer (on purpose)",
    slug: "/writing/scionbee",
    date: "May 2026",
    summary:
      "No signup, no billing, no multi-tenant scaffolding. Scionbee is a phone-first PWA for one wholesale grower in Pennsylvania, the bay grid, the schedule, the Ball Seed weeks, all molded to how the crew actually works.",
    tags: ["Next.js", "Prisma", "SQLite", "PWA", "Anti-SaaS"],
  },
  {
    title: "Three freelancer tools died in two months. I built the replacement.",
    slug: "https://dev.to/alexlaguardia/three-freelancer-tools-died-in-two-months-i-built-the-replacement-4dbe",
    date: "April 2026",
    summary:
      "HoneyBook hiked prices 89%. AND.CO shut down. Bonsai got acquired. Building Stampwerk, AI proposals, auto contracts, smart invoicing at $12/mo.",
    tags: ["Python", "FastAPI", "AI", "SaaS", "Freelance"],
    external: true,
  },
  {
    title: "Give your AI agents a nervous system",
    slug: "/writing/vigil",
    date: "March 2026",
    summary:
      "How I extracted cognitive infrastructure from a 95-tool production system into Vigil, from open-source library to hosted cloud platform with multi-tenant isolation, Stripe billing, and GitHub OAuth.",
    tags: ["AI Agents", "Python", "MCP", "SaaS", "Open Source"],
  },
  {
    title: "I got tired of guessing what my MCP server was doing",
    slug: "/writing/mcpcat",
    date: "March 2026",
    summary:
      "So I built mcpcat, a CLI inspector for MCP servers. The build, the transport detection bug, and why the tooling gap exists.",
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
    title: "Managing a WooCommerce store from Claude, 34 MCP tools",
    slug: "https://dev.to/alexlaguardia/managing-a-woocommerce-store-from-claude-34-mcp-tools-i-wish-existed-3d6l",
    date: "March 2026",
    summary:
      "34 MCP tools for WooCommerce covering products, orders, customers, reports, and webhooks, with URL normalization and array response handling.",
    tags: ["MCP", "Python", "WooCommerce"],
    external: true,
  },
  {
    title: "Zero to 33 tools: building the first MCP server for ActiveCampaign",
    slug: "https://dev.to/alexlaguardia",
    date: "March 2026",
    summary:
      "The first MCP server for ActiveCampaign, contacts, deals, automations, pipelines, and campaigns with client-side rate limiting.",
    tags: ["MCP", "Python", "ActiveCampaign"],
    external: true,
  },
  {
    title: "OAuth2, two APIs, and soft deletes, building an MCP server for FreshBooks",
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
      "Building Akatskii, a multi-LLM cognitive layer that routes thoughts based on complexity, manages semantic memory, and maintains continuity across sessions.",
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
                      <span className="inline-block ml-2 text-xs text-muted font-normal">{"↗"}</span>
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
