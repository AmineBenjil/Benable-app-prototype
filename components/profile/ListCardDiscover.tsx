import Image from "next/image";
import { DiscoverCardData } from "@/lib/profileData";
import { CoverMenuIcon } from "@/lib/icons";

export function ListCardDiscover({ card }: { card: DiscoverCardData }) {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      {/* Cover: 2-col collage, left large + right split */}
      <div className="relative h-[260px] w-full">
        <div className="absolute left-0 top-0 h-full w-[50.13%] overflow-hidden">
          <Image
            src={card.imageLeft}
            alt=""
            fill
            className="object-cover"
            sizes="188px"
          />
        </div>
        <div className="absolute right-0 top-0 flex h-full w-[49.87%] flex-col">
          <div className="relative h-[130px] w-full overflow-hidden">
            <Image
              src={card.imageTop}
              alt=""
              fill
              className="object-cover"
              sizes="187px"
            />
          </div>
          <div className="relative h-[130px] w-full overflow-hidden">
            <Image
              src={card.imageBottom}
              alt=""
              fill
              className="object-cover"
              sizes="187px"
            />
          </div>
        </div>

        {/* Menu button */}
        <button
          type="button"
          aria-label="More"
          className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center text-white drop-shadow-[0_0_3px_rgba(0,0,0,0.4)]"
        >
          <CoverMenuIcon size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-3 px-5 py-4">
        <h3 className="text-[18px] font-semibold leading-[26px] text-[#1c1c1c]">
          {card.title}
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[12px] font-medium leading-4 text-[#717171]">
            <span>{card.items}</span>
            <span>items</span>
          </div>
          <p className="text-[14px] leading-5 text-[#717171]">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}
