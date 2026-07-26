---
title: "Building My Portfolio Website"
description: "How I built this portfolio with Next.js 15, React 19, and a bunch of fun animations."
date: "2026-04-12"
tags: ["nextjs", "react", "portfolio"]
image: "/blog/building-my-portfolio.svg"
imageAlt: "Stacked browser-window panels representing UI components"
---

This is my first blog post: a quick look at how I built this site and some of the decisions I made along the way.

## The Stack

I went with **Next.js 15** and **React 19** because I wanted the latest features: Server Components, the App Router, and improved streaming. For styling, **Tailwind CSS** keeps things fast and consistent.

## Animations

One of the things I spent the most time on was getting the animations right. The site uses a mix of:

- **Framer Motion** for scroll-triggered reveals and interactive elements
- **Custom CSS keyframes** for the meteor shower, shimmer effects, and wiggle animations
- **Canvas-based effects** like the interactive globe and the constellation background

## The Dashboard

The dashboard section pulls in live data from a few APIs:

- **Spotify** shows my last played track
- **WakaTime** tracks my coding hours
- **GitHub** renders a contribution heatmap

Each widget has its own animation timing so they cascade in nicely on scroll.

## What's Next

I'm planning to add more blog posts about the projects I've worked on, deep dives into interesting technical problems, and maybe some tutorials. Stay tuned.
