import { Heart, Eye } from "lucide-react"
import { cn } from "@/common/utils/utils"

interface SquarePostProps {
  id: string
  title: string
  imageUrl: string
  views: number
  likes: number
  liked: boolean
  onLikeToggle: () => void
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative flex h-full flex-col justify-end p-4">
        {/* Title */}
        <h3 className="text-white text-base font-semibold mb-3 line-clamp-2 drop-shadow-sm">{title}</h3>

        {/* Stats and interactions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
            <Eye className="h-4 w-4 text-white" />
            <span className="text-xs font-medium text-white">
              {views.toLocaleString()}
            </span>
          </div>

          <button
            onClick={onLikeToggle}
            className="group flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm transition-all hover:bg-black/60"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all",
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-white group-hover:scale-110",
              )}
            />
            <span className="text-xs font-medium text-white">
              {likes.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
