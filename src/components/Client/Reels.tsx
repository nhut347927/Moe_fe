import React, { useState, useRef, useEffect } from "react";
import demo from "../../assets/images/demo.jpg";
import idt41104 from "../../assets/audio/idt41104.mp3";
import AudioPlayer from "../Audio/AudioPlayer";
import vid1 from "../../assets/video/vid-1.mp4";
import vid2 from "../../assets/video/vid-2.mp4";
import vid3 from "../../assets/video/vid-3.mp4";
import vid4 from "../../assets/video/vid-4.mp4";
import vid5 from "../../assets/video/vid-5.mp4";
import vid6 from "../../assets/video/vid-6.mp4";
import BgNoise from "../BackgroundComponent/BgNoise";

// Define TypeScript types for the data
interface Reel {
  username: string;
  vid: string;
  time: string;
  likes: number;
  postText: string;
}

interface Data {
  username: string;
  time: string;
  likes: number;
}

const Reels: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Refs for video elements
  const currentIndex = useRef<number>(0); // Current video index
  const lastScrollTime = useRef<number>(0); // Last scroll time to prevent quick scrolling
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Video play state
  const [isMuted, setIsMuted] = useState<boolean>(true); // Mute state
  const [mplay, setMplay] = useState<boolean>(false); // Audio play state
  
  // Mock reel data
  const reelsData: Reel[] = [
    { username: "nhut379", vid: vid1, time: "9 giờ", likes: 1236, postText: "Nội dung Reel 1" },
    { username: "user123", vid: vid2, time: "8 giờ", likes: 500, postText: "Nội dung Reel 2" },
    { username: "user456", vid: vid3, time: "7 giờ", likes: 890, postText: "Nội dung Reel 3" },
    { username: "user789", vid: vid4, time: "6 giờ", likes: 345, postText: "Nội dung Reel 4" },
    { username: "user7659867", vid: vid5, time: "6 giờ", likes: 345, postText: "Nội dung Reel 5" },
    { username: "user345376467", vid: vid6, time: "6 giờ", likes: 345, postText: "Nội dung Reel 6" },
  ];

  const [currentUser, setCurrentUser] = useState<string>(reelsData[0].username); // Current user state
  const [bgVid, setBgVid] = useState<string>(reelsData[0].vid); // Background video state

  // Scroll event handler
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const videoContainer = document.getElementById("video-container");
      if (!videoContainer || !videoContainer.contains(event.target as Node)) return;

      event.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 300) return; // Only scroll every 300ms

      const delta = Math.sign(event.deltaY);
      currentIndex.current = Math.min(
        Math.max(currentIndex.current + delta, 0),
        videoRefs.current.length - 1
      );
      const target = videoRefs.current[currentIndex.current];

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });

        setCurrentUser(reelsData[currentIndex.current].username);
        setBgVid(reelsData[currentIndex.current].vid);

        // Play the current video and unmute it
        setIsPlaying(true);
        setIsMuted(false);

        // Pause and mute other videos
        videoRefs.current.forEach((video, index) => {
          if (index !== currentIndex.current && video) {
            video.pause();
            video.muted = true;
          } else if (video) {
            video.play();
            video.muted = false;
          }
        });

        target.style.opacity = "0";
        target.style.transition = "opacity 1s ease-in-out";
        setTimeout(() => {
          target.style.opacity = "1";
        }, 100);
      }

      lastScrollTime.current = now;
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const data: Data[] = [
    { username: "nhut379", time: "9 giờ", likes: 1236 },
    { username: "user123", time: "8 giờ", likes: 500 },
    { username: "user456", time: "7 giờ", likes: 890 },
    { username: "user789", time: "6 giờ", likes: 345 },
    { username: "user999", time: "5 giờ", likes: 678 },
  ];

  const togglePlay = () => {
    setMplay((prev) => !prev);
  };

  return (
    <div className="d-flex">
      <BgNoise videoSrc={bgVid} />
      <div
        className="moe-scroll-but-hidden moe-vh-100 w-100 ms-3"
        id="video-container"
      >
        {reelsData.map((reel, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-center moe-vh-100"
          >
            <div className="d-flex align-items-center h-100">
              <video
                ref={(el) => (videoRefs.current[index] = el)} // Save video ref
                className="moe-layout-vid border-0 rounded-4"
                src={reel.vid}
                controls
                autoPlay={currentIndex.current === index} // Auto play if current video
                muted={currentIndex.current !== index} // Mute if not the current video
                loop
                style={{ boxShadow: "5px 10px 15px #00000080" }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Sidebar */}
      <div className="d-flex align-items-center px-3 ms-auto bg">
        <div className="moe-bg-color-black-1d p-3 moe-w-400 rounded-4 moe-vh-85 mt-5 moe-shadow-2">
          <div className="d-flex align-items-center mb-3">
            <div className="me-3">
              <img
                className="moe-box-45 moe-img-responsive rounded-5 moe-shadow-1"
                src={demo}
                alt="IMG"
              />
            </div>
            <div className="w-100">
              <div className="d-flex align-items-center">
                <span className="font-weight-bold">
                  <strong>{currentUser}</strong>
                </span>
                <button
                  className="moe-shadow-1 btn moe-bg-color-black-39 moe-color-f5 p-1 px-2 moe-f-s-12 me-3 ms-auto"
                  type="button"
                >
                  Theo dõi
                </button>
                <button
                  className="moe-shadow-1 btn moe-bg-color-black-39 moe-color-f5 p-1 px-2 moe-f-s-12"
                  type="button"
                >
                  Nhắn tin
                </button>
              </div>
              <div className="moe-f-s-14 mt-1">
                <span>5 bài đăng</span>
                <span className="ms-3">9 cover</span>
                <span className="ms-3">3N người theo dõi</span>
              </div>
            </div>
          </div>
          <div className="mb-2">abc</div>
          {/* Audio Player Section */}
          <div className="d-flex align-items-center">
            <div className="mt-1" onClick={togglePlay}>
              <img
                className={`${
                  mplay ? "moe-rotate-image" : ""
                } moe-box-32 moe-img-responsive rounded-5 mt-1`}
                src={demo}
                alt="IMG"
              />
            </div>
            <div className="w-100 ms-3">
              <AudioPlayer
                audioSrc={idt41104}
                isPlaying={mplay}
                setIsPlaying={setMplay}
              />
            </div>
          </div>
          <div className="d-flex align-items-center mt-1">
            <span className="moe-color-f5 moe-f-s-28 p-0 me-3" >
              <i className="bx bx-heart"></i>
            </span>
            <span className="moe-color-f5 moe-f-s-28 p-0 me-3">
              <i className="bx bx-chat"></i>
            </span>
            <span className="moe-color-f5 moe-f-s-28 p-0 me-3" >
              <i className="bx bx-send"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reels;
