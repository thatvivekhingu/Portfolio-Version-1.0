import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ShimmerBorderProps {
  /** Color of the sweeping highlight. Matches ShimmerButton's default. */
  shimmerColor?: string;
  /** Arc width of the conic highlight. Matches ShimmerButton (90deg). */
  spread?: string;
  /** One full sweep duration. Matches ShimmerButton's shimmerDuration (3s). */
  duration?: string;
  /** Thickness of the visible border ring. */
  borderWidth?: string;
  className?: string;
}

/**
 * Animated shimmer border — the same rotating conic-gradient highlight the
 * ShimmerButton (status pill) uses, packaged as a non-invasive overlay like
 * BorderBeam. The conic spark fills the element and spins; a border-only mask
 * (border-box minus padding-box) reveals it as a thin sweeping ring, so the
 * host element's own background/content stay untouched.
 */
export const ShimmerBorder = ({
  shimmerColor = "#ffffff",
  spread = "90deg",
  duration = "3s",
  borderWidth = "1px",
  className,
}: ShimmerBorderProps) => {
  return (
    <span
      aria-hidden
      style={
        {
          "--spread": spread,
          "--shimmer-color": shimmerColor,
          "--speed": duration,
          "--border-width": borderWidth,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        className,
      )}
    >
      {/* spark container — container-query sized so cqw/cqh track the host */}
      <span className="absolute inset-0 overflow-visible blur-[2px] [container-type:size]">
        {/* spark slide — drifts the spinning spark across, ease-in-out alternate */}
        <span className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:2] [border-radius:0] [mask:none]">
          {/* spinning conic-gradient highlight */}
          <span className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </span>
      </span>
    </span>
  );
};
