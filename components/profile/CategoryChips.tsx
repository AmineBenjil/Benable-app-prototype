import { categories } from "@/lib/profileData";

export function CategoryChips() {
  return (
    <div className="no-scrollbar ios-scroll flex h-16 items-center overflow-x-auto px-5">
      <div className="flex items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[12px] bg-[#F1F1F1] px-4 text-[14px] font-medium leading-5 text-[#1c1c1c] active:scale-95 transition-transform"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
