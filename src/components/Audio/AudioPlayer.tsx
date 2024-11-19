import React, { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  audioSrc: string;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to the audio element
  const progressRef = useRef<HTMLDivElement | null>(null); // Ref to the progress bar
  const [progress, setProgress] = useState(0); // Audio progress (0 to 100)
  const [duration, setDuration] = useState(0); // Audio duration
  const [isDragging, setIsDragging] = useState(false); // Dragging state for progress bar

  // Update duration and progress when audio data is ready
  useEffect(() => {
    const audio = audioRef.current;

    const updateDuration = () => {
      if (audio) setDuration(audio.duration);
    };

    const updateProgress = () => {
      if (audio && !isDragging) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false); // Reset isPlaying to false when audio ends
    };

    if (audio) {
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnded);
    }

    // Cleanup event listeners when component unmounts or updates
    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [isDragging, setIsPlaying]);

  // Play or pause the audio based on the isPlaying prop
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying]);

  // Handle clicking on the progress bar
  const handleClickOnProgress = (e: React.MouseEvent) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (rect && audioRef.current) {
      const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const newTime = (offsetX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100);
    }
  };

  // Handle mouse down (start dragging)
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // Handle mouse move (during dragging)
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const newTime = (offsetX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100);
    }
  };

  // Handle mouse up (end dragging)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add/remove mousemove and mouseup event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="custom-audio-player">
      {/* Audio element */}
      <audio ref={audioRef} src={audioSrc} />

      {/* Display current time and total duration */}
      <div className="time-info text-light d-flex justify-content-end">
        {Math.floor((audioRef.current?.currentTime || 0) / 60)}:
        {Math.floor((audioRef.current?.currentTime || 0) % 60)
          .toString()
          .padStart(2, "0")}{" "}
        / {Math.floor(duration / 60)}:
        {Math.floor(duration % 60).toString().padStart(2, "0")}
      </div>

      {/* Progress bar */}
      <div
        className="progress-container"
        ref={progressRef}
        style={progressContainerStyle}
        onClick={handleClickOnProgress} // Click to change progress
        onMouseDown={handleMouseDown} // Start dragging
      >
        <div
          className="progress-bar"
          style={{ ...progressBarStyle, width: `${progress}%` }}
        ></div>
        <div
          className="progress-handle"
          style={{ ...progressHandleStyle, left: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// TSX Styles using React.CSSProperties
const progressContainerStyle: React.CSSProperties = {
  position: "relative",
  height: "5px",
  width: "100%",
  backgroundColor: "#393939",
  borderRadius: "5px",
  cursor: "pointer",
};

const progressBarStyle: React.CSSProperties = {
  height: "100%",
  backgroundColor: "#fff",
  borderRadius: "5px",
};

const progressHandleStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "15px",
  height: "15px",
  backgroundColor: "#fff",
  border: "2px solid #fff",
  borderRadius: "50%",
  cursor: "pointer",
};

export default AudioPlayer;
