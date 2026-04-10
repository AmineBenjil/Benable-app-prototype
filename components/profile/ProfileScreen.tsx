"use client";

import { useState } from "react";
import { collections } from "@/lib/profileData";
import { TopBar } from "./TopBar";
import { ProfileHeader } from "./ProfileHeader";
import { ListsBar } from "./ListsBar";
import { CategoryChips } from "./CategoryChips";
import { CollectionHeader } from "./CollectionHeader";
import { ListCardGrid } from "./ListCardGrid";
import { ListCardDiscover } from "./ListCardDiscover";
import { TabBar } from "./TabBar";
import { DelayedInviteDMSheet } from "./InviteDMSheet";
import { MenuSheet } from "./MenuSheet";

// Threshold: the gradient cover is 174px tall, the TopBar is 102px.
// The header turns white when the cover has scrolled fully behind it.
const SCROLL_THRESHOLD = 174 - 102; // 72px

export function ProfileScreen() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const top = e.currentTarget.scrollTop;
    setScrolled(top > SCROLL_THRESHOLD);
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Scrollable body */}
      <div
        className="ios-scroll absolute inset-0 overflow-y-auto"
        style={{ paddingBottom: 97 }}
        onScroll={handleScroll}
      >
        <ProfileHeader />
        <ListsBar />
        <CategoryChips />

        {collections.map((section) => (
          <section key={section.id}>
            <CollectionHeader name={section.name} count={section.count} />
            {section.variant === "grid" &&
              section.gridCards?.map((card) => (
                <ListCardGrid key={card.id} card={card} />
              ))}
            {section.variant === "discover" &&
              section.discoverCards?.map((card) => (
                <ListCardDiscover key={card.id} card={card} />
              ))}
          </section>
        ))}
      </div>

      {/* Fixed chrome — the iOS status bar is drawn persistently by
          AppShell above every screen, so it's not mounted here. */}
      <TopBar scrolled={scrolled} onMenuPress={() => setMenuOpen(true)} />
      <TabBar />

      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Slides up 2s after the screen mounts */}
      <DelayedInviteDMSheet delayMs={2000} />
    </div>
  );
}
