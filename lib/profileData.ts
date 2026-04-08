export type ListCardData = {
  id: string;
  title: string;
  description: string;
  recCount: number;
  images: string[];
  likes: number;
  comments: number;
};

export type DiscoverCardData = {
  id: string;
  title: string;
  description: string;
  items: number;
  imageTop: string;
  imageBottom: string;
  imageLeft: string;
};

export type CollectionSection = {
  id: string;
  name: string;
  count: number;
  variant: "grid" | "discover";
  gridCards?: ListCardData[];
  discoverCards?: DiscoverCardData[];
};

export const profile = {
  name: "Kenzie Foster",
  followers: 631,
  following: 99,
  bio: "Adventure seeker, coffee lover, and storyteller. Join me in exploring the world, one recommendation at a time!",
  avatar: "/images/sheet/avatars/kenzie.png",
  extraSocialCount: 3,
  listsCount: 6,
};

export const categories = [
  "Clothing/Outfits",
  "Travel recs",
  "Rich Flavors",
  "Content & media",
  "Jogging outfits",
];

export const collections: CollectionSection[] = [
  {
    id: "clothing",
    name: "Clothing/Outfits",
    count: 4,
    variant: "grid",
    gridCards: [
      {
        id: "sofa-1",
        title: "Crafting the Perfect Sofa Interior",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, lacus in consequat blandit.",
        recCount: 10,
        likes: 3123,
        comments: 127,
        images: [
          "/images/profile/lists/outfit-1.png",
          "/images/profile/lists/outfit-3.png",
          "/images/profile/lists/outfit-5.png",
        ],
      },
      {
        id: "sofa-2",
        title: "Luxurious Sofa Interiors",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, lacus in consequat blandit.",
        recCount: 23,
        likes: 2140,
        comments: 96,
        images: [
          "/images/profile/lists/outfit-7.png",
          "/images/profile/lists/outfit-4.png",
          "/images/profile/lists/outfit-9.png",
        ],
      },
    ],
  },
  {
    id: "travel",
    name: "Travel recs",
    count: 3,
    variant: "discover",
    discoverCards: [
      {
        id: "museo",
        title: "Museo Nacional del Prado",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, lacus in consequat blandit.",
        items: 3,
        imageLeft: "/images/profile/lists/museo-left.png",
        imageTop: "/images/profile/lists/museo-top.png",
        imageBottom: "/images/profile/lists/museo-bottom.png",
      },
      {
        id: "italy",
        title: "Italy Beauty and Cultural Marvels",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, lacus in consequat blandit.",
        items: 27,
        imageLeft: "/images/profile/lists/italy-left.png",
        imageTop: "/images/profile/lists/italy-top.png",
        imageBottom: "/images/profile/lists/italy-bottom.png",
      },
      {
        id: "paris",
        title: "Parisian Delights: A Romantic Exploration of the City of Light",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, lacus in consequat blandit.",
        items: 27,
        imageLeft: "/images/profile/lists/paris-left.png",
        imageTop: "/images/profile/lists/paris-top.png",
        imageBottom: "/images/profile/lists/paris-bottom.png",
      },
    ],
  },
  {
    id: "content",
    name: "Content & media",
    count: 1,
    variant: "discover",
    discoverCards: [
      {
        id: "morocco",
        title: "the Rich Flavors of Moroccan Cuisine",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, lacus in consequat blandit.",
        items: 27,
        imageLeft: "/images/profile/lists/morocco-left.png",
        imageTop: "/images/profile/lists/morocco-top.png",
        imageBottom: "/images/profile/lists/morocco-bottom.png",
      },
    ],
  },
];
