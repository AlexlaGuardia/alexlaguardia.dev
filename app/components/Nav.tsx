"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

const SHOP_PHONE = "(717) 376-7870";

function LogoBadge({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="24" height="24" rx="6" fill="#d97706" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="#0d0b09"
      >
        AL
      </text>
    </svg>
  );
}

export function Nav({ variant = "default" }: { variant?: "default" | "shop" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isShop = variant === "shop";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 motion-reduce:transition-none ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        {isShop ? (
          /* /shop: badge as a quiet back-to-portfolio pill */
          <a
            href="/"
            className="inline-flex items-center gap-2 min-h-11 rounded-full border border-border pl-2 pr-3.5 py-1.5 bg-surface transition-colors hover:border-accent/40 active:border-accent/60 active:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Back to portfolio"
          >
            <LogoBadge size={22} />
            <span className="text-sm text-muted">&larr; Portfolio</span>
          </a>
        ) : (
          <a
            href="#"
            className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Alex LaGuardia"
          >
            <LogoBadge size={26} />
            <span className="text-sm font-medium text-foreground tracking-tight">
              Alex LaGuardia
            </span>
          </a>
        )}

        {isShop ? (
          /* Shop-scoped nav: no portfolio tabs, just a persistent tap-to-call */
          <a
            href={`tel:${SHOP_PHONE}`}
            className="inline-flex items-center justify-center min-h-11 text-sm px-4 py-2 bg-accent text-background rounded font-medium transition-colors hover:bg-accent-hover active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Call {SHOP_PHONE}
          </a>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-11 text-sm px-4 py-2 border border-accent/40 text-accent rounded transition-colors hover:bg-accent/10 active:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Resume
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {mobileOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Mobile menu (default variant only) */}
      {!isShop && mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center min-h-11 text-sm text-muted rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-11 mt-2 text-sm px-4 py-2 border border-accent/40 text-accent rounded transition-colors hover:bg-accent/10 active:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
