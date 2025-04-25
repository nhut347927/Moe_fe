import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/common/utils/utils";

interface PostCardProps {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  likes: number;
  comments: number;
  category?: string;
  categoryColor?: string;
  saved?: boolean;
}

export default function PostCard({
  title,
  date,
  image,
  excerpt,
  likes: initialLikes,
  comments,
  category,
  categoryColor = "bg-blue-500",
  saved = false,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);
  const [likes, setLikes] = useState(initialLikes);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleLike = () => {
    setLikes((prev: number) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div
    ref={cardRef}
    className={cn(
      "group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform flex flex-col",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* --- Image section --- */}
    <div className="relative overflow-hidden aspect-[1/1]">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className={cn(
          "w-full h-full object-cover transition-transform duration-700",
          isHovered && "scale-110"
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {category && (
        <div
          className={`absolute top-3 left-3 ${categoryColor} text-white text-xs font-medium px-2.5 py-1 rounded-full`}
        >
          {category}
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
        {date}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-2">
          {/* Like / Comment / Save on hover */}
          <Button
            onClick={handleLike}
            size="sm"
            className="rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 shadow-md"
          >
            <Heart
              size={16}
              className={isLiked ? "fill-rose-500 text-rose-500" : ""}
            />
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 shadow-md"
          >
            <MessageCircle size={16} />
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 shadow-md"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark
              size={16}
              className={isSaved ? "fill-amber-500 text-amber-500" : ""}
            />
          </Button>
        </div>
      </div>
    </div>
  
    {/* --- Content section dưới cùng --- */}
    <div className="p-5 flex flex-col gap-2">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
        {excerpt}
      </p>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
          >
            <Heart
              size={18}
              className={cn(
                "transition-transform",
                isLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
              )}
            />
            <span className="text-xs font-medium">{likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <MessageCircle size={18} />
            <span className="text-xs font-medium">{comments}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark
              size={18}
              className={cn(
                "transition-transform",
                isSaved
                  ? "fill-amber-500 text-amber-500 scale-110"
                  : "text-gray-500 dark:text-gray-400"
              )}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MoreHorizontal
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Chia sẻ</DropdownMenuItem>
              <DropdownMenuItem>Báo cáo</DropdownMenuItem>
              <DropdownMenuItem>Ẩn</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </div>
  
  );
}
