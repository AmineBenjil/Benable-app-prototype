import { CSSProperties } from "react";

/* ---------------------------------------------------------------
 * All icons are SVGs exported from the Figma file into
 * /public/images/profile/{icons,social}/ via the Figma MCP.
 *
 * UI icons are rendered via CSS mask-image so their color can
 * follow the parent's `background-color` (= currentColor when we
 * set it inline). Brand icons are multicolor and rendered as
 * plain <img>.
 * ------------------------------------------------------------- */

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function MaskIcon({
  src,
  size = 24,
  className,
  style,
}: {
  src: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
}

/* ============ UI icons (tinted via currentColor) ============= */

export const SearchIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/search.svg" {...p} />
);
export const HamburgerIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/hamburger.svg" {...p} />
);
export const PlusIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/plus-small.svg" {...p} />
);
export const PlusBigIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/plus-big.svg" {...p} />
);
export const MenuDotsIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/menu-dots.svg" {...p} />
);
export const HeartIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/heart.svg" {...p} />
);
export const CommentIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/comment.svg" {...p} />
);
export const ShareIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/share.svg" {...p} />
);
export const BookmarkIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/bookmark.svg" {...p} />
);
export const DiscoverIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/discover.svg" {...p} />
);
export const InvitesIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/invites.svg" {...p} />
);
export const BellIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/bell.svg" {...p} />
);
export const CoverMenuIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/cover-menu.svg" {...p} />
);
export const DashboardIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/dashboard.svg" {...p} />
);
export const SettingsIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/settings.svg" {...p} />
);
export const ContactIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/contact.svg" {...p} />
);
export const SignOutIcon = ({ size = 24, className, style }: IconProps) => (
  <MaskIcon
    src="/images/profile/icons/sign-out.svg"
    size={size}
    className={className}
    style={{ transform: "rotate(90deg)", ...style }}
  />
);
export const InsightIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/insight.svg" {...p} />
);
export const GaugeIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/gauge.svg" {...p} />
);
export const CashbackIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/cashback.svg" {...p} />
);
export const BrandPartnersIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/brand-partners.svg" {...p} />
);
export const ChevronLeftIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/chevron-left.svg" {...p} />
);
export const BrandCollabsIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/brand-collabs.svg" {...p} />
);
export const CollapsePanelIcon = (p: IconProps) => (
  <MaskIcon src="/images/profile/icons/collapse-panel.svg" {...p} />
);

/* ============ Brand / multicolor icons =============== */

export function VerifiedIcon({ size = 16, className }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/profile/icons/verified.svg"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    />
  );
}

export function FacebookLogo({ size = 24, className }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/profile/social/facebook.svg"
      alt="Facebook"
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    />
  );
}

export function InstagramLogo({ size = 24, className }: IconProps) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/images/profile/social/instagram-bg.svg"
        alt=""
        className="absolute inset-0 h-full w-full"
        style={{ transform: "scale(1.085)" }}
      />
      <img
        src="/images/profile/social/instagram.svg"
        alt="Instagram"
        className="absolute inset-0 h-full w-full"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}

export function PinterestLogo({ size = 24, className }: IconProps) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/images/profile/social/pinterest-bg.svg"
        alt=""
        className="absolute inset-0 h-full w-full"
      />
      <img
        src="/images/profile/social/pinterest.svg"
        alt="Pinterest"
        className="absolute inset-0 h-full w-full"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
