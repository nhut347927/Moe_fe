import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  VolumeX,
  Volume2,
  Repeat,
  Repeat1,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostMultiImgProps {
  images: string[];
  audioSrc?: string;
  initialMuted?: boolean;
  initialPlaying?: boolean; // Trạng thái phát nhạc ban đầu
}

export default function PostMultiImg({
  images,
  audioSrc = "",
  initialMuted = true,
  initialPlaying = false,
}: PostMultiImgProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextPermanentlyHidden, setIsTextPermanentlyHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(initialPlaying); // Sử dụng initialPlaying
  const [isMuted, setIsMuted] = useState(initialMuted); // Trạng thái mute
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isRepeat, setIsRepeat] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleClick = () => {
    if (!isTextPermanentlyHidden) {
      setIsTextPermanentlyHidden(true);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteUnmute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRepeat = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Phát nhạc tự động nếu initialPlaying là true
  useEffect(() => {
    if (audioRef.current && initialPlaying) {
      audioRef.current.play();
    }
  }, [initialPlaying]);

  if (images.length === 0) {
    return <p>No images available</p>;
  }
  useEffect(() => {
    setIsMuted(initialMuted);
  }, [initialMuted]);
  return (
    <div>
      <div className="max-w-[502px] max-h-screen p-5 mx-auto mt-5 relative">
        <motion.div
          className="relative p-3 aspect-[468/697] overflow-hidden cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Artistic image ${currentImageIndex + 1}`}
              className="w-full h-full moe-style object-cover absolute inset-0 mx-auto rounded-xl my-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ display: "none" }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <AnimatePresence>
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
                initial={{ opacity: 1 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-0 left-0 right-0 p-6 text-white"
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-x-3">
                  {/* Play/Pause Button */}
                  <button
                    onClick={toggleAudio}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>

                  {/* Mute/Unmute Button */}
                  <button
                    onClick={handleMuteUnmute}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  {/* Repeat Button */}
                  <button
                    onClick={() => setIsRepeat(!isRepeat)}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                  >
                    {isRepeat ? <Repeat1 size={20} /> : <Repeat size={20} />}
                  </button>
                </div>
              </motion.div>
            </>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <div
                className="absolute top-1/2 left-4 transform w-7 h-7 flex items-center justify-center rounded-full opacity-70 bg-zinc-100 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-5 w-5 font-bold text-zinc-800" />
              </div>
              <div
                className="absolute top-1/2 right-4 transform w-7 h-7 flex items-center justify-center rounded-full opacity-70 bg-zinc-100 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-5 w-5 font-bold text-zinc-800" />
              </div>
            </>
          )}
        </motion.div>

        {images.length > 1 && (
          <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  currentImageIndex === index
                    ? "bg-zinc-50 dark:bg-zinc-50"
                    : "bg-zinc-400 dark:bg-zinc-400"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <audio
          ref={audioRef}
          src={audioSrc}
          muted={initialMuted}
          autoPlay={initialPlaying}
          onEnded={() => {
            if (isRepeat && audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            } else {
              setIsPlaying(false);
            }
          }}
        />
      </div>
    </div>
  );
}
