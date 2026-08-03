import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { data } from "@/data/data";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { getAllPosts } from "@/lib/blog";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thatvivekhingu.github.io/portfolio-website"),
  title: "Vivek Hingu - AI/ML Engineer & Full-Stack Developer",
  description: "Personal portfolio of Vivek Hingu, AI/ML Engineer and Full-Stack Developer specializing in machine learning, voice systems, and modern web applications.",
  icons: {
    icon: [
      { url: "/logo/personal-logo.jpg", type: "image/jpeg" },       
      { url: "/favicon-196.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "https://thatvivekhingu.github.io/portfolio-website",
    title: "Vivek Hingu — AI/ML Engineer & Full-Stack Developer",
    description: "AI/ML Engineer & Full-Stack Developer building intelligent systems and scalable apps.",
    siteName: "Vivek Hingu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Hingu — AI/ML Engineer & Full-Stack Developer",
    description: "AI/ML Engineer & Full-Stack Developer building intelligent systems and scalable apps.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const palettePosts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
  }));

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased relative`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar navItems={data.nav} />
            <CommandPalette posts={palettePosts} />
            <Image
              src="/layout/background-ellipse3.svg"
              alt=""
              fill={false}
              width={0}
              height={0}
              className="z-1 blur-lg absolute max-w-5xl top-0 left-1/2 transform -translate-x-1/2 -translate-y-5/9 w-full pointer-events-none select-none"
              aria-hidden="true"
              priority
            />
            {children}
            <Footer />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
