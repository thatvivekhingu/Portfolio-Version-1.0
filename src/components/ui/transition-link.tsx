"use client";

// Drop-in replacement that delegates to next-view-transitions' Link so the
// view transition's promise resolves when Next's router actually commits the
// new tree — avoids the "timeout in DOM update" abort that the naive
// startViewTransition + router.push pattern hits during RSC navigation.
//
// Falls back to plain navigation automatically when the browser lacks the
// View Transitions API.
export { Link as TransitionLink } from "next-view-transitions";
