---
title: "3 View Transitions Worth Shipping"
description: "The browser's View Transitions API earns its keep in three places: theme swaps, shared elements between pages, and plain old route changes."
date: "2026-05-16"
tags: ["css", "animation", "nextjs", "view-transitions"]
image: "/blog/view-transitions.svg"
imageAlt: "A small thumbnail morphing into a larger panel along a curved path"
---

I added view transitions to this site recently. They're built into the browser now:

```ts
document.startViewTransition(() => {
  // mutate the DOM here
  setTheme(next);
});
```

The browser snapshots the old state, runs your mutation, snapshots the new state, and cross-fades between them. That's it.

The trick is *where* to use it. Wire it up everywhere and the site starts feeling slow, because every click costs you 300ms. Wire it up nowhere and you missed the point. Three places earned their keep on this site.

## Theme swap

The easiest win. `setTheme` in `next-themes` flips a class on `<html>`, and the entire palette changes in one DOM mutation. Wrap it in `startViewTransition` and the page cross-fades between light and dark instead of snapping. No shared elements, no per-element naming. Twelve lines of code, immediately visible.

## Shared elements

The showstopper. On the blog list and on each post, the title heading gets the same `view-transition-name`, keyed by slug. When you click through, the browser sees an element with that name on both sides and *morphs the bounding rect* from list-item position to article-heading position. Same for the cover image. The effect is cinematic and it cost me almost nothing to add: two `style={{ viewTransitionName }}` lines.

## Cross-page navigation

Even without shared elements, a 300ms cross-fade between routes makes the site feel less like a stack of documents and more like an app. The whole rest of the page transitions under the `root` view-transition-name automatically. You get this for free as soon as you've wrapped one navigation.

## What I skipped

Section anchors (Home / Projects / Experience) on this page. Those are scroll-to-anchor, not route changes; the API doesn't apply. And every internal link, indiscriminately. The animation stops feeling intentional when it's everywhere.

The whole feature took an afternoon. The shared-element morph is the kind of thing that used to need a serious animation library, and now it's just CSS plus one Web API call.
