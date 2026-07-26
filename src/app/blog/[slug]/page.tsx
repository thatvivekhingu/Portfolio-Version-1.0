import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { CopyCodeButtons } from "@/components/blog/copy-code-buttons";
import { TransitionLink } from "@/components/ui/transition-link";
import { IconArrowLeft, IconCalendar, IconClock } from "@tabler/icons-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Vivek Hingu`,
    description: post.description,
    openGraph: {
      type: "article",
      url: `https://thatvivekhingu.github.io/portfolio-website/blog/${slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const html = await renderMarkdown(post.content);

  return (
    <div className="relative z-10 pt-32 sm:pt-40 pb-16 px-3 sm:px-4">
      {/*
        Grid layout at xl+: [spacer | article (672px) | TOC sidebar].
        Sticky (not fixed) means the TOC scrolls naturally with the article
        and disappears when the article ends — so it never overlaps the
        footer below. Below xl, the grid collapses to a single column and
        the TOC is hidden.
      */}
      <div className="mx-auto max-w-6xl xl:grid xl:grid-cols-[1fr_minmax(0,672px)_1fr] xl:gap-8">
        <div className="hidden xl:block" aria-hidden />
        <div className="mx-auto w-full max-w-2xl xl:mx-0">
          <BlurFade delay={0.005} inView>
            <TransitionLink
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <IconArrowLeft className="h-4 w-4" />
              All posts
            </TransitionLink>

            {post.image && (
              <div
                className="relative aspect-[16/9] w-full mb-10 overflow-hidden rounded-xl border border-border/60"
                style={{ viewTransitionName: `post-image-${slug}` }}
              >
                <Image
                  src={post.image}
                  alt={post.imageAlt ?? post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
            )}
            <header className="mb-10">
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
                style={{ viewTransitionName: `post-title-${slug}` }}
              >
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <IconCalendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <IconClock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>
          </BlurFade>

          <BlurFade delay={0.01} inView>
            <article
              id="post-article"
              className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:scroll-mt-[50px] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <CopyCodeButtons containerSelector="#post-article" />
          </BlurFade>
        </div>

        <aside className="hidden xl:block">
          {post.headings.length > 0 && (
            <div className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <TableOfContents headings={post.headings} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
