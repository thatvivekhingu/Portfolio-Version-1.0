"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconX, IconExternalLink } from "@tabler/icons-react";

export interface PhotoLightboxItem {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  description?: string;
  metrics?: string;
  link?: string;
}

export function PhotoLightbox({
  item,
  onClose,
}: {
  item: PhotoLightboxItem | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!item || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[6000] flex items-center justify-center bg-background/80 dark:bg-black/80 p-4 sm:p-6 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] bg-background border border-border/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/40">
          <div className="space-y-0.5 pr-8">
            {item.subtitle && (
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                {item.subtitle}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              {item.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close photo preview"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 min-h-[260px] max-h-[65vh] w-full bg-muted/20 flex items-center justify-center overflow-hidden p-2 sm:p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt || item.title}
            className="max-h-[60vh] max-w-full rounded-lg object-contain shadow-lg"
          />
        </div>

        {/* Footer Details */}
        {(item.description || item.metrics || item.link) && (
          <div className="p-4 sm:p-5 border-t border-border/60 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="space-y-1 max-w-2xl">
              {item.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
              {item.metrics && (
                <p className="font-semibold text-amber-500 dark:text-amber-400 flex items-center gap-1.5 pt-0.5">
                  ✨ {item.metrics}
                </p>
              )}
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-medium transition-colors border border-amber-500/30 self-start sm:self-auto shrink-0"
              >
                <span>View Link</span>
                <IconExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
