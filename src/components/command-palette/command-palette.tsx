"use client";

import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { useTransitionRouter } from "next-view-transitions";
import { useCallback, useEffect, useState } from "react";
import {
    IconArrowRight,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBriefcase2,
    IconBrush,
    IconCheck,
    IconCopy,
    IconHome,
    IconMail,
    IconMoon,
    IconPencil,
    IconRss,
    IconSearch,
    IconSun,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const PALETTE_OPEN_EVENT = "palette:open";

export interface PaletteBlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
}

interface CommandPaletteProps {
    posts: PaletteBlogPost[];
}

export function CommandPalette({ posts }: CommandPaletteProps) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [viewport, setViewport] = useState<{ height: number; offsetTop: number } | null>(null);
    const { resolvedTheme, setTheme } = useTheme();
    const router = useTransitionRouter();

    // ⌘K / Ctrl+K global shortcut + Escape to close + custom event from a
    // trigger button.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((o) => !o);
                return;
            }
            if (e.key === "Escape") {
                setOpen((o) => {
                    if (o) e.preventDefault();
                    return false;
                });
            }
        };
        const onOpen = () => setOpen(true);
        document.addEventListener("keydown", onKey);
        window.addEventListener(PALETTE_OPEN_EVENT, onOpen);
        return () => {
            document.removeEventListener("keydown", onKey);
            window.removeEventListener(PALETTE_OPEN_EVENT, onOpen);
        };
    }, []);

    useEffect(() => {
        if (!open) {
            setCopied(false);
            setViewport(null);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Track the visual viewport so the palette shrinks when the mobile
    // keyboard appears (the keyboard overlays the layout viewport but
    // shrinks the visual viewport).
    useEffect(() => {
        if (!open) return;
        const vv = window.visualViewport;
        if (!vv) return;
        const update = () => setViewport({ height: vv.height, offsetTop: vv.offsetTop });
        update();
        vv.addEventListener("resize", update);
        vv.addEventListener("scroll", update);
        return () => {
            vv.removeEventListener("resize", update);
            vv.removeEventListener("scroll", update);
        };
    }, [open]);

    const run = useCallback((fn: () => void) => {
        setOpen(false);
        requestAnimationFrame(fn);
    }, []);

    const goToSection = useCallback(
        (id: string) => {
            if (window.location.pathname !== "/") {
                router.push(`/#${id}`);
                return;
            }
            document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        [router],
    );

    const copyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText("hinguvivek05@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            window.location.href = "mailto:hinguvivek05@gmail.com";
        }
    }, []);

    if (!open) return null;

    return (
        <>
            <div
                aria-hidden
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                style={
                    viewport
                        ? {
                              top: viewport.offsetTop + 16,
                              maxHeight: viewport.height - 32,
                          }
                        : undefined
                }
                className="fixed left-1/2 top-4 sm:top-[10%] z-[6001] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col max-h-[calc(100svh-2rem)] animate-in fade-in zoom-in-95 duration-150"
            >
                <Command
                    label="Command palette"
                    className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl"
                >
                    <div className="flex shrink-0 items-center gap-2 border-b border-border/60 px-4">
                        <IconSearch className="h-4 w-4 text-muted-foreground" />
                        <Command.Input
                            placeholder="Type a command or search…"
                            className="flex-1 bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                            autoFocus
                        />
                        <kbd className="hidden sm:inline-flex items-center rounded border border-border/60 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            esc
                        </kbd>
                    </div>

                    <Command.List className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
                        <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                            No results found.
                        </Command.Empty>

                        <Group heading="Navigation">
                            <Item
                                icon={<IconHome className="h-4 w-4" />}
                                label="Home"
                                onSelect={() => run(() => goToSection("hero"))}
                            />
                            <Item
                                icon={<IconBrush className="h-4 w-4" />}
                                label="Projects"
                                onSelect={() => run(() => goToSection("projects"))}
                            />
                            <Item
                                icon={<IconBriefcase2 className="h-4 w-4" />}
                                label="Experience"
                                onSelect={() => run(() => goToSection("experience"))}
                            />
                            <Item
                                icon={<IconPencil className="h-4 w-4" />}
                                label="Blog"
                                onSelect={() => run(() => router.push("/blog"))}
                            />
                        </Group>

                        {posts.length > 0 && (
                            <Group heading="Recent writing">
                                {posts.slice(0, 8).map((post) => (
                                    <Item
                                        key={post.slug}
                                        icon={<IconArrowRight className="h-4 w-4" />}
                                        label={post.title}
                                        sublabel={new Date(post.date).toLocaleDateString(
                                            "en-US",
                                            { month: "short", day: "numeric", year: "numeric" },
                                        )}
                                        keywords={[
                                            post.description,
                                            ...post.title.split(" "),
                                        ]}
                                        onSelect={() =>
                                            run(() => router.push(`/blog/${post.slug}`))
                                        }
                                    />
                                ))}
                            </Group>
                        )}

                        <Group heading="Actions">
                            <Item
                                icon={
                                    copied ? (
                                        <IconCheck className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <IconCopy className="h-4 w-4" />
                                    )
                                }
                                label={copied ? "Copied!" : "Copy email"}
                                sublabel="hinguvivek05@gmail.com"
                                keywords={["email", "contact", "mail"]}
                                onSelect={copyEmail}
                            />
                            <Item
                                icon={
                                    resolvedTheme === "dark" ? (
                                        <IconSun className="h-4 w-4" />
                                    ) : (
                                        <IconMoon className="h-4 w-4" />
                                    )
                                }
                                label={`Switch to ${
                                    resolvedTheme === "dark" ? "light" : "dark"
                                } mode`}
                                keywords={["theme", "dark", "light", "appearance"]}
                                onSelect={() =>
                                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                                }
                            />
                        </Group>

                        <Group heading="External">
                            <Item
                                icon={<IconBrandGithub className="h-4 w-4" />}
                                label="GitHub"
                                sublabel="github.com/thatvivekhingu"
                                onSelect={() =>
                                    run(() =>
                                        window.open(
                                            "https://github.com/thatvivekhingu",
                                            "_blank",
                                            "noopener,noreferrer",
                                        ),
                                    )
                                }
                            />
                            <Item
                                icon={<IconBrandLinkedin className="h-4 w-4" />}
                                label="LinkedIn"
                                sublabel="linkedin.com/in/vivekhingu"
                                onSelect={() =>
                                    run(() =>
                                        window.open(
                                            "https://linkedin.com/in/vivekhingu",
                                            "_blank",
                                            "noopener,noreferrer",
                                        ),
                                    )
                                }
                            />
                            <Item
                                icon={<IconMail className="h-4 w-4" />}
                                label="Send email"
                                onSelect={() =>
                                    run(() => {
                                        window.location.href =
                                            "mailto:hinguvivek05@gmail.com";
                                    })
                                }
                            />
                            <Item
                                icon={<IconRss className="h-4 w-4" />}
                                label="RSS feed"
                                sublabel="/feed.xml"
                                keywords={["rss", "feed", "subscribe", "xml"]}
                                onSelect={() =>
                                    run(() =>
                                        window.open("/feed.xml", "_blank", "noopener,noreferrer"),
                                    )
                                }
                            />
                        </Group>
                    </Command.List>
                </Command>
            </div>
        </>
    );
}

function Group({
    heading,
    children,
}: {
    heading: string;
    children: React.ReactNode;
}) {
    return (
        <Command.Group
            heading={heading}
            className={cn(
                "mb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
                "[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium",
                "[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider",
                "[&_[cmdk-group-heading]]:text-muted-foreground/70",
            )}
        >
            {children}
        </Command.Group>
    );
}

function Item({
    icon,
    label,
    sublabel,
    keywords,
    onSelect,
}: {
    icon: React.ReactNode;
    label: string;
    sublabel?: string;
    keywords?: string[];
    onSelect: () => void;
}) {
    return (
        <Command.Item
            value={`${label} ${sublabel ?? ""} ${keywords?.join(" ") ?? ""}`.trim()}
            onSelect={onSelect}
            className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-foreground/80",
                "data-[selected=true]:bg-accent/60 data-[selected=true]:text-foreground",
                "transition-colors",
            )}
        >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background/60 text-muted-foreground">
                {icon}
            </span>
            <span className="flex-1 truncate">{label}</span>
            {sublabel && (
                <span className="hidden sm:inline truncate text-xs text-muted-foreground">
                    {sublabel}
                </span>
            )}
        </Command.Item>
    );
}
