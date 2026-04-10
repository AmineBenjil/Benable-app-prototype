"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@/components/AppShell";
import { MaskIcon } from "@/lib/icons";
import { findCampaignById } from "@/components/campaigns/CampaignBriefDetail";
import { CampaignAcceptShell } from "./CampaignAcceptShell";
import { CampaignBriefViewSheet } from "./CampaignBriefViewSheet";
import { Toast } from "./Toast";
import {
  EditShippingAddressSheet,
  type ShippingAddress,
} from "./EditShippingAddressSheet";
import { Step1Product, type AcceptFlowProduct } from "./steps/Step1Product";
import { Step2Delivery } from "./steps/Step2Delivery";
import { Step3Content } from "./steps/Step3Content";
import { Step4Publish } from "./steps/Step4Publish";

/* ── Mock data ─────────────────────────────────────────────────
   Hardcoded here for now; will be promoted to lib/campaignData.ts
   once the user clarifies per-campaign variants.
   Tints match the Figma yellow-cream product backdrops.
   ───────────────────────────────────────────────────────────── */

const DEFAULT_ADDRESS: ShippingAddress = {
  street: "1342 Mason street",
  apt: "Apt 12",
  cityStateZip: "San Francisco, California 12769. US",
};

function formatAddress(a: ShippingAddress): string {
  const line1 = a.apt ? `${a.street}, ${a.apt}` : a.street;
  return `${line1} ${a.cityStateZip}`;
}

const MOCK_PRODUCTS: readonly AcceptFlowProduct[] = [
  {
    id: "chicken",
    name: "Instant Chicken Bone Broth",
    price: "$15",
    urlLabel: "holapikora.com/products/beef-bone-broth",
    url: "https://holapikora.com/products/beef-bone-broth",
    image: "/images/campaigns/acceptFlow/product-1.png",
    tint: "#f5d97a",
  },
  {
    id: "beef",
    name: "Instant Beef Bone Broth",
    price: "$15",
    urlLabel: "holapikora.com/products/beef-bone-broth",
    url: "https://holapikora.com/products/beef-bone-broth",
    image: "/images/campaigns/acceptFlow/product-2.png",
    tint: "#f5d97a",
  },
  {
    id: "cocoa",
    name: "Instant Cocoa Bone Broth",
    price: "$15",
    urlLabel: "holapikora.com/products/beef-bone-broth",
    url: "https://holapikora.com/products/beef-bone-broth",
    image: "/images/campaigns/acceptFlow/product-3.png",
    tint: "#f5d97a",
  },
];

/* ── Footer CTA — info row + primary button ─────────────────── */

function Step1Footer({
  selectedCount,
  maxSelections,
  onPlaceOrder,
}: {
  selectedCount: number;
  maxSelections: number;
  onPlaceOrder: () => void;
}) {
  const disabled = selectedCount === 0;
  return (
    <div className="flex w-full flex-col gap-4 px-4 pt-3 pb-[25px]">
      <div className="flex items-start gap-2">
        <MaskIcon
          src="/images/campaigns/acceptFlow/info.svg"
          size={16}
          className="mt-[2px] text-[#717171]"
        />
        <p className="flex-1 text-[13px] font-normal leading-[normal] text-[#717171]">
          Select up to{" "}
          <span className="font-semibold text-[#1c1c1c]">
            {maxSelections} products
          </span>{" "}
          to feature in your content.
        </p>
      </div>
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={disabled}
        className="flex h-12 w-full items-center justify-center rounded-[12px] bg-[#7a5cfa] text-[16px] font-medium leading-[normal] text-white transition-opacity active:opacity-90 disabled:pointer-events-none"
        style={{ opacity: disabled ? 0.4 : 1 }}
      >
        Place Order
      </button>
    </div>
  );
}

/* ── Step 2 footer — single full-width primary CTA ───────────── */

