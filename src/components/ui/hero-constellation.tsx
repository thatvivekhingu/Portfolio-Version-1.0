"use client";

import { useEffect, useRef } from "react";

function getDotCount(desktop = 1500, mobile = 250) {
  if (typeof window === "undefined") return desktop;
  return window.innerWidth < 768 ? mobile : desktop;
}

function AnimatedDots({ desktopDots = 1500, mobileDots = 250 }: { desktopDots?: number; mobileDots?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    // Mouse tracking
    let mouseX = -9999;
    let mouseY = -9999;
    const MOUSE_RADIUS = 160;
    const MOUSE_FORCE = 0.35;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // If mouse is outside canvas bounds, treat as gone
      if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        mouseX = -9999;
        mouseY = -9999;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const colors = ["255, 255, 255"];

    interface Dot {
      x: number;
      y: number;
      baseVx: number;
      baseVy: number;
      pushVx: number;
      pushVy: number;
      radius: number;
      baseOpacity: number;
      phase: number;
      pulseSpeed: number;
      color: string;
    }

    let dots: Dot[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initDots() {
      dots = [];

      const padX = width * 0.04;
      const padY = height * 0.04;
      const areaW = width - padX * 2;
      const areaH = height - padY * 2;

      const dotCount = getDotCount(desktopDots, mobileDots);
      for (let i = 0; i < dotCount; i++) {
        const x = padX + Math.random() * areaW;
        const y = padY + Math.random() * areaH;

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * 0.3;

        dots.push({
          x,
          y,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          pushVx: 0,
          pushVy: 0,
          radius: 0.5 + Math.random() * 0.6,
          baseOpacity: 0.5 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.0008 + Math.random() * 0.0015,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    let lastTime = 0;

    function animate(time: number) {
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;

      ctx!.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const halfW = width / 2;
      const halfH = height / 2;
      const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

      for (const dot of dots) {
        // Mouse interaction — repel + slight swirl
        const dmx = dot.x - mouseX;
        const dmy = dot.y - mouseY;
        const distSq = dmx * dmx + dmy * dmy;

        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / MOUSE_RADIUS;
          const force = MOUSE_FORCE * falloff * falloff;

          const nx = dmx / dist;
          const ny = dmy / dist;

          // Add to push velocity only (repel + slight swirl)
          dot.pushVx += (nx * force + ny * force * 0.3) * (dt / 16);
          dot.pushVy += (ny * force - nx * force * 0.3) * (dt / 16);
        }

        // Dampen only the push velocity so dots settle back
        dot.pushVx *= 0.97;
        dot.pushVy *= 0.97;

        // Move by base drift + push
        dot.x += (dot.baseVx + dot.pushVx) * (dt / 16);
        dot.y += (dot.baseVy + dot.pushVy) * (dt / 16);

        if (dot.x < -20) dot.x = width + 20;
        if (dot.x > width + 20) dot.x = -20;
        if (dot.y < -20) dot.y = height + 20;
        if (dot.y > height + 20) dot.y = -20;

        dot.phase += dot.pulseSpeed * dt;
        const pulse = (Math.sin(dot.phase) + 1) / 2;
        const opacity = dot.baseOpacity * (0.3 + pulse * 0.7);

        const dx = (dot.x - cx) / halfW;
        const dy = (dot.y - cy) / halfH;
        const edgeDist = dx * dx + dy * dy;
        const vignette = Math.max(0, 1 - edgeDist * 0.7);

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        const isDark = document.documentElement.classList.contains("dark");
        const rgb = isDark ? "255, 255, 255" : "30, 30, 30";
        ctx!.fillStyle = `rgba(${rgb}, ${opacity * vignette * (isDark ? 0.7 : 1)})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    initDots();
    animationId = requestAnimationFrame(animate);

    let lastWidth = window.innerWidth;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const widthChanged = window.innerWidth !== lastWidth;
        lastWidth = window.innerWidth;
        resize();
        // Only reshuffle dots when width actually changes (e.g. orientation change).
        // Mobile address-bar show/hide fires resize but only changes height — keep dots stable.
        if (widthChanged) {
          initDots();
        }
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [desktopDots, mobileDots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export function HeroConstellation({ desktopDots = 1500, mobileDots = 250 }: { desktopDots?: number; mobileDots?: number } = {}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatedDots desktopDots={desktopDots} mobileDots={mobileDots} />
    </div>
  );
}
