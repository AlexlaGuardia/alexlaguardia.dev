import Link from "next/link";
import type { Post } from "./posts";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const isExternal = Boolean(post.external);
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
                  <span className="inline-block ml-2 text-xs text-muted font-normal">
                    {"↗"}
                  </span>
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
  );
}
