"use client";

import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  demo?: string;
  github?: string;
  devto?: string;
  detail: { heading: string; content: string }[];
}

const projects: Project[] = [
  {
    title: "Crumb",
    subtitle: "Tamper-Evident Attribution for AI Agent Actions",
    description:
      "AI agents act under shared service accounts, so your audit log says the agent did it, never which human directed it. Crumb is a flight recorder that closes that gap across both MCP and OpenAI function-calling: it binds every tool call to the human who authorized it, records a hash-chained signed crumb, and anchors the whole log to a public transparency log. An auditor can verify the record without trusting whoever holds it. Live public demo at crumb.alexlaguardia.dev: trigger an operator rollback and watch the signed chain stay green while the external Rekor anchor catches the forgery.",
    tech: [
      "Python",
      "FastAPI",
      "MCP Auth Spec",
      "RFC 8693 Token Exchange",
      "OAuth 2.1",
      "Sigstore Rekor",
      "Ed25519 + Merkle Trees",
      "Next.js",
    ],
    highlights: [
      "Live click-to-use demo: hit operator rollback, the per-entry signatures still pass the forged chain, the public Rekor anchor does not",
      "Cross-vendor by design: an OpenAI function-call and an MCP tools/call normalize to one signed crumb schema, so attribution survives a change of wire",
      "pip-installable independent verifier (crumb verify <url>): a third party confirms the chain, signatures, Merkle root, and public anchor entirely client-side",
    ],
    demo: "https://crumb.alexlaguardia.dev",
    github: "https://github.com/AlexlaGuardia/crumb",
    devto:
      "https://dev.to/alexlaguardia/an-ai-agent-acted-across-two-companies-whose-audit-log-knows-which-human-12nl",
    detail: [
      {
        heading: "The problem",
        content:
          "When an AI agent reads a patient record, exports customer data, or moves money, it runs under a service account or a shared API key, so the log records the agent, not the human who told it to. That gap is about to be regulated: the EU AI Act (Article 12, in force August 2026) requires high-risk systems to log the identification of the natural persons involved, and a service-account log cannot answer that. It also is not a model problem you can prompt your way out of, because a tool call is just a name and arguments with no field for who, and anything the model emits can be prompt-injected. Identity has to be stamped by the runtime, outside the agent's reasoning.",
      },
      {
        heading: "How it works",
        content:
          "The human is captured once at an OIDC session, never from the model. Every tool call is bound to an RFC 8693 delegation token carrying the human and the agent acting for them, scoped to one resource. Each call records a hash-chained, Ed25519-signed crumb, and the Merkle root of the whole log is anchored to Sigstore's public Rekor log. Per-entry signatures stop a forger without the key; the external anchor stops the operator, who could otherwise re-sign a rewritten history, because the rewritten root no longer matches the one already public.",
      },
      {
        heading: "Honest scope",
        content:
          "Crumb is a flight recorder, not a control plane: it is read-only, after-the-fact, and provable, and it points at the enforcement lane (Cerbos, Capsule, Astrix) rather than competing with it. Attribution is only as strong as the gateway's interposition, and the demo enforces that chokepoint. It is built entirely on real standards (OAuth 2.1 + PKCE, OIDC, RFC 8693/8707, the MCP authorization spec, RFC 6962 Merkle trees, Sigstore Rekor), a research-stage flagship I build in public.",
      },
    ],
  },
  {
    title: "Warden",
    subtitle: "Governed MCP Server with Live Evals & Tracing",
    description:
      "An AI agent answering questions over enterprise data through a governed Model Context Protocol server. RBAC is enforced outside the model, every run emits OpenTelemetry traces, and an LLM-as-judge eval suite proves the agent stays inside policy. Live public console at warden.alexlaguardia.dev: fire a real agent run, replay its trace, and watch the same question return different answers per role.",
    tech: [
      "Python",
      "FastAPI",
      "MCP SDK",
      "OpenTelemetry",
      "Claude API",
      "LLM-as-Judge Evals",
      "SQLite",
      "Next.js",
    ],
    highlights: [
      "Live click-to-use demo: real Claude agent runs through the governed server, traced end to end",
      "12/12 eval cases passing: accuracy, faithfulness, RBAC compliance, and honesty-on-denial, judged by a stronger model anchored to a deterministic oracle",
      "3 governance primitives (resource access, region row-scoping, field redaction) in one policy choke point the model cannot bypass",
    ],
    demo: "https://warden.alexlaguardia.dev",
    github: "https://github.com/AlexlaGuardia/warden",
    detail: [
      {
        heading: "The problem",
        content:
          "Give an AI agent tool access to company data and you inherit two hard questions: who is the agent acting as, and how do you know it behaved? A support agent asking about pipeline numbers must not get an answer the human is not allowed to see, and “it seemed fine in testing” is not something you can take to a security review. Warden is a complete, readable answer to both.",
      },
      {
        heading: "Governance outside the model",
        content:
          "The role comes from the session identity, like OAuth token scopes, and every read passes through a single GovernedStore choke point that applies resource-level access, region row-scoping, and field redaction. The model cannot widen its own access by prompting harder. The MCP server exposes four registry/dispatch tools instead of one tool per table, so adding a data source changes the registry, not the tool surface. When policy denies access, tools return a structured access_denied object and the agent is expected to report the limit honestly.",
      },
      {
        heading: "Evals that prove it",
        content:
          "A deterministic oracle computes ground truth through the same governance layer, so a correctly-denied answer scores as a pass instead of a miss. Claude Opus judges Claude Sonnet's answers anchored to that reference, cutting self-preference bias, and scores each run on accuracy, faithfulness to retrieved data, RBAC compliance, and honesty about limits. The 12-case golden set covers every governance primitive: 12/12 passing.",
      },
      {
        heading: "Traces and the live console",
        content:
          "Every run emits real OpenTelemetry spans with GenAI semantic attributes: a root agent span over each LLM completion and MCP tool call, captured by a custom in-process span processor and persisted to SQLite. The Next.js console replays them on a Gantt timeline, shows tool inputs and outputs with the enforcing role stamped on every result, and includes a side-by-side diff page where the same question is answered as admin, sales, and support. The public live-run endpoint is rate-limited per IP with a global daily budget.",
      },
    ],
  },
  {
    title: "Siege",
    subtitle: "Runtime Red-Team Harness for Live MCP Servers",
    description:
      "The offense leg of the governance suite: Warden governs, Crumb attributes, Siege proves it holds. Point Siege at a running MCP server and it attacks as real roles, handing back the findings a static manifest scan cannot see, because the bug is not in the tool description, it is in how the server behaves when you actually exercise it. Found and fixed a real leak in Warden this way: a support role had the tier field redacted from its output, but a filter predicate on accounts still leaked it. Live before/after demo at siege.alexlaguardia.dev: watch Siege catch the leak on the vulnerable build and clear it on the fix.",
    tech: [
      "Python",
      "MCP Protocol",
      "RBAC / Authz Probing",
      "Prompt-Injection Testing",
      "CLI",
      "JSON Reporting",
    ],
    highlights: [
      "Class A (authz / RBAC bypass): exercises the server as each role and diffs what comes back, catching redacted-field filter leaks and row-scope leaks a manifest grep never sees",
      "Class B (tool poisoning / injection): a behavioral probe that tests how the server actually responds to injected instructions, not just what its tool descriptions say",
      "One command against a live target (siege.cli scan --target), machine-readable JSON reports, and a before/after proof that regressions show up as findings",
    ],
    demo: "https://siege.alexlaguardia.dev",
    github: "https://github.com/AlexlaGuardia/siege",
    detail: [
      {
        heading: "Why runtime, not static",
        content:
          "The MCP security tools that exist today (MCP-Scan, Snyk Agent Scan, Cisco's scanner) read the tool manifest: they grep tool descriptions for poisoned instructions. That catches a real class of attack, but it cannot catch the class that only exists when the server runs. A redacted field that leaks through a filter predicate, a role that can row-scope past its grant, an injection that changes behavior rather than the manifest, none of those live in the description. Siege is the offense counterpart to Warden's defense: it proves the enforcement actually holds under attack.",
      },
      {
        heading: "How it works",
        content:
          "Siege connects to a live MCP server over stdio, enumerates its tools, and calls them as each real role. The authz probe learns what each role should and should not see from the most-permissive identity at runtime (no hardcoded fields or roles), then diffs actual responses against that model to surface RBAC and redaction bypasses. The injection probe measures behavioral drift under adversarial input. Every finding is severity-ranked and emitted as JSON for CI, so a governance regression fails the build instead of shipping quietly. HTTP transport is on the roadmap.",
      },
      {
        heading: "Honest scope",
        content:
          "Two detector classes are implemented (authz/RBAC bypass and tool poisoning/injection); more leak classes are on the roadmap. It is a build-in-public research harness, not a product, and its whole point is to be pointed at my own governance layer and try to break it, the same discipline I would want on any system that lets an agent touch real data.",
      },
    ],
  },
  {
    title: "Vigil",
    subtitle: "Cognitive Infrastructure for AI Agents",
    description:
      "An open-source Python library and hosted cloud platform that gives AI agents persistent awareness, coordinated signals, session handoff, and a knowledge base. Open-source core on PyPI, hosted tier at app.vigil-agent.com with GitHub OAuth, Stripe billing, and per-tenant isolation.",
    tech: [
      "Python",
      "FastAPI",
      "SQLite",
      "MCP Protocol",
      "Stripe",
      "GitHub OAuth",
      "PyPI",
      "MIT License",
    ],
    highlights: [
      "8,400+ lines, 311 tests, 4 PyPI releases, open-source core + hosted cloud tier",
      "v2.2 Cloud: multi-tenant API, GitHub OAuth, Stripe billing ($29/$79/$199), MCPWatch observability, dashboard",
      "3 transport modes, embedded dashboard, event triggers, signal compaction, session handoff chains",
    ],
    // github: "https://github.com/AlexlaGuardia/Vigil", // hidden: GitHub flagged
    detail: [
      {
        heading: "The problem",
        content:
          "AI agents today are stateless. Every session starts from zero, no awareness of what happened last time, no memory of decisions, no understanding of what\u2019s active right now. I built a production system that solved this across 6 different interfaces and 95+ tools. Vigil extracts those patterns into a standalone library anyone can use, and a hosted platform for teams that don\u2019t want to run their own infrastructure.",
      },
      {
        heading: "Open-source core",
        content:
          "Vigil ships as a complete cognitive layer. Signals let agents emit structured observations with type-based content budgets. An awareness daemon compiles signals into hot context every 90 seconds. Session handoff chains give agents structured continuity. A knowledge base stores persistent facts that survive signal compaction. Event triggers fire actions when patterns match incoming signals. Everything stores in a single SQLite file with zero external dependencies. pip install vigil-agent and you\u2019re running in 30 seconds.",
      },
      {
        heading: "Hosted cloud tier",
        content:
          "The v2.0 hosted platform at app.vigil-agent.com adds multi-tenancy on top of the open-source core. GitHub OAuth for login, per-tenant SQLite isolation with LRU-cached connections, API key auth with hashed storage, usage metering, and Stripe billing for Pro/Team/Enterprise tiers. Each tenant gets their own isolated Vigil instance, same awareness daemon, same signal protocol, zero infrastructure to manage. Built the entire hosted backend (1,295 lines across 11 files) in a single session.",
      },
      {
        heading: "Three ways to connect",
        content:
          "The MCP server exposes 15 tools over stdio or SSE, connect from Claude Code, Claude Desktop, or Cursor with one line of config. The REST API adds 25 endpoints with Bearer auth and an SSE event stream for real-time signal feeds. The embedded dashboard gives a live web view of awareness state, agents, signals, handoffs, and frames. All three share the same database, so a signal emitted via MCP shows up in the dashboard instantly. A Python SDK (vigil-client) wraps the REST API with 20+ methods for programmatic access.",
      },
    ],
  },
  {
    title: "Critik",
    subtitle: "AI Code Security Scanner",
    description:
      "An open-source, two-pass code security scanner built for the vibe-coding era. First pass uses regex and AST to catch patterns. Second pass runs an AI review with full file context to filter false positives and catch logic-level vulnerabilities. Zero config, one command.",
    tech: [
      "Python",
      "Tree-sitter",
      "Groq",
      "Llama 3.3 70B",
      "VS Code Extension",
      "GitHub Action",
      "PyPI",
      "MIT License",
    ],
    highlights: [
      "Two-pass architecture: regex + AST first, then AI review with full file context",
      "VS Code extension with inline diagnostics, GitHub Action for CI/CD, pre-commit hook",
      "4,400 lines, 138 tests, custom YAML rules, watch mode, baseline support",
    ],
    // github: "https://github.com/AlexlaGuardia/critik", // hidden: GitHub flagged
    devto:
      "https://dev.to/alexlaguardia",
    detail: [
      {
        heading: "The problem",
        content:
          "53% of AI-generated code has security vulnerabilities. Copilot autocompletes SQL injections. Cursor pastes API keys into public files. 35 new CVEs in March 2026 alone from AI-assisted code. Snyk charges $25+/mo. GitHub CodeQL only works on public repos. The indie developer security gap is wide open.",
      },
      {
        heading: "Two-pass scanning",
        content:
          "Pattern matching alone has too many false positives. AI alone hallucinates findings. Combining them gets accurate results on cheap infrastructure. Pass one runs regex patterns and Tree-sitter AST parsing to catch hardcoded secrets, SQL injection sinks, XSS vectors, and command injection patterns. Pass two sends flagged files to an LLM (Llama 3.3 70B via Groq) with full file context to confirm, reclassify, or dismiss each finding. The AI sees the whole file, not just the matching line.",
      },
      {
        heading: "Ship everywhere",
        content:
          "pip install critik && critik scan. That is the entire setup. The VS Code extension shows findings as inline diagnostics with severity levels and fix suggestions. The GitHub Action runs on every PR. The pre-commit hook catches issues before they reach the repo. Custom YAML rules let teams add their own patterns. Watch mode re-scans on file save. Baseline support lets you mark existing findings as accepted and only flag new ones.",
      },
    ],
  },
  {
    title: "BatchTrack",
    subtitle: "Published Shopify App for Perishable Inventory Tracking",
    description:
      "A Shopify app that tracks product batches and expiry dates for merchants who sell perishables, with threshold alerts and a daily email digest of what is expiring. Reviewed and approved by Shopify, live and installable on the Shopify App Store with managed billing, OAuth, and GDPR compliance webhooks.",
    tech: [
      "Remix",
      "TypeScript",
      "React",
      "Prisma",
      "SQLite",
      "Shopify App Bridge",
      "Polaris",
      "Managed Billing",
    ],
    highlights: [
      "Passed Shopify's app review (auth, HMAC, GDPR webhooks, TLS, billing) and published to the App Store",
      "Shopify managed pricing: free tier (up to 10 tracked products) + $9.99/mo Unlimited with a 14-day trial",
      "Embedded admin in Polaris, daily expiry digest via email, self-hosted under PM2 behind a Cloudflare tunnel",
    ],
    detail: [
      {
        heading: "The problem",
        content:
          "Merchants selling perishables, food, cosmetics, supplements, anything with a shelf life, have no native way in Shopify to track which batches expire when. They find out when a customer complains or when stock is already dead. BatchTrack adds a batch-and-expiry layer on top of their existing catalog: log a batch against a product variant, set the expiry, and get warned before it lapses.",
      },
      {
        heading: "Built on Shopify's real surface",
        content:
          "BatchTrack is a full embedded Shopify app, not a mockup. It uses the Shopify App Remix template with OAuth install, App Bridge, and a Polaris UI that renders inside the merchant's admin. Sessions and batch data persist in SQLite via Prisma. It implements the mandatory GDPR compliance webhooks (customer data request, customer redact, shop redact) that Shopify requires before an app can be listed.",
      },
      {
        heading: "Billing the Shopify way",
        content:
          "Pricing runs through Shopify Managed Pricing: a free tier capped at ten tracked products and a $9.99/mo Unlimited plan with a 14-day trial, all hosted on Shopify's own pricing page so merchants subscribe without ever leaving the admin. Feature gating reads the merchant's live subscription state to enforce the free-tier cap. Getting this past review meant matching the in-app plan handles to the Partner Dashboard exactly and routing upgrades to the hosted page instead of the Billing API.",
      },
      {
        heading: "Shipped and reviewed",
        content:
          "The app passed Shopify's full automated and human review, authentication, redirect handling, HMAC verification, compliance webhooks, TLS, and billing, and is published on the Shopify App Store. It runs self-hosted under PM2 behind a Cloudflare tunnel, with a daily cron that emails each merchant a digest of expiring batches. It is early (no install base yet), but it is a real, externally-reviewed product on a major marketplace.",
      },
    ],
  },
  {
    title: "Scionbee",
    subtitle: "Greenhouse Operations & Compliance Platform",
    description:
      "A mobile-first operations app built for a commercial greenhouse crew: bay-level crop tracking, feed/irrigation/spray logging, pesticide re-entry (WPS) compliance, and shrink-loss ROI analytics. Bilingual (English/Spanish), offline-first for the field, with a grounded AI assistant that answers from real site data.",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma",
      "SQLite",
      "Tailwind CSS",
      "PWA / Offline Queue",
      "Groq / Llama 3.3",
      "i18n (en/es)",
    ],
    highlights: [
      "Company → Site → House → Bay → Crop model with role-based PIN auth (worker/manager) and full en/es localization",
      "WPS pesticide compliance: tank-mix spray records, binding re-entry interval (longest REI in the mix), PA applicator-record PDF, 2-year retention",
      "Shrink ROI dashboard, 2-tap loss capture turns crop losses into live dollars-lost analytics for managers",
      "Offline-first queue that syncs when back online; the Bee, a grounded AI assistant that answers only from site data and cites its sources",
    ],
    detail: [
      {
        heading: "The problem",
        content:
          "Greenhouses run on paper and memory. Crews hand-water hundreds of bays, log sprays on clipboards, and lose entire trays when a watering gets skipped or a re-entry interval is misjudged. The data that proves loss, and the safety rules that prevent it, live in someone’s head. I built Scionbee for a real commercial greenhouse to put crop tracking, chemical compliance, and loss accounting into one phone-friendly app that a Spanish-speaking field crew can actually use.",
      },
      {
        heading: "Built for the field",
        content:
          "Everything is mobile-first and offline-first: workers log placements, waterings, and sprays from the greenhouse floor, and the app queues submissions to sync when signal returns. Auth is a per-area PIN with a profile picker, so a shared device still attributes each action to the right person. The entire interface is localized in English and Spanish because the crew is. The data model mirrors the physical world (Company, Site, House, Bay, Crop), so a manager and a worker are always talking about the same place.",
      },
      {
        heading: "Compliance done right",
        content:
          "Pesticide application is regulated under the federal Worker Protection Standard. Scionbee records each application as a tank mix of one or more products, each with its own rate and amount, and computes the binding re-entry interval as the longest REI across the mix, the legally correct rule, not a guess. Restricted-entry windows drive a lockout badge on every affected bay, applications generate a PA Private Applicator Record as a PDF, and a query layer enforces the 2-year retention requirement. Getting REI wrong sends a worker into a treated bay too early; the system is designed so that can’t happen by accident.",
      },
      {
        heading: "Turning loss into dollars",
        content:
          "The standout feature is shrink. When a crop is pulled, a worker marks it lost in two taps; placement quantity and per-variety wholesale price turn that into a real dollar figure. Managers get a dashboard showing dollars lost, loss by cause and by crop, and honesty-coverage so the number is trustworthy. It reframes a vague gut feeling (“we lose a lot to neglect”) into a measured P&L line a grower can act on, the capture step at the worker level is what makes the ROI real over a season.",
      },
      {
        heading: "The Bee: grounded AI assistant",
        content:
          "A worker can ask the Bee plain questions, “what’s growing in JW5?”, “is this bay safe to enter?”, “what do I spray for powdery mildew?”, in English or Spanish. The retriever pulls only site-scoped facts (bay contents, feed recipes, REI status, spray history, a recommendation guide), tags each with its source, and the model is hard-constrained to answer only from those facts and cite them, or say it doesn’t know. It is retrieval-grounded by design, so it never invents safety or recipe data.",
      },
    ],
  },
  {
    title: "Stampwerk",
    subtitle: "AI Freelancer Business Tool",
    description:
      "A $12/mo HoneyBook alternative built after three freelancer tools died in two months. AI writes proposals from 5 questions, contracts auto-generate from accepted proposals, invoices chase themselves with a 3-step follow-up daemon.",
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "Groq",
      "Llama 3.3 70B",
      "Stripe",
      "SQLite",
      "Resend",
    ],
    highlights: [
      "AI proposals powered by Llama 3.3 70B, answer 5 questions, get a structured proposal in 2 minutes",
      "Connected flow: proposal \u2192 contract \u2192 invoice \u2192 automated follow-up, no manual steps",
      "3-step AI follow-up daemon sends escalating reminders so you never chase clients",
    ],
    detail: [
      {
        heading: "The displacement event",
        content:
          "HoneyBook hiked prices 89% in 2025 and the loyalty discount expired Feb 2026. AND.CO shut down March 1, 2026. Bonsai got acquired by Zoom. Three displacement events in sixty days. I was paying $29/mo for HoneyBook and using two features: proposals and invoice reminders. Stampwerk does the 80% that matters at $12/mo flat.",
      },
      {
        heading: "AI that actually works",
        content:
          "Most freelancer tools bolt on AI as template-fill. Stampwerk uses Groq with Llama 3.3 70B to generate real proposals from five inputs: client name, project type, scope, timeline, and budget. The output is a structured document with scope, deliverables, pricing, and timeline. Not a form letter. When a client accepts, a contract auto-generates with the proposal terms. One-click e-signature. Signed contracts trigger milestone invoices through Stripe.",
      },
      {
        heading: "The daemon",
        content:
          "The follow-up daemon is the feature nobody else has. Most tools make you manually hit send reminder. Stampwerk sends a friendly nudge at 3 days overdue, a firmer reminder at 7, and a final notice at 14. Configurable per client. The daemon runs on an hourly cycle, checking all outstanding invoices and sending the appropriate escalation. You do the work. The software chases the money.",
      },
    ],
  },
  {
    title: "Supra Engine",
    subtitle: "3D Game Engine in Rust",
    description:
      "A custom 3D FPS game engine built from scratch in Rust. Features a hand-rolled Entity Component System, wgpu-based rendering, rapier3d physics, and a full movement state machine inspired by Apex Legends. Designed for multiplayer from day one.",
    tech: [
      "Rust",
      "wgpu",
      "rapier3d",
      "Custom ECS",
      "Lua Scripting",
      "glam",
    ],
    highlights: [
      "85K+ lines of Rust across 8 crates (render, physics, ECS, input, assets, scripting)",
      "Movement system: walk, sprint, slide, wall-run, wall-bounce, bunny hop, mantle",
      '"Rust for the engine, Lua for the game", clean separation of systems and gameplay',
    ],
    detail: [
      {
        heading: "Why build from scratch?",
        content:
          "Every game engine makes tradeoffs that become your constraints. I wanted to understand the render pipeline at the metal level, how frames get to the screen, how physics ticks sync with render ticks, how an ECS actually works under the hood. Building from scratch means owning every decision and every line. When something breaks at 3am, there\u2019s no mystery.",
      },
      {
        heading: "The movement system",
        content:
          "Movement is the most important system in an FPS. If it doesn\u2019t feel right in the first 10 seconds, players leave. Supra\u2019s movement is a velocity-driven state machine: walk, sprint, slide, jump, air-strafe, bunny hop, wall-run, wall-bounce, and mantle. Each state defines its own physics, slide has friction decay, wall-run has gravity reduction and a timer, bunny hop preserves momentum on frame-perfect jumps. The goal was a parkour playground that\u2019s fun with zero objectives.",
      },
      {
        heading: "Architecture",
        content:
          "8 Rust crates organized as a workspace: core, window (winit), render (wgpu pipeline), input, ECS (custom archetype-based), assets (async loading), physics (rapier3d), and script (Lua). Every component is serializable and physics is deterministic, designed for multiplayer from day one. The philosophy: Rust for the engine, Lua for the game. A scripting layer lets gameplay logic iterate without recompiling the engine.",
      },
    ],
  },
  {
    title: "Paradise",
    subtitle: "Multi-Strategy Trading System",
    description:
      "An autonomous trading intelligence platform running four independent strategies across forex, stocks, and prediction markets. Features institutional-grade risk management with a three-layer oversight system.",
    tech: [
      "Python",
      "OANDA API",
      "Alpaca API",
      "Polymarket",
      "SQLite",
      "PM2",
    ],
    highlights: [
      "4 strategies (position trading, scalping, prediction markets, funding rate arbitrage)",
      "3-layer risk system: signal quality gate, portfolio risk management, discipline enforcement",
      "Thesis-driven investment pipeline with automated research cycles",
    ],
    detail: [
      {
        heading: "Four cats, four personalities",
        content:
          'Each strategy operates independently with its own thesis, timeframe, and risk parameters. Lion is patient, weekly and daily charts, position trading, thesis-driven entries. Cheetah is fast, M5 timeframe, London session scalping. Tiger scans Polymarket for prediction market opportunities. Jaguar runs funding rate arbitrage: long spot, short perpetual, delta-neutral, collecting the spread across three exchanges. They don\u2019t coordinate. They don\u2019t need to.',
      },
      {
        heading: "The birds",
        content:
          "Risk oversight runs in three layers. The signal quality gate filters entries before they reach execution, bad thesis, bad risk/reward, no trade. Hawk monitors portfolio-level risk in real-time: position sizing, correlation, exposure limits. Eagle enforces discipline: no revenge trading, no overtrading, mandatory cooldowns after losses. The system protects capital from the most dangerous risk factor in trading, the trader.",
      },
      {
        heading: "Paper to production",
        content:
          "Everything runs in paper trading mode through OANDA and Alpaca. The discipline of treating paper money like real money is the point, same position sizes, same rules, same journaling. Every position has a documented thesis, automated research refreshes, and clear invalidation criteria. When the track record proves out across market conditions, real capital follows.",
      },
    ],
  },
  {
    title: "Guardia Content",
    subtitle: "AI-Powered SaaS Platform",
    description:
      "A social media automation platform built end-to-end for client billing, with public launch pending Meta platform approval. Content flows through an AI pipeline, styling, caption generation, quality control, scheduling, and publishing, all orchestrated by named AI agents with isolated worker processes.",
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "React",
      "SQLite",
      "Tailwind",
      "Stripe",
      "AI Pipeline",
    ],
    highlights: [
      "Full content automation: upload to published post with zero manual steps",
      "Multi-agent architecture: Artemis (style), Mercury (captions), Argus (QC)",
      "Production SaaS with Stripe billing, OAuth, and custom domain support",
    ],
    detail: [
      {
        heading: "The pipeline",
        content:
          "Content enters as a raw upload and flows through a chain of AI agents, each with a single responsibility. Artemis handles visual styling via Replicate SDXL, transforming images to match a client\u2019s brand aesthetic. Mercury generates captions using Groq\u2019s Llama 3.3 70B, fast, cheap, and surprisingly good at matching brand voice. Argus runs quality control, scoring each piece before it\u2019s allowed to publish. Everything runs as isolated PM2 workers, so a failure in styling doesn\u2019t block caption generation.",
      },
      {
        heading: "Real users, real constraints",
        content:
          "This isn\u2019t a toy, it\u2019s built to process content for clients on a recurring schedule, and that shaped every decision. Error recovery has to be graceful. The scheduling system handles timezone-aware posting windows. Stripe handles billing with tiered plans and add-on services. Custom domain support lets clients serve their content hub on their own domain via Cloudflare for SaaS. The platform is complete and deployed; public launch is gated on Meta\u2019s app-review approval for the Instagram and Facebook publishing scopes.",
      },
      {
        heading: "Infrastructure",
        content:
          "Python/FastAPI backend with 48 concurrent PM2 services on a single VPS, Next.js frontend, 7 SQLite databases, and Cloudflare tunnel for zero-port-exposure hosting. The whole thing runs on an 8GB Hetzner box. Resource discipline matters when you\u2019re not throwing money at infrastructure.",
      },
    ],
  },
  {
    title: "Akatskii",
    subtitle: "Cognitive AI Architecture",
    description:
      "A multi-LLM cognitive layer that routes thoughts to different language models based on complexity, fast pattern matching to Groq, deep reasoning to Claude, vision to Gemini. Features semantic memory with vector embeddings and an agentic tool loop.",
    tech: [
      "Python",
      "FastAPI",
      "Groq",
      "Anthropic",
      "Google AI",
      "fastembed",
      "ONNX",
    ],
    highlights: [
      "Thought routing: complexity-based LLM selection optimizing cost and latency",
      "Semantic memory with cosine similarity search and hybrid recall",
      "Context compaction: extracts facts, drops noise, creates continuity across sessions",
    ],
    detail: [
      {
        heading: "The routing problem",
        content:
          "Different tasks need different LLMs. A quick status check shouldn\u2019t cost the same as deep architectural reasoning. The thought router analyzes incoming requests and selects the optimal model: fast pattern matching to Groq (Llama 3.3 70B), complex reasoning to Claude, vision tasks to Gemini. The router considers complexity, required capabilities, cost, and latency. Most requests resolve on the cheapest model. The ones that need more get it automatically. The routing logic was mature enough to extract into a standalone open-source library, llm-route, published on PyPI.",
      },
      {
        heading: "Memory that persists",
        content:
          "LLMs forget everything between sessions. Akatskii doesn\u2019t. Semantic memory uses fastembed with all-MiniLM-L6-v2, a 22MB embedding model running on ONNX Runtime, no PyTorch required. Recall is hybrid: keyword search plus cosine similarity, with a boost for memories found by both methods. Below a 0.25 similarity threshold, results are treated as noise. The result is genuine continuity across conversations.",
      },
      {
        heading: "Context compaction",
        content:
          "As conversations grow, context windows fill with noise. The compaction layer extracts structured facts, decisions made, code written, problems identified, and drops the filler. This compressed context carries forward across sessions, giving continuity without token waste. The system also runs an agentic tool loop: think, decide on a tool, execute, observe, repeat, until the task is complete or it decides to ask for help.",
      },
    ],
  },
  {
    title: "Guardia MCP",
    subtitle: "Model Context Protocol Server",
    description:
      "A custom MCP server exposing 95+ tools across business operations, trading, creative writing, and infrastructure. Features frame-based filtering, each interface sees only the tools relevant to its context.",
    tech: ["Python", "MCP Protocol", "SSE Transport", "OAuth", "Tool Registry"],
    highlights: [
      "95+ tools organized by domain with decorator-based auto-registration",
      "Frame filtering: core (14), serberus (23), paradise (25), luna (55), all (95+)",
      "Bridges AI assistants to every system in the stack via a single protocol",
    ],
    // github: "https://github.com/AlexlaGuardia/guardia-mcp", // hidden: GitHub flagged
    detail: [
      {
        heading: "The problem with 70+ tools",
        content:
          "When an AI assistant connects to a server with 95 tools, it drowns in schemas. Frame-based filtering solves this: each interface declares its context (trading, creative writing, system admin), and the server returns only the relevant tools. My trading interface sees trading tools. My fiction-writing interface sees lore tools. Frames only affect discovery, all tools remain callable regardless, so an interface can reach across domains when needed.",
      },
      {
        heading: "Auto-registration",
        content:
          "Every tool is a decorated Python function. The decorator captures the function\u2019s name, docstring, and type hints, then auto-generates the MCP schema. Adding a new tool means writing a function and dropping it in the right module. No manual schema files. No registration boilerplate. The registry handles discovery, filtering, and execution dispatch.",
      },
      {
        heading: "Bridging everything",
        content:
          "Through a single SSE connection, an AI assistant can query databases, restart services, check trading positions, read creative lore, manage client content, and orchestrate background tasks. It turns any MCP-compatible client into an operator for the entire infrastructure. One protocol, one endpoint, every system.",
      },
    ],
  },
  {
    title: "MCP Server Suite",
    subtitle: "Premium MCP Servers for Major Platforms",
    description:
      "Production-grade MCP servers for underserved SaaS platforms. Four servers exposing 53-73 tools each (262 total) with full CRUD, reports, and system diagnostics, filling gaps where 12,000+ existing servers offer 3-5 tools at most.",
    tech: [
      "Python",
      "MCP Protocol",
      "httpx",
      "OAuth2",
      "REST APIs",
      "PyPI",
    ],
    highlights: [
      "mcp-mailchimp: 71 tools for 12M Mailchimp users (campaigns, audiences, e-commerce, analytics, webhooks, A/B testing)",
      "mcp-woocommerce: 73 tools for 5M+ WooCommerce stores (products, orders, refunds, reports, shipping, tax, gateways)",
      "mcp-activecampaign: 65 tools for 185K+ ActiveCampaign users (contacts, deals, campaigns, scoring, segments, forms, goals)",
      "mcp-freshbooks: 53 tools for 30M FreshBooks users (invoices, recurring billing, 5 report types, workflow tools) with full OAuth2",
    ],
    // github: "https://github.com/AlexlaGuardia/mcp-woocommerce", // hidden: GitHub flagged
    detail: [
      {
        heading: "The gap",
        content:
          "The MCP ecosystem has 12,000+ servers, but less than 5% are production-grade. Major platforms like FreshBooks (30M users), WooCommerce (5M stores), Mailchimp (12M users), and ActiveCampaign (185K businesses) had zero comprehensive MCP coverage. The best existing servers offered 3-5 tools, barely scratching the API surface. Each server in this suite covers 25-34 tools: full CRUD, reporting, and proper error handling.",
      },
      {
        heading: "Covering what competitors skip",
        content:
          "Most MCP servers handle basic reads. These handle the full lifecycle: create invoices, process payments, manage campaigns, pull financial reports. The FreshBooks server implements full OAuth2 with automatic token refresh, a complexity barrier that keeps weekend builders out. The WooCommerce server covers 8 API categories including analytics. The Mailchimp server handles campaign creation through performance reporting. The ActiveCampaign server wraps the entire API v3 surface with built-in rate limiting and auto-retry. Every response is structured and predictable, not raw API dumps.",
      },
      {
        heading: "Distribution strategy",
        content:
          "Each server ships simultaneously to PyPI (pip install), GitHub (MIT license, public), and MCP registries (Smithery, mcp.so). The stack is intentionally simple: Python, httpx, FastMCP. No heavy frameworks, no Docker required. Environment variable auth, stdio transport. Point it at your store or account and go.",
      },
    ],
  },
  {
    title: "mcpcat",
    subtitle: "MCP Server CLI Inspector",
    description:
      "A CLI tool that connects to any MCP server and pretty-prints available tools, schemas, and lets you call them interactively. Like curl, but for the Model Context Protocol.",
    tech: ["Python", "Typer", "httpx", "Rich", "MCP Protocol"],
    highlights: [
      "4 commands: tools, inspect, call, ping, everything you need to debug an MCP server",
      "Auto-detects transport mode (streamable HTTP vs SSE), point it at a URL, it figures out the rest",
      "~250 lines across two files. Pip-installable. Fills a tooling gap in the MCP ecosystem.",
    ],
    // github: "https://github.com/AlexlaGuardia/MCPcat", // hidden: GitHub flagged
    devto:
      "https://dev.to/alexlaguardia/i-built-a-cli-inspector-for-mcp-servers-2f1m",
    detail: [
      {
        heading: "The gap",
        content:
          "MCP is new enough that the tooling gap is wide open. When building a 70+ tool MCP server, every schema change meant reading source code or wiring up a test client to verify what was exposed. There was no curl equivalent, no way to just point at a server and see what\u2019s there. That\u2019s the gap mcpcat fills.",
      },
      {
        heading: "Transport detection",
        content:
          "MCP has two transport modes: the original SSE-based flow and the newer streamable HTTP. The first version only handled SSE and hung against my own server, which uses streamable HTTP. The fix: try a plain GET first. If the server returns JSON with protocol info, it\u2019s streamable HTTP. If not, fall back to SSE. Simple, but it took a real failure to discover the need.",
      },
      {
        heading: "Keep it small",
        content:
          "The entire tool is about 250 lines across two files. Python, Typer for the CLI, httpx for HTTP, Rich for pretty tables. Four commands: tools, inspect, call, ping. Sometimes the most useful tools are the smallest ones.",
      },
    ],
  },
];

