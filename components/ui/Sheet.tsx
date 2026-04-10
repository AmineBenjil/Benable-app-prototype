"use client";

/**
 * Shared iOS-style bottom sheet.
 *
 * Handles the chrome every sheet in this project shares:
 *   • Dimmed backdrop with tap-to-dismiss
 *   • Slide-up animation (iOS `cubic-bezier(0.32, 0.72, 0, 1)`)
 *   • 32px rounded top corners
 *   • Optional header with centered title + left/right icon slots
 *   • Optional grabber pill (drag handle)
 *   • Optional progressive-blur header variant
 *   • Optional sticky footer slot
 *
 * The iOS home indicator is NOT rendered here — it's a single persistent
 * component mounted at the `AppShell` level so one adaptive pill is
 * visible across every screen and sheet instead of a per-sheet duplicate.
 *
 * Consumers pass their own content as children and pick the pieces they
 * need via props. Every slot is optional — a sheet with no header and no
 * footer is just a rounded white panel sliding up from the bottom.
 */

import type { CSSProperties, ReactNode } from "react";

/* ── Header icon slot ─────────────────────────────────────────── */

export type SheetHeaderAction = {
  icon: ReactNode;
  onPress?: () => void;
  ariaLabel?: string;
};

/* ── Props ────────────────────────────────────────────────────── */

export type SheetProps = {
  /** Whether the sheet is visible. Controls the slide + backdrop fade. */
  open: boolean;
  /** Called when the user taps the backdrop. */
  onClose?: () => void;

  // ─ Sizing — pick one, otherwise height is content-driven ─
  /** Fixed height (number = px, string = any CSS length/%). */
  height?: number | string;
  /** Pixels from the top of the container to the top edge of the sheet.
   *  Useful for "large detent" style sheets that leave a sliver of the
   *  underlying screen visible. */
  topOffset?: number;

  // ─ Look ─
  /** Sheet background color. Default: "#ffffff". */
  background?: string;
  /** Rounded top corner radius. Default: 32. */
  radius?: number;
  /** Backdrop color. Default: "rgba(0, 0, 0, 0.4)". */
  backdropColor?: string;
  /** Soft drop shadow above the sheet's top edge. Default: true. */
  shadow?: boolean;
  /** Base z-index for the whole sheet stack. Default: 50. */
  zIndex?: number;

  // ─ Header — all optional, header is hidden if none of these are set ─
  /** Centered title text. */
  title?: string;
  /** Left-side icon + tap handler (e.g. back arrow, close X). */
  leftAction?: SheetHeaderAction;
  /** Right-side icon + tap handler. */
  rightAction?: SheetHeaderAction;
  /** Show the small iOS drag-handle pill at the very top. */
  showGrabber?: boolean;
  /** Use the progressive-blur header (content scrolls through the blur). */
  blurredHeader?: boolean;
  /** Override the default header height. */
  headerHeight?: number;

  // ─ Content ─
  children: ReactNode;

  // ─ Footer ─
  /** Sticky footer slot (e.g. CTA buttons). Renders at the very bottom
   *  of the panel. Consumer styles it entirely. */
  footer?: ReactNode;
};

/* ── Solid header (used by most sheets) ───────────────────────── */

