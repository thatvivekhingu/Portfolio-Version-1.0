"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

interface IntroItem {
  type?: "question" | "role" | "granted";
  text: string;
  gradient?: string;
  glowColor?: string;
}

const INTRO_SEQUENCE: IntroItem[] = [
  { type: "question", text: "> Who am I?" },
  {
    type: "role",
    text: "AI/ML Engineer",
    gradient: "from-cyan-400 via-sky-400 to-indigo-500",
    glowColor: "rgba(56, 189, 248, 0.5)",
  },
  {
    type: "role",
    text: "Content Creator",
    gradient: "from-amber-400 via-yellow-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    type: "role",
    text: "Hackathon Addict",
    gradient: "from-rose-400 via-pink-500 to-purple-600",
    glowColor: "rgba(244, 63, 94, 0.5)",
  },
  {
    type: "role",
    text: "Tech Explorer",
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    glowColor: "rgba(52, 211, 153, 0.5)",
  },
  { type: "granted", text: "Access Granted." },
];

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [step, setStep] = useState(0);
  const [questionChars, setQuestionChars] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Session storage check
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenIntro_v3");
      if (hasSeen === "true") {
        setShouldShow(false);
      } else {
        setShouldShow(true);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // Sequence Controller
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let timer: NodeJS.Timeout;

    // Step 0: Type out "> Who am I?"
    if (step === 0) {
      const fullQ = INTRO_SEQUENCE[0].text;
      if (questionChars < fullQ.length) {
        timer = setTimeout(() => {
          setQuestionChars((prev) => prev + 1);
          playTapSound("hover");
        }, 60);
      } else {
        // Pause 600ms after question before revealing roles
        timer = setTimeout(() => {
          setStep(1);
          playTapSound("pop");
        }, 600);
      }
      return () => clearTimeout(timer);
    }

    // Step 1 to 4: Reveal Roles one by one
    if (step >= 1 && step <= 4) {
      timer = setTimeout(() => {
        setStep((prev) => prev + 1);
        playTapSound("pop");
      }, 700); // 700ms interval between roles
      return () => clearTimeout(timer);
    }

    // Step 5: "Access Granted."
    if (step === 5) {
      playTapSound("chime");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 1000);
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, step, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_v3", "true");
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

  const questionText = INTRO_SEQUENCE[0].text.slice(0, questionChars);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 1.05 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950 text-foreground select-none overflow-hidden"
      >
        {/* Subtle Ambient Theme Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-amber-500/15 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 px-3.5 py-1.5 rounded-full border border-border/80 bg-zinc-900/80 backdrop-blur-md text-xs font-mono text-muted-foreground hover:text-amber-400 hover:border-amber-500/40 hover:bg-zinc-900 transition-all duration-300 shadow-lg"
        >
          Skip Intro →
        </button>

        {/* Main Content Box */}
        <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center space-y-6 text-center">
          {/* Question Prompt */}
          <div className="flex items-center text-lg sm:text-2xl font-mono text-amber-400 font-bold tracking-wide">
            <span>{questionText}</span>
            {step === 0 && (
              <span className="inline-block w-2.5 h-5 sm:h-6 ml-2 bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            )}
          </div>

          {/* Roles Stack */}
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 w-full pt-2">
            {INTRO_SEQUENCE.slice(1, 5).map((item, idx) => {
              const itemStepIndex = idx + 1;
              if (step < itemStepIndex) return null;

              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 16, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex items-center justify-center"
                >
                  <span
                    className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                    style={{
                      filter: `drop-shadow(0 0 24px ${item.glowColor})`,
                    }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Access Granted Badge */}
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pt-6"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/50 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-emerald-300 uppercase">
                  Access Granted.
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Transition Laser Pulse */}
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-x-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.9)] pointer-events-none"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
