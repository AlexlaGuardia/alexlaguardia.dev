import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Infrastructure Audit | Alex LaGuardia",
  description:
    "I audit your MCP server / AI agent stack for silent failures, install monitoring, and watch it for you. $1,500 flat audit, $500/mo retainer.",
  openGraph: {
    title: "Agent Infrastructure Audit | Alex LaGuardia",
    description:
      "I audit your MCP server / AI agent stack for silent failures, install monitoring, and watch it for you.",
    url: "https://alexlaguardia.dev/services",
    siteName: "Alex LaGuardia",
    type: "website",
  },
};

const CAL_URL = "https://cal.com/alexlaguardia/agent-audit";
const EMAIL = "alex@alexlaguardia.dev";

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 pt-24 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <section className="mb-20">
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="text-3xl md:text-5xl font-medium leading-tight mb-6">
              MCP servers fail silently. I find the failures, install monitoring, and watch them for you.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8">
              A tool returns empty results. The agent works around it. You find out three days later when a customer asks why nothing got synced.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-10">
              If your team ships agentic AI in production and your &ldquo;monitoring&rdquo; is reading logs, this is for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-accent text-background rounded font-medium hover:bg-accent-hover transition-colors"
              >
                Book a 20-minute call
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block px-6 py-3 border border-border text-foreground rounded font-medium hover:border-accent/40 transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </section>

          {/* What you get */}
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-8 text-foreground">What you actually get</h2>
            <div className="space-y-8">
              <div>
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">One-week audit</p>
                <p className="text-muted leading-relaxed">
                  I read your MCP server, agent stack, and tool definitions. I find silent failures, broken happy paths, missing error handling, and security gaps. You get a written report with severity ratings and code-level fixes. <span className="text-foreground">$1,500 flat.</span>
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Vigil monitoring installed</p>
                <p className="text-muted leading-relaxed">
                  I deploy MCPWatch (the open-source server I wrote) on your stack. It catches{" "}
                  <code className="text-accent text-sm">isError</code> responses the SDK swallows, p95 latency drift, and tool-call patterns that fail without raising. You see what your agents are actually doing.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Two weeks free triage</p>
                <p className="text-muted leading-relaxed">
                  During the audit window, every alert lands in my inbox first. I tell you what to fix and what to ignore. You learn the noise floor without paying for it.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-8 text-foreground">Pricing</h2>
            <div className="border border-border rounded overflow-hidden">
              <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-accent uppercase tracking-wider">Audit</p>
                  <p className="text-foreground mt-1">One-week assessment + Vigil install + 2 weeks triage</p>
                </div>
                <p className="text-foreground font-medium whitespace-nowrap">$1,500 flat</p>
              </div>
              <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-accent uppercase tracking-wider">Watch</p>
                  <p className="text-foreground mt-1">Vigil hosted, alerts triaged, monthly review call</p>
                </div>
                <p className="text-foreground font-medium whitespace-nowrap">$500/mo</p>
              </div>
              <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-accent uppercase tracking-wider">Embedded</p>
                  <p className="text-foreground mt-1">Watch + 4 hours/mo of feature work or incident response</p>
                </div>
                <p className="text-foreground font-medium whitespace-nowrap">$2,000/mo</p>
              </div>
            </div>
            <p className="text-sm text-muted mt-4">
              Cancel any time, no contracts. If the audit doesn&rsquo;t surface at least 3 actionable issues, you don&rsquo;t pay. That&rsquo;s a real guarantee, not a marketing line.
            </p>
          </section>

          {/* Differentiation */}
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-6 text-foreground">
              How this is different from a code review or a Snyk scan
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Code review checks correctness. Snyk checks vulnerability lists. Neither tells you that your agent is hitting your tool 800 times an hour because the prompt has the wrong instruction. Neither tells you that your{" "}
              <code className="text-accent text-sm">mcp.Server</code> swallowed three{" "}
              <code className="text-accent text-sm">ValueError</code>s last night and returned empty content.
            </p>
            <p className="text-muted leading-relaxed">
              I built the tool that catches that. I also built four production MCP servers, an MCP CLI inspector, and a session-handoff system that&rsquo;s been running on my own infrastructure for nine months. I know what breaks because I broke it first.
            </p>
          </section>

          {/* Who this is for */}
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-6 text-foreground">Who this is for</h2>
            <ul className="space-y-3 text-muted leading-relaxed">
              <li>
                <span className="text-foreground font-medium">Small AI teams (5&ndash;50 engineers)</span> running MCP servers, Claude Code workflows, or custom agent stacks in production
              </li>
              <li>
                <span className="text-foreground font-medium">Founders who shipped agentic AI fast</span> and now realize they have no idea what their agents are doing in prod
              </li>
              <li>
                <span className="text-foreground font-medium">Teams without a dedicated SRE</span> who need observability without hiring for it
              </li>
            </ul>
            <p className="text-sm text-muted mt-6">
              If you&rsquo;re VC-funded with a Datadog contract and a platform team, you don&rsquo;t need me. If your &ldquo;monitoring&rdquo; is{" "}
              <code className="text-accent text-sm">tail -f</code>, you do.
            </p>
          </section>

          {/* Proof */}
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-6 text-foreground">Proof</h2>
            <ul className="space-y-4 text-muted leading-relaxed">
              <li>
                <a
                  href="https://github.com/AlexlaGuardia/Vigil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover font-medium"
                >
                  Vigil + MCPWatch
                </a>{" "}
                &mdash; open-source AI agent observability. Wraps any Python MCP server (FastMCP and low-level Server) with the same API.
              </li>
              <li>
                <a
                  href="https://github.com/AlexlaGuardia/Critik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover font-medium"
                >
                  Critik
                </a>{" "}
                &mdash; AI code security scanner. Two-pass (regex/AST + LLM review). Catches what Copilot ships.
              </li>
              <li>
                <span className="text-foreground font-medium">4 production MCP servers</span> &mdash; Mailchimp (71 tools), WooCommerce (73), FreshBooks (53), ActiveCampaign (65). Built, tested, published, distributed.
              </li>
              <li>
                <span className="text-foreground font-medium">9 months of dogfooding</span> &mdash; every system I describe runs on my own infrastructure, every day.
              </li>
            </ul>
          </section>

          {/* How it works */}
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-6 text-foreground">How it works</h2>
            <ol className="space-y-4 text-muted leading-relaxed">
              <li>
                <span className="text-accent font-mono text-sm mr-2">01</span>
                <span className="text-foreground font-medium">20-minute call.</span> I ask what you&rsquo;re building, what&rsquo;s breaking, what scares you. No pitch.
              </li>
              <li>
                <span className="text-accent font-mono text-sm mr-2">02</span>
                <span className="text-foreground font-medium">Audit kickoff.</span> I get read-only access to your repo + a staging deploy. Week starts.
              </li>
              <li>
                <span className="text-accent font-mono text-sm mr-2">03</span>
                <span className="text-foreground font-medium">Day 7 deliverable.</span> Written report, severity-rated. Vigil installed. We do a walkthrough.
              </li>
              <li>
                <span className="text-accent font-mono text-sm mr-2">04</span>
                <span className="text-foreground font-medium">Week 3 onward.</span> If you keep me on retainer, alerts route to me first. Monthly review.
              </li>
            </ol>
          </section>

          {/* CTA */}
          <section className="border-t border-border pt-12">
            <h2 className="text-2xl font-medium mb-4 text-foreground">Ready to talk?</h2>
            <p className="text-muted mb-6">
              Or email{" "}
              <a href={`mailto:${EMAIL}`} className="text-accent hover:text-accent-hover">
                {EMAIL}
              </a>{" "}
              with a one-line description of your stack. I read every one.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-accent text-background rounded font-medium hover:bg-accent-hover transition-colors"
            >
              Book the 20-minute call
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
