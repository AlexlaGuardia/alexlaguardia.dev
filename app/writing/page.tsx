import Link from "next/link";
import { PostList } from "./PostList";
import { posts } from "./posts";

export const metadata = {
  title: "Writing · Alex LaGuardia",
  description:
    "Field notes from building agent-governance tooling: MCP tool poisoning runs, delegation tokens that trace an agent's action back to one human, and the products that came out of it.",
};

export default function WritingIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Writing
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            {posts.length} pieces, newest first. The ones marked{" "}
            <span className="font-mono text-xs">{"↗"}</span> open on dev.to.
          </p>
        </div>
        <PostList posts={posts} />
      </main>
    </div>
  );
}
