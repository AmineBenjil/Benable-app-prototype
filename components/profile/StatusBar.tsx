import { foregroundForBackground } from "@/lib/luminance";

/**
 * iPhone status bar rendered from the official Figma-exported SVG
 * (375 × 54). The asset is a single black SVG; we flip its color via
 * CSS mask-image so it adapts to light and dark backgrounds.
 *
 * Theme selection, in priority order:
 *   1. `backgroundColor` prop → WCAG-luminance auto-switch
 *   2. `theme` prop → explicit light/dark
 *   3. Fallback → "light" (black icons)
 *
 *   <StatusBar theme="light" />              → black icons
 *   <StatusBar theme="dark" />               → white icons
 *   <StatusBar backgroundColor="#0000ff" />  → white icons (auto)
 */
export function StatusBar({
  theme,
  backgroundColor,
}: {
  theme?: "light" | "dark";
  backgroundColor?: string;
}) {
  let resolved: "light" | "dark" = theme ?? "light";
  if (backgroundColor) {
    const result = foregroundForBackground(backgroundColor);
    if (result) resolved = result.choice === "black" ? "light" : "dark";
  }
  const color = resolved === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 h-[54px] w-[375px]">
      <span
        aria-hidden
        className="block h-full w-full"
        style={{
          backgroundColor: color,
          WebkitMaskImage: "url(/images/shared/status-bar.svg)",
          maskImage: "url(/images/shared/status-bar.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "top left",
          maskPosition: "top left",
          WebkitMaskSize: "375px 54px",
          maskSize: "375px 54px",
          transition: "background-color 200ms ease",
        }}
      />
    </div>
  );
}
