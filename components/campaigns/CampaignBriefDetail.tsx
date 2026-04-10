"use client";

import { ReactNode } from "react";
import { useNavigation } from "@/components/AppShell";
import { Sheet } from "@/components/ui/Sheet";
import { MaskIcon } from "@/lib/icons";
import {
  MOCK_CAMPAIGNS,
  type Campaign,
  type CampaignBrief,
} from "@/lib/campaignData";

/* ── Look up a campaign by id across all tabs ───────────────────── */
export function findCampaignById(id: string | null): Campaign | null {
  if (!id) return null;
  for (const list of Object.values(MOCK_CAMPAIGNS)) {
    const match = list.find((c) => c.id === id);
    if (match) return match;
  }
  return null;
}

/* ── Hero pill (compact variant of CampaignCard header) ─────────── */
function BriefHeroPill({
  title,
  brandName,
  brandLogo,
  logoFill = "contain",
}: {
  title: string;
  brandName: string;
  brandLogo: string;
  logoFill?: "contain" | "cover";
}) {
  return (
    <div
      className="relative h-[72px] w-full overflow-hidden rounded-[12px]"
      style={{
        border: "1px solid #e8daec",
        backgroundImage:
          "linear-gradient(81.26deg, rgba(204,161,247,0.12) 7%, rgba(215,164,222,0.12) 48%, rgba(234,169,178,0.12) 95%), linear-gradient(90deg, #ffffff 0%, #ffffff 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute bottom-[23px] left-6 h-[60px] w-[59px] rounded-full"
        style={{ backgroundColor: "#eaa9b2", filter: "blur(54px)" }}
      />
      <div
        className="pointer-events-none absolute right-[-40px] top-[-29px] h-[74px] w-[103px] rounded-full"
        style={{ backgroundColor: "rgba(122, 92, 250, 0.5)", filter: "blur(54px)" }}
      />
      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-3">
        <div
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white"
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
        <div className="flex flex-col gap-1">
          <p className="whitespace-nowrap text-[16px] font-semibold leading-[normal] text-[#222222]">
            {title}
          </p>
          <p className="whitespace-nowrap text-[14px] font-medium leading-4 text-[#7a5cfa]">
            by {brandName}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable white card wrapper with section header ───────────── */
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex w-full flex-col gap-[13px] rounded-[16px] bg-white px-4 py-4"
      style={{
        border: "0.5px solid #e3e3e3",
        boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="flex items-center gap-2">
        <MaskIcon
          src="/images/campaigns/brief/section.svg"
          size={20}
          className="text-[#1c1c1c]"
        />
        <p className="text-[14px] font-semibold leading-4 text-[#1c1c1c]">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

/* ── Social link icon (layered SVG fragments from Figma) ──────── */
function SocialIcon({ kind }: { kind: "website" | "instagram" | "tiktok" }) {
  if (kind === "tiktok") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/campaigns/brief/tiktok.svg"
        alt=""
        className="h-[14px] w-[14px] shrink-0"
      />
    );
  }
  const parts =
    kind === "website"
      ? ["website-1.svg", "website-2.svg", "website-3.svg"]
      : ["instagram-1.svg", "instagram-2.svg", "instagram-3.svg"];
  return (
    <span className="relative inline-block h-[14px] w-[14px] shrink-0">
      {parts.map((file) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={file}
          src={`/images/campaigns/brief/${file}`}
          alt=""
          className="absolute inset-0 h-full w-full"
        />
      ))}
    </span>
  );
}

/* ── About the Brand section ────────────────────────────────────── */
function AboutSection({ about }: { about: CampaignBrief["about"] }) {
  return (
    <SectionCard title="About the Brand">
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-medium leading-4 text-[#717171]">
          {about.label}
        </p>
        <p
          className="text-[13px] font-normal text-[#555555]"
          style={{ lineHeight: "21.125px" }}
        >
          {about.body}
        </p>
      </div>
      <div className="mt-1 flex items-center gap-6">
        {about.links.map((link) => (
          <a
            key={link.kind}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] font-semibold leading-6 text-[#1c1c1c] transition-opacity active:opacity-60"
          >
            <SocialIcon kind={link.kind} />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </SectionCard>
  );
}

/* ── Founder quote card ─────────────────────────────────────────── */
function QuoteCard({ quote }: { quote: CampaignBrief["quote"] }) {
  return (
    <div
      className="flex w-full flex-col gap-1 rounded-[16px] bg-[#f5f3fc] px-[14px] py-3"
      style={{
        border: "0.5px solid #dddbe5",
        boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
      }}
    >
      <p
        className="text-[14px] font-normal italic text-[#555555]"
        style={{ lineHeight: "22.75px" }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={quote.author.avatar}
            alt={quote.author.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[13px] font-semibold leading-[20.8px] text-[#1a1a1a]">
            {quote.author.name}
          </p>
          <p className="text-[11px] font-normal leading-[17.6px] text-[#8a8a8a]">
            {quote.author.role}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── What you get section ───────────────────────────────────────── */
function WhatYouGetSection({ reward }: { reward: CampaignBrief["reward"] }) {
  return (
    <SectionCard title="What you get">
      <p className="text-[14px] font-normal leading-[normal] text-[#696969]">
        {reward.headline}
      </p>
      <div className="flex flex-col gap-3">
        {reward.products.map((product) => (
          <div
            key={product.id}
            className="flex w-full flex-col overflow-hidden rounded-[16px] bg-white"
            style={{
              border: "0.5px solid #e3e3e3",
              boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="h-[181px] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 px-3 py-3">
              <p className="text-[14px] font-medium leading-4 text-[#717171]">
                {product.price}
              </p>
              <p className="text-[12px] font-bold leading-4 text-[#1c1c1c]">
                {product.name}
              </p>
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 text-[12px] font-medium text-[#1c1c1c] transition-opacity active:opacity-60"
              >
                <MaskIcon
                  src="/images/campaigns/brief/link-24.svg"
                  size={16}
                  className="text-[#1c1c1c]"
                />
                <span className="flex-1 truncate">{product.urlLabel}</span>
                <MaskIcon
                  src="/images/campaigns/brief/open-link.svg"
                  size={16}
                  className="text-[#1c1c1c]"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ── Campaign brief (bulleted lists + alert) ────────────────────── */
function BriefBulletGroup({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] font-medium uppercase leading-4 text-[#717171]">
        {label}
      </p>
      <ul className="flex flex-col gap-1 pl-[21px]">
        {items.map((item) => (
          <li
            key={item}
            className="list-disc text-[14px] font-normal leading-[normal] text-[#696969]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CampaignBriefSection({ brief }: { brief: CampaignBrief["brief"] }) {
  return (
    <SectionCard title="Campaign Brief">
      <BriefBulletGroup label="POST" items={brief.post} />
      <BriefBulletGroup label="CONTENT IDEAS" items={brief.contentIdeas} />
      <BriefBulletGroup
        label="TALKING POINT SUGGESTIONS"
        items={brief.talkingPoints}
      />
      <div
        className="mt-1 w-full rounded-[8px] px-3 py-2.5"
        style={{
          backgroundColor: "#fff8ed",
          border: "0.5px solid #eae0cf",
        }}
      >
        <p className="text-[14px] font-normal leading-[normal] text-[#b66d1f]">
          {brief.alert}
        </p>
      </div>
    </SectionCard>
  );
}

/* ── Brand Guidelines (DOs + DON'Ts) ─────────────────────────────── */
function GuidelineRow({
  icon,
  tint,
  text,
}: {
  icon: string;
  tint: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <MaskIcon
        src={icon}
        size={16}
        className={tint}
        style={{ marginTop: 3 }}
      />
      <p
        className="flex-1 text-[13px] font-normal text-[#555555]"
        style={{ lineHeight: "21.125px" }}
      >
        {text}
      </p>
    </div>
  );
}

function BrandGuidelinesSection({
  guidelines,
}: {
  guidelines: CampaignBrief["guidelines"];
}) {
  return (
    <SectionCard title="Brand Guidelines">
      <p className="text-[12px] font-medium leading-4 text-[#2baf87]">DOs</p>
      <div className="flex flex-col gap-2">
        {guidelines.dos.map((text) => (
          <GuidelineRow
            key={text}
            icon="/images/campaigns/brief/check.svg"
            tint="text-[#2baf87]"
            text={text}
          />
        ))}
      </div>
      <p className="text-[12px] font-medium leading-4 text-[#ff5567]">DON&rsquo;Ts</p>
      <div className="flex flex-col gap-2">
        {guidelines.donts.map((text) => (
          <GuidelineRow
            key={text}
            icon="/images/campaigns/brief/close.svg"
            tint="text-[#ff5567]"
            text={text}
          />
        ))}
      </div>
    </SectionCard>
  );
}

/* ── Usage and Rights ───────────────────────────────────────────── */
function UsageRightsSection({ rights }: { rights: string[] }) {
  return (
    <SectionCard title="Usage and Rights">
      <ul className="flex flex-col gap-1 pl-[21px]">
        {rights.map((item) => (
          <li
            key={item}
            className="list-disc text-[14px] font-normal leading-[normal] text-[#696969]"
          >
            {item}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

/* ── Main detail screen — iOS-style bottom sheet ─────────────────── */
export function CampaignBriefDetail() {
  const { view, navigate, setSelectedCampaignId, selectedCampaignId } =
    useNavigation();
  const campaign = findCampaignById(selectedCampaignId);
  // Keep the sheet visually slid-up both while the user is reading the
  // brief AND while they're inside the Accept flow, so the flow layers
  // cleanly on top of the sheet and backing out lands on the same sheet.
  const isOpen =
    view === "campaign-detail" || view === "campaign-accept-flow";

  const handleDismiss = () => {
    navigate("menu-campaigns");
    // Delay clearing the id so the sheet content doesn't blank out mid-animation
    setTimeout(() => setSelectedCampaignId(null), 360);
  };

  const handleAcceptCommit = () => {
    // Launch the 4-step accept flow over this sheet. We intentionally
    // do NOT clear `selectedCampaignId` — the flow needs it to look up
    // the campaign it's accepting.
    navigate("campaign-accept-flow");
  };

  return (
    <Sheet
      open={isOpen}
      onClose={handleDismiss}
      topOffset={56}
      background="#f9fafb"
      title="Campaign Details"
      blurredHeader
      leftAction={{
        ariaLabel: "Close",
        onPress: handleDismiss,
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
          >
            <path
              d="M2.5 2.5 L13.5 13.5 M13.5 2.5 L2.5 13.5"
              stroke="#1c1c1c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
      }}
      footer={
        <div
          className="flex w-full flex-col items-center gap-4 bg-white px-4 pt-4 pb-[33px]"
          style={{ boxShadow: "0px -4px 24px 0px rgba(0, 0, 0, 0.04)" }}
        >
          <button
            type="button"
            onClick={handleAcceptCommit}
            className="flex h-12 w-full items-center justify-center rounded-[12px] bg-[#7a5cfa] text-[16px] font-medium leading-[normal] text-white transition-opacity active:opacity-90"
          >
            Accept &amp; Commit
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-[14px] font-medium leading-[normal] text-[#717171] transition-opacity active:opacity-60"
          >
            Not This Time
          </button>
        </div>
      }
    >
      {/* Scrollable body — extends under the translucent blurred header */}
      <div className="ios-scroll relative flex-1 overflow-y-auto">
        {campaign ? <CampaignBriefBody campaign={campaign} /> : null}
      </div>
    </Sheet>
  );
}

/* ── Shared brief body (used by CampaignBriefDetail + read-only sheet) */

export function CampaignBriefBody({ campaign }: { campaign: Campaign }) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-[76px]">
      <BriefHeroPill
        title={campaign.title}
        brandName={campaign.brandName}
        brandLogo={campaign.brandLogo}
        logoFill={campaign.logoFill}
      />
      {campaign.brief ? (
        <>
          <AboutSection about={campaign.brief.about} />
          <QuoteCard quote={campaign.brief.quote} />
          <WhatYouGetSection reward={campaign.brief.reward} />
          <CampaignBriefSection brief={campaign.brief.brief} />
          <BrandGuidelinesSection guidelines={campaign.brief.guidelines} />
          <UsageRightsSection rights={campaign.brief.usageRights} />
        </>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center rounded-[16px] bg-white px-6 py-8 text-center">
          <p className="text-[14px] leading-5 text-[#717171]">
            Full brief coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
