import { Heart, Eye } from "lucide-react";
import { cn } from "@/common/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface SquarePostProps {
  id: string;
  title: string;
  imageUrl: string;
  views: number;
  likes: number;
  liked: boolean;
  onLikeToggle: () => void;
}

export default function Post({
  id,
  title,
  imageUrl,
  views,
  likes,
  liked,
  onLikeToggle,
}: SquarePostProps) {
  return (
    <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-lg transition-transform hover:scale-[1.01] hover:shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={`post ${id}`}
          className="h-full w-full object-cover"
        />
        {/* Overlay toàn màn hình */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative flex h-full flex-col justify-between p-4 z-10">
        {/* USER INFO - TRÊN CÙNG */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="flex items-center space-x-1">
              <span className="font-semibold text-[15px] text-white">displayname</span>
              <span className="text-gray-400 text-sm">•</span>
              <Link
                to={"/client/profile"}
                className="text-gray-300 text-sm hover:underline hover:text-white"
              >
                @username
              </Link>
            </h3>
            <p className="text-xs text-gray-400">10 ngày trước</p>
          </div>
        </div>

        {/* THÔNG TIN BÀI VIẾT - DƯỚI CÙNG */}
        <div>
          <h3 className="text-white text-base font-semibold line-clamp-2 drop-shadow-sm">
            {title}
          </h3>
          <p className="text-gray-200 text-sm mb-3">text bổ sung sau</p>

          {/* Stats and interactions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onLikeToggle}
              className="group flex items-center gap-1 rounded-md bg-black/40 px-3 py-1 backdrop-blur-sm transition-all hover:bg-black/60"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all",
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-white group-hover:scale-110"
                )}
              />
              <span className="text-xs font-medium text-white">
                {likes.toLocaleString()}
              </span>
            </button>
            <div className="flex items-center gap-1 rounded-md bg-black/40 px-3 py-1 backdrop-blur-sm">
              <Eye className="h-4 w-4 text-white" />
              <span className="text-xs font-medium text-white">
                {views.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
