"use client";

import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { playTapSound } from "@/lib/sound";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = (e: React.MouseEvent<SVGSVGElement>) => {
    playTapSound("chime");
    setIsToggling(true);
    setTimeout(() => setIsToggling(false), 600);

    const next = theme === "dark" ? "light" : "dark";

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const doc = document as Document & {
      startViewTransition?: (cb: () => unknown) => { finished: Promise<void>; ready: Promise<void> };
    };

    if (typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    const transition = doc.startViewTransition(() => {
      setTheme(next);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: theme === "dark" ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement:
            theme === "dark"
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
        }
      );
    });
  };

  return (
    <div className="flex relative items-center mr-4">
      {/* Sun Icon for Light Mode */}
      <IconSun
        onClick={handleToggle}
        className={`absolute cursor-pointer h-5 w-5 text-amber-500 dark:text-zinc-300 dark:hidden hover:text-amber-400 transition-all duration-300 hover:scale-125 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Light Mode"
      />

      {/* Moon Icon for Dark Mode */}
      <IconMoonStars
        onClick={handleToggle}
        className={`absolute cursor-pointer h-5 w-5 hidden text-indigo-400 dark:block hover:text-indigo-300 transition-all duration-300 hover:scale-125 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Dark Mode"
      />
    </div>
  );
}