import Image from "next/image";
import { ReactNode } from "react";

/**
 * Realistic iPhone 15 Pro frame using the Natural Titanium PNG mockup.
 *
 * The source PNG is 473 × 932 px with a transparent screen cutout at
 * (40, 40) → (432, 891) — a 393 × 852 region with uniform 40px insets.
 *
 * We scale the PNG by 375/393 ≈ 0.9542 so the inner screen region
 * becomes exactly 375 × 812 (our Figma logical size). The screen
 * content sits behind the PNG; the PNG's own alpha mask clips the
 * rounded corners and covers everything outside the cutout.
 */
const SCREEN_W = 375;
const SCREEN_H = 812;

// PNG natural dimensions
const PNG_W = 473;
const PNG_H = 932;
const PNG_INSET_L = 40;
const PNG_INSET_T = 40;
const PNG_INSET_R = 40;
const PNG_INSET_B = 41;

// Scale factor to make inner 393×852 cutout become 375×812
const SCALE = SCREEN_W / (PNG_W - PNG_INSET_L - PNG_INSET_R); // 375/393

const FRAME_W = Math.round(PNG_W * SCALE);
const FRAME_H = Math.round(PNG_H * SCALE);
const SCREEN_LEFT = Math.round(PNG_INSET_L * SCALE);
const SCREEN_TOP = Math.round(PNG_INSET_T * SCALE);

export function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative"
      style={{
        width: FRAME_W,
        height: FRAME_H,
        filter:
          "drop-shadow(0 60px 100px rgba(0,0,0,0.45)) drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
      }}
    >
      {/* Screen content — positioned BEHIND the frame PNG. The content is
          clipped with the same corner radius as the iPhone screen so no
          square edges poke through the PNG's rounded transparent cutout.

          The `-webkit-mask-image` hack + `isolation: isolate` force
          WebKit/Safari to properly clip children that use `transform:`
          (our sliding tab panels and pushed views). Without it, transformed
          children escape the `border-radius + overflow: hidden` clip and
          poke square corners through the PNG cutout. */}
      <div
        className="absolute overflow-hidden bg-white"
        style={{
          left: SCREEN_LEFT,
          top: SCREEN_TOP,
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: 55,
          isolation: "isolate",
          WebkitMaskImage:
            "radial-gradient(circle at center, #000 100%, #000 100%)",
          maskImage:
            "radial-gradient(circle at center, #000 100%, #000 100%)",
        }}
      >
        {children}
      </div>

      {/* iPhone frame overlay — its transparent cutout reveals the screen
          and its alpha mask provides the rounded corners + titanium rail. */}
      <Image
        src="/images/iphone-frame.png"
        alt=""
        width={FRAME_W}
        height={FRAME_H}
        priority
        className="pointer-events-none absolute inset-0 select-none"
      />

      {/* Dynamic Island — rendered on top of everything, including any
          content the app draws into its status bar area. The PNG's own
          island was part of the transparent cutout, so we redraw it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 z-50 -translate-x-1/2"
        style={{
          top: SCREEN_TOP + 11,
          width: 124,
          height: 35,
          borderRadius: 999,
          background: "#000",
          boxShadow:
            "0 0 0 0.5px #1a1a1a, 0 1px 3px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}
