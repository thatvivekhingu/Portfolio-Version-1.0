"use client";

import { motion } from "motion/react";
import { useState } from "react";

export const AnimatedLogo = ({
  theme,
  className,
  onClick,
}: {
    theme: "dark" | "light";
    className?: string;
    onClick?:() => void;
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        if (onClick) {
          onClick();
        }
        setIsAnimating(true); 
    };
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375 375"
            className={className}
        >
            <rect
                width="100%"
                height="100%"
                fill="transparent"
                onClick={handleClick}
            />

            {/* Animated VH Monogram Path */}
            <motion.path
                d="M 60 90 L 130 285 L 160 285 L 220 90 L 185 90 L 145 220 L 95 90 Z M 215 90 L 215 285 L 245 285 L 245 195 L 295 195 L 295 285 L 325 285 L 325 90 L 295 90 L 295 165 L 245 165 L 245 90 Z"
                fill="none"
                stroke={theme === "dark" ? "#818cf8" : "#4f46e5"}
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1400"
                strokeDashoffset="2500"
                initial={{
                    strokeDashoffset: isAnimating ? 2800 : 0,
                }}
                animate={{
                    strokeDashoffset: isAnimating ? 0 : 2800,
                }}
                transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                }}
                style={{
                    transition: "stroke 0.5s ease-in-out",
                }}
                onClick={handleClick}
            />
        </motion.svg>
    );
};