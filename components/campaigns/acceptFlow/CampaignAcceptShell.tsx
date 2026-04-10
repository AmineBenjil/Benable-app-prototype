import { ReactNode } from "react";
import { StepStepper } from "./StepStepper";

type CampaignAcceptShellProps = {
  /** Brand name (small label on top) */
  brandName: string;
  /** Brand circular logo URL (40px avatar) */
  brandLogo: string;
  /** How the logo image should fit inside the avatar */
  logoFill?: "contain" | "cover";
  /** Campaign title (bold name below brand) */
  campaignName: string;
  /** 1-based index of the current step (1–4) */
  step: number;
  /** Partial fill for the current step segment (0–1). Defaults to 1. */
  currentStepProgress?: number;
  /** Back button handler (exits the flow or steps backward) */
  onBack: () => void;
  /** Tapped when the user presses the "Brief" CTA in the header */
  onBriefPress?: () => void;
  /** Scrollable body slot */
  children: ReactNode;
  /** Sticky footer slot (info row + CTA) — consumer styles entirely */
  footer?: ReactNode;
  /** Overlay slot anchored directly ABOVE the sticky footer.
   *  Used for toast messages that should visually float over the body
   *  content while the footer stays interactive. Consumer handles the
   *  overlay's own show/hide animation. */
  overlay?: ReactNode;
};

const STEP_LABELS = ["Product", "Delivery", "Content", "Publish"] as const;

/**
 * Shell for the Campaign Accept Flow.
 *
 * Header layout (matches Figma node 7562:1017924):
 *   54px status spacer → 52px header → 63px stepper bar.
 * The header shows a back arrow on the left, a compact brand/campaign
 * identity pill (40px circular logo + two-line text) in the middle,
 * and a "Brief" text CTA on the right that opens a view-only brief
 * sheet so the creator can re-read the commitment they already accepted.
 *
 * The body below uses `flex-1 overflow-y-auto` so the fixed header
 * stays locked while content scrolls.
 */
export function CampaignAcceptShell({
  brandName,
  brandLogo,
  logoFill = "contain",
  campaignName,
  step,
  currentStepProgress = 1,
  onBack,
  onBriefPress,
  children,
  footer,
  overlay,
}: CampaignAcceptShellProps) {
  return (
    <div className="relative flex h-full w-full flex-col bg-[#f9fafb]">
      {/* 54px opaque white spacer so the persistent AppShell status bar
          has white behind it (matching the Figma canvas). */}
      <div className="h-[54px] w-full shrink-0 bg-white" />

      {/* 52px header with back arrow + brand identity + Brief CTA */}
      <header className="relative h-[52px] w-full shrink-0 bg-white">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="absolute left-3 top-[10px] flex h-8 w-8 items-center justify-center text-[#1c1c1c] transition-transform active:scale-95"
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
              // Figma's chevron-left is actually a chevron-right rotated
              // in place; mirror it so the arrow points left.
              transform: "rotate(180deg)",
            }}
          />
        </button>

        {/* Brand identity pill — left-anchored after the back arrow */}
        <div className="absolute left-[48px] top-1/2 flex -translate-y-[calc(50%+2px)] items-center gap-2">
          <div
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white"
            style={{ border: "0.5px solid #e3e3e3" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandLogo}
              alt={brandName}
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: logoFill }}
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="truncate text-[12px] font-medium leading-[normal] text-[#717171]">
              {brandName}
            </p>
            <p className="truncate text-[13px] font-semibold leading-4 text-[#1c1c1c]">
              {campaignName}
            </p>
          </div>
        </div>

        {/* Brief CTA — right-aligned text button */}
        <button
          type="button"
          onClick={onBriefPress}
          className="absolute right-4 top-1/2 -translate-y-[calc(50%+2px)] text-[14px] font-semibold leading-[normal] text-[#1c1c1c] transition-opacity active:opacity-60"
        >
          Brief
        </button>
      </header>

      {/* 63px stepper bar with hairline bottom border */}
      <div className="relative h-[63px] w-full shrink-0 overflow-hidden bg-white">
        <StepStepper
          step={step}
          total={STEP_LABELS.length}
          labels={STEP_LABELS}
          currentStepProgress={currentStepProgress}
        />
        {/* 0.5px hairline divider at the bottom of the header block */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#e3e3e3]" style={{ transform: "scaleY(0.5)" }} />
      </div>

      {/* Scrollable body — `flex-1` + `overflow-y-auto` isolates scrolling
          to this area so the fixed header above stays locked. */}
      <div className="ios-scroll relative flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Sticky footer — sits above the persistent home indicator.
          Wrapped in a `relative` container so the `overlay` slot
          (e.g. a toast) can anchor itself directly above via
          `absolute bottom-full`. */}
      {footer && (
        <div className="relative w-full shrink-0 bg-white">
          {overlay && (
            <div className="pointer-events-none absolute inset-x-0 bottom-full">
              {overlay}
            </div>
          )}
          {footer}
        </div>
      )}
    </div>
  );
}
