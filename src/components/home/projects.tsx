"use client";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "../ui/blur-fade";
import { data } from "../../data/data";
import { IconBrush, IconExternalLink, IconSparkles } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { motion } from "framer-motion";
import { playTapSound } from "@/lib/sound";

export default function Projects() {
    return (
        <div className="flex flex-col space-y-6">
            <SectionHeading icon={<IconBrush className={headingIconClass} />}>
                Projects
            </SectionHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {data.projects.map((item, index) => (
                    <BlurFade
                        key={item.title}
                        delay={0.04 * 12 + index * 0.05}
                    >
                        <ProjectCard
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            dates={item.dates}
                            tags={item.technologies}
                            video={item.video}
                            thumbnail={item.thumbnail}
                            type={item.type}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}

interface Props {
    title: string;
    href?: string;
    description: string;
    dates: string;
    tags: readonly string[];
    link?: string;
    image?: string;
    video?: string;
    thumbnail?: string;
    type?: string;
    links?: readonly {
        icon: React.ReactNode;
        type: string;
        href: string;
    }[];
    className?: string;
}

export function ProjectCard({ title, href, description, tags, image, video, thumbnail, type }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });

        // Calculate subtle 3D tilt angles
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -5;
        const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 5;
        setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 });
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVideoPlaying = () => {
            setIsVideoPlaying(true);
        };

        video.addEventListener("playing", handleVideoPlaying);
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsVideoPlaying(true);
                })
                .catch((error) => {
                    console.log("Autoplay prevented:", error);
                    setTimeout(() => {
                        setIsVideoPlaying(true);
                    }, 500);
                });
        }

        const fallbackTimer = setTimeout(() => {
            setIsVideoPlaying(true);
        }, 3000);

        return () => {
            video.removeEventListener("playing", handleVideoPlaying);
            clearTimeout(fallbackTimer);
        };
    }, []);

    const appDomain = title
        .toLowerCase()
        .split("|")[0]
        .trim()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");

    return (
        <motion.div
            animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full perspective-1000"
        >
            <Link
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTapSound("pop")}
                className="block h-full group"
            >
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative h-full rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/40 to-border/10 hover:from-amber-500/60 hover:via-cyan-500/40 hover:to-border/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                    {/* Interactive Cursor Spotlight Beam */}
                    <div
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        style={{
                            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(56, 189, 248, 0.15), transparent 70%)`,
                        }}
                    />

                    <Card className="relative flex flex-col overflow-hidden rounded-2xl border-0 bg-background/80 backdrop-blur-xl h-full">
                        {/* macOS Window Controls Header */}
                        <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-950/90 border-b border-border/40 z-30">
                            <div className="flex items-center gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500/90 group-hover:bg-red-500 transition-colors shadow-sm" />
                                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/90 group-hover:bg-amber-500 transition-colors shadow-sm" />
                                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 group-hover:bg-emerald-500 transition-colors shadow-sm" />
                            </div>
                            <span className="text-[11px] font-mono text-zinc-400 truncate opacity-70 group-hover:opacity-100 group-hover:text-amber-400 transition-all">
                                app://{appDomain}.ai
                            </span>
                            <div className="w-8" />
                        </div>

                        {/* Thumbnail Image Container */}
                        <div className="relative overflow-hidden h-52 sm:h-56 bg-zinc-950/80 border-b border-border/40">
                            {/* Soft Ambient Blur Background */}
                            {(thumbnail || image) && (
                                <Image
                                    src={thumbnail || image || ""}
                                    alt=""
                                    fill
                                    className="object-cover blur-xl scale-110 opacity-40 pointer-events-none"
                                    aria-hidden="true"
                                />
                            )}

                            {/* Main Foreground Thumbnail */}
                            {thumbnail && (
                                <Image
                                    src={thumbnail}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className={video ? "object-contain p-2 blur-sm scale-105 transition-transform duration-500 group-hover:scale-105 z-10" : "object-contain p-2 transition-transform duration-500 group-hover:scale-105 z-10"}
                                    priority
                                />
                            )}

                            {/* Video Layer */}
                            {video && (
                                <motion.video
                                    ref={videoRef}
                                    src={video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVideoPlaying ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover object-top z-15"
                                />
                            )}

                            {/* Static Image fallback */}
                            {!video && !thumbnail && image && (
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 z-10"
                                />
                            )}

                            {/* Gradient Overlay & Category Badge */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 z-20" />

                            {type && (
                                <div className="absolute bottom-3 left-3 z-30">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/90 text-black text-[11px] font-bold tracking-wide backdrop-blur-sm shadow-md">
                                        <IconSparkles className="h-3 w-3" />
                                        <span>{type}</span>
                                    </span>
                                </div>
                            )}

                            {/* External Link Hover Icon */}
                            <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 text-amber-400 text-xs font-medium backdrop-blur-md border border-amber-500/30">
                                    <span>GitHub</span>
                                    <IconExternalLink className="h-3.5 w-3.5" />
                                </span>
                            </div>
                        </div>

                        {/* Card Body */}
                        <CardHeader className="p-5 pb-2">
                            <CardTitle className="text-lg font-bold tracking-tight group-hover:text-amber-400 transition-colors">
                                {title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="px-5 py-0 flex-1 space-y-4">
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </p>

                            {tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-[11px] px-2 py-0.5 bg-muted/80 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="p-5 pt-3 border-t border-border/40 mt-4 flex items-center justify-between">
                            <span className="text-xs font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors">
                                <span>View Source Code</span>
                                <IconExternalLink className="h-3.5 w-3.5" />
                            </span>
                        </CardFooter>
                    </Card>
                </div>
            </Link>
        </motion.div>
    );
}