import { MenuDotsIcon } from "@/lib/icons";

export function CollectionHeader({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center justify-between px-5 py-2">
      <div className="flex items-center gap-2 text-[14px] leading-5">
        <span className="text-[#717171]">{name}</span>
        <span className="text-[#1c1c1c]">{count}</span>
      </div>
      <button type="button" aria-label="More" className="text-[#1c1c1c]">
        <MenuDotsIcon size={24} />
      </button>
    </div>
  );
}
