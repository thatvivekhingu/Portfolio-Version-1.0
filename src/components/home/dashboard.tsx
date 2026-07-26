
"use client";
import React, { useState, useEffect, useRef } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { IconTool, IconLink, IconCup, IconClockHour4, IconMapPin, IconHeart, IconHandClick, IconBrandGithub, IconBrandSpotifyFilled, IconRefresh } from "@tabler/icons-react";
import { Globe } from "@/components/ui/globe";
import styles from "./dashboard.module.css";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image";
import { data } from "@/data/data";
import { useTheme } from "next-themes";
import { ScratchToReveal } from "../magicui/scratch-to-reveal";
import { useWakaTime } from "@/hooks/useWakaTime";
import { useSpotify } from "@/hooks/useSpotify";
import { useGitHub } from "@/hooks/useGitHub";
import { Spotlight } from "@/components/ui/spotlight";
import { useAlbumColor } from "@/hooks/useAlbumColor";
import { GitHubHeatmap } from "./github-heatmap";
import { SoundWave } from "@/components/ui/sound-wave";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";


export default function Dashboard() {
  const { totalHours } = useWakaTime();
  const totalCoffees = Math.ceil(totalHours / 4);
  const { track } = useSpotify();
  const { data: githubData, isLoading: isLoadingGitHub } = useGitHub();
  const [scratchGif, setScratchGif] = useState("");
  const spotlightColor = useAlbumColor(track?.albumImageUrl || null);

  const dashboardIconClass = "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary";

  useEffect(() => {
    // Randomly select a GIF on mount
    const randomGif = data.scratchGifs[Math.floor(Math.random() * data.scratchGifs.length)];
    setScratchGif(randomGif);
  }, []);

  const pickNewGif = () => {
    const availableGifs = data.scratchGifs.filter(gif => gif !== scratchGif);
    const randomGif = availableGifs[Math.floor(Math.random() * availableGifs.length)];
    setScratchGif(randomGif);
  };

  const handleScratchComplete = () => {
    pickNewGif();
  };

  return (
    <div className="flex flex-col w-full">
      <CustomCursor />
      {/* <SectionHeading icon={<IconLayoutDashboard className={headingIconClass} />}>
        About Me
      </SectionHeading> */}
      <ul
        className={`grid w-full gap-4 ${styles.dashboardGrid}`}>
        <GridItem
          area="location"
          icon={<IconMapPin className={dashboardIconClass} />}
          title="Ahmedabad, Gujarat → Global"
          transitionDuration="100ms"
          cursorEmoji="✈️"
        >
          <div className="min-h-[160px] md:min-h-0">
            <Globe />
          </div>
        </GridItem>
        <GridItem
          area="music"
          icon={<SoundWave className={dashboardIconClass} color={spotlightColor} />}
          title="Last Played"
          transitionDuration="200ms"
          tooltip="Spotify"
          cursorEmoji="🎵"
        >
          <div className="flex flex-col-reverse sm:flex-row-reverse items-center gap-4 sm:gap-6 w-full">
            {/* Dancing Animation Section */}
            <div className="relative flex items-center justify-center w-full sm:w-12 h-16 sm:h-12 overflow-visible">
              <div className="absolute -top-36 -right-20 sm:-top-72 sm:-right-32 w-64 h-64 sm:w-96 sm:h-96 pointer-events-none z-0 scale-x-[-1]" style={{ opacity: 1 }}>
                <Spotlight
                  className="!opacity-100 scale-75 z-50"
                  fill={spotlightColor}
                />
              </div>
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 w-40 sm:w-32 aspect-[480/65] overflow-hidden opacity-60 z-0 pointer-events-none"
                style={{ transform: "translate(-50%, calc(-50% + 20px))" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://media.giphy.com/media/GZQGgGtosl3Fm4k0A9/giphy.gif"
                  alt=""
                  className="absolute top-0 left-0 w-full aspect-square max-w-none"
                  style={{ transform: "translateY(-67.7%)" }}
                />
              </div>
              <Image
                src="https://media.giphy.com/media/l41lFw057lAJdcwg0/giphy.gif"
                alt="Guitar Boy"
                width={80}
                height={80}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-20 sm:h-20 object-contain z-10 pointer-events-none"
                unoptimized
              />
            </div>
            {/* Spotify Last Played Section */}
            <div className="flex-1 min-w-0 w-full">
              <LastPlayed track={track} />
            </div>
          </div>
        </GridItem>
        <GridItem
          area="favorite"
          icon={<IconHeart className={dashboardIconClass} />}
          title="Fav Tool"
          transitionDuration="300ms"
          cursorEmoji="❤️"
        >
          <FavoriteLanguage />
        </GridItem>
        <GridItem
          area="tools"
          icon={<IconTool className={dashboardIconClass} />}
          title="Tools"
          transitionDuration="400ms"
          cursorEmoji="🔧"
        >
          <ToolsMarquee />
        </GridItem>
        <GridItem
          area="contact"
          icon={<IconLink className={dashboardIconClass} />}
          title="Connect"
          transitionDuration="500ms"
          cursorEmoji="🔗"
        >
          <ContactMe />
        </GridItem>
        <GridItem
          area="scratch"
          icon={<IconHandClick className={dashboardIconClass} />}
          title="Scratch Me"
          transitionDuration="600ms"
        >
          <div className="relative">
            <ScratchToReveal
              minScratchPercentage={20}
              className="flex items-center h-24 sm:h-35 justify-center overflow-hidden rounded-md bg-background"
              gradientColors={["#A97CF933", "#F38CB933", "#FDCC9233"]}
              onComplete={handleScratchComplete}
              resetKey={scratchGif}
            >
              {scratchGif && (
                <Image
                  src={scratchGif}
                  alt="Scratch to reveal"
                  width={100}
                  height={100}
                  className="h-14 sm:h-16 object-contain"
                  unoptimized
                />
              )}
            </ScratchToReveal>
            <button
              type="button"
              onClick={pickNewGif}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Refresh scratch"
              className="absolute top-1 right-1 z-10 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-background/60 transition-colors group"
            >
              <IconRefresh className="h-4 w-4 transition-transform group-hover:rotate-180 duration-300" />
            </button>
          </div>
        </GridItem>
        <GridItem
          area="hours"
          icon={<IconClockHour4 className={dashboardIconClass} />}
          title="Hours Coding"
          transitionDuration="800ms"
          tooltip="Powered by WakaTime"
          cursorEmoji="🕐"
        >
          <NumberTicker
            value={totalHours}
            className="whitespace-pre-wrap text-3xl font-semibold tracking-tighter text-muted-foreground"
          />
        </GridItem>
        <GridItem
          area="coffees"
          icon={<IconCup className={dashboardIconClass} />}
          title="Teas Drank"
          transitionDuration="700ms"
          tooltip="1 Tea 🍵 = 4 Hours Coding"
          cursorEmoji="🍵"
        >
          <NumberTicker
            value={totalCoffees}
            className="whitespace-pre-wrap text-3xl font-semibold tracking-tighter text-muted-foreground"
          />
        </GridItem>
        <GridItem
          area="github"
          icon={<IconBrandGithub className={dashboardIconClass} />}
          title="Activity"
          transitionDuration="900ms"
          tooltip="Last 7 Weeks"
          cursorEmoji="💻"
        >
          <div className="flex flex-col gap-[22px] sm:gap-6 h-full">
            {/* Heatmap */}
            <div className="flex-1">
              <GitHubHeatmap
                contributions={githubData?.contributions || []}
                isLoading={isLoadingGitHub}
              />
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-2 sm:gap-1.5 text-xs sm:text-[11px] text-neutral-400">
              <span>Less</span>
              <div className="flex gap-1 sm:gap-[3px]">
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-[2px] bg-neutral-100 dark:bg-neutral-800/50" />
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-[2px] bg-green-200 dark:bg-green-900/70" />
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-[2px] bg-green-400 dark:bg-green-700/80" />
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-[2px] bg-green-600 dark:bg-green-500/90" />
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-[2px] bg-green-700 dark:bg-green-400" />
              </div>
              <span>More</span>
            </div>
          </div>
        </GridItem>
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  transitionDuration?: string;
  tooltip?: string;
  cursorEmoji?: string;
}

const GridItem = ({ area, icon, title, children, transitionDuration = "300ms", tooltip, cursorEmoji }: GridItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    if (!tooltip) return;

    setShowTooltip(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide tooltip after 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const content = (
    <li
      ref={itemRef}
      data-cursor-emoji={cursorEmoji}
      className="min-h-[2rem] w-full list-none transition-all"
      style={{
        gridArea: area,
        transitionDuration,
        ...(cursorEmoji ? { cursor: "none" } : {}),
      }}
    >
      <div className="relative mx-auto h-full rounded-xl border p-2 md:rounded-2xl md:p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div
          className="group/glow relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border-0.75 p-4 shadow-[0px_0px_12px_0px_#ebecf0] dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-background transition-all"
          style={{
            transitionDuration,
          }}
        >
          <SpotlightGlow />
          <div className="relative flex flex-row items-center gap-2 sm:gap-3">
            <div className="pt-0">{icon}</div>
            <div className="space-y-2">
              <h3 className="text-sm sm:text-md md:text-base tracking-tight text-start font-semibold text-black dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </li>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip open={showTooltip} delayDuration={0}>
          <TooltipTrigger
            asChild
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleTap}
          >
            {content}
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-16}
            side="top"
            align="center"
            collisionPadding={0}
            className="pointer-events-none whitespace-nowrap"
          >
            <p className="flex items-center gap-1.5">
              {tooltip === "Spotify" && (
                <IconBrandSpotifyFilled className="h-4 w-4 text-green-500" />
              )}
              {tooltip}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

const ContactMe = () => {
  return (
    <div className="flex flex-col gap-4 sm:p-4">
      {data.contact.map(({ href, label, icon, aria }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={aria}
          className="flex items-center gap-2 group"
        >
          {React.cloneElement(icon, {
            className:
              "h-5 w-5 text-muted-foreground transition-all group-hover:animate-wiggle group-hover:scale-125 group-hover:text-primary",
          })}
          <span className="text-muted-foreground transition-all group-hover:text-primary group-hover:font-bold">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};
interface LastPlayedProps {
  track: {
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
  } | null;
}

const LastPlayed = ({ track }: LastPlayedProps) => {
  const [isReady, setIsReady] = useState(false);

  // Fallback to hardcoded data if no track
  const displayTrack = track || {
    title: "U.N.I",
    artist: "NAV",
    album: "OMW2 REXDALE",
    albumImageUrl: "/album-cover.jpeg",
    songUrl: "#",
  };

  // A real track can still arrive without cover art (the API returns an
  // optional images[0]?.url), so guard the image source independently of the
  // whole-track fallback above — next/image throws on an undefined src.
  const albumImageUrl = displayTrack.albumImageUrl || "/album-cover.jpeg";

  useEffect(() => {
    // Delay showing marquee to prevent flash on initial load
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={displayTrack.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row items-center gap-2 w-full overflow-hidden group"
    >
      <Image
        src={albumImageUrl}
        alt={`${displayTrack.title} album cover`}
        width={48}
        height={48}
        className="rounded-md shadow-lg sm:h-10 sm:w-10 h-8 w-8"
      />
      <div className="flex-1 min-w-0 max-w-full overflow-hidden relative">
        {isReady ? (
          <Marquee className="[--duration:12s] sm:[--duration:15s] [--gap:0.5rem]" pauseOnHover repeat={5}>
            <p className="text-sm whitespace-nowrap">
              <span className="text-foreground">{displayTrack.title}</span>
              <span className="text-muted-foreground"> • {displayTrack.artist} • {displayTrack.album} •</span>
            </p>
          </Marquee>
        ) : (
          <p className="text-sm whitespace-nowrap">
            <span className="text-foreground">{displayTrack.title}</span>
            <span className="text-muted-foreground"> • {displayTrack.artist} • {displayTrack.album}</span>
          </p>
        )}
      </div>
    </a>
  );
};

const Tool = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center">
            <Image
              src={`${icon}`}
              alt={`${name} icon`}
              width={30}
              height={30}
              className="h-8 w-8"
              loading="eager"

            />
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="text-sm font-semibold text-muted-foreground">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ToolsMarquee = () => {
  const { theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const currentTheme = theme || resolvedTheme || "dark";

  const processedToolsData = data.tools.map(({ name, icon, themeDependent }) => ({
    name,
    icon: `/tools/${icon}${themeDependent && currentTheme === "dark" ? "-dark" : ""}.svg`,
  }));
  return (
    <div className="relative overflow-hidden">
      <div className="fade-mask-left transition-all duration-400" />
      <div className="fade-mask-right transition-all duration-400" />
      <Marquee pauseOnHover className="[--duration:20s]">
        <div className="flex items-center gap-6">
          {processedToolsData.map(({ name, icon }) => (
            <Tool key={name} name={name} icon={icon} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};


const FavoriteLanguage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-start h-full">
      <Image
        src="/tools/python.svg"
        alt="Python Icon"
        width={24}
        height={24}
        className="h-6 w-6 sm:h-8 sm:w-8 ml-1 mb-1"
      />
      <span className="ml-2 sm:ml-3 mb-1 text-md sm:text-lg font-normal tracking-tight text-muted-foreground">
        Python
      </span>
    </div>
  );
};