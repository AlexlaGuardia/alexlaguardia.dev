"use client";

// Client-side PostHog: autocapture + pageviews + session replay + flags.
// Static export bakes NEXT_PUBLIC_POSTHOG_KEY in at build time; with no key
// nothing initialises, so a keyless build is a no-op.
//
// Init runs at module load, not in an effect: child effects (flag readers
// like OssReceipt) run BEFORE a parent's effect, so an effect-based init
// would leave every flag consumer looking at an uninitialised client.

import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (typeof window !== "undefined" && KEY && !posthog.__loaded) {
  posthog.init(KEY, {
    api_host: HOST,
    defaults: "2025-05-24", // history_change pageviews + person profiles only on identify
    capture_pageview: "history_change",
    capture_pageleave: true,
    session_recording: { maskAllInputs: true },
    person_profiles: "identified_only",
  });
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
