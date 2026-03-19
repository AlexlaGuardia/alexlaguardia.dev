import Link from "next/link";

export const metadata = {
  title: "Building mcpcat — Alex LaGuardia",
  description:
    "I got tired of guessing what my MCP server was exposing, so I built a CLI inspector in a few hours.",
};

export default function McpcatPost() {
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
            I got tired of guessing what my MCP server was doing
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            So I built mcpcat &mdash; a CLI tool that connects to any MCP server
            and lets you poke around from the terminal.
          </p>
        </div>

        <div className="prose-custom space-y-6 text-muted leading-relaxed">
          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The problem
          </h2>
          <p>
            I run a{" "}
            <a
              href="https://github.com/AlexlaGuardia/guardia-mcp"
              className="text-accent hover:underline"
            >
              custom MCP server
            </a>{" "}
            with 100+ tools. It powers three different AI interfaces &mdash;
            a web dashboard, a CLI agent, and a conversational assistant.
            Each interface sees a different subset of tools based on
            &ldquo;frames&rdquo; (a filtering system I built so my trading
            tools don&apos;t show up when I&apos;m writing fiction).
          </p>
          <p>
            The problem: every time I added a tool, changed a schema, or
            tweaked frame filtering, I had no quick way to verify what was
            actually exposed. I&apos;d either read the source code, or wire up
            a test client, or just... guess.
          </p>
          <p>
            That&apos;s a terrible workflow when you have 100 tools across a
            dozen modules.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            What mcpcat does
          </h2>
          <p>
            Four commands. That&apos;s it.
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <p className="text-accent"># List all tools on a server</p>
            <p>mcpcat tools http://localhost:8100/mcp</p>
            <br />
            <p className="text-accent"># Filter by name</p>
            <p>mcpcat tools http://localhost:8100/mcp -f paradise</p>
            <br />
            <p className="text-accent"># Inspect a specific tool&apos;s schema</p>
            <p>mcpcat inspect http://localhost:8100/mcp cortex_signal</p>
            <br />
            <p className="text-accent"># Call a tool directly</p>
            <p>
              mcpcat call http://localhost:8100/mcp health
            </p>
            <br />
            <p className="text-accent"># Check if a server is alive</p>
            <p>mcpcat ping http://localhost:8100/mcp</p>
          </div>

          <p>
            It auto-detects whether the server uses the newer streamable HTTP
            transport or the older SSE-based transport. You point it at a URL,
            it figures out the rest.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The interesting part: transport detection
          </h2>
          <p>
            MCP has two transport modes. The original spec used Server-Sent
            Events &mdash; you open a GET connection to{" "}
            <code className="text-accent bg-surface px-1.5 py-0.5 rounded text-sm">
              /sse
            </code>
            , wait for an &ldquo;endpoint&rdquo; event, then POST your JSON-RPC
            messages to that endpoint. The newer streamable HTTP transport
            skips the SSE handshake entirely &mdash; you just POST directly
            to the server.
          </p>
          <p>
            My first version only handled the old SSE flow. When I tested it
            against my own server, it hung. My server uses streamable HTTP.
            The SSE endpoint is just a keepalive channel for notifications, not
            the primary transport.
          </p>
          <p>
            The fix: try a plain GET first. If the server returns JSON with
            protocol info, it&apos;s streamable HTTP. If not, fall back to SSE.
            Simple, but it took a real failure to realize I needed it.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The stack
          </h2>
          <p>
            Python, Typer for the CLI, httpx for HTTP, Rich for the pretty
            tables. Nothing exotic. The entire thing is ~250 lines across two
            files. It&apos;s pip-installable and I plan to publish it to PyPI.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Why build this instead of using existing tools?
          </h2>
          <p>
            Because there aren&apos;t any. MCP is still new enough that the
            tooling gap is wide open. There&apos;s no{" "}
            <code className="text-accent bg-surface px-1.5 py-0.5 rounded text-sm">
              curl
            </code>{" "}
            equivalent for MCP &mdash; something you can just point at a server
            to see what&apos;s there. That&apos;s the gap mcpcat fills.
          </p>
          <p>
            If you&apos;re building or consuming MCP servers, you can try it
            now:
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm">
            <p>pip install git+https://github.com/AlexlaGuardia/MCPcat.git</p>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
            <a
              href="https://github.com/AlexlaGuardia/MCPcat"
              className="text-sm px-4 py-2 border border-accent/40 text-accent rounded hover:bg-accent/10 transition-colors"
            >
              GitHub &rarr;
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
