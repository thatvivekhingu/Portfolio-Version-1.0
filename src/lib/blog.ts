import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { slugify, type Heading } from "@/lib/blog-utils";

export type { Heading };

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

// keepBackground: false lets our own CSS control the code-block background so
// it sits on the page palette rather than Shiki's hardcoded GitHub canvas.
const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypePrettyCode, {
    theme: { light: "github-light", dark: "github-dark" },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function renderMarkdown(content: string): Promise<string> {
  const file = await markdownProcessor.process(content);
  return String(file);
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
  headings: Heading[];
  /** Path or URL to a cover image (e.g. "/blog/post-slug.jpg"). Optional. */
  image?: string;
  /** Accessible description for the cover image. Defaults to the title. */
  imageAlt?: string;
}

// Extract level-2 and level-3 headings from markdown, skipping code blocks.
// Slugs use github-slugger via slugify() so they match the IDs rehype-slug
// emits during HTML rendering.
export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ level, text, slug: slugify(text) });
  }
  return headings;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug: file.replace(/\.(md|mdx)$/, ""),
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      readingTime: stats.text,
      content,
      headings: extractHeadings(content),
      image: data.image,
      imageAlt: data.imageAlt,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    readingTime: stats.text,
    content,
    headings: extractHeadings(content),
    image: data.image,
    imageAlt: data.imageAlt,
  };
}
