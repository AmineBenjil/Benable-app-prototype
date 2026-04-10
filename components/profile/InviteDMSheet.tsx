"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { inviteSheet } from "@/lib/sheetData";
import { useNavigation } from "@/components/AppShell";
import { Sheet } from "@/components/ui/Sheet";
import { useDevFlags } from "@/components/devPanel/DevPanelContext";

/**
 * Wrapper that mirrors production behavior: the sheet slides up 4 seconds
 * after mount. Exposed as the default entry point so the ProfileScreen
 * (which is a Server Component) doesn't need state of its own.
 *
 * Gated by the `brandClubEnabled` dev flag — when disabled from the sidebar,
 * the sheet never opens and any currently-open sheet is immediately dismissed.
 */
export function DelayedInviteDMSheet({ delayMs = 4000 }: { delayMs?: number }) {
  const { flags } = useDevFlags();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!flags.brandClubEnabled) {
      setOpen(false);
      return;
    }
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, flags.brandClubEnabled]);

  if (!flags.brandClubEnabled) return null;
  return <InviteDMSheet open={open} />;
}

/**
 * "Invite DM Sheet" — matches Figma node 7270:18093.
 *
 * Structure:
 *  - 375 × 613 sheet, bottom-aligned
 *  - Rounded top 32px, white background, clipped
 *  - Decorative Bg area at top (275h) with brand-logo grid on a pastel
 *    gradient, fading to white
 *  - Content (avatar, name pill, headline, description, 3 features)
 *  - Sticky purple Get Started button
 *
 * Positioning is kept pixel-exact to Figma: content at (38.5, 203, w=298),
 * brand grid fills 275h above.
 */
export function InviteDMSheet({ open }: { open: boolean }) {
  const { navigate } = useNavigation();
  return (
    <Sheet
      open={open}
      height={613}
      backdropColor="rgba(28, 28, 28, 0.6)"
      zIndex={40}
      shadow={false}
    >
      <div className="relative flex-1">
        {/* Decorative top area: gradient Bg + looping brand carousel.
            The Bg PNG includes the grabber pill + pastel gradient that
            fades to white at the bottom. The brands strip slides slowly
            on top of it in an infinite horizontal loop. */}
        <div className="absolute left-0 top-0 h-[275px] w-full overflow-hidden">
          {/* Background image (grabber + gradient) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sheet/bg.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />

          {/* Looping brands carousel — two strips side-by-side, animated
              by exactly 50% (one strip width) for a seamless loop. */}
          <div
            className="pointer-events-none absolute left-0 right-0 overflow-hidden"
            style={{ top: 40, height: 155 }}
          >
            <div className="brand-scroll flex h-full w-max">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/images/sheet/brands-strip.png"
                alt=""
                className="h-full w-auto shrink-0"
              />
              <img
                src="/images/sheet/brands-strip.png"
                alt=""
                className="h-full w-auto shrink-0 ml-[-4px]"
              />
              {/* eslint-enable @next/next/no-img-element */}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          className="absolute flex flex-col items-center gap-7"
          style={{ left: 38.5, top: 203, width: 298 }}
        >
          {/* Avatar + name pill */}
          <div className="relative flex flex-col items-center">
            {/* Avatar — 77px circle (20% smaller than 96). */}
            <div className="relative h-[77px] w-[77px] overflow-hidden rounded-full bg-white">
              <Image
                src={inviteSheet.avatar}
                alt={inviteSheet.senderName}
                fill
                sizes="77px"
                className="object-cover"
                style={{ transform: "scale(1.5)" }}
                priority
              />
            </div>
            {/* Gradient-border pill (20% smaller than before). */}
            <div
              className="relative -mt-[13px] rounded-full p-[1.5px]"
              style={{
                background:
                  "linear-gradient(95deg, #4daeff 0%, #a78bfa 50%, #fbbf6b 100%)",
              }}
            >
              <div className="rounded-full bg-white px-4 py-[6px]">
                <span
                  className="text-[21px] font-bold leading-none text-[#1c1c1c]"
                  style={{
                    fontFamily: "var(--font-narrow)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {inviteSheet.senderName}
                </span>
              </div>
            </div>
          </div>

          {/* Headline + description */}
          <div className="flex flex-col items-center gap-1 text-[#717171]">
            <p className="text-[18px] font-extrabold leading-none tracking-[-0.5px]">
              {inviteSheet.headline}
            </p>
            <p className="w-[285px] text-center text-[16px] leading-snug">
              {inviteSheet.description}
            </p>
          </div>

          {/* Feature rows */}
          <ul className="flex w-full flex-col gap-3">
            {inviteSheet.features.map((f) => (
              <li key={f.text} className="flex items-center gap-2">
                <span className="relative h-5 w-5 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.icon}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </span>
                <span className="text-[14px] leading-snug text-[#545454]">
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA button — pinned at the bottom of the content area. The
            iOS home indicator is drawn persistently by AppShell on top. */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            type="button"
            onClick={() => navigate("onboarding")}
            className="flex h-12 w-full items-center justify-center rounded-[12px] bg-[#7a5cfa] px-6 text-[16px] font-medium text-white transition-transform active:scale-[0.98]"
          >
            {inviteSheet.cta}
          </button>
        </div>
      </div>
    </Sheet>
  );
}
