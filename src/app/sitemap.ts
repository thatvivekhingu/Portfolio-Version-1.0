import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://thatvivekhingu.github.io/portfolio-website";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = post.date ? new Date(post.date) : now;
    const validDate = isNaN(postDate.getTime()) ? now : postDate;
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: validDate,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...postRoutes];
}
