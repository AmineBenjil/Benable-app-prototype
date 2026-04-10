import { BellIcon, DiscoverIcon, InvitesIcon, PlusBigIcon } from "@/lib/icons";

type Tab = {
  key: string;
  label?: string;
  icon: React.ReactNode;
  active?: boolean;
  variant?: "default" | "primary" | "avatar";
};

export function TabBar() {
  const tabs: Tab[] = [
    {
      key: "discover",
      label: "Discover",
      icon: <DiscoverIcon size={24} />,
    },
    {
      key: "invites",
      label: "Invites",
      icon: <InvitesIcon size={24} />,
    },
    {
      key: "add",
      variant: "primary",
      icon: (
        <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#1c1c1c] text-white">
          <PlusBigIcon size={18} />
        </span>
      ),
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: <BellIcon size={24} />,
    },
    {
      key: "profile",
      label: "Profile",
      active: true,
      variant: "avatar",
      icon: (
        <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#1c1c1c] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/profile/avatars/kenzie-tab.png"
            alt="Profile"
            className="absolute max-w-none"
            style={{
              width: "111.08%",
              height: "138.89%",
              left: "-10.4%",
              top: "-12.5%",
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 bg-white"
      style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.08)" }}
    >
      <nav className="flex h-[76px] items-center justify-center">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`flex h-16 w-[75px] flex-col items-center justify-center gap-1 ${
              t.active ? "text-[#1c1c1c]" : "text-[#717171]"
            }`}
          >
            {t.icon}
            {t.label && (
              <span className="text-[12px] leading-4">{t.label}</span>
            )}
          </button>
        ))}
      </nav>
      {/* 21px of breathing room below the tab row — the iOS home
          indicator itself is drawn persistently by AppShell on top. */}
      <div className="h-[21px]" />
    </div>
  );
}
