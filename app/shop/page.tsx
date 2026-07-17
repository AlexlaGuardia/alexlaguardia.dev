import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Starfield } from "../components/Starfield";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Office Software for Shops | Alex LaGuardia",
  description:
    "Custom software for machine shops and small manufacturers in central PA. Same-day quotes, job status, order entry. Fixed price, in writing, before I start.",
  openGraph: {
    title: "Custom Office Software for Shops | Alex LaGuardia",
    description:
      "Custom software for machine shops and small manufacturers in central PA. One chore, fixed. Fixed price in writing.",
    url: "https://alexlaguardia.dev/shop",
    siteName: "Alex LaGuardia",
    type: "website",
  },
};

const EMAIL = "alex@alexlaguardia.dev";
const PHONE = "(717) 376-7870";

export default function ShopPage() {
  return (
    <>
      <Starfield />
      <Nav variant="shop" />
      <main className="relative z-10 pt-24 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <section className="mb-16">
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
              Northumberland, PA
            </p>
            <h1 className="text-3xl md:text-5xl font-medium leading-tight mb-6">
              Whoever answers the RFQ first gets the PO.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-4">
              An RFQ comes in Monday. The floor&rsquo;s slammed, so quoting falls
              behind first. It sits till Friday, and somebody else already quoted
              and got the PO. A $30K job doesn&rsquo;t get lost on price. It gets
              lost on a week nobody answered.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-10">
              I build custom software that takes one specific office chore off
              your plate. Whichever one is eating the most hours in your day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center min-h-11 px-6 py-3 bg-accent text-background rounded font-medium transition-colors hover:bg-accent-hover active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-center"
              >
                Call {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center min-h-11 px-6 py-3 border border-border text-foreground rounded font-medium transition-colors hover:border-accent/40 active:border-accent/60 active:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-center"
              >
                {EMAIL}
              </a>
            </div>
          </section>

          {/* What that looks like — example screens */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-4 text-foreground">What that looks like</h2>
            <p className="text-muted leading-relaxed mb-8">
              A couple of the office chores I fix for shops. Quoting is where most
              shops lose the most hours, so that&rsquo;s usually where we start.
            </p>

            {/* Frame 1 — Quote Board (the anchor) */}
            <div className="border-l-2 border-accent pl-4 mb-4">
              <p className="text-xl font-semibold text-foreground leading-snug">
                Quotes out <span className="text-accent">same-day</span>, not next week.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface overflow-hidden mb-10">
              {/* app title bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  Quote Board
                </span>
                <span className="text-xs text-accent font-medium">
                  3 waiting &middot; oldest 2 days
                </span>
              </div>

              {/* rows */}
              <div className="divide-y divide-border">
                {/* overdue */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-foreground font-medium truncate">Millrun Pump &amp; Supply</p>
                    <p className="text-sm text-muted truncate">Shaft sleeve, 316 SS &middot; qty 12</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium bg-[#7f1d1d]/25 text-[#f87171]">
                      Waiting 2 days
                    </span>
                    <p className="text-xs text-muted mt-1" style={{ fontVariantNumeric: "tabular-nums" }}>received Mon 8:15a</p>
                  </div>
                </div>

                {/* needs quote today */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-foreground font-medium truncate">Northline Fab</p>
                    <p className="text-sm text-muted truncate">Mounting bracket &middot; qty 40</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent">
                      Needs quote
                    </span>
                    <p className="text-xs text-muted mt-1" style={{ fontVariantNumeric: "tabular-nums" }}>received 3h ago</p>
                  </div>
                </div>

                {/* quoted */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-foreground font-medium truncate">Anvil Ridge Machine</p>
                    <p className="text-sm text-muted truncate">Spacer, 6061 &middot; qty 200</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium bg-[#166534]/25 text-[#4ade80]">
                      Quoted
                    </span>
                    <p className="text-xs text-muted mt-1" style={{ fontVariantNumeric: "tabular-nums" }}>sent today 9:42a</p>
                  </div>
                </div>

                {/* quoted */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-foreground font-medium truncate">Ironbark Forge</p>
                    <p className="text-sm text-muted truncate">Die block rework</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium bg-[#166534]/25 text-[#4ade80]">
                      Quoted
                    </span>
                    <p className="text-xs text-muted mt-1" style={{ fontVariantNumeric: "tabular-nums" }}>sent today 8:15a</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Frame 2 — Shop Dashboard (front office at a glance) */}
            <div className="border-l-2 border-accent pl-4 mb-4">
              <p className="text-xl font-semibold text-foreground leading-snug">
                Your whole front office on <span className="text-accent">one screen</span>.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface overflow-hidden mb-10">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  Shop Dashboard
                </span>
                <span className="text-xs text-accent font-medium">3 need you</span>
              </div>
              <div className="grid grid-cols-2 max-[380px]:grid-cols-1 gap-3 p-4">
                <div className="rounded-2xl border border-border bg-[#1e1a16] px-4 py-3">
                  <div className="text-[11px] uppercase tracking-widest text-muted font-medium">Quotes waiting</div>
                  <div className="text-[28px] font-semibold leading-none mt-1 text-accent">3</div>
                  <div className="text-xs text-muted mt-1.5">oldest 2 days</div>
                </div>
                <div className="rounded-2xl border border-border bg-[#1e1a16] px-4 py-3">
                  <div className="text-[11px] uppercase tracking-widest text-muted font-medium">Quoted today</div>
                  <div className="text-[28px] font-semibold leading-none mt-1 text-[#4ade80]">4</div>
                  <div className="text-xs text-muted mt-1.5">out same-day</div>
                </div>
                <div className="rounded-2xl border border-border bg-[#1e1a16] px-4 py-3">
                  <div className="text-[11px] uppercase tracking-widest text-muted font-medium">New RFQs today</div>
                  <div className="text-[28px] font-semibold leading-none mt-1 text-foreground">6</div>
                  <div className="text-xs text-muted mt-1.5">email, fax, phone</div>
                </div>
                <div className="rounded-2xl border border-border bg-[#1e1a16] px-4 py-3">
                  <div className="text-[11px] uppercase tracking-widest text-muted font-medium">Orders to enter</div>
                  <div className="text-[28px] font-semibold leading-none mt-1 text-foreground">5</div>
                  <div className="text-xs text-muted mt-1.5">not yet in the system</div>
                </div>
                <div className="rounded-2xl border border-border bg-[#1e1a16] px-4 py-3">
                  <div className="text-[11px] uppercase tracking-widest text-muted font-medium">Ready to invoice</div>
                  <div className="text-[28px] font-semibold leading-none mt-1 text-[#f87171]">2</div>
                  <div className="text-xs text-muted mt-1.5">don&rsquo;t let it slip</div>
                </div>
                <div className="rounded-2xl border border-border bg-[#1e1a16] px-4 py-3">
                  <div className="text-[11px] uppercase tracking-widest text-muted font-medium">Won this week</div>
                  <div className="text-[28px] font-semibold leading-none mt-1 text-[#4ade80]">3</div>
                  <div className="text-xs text-muted mt-1.5">from same-day quotes</div>
                </div>
              </div>
            </div>
            {/* Frame 3 — Your shop (the invitation) */}
            <div className="border-l-2 border-accent pl-4 mb-4">
              <p className="text-xl font-semibold text-foreground leading-snug">
                Or something <span className="text-accent">only your shop</span> has.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  Your Shop
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted" aria-hidden="true">&mdash;</span>
              </div>
              <div className="m-4 rounded-lg border border-dashed border-border px-6 py-10 text-center">
                <p className="text-xl font-medium text-foreground leading-snug">
                  What eats the most office hours in your shop?
                </p>
                <p className="text-sm text-muted mt-3">That&rsquo;s the one we build first.</p>
              </div>
            </div>
          </section>

          {/* What I do */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-8 text-foreground">What I do</h2>
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Quotes</p>
                <p className="text-muted leading-relaxed">
                  Same-day quotes instead of an RFQ sitting in the pile until the
                  floor slows down.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Job status</p>
                <p className="text-muted leading-relaxed">
                  Where every job stands, without walking the floor to check the
                  traveler or squinting at the whiteboard.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Order entry</p>
                <p className="text-muted leading-relaxed">
                  Orders and POs that land in your system on their own, instead of
                  somebody retyping an email or a fax by hand.
                </p>
              </div>
            </div>
          </section>

          {/* Not another ERP */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-4 text-foreground">Not another ERP</h2>
            <p className="text-muted leading-relaxed">
              This isn&rsquo;t JobBOSS. It isn&rsquo;t E2. No new system to learn, no
              seat licenses, no year-long rollout that ends with everybody drifting
              back to Excel. One chore, fixed. Nothing else about how you run the
              shop changes.
            </p>
          </section>

          {/* Cost */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-4 text-foreground">What it costs</h2>
            <p className="text-muted leading-relaxed mb-4">
              Fixed price, in writing, before I start. No hourly clock. Most jobs
              run <span className="text-foreground">$3,000 to $8,000</span>,
              depending on what the chore needs. Support after that is optional,
              month to month.
            </p>
          </section>

          {/* How it starts */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-4 text-foreground">How it starts</h2>
            <p className="text-muted leading-relaxed">
              Twenty minutes. I look at whichever chore eats the most office hours
              and tell you straight what it&rsquo;s worth fixing and what it costs.
              No charge for the look. If it&rsquo;s not worth doing, I&rsquo;ll say
              so.
            </p>
          </section>

          {/* Who I am */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-4 text-foreground">Who I am</h2>
            <p className="text-muted leading-relaxed mb-4">
              Alex LaGuardia. I build custom software full time, and I&rsquo;ve been
              at it since December. Built a full scheduling and operations system for
              a commercial greenhouse, and an inventory app that&rsquo;s live on the
              Shopify App Store. That&rsquo;s the whole resume, and the software works
              anyway.
            </p>
            <p className="text-muted leading-relaxed">
              Based in Northumberland. If your shop is in the valley, I&rsquo;m
              twenty minutes away, not a support ticket.
            </p>
          </section>

          {/* CTA repeat */}
          <section>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center min-h-11 px-6 py-3 bg-accent text-background rounded font-medium transition-colors hover:bg-accent-hover active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-center"
              >
                Call {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center min-h-11 px-6 py-3 border border-border text-foreground rounded font-medium transition-colors hover:border-accent/40 active:border-accent/60 active:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-center"
              >
                {EMAIL}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
