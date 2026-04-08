"use client";

import { StepProps } from "../OnboardingFlow";

type Step3Props = StepProps & {
  onOpenSheet: (sheet: "established" | "emerging") => void;
};

type CategoryCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  count: number;
  onClick: () => void;
};

function CategoryCard({ icon, title, subtitle, count, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[16px] bg-white p-4 text-left active:scale-[0.98] transition-transform"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 0.5px #ededed" }}
    >
      {/* Icon circle */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5f3fc]">
        <span
          aria-hidden
          className="h-5 w-5 bg-[#7a5cfa]"
          style={{
            WebkitMaskImage: `url(${icon})`,
            maskImage: `url(${icon})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[15px] font-semibold text-[#1c1c1c]">{title}</span>
        <span className="text-[13px] text-[#717171]">{subtitle}</span>
      </div>

      {/* Count badge or chevron */}
      {count > 0 ? (
        <span className="shrink-0 rounded-full bg-[#7a5cfa] px-2.5 py-0.5 text-[12px] font-semibold text-white">
          {count}
        </span>
      ) : (
        <span
          aria-hidden
          className="h-4 w-4 shrink-0 bg-[#c6c6c6]"
          style={{
            WebkitMaskImage: "url(/images/onboarding/icons/chevron-left.svg)",
            maskImage: "url(/images/onboarding/icons/chevron-left.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            transform: "rotate(0deg)",
          }}
        />
      )}
    </button>
  );
}

export function Step3({ answers, setAnswers, onOpenSheet }: Step3Props) {
  const selectedEstablished = (answers.establishedBrands as string[]) ?? [];
  const selectedEmerging = (answers.emergingBrands as string[]) ?? [];

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-4">
      {/* Header text */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[20px] font-semibold leading-7 text-[#1c1c1c]">
          Which brands are you targeting?
        </h2>
        <p className="text-[14px] leading-5 text-[#717171]">
          Select brands you&apos;d like to collaborate with
        </p>
      </div>

      {/* Category cards */}
      <div className="flex flex-col gap-3">
        <CategoryCard
          icon="/images/onboarding/icons/building.svg"
          title="Established Brands"
          subtitle="Nike, Sephora, L'Oréal & more"
          count={selectedEstablished.length}
          onClick={() => onOpenSheet("established")}
        />
        <CategoryCard
          icon="/images/onboarding/icons/rocket.svg"
          title="Emerging Brands"
          subtitle="Glossier, Rare Beauty & more"
          count={selectedEmerging.length}
          onClick={() => onOpenSheet("emerging")}
        />
      </div>

      {/* Skip link */}
      <button
        type="button"
        onClick={() => setAnswers({ skippedBrands: true })}
        className="text-center text-[14px] text-[#adadad] underline-offset-2 hover:underline"
      >
        I&apos;ll set this up later
      </button>
    </div>
  );
}
