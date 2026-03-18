export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl">
        <p className="font-mono text-sm text-accent mb-4 tracking-wide">
          Hi, my name is
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          Alex LaGuardia.
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-muted mt-2 leading-tight">
          I build things that think.
        </h2>
        <p className="mt-6 max-w-xl text-muted leading-relaxed text-lg">
          Full-stack software engineer specializing in AI-powered systems,
          production platforms, and low-level engine development. I turn ideas
          into running software — from React frontends to Rust game engines to
          multi-agent cognitive architectures.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent/10 border border-accent/40 text-accent rounded hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-border text-muted rounded hover:text-foreground hover:border-foreground/30 transition-colors text-sm font-medium"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
