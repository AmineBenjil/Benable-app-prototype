import { IPhoneFrame } from "@/components/IPhoneFrame";
import { AppShell } from "@/components/AppShell";
import { DevPanelProvider } from "@/components/devPanel/DevPanelContext";
import { DevPanel } from "@/components/devPanel/DevPanel";

export default function Home() {
  return (
    <DevPanelProvider>
      <div className="relative flex min-h-screen w-full">
        {/* Mobile app — centered in the remaining space left of the sidebar */}
        <div className="flex flex-1 items-center justify-center p-8">
          <IPhoneFrame>
            <AppShell />
          </IPhoneFrame>
        </div>

        {/* Control sidebar — pinned to the right edge, outside the phone frame */}
        <DevPanel />
      </div>
    </DevPanelProvider>
  );
}
