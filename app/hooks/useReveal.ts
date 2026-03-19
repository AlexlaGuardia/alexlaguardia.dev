"use client";

import { useEffect, useRef } from "react";

/**
 * Adds the "visible" class to the returned ref element when it enters the
 * viewport. Combine with the .reveal / .reveal.visible CSS classes in
 * globals.css for a zero-dependency scroll-reveal effect.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in view on mount (e.g. top of page), show immediately
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
