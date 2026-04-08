"use client";

import { useState } from "react";
import { useNavigation } from "@/components/AppShell";
import { OnboardingShell } from "./OnboardingShell";
import { PrimaryButton } from "./PrimaryButton";
import { BrandSheet } from "./BrandSheet";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { establishedBrands, emergingBrands } from "@/lib/brandData";

export type Answers = Record<string, unknown>;

export type StepProps = {
  answers: Answers;
  setAnswers: (patch: Answers) => void;
};

const TOTAL_STEPS = 3;

export function OnboardingFlow() {
  const { navigate } = useNavigation();
  const [step, setStep] = useState(1);
  const [answers, setAnswersState] = useState<Answers>({});
  const [activeSheet, setActiveSheet] = useState<"established" | "emerging" | null>(null);

  const setAnswers = (patch: Answers) =>
    setAnswersState((prev) => ({ ...prev, ...patch }));

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("profile");
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else {
      navigate("campaigns");
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;
  const isLast = step === TOTAL_STEPS;

  // Per-step gating of the Next button.
  const canProceed = (() => {
    switch (step) {
      case 1:
        return !!answers.agreedToTerms;
      case 2:
        return !!(answers.streetAddress as string)?.trim();
      case 3: {
        const e = (answers.establishedBrands as string[]) ?? [];
        const m = (answers.emergingBrands as string[]) ?? [];
        return e.length + m.length > 0 || !!answers.skippedBrands;
      }
      default:
        return true;
    }
  })();

  // Per-step CTA label.
  const ctaLabel = (() => {
    if (step === 2) return "Submit";
    if (step === 3) return "Continue";
    if (isLast) return "Finish";
    return "Next";
  })();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <OnboardingShell
        title="Brand Collabs"
        progress={progress}
        onBack={handleBack}
        bodyBackground="#f9fafb"
        cta={
          <PrimaryButton onClick={handleNext} disabled={!canProceed}>
            {ctaLabel}
          </PrimaryButton>
        }
      >
        {step === 1 && <Step1 answers={answers} setAnswers={setAnswers} />}
        {step === 2 && <Step2 answers={answers} setAnswers={setAnswers} />}
        {step === 3 && (
          <Step3
            answers={answers}
            setAnswers={setAnswers}
            onOpenSheet={setActiveSheet}
          />
        )}
      </OnboardingShell>

      {/* Brand sheets — rendered at flow level so overlay covers the full screen */}
      <BrandSheet
        open={activeSheet === "established"}
        onClose={() => setActiveSheet(null)}
        title="Established Brands"
        brands={establishedBrands}
        selected={(answers.establishedBrands as string[]) ?? []}
        onDone={(sel) => {
          setAnswers({ establishedBrands: sel, skippedBrands: false });
          setActiveSheet(null);
        }}
      />
      <BrandSheet
        open={activeSheet === "emerging"}
        onClose={() => setActiveSheet(null)}
        title="Emerging Brands"
        brands={emergingBrands}
        selected={(answers.emergingBrands as string[]) ?? []}
        onDone={(sel) => {
          setAnswers({ emergingBrands: sel, skippedBrands: false });
          setActiveSheet(null);
        }}
      />
    </div>
  );
}
