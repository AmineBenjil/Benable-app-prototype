/**
 * 4-segment progress stepper for the Campaign Accept Flow.
 *
 * Matches Figma node 7562:1017985 — four pill segments (h-4px,
 * rounded-24px, gap-8px) with labels centered underneath. Segments
 * for completed steps fill 100%, the current step fills partially
 * (uses `currentStepProgress` 0–1), and future steps stay empty.
 */

type StepStepperProps = {
  /** 1-based index of the current step */
  step: number;
  /** Total number of steps (labels length must match) */
  total: number;
  /** Ordered labels for each segment */
  labels: readonly string[];
  /** Fill ratio for the current step segment (0–1). Defaults to 1. */
  currentStepProgress?: number;
};

export function StepStepper({
  step,
  total,
  labels,
  currentStepProgress = 1,
}: StepStepperProps) {
  return (
    <div className="flex w-full flex-col gap-[10px] px-4 pt-[14px]">
      {/* Row of 4 pill segments */}
      <div className="flex h-[4px] w-full items-stretch gap-[8px]">
        {Array.from({ length: total }).map((_, i) => {
          const index = i + 1;
          const isCompleted = index < step;
          const isCurrent = index === step;
          const fillPct = isCompleted
            ? 100
            : isCurrent
              ? Math.max(0, Math.min(1, currentStepProgress)) * 100
              : 0;
          return (
            <div
              key={i}
              className="relative h-[4px] flex-1 overflow-hidden rounded-[24px] bg-[#e5e7ea]"
            >
              <div
                className="h-full bg-[#63bb70] transition-[width] duration-300 ease-out"
                style={{ width: `${fillPct}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Labels row — each label is flex-1 so it sits directly beneath its
          corresponding segment, matching the Figma grid exactly. */}
      <div className="flex w-full items-center gap-[8px]">
        {labels.map((label, i) => (
          <p
            key={label}
            className={`flex-1 text-[13px] font-medium leading-[normal] ${
              i === step - 1 ? "text-[#1c1c1c]" : "text-[#717171]"
            }`}
            style={{ textAlign: "center" }}
          >
            {label}
          </p>
        ))}
      </div>
    </div>
  );
}
