"use client";

import { MaskIcon } from "@/lib/icons";

/* ── Types ─────────────────────────────────────────────────────── */

export type AcceptFlowProduct = {
  id: string;
  name: string;
  price: string;
  urlLabel: string;
  url: string;
  image: string;
  /** Solid fallback color behind the image (matches Figma swatches) */
  tint: string;
};

type Step1ProductProps = {
  /** Shipping address to display in the top card */
  address: string;
  /** Products the user can choose from */
  products: readonly AcceptFlowProduct[];
  /** Currently selected product ids */
  selectedIds: readonly string[];
  /** Max number of products the user can select (default 2) */
  maxSelections?: number;
  onToggleProduct: (id: string) => void;
  /** Fired when the user taps a card that is disabled because the
   *  selection cap has been reached. The flow controller uses this
   *  to surface the "You can only pick N products" toast. */
  onBlockedTap?: () => void;
  /** Fired when the user taps the "Edit" button next to the
   *  shipping address — opens the edit bottom sheet. */
  onEditAddress?: () => void;
};

/* ── Section header (icon + title + right slot) ───────────────── */

function SectionHeader({
  icon,
  title,
  right,
}: {
  icon: string;
  title: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MaskIcon src={icon} size={20} className="text-[#717171]" />
        <p className="text-[14px] font-semibold leading-4 text-[#1c1c1c]">
          {title}
        </p>
      </div>
      {right}
    </div>
  );
}

/* ── Circular check (empty vs selected) ───────────────────────── */

function CircularCheck({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-150 ${
        selected
          ? "bg-[#7a5cfa]"
          : "bg-white"
      }`}
      style={
        selected
          ? undefined
          : { boxShadow: "inset 0 0 0 1px #c6c6c6" }
      }
    >
      {selected && (
        <MaskIcon
          src="/images/campaigns/acceptFlow/check.svg"
          size={14}
          className="text-white"
        />
      )}
    </span>
  );
}

/* ── Product card (tap to toggle selection) ───────────────────── */

function ProductCard({
  product,
  selected,
  disabled,
  onToggle,
}: {
  product: AcceptFlowProduct;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-disabled={disabled}
      className="flex w-full flex-col items-center gap-[12px] rounded-[24px] bg-white pb-4 pt-2 px-2 text-left transition-[border-color,opacity,transform] duration-200 active:scale-[0.995]"
      style={{
        // Always 1px so toggling selection never nudges layout by 0.5px;
        // unselected uses the neutral hairline color, selected flips to
        // the accent purple (matches Figma node 7574:19787).
        border: `1px solid ${selected ? "#7a5cfa" : "#e3e3e3"}`,
        boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.04)",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {/* Image wrapper */}
      <div
        className="relative h-[224px] w-full overflow-hidden rounded-[16px]"
        style={{ backgroundColor: product.tint }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute right-2 top-2">
          <CircularCheck selected={selected} />
        </span>
      </div>

      {/* Content: title row + URL chip */}
      <div className="flex w-full flex-col gap-4 px-2">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 flex-1 text-[16px] font-semibold leading-[normal] text-[#1c1c1c]">
            {product.name}
          </p>
          <p className="shrink-0 text-[18px] font-bold leading-[normal] text-[#2baf87]">
            {product.price}
          </p>
        </div>

        <div
          className="flex w-full items-center justify-between gap-2 rounded-[24px] px-2 py-[6px]"
          style={{
            backgroundColor: "#f3f5f7",
            border: "0.5px solid #e3e8ee",
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <MaskIcon
              src="/images/campaigns/acceptFlow/link.svg"
              size={16}
              className="text-[#1c1c1c]"
            />
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium leading-5 text-[#1c1c1c]">
              {product.urlLabel}
            </span>
          </div>
          <MaskIcon
            src="/images/campaigns/acceptFlow/open-link.svg"
            size={16}
            className="shrink-0 text-[#1c1c1c]"
          />
        </div>
      </div>
    </button>
  );
}

/* ── Main Step 1 body ─────────────────────────────────────────── */

export function Step1Product({
  address,
  products,
  selectedIds,
  maxSelections = 2,
  onToggleProduct,
  onBlockedTap,
  onEditAddress,
}: Step1ProductProps) {
  const selectedCount = selectedIds.length;
  const hasSelection = selectedCount > 0;

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-4">
      {/* ── Shipping address ─────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <MaskIcon
            src="/images/campaigns/acceptFlow/location.svg"
            size={20}
            className="text-[#717171]"
          />
          <p className="text-[14px] font-semibold leading-4 text-[#1c1c1c]">
            Shipping address
          </p>
        </div>
        {/* Card-button: whole row is tappable and opens the edit sheet */}
        <button
          type="button"
          onClick={onEditAddress}
          className="flex w-full items-center justify-between gap-3 overflow-hidden rounded-[16px] bg-white px-3 py-[14px] text-left transition-opacity active:opacity-80"
          style={{
            border: "0.5px solid #e3e3e3",
            boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.04)",
          }}
        >
          <p className="min-w-0 flex-1 text-[14px] font-normal leading-5 text-[#616161]">
            {address}
          </p>
          <MaskIcon
            src="/images/campaigns/acceptFlow/edit.svg"
            size={20}
            className="shrink-0 text-[#1c1c1c]"
          />
        </button>
      </section>

      {/* ── Choose your products ─────────────────────────────── */}
      <section className="flex flex-col gap-3" data-section="products">
        <SectionHeader
          icon="/images/campaigns/acceptFlow/package.svg"
          title="Choose your products"
          right={
            <p
              className="text-[14px] font-semibold leading-4 transition-colors"
              style={{ color: hasSelection ? "#7a5cfa" : "#aaaaaa" }}
            >
              {selectedCount} Selected
            </p>
          }
        />
        <div className="flex flex-col gap-2">
          {products.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            const isDisabled =
              !isSelected && selectedCount >= maxSelections;
            return (
              <ProductCard
                key={product.id}
                product={product}
                selected={isSelected}
                disabled={isDisabled}
                onToggle={() => {
                  if (isDisabled) {
                    onBlockedTap?.();
                    return;
                  }
                  onToggleProduct(product.id);
                }}
              />
            );
          })}
        </div>
      </section>

      {/* ── Coming Up Next ───────────────────────────────────── */}
      <ComingUpNextSection />
    </div>
  );
}

/* ── Coming Up Next — info card with 3 numbered steps ─────────── */

const COMING_UP_STEPS = [
  "We'll review your content (1-3 business days).",
  "Once approved, you'll get your publish window.",
  "Post and confirm to complete the campaign.",
] as const;

function ComingUpNextSection() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <MaskIcon
          src="/images/campaigns/acceptFlow/coming-up.svg"
          size={20}
          className="text-[#717171]"
        />
        <p className="text-[14px] font-semibold leading-4 text-[#1c1c1c]">
          Coming Up Next
        </p>
      </div>
      <div
        className="flex flex-col gap-3 rounded-[16px] bg-white p-4"
        style={{
          border: "0.5px solid #e3e3e3",
          boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        {COMING_UP_STEPS.map((text, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              aria-hidden
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d0ff4a]"
              style={{
                fontFamily: "var(--font-narrow), sans-serif",
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1,
                letterSpacing: "-0.3343px",
                color: "#44570e",
              }}
            >
              {i + 1}
            </span>
            <p className="flex-1 text-[14px] font-normal leading-[normal] text-[#696969]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
