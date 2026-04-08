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
};

type DevPanelContextValue = {
  flags: DevFlags;
  setFlag: <K extends keyof DevFlags>(key: K, value: DevFlags[K]) => void;
  toggleFlag: (key: keyof DevFlags) => void;
};

const DEFAULT_FLAGS: DevFlags = {
  brandClubEnabled: true,
};

const DevPanelContext = createContext<DevPanelContextValue | null>(null);

export function DevPanelProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<DevFlags>(DEFAULT_FLAGS);

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
    () => ({ flags, setFlag, toggleFlag }),
    [flags, setFlag, toggleFlag],
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
