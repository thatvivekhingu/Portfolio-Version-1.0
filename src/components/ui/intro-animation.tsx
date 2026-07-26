"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

interface IntroCardItem {
  id: string;
  text?: string;
  title?: string;
  sub?: string;
  isQuestion?: boolean;
  isGranted?: boolean;
}

const INTRO_CARDS: IntroCardItem[] = [
  { id: "q", text: "> Who am I?", isQuestion: true },
  { id: "aiml", title: "AI/ML Engineer", sub: "Autonomous Systems & Neural Models" },
  { id: "creator", title: "Content Creator", sub: "Sharing Tech & AI Knowledge" },
  { id: "hackathon", title: "Hackathon Addict", sub: "Building Intelligent Software Under Pressure" },
  { id: "explorer", title: "Tech Explorer", sub: "Pushing the Frontiers of Innovation" },
  { id: "granted", title: "ACCESS GRANTED.", isGranted: true },
];

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionChars, setQuestionChars] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Session storage check
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenIntro_4dx_v3");
      if (hasSeen === "true") {
        setShouldShow(false);
      } else {
        setShouldShow(true);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // 4DX Cinema Timeline Engine
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let timer: NodeJS.Timeout;

    // Index 0: Typing out "> Who am I?"
    if (currentIndex === 0) {
      const qText = INTRO_CARDS[0]?.text ?? "> Who am I?";
      if (questionChars < qText.length) {
        timer = setTimeout(() => {
          setQuestionChars((prev) => prev + 1);
          playTapSound("hover");
        }, 70);
      } else {
        // Pause 900ms after question, then move to first role
        timer = setTimeout(() => {
          setCurrentIndex(1);
          playTapSound("pop");
        }, 900);
      }
      return () => clearTimeout(timer);
    }

    // Index 1 to 4: Single line 4DX role cards (1.6s display per card)
    if (currentIndex >= 1 && currentIndex <= 4) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        playTapSound("pop");
      }, 1600); // 1.6 seconds display per card
      return () => clearTimeout(timer);
    }

    // Index 5: ACCESS GRANTED (2.6s hold for deep security authorization feel)
    if (currentIndex === 5) {
      playTapSound("chime");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 1100);
      }, 2600); // Hold ACCESS GRANTED badge for 2.6 seconds
      return () => clearTimeout(timer);
    }
  }, [shouldShow, currentIndex, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_4dx_v3", "true");
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

  const activeCard = INTRO_CARDS[currentIndex] ?? INTRO_CARDS[0];
  const questionText = (INTRO_CARDS[0]?.text ?? "> Who am I?").slice(0, questionChars);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="intro-viewport"
          initial={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
          animate={
            isTransitioning
              ? {
                  opacity: [1, 1, 0],
                  clipPath: "circle(0% at 50% 50%)",
                }
              : {
                  opacity: 1,
                  clipPath: "circle(150% at 50% 50%)",
                }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-[#F8FAFC] select-none overflow-hidden"
        >
          {/* Deep Anamorphic Cinematic Flares */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-slate-400/10 to-indigo-500/10 rounded-full blur-[110px] pointer-events-none opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-xs font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-black/90 transition-all duration-300 shadow-2xl"
          >
            Skip Intro →
          </button>

          {/* 4DX Stage Container */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center min-h-[240px] text-center">
            <AnimatePresence mode="wait">
              {/* Question Phase */}
              {currentIndex === 0 && (
                <motion.div
                  key="question-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center text-2xl sm:text-4xl font-mono text-cyan-400 font-bold tracking-wider"
                >
                  <span>{questionText}</span>
                  <span className="inline-block w-3 h-7 sm:h-9 ml-2.5 bg-cyan-400 animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.9)]" />
                </motion.div>
              )}

              {/* Single Line Role Cards (1.6s Optimal Pacing) */}
              {currentIndex >= 1 && currentIndex <= 4 && (
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 35, scale: 0.92, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -35, scale: 1.08, filter: "blur(12px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center space-y-4"
                >
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-100 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    {activeCard.title ?? ""}
                  </h2>
                  <p className="text-xs sm:text-base font-mono text-cyan-400/90 tracking-widest uppercase">
                    — {activeCard.sub ?? ""} —
                  </p>
                </motion.div>
              )}

              {/* Authentic High-Tech Security Clearance Card (2.6s Hold) */}
              {currentIndex === 5 && (
                <motion.div
                  key="granted-card"
                  initial={{ opacity: 0, scale: 0.82, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-emerald-400/90 tracking-[0.25em] uppercase">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>SYSTEM VERIFIED // IDENTITY CONFIRMED</span>
                  </div>

                  <div className="relative px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-emerald-950/50 border-2 border-emerald-500/70 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.5)]">
                    <span className="font-mono text-base sm:text-xl font-black tracking-[0.35em] text-emerald-300 uppercase">
                      [ ACCESS GRANTED ]
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center Iris Shutter Opening Pulse */}
          {isTransitioning && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 8, 25], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-400 to-white shadow-[0_0_100px_rgba(0,240,255,1)] pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
