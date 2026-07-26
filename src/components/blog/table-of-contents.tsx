"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/blog-utils";

interface Props {
    headings: Heading[];
}

// Fraction of viewport height from the top that counts as the "active line".
// A heading is considered active once its top has scrolled above this line.
const ACTIVE_OFFSET_FRACTION = 0.25;

export function TableOfContents({ headings }: Props) {
    const [activeSlug, setActiveSlug] = useState<string | null>(
        headings[0]?.slug ?? null
    );

    useEffect(() => {
        if (headings.length === 0) return;

        let rafId: number | null = null;

        // Compute each heading's "activation point" — the scrollY value at
        // which it should become active — and pick the latest heading whose
        // activation point has been passed.
        //
        // On TALL articles, each activation point is the natural one (where
        // the heading's top would reach the active band).
        //
        // On SHORT articles, natural activation points exceed maxScroll
        // because the document isn't tall enough to scroll the later headings
        // into the band. Without compensation, only the first heading ever
        // activates naturally and the bar appears to jump directly to the
        // last when bottom-of-page is hit. Solution: scale the natural points
        // proportionally so the last heading activates exactly at maxScroll —
        // intermediate headings end up evenly distributed across the
        // available scroll range and the bar steps through them in order.
        function update() {
            rafId = null;
            if (headings.length === 0) return;

            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const maxScroll = Math.max(1, docHeight - viewportHeight);
            const offsetPx = viewportHeight * ACTIVE_OFFSET_FRACTION;

            // Natural activation point per heading.
            const naturalPoints: number[] = [];
            let lastValid = 0;
            let foundAny = false;
            for (const h of headings) {
                const el = document.getElementById(h.slug);
                if (el) {
                    foundAny = true;
                    const top = el.getBoundingClientRect().top + scrollY;
                    lastValid = Math.max(0, top - offsetPx);
                }
                naturalPoints.push(lastValid);
            }

            const lastNatural = naturalPoints[naturalPoints.length - 1];

            // Bail out and reset to first heading when either:
            //  - No headings have been rendered to the DOM yet (e.g. client-
            //    side nav timing — useEffect fires before the markdown's
            //    h2/h3 IDs are queryable). Without this, every natural point
            //    is 0, the loop below marks every heading "reached" at
            //    scrollY=0, and activeIdx lands on the last heading.
            //  - Every heading is at or above the offset band (all natural
            //    points 0). User is at the top of a very dense article;
            //    still want the bar on the first heading until they scroll.
            if (!foundAny || lastNatural === 0) {
                setActiveSlug(headings[0].slug);
                if (!foundAny) {
                    // DOM may catch up — retry once on the next frame.
                    rafId = requestAnimationFrame(update);
                }
                return;
            }

            // Compress to fit within scrollable range when the doc is short.
            const scale = lastNatural > maxScroll ? maxScroll / lastNatural : 1;
            const adjustedPoints = naturalPoints.map((p) => p * scale);

            // Latest heading whose adjusted activation point has been reached.
            let activeIdx = 0;
            for (let i = 0; i < adjustedPoints.length; i++) {
                if (scrollY >= adjustedPoints[i]) {
                    activeIdx = i;
                } else {
                    break;
                }
            }

            const newSlug = headings[activeIdx]?.slug ?? null;
            setActiveSlug((prev) => (prev !== newSlug ? newSlug : prev));
        }

        function onScroll() {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(update);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        // window 'load' covers the case where layout shifts after fonts /
        // images finish loading. In dev mode (slower rendering + Strict Mode
        // double-effects), the initial measurements are often taken against
        // a not-yet-final layout, so this catch-up listener matters most.
        window.addEventListener("load", onScroll);

        // Multiple kick-offs to handle dev-mode timing where the DOM /
        // layout isn't fully ready when the effect first runs:
        //   - synchronous immediately
        //   - next animation frame (after first paint)
        //   - 100ms later (after layout shifts from font load typically settle)
        update();
        const settleRaf = requestAnimationFrame(update);
        const settleTimeout = window.setTimeout(update, 100);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            window.removeEventListener("load", onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
            cancelAnimationFrame(settleRaf);
            clearTimeout(settleTimeout);
        };
    }, [headings]);

    const handleClick = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        const el = document.getElementById(slug);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${slug}`);
    };

    if (headings.length === 0) return null;

    return (
        <nav aria-label="Table of contents">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
                On this page
            </p>
            {/*
              relative wrapper anchors the static gray "track" and the animated
              active bar. The active bar uses layoutId so Framer animates it
              between item positions when activeSlug changes, instead of one
              border hard-flipping color while another flips back.
            */}
            <ul className="relative">
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-border/60"
                />

                {headings.map((h) => {
                    const isActive = activeSlug === h.slug;
                    return (
                        <li key={h.slug} className="relative">
                            {isActive && (
                                <motion.div
                                    layoutId="toc-active-bar"
                                    aria-hidden
                                    className="absolute left-0 top-0 bottom-0 w-0.5 -ml-px bg-foreground"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 32,
                                    }}
                                />
                            )}
                            <a
                                href={`#${h.slug}`}
                                onClick={(e) => handleClick(e, h.slug)}
                                className={cn(
                                    "block py-1.5 text-sm leading-snug transition-colors duration-200",
                                    h.level === 3 ? "pl-7" : "pl-4",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {h.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
