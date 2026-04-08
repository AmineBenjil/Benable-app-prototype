/**
 * Brand logo cards that float in the decorative top area of the
 * InviteDMSheet. Positions and sizes are taken directly from Figma
 * node 7270:18097 (parent) relative to its `left:-82.02, top:24` origin.
 *
 * The parent is 375px wide with the brand grid extending off the left
 * and right edges to give a wraparound feel. We reuse the exact
 * coordinates; overflow is clipped by the sheet.
 */

export type BrandCard = {
  id: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Inner padding percent for the logo inside the card */
  padding?: number;
  /** Whether the card itself has a white bg + blue hairline border */
  boxed?: boolean;
  objectFit?: "contain" | "cover";
};

const ORIGIN_X = -82.02;

/** Absolute position helper — converts Figma left offset (relative to
 *  parent's -82.02 origin) into a position relative to the sheet. */
const pos = (left: number, top: number) => ({
  x: left - ORIGIN_X,
  y: top,
});

export const brandCards: BrandCard[] = [
  {
    id: "free-people",
    src: "/images/sheet/brands/free-people.svg",
    ...pos(-82.02, 24),
    w: 54.74,
    h: 58.86,
    boxed: true,
    padding: 20,
  },
  {
    id: "etsy",
    src: "/images/sheet/brands/etsy.svg",
    ...pos(-20.56, 24),
    w: 54.74,
    h: 76.52,
    boxed: false,
    objectFit: "contain",
  },
  {
    id: "nike",
    src: "/images/sheet/brands/nike.svg",
    ...pos(40.9, 24),
    w: 54.74,
    h: 49.44,
    boxed: false,
    objectFit: "contain",
  },
  {
    id: "revolve",
    src: "/images/sheet/brands/revolve.png",
    ...pos(102.36, 24),
    w: 54.74,
    h: 66.51,
    boxed: true,
    padding: 6,
  },
  {
    id: "supergoop",
    src: "/images/sheet/brands/supergoop.png",
    ...pos(163.82, 24),
    w: 54.74,
    h: 47.68,
    boxed: true,
    padding: 12,
  },
  {
    id: "vrbo",
    src: "/images/sheet/brands/vrbo.png",
    ...pos(225.28, 24),
    w: 54.74,
    h: 72.99,
    boxed: true,
    padding: 16,
  },
  {
    id: "ebay",
    src: "/images/sheet/brands/ebay.png",
    ...pos(286.74, 24),
    w: 54.74,
    h: 50.62,
    boxed: true,
    padding: 15,
  },
  {
    id: "barnes-noble",
    src: "/images/sheet/brands/bn.png",
    ...pos(348.2, 24),
    w: 54.74,
    h: 70.63,
    boxed: true,
    padding: 8,
  },
  {
    id: "coach",
    src: "/images/sheet/brands/coach.png",
    ...pos(409.66, 24),
    w: 54.74,
    h: 47.68,
    boxed: true,
    padding: 15,
  },
  {
    id: "chewy",
    src: "/images/sheet/brands/chewy.png",
    ...pos(471.12, 24),
    w: 54.74,
    h: 66.51,
    boxed: true,
    padding: 10,
  },
  {
    id: "ulta",
    src: "/images/sheet/brands/target.svg",
    ...pos(532.58, 24.59),
    w: 54.74,
    h: 52.97,
    boxed: true,
    padding: 12,
  },
  {
    id: "charlotte",
    src: "/images/sheet/brands/charlotte.png",
    ...pos(594.04, 24.59),
    w: 54.74,
    h: 76.52,
    boxed: true,
    padding: 16,
  },
  {
    id: "benefit",
    src: "/images/sheet/brands/benefit.png",
    ...pos(655.5, 24),
    w: 54.74,
    h: 53.56,
    boxed: true,
    padding: 14,
  },
  // Second row
  {
    id: "sephora",
    src: "/images/sheet/brands/sephora.png",
    ...pos(-82.02, 89.58),
    w: 54.74,
    h: 65.34,
    boxed: true,
    padding: 22,
  },
  {
    id: "target",
    src: "/images/sheet/brands/target.svg",
    ...pos(-20.56, 107.24),
    w: 54.74,
    h: 47.68,
    boxed: false,
    objectFit: "contain",
  },
  {
    id: "skims",
    src: "/images/sheet/brands/skims.svg",
    ...pos(40.9, 80.16),
    w: 54.74,
    h: 74.75,
    boxed: false,
    objectFit: "contain",
  },
  {
    id: "lululemon",
    src: "/images/sheet/brands/lululemon.svg",
    ...pos(102.36, 98.19),
    w: 54.74,
    h: 57.09,
    boxed: false,
    objectFit: "contain",
  },
  {
    id: "tjmax",
    src: "/images/sheet/brands/tjmaxx.png",
    ...pos(225.28, 103.71),
    w: 54.74,
    h: 51.21,
    boxed: true,
    padding: 16,
  },
  {
    id: "the-ordinary",
    src: "/images/sheet/brands/ordinary.png",
    ...pos(286.74, 81.34),
    w: 54.74,
    h: 73.58,
    boxed: true,
    padding: 12,
  },
  {
    id: "wayfair",
    src: "/images/sheet/brands/wayfair.png",
    ...pos(348.2, 101.35),
    w: 54.74,
    h: 53.56,
    boxed: true,
    padding: 8,
  },
  {
    id: "tripadvisor",
    src: "/images/sheet/brands/tripadvisor.svg",
    ...pos(409.66, 78.4),
    w: 54.74,
    h: 76.52,
    boxed: true,
    padding: 18,
  },
  {
    id: "asos",
    src: "/images/sheet/brands/asos.png",
    ...pos(163.82, 78.4),
    w: 54.74,
    h: 76.52,
    boxed: true,
    padding: 18,
  },
  {
    id: "aesop",
    src: "/images/sheet/brands/aesop.png",
    ...pos(471.12, 97.23),
    w: 54.74,
    h: 57.68,
    boxed: true,
    padding: 14,
  },
  {
    id: "uniqlo",
    src: "/images/sheet/brands/uniqlo.png",
    ...pos(532.58, 84.28),
    w: 54.74,
    h: 70.63,
    boxed: true,
    padding: 16,
  },
  {
    id: "steve-madden",
    src: "/images/sheet/brands/steve-madden.png",
    ...pos(655.5, 84.28),
    w: 54.74,
    h: 70.63,
    boxed: true,
    padding: 12,
  },
  {
    id: "uo",
    src: "/images/sheet/brands/uo.png",
    ...pos(594.04, 107.83),
    w: 54.74,
    h: 47.09,
    boxed: true,
    padding: 10,
  },
];

export const inviteSheet = {
  senderName: "Kenzie Foster",
  avatar: "/images/sheet/avatars/kenzie.png",
  headline: "YOU'VE BEEN INVITED",
  description:
    "Join our invite-only creator program and get access to brand collabs!",
  features: [
    {
      icon: "/images/sheet/icons/feature-brands.svg",
      text: "Get matched with brands that fit you",
    },
    {
      icon: "/images/sheet/icons/feature-check.svg",
      text: "Choose the products you actually want",
    },
    {
      icon: "/images/sheet/icons/feature-invites.svg",
      text: "Post & unlock even more collabs",
    },
  ],
  cta: "Get Started!",
};
