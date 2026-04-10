import { MaskIcon } from "@/lib/icons";

/**
 * Step 2 — Delivery status empty state.
 *
 * After placing the order on Step 1, the user lands here while waiting
 * for the product to arrive. The screen is intentionally a centered,
 * low-density empty state: a round tinted badge with a truck icon, a
 * bold reassurance title, and a soft descriptive paragraph. No
 * tracking number yet — the copy promises it'll update when tracking
 * is available.
 *
 * Matches Figma node 7584:21151 — icon badge 56×56 #efecf7 + 24px
 * truck glyph, 16px gap to the two-line text block, body text capped
 * at ~293px so it wraps naturally over two lines.
 *
 * The footer ("I got the product") is rendered by the flow
 * controller via the shell's footer slot, not here.
 */
export function Step2Delivery() {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="flex w-[337px] flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#efecf7]">
          <MaskIcon
            src="/images/campaigns/acceptFlow/truck.svg"
            size={24}
            className="text-[#7a5cfa]"
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-[20px] font-semibold leading-[normal] text-[#1c1c1c]">
            Product is on its way
          </p>
          <p className="max-w-[293px] text-[14px] font-normal leading-5 text-[#717171]">
            Your order has been placed. We will update this page when tracking
            is available.
          </p>
        </div>
      </div>
    </div>
  );
}
