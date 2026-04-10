"use client";

import { Sheet } from "@/components/ui/Sheet";
import {
  CampaignBriefBody,
  findCampaignById,
} from "@/components/campaigns/CampaignBriefDetail";

type CampaignBriefViewSheetProps = {
  open: boolean;
  /** Campaign id to display (looked up via MOCK_CAMPAIGNS) */
  campaignId: string | null;
  onClose: () => void;
};

/**
 * Read-only variant of the Campaign Brief sheet used from inside the
 * Campaign Accept Flow. Identical body/layout to CampaignBriefDetail
 * but renders NO action footer — the user has already accepted the
 * campaign, so the sheet only exists to re-read the commitment.
 *
 * The body is shared with CampaignBriefDetail via CampaignBriefBody,
 * so any brief-section updates land in both places automatically.
 *
 * zIndex bumped to 60 so this sheet stacks cleanly above the accept
 * flow's own overlay/footer layer (which sits at z-50 via AppShell).
 */
export function CampaignBriefViewSheet({
  open,
  campaignId,
  onClose,
}: CampaignBriefViewSheetProps) {
  const campaign = findCampaignById(campaignId);

  return (
    <Sheet
      open={open}
      onClose={onClose}
      topOffset={56}
      background="#f9fafb"
      title="Campaign Details"
      blurredHeader
      zIndex={60}
      leftAction={{
        ariaLabel: "Close",
        onPress: onClose,
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
    >
      <div className="ios-scroll relative flex-1 overflow-y-auto">
        {campaign ? <CampaignBriefBody campaign={campaign} /> : null}
      </div>
    </Sheet>
  );
}
