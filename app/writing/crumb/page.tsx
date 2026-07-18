import Link from "next/link";

export const metadata = {
  title: "Crumb · Alex LaGuardia",
  description:
    "How Crumb pulls agent identity from the verified human session instead of the model, mints RFC 8693 delegation tokens that nest every hop back to a person, and anchors the ledger in Sigstore to satisfy EU AI Act Article 12 attribution requirements coming August 2026.",
};

export default function CrumbPost() {
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
          <p className="font-mono text-sm text-accent mb-3">July 2026</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            An AI agent exported a patient record. Your logs can&apos;t say
            who told it to.
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            An agent runs under a shared service account and exports a
            record. The audit log says the bot did it. It can&apos;t say
            which human told it to. Starting August 2026, the EU AI Act says
            it has to.
          </p>
        </div>

        <div className="prose-custom space-y-6 text-muted leading-relaxed">
          <p>
            <a
              href="https://crumb.alexlaguardia.dev"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
            </a>{" "}
            &middot;{" "}
            <a
              href="https://github.com/AlexlaGuardia/crumb"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub
            </a>
          </p>

          <p>
            You put an LLM agent into production. It runs under a service
            account or a shared API key, because that&apos;s how you give
            software credentials. It reads a record, exports a file.
            Sometimes it moves money. Your audit log dutifully records the
            action. It says <em>the agent did it</em>.
          </p>
          <p>
            It does not say <em>which human told it to</em>.
          </p>
          <p>
            That&apos;s fine right up until it isn&apos;t. If the agent does
            something it shouldn&apos;t have, &quot;the service account did
            it&quot; is not an answer anyone can act on. You can&apos;t
            discipline a service account. You can&apos;t tell a regulator
            that a bot was responsible and leave it there.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The deadline that makes this concrete
          </h2>
          <p>
            The EU AI Act, Article 12, comes into force on August 2 2026.
            High-risk systems have to keep logs that allow &quot;the
            identification of the natural persons involved&quot; in an
            event. A natural person. Not a service account, not an agent id.
            The actual human.
          </p>
          <p>
            A log built around shared credentials can&apos;t answer that
            question. The identity was never captured, so no amount of log
            retention brings it back.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            You can&apos;t prompt your way out of this
          </h2>
          <p>
            The obvious instinct is to make the model report who it&apos;s
            acting for. Put the user in the system prompt, have the agent
            include it in the tool call.
          </p>
          <p>Two problems.</p>
          <p>
            A tool call, on the wire, is{" "}
            <code>{'{"name": "export_record", "arguments": {...}}'}</code>.
            There is no field for <em>who</em>. OpenAI function-calling has
            no native identity slot. MCP permits carrying it but almost
            nobody implements it. So at the protocol level, the
            &quot;who&quot; has nowhere to live.
          </p>
          <p>
            And worse, anything the model emits can be prompt-injected. If
            identity comes <em>from</em> the model, then the data the agent
            reads back from a tool can rewrite it. I tested this on the same
            payload delivered two ways, and the tool <em>description</em>{" "}
            hijacked more models than the tool <em>output</em> did. The
            model&apos;s output is the one surface you can never treat as
            trusted for identity. It has to be stamped by the runtime,
            outside the agent&apos;s reasoning, before the model gets a say.
          </p>
          <p>
            So I built the runtime that stamps it. It&apos;s called Crumb.
            Every agent action drops a crumb; the trail leads back to the
            human who directed it.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The shape of it
          </h2>
          <p>One gateway, every tool call passes through it.</p>
          <p>
            It pulls the human&apos;s identity from the verified session,
            captured once at login, never from the model. It mints a
            short-lived delegation token that carries both identities: the
            human as the RFC 8693 <code>sub</code>, the agent as the{" "}
            <code>act</code>, scoped to the one resource being called. Then
            it writes a crumb to an append-only, hash-chained ledger, each
            entry signed with Ed25519, and calls the tool with the token.
            The tool refuses any call that doesn&apos;t carry a valid token,
            so there&apos;s no path to the data that skips it.
          </p>
          <p>
            That delegation token isn&apos;t hand-rolled. It&apos;s a real
            RFC 8693 token exchange against an identity provider: the
            human&apos;s session goes in as the <code>subject_token</code>,
            an RS256 provider-signed composite comes back, and the resource
            verifies it against the provider&apos;s published JWKS. No
            shared secret. Point it at Okta or Keycloak or Zitadel and the
            same code path holds, because it&apos;s the standard, not a
            custom copy of it.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            The part that actually breaks: more than one agent
          </h2>
          <p>
            A single agent calling a tool is the easy case. Real systems
            don&apos;t look like that. A human directs an orchestrator. The
            orchestrator delegates to a sub-agent. The sub-agent calls the
            tool. Now who&apos;s accountable, and how do you prove it, when
            the human is two hops away from the action?
          </p>
          <p>
            This is where most attribution stories quietly stop. The
            standards bodies haven&apos;t fully solved it either. But RFC
            8693 has the mechanism hiding in section 4.1: the{" "}
            <code>act</code> claim can nest. Each new actor wraps the
            previous one, and the human stays the <code>sub</code> at the
            root the whole way down. Walk the nesting back and you get the
            full chain of who-acted-for-whom, ending at the person who
            started it.
          </p>
          <p>
            So Crumb implements it end to end. Each hop nests the prior
            actor. The provider does the nesting over a real token exchange,
            not a dev shortcut. The crumb records the whole chain. And
            because the entire nested structure is signed as one token,
            there&apos;s no per-hop seam to forge at. I tried: rewrite a
            middle actor in the chain and re-sign it without the key, and
            verification rejects it on the signature. The chain holds
            together or it doesn&apos;t verify.
          </p>
          <p>
            Alice authorizes one action, <code>read_record</code>, when she
            logs in. A planner agent takes her request and delegates to a
            researcher sub-agent. The researcher reads the record. The
            crumb traces it back through both agents to Alice, verified.
          </p>
          <p>
            Then a hop goes rogue and calls <code>export_record</code>,
            which Alice never authorized. The action may technically run.
            But the crumb records no human directive behind it. It flags
            the action unauthorized and names the agent chain that did it.
            Alice is in the record. She&apos;s provably not the one
            accountable.
          </p>
          <p>
            A service-account log can&apos;t do that. It says a bot
            exported the record, and stops there. This one clears Alice by
            name and points at the agents instead.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Tamper-evidence, including against yourself
          </h2>
          <p>
            A signed, hash-chained log sounds tamper-proof until you
            remember who holds the signing key. You do. If you can re-sign,
            you can rewrite history and re-sign the whole chain, and
            per-entry verification passes the forgery, because every entry
            is validly signed. By you.
          </p>
          <p>
            So the ledger checkpoints its Merkle root and publishes it to
            Sigstore&apos;s public Rekor transparency log. Now the
            operator-rollback attack falls apart: you rewrite a crumb,
            re-sign the entire chain, and per-entry verify still passes. But
            the rewritten root no longer matches the one already sitting
            public in Rekor, timestamped before your edit. The forgery is
            caught by something you don&apos;t control. There&apos;s a
            button on the live demo that runs exactly this and shows the
            anchor catching it.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            What it isn&apos;t
          </h2>
          <p>
            This is the part I want to be straight about, because
            attribution is a space where it&apos;s easy to overclaim.
          </p>
          <p>
            Crumb is a flight recorder, not a control plane. Stopping
            things is a different and well-funded job. Cerbos, Capsule,
            Astrix already do it. Crumb records and proves; it points at
            them for the rest.
          </p>
          <p>
            Attribution is only as strong as the gateway. Bypass it and
            there&apos;s no crumb, so the gateway has to be real and
            enforced, not optional.
          </p>
          <p>
            The multi-hop chain now spans two identity providers, with a
            caveat worth stating plainly. No RFC defines cross-issuer
            delegation, so Crumb closes it with a convention: each
            issuer&apos;s token staples the one before it, and verification
            walks the chain back to the human, checking every segment
            against its own issuer&apos;s key. It runs in the demo and
            rejects five different forgeries by name. What it rests on is
            an explicit federation trust set. You still decide which
            issuers you accept; I made that decision explicit instead of
            burying it. Calling it a solved standard would be the overclaim
            I&apos;m trying to avoid.
          </p>
          <p>
            The ledger stores a hash of the arguments, not the raw
            arguments, to keep sensitive data out of the log. The tradeoff
            is that it proves an action happened and who directed it, not
            the exact bytes that were touched.
          </p>
          <p>
            MCP attribution is permitted by the spec but rarely implemented
            upstream, so Crumb can stamp the record but can&apos;t force a
            non-compliant server to honor the human identity.
          </p>
          <p>
            That&apos;s the gap between what&apos;s built and what&apos;s
            marketing. In this space, that gap is the whole thing.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
            Try to break it
          </h2>
          <p>
            Seed some crumbs, tamper a row, watch verification flip. Hit
            the operator rollback and watch the external anchor catch a
            forgery that per-entry signing passes. If you&apos;re building
            agent infrastructure and you&apos;ve hit this, or you think
            I&apos;ve got something wrong, I want to hear it.
          </p>
          <p>
            <a
              href="https://crumb.alexlaguardia.dev"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              crumb.alexlaguardia.dev
            </a>{" "}
            &middot;{" "}
            <a
              href="https://github.com/AlexlaGuardia/crumb"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/AlexlaGuardia/crumb
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
