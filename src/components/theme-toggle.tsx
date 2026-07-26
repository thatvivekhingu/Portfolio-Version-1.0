"use client";

// import { Button } from "@/components/ui/button";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState } from "react";


export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    // Triggers the spin-grow keyframe (500ms, defined in tailwind.config.js).
    const spinIcon = () => {
      setIsToggling(true);
      setTimeout(() => setIsToggling(false), 500);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => unknown) => { finished: Promise<void> };
    };

    if (typeof doc.startViewTransition !== "function") {
      setTheme(next);
      spinIcon();
      return;
    }

    // Run the view transition first so the page palette cross-fades, THEN
    // spin the now-visible icon. Otherwise the cross-fade snapshot freezes
    // the icon mid-spin and the animation reads as a flicker.
    const transition = doc.startViewTransition(() => setTheme(next));
    transition.finished.then(spinIcon).catch(() => spinIcon());
  };

  return (
    <div className="flex relative items-center mr-4">
      {/* Sun Icon for Light Mode */}
      <IconSun
        onClick={handleToggle}
        className={`absolute cursor-pointer h-5 w-5 text-zinc-500 dark:text-zinc-300 dark:hidden hover:text-zinc-950 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Light Mode"
      />

      {/* Moon Icon for Dark Mode */}
      <IconMoonStars
        onClick={handleToggle}
        className={`absolute cursor-pointer h-5 w-5 hidden text-zinc-500 dark:block dark:text-zinc-300 hover:text-zinc-50 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Dark Mode"
      />
    </div>
  );
}