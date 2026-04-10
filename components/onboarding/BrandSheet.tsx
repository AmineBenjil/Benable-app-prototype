"use client";

import { useState, useEffect, useRef } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { Brand } from "@/lib/brandData";

type BrandSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  brands: Brand[];
  selected: string[];
  onDone: (selected: string[]) => void;
};

/** Letter-initial avatar fallback for brands without a logo. */
function BrandLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);

  if (!brand.logo || failed) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0ecff] text-[15px] font-semibold text-[#7a5cfa]">
        {brand.name[0].toUpperCase()}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.logo}
      alt={brand.name}
      className="h-10 w-10 rounded-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export function BrandSheet({
  open,
  onClose,
  title,
  brands,
  selected,
  onDone,
}: BrandSheetProps) {
  const [query, setQuery] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external selection whenever sheet opens
  useEffect(() => {
    if (open) {
      setLocalSelected(selected);
      setQuery("");
    }
  }, [open, selected]);

  const filtered = query.trim()
    ? brands.filter((b) =>
        b.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : brands;

  const toggle = (id: string) =>
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <Sheet
      open={open}
      onClose={onClose}
      height="82%"
      backdropColor="rgba(0, 0, 0, 0.35)"
      zIndex={60}
      title={title}
      showGrabber
      shadow={false}
      footer={
        <div className="p-4 pb-6">
          <button
            type="button"
            onClick={() => onDone(localSelected)}
            disabled={localSelected.length === 0}
            className="w-full rounded-[14px] py-4 text-[16px] font-semibold transition-colors"
            style={{
              backgroundColor:
                localSelected.length > 0 ? "#7a5cfa" : "#edeaf9",
              color: localSelected.length > 0 ? "#fff" : "rgba(122,92,250,0.3)",
            }}
          >
            {localSelected.length > 0
              ? `Done (${localSelected.length})`
              : "Done"}
          </button>
        </div>
      }
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Search */}
        <div className="shrink-0 px-4 pt-2 pb-3">
          <div className="flex items-center gap-2 rounded-[12px] bg-[#f5f5f5] px-3 py-2.5">
            <span
              aria-hidden
              className="h-4 w-4 shrink-0 bg-[#adadad]"
              style={{
                WebkitMaskImage: "url(/images/onboarding/icons/search.svg)",
                maskImage: "url(/images/onboarding/icons/search.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brands…"
              className="flex-1 bg-transparent text-[14px] text-[#1c1c1c] outline-none placeholder:text-[#adadad]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#adadad]"
                aria-label="Clear search"
              >
                <span className="text-[10px] font-bold text-white">✕</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Scrollable brand grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-4" style={{ WebkitOverflowScrolling: "touch" }}>
          {filtered.length === 0 ? (
            /* Not found state */
            <div className="flex flex-col items-center gap-3 pt-12 pb-4">
              <span className="text-4xl">🔍</span>
              <p className="text-[14px] font-medium text-[#1c1c1c]">
                No brands found
              </p>
              <p className="text-center text-[13px] leading-5 text-[#adadad]">
                Try a different search term
              </p>
            </div>
          ) : (
            <>
              <p className="mb-3 text-[12px] font-medium text-[#717171]">
                Suggested
              </p>
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((brand) => {
                  const isSelected = localSelected.includes(brand.id);
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => toggle(brand.id)}
                      className="relative flex flex-col items-start gap-2 rounded-[12px] border p-3 text-left transition-colors active:scale-[0.98]"
                      style={{
                        borderColor: isSelected ? "#7a5cfa" : "#ededed",
                        backgroundColor: isSelected ? "#faf8ff" : "#fff",
                      }}
                    >
                      <BrandLogo brand={brand} />
                      <span className="text-[13px] font-medium leading-4 text-[#1c1c1c]">
                        {brand.name}
                      </span>
                      {/* Selected checkmark */}
                      {isSelected && (
                        <span
                          aria-hidden
                          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#7a5cfa]"
                        >
                          <span
                            className="h-3 w-3 bg-white"
                            style={{
                              WebkitMaskImage:
                                "url(/images/onboarding/icons/checkbox-check.svg)",
                              maskImage:
                                "url(/images/onboarding/icons/checkbox-check.svg)",
                              WebkitMaskRepeat: "no-repeat",
                              maskRepeat: "no-repeat",
                              WebkitMaskPosition: "center",
                              maskPosition: "center",
                              WebkitMaskSize: "contain",
                              maskSize: "contain",
                            }}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </Sheet>
  );
}
