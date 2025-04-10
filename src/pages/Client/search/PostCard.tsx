// PostCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MoreHorizontal, Play } from "lucide-react";
import { cn } from "@/common/utils/utils";
import { Post } from "./types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl">
      <div className="flex flex-col">
        <div className="relative aspect-video">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2">
            <Badge className={cn("text-white", post.color)}>
              {post.category}
            </Badge>
          </div>

          {post.type === "video" && (
            <>
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="h-12 w-12 text-white fill-white opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              {post.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {post.duration}
                </div>
              )}
            </>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.authorAvatar || "/placeholder.svg"}
              alt={post.author}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">{post.author}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{post.date}</span>
          </div>

          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart
                  className={cn("h-4 w-4", post.saved && "fill-primary text-primary")}
                />
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{post.comments}</span>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="rounded-xl">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}