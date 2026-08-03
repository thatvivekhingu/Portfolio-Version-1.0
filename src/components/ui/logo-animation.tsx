"use client";

import { motion } from "motion/react";
import Image from "next/image";

export const AnimatedLogo = ({
  className = "w-7 h-7",
  onClick,
}: {
  theme?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-full border border-cyan-500/40 shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all ${className}`}
    >
      <Image
        src="/logo/personal-logo.jpg"
        alt="Vivek Hingu Logo"
        fill
        className="object-cover rounded-full"
        priority
      />
    </motion.div>
  );
};