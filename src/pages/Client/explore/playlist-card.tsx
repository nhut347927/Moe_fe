import { Link } from "react-router-dom"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Playlist {
  id: string
  title: string
  description: string
  imageUrl: string
  totalTracks: number
  creator: string
}

interface PlaylistCardProps {
  playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Card className="w-[200px] min-w-[200px] overflow-hidden transition-all duration-200 hover:shadow-md group">
      <Link to={`/playlist/${playlist.id}`}>
        <div className="relative aspect-square">
          <img
            src={playlist.imageUrl || "/placeholder.svg"}
            alt={playlist.title}
           
            className="object-cover rounded-t-md"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-1">{playlist.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{playlist.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        {playlist.totalTracks} bài hát • {playlist.creator}
      </CardFooter>
    </Card>
  )
}

