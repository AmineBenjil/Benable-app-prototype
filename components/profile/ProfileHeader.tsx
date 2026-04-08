import Image from "next/image";
import { profile } from "@/lib/profileData";
import { VerifiedIcon, FacebookLogo, InstagramLogo, PinterestLogo } from "@/lib/icons";

export function ProfileHeader() {
  return (
    <div className="relative">
      {/* Cover */}
      <div
        className="h-[174px] w-full"
        style={{
          backgroundImage:
            "linear-gradient(140.83deg, #FCF0E3 6.36%, #EAE4FF 84.23%)",
        }}
      />

      {/* Avatar overlapping */}
      <div className="absolute left-5 top-[134px] h-20 w-20 overflow-hidden rounded-full border-2 border-white bg-white">
        {/* The Figma avatar PNG has a decorative halo baked in; scale it so
            only the photo fills the circle and the halo is clipped. */}
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={160}
          height={160}
          className="h-full w-full object-cover"
          style={{ transform: "scale(1.5)" }}
          priority
        />
      </div>

      {/* Content */}
      <div className="pt-[50px]">
        <div className="flex flex-col gap-4 px-5">
          <div className="flex flex-col gap-2">
            {/* Name + verified */}
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-semibold leading-7 text-[#1c1c1c]">
                {profile.name}
              </h1>
              <VerifiedIcon size={16} />
            </div>
            {/* Stats */}
            <div className="flex items-center gap-4 text-[16px]">
              <span className="flex items-center gap-1">
                <span className="font-medium leading-5 text-[#1c1c1c]">
                  {profile.followers}
                </span>
                <span className="font-normal leading-[22px] text-[#717171]">
                  followers
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium leading-5 text-[#1c1c1c]">
                  {profile.following}
                </span>
                <span className="font-normal leading-[22px] text-[#717171]">
                  following
                </span>
              </span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <FacebookLogo size={24} />
            <InstagramLogo size={24} />
            <PinterestLogo size={24} />
            <span className="flex h-6 items-center rounded-full bg-[#ECECEC] px-2 text-[14px] font-semibold leading-5 text-[#717171]">
              +{profile.extraSocialCount}
            </span>
          </div>

          {/* Bio */}
          <p className="max-w-[335px] text-[16px] leading-[22px] text-[#1c1c1c]">
            {profile.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
