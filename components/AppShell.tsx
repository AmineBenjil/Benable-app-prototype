"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProfileScreen } from "@/components/profile/ProfileScreen";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { CampaignsDashboard } from "@/components/campaigns/CampaignsDashboard";
import { MenuCampaignsDashboard } from "@/components/campaigns/MenuCampaignsDashboard";
import { useDevFlags } from "@/components/devPanel/DevPanelContext";

type View = "profile" | "onboarding" | "campaigns" | "menu-campaigns";

type NavigationContextValue = {
  view: View;
  navigate: (view: View) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used inside AppShell");
  return ctx;
}

/**
 * Tiny client-side "router" that swaps between app views with an
 * iOS-style push-from-right animation. No Next.js routing or router
 * library needed — one state, one context, one CSS transform.
 */
export function AppShell() {
  const { flags } = useDevFlags();
  const [view, setView] = useState<View>("profile");
  const navigate = useCallback((v: View) => setView(v), []);

  // If Brand Club gets disabled from the dev panel while the user is in
  // the Brand Club onboarding/campaigns flow, bounce them back to profile.
  // "menu-campaigns" is accessed from the main menu and is independent of the flag.
  useEffect(() => {
    if (!flags.brandClubEnabled && (view === "onboarding" || view === "campaigns")) {
      setView("profile");
    }
  }, [flags.brandClubEnabled, view]);

  const isOnboarding = view === "onboarding";
  const isCampaigns = view === "campaigns";
  const isMenuCampaigns = view === "menu-campaigns";

  return (
    <NavigationContext.Provider value={{ view, navigate }}>
      <div className="relative h-full w-full overflow-hidden bg-white">
        {/* Profile layer stays mounted so its state + scroll position
            persist while another view is pushed on top. */}
        <div className="absolute inset-0">
          <ProfileScreen />
        </div>

        {/* Onboarding pushes in from the right over the profile.
            z-50 keeps it above the invite sheet (z-40). */}
        <div
          className="absolute inset-0 z-50 transition-transform duration-[350ms] ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{
            transform: isOnboarding ? "translateX(0)" : "translateX(100%)",
            pointerEvents: isOnboarding ? "auto" : "none",
          }}
        >
          <OnboardingFlow />
        </div>

        {/* Campaigns dashboard — triggered from the Brand Club dev-panel flow. */}
        <div
          className="absolute inset-0 z-50 transition-transform duration-[350ms] ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{
            transform: isCampaigns ? "translateX(0)" : "translateX(100%)",
            pointerEvents: isCampaigns ? "auto" : "none",
          }}
        >
          <CampaignsDashboard />
        </div>

        {/* Menu Campaigns — triggered from the "Brand Collabs" menu sheet item. */}
        <div
          className="absolute inset-0 z-50 transition-transform duration-[350ms] ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{
            transform: isMenuCampaigns ? "translateX(0)" : "translateX(100%)",
            pointerEvents: isMenuCampaigns ? "auto" : "none",
          }}
        >
          <MenuCampaignsDashboard />
        </div>
      </div>
    </NavigationContext.Provider>
  );
}
