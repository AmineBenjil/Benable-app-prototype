"use client";

import { useState } from "react";

/**
 * Phone input row: country code pill (flag + +1) next to a free-text
 * phone number input. Matches Figma node 7343:72144.
 */
export function PhoneInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex w-full items-center gap-[11px]">
      {/* Country pill */}
      <button
        type="button"
        className="flex h-[52px] w-[69px] items-center gap-1 rounded-[12px] border border-[#e3e3e3] bg-[#fcfcfc] px-3"
      >
        <span className="text-[14px] leading-none">🇺🇸</span>
        <span className="text-[14px] leading-5 text-[#1c1c1c]">+1</span>
      </button>
      {/* Phone number input */}
      <div
        className={`flex h-[52px] flex-1 items-center rounded-[12px] border bg-white px-3 ${
          focused ? "border-[#1c1c1c]" : "border-[#717171]"
        }`}
      >
        <input
          type="tel"
          inputMode="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-5 w-full bg-transparent text-[14px] leading-5 text-[#1c1c1c] outline-none"
        />
      </div>
    </div>
  );
}
