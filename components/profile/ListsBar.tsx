import { PlusIcon } from "@/lib/icons";
import { profile } from "@/lib/profileData";

export function ListsBar() {
  return (
    <div className="flex h-[38px] items-center justify-between px-5 py-2">
      <div className="flex items-center gap-2 text-[16px] leading-5">
        <span className="font-medium text-[#1c1c1c]">Lists</span>
        <span className="font-medium text-[#717171]">{profile.listsCount}</span>
      </div>
      <button
        type="button"
        aria-label="Add list"
        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1c1c1c] text-white active:scale-95 transition-transform"
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
