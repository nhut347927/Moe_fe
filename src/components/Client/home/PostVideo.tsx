import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Repeat, Repeat1 } from "lucide-react";

interface PostVideoProps {
  videoSrc: string;
  initialMuted?: boolean;
  initialPlaying?: boolean;
}

const PostVideo: React.FC<PostVideoProps> = ({
  videoSrc,
  initialMuted = true,
  initialPlaying = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isLooping, setIsLooping] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update video state when component mounts or props change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = initialMuted; // Sync muted state
    setIsMuted(initialMuted); // Sync state to ensure the UI reflects the correct value

    if (initialPlaying) {
      video
        .play()
        .catch((error) => console.error("Error attempting to play:", error));
    } else {
      video.pause();
    }
  }, [initialMuted, initialPlaying]);

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration && !isNaN(video.duration)) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Play/Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video
        .play()
        .catch((error) => console.error("Error attempting to play:", error));
    }
    setIsPlaying(!isPlaying);
  };

  // Mute/Unmute toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngừng sự kiện click lan tỏa lên phần tử bao quanh video
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Loop toggle
  const toggleLoop = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngừng sự kiện click lan tỏa lên phần tử bao quanh video
    const video = videoRef.current;
    if (!video) return;

    video.loop = !video.loop;
    setIsLooping(video.loop);
  };

  // Handle progress bar drag
  const handleProgressChange = (clientX: number) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video || !video.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const position = Math.min(
      Math.max((clientX - rect.left) / rect.width, 0),
      1
    ); // Limit to [0, 1]
    const newTime = position * video.duration;
    video.currentTime = newTime;
    setProgress(position * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgressChange(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleProgressChange(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove as any);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove as any);
    };
  }, [isDragging]);

  // Format time to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center">
      <div className="relative h-screen flex items-center" onClick={togglePlay}>
        {/* Added onClick to the container */}
        <video
          ref={videoRef}
          src={videoSrc}
          className="h-auto max-h-[97vh] object-cover shadow-2xl shadow-zinc-900 dark:shadow-zinc-500  rounded-3xl cursor-pointer"
          autoPlay={isPlaying}
          muted={isMuted}
          loop={isLooping}
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            className="bg-black bg-opacity-50 rounded-full p-4"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause size={48} className="text-white" />
            ) : (
              <Play size={48} className="text-white" />
            )}
          </button>
        </div>
        <div className="absolute bottom-3 left-0 right-0 p-4 bg-zinc-900 rounded-3xl">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <div
              ref={progressBarRef}
              className="w-full mx-4 h-2 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
              onMouseDown={handleMouseDown}
            >
              <div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-white truncate w-40 text-sm text-center mx-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <button
              onClick={toggleLoop}
              className={`text-white hover:text-gray-300 transition-colors ${
                isLooping ? "text-blue-400" : ""
              }`}
              aria-label="Toggle loop"
            >
              {isLooping ? <Repeat1 size={24} /> : <Repeat size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostVideo;
