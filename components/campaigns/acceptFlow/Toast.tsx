"use client";

import { MaskIcon } from "@/lib/icons";

type ToastProps = {
  /** Whether the toast is currently visible */
  visible: boolean;
  /** Message body */
  message: string;
};

/**
 * Dark pill-style toast that slides up from below with a soft fade.
 * Pixel-matched to Figma node 7574:19953:
 *   - #1c1c1c background, 12px radius, 56px height, 16px padding
 *   - 24px solid-info icon + 14px/20 white body text
 *   - 351px wide (16px inset on each side from the 375px canvas)
 *
 * The component is position-agnostic — mount it inside a `relative`
 * parent that anchors the desired bottom offset. The parent decides
 * WHERE it sits; this component only animates in and out.
 */
export function Toast({ visible, message }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-x-3 bottom-2 z-20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(calc(100% + 16px))",
        transition:
          "transform 320ms cubic-bezier(.22,.61,.36,1), opacity 220ms ease-out",
      }}
    >
      <div
        className="flex h-14 items-center gap-2 rounded-[12px] bg-[#1c1c1c] px-4"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
      >
        <MaskIcon
          src="/images/campaigns/acceptFlow/info-solid.svg"
          size={24}
          className="shrink-0 text-white"
        />
        <p className="min-w-0 flex-1 text-[14px] font-normal leading-5 text-white">
          {message}
        </p>
      </div>
    </div>
  );
}
