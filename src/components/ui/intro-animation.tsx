"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

interface IntroLine {
  year?: string;
  arrow?: string;
  text: string;
}

const INTRO_TIMELINE: IntroLine[] = [
  { year: "2005", arrow: " → ", text: "A Curious Mind" },
  { year: "2023", arrow: " → ", text: "Started Building" },
  { year: "2025", arrow: " → ", text: "Creating with AI" },
  { year: "2026", arrow: " → ", text: "Solving Real Problems" },
  { text: "The Journey Continues..." },
];

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Session storage check
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenIntro_v2");
      if (hasSeen === "true") {
        setShouldShow(false);
      } else {
        setShouldShow(true);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // Typewriter Engine
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let timer: NodeJS.Timeout;

    // Initial 0.8s delay before typing begins
    if (currentLineIndex === 0 && typedChars === 0) {
      timer = setTimeout(() => {
        setTypedChars(1);
      }, 800);
      return () => clearTimeout(timer);
    }

    const currentLine = INTRO_TIMELINE[currentLineIndex];
    if (!currentLine) return;

    const fullText = (currentLine.year ? `${currentLine.year}${currentLine.arrow}${currentLine.text}` : currentLine.text);

    if (typedChars < fullText.length) {
      timer = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
        if (typedChars % 3 === 0) {
          playTapSound("hover");
        }
      }, 40); // 40ms per character
    } else {
      // Completed current line, pause 700ms before next line
      if (currentLineIndex < INTRO_TIMELINE.length - 1) {
        timer = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setTypedChars(0);
        }, 700);
      } else {
        // Final line typed out, pause 1000ms then start transition
        timer = setTimeout(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            handleComplete();
          }, 1200);
        }, 1000);
      }
    }

    return () => clearTimeout(timer);
  }, [shouldShow, currentLineIndex, typedChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_v2", "true");
    } catch {
      // Ignore storage errors
    }
    setIsComplete(true);
  };

  const handleSkip = () => {
    playTapSound("pop");
    handleComplete();
  };

  if (shouldShow === null || !shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 1.04 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-[#F5F5F5] font-mono select-none overflow-hidden"
      >
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#182232_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-zinc-400 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300"
        >
          Skip Intro →
        </button>

        {/* Text Container */}
        <div className="relative z-10 w-full max-w-xl px-6 flex flex-col space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
          {INTRO_TIMELINE.map((line, lineIdx) => {
            if (lineIdx > currentLineIndex) return null;

            const isCurrentLine = lineIdx === currentLineIndex;
            const fullLineText = line.year ? `${line.year}${line.arrow}${line.text}` : line.text;
            const visibleTextLength = isCurrentLine ? typedChars : fullLineText.length;

            let yearPortion = "";
            let arrowPortion = "";
            let textPortion = "";

            if (line.year) {
              const yearLen = line.year.length;
              const arrowLen = (line.arrow || "").length;

              if (visibleTextLength <= yearLen) {
                yearPortion = line.year.slice(0, visibleTextLength);
              } else if (visibleTextLength <= yearLen + arrowLen) {
                yearPortion = line.year;
                arrowPortion = (line.arrow || "").slice(0, visibleTextLength - yearLen);
              } else {
                yearPortion = line.year;
                arrowPortion = line.arrow || "";
                textPortion = line.text.slice(0, visibleTextLength - yearLen - arrowLen);
              }
            } else {
              textPortion = line.text.slice(0, visibleTextLength);
            }

            return (
              <div key={lineIdx} className="flex items-center min-h-[28px] tracking-wide">
                {line.year && (
                  <span className="text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                    {yearPortion}
                  </span>
                )}
                {arrowPortion && <span className="text-zinc-500">{arrowPortion}</span>}
                <span className={line.year ? "text-[#F5F5F5]" : "text-cyan-300 font-semibold italic pt-2"}>
                  {textPortion}
                </span>

                {/* Blinking Cursor */}
                {isCurrentLine && (
                  <span className="inline-block w-2 h-4 sm:h-5 ml-1.5 bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Transition Laser Line Effect */}
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-x-0 top-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.9)] pointer-events-none"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
