"use client";

// Client-side PostHog: autocapture + pageviews + session replay.
// Static export bakes NEXT_PUBLIC_POSTHOG_KEY in at build time; with no key
// the provider renders children untouched, so a keyless build is a no-op.

import { useEffect } from "react";
import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!KEY || posthog.__loaded) return;
    posthog.init(KEY, {
      api_host: HOST,
      defaults: "2025-05-24", // history_change pageviews + person profiles only on identify
      capture_pageview: "history_change",
      capture_pageleave: true,
      session_recording: { maskAllInputs: true },
      person_profiles: "identified_only",
    });
  }, []);
  return <>{children}</>;
}
