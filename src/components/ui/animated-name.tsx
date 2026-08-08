"use client";

import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export const INITIAL_REVEAL_MS = 1100;
export const SWAP_REVEAL_MS = 600;
export const HOLD_MS = 5000;

export type Phase = "initial" | "hold" | "exit" | "enter";
export type Suffix = "hingu" | "tag";

interface AnimatedNameProps {
  phase?: Phase;
  suffix?: Suffix;
  onExitComplete?: () => void;
  className?: string;
}

export function AnimatedName({ className }: AnimatedNameProps) {
  const nameText = "Vivek Hingu";
  const letters = nameText.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      scale: 0.8,
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap items-center justify-center gap-[0.02em] cursor-pointer group", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          whileHover={{
            scale: 1.25,
            y: -6,
            rotate: index % 2 === 0 ? 8 : -8,
            transition: { duration: 0.15 },
          }}
          className="inline-block bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-950 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:via-indigo-400 group-hover:to-amber-400 transition-all duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.2)]"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
