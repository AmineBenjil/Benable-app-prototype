import { BookmarkIcon, CommentIcon, HeartIcon, ShareIcon } from "@/lib/icons";

export function SocialActionsBar({ likes, comments }: { likes: number; comments: number }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <button type="button" className="flex items-center gap-2 text-[#1c1c1c]">
          <HeartIcon size={24} />
          <span className="text-[14px] font-medium leading-5">
            {likes.toLocaleString()}
          </span>
        </button>
        <button type="button" className="flex items-center gap-2 text-[#1c1c1c]">
          <CommentIcon size={24} />
          <span className="text-[14px] font-medium leading-5">{comments}</span>
        </button>
      </div>
      <div className="flex items-center gap-4 text-[#1c1c1c]">
        <button type="button" aria-label="Share">
          <ShareIcon size={24} />
        </button>
        <button type="button" aria-label="Bookmark">
          <BookmarkIcon size={24} />
        </button>
      </div>
    </div>
  );
}
