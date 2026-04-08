/**
 * iPhone status bar rendered from the official Figma-exported SVG
 * (375×54). The asset is a single black SVG; we flip its color via
 * CSS mask-image so it adapts to light and dark backgrounds.
 *
 *   <StatusBar theme="light" /> → black icons (for white backgrounds)
 *   <StatusBar theme="dark" />  → white icons (for dark backgrounds)
 */
export function StatusBar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const color = theme === "dark" ? "#ffffff" : "#000000";
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
        }}
      />
    </div>
  );
}