function ProjectCard({
  project,
  index,
  expanded,
  onToggle,
}: {
  project: Project;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="group relative">
      <div
        className={`relative border rounded-lg p-8 transition-all duration-300 bg-surface overflow-hidden ${
          expanded
            ? "project-card-expanded border-accent/30"
            : "border-border hover:border-accent/20"
        } ${isEven ? "" : "md:ml-12"}`}
      >
        {/* Left accent bar, animates in when expanded */}
        <div className="project-card-bar" aria-hidden="true" />

        {/* Clickable header */}
        <div
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-accent mb-1">
                {project.subtitle}
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {project.title}
              </h3>
            </div>
            {/* Chevron, morphs on expand */}
            <div
              className={`shrink-0 mt-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                expanded
                  ? "bg-accent/15 text-accent"
                  : "bg-transparent text-muted group-hover:text-foreground"
              }`}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted">
              <span className="text-accent mt-1 shrink-0">&#9656;</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1 rounded-full bg-accent/5 text-accent/80 border border-accent/10"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expandable detail */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pt-8 mt-6 border-t border-border">
              {/* Deep dive sections, staggered fade-in */}
              <div className="space-y-6">
                {project.detail.map((section, i) => (
                  <div
                    key={i}
                    className={expanded ? "detail-section" : ""}
                    style={
                      expanded
                        ? { animationDelay: `${0.05 + i * 0.08}s` }
                        : undefined
                    }
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {section.heading}
                    </h4>
                    <p className="text-muted leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Links */}
              {(project.github || project.devto) && (
                <div
                  className={`flex flex-wrap gap-3 mt-8 pt-6 border-t border-border/50 ${expanded ? "detail-section" : ""}`}
                  style={
                    expanded
                      ? { animationDelay: `${0.05 + project.detail.length * 0.08}s` }
                      : undefined
                  }
                >
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-4 py-2 bg-accent text-background font-medium rounded hover:bg-accent/90 transition-colors"
                    >
                      Live Demo &rarr;
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-4 py-2 border border-accent/40 text-accent rounded hover:bg-accent/10 transition-colors"
                    >
                      View on GitHub &rarr;
                    </a>
                  )}
                  {project.devto && (
                    <a
                      href={project.devto}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-4 py-2 text-muted hover:text-foreground transition-colors"
                    >
                      Read on Dev.to &rarr;
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="projects" className="reveal py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-16">
          <span className="font-mono text-accent text-lg">02.</span>
          What I&apos;ve Built
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              expanded={expandedIndex === i}
              onToggle={() =>
                setExpandedIndex(expandedIndex === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
