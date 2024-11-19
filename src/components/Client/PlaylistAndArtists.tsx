import React, { useState, useRef, useEffect } from "react";
import vid1 from "../../assets/video/vid-1.mp4";
import vid2 from "../../assets/video/vid-2.mp4";

interface ReelData {
  username: string;
  vid: string;
}

const PlaylistAndArtists = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]); // Ref của video
  const [isMuted, setIsMuted] = useState<boolean>(true); // Mặc định video sẽ mute
  const [isUserInteracted, setIsUserInteracted] = useState<boolean>(false); // Theo dõi người dùng đã tương tác

  // Dữ liệu giả lập cho các reels
  const reelsData: ReelData[] = [
    { username: "user1", vid: vid1 },
    { username: "user2", vid: vid2 },
    // Thêm dữ liệu video tại đây
  ];

  // Play video đầu tiên khi component được mount
  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].play();
    }
  }, []);

  // Kích hoạt âm thanh khi người dùng tương tác
  const handleUserInteraction = (): void => {
    if (!isUserInteracted) {
      setIsMuted(false);
      setIsUserInteracted(true);
      if (videoRefs.current[0]) {
        videoRefs.current[0].muted = false; // Bật âm thanh
        videoRefs.current[0].play(); // Phát lại video với âm thanh
      }
    }
  };

  return (
    <div onClick={handleUserInteraction}> {/* Theo dõi tương tác người dùng */}
      {reelsData.map((reel, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el!)} // Cung cấp kiểu cho el
          src={reel.vid}
          muted={isMuted} // Tắt âm thanh khi tải trang
          autoPlay
          loop
          playsInline
          style={{ width: "100%" }}
        />
      ))}
    </div>
  );
};

export default PlaylistAndArtists;
