"use client";

import { StepProps } from "../OnboardingFlow";
import { TextField } from "../inputs/TextField";
import { PhoneInput } from "../inputs/PhoneInput";
import { Checkbox } from "../inputs/Checkbox";

/**
 * Step 1 — Personal details.
 * Matches Figma node 7341:71944 / 7343:72129.
 *
 * Data model (all prefilled from the profile):
 *  - profileName (disabled)
 *  - fullName
 *  - email
 *  - phone
 *  - agreedToTerms (gates the Next button in OnboardingFlow)
 */
export function Step1({ answers, setAnswers }: StepProps) {
  const profileName = (answers.profileName as string) ?? "Kenzie Foster";
  const fullName = (answers.fullName as string) ?? "Kenzie Foster";
  const email =
    (answers.email as string) ?? "Kenzie-Foster@email.com";
  const phone = (answers.phone as string) ?? "";

  return (
    <div className="flex flex-col gap-3 px-4 pt-4">
      {/* Section title */}
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold tracking-[-0.5px] text-black">
          Personal details
        </h2>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <TextField
          label="Profile Name"
          value={profileName}
          disabled
          valid
          readOnly
        />
        <TextField
          label="Full Name"
          value={fullName}
          valid={fullName.trim().length > 0}
          onChange={(e) => setAnswers({ fullName: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          valid={/.+@.+\..+/.test(email)}
          onChange={(e) => setAnswers({ email: e.target.value })}
        />
      </div>

      {/* Phone number */}
      <div className="mt-4 flex flex-col gap-4">
        <p className="text-[12px] leading-none text-[#717171]">Phone number</p>
        <PhoneInput
          value={phone}
          onChange={(v) => setAnswers({ phone: v })}
        />
      </div>

      {/* Terms checkbox */}
      <div className="mt-4 flex items-start gap-2">
        <div className="pt-[2px]">
          <Checkbox
            checked={!!answers.agreedToTerms}
            onChange={(next) => setAnswers({ agreedToTerms: next })}
            ariaLabel="I agree to the terms"
          />
        </div>
        <p className="text-[14px] leading-5 text-[#aaa]">
          By checking this box, I agree to receive text messages from Benable
          at the phone number provided. Message and data rates may apply.
          Message frequency varies. Reply STOP to unsubscribe at any time.
          Reply HELP for help. By opting in, I agree to the{" "}
          <span className="text-[#1c1c1c]">terms of service</span> and{" "}
          <span className="text-[#1c1c1c]">privacy policy</span>.
        </p>
      </div>
    </div>
  );
}