function SolidHeader({
  title,
  leftAction,
  rightAction,
  showGrabber,
  height,
}: {
  title?: string;
  leftAction?: SheetHeaderAction;
  rightAction?: SheetHeaderAction;
  showGrabber?: boolean;
  height?: number;
}) {
  const hasRow = !!(title || leftAction || rightAction);
  // Default height depends on whether we show just a row, just a grabber,
  // or both. Matches the existing sheet dimensions in this project.
  const computedHeight =
    height ?? (showGrabber && hasRow ? 68 : showGrabber ? 22 : 48);

  return (
    <div
      className="relative flex w-full shrink-0 flex-col items-center"
      style={{ height: computedHeight }}
    >
      {showGrabber && (
        <div className="flex h-[22px] w-full items-center justify-center">
          <div className="h-[5px] w-9 rounded-full bg-[#d1d5db]" />
        </div>
      )}
      {hasRow && (
        <div className="relative flex w-full flex-1 items-center justify-center">
          {leftAction && (
            <button
              type="button"
              aria-label={leftAction.ariaLabel}
              onClick={leftAction.onPress}
              className="absolute left-4 flex h-8 w-8 items-center justify-center text-[#1c1c1c] transition-transform active:scale-95"
            >
              {leftAction.icon}
            </button>
          )}
          {title && (
            <p className="text-[16px] font-semibold leading-[20px] text-[#1c1c1c]">
              {title}
            </p>
          )}
          {rightAction && (
            <button
              type="button"
              aria-label={rightAction.ariaLabel}
              onClick={rightAction.onPress}
              className="absolute right-4 flex h-8 w-8 items-center justify-center text-[#1c1c1c] transition-transform active:scale-95"
            >
              {rightAction.icon}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Progressive-blur header (stepped blur fade) ─────────────── */

function BlurredHeader({
  title,
  leftAction,
  rightAction,
  radius,
  height = 68,
}: {
  title?: string;
  leftAction?: SheetHeaderAction;
  rightAction?: SheetHeaderAction;
  radius: number;
  height?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10"
      style={{ height }}
    >
      {/* Strong blur, fades out at 45% */}
      <div
        className="absolute inset-0"
        style={{
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(249, 250, 251, 0.55)",
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Softer blur, extends further down for the stepped effect */}
      <div
        className="absolute inset-0"
        style={{
          WebkitBackdropFilter: "blur(6px)",
          backdropFilter: "blur(6px)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        }}
      />
      {leftAction && (
        <button
          type="button"
          aria-label={leftAction.ariaLabel}
          onClick={leftAction.onPress}
          className="pointer-events-auto absolute left-4 top-[14px] flex h-8 w-8 items-center justify-center text-[#1c1c1c] transition-transform active:scale-95"
        >
          {leftAction.icon}
        </button>
      )}
      {rightAction && (
        <button
          type="button"
          aria-label={rightAction.ariaLabel}
          onClick={rightAction.onPress}
          className="pointer-events-auto absolute right-4 top-[14px] flex h-8 w-8 items-center justify-center text-[#1c1c1c] transition-transform active:scale-95"
        >
          {rightAction.icon}
        </button>
      )}
      {title && (
        <p className="absolute inset-x-0 top-[20px] text-center text-[16px] font-semibold leading-[20px] text-[#1c1c1c]">
          {title}
        </p>
      )}
    </div>
  );
}

/* ── Sheet ────────────────────────────────────────────────────── */

export function Sheet({
  open,
  onClose,
  height,
  topOffset,
  background = "#ffffff",
  radius = 32,
  backdropColor = "rgba(0, 0, 0, 0.4)",
  shadow = true,
  zIndex = 50,
  title,
  leftAction,
  rightAction,
  showGrabber = false,
  blurredHeader = false,
  headerHeight,
  children,
  footer,
}: SheetProps) {
  const hasHeader =
    !!(title || leftAction || rightAction || showGrabber || blurredHeader);

  const sheetStyle: CSSProperties = {
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    backgroundColor: background,
    transform: open ? "translateY(0)" : "translateY(100%)",
    transition: open
      ? "transform 480ms cubic-bezier(0.32, 0.72, 0, 1)"
      : "transform 340ms cubic-bezier(0.4, 0, 1, 1)",
    willChange: "transform",
    pointerEvents: open ? "auto" : "none",
  };
  if (shadow) {
    sheetStyle.boxShadow = "0px -12px 40px 0px rgba(0, 0, 0, 0.18)";
  }
  if (topOffset !== undefined) {
    sheetStyle.top = topOffset;
  } else if (height !== undefined) {
    sheetStyle.height = height;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ zIndex }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Dismiss sheet"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-default"
        style={{
          backgroundColor: backdropColor,
          opacity: open ? 1 : 0,
          transition: "opacity 360ms ease-out",
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Sheet panel */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col overflow-hidden"
        style={sheetStyle}
      >
        {hasHeader &&
          (blurredHeader ? (
            <BlurredHeader
              title={title}
              leftAction={leftAction}
              rightAction={rightAction}
              radius={radius}
              height={headerHeight}
            />
          ) : (
            <SolidHeader
              title={title}
              leftAction={leftAction}
              rightAction={rightAction}
              showGrabber={showGrabber}
              height={headerHeight}
            />
          ))}

        {/* Content — flex-1 fills the remaining space. Consumer decides
            whether to scroll or use absolute positioning inside. */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          {children}
        </div>

        {footer && <div className="w-full shrink-0">{footer}</div>}
      </div>
    </div>
  );
}
