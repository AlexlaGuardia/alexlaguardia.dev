import Link from "next/link";

export const metadata = {
  title: "Building Warden — Alex LaGuardia",
  description:
    "How I built a governed MCP server with RBAC enforced outside the model, OpenTelemetry traces on every run, and an LLM-as-judge eval suite that treats an honest denial as a passing grade.",
};

export default function WardenPost() {
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
          <p className="font-mono text-sm text-accent mb-3">June 2026</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Same question, three answers: building a governed MCP server
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Ask Warden&apos;s agent &quot;what&apos;s the open pipeline for Acme
            Corp?&quot; as an admin and you get $125,000 across two deals. Ask
            as a support agent and you get a polite, honest refusal. The model
            never decides which one you deserve. That&apos;s the point.
          </p>
        </div>

        <div className="prose-custom space-y-6 text-muted leading-relaxed">
          <p>
            <a
              href="https://warden.alexlaguardia.dev"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
            </a>{" "}
            &middot;{" "}
            <a
              href="https://github.com/AlexlaGuardia/warden"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub
            </a>
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The two questions nobody can dodge
          </h2>
          <p>
            Give an AI agent tool access to company data and you inherit two
            hard questions. First: who is the agent acting as? A support rep
            asking about pipeline numbers must not get an answer the human
            behind the keyboard is not allowed to see. Second: how do you know
            the agent behaved? &quot;It seemed fine when I tested it&quot; is
            not something you can take into a security review.
          </p>
          <p>
            Every forward-deployed engineering job description I read this
            spring was circling these exact two questions: configure a governed
            MCP server, scope agent access, validate agent workflows, monitor
            accuracy. So I built a complete, readable answer to both and put it
            on the public internet where you can poke it.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            What Warden is
          </h2>
          <p>
            A fictional company spread across three sources (CRM accounts and
            deals, billing invoices, support tickets), an MCP server that
            exposes them through four tools, a Claude agent that answers
            questions through that server, and three layers of receipts:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">RBAC enforced outside the model.</strong>{" "}
              Three roles (admin, West-region sales, support), three governance
              primitives: resource-level access, region row-scoping, field
              redaction.
            </li>
            <li>
              <strong className="text-foreground">OpenTelemetry traces on every run.</strong>{" "}
              Real spans with GenAI semantic attributes, persisted and replayed
              on a Gantt timeline in the dashboard.
            </li>
            <li>
              <strong className="text-foreground">An LLM-as-judge eval suite.</strong>{" "}
              Twelve golden cases covering every governance primitive, all
              passing, with a design twist I&apos;ll get to.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Governance the model cannot talk its way out of
          </h2>
          <p>
            The most important design decision is where the policy lives: not
            in the prompt, not in the model&apos;s judgment, but in a single
            choke point the requests physically pass through. The agent&apos;s
            role comes from the session identity (the MCP server reads it from
            its environment at spawn, the way OAuth token scopes work). Every
            read goes through one <code>GovernedStore</code> that applies
            access checks, row scoping, and field redaction before the model
            ever sees a byte. Prompting harder does not widen access, because
            there is nothing on the model&apos;s side of the wall to widen.
          </p>
          <p>
            The tool surface is registry/dispatch, not one-tool-per-table:{" "}
            <code>list_resources</code>, <code>describe_resource</code>,{" "}
            <code>query_resource</code>, <code>get_record</code>. Adding a data
            source changes the registry, not the tools, and the policy engine
            stays in exactly one place. When policy says no, the tools return a
            structured <code>access_denied</code> object instead of an error
            string, which matters more than it sounds, because it turns
            &quot;the agent hit a wall&quot; into data the eval layer can
            reason about.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The eval insight: the oracle has to obey the rules too
          </h2>
          <p>
            This is the part of the build I&apos;d defend in an interview. If
            you compute your reference answers against the raw database, your
            eval is broken in a subtle way: when the support agent is correctly
            denied pipeline data and honestly says so, your eval compares that
            refusal against $125,000 and scores it a failure. The fix is that
            the oracle computes ground truth <em>through the same governance
            layer</em> as the agent. Governance-aware ground truth is what
            makes &quot;the agent honestly declined&quot; a passing grade
            instead of a miss.
          </p>
          <p>
            Each case is then judged on four axes: accuracy against the
            reference, faithfulness to the data actually retrieved, RBAC
            compliance, and honesty about limits. A stronger model judges than
            answers (Opus judging Sonnet), anchored to the oracle&apos;s
            reference, which cuts down both judge laziness and self-preference
            bias. Twelve cases, every primitive covered, 12/12 passing, and
            the whole scorecard is{" "}
            <a
              href="https://warden.alexlaguardia.dev/evals"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              public
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Traces you can replay
          </h2>
          <p>
            Every run emits genuine OpenTelemetry spans, a root agent span over
            each LLM completion and MCP tool call, with GenAI semantic
            attributes. I wrote a small in-process span processor that captures
            them as they close and persists them with the run, so the dashboard
            can replay any answer as a timeline: how long the model thought,
            when it reached for a tool, what it sent, what came back, and which
            role was enforcing the result. The role is stamped on every tool
            output. That stamp is the governance proof, visible in every
            single trace.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Putting a live agent on the public internet
          </h2>
          <p>
            The demo would be weaker if you could only browse recorded runs, so
            the console lets anyone fire a real agent run. That means a public
            endpoint that burns real model tokens, which forced the boring,
            important work: per-IP rate limits keyed off the CDN&apos;s
            forwarded client header, a global daily budget, a single-flight
            lock so concurrent strangers queue instead of stampede, and a hard
            timeout. None of this is glamorous. All of it is the difference
            between a demo and a toy.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Things that bit me
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Markdown tables in agent answers rendered as pipe-soup until I
              noticed Tailwind&apos;s <code>prose</code> classes silently do
              nothing without the typography plugin, and react-markdown needs
              remark-gfm for tables at all. Two packages, ten minutes, only
              found by actually clicking through the deployed site.
            </li>
            <li>
              The official MCP Python SDK ships FastMCP at{" "}
              <code>mcp.server.fastmcp</code>. The separately packaged{" "}
              <code>fastmcp</code> library is a different install. Knowing
              which one you&apos;re importing saves a confusing half hour.
            </li>
            <li>
              LLM judges grade generously when you let them freestyle. Anchoring
              the judge to a deterministic reference answer changed it from a
              vibe check into a measurement.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Where it goes from here
          </h2>
          <p>
            Warden is deliberately small enough to read in an afternoon, and
            that&apos;s a feature. The pattern scales by swapping the seed
            company for real connectors and the env-var role for real session
            auth; the choke point, the structured denials, the
            governance-aware oracle, and the trace replay all carry over
            unchanged. If you&apos;re building agents that touch data someone
            actually cares about, steal those four ideas.
          </p>
          <p>
            <a
              href="https://warden.alexlaguardia.dev"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              warden.alexlaguardia.dev
            </a>{" "}
            &middot;{" "}
            <a
              href="https://github.com/AlexlaGuardia/warden"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/AlexlaGuardia/warden
            </a>
          </p>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/"
            className="font-mono text-sm text-accent hover:text-foreground transition-colors"
          >
            &larr; back to alexlaguardia.dev
          </Link>
        </div>
      </article>
    </div>
  );
}
