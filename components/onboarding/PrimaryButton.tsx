import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Primary purple CTA used across onboarding steps.
 *
 * Enabled: filled brand purple `#7a5cfa`, white label.
 * Disabled: muted lavender bg `#edeaf9`, purple label at 30% opacity.
 * Matches Figma buttons in the Personal Details step.
 */
export function PrimaryButton({
  children,
  className = "",
  disabled,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      {...rest}
      className={`flex h-12 w-full items-center justify-center rounded-[12px] px-6 text-[14px] font-semibold transition-colors ${
        disabled
          ? "cursor-not-allowed bg-[#edeaf9] text-[#7a5cfa]/30"
          : "bg-[#7a5cfa] text-white active:bg-[#6a4be8]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
