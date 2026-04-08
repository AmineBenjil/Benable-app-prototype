"use client";

import { StepProps } from "../OnboardingFlow";
import { TextField } from "../inputs/TextField";
import { AlertCard } from "../inputs/AlertCard";

/**
 * Step 2 — Shipping Address.
 * Matches Figma node 7354:72234.
 *
 * Data model:
 *  - streetAddress (required; gates the button)
 *  - apartment (optional)
 *
 * Alert card at the bottom explains why we're collecting the address.
 * The `Submit` button is enabled as soon as streetAddress is filled.
 */
export function Step2({ answers, setAnswers }: StepProps) {
  const streetAddress = (answers.streetAddress as string) ?? "";
  const apartment = (answers.apartment as string) ?? "";

  return (
    <div className="flex h-full flex-col justify-between px-4 pt-4 pb-4">
      {/* Top: title + inputs */}
      <div className="flex flex-col gap-3">
        <h2 className="text-[16px] font-semibold tracking-[-0.5px] text-black">
          Shipping Address
        </h2>
        <div className="flex flex-col gap-4">
          <TextField
            label="Street Address"
            value={streetAddress}
            onChange={(e) => setAnswers({ streetAddress: e.target.value })}
          />
          <TextField
            label="Apt, suite, unit (Optional)"
            value={apartment}
            onChange={(e) => setAnswers({ apartment: e.target.value })}
          />
        </div>
      </div>

      {/* Bottom: alert card (sits above the CTA) */}
      <AlertCard>
        Used so brands can ship you products for campaigns. Only shared with
        brands you&apos;ve accepted.
      </AlertCard>
    </div>
  );
}
