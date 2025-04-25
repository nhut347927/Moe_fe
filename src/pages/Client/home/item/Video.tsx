import React, {
    useState,
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
  } from "react";
  import { Play, Pause, Volume2, VolumeX } from "lucide-react";
  
  export interface PostVideoProps {
    videoSrc: string;
    initialMuted?: boolean;
    initialPlaying?: boolean;
  }
  
  const PostVideo = forwardRef<HTMLDivElement, PostVideoProps>(
    (
      {
        videoSrc,
        initialMuted = true,
        initialPlaying = true,
      },
      ref
    ) => {
      const videoRef = useRef<HTMLVideoElement>(null);
      const progressBarRef = useRef<HTMLDivElement>(null);
      const [isPlaying, setIsPlaying] = useState(initialPlaying);
      const [progress, setProgress] = useState(0);
      const [isMuted, setIsMuted] = useState(initialMuted);
      const [isDragging, setIsDragging] = useState(false);
      const [currentTime, setCurrentTime] = useState(0);
      const [duration, setDuration] = useState(0);
  
      const containerRef = useRef<HTMLDivElement>(null);
      useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
  
      useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
  
        video.muted = initialMuted;
        setIsMuted(initialMuted);
  
        if (initialPlaying) {
          video
            .play()
            .catch((error) => console.error("Error attempting to play:", error));
        } else {
          video.pause();
        }
      }, [initialMuted, initialPlaying]);
  
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
  
      const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
  
        video.muted = !video.muted;
        setIsMuted(video.muted);
      };
  
      const handleProgressChange = (clientX: number) => {
        const progressBar = progressBarRef.current;
        const video = videoRef.current;
        if (!progressBar || !video || !video.duration) return;
  
        const rect = progressBar.getBoundingClientRect();
        const position = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
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
  
      const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      };
  
      return (
        <div ref={containerRef} className="h-full">
          <div className="h-full w-full relative flex justify-center items-center" onClick={togglePlay}>
            <video
              ref={videoRef}
              src={videoSrc}
              className="h-full object-cover cursor-pointer moe-style"
              autoPlay={isPlaying}
              muted={isMuted}
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70  flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex-1 flex items-center justify-center">
                <button onClick={togglePlay} aria-label={isPlaying ? "Pause video" : "Play video"}>
                  {isPlaying ? <Pause size={48} className="text-white" /> : <Play size={48} className="text-white" />}
                </button>
              </div>
  
              <div className="mb-3 px-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <button onClick={toggleMute} className="text-white hover:text-gray-300">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <div
                    ref={progressBarRef}
                    className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer overflow-hidden"
                    onMouseDown={handleMouseDown}
                  >
                    <div className="h-full bg-white" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-white text-xs w-24 text-right">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
  
  PostVideo.displayName = "PostVideo";
  
  export default PostVideo;