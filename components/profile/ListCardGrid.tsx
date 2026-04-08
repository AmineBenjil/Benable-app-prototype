import Image from "next/image";
import { ListCardData } from "@/lib/profileData";
import { SocialActionsBar } from "./SocialActionsBar";

export function ListCardGrid({ card }: { card: ListCardData }) {
  const [img1, img2, img3] = card.images;
  return (
    <div className="flex w-full flex-col items-center gap-3 bg-white px-4 py-3">
      {/* Image collage */}
      <div className="relative h-[240px] w-[343px] overflow-hidden rounded-[8px] bg-[#f1f1f1]">
        {/* Left large image */}
        <div className="absolute left-0 top-0 h-full w-[171px] overflow-hidden">
          <Image
            src={img1}
            alt=""
            fill
            className="object-cover"
            sizes="171px"
          />
        </div>
        {/* Right top image */}
        <div className="absolute right-0 top-0 h-[119.5px] w-[171px] overflow-hidden">
          <Image
            src={img2}
            alt=""
            fill
            className="object-cover"
            sizes="171px"
          />
        </div>
        {/* Right bottom image */}
        <div className="absolute bottom-0 right-0 h-[119.5px] w-[171px] overflow-hidden">
          <Image
            src={img3}
            alt=""
            fill
            className="object-cover"
            sizes="171px"
          />
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-[16px] bg-black/50 px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
        </div>

        {/* Rec count */}
        <div className="absolute bottom-3 right-3 flex items-center justify-center rounded-[8px] bg-black/50 px-2 py-1">
          <span className="text-[14px] font-medium leading-5 text-white">
            {card.recCount}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-semibold leading-6 text-black line-clamp-2">
            {card.title}
          </p>
          <p className="line-clamp-2 text-[14px] leading-5 text-[#717171]">
            {card.description}
          </p>
        </div>
        <SocialActionsBar likes={card.likes} comments={card.comments} />
      </div>
    </div>
  );
}
