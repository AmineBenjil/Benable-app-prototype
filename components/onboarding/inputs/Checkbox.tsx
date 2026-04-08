"use client";

type CheckboxProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel?: string;
};

/**
 * 16×16 square checkbox matching Figma node 7343:72158.
 * Unchecked: white bg with 1.5px gray border.
 * Checked: black bg with white check stroke.
 */
export function Checkbox({ checked, onChange, ariaLabel }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel ?? "Checkbox"}
      onClick={() => onChange(!checked)}
      className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] transition-colors ${
        checked
          ? "border-[#1c1c1c] bg-[#1c1c1c]"
          : "border-[#c6c6c6] bg-white"
      }`}
    >
      {checked && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/onboarding/icons/checkbox-check.svg"
          alt=""
          className="h-[7px] w-[9px]"
        />
      )}
    </button>
  );
}
