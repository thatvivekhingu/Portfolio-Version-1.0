"use client";

import Image from "next/image";
import { IconArrowUpRight, IconPencil } from "@tabler/icons-react";
import {
    SectionHeading,
    headingIconClass,
} from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { TransitionLink } from "@/components/ui/transition-link";

export interface HomeWritingPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    readingTime: string;
    image?: string;
    imageAlt?: string;
}

export default function Writing({ posts }: { posts: HomeWritingPost[] }) {
    if (posts.length === 0) return null;

    return (
        <div className="flex flex-col">
            <SectionHeading icon={<IconPencil className={headingIconClass} />}>
                Writing
            </SectionHeading>

            <ul className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {posts.map((post, idx) => {
                    const formattedDate = new Date(post.date).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                    );
                    return (
                        <BlurFade key={post.slug} delay={0.05 + idx * 0.05}>
                            <li className="sm:h-full">
                                <TransitionLink
                                    href={`/blog/${post.slug}`}
                                    className="group flex items-start gap-4 sm:flex-col sm:items-stretch sm:gap-3 sm:h-full"
                                >
                                    {post.image && (
                                        <div
                                            className="relative aspect-video shrink-0 w-24 sm:w-full overflow-hidden rounded-md border border-border/60"
                                            style={{ viewTransitionName: `post-image-${post.slug}` }}
                                        >
                                            <Image
                                                src={post.image}
                                                alt={post.imageAlt ?? post.title}
                                                fill
                                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                                        <div className="flex items-baseline justify-between gap-3 sm:block">
                                            <h3
                                                className="text-base sm:text-lg font-semibold tracking-tight text-primary"
                                                style={{ viewTransitionName: `post-title-${post.slug}` }}
                                            >
                                                <span className="pb-1 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                                                    {post.title}
                                                </span>
                                                <IconArrowUpRight className="inline-block ml-1 h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                                            </h3>
                                            <time className="shrink-0 sm:hidden text-[11px] text-muted-foreground tabular-nums mt-1">
                                                {formattedDate}
                                            </time>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                            {post.description}
                                        </p>
                                        <time className="hidden sm:block text-xs text-muted-foreground tabular-nums mt-1">
                                            {formattedDate}
                                        </time>
                                    </div>
                                </TransitionLink>
                            </li>
                        </BlurFade>
                    );
                })}
            </ul>

            <div className="mt-8 flex justify-center">
                <TransitionLink
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    Read all posts
                    <IconArrowUpRight className="h-4 w-4" />
                </TransitionLink>
            </div>
        </div>
    );
}
