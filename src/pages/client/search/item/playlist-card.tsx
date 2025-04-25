// PlaylistCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Clock, Play } from "lucide-react";
import { Playlist } from "../types";

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl h-full">
      <div className="flex flex-col h-full">
        <div className="relative aspect-square group">
          <img
            src={playlist.cover || "/placeholder.svg"}
            alt={playlist.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="icon"
              className="rounded-full h-12 w-12 bg-primary/90 hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="h-6 w-6 fill-white text-white" />
            </Button>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-black/60 hover:bg-black/60 text-white">
              <Music className="h-3 w-3 mr-1" />
              {playlist.tracks} bài
            </Badge>
          </div>
        </div>
        <CardContent className="p-3 flex-grow">
          <h3 className="font-semibold text-base line-clamp-1">
            {playlist.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-2">
            {playlist.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <img
                src={playlist.authorAvatar || "/placeholder.svg"}
                alt={playlist.author}
                className="w-4 h-4 rounded-full"
              />
              <span>{playlist.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{playlist.duration}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}