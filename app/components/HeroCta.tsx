"use client";

// A/B test `hero-cta-copy`: control = "See my work", test = "See what I've shipped".
// Goal event `hero_cta_click` carries the variant; posthog-js also stamps every
// event with $feature/hero-cta-copy, which is what the experiment metric reads.

import { useEffect, useState } from "react";
import posthog from "posthog-js";

export const HERO_CTA_EXPERIMENT = "hero-cta-copy";
const COPY: Record<string, string> = {
  control: "See my work",
  test: "See what I've shipped",
};

export function HeroCta() {
  const [variant, setVariant] = useState<string>("control");
  useEffect(() => {
    if (!posthog.__loaded) return;
    return posthog.onFeatureFlags(() => {
      const v = posthog.getFeatureFlag(HERO_CTA_EXPERIMENT);
      if (typeof v === "string" && v in COPY) setVariant(v);
    });
  }, []);
  return (
    <a
      href="#projects"
      onClick={() => posthog.capture("hero_cta_click", { variant })}
      className="px-6 py-3 bg-accent/10 border border-accent/40 text-accent rounded hover:bg-accent/20 transition-colors text-sm font-medium"
    >
      {COPY[variant]}
    </a>
  );
}
