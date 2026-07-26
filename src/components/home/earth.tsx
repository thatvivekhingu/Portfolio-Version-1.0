"use client";

import Image from "next/image";
import { useState } from "react";
import { flushSync } from "react-dom";
import { IconWorld } from "@tabler/icons-react";
import {
    SectionHeading,
    headingIconClass,
} from "@/components/layout/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { Lens } from "@/components/magicui/lens";
import {
    SunsetLightbox,
    type LightboxState,
} from "@/components/home/sunset-lightbox";
import type { SunsetPhoto } from "@/lib/sunsets";
import { cn } from "@/lib/utils";

// Shared between the clicked thumbnail and the expanded image so the View
// Transitions API morphs one into the other.
const VT_NAME = "sunset-zoom";

/** Run a DOM update as a view transition, falling back to an instant update. */
function withViewTransition(update: () => void): { finished: Promise<void> } {
    const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (typeof doc.startViewTransition === "function") {
        return doc.startViewTransition(update);
    }
    update();
    return { finished: Promise.resolve() };
}

export default function Earth({ photos }: { photos: SunsetPhoto[] }) {
    const [active, setActive] = useState<LightboxState | null>(null);
    // Track which sources have decoded so we can swap the skeleton for the
    // real image. Keyed by src, so all of the marquee's duplicated copies
    // reveal together the moment that photo loads once.
    const [loaded, setLoaded] = useState<Set<string>>(new Set());
    const markLoaded = (src: string) =>
        setLoaded((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

    if (photos.length === 0) return null;

    const open = (
        photo: SunsetPhoto,
        e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
        const el = e.currentTarget;
        // Name only the clicked node (not via CSS) so it stays unique among the
        // marquee's duplicated copies, then morph it into the expanded image.
        el.style.setProperty("view-transition-name", VT_NAME);
        withViewTransition(() => {
            flushSync(() => setActive({ photo, trigger: el }));
            // The expanded image now carries the name; release it here so the
            // after-state has exactly one element named VT_NAME.
            el.style.removeProperty("view-transition-name");
        });
    };

    const close = () => {
        const el = active?.trigger;
        withViewTransition(() => {
            flushSync(() => setActive(null));
            // Hand the name back to the thumbnail so it becomes the morph target.
            el?.style.setProperty("view-transition-name", VT_NAME);
        }).finished.finally(() => el?.style.removeProperty("view-transition-name"));
    };

    return (
        <div className="flex flex-col">
            <SectionHeading icon={<IconWorld className={headingIconClass} />}>
                I like the earth
            </SectionHeading>

            <p className="-mt-4 mb-8 text-center text-sm text-muted-foreground">
                Places that made me stop and take a picture.
            </p>

            <div className="relative">
                <Marquee
                    pauseOnHover
                    paused={!!active}
                    className="[--duration:55s] [--gap:0.75rem] px-0 py-14"
                >
                    {photos.map((photo) => (
                        <div
                            key={photo.src}
                            className="group/card relative shrink-0 cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-label={`View photo: ${photo.alt}`}
                            onClick={(e) => open(photo, e)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    open(photo, e);
                                }
                            }}
                        >
                            {/* Ambient bloom: a blurred copy of the photo bleeds its
                                own colour outward, so each sunset appears to emit
                                light. The blur radius is kept small enough that its
                                soft tail fades to nothing inside the marquee's py-14
                                padding — otherwise overflow-hidden cuts a hard edge.
                                Served tiny (sizes="40px") since it is blurred to a
                                smear; decorative, so hidden from assistive tech. */}
                            <Image
                                src={photo.src}
                                alt=""
                                aria-hidden
                                fill
                                sizes="40px"
                                className="pointer-events-none scale-105 rounded-xl object-cover blur-lg saturate-150 opacity-0 transition-opacity duration-700 group-hover/card:opacity-70 motion-reduce:transition-none"
                            />
                            <Lens zoomFactor={1.75} lensSize={110} ariaLabel={photo.alt}>
                                <div className="relative aspect-[3/4] h-48 sm:h-64 overflow-hidden rounded-xl">
                                    {/* Fallback for the rare photo without a
                                        generated blur: a pulsing placeholder so the
                                        row never looks empty while it streams in.
                                        When a blur exists, next/image renders it in
                                        the SSR HTML (visible before hydration) and
                                        this is skipped. */}
                                    {!photo.blurDataURL && !loaded.has(photo.src) && (
                                        <div className="absolute inset-0 animate-pulse rounded-xl bg-muted" />
                                    )}
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        sizes="(min-width: 640px) 336px, 252px"
                                        placeholder={photo.blurDataURL ? "blur" : "empty"}
                                        blurDataURL={photo.blurDataURL}
                                        onLoad={() => markLoaded(photo.src)}
                                        className={cn(
                                            "object-cover",
                                            // Only hand-fade when there is no native
                                            // blur; otherwise next/image manages the
                                            // placeholder-to-photo swap itself.
                                            !photo.blurDataURL &&
                                                "transition-opacity duration-500 motion-reduce:transition-none",
                                            !photo.blurDataURL && !loaded.has(photo.src)
                                                ? "opacity-0"
                                                : "opacity-100",
                                        )}
                                    />
                                </div>
                            </Lens>
                        </div>
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-background" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-background" />
            </div>

            <SunsetLightbox state={active} onClose={close} />
        </div>
    );
}
