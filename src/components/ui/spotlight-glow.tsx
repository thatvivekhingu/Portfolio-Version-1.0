"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightGlowProps {
  /** Any CSS color for the light. Keep the alpha low for a subtle effect. */
  color?: string;
  /** Diameter of the light in px. */
  size?: number;
  className?: string;
}

/**
 * A cursor-following radial highlight that simulates light hitting a surface.
 *
 * Drop it inside any element that is `position: relative` and has the
 * `group/glow` class (and ideally `overflow-hidden` so the light is clipped to
 * the rounded corners). It attaches a pointer listener to its parent, so it
 * never blocks clicks or hovers on the content underneath.
 */
export function SpotlightGlow({
  color = "rgba(255, 255, 255, 0.12)",
  size = 300,
  className,
}: SpotlightGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const handleMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    };

    parent.addEventListener("pointermove", handleMove);
    return () => parent.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100",
        className
      )}
      style={{
        background: `radial-gradient(${size}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${color}, transparent 70%)`,
      }}
    />
  );
}
