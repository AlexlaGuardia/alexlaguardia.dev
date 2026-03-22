import Link from "next/link";

export const metadata = {
  title: "Building Vigil — Alex LaGuardia",
  description:
    "How I extracted cognitive infrastructure from a 95-tool production system into an open-source library for AI agents.",
};

export default function VigilPost() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm text-accent hover:text-foreground transition-colors"
          >
            &larr; alex.laguardia
          </Link>
          <span className="font-mono text-xs text-muted">writing</span>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="font-mono text-sm text-accent mb-3">March 2026</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Give your AI agents a nervous system
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            I run a production system with 95+ tools, 6 interfaces, and multiple
            AI agents that need to stay aware of each other. The patterns that
            emerged became Vigil &mdash; an open-source cognitive infrastructure
            library.
          </p>
        </div>

        <div className="prose-custom space-y-6 text-muted leading-relaxed">
          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The problem nobody talks about
          </h2>
          <p>
            AI agents are getting more capable every month. But they&apos;re all
            amnesiacs. Every session starts from zero &mdash; no awareness of
            what happened last time, no memory of decisions made, no
            understanding of what other agents are doing right now.
          </p>
          <p>
            Memory products exist (Mem0, Letta, Zep), but they solve a different
            problem. They store facts. What&apos;s missing is{" "}
            <em>coordination</em> &mdash; a shared awareness layer that lets
            agents know what&apos;s happening, what just changed, and what
            they should do next.
          </p>
          <p>
            I had this problem at scale. My system runs 95+ tools across 6
            different interfaces: a web dashboard, a CLI, a conversational
            assistant, a trading terminal, a creative writing mode, and an
            orchestration layer. Multiple AI agents work concurrently. Without
            shared awareness, they step on each other.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            What Vigil does
          </h2>
          <p>
            Vigil is the nervous system I extracted from that production stack.
            It gives agents five capabilities they don&apos;t normally have:
          </p>
          <ul className="list-none space-y-3 ml-0">
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Signals</strong> &mdash;
                structured observations with type-based content budgets.
                Observations, handoffs, summaries, alerts. Any agent can emit,
                any agent can read.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Awareness daemon</strong>{" "}
                &mdash; compiles recent signals into a hot context snapshot
                every 90 seconds. Agents boot with awareness instead of
                starting blind.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Session handoff</strong>{" "}
                &mdash; structured chains that carry what happened, what files
                changed, what decisions were made, and what to do next.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Knowledge base</strong>{" "}
                &mdash; persistent facts that survive signal compaction. Signals
                are ephemeral. Knowledge accumulates.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Event triggers</strong>{" "}
                &mdash; pattern-matching rules that fire actions (webhooks,
                signals, focus items) when incoming signals match.
              </span>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Three ways to connect
          </h2>
          <p>
            Vigil ships with three transport modes, all sharing the same SQLite
            database:
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto space-y-4">
            <div>
              <p className="text-accent"># MCP server (Claude Code, Cursor, Claude Desktop)</p>
              <p>vigil serve</p>
            </div>
            <div>
              <p className="text-accent"># REST API with auth + SSE event stream</p>
              <p>vigil serve --transport http --port 8300</p>
            </div>
            <div>
              <p className="text-accent"># MCP over SSE (remote clients)</p>
              <p>vigil serve --transport sse --port 8300</p>
            </div>
          </div>

          <p>
            The MCP server exposes 15 tools. The REST API adds 25 endpoints
            with Bearer auth. Both include an embedded dashboard with live
            htmx updates &mdash; awareness state, agent activity, signal feed,
            handoff chains, and frame maps.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The CLI is the real product
          </h2>
          <p>
            Every feature is accessible from the command line. This matters
            because most AI agent workflows happen in terminals.
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto space-y-4">
            <div>
              <p className="text-accent"># Get started in 30 seconds</p>
              <p>pip install vigil-agent</p>
              <p>vigil quickstart</p>
            </div>
            <div>
              <p className="text-accent"># Emit signals, store knowledge</p>
              <p>vigil signal backend &quot;deployed auth v2&quot;</p>
              <p>vigil know deploy_branch main --category config</p>
              <p>vigil recall deploy</p>
            </div>
            <div>
              <p className="text-accent"># Session continuity</p>
              <p>vigil handoff agent1 &quot;finished auth refactor&quot; --next-steps &quot;add tests,update docs&quot;</p>
              <p>vigil resume agent2</p>
            </div>
            <div>
              <p className="text-accent"># Export for pasting into any LLM</p>
              <p>vigil export</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            What makes it different
          </h2>
          <p>
            I looked at every agent coordination tool I could find before
            building this. Mem0 stores facts in a knowledge graph. Letta gives
            agents self-editing memory. Zep tracks temporal knowledge. LangGraph
            and CrewAI orchestrate agent workflows.
          </p>
          <p>
            None of them solve the awareness problem. They don&apos;t have a
            background daemon that compiles system state. They don&apos;t have
            frame-based filtering that cuts token overhead by 50-90%. They
            don&apos;t have structured handoff chains. They don&apos;t have
            event triggers that fire actions on signal patterns.
          </p>
          <p>
            Vigil isn&apos;t competing with memory products. It&apos;s the
            layer that sits above them &mdash; coordinating awareness so agents
            know what&apos;s happening, not just what happened.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            By the numbers
          </h2>
          <p>
            v1.5.0 is live on PyPI. 14 modules, 6,600+ lines, 252 tests. Zero
            external dependencies for the core &mdash; just Python and SQLite.
            MCP and FastAPI are optional extras. The whole thing stores in a
            single file.
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm">
            <p>pip install vigil-agent</p>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
            <a
              href="https://github.com/AlexlaGuardia/Vigil"
              className="text-sm px-4 py-2 border border-accent/40 text-accent rounded hover:bg-accent/10 transition-colors"
            >
              GitHub &rarr;
            </a>
            <a
              href="https://pypi.org/project/vigil-agent/"
              className="text-sm px-4 py-2 border border-accent/40 text-accent rounded hover:bg-accent/10 transition-colors"
            >
              PyPI &rarr;
            </a>
            <Link
              href="/"
              className="text-sm px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              Back to portfolio
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
