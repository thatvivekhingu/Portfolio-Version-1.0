import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import { TransitionLink } from "@/components/ui/transition-link";

export const metadata = {
  title: "Blog — Vivek Hingu",
  description: "Thoughts on software engineering, projects, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative z-10 pt-32 sm:pt-40 pb-16 px-3 sm:px-4">
      <div className="mx-auto max-w-4xl">
        <BlurFade delay={0.005} inView>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Recent{" "}
            <span className="font-script font-normal text-[1.05em] leading-none align-baseline">
              writing
            </span>
            .
          </h1>
          <p className="text-muted-foreground text-lg mb-16">
            Thoughts on software engineering, design, and things I find
            interesting.
          </p>
        </BlurFade>

        {posts.length === 0 ? (
          <BlurFade delay={0.01} inView>
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          </BlurFade>
        ) : (
          <ul className="flex flex-col divide-y divide-border/60">
            {posts.map((post, idx) => (
              <BlurFade
                key={post.slug}
                delay={0.01 + idx * 0.05}
                inView
                className="pt-8 pb-8 first:pt-0"
              >
                <li>
                  <TransitionLink
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-4 sm:gap-5"
                  >
                    {post.image && (
                      <div
                        className="relative aspect-video w-24 sm:w-40 shrink-0 overflow-hidden rounded-md border border-border/60"
                        style={{ viewTransitionName: `post-image-${post.slug}` }}
                      >
                        <Image
                          src={post.image}
                          alt={post.imageAlt ?? post.title}
                          fill
                          sizes="(max-width: 640px) 96px, 160px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 sm:gap-6 mb-2">
                        <h2
                          className="text-xl sm:text-2xl font-semibold tracking-tight text-primary transition-colors"
                          style={{ viewTransitionName: `post-title-${post.slug}` }}
                        >
                          <span className="pb-1 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                            {post.title}
                          </span>
                          <IconArrowUpRight className="inline-block ml-1 h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                        </h2>
                        <time className="shrink-0 text-xs text-muted-foreground tabular-nums mt-1">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span>{post.readingTime}</span>
                        {post.tags.length > 0 && (
                          <>
                            <span aria-hidden>·</span>
                            <span className="lowercase">
                              {post.tags.join(", ")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </TransitionLink>
                </li>
              </BlurFade>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
