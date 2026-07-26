"use client";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const INITIAL_REVEAL_MS = 1100;
export const SWAP_REVEAL_MS = 600;
export const HOLD_MS = 5000;

const GRADIENT_TEXT =
    "bg-gradient-to-b from-zinc-200 dark:from-zinc-50 to-zinc-950 dark:to-zinc-300 bg-clip-text text-transparent pb-[0.5em] -mb-[0.5em]";

const CLIP_REVEALED = "inset(0 0% 0 0)";
const CLIP_CLIPPED = "inset(0 100% 0 0)";

export type Phase = "initial" | "hold" | "exit" | "enter";
export type Suffix = "hingu" | "tag";

interface AnimatedNameProps {
    phase: Phase;
    suffix: Suffix;
    onExitComplete?: () => void;
    className?: string;
}

export function AnimatedName({
    phase,
    suffix,
    onExitComplete,
    className,
}: AnimatedNameProps) {
    const hinguRef = useRef<HTMLSpanElement>(null);
    const tagRef = useRef<HTMLSpanElement>(null);
    const [widths, setWidths] = useState<{ hingu: number; tag: number } | null>(
        null,
    );

    useLayoutEffect(() => {
        const measure = () => {
            const hingu = hinguRef.current?.getBoundingClientRect().width;
            const tag = tagRef.current?.getBoundingClientRect().width;
            if (hingu && tag) setWidths({ hingu, tag });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    useEffect(() => {
        if (!document.fonts?.ready) return;
        document.fonts.ready.then(() => {
            const hingu = hinguRef.current?.getBoundingClientRect().width;
            const tag = tagRef.current?.getBoundingClientRect().width;
            if (hingu && tag) setWidths({ hingu, tag });
        });
    }, []);

    const measureClass = cn(
        "absolute left-[-9999px] top-0 invisible whitespace-pre pointer-events-none",
        className,
    );
    const measureSpans = (
        <>
            <span ref={hinguRef} aria-hidden="true" className={measureClass}>
                {" Hingu"}
            </span>
            <span ref={tagRef} aria-hidden="true" className={measureClass}>
                {" Hingu"}
            </span>
        </>
    );

    if (phase === "initial") {
        return (
            <>
                <motion.span
                    initial={{ clipPath: CLIP_CLIPPED }}
                    animate={{ clipPath: CLIP_REVEALED }}
                    transition={{
                        duration: INITIAL_REVEAL_MS / 1000,
                        ease: [0.6, 0.05, 0.3, 1],
                    }}
                    className={cn("inline-block", GRADIENT_TEXT, className)}
                >
                    Vivek Hingu
                </motion.span>
                {measureSpans}
            </>
        );
    }

    const restWidth = widths?.[suffix];
    const slotInitial = phase === "enter" ? 0 : restWidth;
    const slotTarget = phase === "exit" ? 0 : restWidth;

    const innerInitialClip =
        phase === "enter" ? CLIP_CLIPPED : CLIP_REVEALED;
    const innerTargetClip =
        phase === "exit" ? CLIP_CLIPPED : CLIP_REVEALED;

    const slotMotionProps = widths
        ? {
              initial: { width: slotInitial },
              animate: { width: slotTarget },
          }
        : {};

    const suffixText = " Hingu";

    return (
        <span className={cn("inline-block", className)}>
            Vivek
            <motion.span
                key={phase}
                {...slotMotionProps}
                transition={{
                    duration: SWAP_REVEAL_MS / 1000,
                    ease: "easeInOut",
                }}
                onAnimationComplete={() => {
                    if (phase === "exit") onExitComplete?.();
                }}
                style={{
                    display: "inline-block",
                    verticalAlign: "baseline",
                    whiteSpace: "pre",
                }}
            >
                <motion.span
                    initial={{ clipPath: innerInitialClip }}
                    animate={{ clipPath: innerTargetClip }}
                    transition={{
                        duration: SWAP_REVEAL_MS / 1000,
                        ease: "easeInOut",
                    }}
                    style={{ display: "inline-block" }}
                    className={GRADIENT_TEXT}
                >
                    {suffixText}
                </motion.span>
            </motion.span>
            {measureSpans}
        </span>
    );
}
