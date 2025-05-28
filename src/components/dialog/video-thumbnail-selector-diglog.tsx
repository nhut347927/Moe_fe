"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/common/hooks/use-toast";

interface VideoThumbnailSelectorProps {
  onSelect: (seconds: number) => void;
  videoUrl: string;
  children?: React.ReactNode;
}

export default function VideoThumbnailSelector({
  onSelect,
  videoUrl,
  children,
}: VideoThumbnailSelectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const getThumbnailUrl = (seconds: number) =>
    `https://res.cloudinary.com/dwv76nhoy/video/upload/so_${Math.floor(
      seconds
    )}/videos/ku2ammahemr2k4iiezza.jpg`;

  // Check video URL status
  const checkVideoUrl = async (url: string): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout
      const response = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Error checking video URL:", error);
      toast({
        variant: "destructive",
        description: "Không thể truy cập video. Vui lòng kiểm tra URL.",
      });
      return false;
    }
  };

  // ...existing code...
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setDuration(0);
      setSelectedSeconds(5);
      setCurrentTime(0);
      return;
    }

    let cleanup = () => {};

    const initializeVideo = async () => {
      // Đợi videoRef mount
      if (!videoRef.current) {
        // Đợi 1 chút rồi thử lại
        const timer = setTimeout(initializeVideo, 100);
        cleanup = () => clearTimeout(timer);
        return;
      }

      const video = videoRef.current;
      setIsLoading(true);

      // Kiểm tra URL
      const isUrlValid = await checkVideoUrl(videoUrl);
      if (!isUrlValid) {
        setIsLoading(false);
        return;
      }

      const handleLoadedMetadata = () => {
        const d = video.duration;
        if (d && isFinite(d) && d > 0) {
          setDuration(d);
          setSelectedSeconds(Math.min(5, Math.floor(d / 2)));
          setCurrentTime(video.currentTime);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast({
            variant: "destructive",
            description: "Không thể lấy thông tin thời lượng video.",
          });
        }
      };

      const handleError = () => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "Lỗi tải video. Vui lòng thử lại.",
        });
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("error", handleError);
      video.addEventListener("timeupdate", handleTimeUpdate);

      // Nếu metadata đã sẵn sàng thì gọi luôn
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }

      cleanup = () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("error", handleError);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    };

    initializeVideo();

    return () => {
      cleanup();
    };
  }, [videoUrl, isOpen, toast]);

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0];
    console.log("Slider changed to:", newTime, "isLoading:", isLoading);

    setSelectedSeconds(newTime);

    // Chỉ set thời gian nếu video đã sẵn sàng và đang không loading
    if (
      videoRef.current &&
      videoRef.current.readyState >= 1 &&
      !isLoading &&
      duration > 0
    ) {
      videoRef.current.currentTime = newTime;
      console.log("Video currentTime set to:", newTime);
    } else {
      console.log("Video not ready to set currentTime");
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleConfirm = () => {
    console.log("Confirm button clicked, selected seconds:", selectedSeconds);
    onSelect(selectedSeconds);
    setIsOpen(false);
  };

  // Log state for debugging
  useEffect(() => {
    console.log(
      "Render - isLoading:",
      isLoading,
      "duration:",
      duration,
      "selectedSeconds:",
      selectedSeconds
    );
  }, [isLoading, duration, selectedSeconds]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="w-full bg-zinc-900 hover:bg-zinc-700">
            Chọn ảnh thumbnail
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Chọn ảnh bìa từ video</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Preview */}
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              {isLoading && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/50 z-10"
                  aria-label="Đang tải video"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
              <video
                key={videoUrl}
                ref={videoRef}
                src={videoUrl}
                className="w-full h-64 object-contain"
                preload="auto"
                controls
                crossOrigin="anonymous"
                aria-label="Video preview for thumbnail selection"
              />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Video - {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Thumbnail Preview */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={getThumbnailUrl(selectedSeconds)}
                alt="Ảnh bìa"
                className="w-full h-64 object-contain"
                onError={(e) => {
                  console.log("Thumbnail image failed to load");
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/640x360?text=Thumbnail+Error";
                }}
              />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Tại giây thứ {Math.floor(selectedSeconds)} (
              {formatTime(selectedSeconds)})
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-6 space-y-2 px-2">
          <Slider
            value={[selectedSeconds]}
            onValueChange={handleSliderChange}
            max={duration > 0 ? duration : 100}
            min={0}
            step={0.1}
            className="w-full"
            disabled={isLoading || duration <= 0}
          />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0:00</span>
            <span className="font-medium">
              {isLoading
                ? "Đang tải..."
                : `Đã chọn: ${formatTime(selectedSeconds)}`}
            </span>
            <span>{duration > 0 ? formatTime(duration) : "..."}</span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button onClick={handleConfirm} disabled={isLoading || duration <= 0}>
            Chọn ảnh bìa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
