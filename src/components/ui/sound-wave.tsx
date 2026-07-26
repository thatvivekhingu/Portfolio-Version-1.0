"use client";

import React from "react";

interface SoundWaveProps {
  className?: string;
  color?: string;
}

/**
 * Animated sound wave component with 6 vertical bars
 * Each bar animates independently for a smooth wave effect
 * Supports both solid colors and gradients
 */
export const SoundWave = ({ className = "", color = "currentColor" }: SoundWaveProps) => {
  const bars = [
    { delay: "0ms", duration: "0.8s" },
    { delay: "0.1s", duration: "0.9s" },
    { delay: "0.2s", duration: "0.85s" },
    { delay: "0.15s", duration: "0.95s" },
    { delay: "0.05s", duration: "0.88s" },
    { delay: "0.25s", duration: "0.92s" },
  ];

  // Check if color is a gradient
  const isGradient = color.startsWith('linear-gradient') || color.startsWith('radial-gradient');

  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      {bars.map((bar, index) => {
        const barStyle: React.CSSProperties = {
          animationDelay: bar.delay,
          animationDuration: bar.duration,
          transition: 'background 0.8s ease-in-out, background-color 0.8s ease-in-out',
        };

        // Only set one background property to avoid React warning
        if (isGradient) {
          barStyle.background = color;
        } else {
          barStyle.backgroundColor = color;
        }

        return (
          <div
            key={index}
            className="w-[3px] h-full rounded-full animate-sound-wave"
            style={barStyle}
          />
        );
      })}
    </div>
  );
};
