"use client";

/**
 * CampaignCard — matches Figma node 7479:1016989 (Design Labs file).
 *
 * A 343×241 rounded container with:
 * - A 72px header area (soft purple/pink gradient + blurred glow blobs)
 *   containing the brand logo + brand name.
 * - An inner white card at the bottom with the campaign title, description
 *   (wraps to ~3 lines), and a "View Details" outlined CTA button.
 *
 * Brand logos are rendered as plain <img> because brand marks are
 * multi-color (per project rule in CLAUDE.md).
 *
 * `logoFill` controls how the logo sits inside its 48px circle:
 * - "contain" (default) — logo is scaled down with padding. Use for brand
 *   SVGs that have tight bounds (Nike, Adidas, etc.).
 * - "cover" — logo fills the entire circle. Use for pre-rounded full-bleed
 *   brand images (e.g. Pikora).
 */
export type CampaignCardProps = {
  brandLogo: string;
  brandName: string;
  title: string;
  description: string;
  ctaLabel?: string;
  logoFill?: "contain" | "cover";
  onPress?: () => void;
};

export function CampaignCard({
  brandLogo,
  brandName,
  title,
  description,
  ctaLabel = "View Details",
  logoFill = "contain",
  onPress,
}: CampaignCardProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="relative flex flex-col h-[241px] w-full overflow-hidden rounded-[16px] text-left transition-transform active:scale-[0.99]"
      style={{
        border: "0.5px solid #e3e3e3",
        backgroundImage:
          "linear-gradient(87.37deg, rgba(204,161,247,0.12) 7%, rgba(215,164,222,0.12) 48%, rgba(234,169,178,0.12) 95%), linear-gradient(90deg, #ffffff 0%, #ffffff 100%)",
      }}
    >
      {/* Header area with gradient glow blobs */}
      <div className="relative h-[72px] w-full">
        {/* Pink glow, bottom-left */}
        <div
          className="pointer-events-none absolute bottom-[23px] left-6 h-[60px] w-[59px] rounded-full"
          style={{
            backgroundColor: "#eaa9b2",
            filter: "blur(54px)",
          }}
        />
        {/* Purple glow, far top-right (outside the visible frame — creates a soft edge) */}
        <div
          className="pointer-events-none absolute right-[-40px] top-[-29px] h-[74px] w-[103px] rounded-full"
          style={{
            backgroundColor: "rgba(122, 92, 250, 0.5)",
            filter: "blur(54px)",
          }}
        />

        {/* Brand logo + name row */}
        <div className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center gap-3">
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white"
            style={{ boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandLogo}
              alt={`${brandName} logo`}
              className={
                logoFill === "cover"
                  ? "absolute inset-0 h-full w-full object-cover"
                  : "absolute left-1/2 top-1/2 h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 object-contain"
              }
            />
          </div>
          <p className="whitespace-nowrap text-[16px] font-bold leading-4 text-[#1c1c1c]">
            {brandName}
          </p>
        </div>
      </div>

      {/* Inner white card */}
      <div
        className="absolute bottom-2 left-2 right-2 flex flex-col gap-5 overflow-hidden rounded-[12px] bg-white p-3"
        style={{ boxShadow: "0px 16px 40px 0px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="flex w-full flex-col gap-1">
          <p className="w-full text-[14px] font-medium leading-[normal] text-[#222222]">
            {title}
          </p>
          <p className="w-full text-[14px] font-normal leading-[normal] text-[#717171]">
            {description}
          </p>
        </div>

        <span
          aria-hidden
          className="flex w-full items-center justify-center rounded-[40px] border border-[#7a5cfa] bg-white px-6 py-3 text-[14px] font-medium leading-[normal] text-[#7a5cfa]"
        >
          {ctaLabel}
        </span>
      </div>
    </button>
  );
}
