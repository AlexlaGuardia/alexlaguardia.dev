import Link from "next/link";

export const metadata = {
  title: "Building Scionbee · Alex LaGuardia",
  description:
    "I built greenhouse software for one customer, on purpose. Why deep integration with a single grower is more interesting than SaaS at scale.",
};

export default function ScionbeePost() {
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
          <p className="font-mono text-sm text-accent mb-3">May 2026</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            I built greenhouse software for one customer (on purpose)
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            No signup. No billing. No multi-tenant scaffolding. Scionbee is a
            tool for one grower in Danville, Pennsylvania &mdash; molded to how
            their crew actually works.
          </p>
        </div>

        <div className="prose-custom space-y-6 text-muted leading-relaxed">
          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The contrarian premise
          </h2>
          <p>
            Greenhouse software exists. It&apos;s all multi-tenant. It&apos;s
            all designed for a hypothetical grower instead of a specific one.
            And almost none of it is actually used by the people walking the
            bays.
          </p>
          <p>
            The records that run a commercial greenhouse &mdash; spray logs,
            scout reports, crop counts, REI postings, weekly schedules &mdash;
            mostly live on clipboards, whiteboards, and three-ring binders.
            Twenty-five years of crop history is wisdom a senior grower
            carries in their head, not something the operation can query.
          </p>
          <p>
            I knew one grower with this exact problem. I decided to build
            something that fit them, instead of pitching them on something
            generic.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The constraint that shapes everything
          </h2>
          <p>
            <strong className="text-foreground">One customer. Deep integration.</strong>{" "}
            That single rule kills most of the complexity that normally eats
            startup energy:
          </p>
          <ul className="list-none space-y-3 ml-0">
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">No signup, no billing, no tenants.</strong>{" "}
                The data model has a single Company row. Every cycle saved on
                infrastructure is a cycle spent on the actual job.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">The bay grid IS their greenhouse.</strong>{" "}
                Phase 4 A&ndash;B is 32 bays in two columns of sixteen rows,
                because that&apos;s what the building actually looks like.
                Not an abstract &ldquo;zone&rdquo;.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">The schedule editor mirrors their paper grid.</strong>{" "}
                Rows of workers, columns of weekdays, click-to-cycle through
                work areas. The PDF export matches the printed handout the
                LeadBee hangs in the break room.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Ball Seed week numbering, not ISO.</strong>{" "}
                The horticulture industry uses a Sunday-start calendar where
                Week 1 contains January 1. The schedule speaks the language
                they already speak.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Spanish-first for FieldBees.</strong>{" "}
                The crew working the bays are native Spanish speakers. The
                worker UI defaults to Spanish; the manager UI defaults to
                English. Same app, role-routed.
              </span>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            What shipped
          </h2>
          <p>
            Phone-first PWA at{" "}
            <a
              href="https://app.scionbee.com"
              className="text-accent hover:underline"
            >
              app.scionbee.com
            </a>
            . Next.js 16, Prisma, SQLite. PIN login on a tablet kept in the
            office, drilled down to the bay on a phone in the field. Five
            phases shipped in May, all live for the pilot:
          </p>

          <ul className="list-none space-y-3 ml-0">
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Bay map with six status states.</strong>{" "}
                Empty / Populated / Watered (&lt; 4h) / Dry (no water for 72h) /
                Scout flagged / REI locked. Each bay paints its own color so a
                manager scanning the grid from across the room sees what
                needs attention.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Five-second logging.</strong>{" "}
                Spray, scout, water, place crops &mdash; each action is two
                or three taps from anywhere in the app, recorded in the bay
                where it happened by the person who saw it. No transcription.
                No &ldquo;I&apos;ll write it up later.&rdquo;
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">REI postings as a byproduct.</strong>{" "}
                Every spray emits a re-entry-interval window with a public
                bulletin post and a countdown to clearance. EPA WPS compliance
                emerges from the workflow instead of being a separate module.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Plants v1.</strong>{" "}
                FieldBees place crops into bays as shipments arrive. A
                CropVariety registry auto-grows on every new typed name &mdash;
                no preloaded master list to maintain. Per-variety tips
                (&ldquo;12-week crop, avoid morning water&rdquo;) appear on
                the bay page when crops of that variety are present.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">Seasonal art per month.</strong>{" "}
                The LeadBee&apos;s habit was to hand-decorate the paper
                schedule with a seasonal image &mdash; tulips in April,
                pumpkins in October. The app hosts a real GIF per month;
                same image decorates the editor banner, the plant
                dashboard thumbnail, and the printed PDF.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">&#9656;</span>
              <span>
                <strong className="text-foreground">PINs by area, not by person.</strong>{" "}
                Workers move between plants in a week. Lead PINs and worker
                PINs are shared codes per area, rotated when a grower leaves.
                No identity layer, no roster maintenance.
              </span>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The compounding angle
          </h2>
          <p>
            The tablet is the surface. The dataset underneath is the asset.
          </p>
          <p>
            One year of bay-level records &mdash; every spray, scout, count,
            loss, transplant, throwout, captured with location and time and
            crop and worker &mdash; produces a structured dataset that
            doesn&apos;t exist anywhere else in the industry. After a year,
            you can train pattern recognition on it: yield prediction by
            variety and season, loss anomaly detection (&ldquo;Bay 14 is
            showing 2008 collapse patterns&rdquo;), labor demand forecasting,
            order-slip risk scoring.
          </p>
          <p>
            That&apos;s a different conversation than &ldquo;sell software to
            growers.&rdquo; The data the operation generates by running
            normally is the part that compounds.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Why one customer is more interesting than a thousand
          </h2>
          <p>
            A SaaS pitch is a thousand shallow integrations. Every customer
            sees a configurable shell. Every feature has to please the median
            of a survey. Every screen has a settings page because somebody
            asked.
          </p>
          <p>
            Scionbee&apos;s settings page has one toggle: language. The
            schedule editor knows what a Ball Seed week is because
            there&apos;s exactly one customer and they use Ball Seed. The
            map is shaped like Plant 3 because Plant 3 is the only plant.
            The PDF margins match the LeadBee&apos;s printer because someone
            walked over and asked which printer.
          </p>
          <p>
            That depth is the product. Trying to sell it to a hundred more
            growers would mean tearing out exactly the choices that make it
            good.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The stack
          </h2>
          <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto space-y-2">
            <div>Next.js 16 (App Router, force-dynamic for live data)</div>
            <div>Prisma 6 + SQLite (one file, zero ops)</div>
            <div>Tailwind 4 (custom palette: loam, moss, leaf, cream, honey, amber, dust)</div>
            <div>bcryptjs PIN auth (no email, no password reset)</div>
            <div>sharp for GIF first-frame extraction (PDF can&apos;t animate)</div>
            <div>@react-pdf/renderer for the printed schedule export</div>
            <div>PM2 + Cloudflare Tunnel (no public ports)</div>
          </div>
          <p>
            Source lives at{" "}
            <a
              href="https://github.com/AlexlaGuardia/scionbee"
              className="text-accent hover:underline"
            >
              github.com/AlexlaGuardia/scionbee
            </a>
            . The roadmap calls it: &ldquo;Internal tool for one grower. Not a
            SaaS.&rdquo;
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            If you&apos;re a grower with a binder
          </h2>
          <p>
            I&apos;m not selling Scionbee. But if you run a commercial
            greenhouse, your records are mostly on paper, and you&apos;d like
            to compare notes with someone building this stuff &mdash; you
            know where to find me.
          </p>
        </div>
      </article>
    </div>
  );
}
