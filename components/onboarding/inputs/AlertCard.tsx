import { ReactNode } from "react";

/**
 * Informational alert card — purple-tinted background with purple info
 * icon on the left and muted text on the right. Matches Figma
 * node 7357:72569.
 */
export function AlertCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-start gap-2 rounded-[12px] border-[0.5px] border-[#d6cfea] bg-[#f5f3fc] p-3">
      <span aria-hidden className="relative mt-[2px] h-5 w-5 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/onboarding/icons/info.svg"
          alt=""
          className="absolute inset-0 h-4 w-4 translate-x-[2px] translate-y-[2px]"
        />
      </span>
      <p className="flex-1 text-[14px] leading-5 text-[#717171]">{children}</p>
    </div>
  );
}
