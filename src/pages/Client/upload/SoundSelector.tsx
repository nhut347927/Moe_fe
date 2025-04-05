"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Music, Search, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAxiosInstance } from "../../../services/axios/axiosInstance";

interface Sound {
  postId: number;
  content: string;
  displayName: string;
  image: string;
  video: string;
}

interface SoundSelectorProps {
  setPostId: (id: number | null) => void;
}

export function SoundSelector({ setPostId }: SoundSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const axiosInstance = getAxiosInstance();
  // Fetch sounds with debounce (600ms)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await axiosInstance.get("/post/search", {
          params: { keyword: searchQuery },
        });

        setSounds(response.data.data || []);
      } catch (error) {
        console.error("Error fetching sounds:", error);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const togglePlay = () => {
    const video = document.getElementById("soundVideo") as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-zinc-200 dark:bg-zinc-900 rounded-3xl p-4">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Music className="w-5 h-5" /> Chọn nhạc nền
      </h3>

      {/* Phát preview nhạc */}
      {selectedSound ? (
        <div className="space-y-4 pb-8">
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <video
              id="soundVideo"
              controls
              src={`https://res.cloudinary.com/dwv76nhoy/video/upload/w_500/${selectedSound.video}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{selectedSound.content}</h4>
              <p className="text-sm text-gray-500">
                {selectedSound.displayName}
              </p>
            </div>
            <Button onClick={togglePlay} size="icon" variant="outline">
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No music selected. Please search and select a track.
        </div>
      )}

      {/* Ô tìm kiếm */}
      <div className="relative mb-4 rounded-xl">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm nhạc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Danh sách bài nhạc */}
      <div className="grid gap-3">
        {sounds.map((sound) => (
          <div
            key={sound.postId}
            className="flex items-center p-3 border rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={`https://res.cloudinary.com/dwv76nhoy/image/upload/w_48/${sound.image}`}
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="ml-4 flex-1">
              <div className="font-medium">{sound.content}</div>
              <div className="text-sm text-gray-500">{sound.displayName}</div>
            </div>
            <div className="flex items-center gap-4">
              {/* <span className="text-sm">{sound.duration}</span> */}
              <Button
                size="sm"
                variant={
                  selectedSound?.postId === sound.postId ? "default" : "outline"
                }
                onClick={() => {
                  setSelectedSound(sound);
                  setPostId(sound.postId);
                }}
              >
                {selectedSound?.postId === sound.postId ? "Đã chọn" : "Chọn"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
