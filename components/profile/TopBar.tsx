import { HamburgerIcon, SearchIcon } from "@/lib/icons";

interface TopBarProps {
  scrolled?: boolean;
  onMenuPress?: () => void;
}

export function TopBar({ scrolled = false, onMenuPress }: TopBarProps) {
  return (
    <div
      className={`absolute left-0 right-0 top-0 z-30 h-[102px] transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="flex h-full items-end justify-end pb-2 pr-3">
        <div className="flex items-center gap-2">
          <IconButton scrolled={scrolled}>
            <SearchIcon size={16} />
          </IconButton>
          <IconButton scrolled={scrolled} onClick={onMenuPress}>
            <HamburgerIcon size={16} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  children,
  ariaLabel,
  scrolled,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel?: string;
  scrolled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] text-[#1c1c1c] active:scale-95 transition-all duration-300 ${
        scrolled ? "border border-[0.5px] border-[#c6c6c6]" : "border-0"
      }`}
    >
      {children}
    </button>
  );
}
