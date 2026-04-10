"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * DevPanel feature flags — controlled by the sidebar next to the iPhone frame.
 * These are pure client-state toggles to preview "what if" scenarios of the
 * mobile app without rebuilding. Not persisted.
 */
export type DevFlags = {
  brandClubEnabled: boolean;
  mockCampaignsEnabled: boolean;
};

/**
 * Mirror of AppShell's `View` union. Duplicated here (instead of imported) to
 * keep AppShell → DevPanelContext as a one-way data flow and avoid circular
 * imports (AppShell already imports from this file).
 */
export type CurrentView =
  | "profile"
  | "onboarding"
  | "campaigns"
  | "menu-campaigns"
  | null;

type DevPanelContextValue = {
  flags: DevFlags;
  setFlag: <K extends keyof DevFlags>(key: K, value: DevFlags[K]) => void;
  toggleFlag: (key: keyof DevFlags) => void;
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
};

const DEFAULT_FLAGS: DevFlags = {
  brandClubEnabled: false,
  mockCampaignsEnabled: false,
};

const DevPanelContext = createContext<DevPanelContextValue | null>(null);

export function DevPanelProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<DevFlags>(DEFAULT_FLAGS);
  const [currentView, setCurrentView] = useState<CurrentView>(null);

  const setFlag = useCallback(
    <K extends keyof DevFlags>(key: K, value: DevFlags[K]) => {
      setFlags((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleFlag = useCallback((key: keyof DevFlags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const value = useMemo(
    () => ({ flags, setFlag, toggleFlag, currentView, setCurrentView }),
    [flags, setFlag, toggleFlag, currentView],
  );

  return (
    <DevPanelContext.Provider value={value}>
      {children}
    </DevPanelContext.Provider>
  );
}

export function useDevFlags() {
  const ctx = useContext(DevPanelContext);
  if (!ctx) throw new Error("useDevFlags must be used inside DevPanelProvider");
  return ctx;
}
