"use client";

// Gated by the PostHog feature flag `hero-oss-receipt`. Renders nothing until
// flags load, so the card never flashes a line the flag then removes.

import { useEffect, useState } from "react";
import posthog from "posthog-js";

export const OSS_RECEIPT_FLAG = "hero-oss-receipt";

export function OssReceipt() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!posthog.__loaded) return;
    return posthog.onFeatureFlags(() => setOn(posthog.isFeatureEnabled(OSS_RECEIPT_FLAG) === true));
  }, []);
  if (!on) return null;
  return (
    <p className="bc-tagline bc-receipt">
      6 merged PRs: PostHog, fastmcp, Profility
    </p>
  );
}
