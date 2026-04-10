"use client";

import { useEffect, useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { TextField } from "@/components/onboarding/inputs/TextField";

/* ── Shared type ─────────────────────────────────────────────── */

export type ShippingAddress = {
  /** Street line (required) */
  street: string;
  /** Apartment / suite / unit (optional) */
  apt: string;
  /** City, State, Zip, Country — not editable in this sheet */
  cityStateZip: string;
};

type EditShippingAddressSheetProps = {
  open: boolean;
  /** Current saved address — seeds the form each time the sheet opens */
  initial: ShippingAddress;
  onClose: () => void;
  onSave: (next: ShippingAddress) => void;
};

/**
 * Bottom sheet for editing the shipping address on Step 1 of the
 * Campaign Accept Flow. Only the street line and apt/suite are
 * editable; city/state/zip is preserved from `initial` on save.
 *
 * The sheet re-seeds its local form state from `initial` every time
 * it opens, so a canceled edit never leaks back in on re-open.
 */
export function EditShippingAddressSheet({
  open,
  initial,
  onClose,
  onSave,
}: EditShippingAddressSheetProps) {
  const [street, setStreet] = useState(initial.street);
  const [apt, setApt] = useState(initial.apt);

  // Re-seed local form state every time the sheet opens so abandoned
  // edits from a previous session don't linger.
  useEffect(() => {
    if (open) {
      setStreet(initial.street);
      setApt(initial.apt);
    }
  }, [open, initial.street, initial.apt]);

  const canSave = street.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      street: street.trim(),
      apt: apt.trim(),
      cityStateZip: initial.cityStateZip,
    });
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      topOffset={280}
      background="#ffffff"
      title="Edit shipping address"
      showGrabber
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
      footer={
        <div className="w-full bg-white px-4 pt-3 pb-[25px]">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="flex h-12 w-full items-center justify-center rounded-[12px] bg-[#7a5cfa] text-[16px] font-medium leading-[normal] text-white transition-opacity active:opacity-90 disabled:pointer-events-none"
            style={{ opacity: canSave ? 1 : 0.4 }}
          >
            Save
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-3 px-4 pt-2 pb-4">
        <TextField
          label="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          autoComplete="address-line1"
        />
        <TextField
          label="Apt, suite, unit (optional)"
          value={apt}
          onChange={(e) => setApt(e.target.value)}
          autoComplete="address-line2"
        />
      </div>
    </Sheet>
  );
}
