import React, {
    useState,
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
  } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    VolumeX,
    Volume2,
  } from "lucide-react";
  
  interface PostMultiImgProps {
    images: string[];
    audioSrc?: string;
    initialMuted?: boolean;
    initialPlaying?: boolean;
  }
  
  const PostMultiImg = forwardRef<HTMLDivElement, PostMultiImgProps>(
    (
      {
        images,
        audioSrc = "",
        initialMuted = true,
        initialPlaying = true,
      },
      ref
    ) => {
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
      const [isPlaying, setIsPlaying] = useState(initialPlaying);
      const [isMuted, setIsMuted] = useState(initialMuted);
      const audioRef = useRef<HTMLAudioElement | null>(null);
      const [isHovered, setIsHovered] = useState(false);
      const containerRef = useRef<HTMLDivElement>(null);
  
      useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
  
      const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      };
  
      const prevImage = () => {
        setCurrentImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        );
      };
  
      const toggleAudio = () => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play().catch(console.error);
          }
          setIsPlaying((prev) => !prev);
        }
      };
  
      const handleMuteUnmute = () => {
        if (audioRef.current) {
          audioRef.current.muted = !isMuted;
          setIsMuted((prev) => !prev);
        }
      };
  
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.muted = isMuted;
        }
      }, [isMuted]);
  
      useEffect(() => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.play().catch(console.error);
          } else {
            audioRef.current.pause();
          }
        }
      }, [isPlaying]);
  
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.muted = initialMuted;
          setIsMuted(initialMuted);
          if (initialPlaying) {
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
          }
        }
      }, [initialMuted, initialPlaying]);
  
      if (images.length === 0) return <p>No images available</p>;
  
      return (
        <div ref={containerRef} className="mx-auto h-full flex items-center">
          <div className="h-full w-full mx-auto relative">
            <motion.div
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative max-h-screen h-full w-full overflow-hidden cursor-pointer"
              onClick={toggleAudio}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="w-full h-full moe-style object-cover absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ display: "none" }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
  
              {images.length > 1 && (
                <>
                  <div
                    className="absolute top-1/2 left-4 transform w-6 h-6 flex items-center justify-center rounded-full opacity-50 bg-zinc-100 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    <ChevronLeft className="h-4 w-4 font-bold text-zinc-800" />
                  </div>
                  <div
                    className="absolute top-1/2 right-4 transform w-6 h-6 flex items-center justify-center rounded-full opacity-50 bg-zinc-100 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    <ChevronRight className="h-4 w-4 font-bold text-zinc-800" />
                  </div>
                </>
              )}
  
              {isHovered && (
                <div className="absolute top-0 left-0 right-0 p-3 text-white space-x-3">
                  <button
                    onClick={toggleAudio}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
  
                  <button
                    onClick={handleMuteUnmute}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              )}
  
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 w-1.5 rounded-full ${
                        currentImageIndex === index
                          ? "bg-zinc-50 dark:bg-zinc-50"
                          : "bg-zinc-400 dark:bg-zinc-400"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
  
            <audio
              ref={audioRef}
              src={audioSrc}
              onEnded={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play().catch(console.error);
                }
              }}
            />
          </div>
        </div>
      );
    }
  );
  
  export default PostMultiImg;