"use client";

import { InputHTMLAttributes, useId, useState } from "react";

/**
 * Material-style floating-label text field.
 *
 * Behavior:
 *  - When empty and unfocused, the label sits at input-text baseline (16px).
 *  - When focused or filled, the label smoothly shrinks to 12px at the top.
 *  - Filled inputs show a green check trailing icon when `valid` is true.
 *  - Disabled inputs use a light gray background and are not editable.
 *
 * Matches Figma Personal Details inputs (node 7343:72134/5/6).
 */
type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "placeholder"
> & {
  label: string;
  valid?: boolean;
};

export function TextField({
  label,
  valid,
  disabled,
  value,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const hasValue = typeof value === "string" ? value.length > 0 : !!value;
  const floated = focused || hasValue;

  return (
    <div
      className={`relative h-[56px] w-full rounded-[12px] border ${
        disabled
          ? "border-[#e3e3e3] bg-[#f1f1f1]"
          : focused
          ? "border-[#1c1c1c] bg-white"
          : "border-[#e3e3e3] bg-white"
      }`}
    >
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 font-medium text-[#aaa] transition-all duration-150 ease-out"
        style={{
          top: floated ? 8 : 18,
          fontSize: floated ? 12 : 16,
          lineHeight: floated ? "16px" : "20px",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        disabled={disabled}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className="absolute bottom-2 left-3 right-12 h-[22px] bg-transparent pr-2 text-[16px] leading-[22px] text-[#1c1c1c] outline-none placeholder:text-transparent disabled:cursor-not-allowed"
        {...rest}
      />
      {valid && (
        <span
          aria-hidden
          className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/onboarding/icons/input-check.svg"
            alt=""
            className="h-5 w-5 translate-x-[2px] translate-y-[2px]"
          />
        </span>
      )}
    </div>
  );
}
