"use client";

import { ReactNode, useState } from "react";
import { useDevFlags } from "./DevPanelContext";
import { ToggleSwitch } from "./ToggleSwitch";
import { CollapsePanelIcon } from "@/lib/icons";

const SIDEBAR_W = 404;
const COLLAPSED_W = 64;

/**
 * DevPanel — control sidebar rendered OUTSIDE the iPhone frame.
 * Collapses to a thin strip on the right edge with an "expand" button.
 * Lets us toggle feature flags that drive what the mobile app shows.
 * Matches Figma node 96:6 (404 × 834, bg #f3f3f3).
 */
export function DevPanel() {
  const { flags, toggleFlag } = useDevFlags();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="relative h-screen shrink-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
      style={{
        backgroundColor: "#f3f3f3",
        width: collapsed ? COLLAPSED_W : SIDEBAR_W,
      }}
    >
      {/* ── Expanded content (slides off to the right when collapsed) ── */}
      <div
        className="absolute left-0 top-0 h-full transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
        style={{
          width: SIDEBAR_W,
          transform: collapsed
            ? `translateX(${SIDEBAR_W}px)`
            : "translateX(0)",
          pointerEvents: collapsed ? "none" : "auto",
        }}
      >
        {/* Collapse icon — top-left, matches Figma left-[14px] top-[30px] */}
        <div className="px-[14px] pt-[30px]">
          <button
            type="button"
            aria-label="Collapse panel"
            onClick={() => setCollapsed(true)}
            className="flex h-6 w-6 items-center justify-center text-[#1c1c1c] transition-opacity active:opacity-60"
          >
            <CollapsePanelIcon size={24} />
          </button>
        </div>

        {/* Settings card — matches Figma bg-[#e8e8e8] rounded-[8px] */}
        <div className="mx-[14px] mt-4 flex flex-col rounded-[8px] bg-[#e8e8e8] py-3">
          <div className="flex flex-col gap-2 px-5">
            <SettingRow
              title="Brand collab flow"
              description="Enable or disable applying for brand collab"
              control={
                <ToggleSwitch
                  ariaLabel="Toggle Brand collab flow"
                  checked={flags.brandClubEnabled}
                  onChange={() => toggleFlag("brandClubEnabled")}
                />
              }
            />
          </div>
        </div>
      </div>

      {/* ── Expand button (visible only when collapsed) ───────────────── */}
      <div
        className="absolute left-0 top-0 px-[14px] pt-[30px] transition-opacity duration-200 ease-out"
        style={{
          opacity: collapsed ? 1 : 0,
          pointerEvents: collapsed ? "auto" : "none",
        }}
      >
        <button
          type="button"
          aria-label="Expand panel"
          onClick={() => setCollapsed(false)}
          className="flex h-6 w-6 items-center justify-center text-[#1c1c1c] transition-opacity active:opacity-60"
        >
          {/* Mirror the collapse icon to point left → "←|" */}
          <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}>
            <CollapsePanelIcon size={24} />
          </span>
        </button>
      </div>
    </aside>
  );
}

/* ── Reusable setting row ──────────────────────────────────────── */
function SettingRow({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-6 w-full items-center justify-between">
        <p className="text-[16px] font-semibold leading-6 text-[#1c1c1c]">
          {title}
        </p>
        {control}
      </div>
      <p className="text-[12px] font-normal leading-4 text-[#1c1c1c]">
        {description}
      </p>
    </div>
  );
}
