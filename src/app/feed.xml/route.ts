import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://thatvivekhingu.github.io/portfolio-website";
const SITE_TITLE = "Vivek Hingu";
const SITE_DESCRIPTION =
    "Thoughts on artificial intelligence, machine learning engineering, and software development.";
const AUTHOR_EMAIL = "hinguvivek05@gmail.com";
const AUTHOR_NAME = "Vivek Hingu";

function escapeXml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    const posts = getAllPosts();
    const lastBuild = posts[0]?.date
        ? new Date(posts[0].date).toUTCString()
        : new Date().toUTCString();

    const items = posts
        .map((post) => {
            const url = `${SITE_URL}/blog/${post.slug}`;
            const pubDate = new Date(post.date).toUTCString();
            const categories = post.tags
                .map((t) => `    <category>${escapeXml(t)}</category>`)
                .join("\n");
            return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeXml(post.description)}</description>
${categories}
  </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(SITE_TITLE)}</title>
  <link>${SITE_URL}</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>en-us</language>
  <lastBuildDate>${lastBuild}</lastBuildDate>
  <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}
