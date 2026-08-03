"use client";
import React, { JSX, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme-toggle";
import { useTheme } from "next-themes";
import { AnimatedLogo } from "../ui/logo-animation"
import { useTransitionRouter } from "next-view-transitions";
import { CommandPaletteButton } from "../command-palette/command-palette-button";
import { IconBrandGithub, IconStar } from "@tabler/icons-react";
import { useGitHubStars } from "@/hooks/useGitHubStars";

const FALLBACK_REPO_URL = "https://github.com/thatvivekhingu/thatvivekhingu-PFL";
// import Link from "next/link";
// import Image from "next/image";


export const Navbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: starsData } = useGitHubStars();
  const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
  const stars = starsData?.stars ?? 0;
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const router = useTransitionRouter();


  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {

    if (typeof current === "number") {
      const previous = scrollY.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (current < 50) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavClick = (link: string) => {
    if (link.startsWith("/")) {
      router.push(link);
      return;
    }
    if (window.location.pathname !== "/") {
      router.push(`/#${link}`);
      return;
    }
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    router.push("/"); // Navigate to the home page
  };



  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex sm:max-w-5xl w-full justify-self-center backdrop-blur-lg fixed top-0 sm:top-4 inset-x-0 mx-auto md:rounded-lg sm:bg-none dark:bg-background/10 sm:dark:bg-background/20 bg-white/30 z-[5000] pr-4 pl-6 py-4 items-center justify-between",
            className
          )}

        >
          {/* Logo on the left */}
          <div className="flex items-center mr-4 sm:mr-16">
            {mounted && (
              <AnimatedLogo
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                className="w-6 h-6 sm:w-7 sm:h-7"
                onClick={handleLogoClick}
              />
            )}
          </div>

          {/* Links in the center */}
          <div className="flex items-center gap-3 sm:gap-6 ml-auto mr-0 sm:mr-4">
            {navItems.map((navItem, idx) => (
              <button
                key={`link=${idx}`}
                onClick={() => handleNavClick(navItem.link)}
                className={cn(
                  "relative font-semibold text-slate-700 dark:text-muted-foreground items-center flex space-x-1 hover:text-black dark:hover:text-white transition-colors duration-300"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </button>
            ))}
            <span
              aria-hidden
              className="h-5 w-px self-center bg-zinc-300/60 dark:bg-zinc-700/60"
            />
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Star this site on GitHub (${stars} stars)`}
              className="group inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 hover:bg-background/70 hover:border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconBrandGithub className="h-3.5 w-3.5" />
              <span className="flex items-center gap-0.5 tabular-nums">
                <IconStar className="h-3 w-3 transition-colors group-hover:text-amber-400 group-hover:animate-spin-grow" />
                {stars}
              </span>
            </a>
            <CommandPaletteButton />
            <ModeToggle />
          </div>

          <div className="flex items-center">
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};