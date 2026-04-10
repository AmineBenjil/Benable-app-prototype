import { ReactNode } from "react";

type OnboardingShellProps = {
  title: string;
  /** 0 – 100 (percent filled) */
  progress: number;
  onBack: () => void;
  children: ReactNode;
  /** Optional sticky primary CTA rendered at the bottom of the shell */
  cta?: ReactNode;
  /** Optional body background color (defaults to white) */
  bodyBackground?: string;
};

/**
 * Reusable shell for every onboarding step.
 * Matches Figma node 7341:71944 ("Onboarding - 436"):
 *  - (Status bar + home indicator are drawn persistently by AppShell)
 *  - Header (48h): back arrow, centered title, hairline divider, progress bar
 *  - Body slot
 *  - Optional sticky CTA
 */
export function OnboardingShell({
  title,
  progress,
  onBack,
  children,
  cta,
  bodyBackground = "#ffffff",
}: OnboardingShellProps) {
  return (
    <div
      className="relative flex h-full w-full flex-col"
      style={{ backgroundColor: bodyBackground }}
    >
      {/* Opaque white bar behind the (persistent AppShell-level) status
          bar so the off-white body background doesn't tint the icons. */}
      <div className="absolute left-0 right-0 top-0 z-30 h-[54px] bg-white" />

      {/* Header */}
      <header className="relative mt-[54px] h-[48px] w-full bg-white">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="absolute left-3 top-2 flex h-8 w-8 items-center justify-center text-[#1c1c1c] active:scale-95 transition-transform"
        >
          <span
            aria-hidden
            className="inline-block h-4 w-4 bg-current"
            style={{
              WebkitMaskImage: "url(/images/onboarding/icons/chevron-left.svg)",
              maskImage: "url(/images/onboarding/icons/chevron-left.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              // Figma exports the raw chevron facing right; mirror it.
              transform: "rotate(180deg)",
            }}
          />
        </button>

        <h1 className="absolute left-1/2 top-3 h-6 -translate-x-1/2 text-[14px] font-semibold leading-6 text-black">
          {title}
        </h1>

        {/* Progress bar track (2px, bottom) with purple fill */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-[#ededed]">
          <div
            className="h-full bg-[#7a5cfa] transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      </header>

      {/* Body */}
      <div className="ios-scroll relative flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Sticky CTA. 21px of breathing room below reserves the same
          space the old in-shell home indicator took so layouts aren't
          cramped by the persistent AppShell-level pill. */}
      {cta && (
        <div
          className="relative w-full px-4 pt-4 pb-[25px]"
          style={{ backgroundColor: bodyBackground }}
        >
          {cta}
        </div>
      )}
    </div>
  );
}
