import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Play } from "lucide-react"

interface PlaylistCardProps {
  title: string
  description: string
  imageUrl: string
  totalSongs: number
  isPodcast?: boolean
}

export function PlaylistCard({ title, description, imageUrl, totalSongs, isPodcast = false }: PlaylistCardProps) {
  // Removed unused isHovered state

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:bg-gray-50"
      // Removed onMouseEnter and onMouseLeave handlers as isHovered is unused
    >
      <CardContent className="p-4">
        <div className="relative mb-3 aspect-square max-h-[250px] overflow-hidden rounded-md">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={150}
            height={150}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div>
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-xs text-gray-500">{isPodcast ? `${totalSongs} tập` : `${totalSongs} bài hát`}</span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-gray-500 hover:bg-black hover:text-white"
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:text-black">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
