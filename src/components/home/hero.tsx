"use client";

import Image from "next/image";
import profilePic from "@/images/profile-bw.jpg";
import profilePicHover from "@/images/profile-color.jpg";
import { HeroConstellation } from "@/components/ui/hero-constellation";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShimmerBorder } from "@/components/ui/shimmer-border";
import { IconArrowRight } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import {
  AnimatedName,
  HOLD_MS,
  INITIAL_REVEAL_MS,
  SWAP_REVEAL_MS,
  type Phase,
  type Suffix,
} from "@/components/ui/animated-name";
import React, { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { data } from "@/data/data";

export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("initial");
  const [suffix, setSuffix] = useState<Suffix>("hingu");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (phase === "initial") {
      timer = setTimeout(() => setPhase("hold"), INITIAL_REVEAL_MS);
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("exit"), HOLD_MS);
    } else if (phase === "enter") {
      timer = setTimeout(() => setPhase("hold"), SWAP_REVEAL_MS);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase]);

  const handleExitComplete = () => {
    setSuffix((s) => (s === "hingu" ? "tag" : "hingu"));
    setPhase("enter");
  };

  const { status, dotColor } = getStatus();

  const handleIconClick = (iconName: string) => {
    playTapSound("pop");
    setWiggleIcon(iconName);
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const handleShimmerButtonClick = () => {
    playTapSound("chime");
    handleIconClick("email");
  };

  const ctaRef = useRef<HTMLAnchorElement>(null);
  const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="pt-28 pb-14 sm:pt-40 sm:pb-16 relative flex items-center justify-center overflow-hidden">
      <HeroConstellation desktopDots={300} mobileDots={75} />
      <TooltipProvider>
        <BlurFade delay={0.005} inView>
          <div className="relative flex-col space-y-1">
            <div className="relative flex flex-col items-center justify-center">
              {/* Sleek Floating Avatar with Ambient Pulse Halo (No bulky box frame) */}
              <div
                className="group relative z-50 cursor-pointer transition-transform duration-500 hover:scale-105"
                onClick={() => playTapSound("chime")}
              >
                {/* Ambient Subtle Accent Glow (Positioned above head, non-overpowering) */}
                <div className="absolute -top-5 -inset-x-1 h-3/4 rounded-full bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-cyan-500/20 blur-md opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none" />

                {/* Clean Borderless Avatar Container */}
                <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 overflow-hidden rounded-full shadow-2xl ring-2 ring-white/10 dark:ring-white/20">
                  <Image
                    src={profilePic}
                    alt="Vivek Hingu"
                    priority
                    fill
                    className="object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                  <Image
                    src={profilePicHover}
                    alt="Vivek Hingu Hover"
                    fill
                    className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />

                  {/* Subtle Tech Badge */}
                  <div className="absolute bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold text-cyan-300 tracking-wider">
                    AI / ML
                  </div>
                </div>
              </div>

              <ShimmerButton onClick={handleShimmerButtonClick} className="z-50 mt-5">
                <div className="z-50 relative flex items-center justify-center">
                  <div
                    className={`absolute h-1.5 w-1.5 rounded-full border-1 ${
                      dotColor === "green"
                        ? "border-green-600/80 bg-green-500 animate-ping"
                        : "border-orange-600/80 bg-orange-500 animate-ping"
                    } mr-2`}
                  ></div>
                  <div
                    className={`relative h-1 w-1 rounded-full border-1 ${
                      dotColor === "green"
                        ? "border-green-600/80 bg-green-500 animate-pulse"
                        : "border-orange-600/80 bg-orange-500 animate-pulse"
                    } mr-2`}
                  ></div>
                </div>
                <span className="whitespace-pre-wrap text-center font-semibold leading-none text-muted-foreground text-xs sm:text-base py-[0.5]">
                  {status}
                </span>
              </ShimmerButton>
            </div>

            <div className="w-full space-y-6">
              <BlurFade delay={0.005 * 1} inView>
                <p className="z-50 subpixel-antialiased leading-[1.8] text-5xl sm:text-7xl font-bold text-center whitespace-nowrap">
                  <span className="inline-block pb-2 bg-gradient-to-b from-zinc-200 dark:from-zinc-50 to-zinc-950 dark:to-zinc-300 bg-clip-text text-transparent">
                    Hi, I&#39;m{" "}
                    <AnimatedName
                      phase={phase}
                      suffix={suffix}
                      onExitComplete={handleExitComplete}
                      className="font-script font-normal text-[1.05em] leading-none align-baseline"
                    />
                  </span>
                </p>
                <p className="text-base subpixel-antialiased tracking-tight font-medium sm:text-2xl text-center text-secondary-foreground">
                  AI & ML Engineer building{" "}
                  <span className="font-script font-normal text-[1.05em] leading-none align-baseline text-secondary-foreground">
                    intelligent software
                  </span>
                  .
                </p>
              </BlurFade>
              <BlurFade delay={0.005 * 2} direction="down" inView>
                <div className="z-50 flex flex-row items-center justify-center gap-5">
                  <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
                  <span className="h-5 w-px bg-zinc-300/60 dark:bg-zinc-700/60" aria-hidden />
                  <a
                    ref={ctaRef}
                    onMouseMove={handleCtaMove}
                    onClick={() => playTapSound("pop")}
                    href="#projects"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-zinc-300/60 dark:border-zinc-700/60 bg-background/40 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                      style={{
                        background:
                          "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                      }}
                    />
                    <span className="relative">View my work</span>
                    <IconArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <ShimmerBorder />
                  </a>
                </div>
              </BlurFade>
            </div>
          </div>
        </BlurFade>
      </TooltipProvider>
    </div>
  );
}

const getStatus = () => {
  const now = new Date();
  const localTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).format(now);

  const currentHour = parseInt(localTime, 10);

  if (currentHour >= 9 && currentHour < 23) {
    return { status: "Available for Building & Collaborating", dotColor: "green" };
  } else {
    return { status: "Building in Stealth Mode", dotColor: "amber" };
  }
};

const iconClass = (label: string, wiggleIcon: string | null) =>
  `text-secondary-foreground ${
    wiggleIcon === label.toLowerCase()
      ? "animate-wiggle scale-150 transition-transform duration-200"
      : ""
  } hover:scale-130 hover:animate-wiggle transition-transform duration-300`;

function ContactIcons({
  wiggleIcon,
  handleIconClick,
}: {
  wiggleIcon: string | null;
  handleIconClick: (label: string) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-center space-x-6">
      {data.contact.map((link) => (
        <Tooltip key={link.label}>
          <TooltipTrigger asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.aria}
              onClick={() => handleIconClick(link.label.toLowerCase())}
            >
              {React.cloneElement(link.icon, {
                className: iconClass(link.label, wiggleIcon),
              })}
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">{link.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}