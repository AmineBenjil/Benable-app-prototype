"use client";

/**
 * iOS-style toggle switch — matches Figma node I96:498;1366:8323.
 * 45 × 24 track, 20 × 20 thumb, 2px inset.
 * On: bg #1c1c1c, thumb right. Off: bg #e3e3e3, thumb left.
 */
export function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className="relative h-6 w-[45px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ease-out"
      style={{ backgroundColor: checked ? "#1c1c1c" : "#d1d1d1" }}
    >
      <span
        aria-hidden
        className="absolute top-[2px] h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-out"
        style={{
          left: 2,
          transform: checked ? "translateX(21px)" : "translateX(0)",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.04)",
        }}
      />
    </button>
  );
}
