import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function OGImage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const title = post?.title ?? "Blog post";
    const description = post?.description ?? "";
    const date = post?.date
        ? new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
          })
        : "";
    const readingTime = post?.readingTime ?? "";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "80px",
                    background:
                        "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
                    color: "#fafafa",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "26px",
                        color: "#a1a1aa",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div
                            style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "999px",
                                background: "#22c55e",
                                boxShadow: "0 0 14px #22c55e",
                            }}
                        />
                        thatvivekhingu.github.io / blog
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        {date && <span>{date}</span>}
                        {readingTime && (
                            <>
                                <span>·</span>
                                <span>{readingTime}</span>
                            </>
                        )}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                    <div
                        style={{
                            fontSize: title.length > 40 ? 76 : 96,
                            fontWeight: 800,
                            letterSpacing: "-0.035em",
                            lineHeight: 1.05,
                            backgroundImage:
                                "linear-gradient(180deg, #fafafa 0%, #a1a1aa 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                            display: "flex",
                        }}
                    >
                        {title}
                    </div>
                    {description && (
                        <div
                            style={{
                                fontSize: "32px",
                                color: "#d4d4d8",
                                lineHeight: 1.35,
                                letterSpacing: "-0.015em",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {description}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontSize: "26px",
                        color: "#71717a",
                    }}
                >
                    <span style={{ color: "#fafafa", fontWeight: 600 }}>
                        Vivek Hingu
                    </span>
                    <span>·</span>
                    <span>AI/ML Engineer & Full-Stack Developer</span>
                </div>
            </div>
        ),
        size,
    );
}
