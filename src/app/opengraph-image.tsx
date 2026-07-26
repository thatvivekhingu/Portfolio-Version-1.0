import { ImageResponse } from "next/og";

export const alt = "Vivek Hingu — AI/ML Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
                        gap: "16px",
                        fontSize: "28px",
                        color: "#a1a1aa",
                    }}
                >
                    <div
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "999px",
                            background: "#22c55e",
                            boxShadow: "0 0 16px #22c55e",
                        }}
                    />
                    github.com/thatvivekhingu
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div
                        style={{
                            fontSize: "120px",
                            fontWeight: 800,
                            letterSpacing: "-0.04em",
                            lineHeight: 1,
                            backgroundImage:
                                "linear-gradient(180deg, #fafafa 0%, #a1a1aa 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Vivek Hingu
                    </div>
                    <div
                        style={{
                            fontSize: "44px",
                            color: "#d4d4d8",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        AI/ML Engineer & Full-Stack Developer.
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "32px",
                        fontSize: "26px",
                        color: "#71717a",
                    }}
                >
                    <span>Gujarat, India</span>
                    <span>·</span>
                    <span>Building AI Systems & Web Apps</span>
                </div>
            </div>
        ),
        size,
    );
}
