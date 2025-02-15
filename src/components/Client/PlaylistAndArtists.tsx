import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Repeat } from "lucide-react";
import vid from "../../assets/video/vid5.mp4";

const PlaylistAndArtists: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default: Playing
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Default: Muted
  const [isLooping, setIsLooping] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set default states for autoplay and muted
    video.autoplay = true;
    video.muted = true;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleLoop = () => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = !video.loop;
    setIsLooping(video.loop);
  };

  const handleProgressChange = (clientX: number) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video) return;

    const rect = progressBar.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const newTime = position * video.duration;
    video.currentTime = newTime;
    setProgress(position * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgressChange(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
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

  return (
    <div className="flex justify-center">
      <div className="relative h-screen flex items-center">
        <video
          ref={videoRef}
          src={vid}
          className="h-auto max-h-screen object-cover shadow-2xl shadow-zinc-900 cursor-pointer"
          loop={isLooping}
          playsInline
          muted // Ensure it starts muted
          autoPlay // Ensure it starts automatically
          onClick={togglePlay}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black bg-opacity-50 rounded-full p-4">
            {isPlaying ? (
              <Pause size={48} className="text-white" />
            ) : (
              <Play size={48} className="text-white" />
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
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
            <button
              onClick={toggleLoop}
              className={`text-white hover:text-gray-300 transition-colors ${
                isLooping ? "text-blue-400" : ""
              }`}
            >
              <Repeat size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistAndArtists;
