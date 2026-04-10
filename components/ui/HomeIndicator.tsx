"use client";

import { useEffect, useRef, useState } from "react";
import {
  foregroundForBackground,
  pickForeground,
  type RGB,
} from "@/lib/luminance";

/**
 * iOS home-indicator pill, pixel-aligned to the iPhone 15 simulator:
 * 134 × 5px rounded capsule, 8px from the bottom of the screen.
 *
 * Adapts its fill to the background directly behind it:
 *  - Solid color → luminance-based black/white switch (WCAG) with 0.05
 *    hysteresis to prevent flicker at the threshold.
 *  - Transparent / unknown → black pill on a subtle frosted-glass capsule
 *    (`backdrop-filter: blur(8px)` + `rgba(255,255,255,0.15)`).
 *
 * Idle behavior: fades to `opacity: 0.3` (or `0` when `autoHide` is set)
 * after 4s of no pointer activity inside the simulator frame. Any
 * pointer interaction on the parent restores full opacity.
 */

export interface HomeIndicatorProps {
  /** CSS color of the screen directly behind the pill. */
  backgroundColor?: string;
  /** Force the frosted-glass fallback regardless of `backgroundColor`. */
  isTransparent?: boolean;
  /** Fully hide on idle instead of just dimming. */
  autoHide?: boolean;
  /** Render a subtler outline variant (e.g. during edge-swipe deferral). */
  deferGestures?: boolean;
  /** Element that counts as "the simulator frame" for idle tracking. */
  idleTarget?: React.RefObject<HTMLElement | null>;
  /** Expose the computed luminance + pill color for debug UIs. */
  onDiagnostics?: (d: { luminance: number | null; pill: "black" | "white" }) => void;
}

const WIDTH = 134;
const HEIGHT = 5;
const IDLE_MS = 4000;

export function HomeIndicator({
  backgroundColor,
  isTransparent = false,
  autoHide = false,
  deferGestures = false,
  idleTarget,
  onDiagnostics,
}: HomeIndicatorProps) {
  const [pill, setPill] = useState<"black" | "white">("black");
  const [idle, setIdle] = useState(false);
  const prevPillRef = useRef<"black" | "white">("black");

  // Stash the latest diagnostics callback in a ref so we can fire it
  // from the adaptive-color effect WITHOUT re-subscribing (and looping)
  // when the parent passes a fresh inline callback on every render.
  const onDiagnosticsRef = useRef(onDiagnostics);
  useEffect(() => {
    onDiagnosticsRef.current = onDiagnostics;
  }, [onDiagnostics]);

  // ── Adaptive color ──────────────────────────────────────────────
  // Recompute whenever the background changes. Hysteresis is tracked
  // via prevPillRef so we don't flip on every render.
  useEffect(() => {
    const report = onDiagnosticsRef.current;
    if (isTransparent || !backgroundColor) {
      // Transparent / frosted mode: default pill is black (most web
      // backgrounds are light). The blurred capsule handles contrast.
      setPill("black");
      prevPillRef.current = "black";
      report?.({ luminance: null, pill: "black" });
      return;
    }
    const result = foregroundForBackground(backgroundColor, prevPillRef.current);
    if (!result) {
      setPill("black");
      prevPillRef.current = "black";
      report?.({ luminance: null, pill: "black" });
      return;
    }
    setPill(result.choice);
    prevPillRef.current = result.choice;
    report?.({ luminance: result.luminance, pill: result.choice });
  }, [backgroundColor, isTransparent]);

  // ── Idle dimming ────────────────────────────────────────────────
  // Listen for pointer activity and reset a 4s timer; when it fires,
  // enter idle. We listen on the WHOLE document (not just the iPhone
  // frame) because in this simulator users drive the app via both the
  // phone canvas and the dev-panel sidebar — both count as "activity".
  // `idleTarget` is still accepted for callers that want the stricter
  // "only-inside-frame counts" behavior.
  useEffect(() => {
    const target: HTMLElement | Document =
      idleTarget?.current ?? document;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), IDLE_MS);
    };
    const wake = () => {
      setIdle(false);
      schedule();
    };

    const events = ["mousemove", "mousedown", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((e) => target.addEventListener(e, wake, { passive: true }));
    schedule();

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((e) => target.removeEventListener(e, wake));
    };
  }, [idleTarget]);

  const showFrosted = isTransparent || !backgroundColor;
  const fill =
    pill === "black" ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)";

  const idleOpacity = autoHide ? 0 : 0.3;
  const opacity = idle ? idleOpacity : 1;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 z-[60] -translate-x-1/2"
      style={{
        bottom: 8,
        width: WIDTH,
        height: HEIGHT,
        borderRadius: 9999,
        opacity,
        transition:
          "background-color 200ms ease, opacity 500ms ease, border-color 200ms ease",
        backgroundColor: showFrosted ? "rgba(255,255,255,0.15)" : "transparent",
        backdropFilter: showFrosted ? "blur(8px)" : undefined,
        WebkitBackdropFilter: showFrosted ? "blur(8px)" : undefined,
        // When deferring gestures, render a hollow outline instead of a
        // solid fill — matches iOS's subtler "swipe-from-edge disabled"
        // state used by media playback / fullscreen apps.
        border: deferGestures ? `1px solid ${fill}` : "none",
      }}
    >
      {!deferGestures && (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 9999,
            backgroundColor: fill,
            transition: "background-color 200ms ease",
          }}
        />
      )}
    </div>
  );
}

/**
 * Re-exported for tests / the dev panel debug label so the same
 * decision logic is used everywhere.
 */
export { pickForeground };
export type { RGB };
