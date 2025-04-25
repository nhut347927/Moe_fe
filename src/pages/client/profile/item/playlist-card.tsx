import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/common/utils/utils';

interface PlaylistCardProps {
  title: string;
  tracks: number;
  image?: string;
  color: string;
  duration?: string;
  compact?: boolean;
}

export default function PlaylistCard({ title, tracks, image, color, duration }: PlaylistCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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
      { threshold: 0.1 },
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

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative rounded-xl overflow-hidden transition-all duration-500 transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
      
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 dark:opacity-40`}></div>
      <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image || '/placeholder.svg'}
            alt={title}
            className={cn('w-full h-full object-cover transition-transform duration-700', isHovered && 'scale-110')}
          />
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 flex items-center justify-center',
              isHovered && 'opacity-100',
            )}
          >
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full w-14 h-14 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-105 transition-transform shadow-lg"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </Button>
          </div>
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
            <Music size={12} className="mr-1" />
            {tracks} bài
          </div>
          {duration && (
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
              <Clock size={12} className="mr-1" />
              {duration}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Playlist • {tracks} bài hát</p>
          <div className="flex items-center justify-between mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="px-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                size={18}
                className={cn('transition-transform', isLiked ? 'fill-rose-500 text-rose-500 scale-110 mr-1' : 'mr-1')}
              />
              <span className="text-xs">Yêu thích</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Thêm vào hàng đợi</DropdownMenuItem>
                <DropdownMenuItem>Chia sẻ</DropdownMenuItem>
                <DropdownMenuItem>Tải xuống</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 flex items-end justify-center gap-0.5 px-4 pb-1">
            <div className="w-0.5 h-2 bg-rose-500 animate-equalizer1"></div>
            <div className="w-0.5 h-3 bg-rose-500 animate-equalizer2"></div>
            <div className="w-0.5 h-1 bg-rose-500 animate-equalizer3"></div>
            <div className="w-0.5 h-4 bg-rose-500 animate-equalizer2"></div>
            <div className="w-0.5 h-2 bg-rose-500 animate-equalizer1"></div>
          </div>
        )}
      </div>
    </div>
  );
}