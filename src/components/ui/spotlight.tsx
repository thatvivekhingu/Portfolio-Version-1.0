import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

/**
 * Parses a CSS gradient string to extract color values
 * Returns an array of colors or null if not a gradient
 */
function parseGradient(gradientString: string): string[] | null {
  if (!gradientString.startsWith('linear-gradient')) {
    return null;
  }

  // Extract colors from the gradient string
  const colorRegex = /rgba?\([^)]+\)/g;
  const colors = gradientString.match(colorRegex);
  return colors || null;
}

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  const gradientColors = fill ? parseGradient(fill) : null;
  const isGradient = gradientColors && gradientColors.length >= 2;

  // Generate a unique ID for this spotlight instance
  const gradientId = React.useId();

  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <defs>
        {isGradient && (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor={gradientColors[0]}
              stopOpacity="0.21"
              style={{ transition: 'stop-color 0.8s ease-in-out' }}
            />
            <stop
              offset="100%"
              stopColor={gradientColors[1]}
              stopOpacity="0.21"
              style={{ transition: 'stop-color 0.8s ease-in-out' }}
            />
          </linearGradient>
        )}
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={isGradient ? `url(#${gradientId})` : fill || "white"}
          fillOpacity={isGradient ? "1" : "0.21"}
          style={{ transition: 'fill 0.8s ease-in-out, fill-opacity 0.8s ease-in-out' }}
        ></ellipse>
      </g>
    </svg>
  );
};
