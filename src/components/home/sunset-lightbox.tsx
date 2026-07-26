"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";
import type { SunsetPhoto } from "@/lib/sunsets";

export interface LightboxState {
    photo: SunsetPhoto;
    /** The element to return focus to when the lightbox closes. */
    trigger: HTMLElement | null;
}

/**
 * Full-screen photo viewer. The grow/shrink itself is driven by the View
 * Transitions API in earth.tsx: the clicked thumbnail and the image below share
 * the `sunset-zoom` transition name, so the browser morphs one into the other.
 *
 * Rendered through a portal to document.body so its `fixed` positioning is
 * resolved against the viewport — the section is wrapped in a BlurFade whose
 * CSS `filter` would otherwise trap `fixed` inside that (offset) box.
 */
export function SunsetLightbox({
    state,
    onClose,
}: {
    state: LightboxState | null;
    onClose: () => void;
}) {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!state) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        closeRef.current?.focus();
        const trigger = state.trigger;
        return () => {
            document.removeEventListener("keydown", onKey);
            trigger?.focus();
        };
    }, [state, onClose]);

    if (!state || typeof document === "undefined") return null;
    const { photo } = state;

    return createPortal(
        <div
            className="fixed inset-0 z-[6000] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
        >
            {/* Plain <img>: the source is already a build-optimised webp, and
                next/image's fill/sizing fights the natural-aspect contain box. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={photo.src}
                alt={photo.alt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl [view-transition-name:sunset-zoom]"
            />
            <button
                ref={closeRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur transition hover:bg-background/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <IconX className="h-5 w-5" />
            </button>
        </div>,
        document.body,
    );
}