function SimpleFooter({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <div className="flex w-full flex-col px-4 pt-3 pb-[25px]">
      <button
        type="button"
        onClick={onPress}
        className="flex h-12 w-full items-center justify-center rounded-[12px] bg-[#7a5cfa] text-[16px] font-medium leading-[normal] text-white transition-opacity active:opacity-90"
      >
        {label}
      </button>
    </div>
  );
}

/* ── Flow controller ────────────────────────────────────────── */

const MAX_SELECTIONS = 2;

/**
 * Progress fill for each step's stepper segment.
 * - Step 1 fills ~78% while the user is picking products (gives the
 *   stepper some forward motion before they commit).
 * - Step 2 lands at ~40% while waiting for delivery tracking.
 * - Steps 3 and 4 default to 100% when we reach them.
 */
const STEP_PROGRESS: Record<1 | 2 | 3 | 4, number> = {
  1: 0.78,
  2: 0.4,
  3: 1,
  4: 1,
};

export function CampaignAcceptFlow() {
  const { navigate, selectedCampaignId } = useNavigation();
  const campaign = findCampaignById(selectedCampaignId);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([]);
  const [address, setAddress] = useState<ShippingAddress>(DEFAULT_ADDRESS);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [briefSheetOpen, setBriefSheetOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending toast timeout on unmount so a late-firing setState
  // doesn't land on an unmounted component after the flow is dismissed.
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const showBlockedToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2500);
  }, []);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
      return;
    }
    // On step 1, back returns to the Campaign Brief sheet and clears
    // selections so a later re-open starts fresh.
    navigate("campaign-detail");
    setTimeout(() => {
      setStep(1);
      setSelectedIds([]);
    }, 360);
  }, [step, navigate]);

  const handleToggleProduct = useCallback(
    (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    },
    [],
  );

  const handleAdvance = useCallback(() => {
    // Advance to the next step. Wraps at step 4 so the final CTA
    // is a no-op until a real completion handler is wired up.
    setStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
  }, []);

  return (
    <>
    <CampaignAcceptShell
      brandName={campaign?.brandName ?? "Pikora"}
      brandLogo={campaign?.brandLogo ?? "/images/campaigns/pikora.png"}
      logoFill={campaign?.logoFill ?? "cover"}
      campaignName={campaign?.title ?? "Instant Beef Bone Broth"}
      step={step}
      currentStepProgress={STEP_PROGRESS[step]}
      onBack={handleBack}
      onBriefPress={() => setBriefSheetOpen(true)}
      footer={
        step === 1 ? (
          <Step1Footer
            selectedCount={selectedIds.length}
            maxSelections={MAX_SELECTIONS}
            onPlaceOrder={handleAdvance}
          />
        ) : step === 2 ? (
          <SimpleFooter label="I got the product" onPress={handleAdvance} />
        ) : null
      }
      overlay={
        step === 1 ? (
          <Toast
            visible={toastVisible}
            message={`You can only pick ${MAX_SELECTIONS} products`}
          />
        ) : null
      }
    >
      {/* Only the currently active step's body is rendered to keep the
          DOM lean and avoid the placeholder screens mounting eagerly. */}
      {step === 1 && (
        <Step1Product
          address={formatAddress(address)}
          products={MOCK_PRODUCTS}
          selectedIds={selectedIds}
          maxSelections={MAX_SELECTIONS}
          onToggleProduct={handleToggleProduct}
          onBlockedTap={showBlockedToast}
          onEditAddress={() => setEditAddressOpen(true)}
        />
      )}
      {step === 2 && <Step2Delivery />}
      {step === 3 && <Step3Content />}
      {step === 4 && <Step4Publish />}
    </CampaignAcceptShell>
    <EditShippingAddressSheet
      open={editAddressOpen}
      initial={address}
      onClose={() => setEditAddressOpen(false)}
      onSave={(next) => {
        setAddress(next);
        setEditAddressOpen(false);
      }}
    />
    <CampaignBriefViewSheet
      open={briefSheetOpen}
      campaignId={selectedCampaignId}
      onClose={() => setBriefSheetOpen(false)}
    />
    </>
  );
}
