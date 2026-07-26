"use client";

import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(getText());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // Clipboard API can fail in insecure contexts; silently no-op.
        }
      }}
      className="absolute top-2 right-2 rounded-md border border-border/60 bg-background/70 p-1.5 text-muted-foreground opacity-0 backdrop-blur transition-opacity duration-150 hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
    >
      {copied ? (
        <IconCheck className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <IconCopy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

/*
 * Mounts a CopyButton inside every <pre> rendered from blog markdown. The
 * article HTML comes from dangerouslySetInnerHTML so we can't render buttons
 * inline; we attach them post-hoc by scanning the container after paint.
 */
export function CopyCodeButtons({ containerSelector }: { containerSelector: string }) {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const pres = Array.from(container.querySelectorAll<HTMLPreElement>("pre"));
    const roots: Root[] = [];

    for (const pre of pres) {
      pre.classList.add("group", "relative");
      const mount = document.createElement("span");
      pre.appendChild(mount);
      const root = createRoot(mount);
      root.render(
        <CopyButton getText={() => pre.querySelector("code")?.textContent ?? ""} />
      );
      roots.push(root);
    }

    return () => {
      // Defer unmount to escape React's render phase; otherwise React 19
      // logs a warning about unmounting synchronously during commit.
      queueMicrotask(() => roots.forEach((r) => r.unmount()));
    };
  }, [containerSelector]);

  return null;
}
