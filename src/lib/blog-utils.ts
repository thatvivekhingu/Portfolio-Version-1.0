// Pure utilities shared between server-side blog loading and client-side
// rendering. No Node-only imports here, this file must be safe to import
// from "use client" components.

import GithubSlugger from "github-slugger";

export interface Heading {
    level: number;
    text: string;
    slug: string;
}

// Matches rehype-slug's algorithm so TOC link targets line up with the IDs
// rehype-slug injects into the rendered HTML.
const slugger = new GithubSlugger();

export function slugify(text: string): string {
    // Reset between calls because we don't want cross-post uniqueness counters.
    // Within a single post, heading uniqueness is the caller's responsibility.
    slugger.reset();
    return slugger.slug(text);
}
