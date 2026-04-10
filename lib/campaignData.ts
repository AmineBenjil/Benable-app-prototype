/**
 * Mock campaign data used by MenuCampaignsDashboard when the DevPanel
 * "Campaigns data" toggle is ON. Grouped by tab so each tab can render
 * its own list of CampaignCards.
 */
export type CampaignBrief = {
  about: {
    label: string;
    body: string;
    links: { kind: "website" | "instagram" | "tiktok"; label: string; href: string }[];
  };
  quote: {
    text: string;
    author: { name: string; role: string; avatar: string };
  };
  reward: {
    headline: string;
    products: {
      id: string;
      name: string;
      price: string;
      image: string;
      urlLabel: string;
      href: string;
    }[];
  };
  brief: {
    post: string[];
    contentIdeas: string[];
    talkingPoints: string[];
    alert: string;
  };
  guidelines: {
    dos: string[];
    donts: string[];
  };
  usageRights: string[];
};

export type Campaign = {
  id: string;
  brandName: string;
  brandLogo: string;
  title: string;
  description: string;
  /** Pre-rounded full-bleed images should use "cover"; tight brand SVGs use "contain". */
  logoFill?: "contain" | "cover";
  brief?: CampaignBrief;
};

export type CampaignTab = "new" | "active" | "finished";

export const MOCK_CAMPAIGNS: Record<CampaignTab, Campaign[]> = {
  new: [
    {
      id: "new-1",
      brandName: "Pikora",
      brandLogo: "/images/campaigns/pikora.png",
      logoFill: "cover",
      title: "Instant Beef Bone Broth",
      description:
        "Create engaging content showcasing our new Summer Glow Collection. We want authentic, creative content that highlight...",
      brief: {
        about: {
          label: "Who are we",
          body: "Pikora is reimagining everyday wellness through Latin-inspired bone broth. Founded by a husband-and-wife team in Miami, Pikora blends traditional simmered recipes with modern convenience — creating instant bone broths in bold flavors like Chicken Sofrito, Beef Barbacoa, and Cocoa Mole. Each serving packs 10g of protein with clean, simple ingredients. Featured on TikTok and loved by wellness creators who appreciate real flavor meets real nutrition. 🇨🇺🇲🇽",
          links: [
            { kind: "website", label: "Website", href: "https://holapikora.com" },
            { kind: "instagram", label: "Instagram", href: "https://instagram.com/holapikora" },
            { kind: "tiktok", label: "TikTok", href: "https://tiktok.com/@holapikora" },
          ],
        },
        quote: {
          text: "We're a small family-run brand and we'd love to work with creators who genuinely care about wellness and flavor. We're excited to have you try our broth!",
          author: {
            name: "Ana Lander",
            role: "Founder, Pikora",
            avatar: "/images/campaigns/brief/ana-lander.png",
          },
        },
        reward: {
          headline: "You get to choose one of the following products!",
          products: [
            {
              id: "big-dulce-1",
              name: "Big Dulce",
              price: "USD 45.00",
              image: "/images/campaigns/brief/big-dulce-1.png",
              urlLabel: "holapikora.com/products/big...",
              href: "https://holapikora.com/products/big-dulce",
            },
            {
              id: "big-dulce-2",
              name: "Big Dulce",
              price: "USD 45.00",
              image: "/images/campaigns/brief/big-dulce-1.png",
              urlLabel: "holapikora.com/products/big...",
              href: "https://holapikora.com/products/big-dulce",
            },
          ],
        },
        brief: {
          post: [
            "1 post on your primary platform (TikTok or Instagram)",
            "Posted from your own account",
            "Add a link to the product in your bio, story, or linktree",
          ],
          contentIdeas: [
            "First sip reaction - what did you expect vs. what you got?",
            "Morning routine featuring your Pikora broth",
            "Quick recipe or creative way you use it",
          ],
          talkingPoints: [
            "The Latin-inspired flavors and whether they surprised you",
            "How it fits into your wellness or cooking routine",
            "Whether you'd swap your morning coffee or tea for it",
          ],
          alert: "Do not publish — content must be approved first.",
        },
        guidelines: {
          dos: [
            "Show the product in use (not just the packaging)",
            "Tag @holapikora and #pikora",
            "Focus on authenticity — share your real experience",
            "Create a 15–30 second video",
            "Your content may be reposted by Pikora on their channels with credit to you",
          ],
          donts: [
            "Don't feature competitor products in the same post",
            "Don't make medical claims",
          ],
        },
        usageRights: [
          "Brand receives 90 days of organic usage rights for all creator content.",
        ],
      },
    },
    {
      id: "new-2",
      brandName: "Starbucks",
      brandLogo: "/images/brands/starbucks.svg",
      title: "Cold Brew Summer Series",
      description:
        "Share your favorite cold brew moment with our new seasonal flavors. Looking for lifestyle shots and honest reviews...",
    },
    {
      id: "new-3",
      brandName: "Puma",
      brandLogo: "/images/brands/puma.svg",
      title: "Run Club Spring Drop",
      description:
        "Join our Run Club campaign — feature our new spring running collection in your training routine. Authenticity over polish...",
    },
  ],
  active: [
    {
      id: "active-1",
      brandName: "Adidas",
      brandLogo: "/images/brands/adidas.svg",
      title: "Ultraboost Launch",
      description:
        "Create engaging content showcasing our new Summer Glow Collection. We want authentic, creative content that highlight...",
    },
  ],
  finished: [
    {
      id: "finished-1",
      brandName: "Adidas",
      brandLogo: "/images/brands/adidas.svg",
      title: "Ultraboost Launch Recap",
      description:
        "Thanks for being part of our Ultraboost launch! Your content reached over 120k impressions across platforms...",
    },
    {
      id: "finished-2",
      brandName: "H&M",
      brandLogo: "/images/brands/hm.svg",
      title: "Autumn Capsule Review",
      description:
        "Campaign wrapped. Compensation has been released and final performance metrics are available in your dashboard...",
    },
  ],
};
