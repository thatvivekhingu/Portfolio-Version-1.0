"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Custom HTML cursor that follows the mouse. Position is locked to the
// pointer; only rotation/scale carry physics so the emoji reacts to motion
// without ever drifting away from the cursor.
//
// Triggered by any ancestor element carrying `data-cursor-emoji="<emoji>"`.
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<string | null>(null);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let vx = 0;
    let vy = 0;
    let angle = 0;
    let angleVel = 0;
    let lastPlaneTarget = 0;
    let scale = 1;
    let hasMouse = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMouse) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        hasMouse = true;
      }

      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor-emoji]",
      ) as HTMLElement | null;
      const next = target?.dataset.cursorEmoji ?? null;

      if (next !== emojiRef.current) {
        // Reset rotation when switching widgets so it doesn't carry over.
        if (!emojiRef.current && next) {
          angle = 0;
          angleVel = 0;
          lastPlaneTarget = 0;
        }
        emojiRef.current = next;
        setEmoji(next);
      }
    };

    const onLeaveWindow = () => {
      if (emojiRef.current !== null) {
        emojiRef.current = null;
        setEmoji(null);
      }
    };

    const tick = () => {
      // Smoothed velocity from per-frame mouse delta.
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      vx = vx * 0.75 + dx * 0.25;
      vy = vy * 0.75 + dy * 0.25;

      const speed = Math.hypot(vx, vy);
      const current = emojiRef.current;

      // Target angle by emoji type
      let targetAngle = 0;
      if (current === "✈️") {
        // Airplane points in motion direction; when slow/stopped, hold the
        // last heading instead of snapping back to the default orientation.
        if (speed > 0.6) {
          lastPlaneTarget = Math.atan2(vy, vx) + Math.PI / 4;
        }
        targetAngle = lastPlaneTarget;
      } else if (current) {
        // Other emojis: gentle horizontal lean, clamped, decays to 0
        targetAngle = Math.max(-0.35, Math.min(0.35, vx * 0.02));
      }

      // Angular spring — soft swing toward target, no wild oscillation.
      // Wrap delta to [-π, π] so the airplane crossing ±π takes the short path
      // (otherwise tiny vy noise while moving left flips target between +π and
      // -π and the spring spins all the way around).
      const TAU = Math.PI * 2;
      let angleDelta = targetAngle - angle;
      angleDelta = ((angleDelta + Math.PI) % TAU + TAU) % TAU - Math.PI;
      angleVel = (angleVel + angleDelta * 0.12) * 0.82;
      angle += angleVel;
      if (angle > Math.PI) angle -= TAU;
      else if (angle < -Math.PI) angle += TAU;

      // Subtle scale on speed
      const targetScale = 1 + Math.min(speed * 0.006, 0.12);
      scale += (targetScale - scale) * 0.18;

      const el = cursorRef.current;
      if (el) {
        // 32×32 element centered at the mouse via -16/-16 offset.
        el.style.transform = `translate3d(${mouseX - 16}px, ${mouseY - 16}px, 0) rotate(${angle}rad) scale(${scale})`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted) return null;

  // Portaled to document.body so no ancestor transform breaks fixed positioning.
  return createPortal(
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-8 w-8 select-none items-center justify-center text-2xl leading-none"
      style={{
        display: emoji ? "flex" : "none",
        willChange: "transform",
      }}
    >
      {emoji}
    </div>,
    document.body,
  );
}
