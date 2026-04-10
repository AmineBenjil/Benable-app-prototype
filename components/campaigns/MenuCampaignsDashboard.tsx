"use client";

import { useState } from "react";
import { useNavigation } from "@/components/AppShell";
import { useDevFlags } from "@/components/devPanel/DevPanelContext";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { MOCK_CAMPAIGNS, type Campaign } from "@/lib/campaignData";
import { MaskIcon } from "@/lib/icons";

/* ── "What to Expect" list ─────────────────────────────────────── */
const EXPECT_ITEMS = [
  {
    icon: "/images/campaigns/brand-match.svg",
    title: "Brand Match",
    description: "Get matched with brands that align with your content style.",
  },
  {
    icon: "/images/campaigns/campaign-brief.svg",
    title: "Campaign Brief",
    description: "Receive detailed brief",
  },
  {
    icon: "/images/campaigns/products.svg",
    title: "Products you love",
    description: "Get products shipped to you",
  },
  {
    icon: "/images/campaigns/camera.svg",
    title: "Create & Submit",
    description: "Create authentic content and submit for review",
  },
  {
    icon: "/images/campaigns/gift.svg",
    title: "Get Compensated",
    description: "Earn products, and unlock more...",
  },
];

/* ── Tab definitions ─────────────────────────────────────────────── */
type Tab = "new" | "active" | "finished";

const TABS: { id: Tab; label: string }[] = [
  { id: "new", label: "New" },
  { id: "active", label: "Active" },
  { id: "finished", label: "Finished" },
];

const TAB_INDEX: Record<Tab, number> = {
  new: 0,
  active: 1,
  finished: 2,
};

/* ── Active tab empty state ──────────────────────────────────────── */
function ActiveEmptyState() {
  return (
    <div className="flex flex-col gap-[56px] px-4 pb-6 pt-8">
      {/* Hero: megaphone circle + headline */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full p-2"
          style={{ backgroundColor: "#efecf7" }}
        >
          <MaskIcon
            src="/images/campaigns/megaphone.svg"
            size={24}
            className="text-[#7a5cfa]"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[20px] font-semibold leading-tight text-[#1c1c1c]">
            Stay tuned!
          </p>
          <p className="text-center text-[14px] leading-5 text-[#717171]">
            We&apos;ll notify you when a campaign is ready
          </p>
        </div>
      </div>

      {/* What to Expect card */}
      <div
        className="rounded-[16px] bg-white p-4"
        style={{
          border: "0.5px solid #e3e3e3",
          boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        <p
          className="mb-4 text-[14px] font-bold leading-normal text-[#525252]"
          style={{ letterSpacing: "-0.18px" }}
        >
          What to Expect
        </p>
        <div className="flex flex-col gap-4">
          {EXPECT_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <MaskIcon
                src={item.icon}
                size={16}
                className="mt-[2px] shrink-0 text-[#7a5cfa]"
              />
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-[14px] font-medium leading-normal text-[#1c1c1c]">
                  {item.title}
                </p>
                <p className="text-[14px] leading-normal text-[#696969]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Generic empty state (Invites / History) ─────────────────────── */
function GenericEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 px-4 pt-[96px]">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full p-2"
        style={{ backgroundColor: "#efecf7" }}
      >
        <MaskIcon
          src="/images/campaigns/megaphone.svg"
          size={24}
          className="text-[#7a5cfa]"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-[20px] font-semibold leading-tight text-[#1c1c1c]">
          Nothing here yet
        </p>
        <p className="max-w-[280px] text-center text-[14px] leading-5 text-[#717171]">
          {message}
        </p>
      </div>
    </div>
  );
}

/* ── Populated list (when mockCampaignsEnabled is ON) ────────────── */
function CampaignList({
  campaigns,
  onCampaignPress,
}: {
  campaigns: Campaign[];
  onCampaignPress: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-6">
      {campaigns.map((c) => (
        <CampaignCard
          key={c.id}
          brandLogo={c.brandLogo}
          brandName={c.brandName}
          title={c.title}
          description={c.description}
          logoFill={c.logoFill}
          onPress={() => onCampaignPress(c.id)}
        />
      ))}
    </div>
  );
}

/* ── Main Dashboard ──────────────────────────────────────────────── */
export function MenuCampaignsDashboard() {
  const { navigate, setSelectedCampaignId } = useNavigation();
  const { flags } = useDevFlags();
  const [activeTab, setActiveTab] = useState<Tab>("new");
  const activeIndex = TAB_INDEX[activeTab];

  const handleCampaignPress = (id: string) => {
    setSelectedCampaignId(id);
    navigate("campaign-detail");
  };

  return (
    <div
      className="relative flex h-full w-full flex-col"
      style={{ backgroundColor: "#f9fafb" }}
    >
      {/* White bar behind the (persistent AppShell-level) status bar so
          the off-white body doesn't tint the icons. */}
      <div className="absolute left-0 right-0 top-0 z-30 h-[54px] bg-white" />

      {/* Header */}
      <header className="relative mt-[54px] h-[48px] w-full bg-white">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate("profile")}
          className="absolute left-3 top-2 flex h-8 w-8 items-center justify-center text-[#1c1c1c] transition-transform active:scale-95"
        >
          <span
            aria-hidden
            className="inline-block h-4 w-4 bg-current"
            style={{
              WebkitMaskImage: "url(/images/onboarding/icons/chevron-left.svg)",
              maskImage: "url(/images/onboarding/icons/chevron-left.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              transform: "rotate(180deg)",
            }}
          />
        </button>
        <h1 className="absolute left-1/2 top-3 -translate-x-1/2 text-[14px] font-semibold leading-6 text-[#1c1c1c]">
          Campaigns
        </h1>
      </header>

      {/* Tab bar — sits on the body background, with a hairline + sliding underline */}
      <div
        className="relative flex w-full shrink-0"
        style={{ backgroundColor: "#f9fafb" }}
      >
        {/* Hairline divider */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#ededed]" />

        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-1 items-center justify-center py-[14px] text-[16px] font-semibold transition-colors duration-200"
              style={{ color: isActive ? "#1c1c1c" : "#9a9a9a" }}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Sliding underline indicator — centers under each tab label */}
        <div
          className="pointer-events-none absolute bottom-0 flex h-[2px] items-end justify-center transition-transform duration-[350ms] ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{
            width: `${100 / TABS.length}%`,
            left: 0,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        >
          <span className="h-[2px] w-16 rounded-full bg-[#7a5cfa]" />
        </div>
      </div>

      {/* Tab panels — all mounted, slide horizontally via absolute positioning */}
      <div className="relative flex-1 overflow-hidden">
        {TABS.map((tab, i) => {
          const offset = i - activeIndex;
          return (
            <div
              key={tab.id}
              className="ios-scroll absolute inset-0 overflow-y-auto transition-transform duration-[350ms] ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{ transform: `translateX(${offset * 100}%)` }}
              aria-hidden={offset !== 0}
            >
              {flags.mockCampaignsEnabled ? (
                <CampaignList
                  campaigns={MOCK_CAMPAIGNS[tab.id]}
                  onCampaignPress={handleCampaignPress}
                />
              ) : (
                <>
                  {tab.id === "new" && <ActiveEmptyState />}
                  {tab.id === "active" && (
                    <GenericEmptyState message="Your running campaigns will show up here" />
                  )}
                  {tab.id === "finished" && (
                    <GenericEmptyState message="Your completed campaigns will show up here" />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* 21px of breathing room below the content — the iOS home
          indicator itself is drawn persistently by AppShell on top. */}
      <div className="h-[21px] w-full shrink-0" />
    </div>
  );
}
