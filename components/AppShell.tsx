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
import { CampaignBriefDetail } from "@/components/campaigns/CampaignBriefDetail";
import { CampaignAcceptFlow } from "@/components/campaigns/acceptFlow/CampaignAcceptFlow";
import { useDevFlags } from "@/components/devPanel/DevPanelContext";
import { HomeIndicator } from "@/components/ui/HomeIndicator";
import { StatusBar } from "@/components/profile/StatusBar";

type View =
  | "profile"
  | "onboarding"
  | "campaigns"
  | "menu-campaigns"
  | "campaign-detail"
  | "campaign-accept-flow";

type NavigationContextValue = {
  view: View;
  navigate: (view: View) => void;
  selectedCampaignId: string | null;
  setSelectedCampaignId: (id: string | null) => void;
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
  const { flags, setCurrentView } = useDevFlags();
  const [view, setView] = useState<View>("profile");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );
  const navigate = useCallback((v: View) => setView(v), []);

  // If Brand Club gets disabled from the dev panel while the user is in
  // the Brand Club onboarding/campaigns flow, bounce them back to profile.
  // "menu-campaigns" is accessed from the main menu and is independent of the flag.
  useEffect(() => {
    if (!flags.brandClubEnabled && (view === "onboarding" || view === "campaigns")) {
      setView("profile");
    }
  }, [flags.brandClubEnabled, view]);

  // Publish the current view to DevPanelContext so the sidebar can render
  // context-aware settings (e.g. a Campaigns-only toggle).
  useEffect(() => {
    setCurrentView(view);
    return () => setCurrentView(null);
  }, [view, setCurrentView]);

  const isOnboarding = view === "onboarding";
  const isCampaigns = view === "campaigns";
  const isMenuCampaigns = view === "menu-campaigns";
  const isCampaignDetail = view === "campaign-detail";
  const isCampaignAcceptFlow = view === "campaign-accept-flow";

  return (
    <NavigationContext.Provider
      value={{ view, navigate, selectedCampaignId, setSelectedCampaignId }}
    >
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

        {/* Menu Campaigns — triggered from the "Brand Collabs" menu sheet item.
            Stays visible underneath the brief sheet AND the accept flow so
            backing out of either lands us on the dashboard again. */}
        <div
          className="absolute inset-0 z-50 transition-transform duration-[350ms] ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{
            transform:
              isMenuCampaigns || isCampaignDetail || isCampaignAcceptFlow
                ? "translateX(0)"
                : "translateX(100%)",
            pointerEvents: isMenuCampaigns ? "auto" : "none",
          }}
        >
          <MenuCampaignsDashboard />
        </div>

        {/* Campaign Brief Detail — bottom sheet. Stays slid-up both while
            the user is reading the brief AND while they're inside the
            accept flow, so the flow visually layers on top of the sheet
            and backing out returns the user to a still-open sheet. */}
        <div
          className="absolute inset-0 z-50"
          style={{
            pointerEvents: isCampaignDetail ? "auto" : "none",
          }}
        >
          <CampaignBriefDetail />
        </div>

        {/* Campaign Accept Flow — 4-step full-screen flow pushed from the
            right when the user taps "Accept & Commit" inside the brief
            sheet. Mirrors the translateX slide pattern used by the other
            push-style overlays above. */}
        <div
          className="absolute inset-0 z-50 transition-transform duration-[350ms] ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{
            transform: isCampaignAcceptFlow ? "translateX(0)" : "translateX(100%)",
            pointerEvents: isCampaignAcceptFlow ? "auto" : "none",
          }}
        >
          <CampaignAcceptFlow />
        </div>

        {/* ── Persistent iOS chrome (status bar + home indicator) ────
            A single adaptive StatusBar and HomeIndicator are mounted
            here so every screen and sheet shares the same iOS chrome —
            no per-screen duplicates, no artifacts when sheets open.
            Both adapt to a fixed white background for now; all our
            screens paint a white strip behind the status bar area and
            the home indicator sits over white content. The idle-dim
            timer listens on the whole document (no `idleTarget`) so
            dev-panel clicks also count as "activity" — otherwise the
            pill would sit dimmed whenever the user drove navigation
            from the sidebar instead of touching the phone canvas. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[60]">
          <StatusBar backgroundColor="#ffffff" />
        </div>
        <HomeIndicator backgroundColor="#ffffff" />
      </div>
    </NavigationContext.Provider>
  );
}
