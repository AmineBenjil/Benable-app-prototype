"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "@/components/AppShell";
import { Sheet } from "@/components/ui/Sheet";
import {
  BookmarkIcon,
  BrandCollabsIcon,
  BrandPartnersIcon,
  CashbackIcon,
  ChevronLeftIcon,
  ContactIcon,
  DashboardIcon,
  GaugeIcon,
  InsightIcon,
  SettingsIcon,
  SignOutIcon,
} from "@/lib/icons";

/* ─── Types ─────────────────────────────────────────────────── */
type Panel = "main" | "dashboard";

/* ─── Panel content ──────────────────────────────────────────── */
const MAIN_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon size={24} />, panel: "dashboard" as Panel },
  { key: "brand-collabs", label: "Brand Collabs", icon: <BrandCollabsIcon size={24} />, navigate: "menu-campaigns" as const },
  { key: "bookmarks", label: "Bookmarks", icon: <BookmarkIcon size={24} /> },
  { key: "settings", label: "Settings", icon: <SettingsIcon size={24} /> },
  { key: "contact", label: "Contact us", icon: <ContactIcon size={24} /> },
  { key: "sign-out", label: "Sign out", icon: <SignOutIcon size={24} /> },
];

const DASHBOARD_ITEMS = [
  { key: "insights", label: "Insights", icon: <InsightIcon size={24} /> },
  { key: "tune-up", label: "Tune-up", icon: <GaugeIcon size={24} /> },
  { key: "cashback", label: "Cashback", icon: <CashbackIcon size={24} /> },
  { key: "brand-partners", label: "Brand partners", icon: <BrandPartnersIcon size={24} /> },
];

const SLIDE = "transition-transform duration-[300ms] ease-[cubic-bezier(.22,.61,.36,1)]";

/* ─── Component ──────────────────────────────────────────────── */
interface MenuSheetProps {
  open: boolean;
  onClose: () => void;
}

export function MenuSheet({ open, onClose }: MenuSheetProps) {
  const { navigate } = useNavigation();
  const [panel, setPanel] = useState<Panel>("main");

  // Reset to main after sheet finishes closing
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setPanel("main"), 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  const title = panel === "main" ? "Menu" : "Dashboard";
  const onDashboard = panel === "dashboard";

  return (
    <Sheet
      open={open}
      onClose={onClose}
      backdropColor="rgba(28, 28, 28, 0.6)"
      showGrabber
      shadow={false}
      headerHeight={58}
      title={title}
      leftAction={
        onDashboard
          ? {
              icon: <ChevronLeftIcon size={24} />,
              onPress: () => setPanel("main"),
              ariaLabel: "Back",
            }
          : undefined
      }
    >
      {/* ── Sliding panels ─────────────────────────────────── */}
      {/*
        Both panels sit in an overflow-hidden wrapper.
        Main panel: in-flow → sets the container height.
        Dashboard panel: absolute, same height → slides in/out on top.
        No height animation needed — both have equal content rows.
      */}
      <div className="relative overflow-hidden">
        {/* Main menu */}
        <div
          className={SLIDE}
          style={{
            transform: onDashboard ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          <ItemList
            items={MAIN_ITEMS}
            onItemClick={(item) => {
              if (item.panel) {
                setPanel(item.panel);
              } else if (item.navigate) {
                onClose();
                navigate(item.navigate);
              }
            }}
          />
        </div>

        {/* Dashboard sub-menu */}
        <div
          className={`absolute inset-0 ${SLIDE}`}
          style={{
            transform: onDashboard ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <ItemList items={DASHBOARD_ITEMS} />
        </div>
      </div>
    </Sheet>
  );
}

/* ─── Shared item list ───────────────────────────────────────── */
type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  panel?: Panel;
  navigate?: "menu-campaigns";
};

function ItemList({
  items,
  onItemClick,
}: {
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}) {
  return (
    <div className="flex flex-col px-5 pb-6 pt-1">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onItemClick?.(item)}
          className="flex h-12 w-full items-center gap-4 text-[#1c1c1c] transition-opacity active:opacity-60"
        >
          {item.icon}
          <span className="text-[16px] font-semibold leading-6">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
