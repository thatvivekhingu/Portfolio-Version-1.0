"use client";

import Image from "next/image";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { IconRss, IconSend, IconBrandGithub, IconStar } from "@tabler/icons-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { data } from "@/data/data";

const FALLBACK_REPO_URL = "https://github.com/thatvivekhingu/portfolio-website";

export const Footer = () => {
    const [sent, setSent] = useState(false);
    const waveRef = useRef<HTMLSpanElement>(null);
    const waveInView = useInView(waveRef, { amount: 0.5 });
    const [waveKey, setWaveKey] = useState(0);

    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const { data: starsData } = useGitHubStars();
    const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
    const stars = starsData?.stars ?? 0;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (waveInView) setWaveKey((k) => k + 1);
    }, [waveInView]);

    const handleSendClick = () => {
        if (sent) return;
        setSent(true);
        // Reset after the full fly-out + rise-in keyframe sequence finishes.
        window.setTimeout(() => setSent(false), 1300);
    };

    const handleNavClick = (link: string) => {
        if (link.startsWith("/")) {
            router.push(link);
            return;
        }
        if (window.location.pathname !== "/") {
            router.push(`/#${link}`);
            return;
        }
        const section = document.getElementById(link);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleLogoClick = () => router.push("/");

    return (
        <footer className="relative w-full bg-background text-secondary-foreground overflow-hidden">
            <div className="relative z-10 mx-auto flex max-w-5xl flex-col px-4 pt-20 sm:pt-28">
                {/* CTA */}
                <div className="flex flex-col items-center justify-center mb-16 sm:mb-24">
                    <h2 className="mx-16 sm:mx-none text-center text-pretty text-3xl sm:text-4xl font-bold mb-8">
                        Say{" "}
                        <span className="font-script font-normal text-[1.05em] leading-none align-baseline">
                            hello
                        </span>
                        .{" "}
                        <span ref={waveRef} className="inline-block">
                            <span
                                key={waveKey}
                                className="inline-block origin-bottom-right animate-wiggle hover:animate-wiggle"
                            >
                                👋
                            </span>
                        </span>
                    </h2>
                    <a
                        href="mailto:hinguvivek05@gmail.com"
                        onClick={handleSendClick}
                        className="group inline-block active:scale-95 transition-transform duration-150"
                    >
                        <RainbowButton
                            variant="default"
                            className="overflow-visible pl-5 pr-6 sm:pl-7 sm:pr-8 before:transition-[width,height,bottom,filter] before:duration-300 hover:before:w-4/5 hover:before:h-1/3 hover:before:bottom-[-35%] hover:before:[filter:blur(1.1rem)]"
                        >
                            <motion.span
                                aria-hidden
                                className="inline-flex will-change-transform"
                                animate={
                                    sent
                                        ? {
                                              x: [0, 24, 90, 0, 0],
                                              y: [0, -38, -64, 30, 0],
                                              rotate: [0, 25, 45, 0, 0],
                                              opacity: [1, 1, 0, 0, 1],
                                          }
                                        : { x: 0, y: 0, rotate: 0, opacity: 1 }
                                }
                                transition={{
                                    duration: sent ? 1.2 : 0.45,
                                    ease: sent
                                        ? [
                                              [0.22, 1, 0.36, 1],
                                              [0.22, 1, 0.36, 1],
                                              "linear",
                                              [0.22, 1, 0.36, 1],
                                          ]
                                        : "easeOut",
                                    times: sent ? [0, 0.3, 0.5, 0.51, 1] : undefined,
                                }}
                            >
                                <IconSend className="transition-transform duration-200 group-hover:-rotate-12 group-hover:-translate-y-0.5" />
                            </motion.span>
                            <p className="tracking-tight">Contact Me</p>
                        </RainbowButton>
                    </a>
                    <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Star this site's repository on GitHub"
                        className="group mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <IconBrandGithub className="h-4 w-4" />
                        <span>This site is open source: star it on GitHub</span>
                        <IconStar className="h-3.5 w-3.5 transition-colors group-hover:text-amber-400 group-hover:animate-spin-grow" />
                        <span className="tabular-nums font-medium">{stars}</span>
                    </a>
                </div>

                {/* Links + Logo */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 border-t border-border/50 pt-10 pb-8">
                    <div className="col-span-2 sm:col-span-1 flex flex-col items-start gap-3">
                        {mounted && (
                            <AnimatedLogo
                                theme={resolvedTheme === "dark" ? "dark" : "light"}
                                className="w-8 h-8"
                                onClick={handleLogoClick}
                            />
                        )}
                        <p className="text-sm font-semibold tracking-tight text-primary">
                            Vivek Hingu
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                            AI/ML Engineer & Full-Stack Developer, building intelligent products, predictive models, and voice AI systems.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Navigate
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {data.nav.map((item) => (
                                <li key={item.name}>
                                    <button
                                        onClick={() => handleNavClick(item.link)}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Connect
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {data.contact.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        aria-label={item.aria}
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="/feed.xml"
                                    aria-label="RSS feed"
                                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <IconRss className="h-5 w-5" />
                                    RSS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center border-t border-border/50 pt-6 pb-6">
                    <p className="text-xs text-muted-foreground leading-none">
                        &copy; {new Date().getFullYear()} Vivek Hingu. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground leading-none">
                        Built with ❤️ using React, Next.js and Tailwind
                    </p>
                </div>
            </div>
            <Image
                src="/layout/background-ellipse3.svg"
                alt=""
                fill={false}
                width={100}
                height={900}
                className="absolute bottom-0 blur-md left-1/2 transform -translate-x-1/2 translate-y-3/5 w-auto z-0 pointer-events-none select-none"
                aria-hidden="true"
                priority
            />
        </footer>
    );
};
