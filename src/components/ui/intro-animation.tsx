"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

const INTRO_CARDS = [
  { id: "q", text: "> Who am I?", isQuestion: true },
  { id: "aiml", title: "AI/ML Engineer", sub: "Autonomous Systems & Models" },
  { id: "creator", title: "Content Creator", sub: "Sharing Tech & AI Knowledge" },
  { id: "hackathon", title: "Hackathon Addict", sub: "Building Under Pressure" },
  { id: "explorer", title: "Tech Explorer", sub: "Pushing Frontiers" },
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
      const hasSeen = sessionStorage.getItem("hasSeenIntro_4dx");
      if (hasSeen === "true") {
        setShouldShow(false);
      } else {
        setShouldShow(true);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // 4DX Cinema Single-Line Timeline Engine
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let timer: NodeJS.Timeout;

    // Index 0: Typing out "> Who am I?"
    if (currentIndex === 0) {
      const qText = INTRO_CARDS[0].text;
      if (questionChars < qText.length) {
        timer = setTimeout(() => {
          setQuestionChars((prev) => prev + 1);
          playTapSound("hover");
        }, 55);
      } else {
        // Pause 700ms after question, then move to first role
        timer = setTimeout(() => {
          setCurrentIndex(1);
          playTapSound("pop");
        }, 700);
      }
      return () => clearTimeout(timer);
    }

    // Index 1 to 4: Single line 4DX role cards (appear -> pause -> next)
    if (currentIndex >= 1 && currentIndex <= 4) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        playTapSound("pop");
      }, 1100); // Display each single line for 1.1s before swapping
      return () => clearTimeout(timer);
    }

    // Index 5: ACCESS GRANTED
    if (currentIndex === 5) {
      playTapSound("chime");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 900);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, currentIndex, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_4dx", "true");
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

  const activeCard = INTRO_CARDS[currentIndex];
  const questionText = INTRO_CARDS[0].text.slice(0, questionChars);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="intro-viewport"
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 1.06 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-[#F8FAFC] select-none overflow-hidden"
        >
          {/* Deep 4DX Anamorphic Ambient Specular Flares */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-slate-400/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

          {/* 4DX Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-xs font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-black/90 transition-all duration-300 shadow-2xl"
          >
            Skip Intro →
          </button>

          {/* 4DX Single-Line Stage Container */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center min-h-[220px] text-center">
            <AnimatePresence mode="wait">
              {/* Question Phase */}
              {currentIndex === 0 && (
                <motion.div
                  key="question-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center text-xl sm:text-3xl font-mono text-cyan-400 font-bold tracking-wider"
                >
                  <span>{questionText}</span>
                  <span className="inline-block w-3 h-6 sm:h-7 ml-2 bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(0,240,255,0.9)]" />
                </motion.div>
              )}

              {/* Single Line Role Cards (One by One) */}
              {currentIndex >= 1 && currentIndex <= 4 && (
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 30, scale: 0.92, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, scale: 1.08, filter: "blur(12px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center space-y-3"
                >
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-100 drop-shadow-[0_0_35px_rgba(255,255,255,0.35)]">
                    {activeCard.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-cyan-400/80 tracking-widest uppercase">
                    — {activeCard.sub} —
                  </p>
                </motion.div>
              )}

              {/* Access Granted Final Card */}
              {currentIndex === 5 && (
                <motion.div
                  key="granted-card"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-cyan-950/60 border border-cyan-500/50 backdrop-blur-md shadow-[0_0_40px_rgba(0,240,255,0.5)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] text-cyan-300 uppercase">
                      ACCESS GRANTED.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Anamorphic 4DX Laser Line Transition */}
          {isTransitioning && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="absolute inset-x-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(0,240,255,1)] pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
