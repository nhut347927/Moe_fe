import React, { useState, useRef, useEffect } from "react";
import img1 from "../../assets/images/Pin by Alva Psyche on A Tổng hợp _ Daisy wallpaper, Flowers photography wallpaper, Flowery wallpaper.jpg";
import img2 from "../../assets/images/bg-demo.jpg";
import img3 from "../../assets/images/demo.jpg";
import img4 from "../../assets/images/girl.png";
import img5 from "../../assets/images/hoavang.jpg";
import img6 from "../../assets/images/hoaxanh.jpg";
import img7 from "../../assets/images/tải xuống.jpg";
import PostMultiImg from "./home/PostMultiImage"; // Đảm bảo đường dẫn này đúng
import UserPostInfo from "./home/UserPostInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostVideo from "./home/PostVideo";
import vid1 from "../../assets/video/vid-1.mp4";
import vid2 from "../../assets/video/vid-2.mp4";
import vid3 from "../../assets/video/vid-3.mp4";
import vid4 from "../../assets/video/vid-4.mp4";
import vid5 from "../../assets/video/vid-5.mp4";
import vid6 from "../../assets/video/vid-6.mp4";
import audio from "../../assets/audio/idt41104.mp3";

type Comment = {
  avatar: string;
  initials: string;
  userName: string;
  content: string;
  time: string;
};

type Post = {
  avatar: string;
  img: string[];
  userName: string;
  postCount: string;
  followers: string;
  bio: string;
  favoriteSong: string;
  songImage: string;
  likes: string;
  commentsCount: string;
  comments: Comment[];
  audio: string;
  ownerAudioPostId: string;
  typePost: "VIDEO" | "IMG";
  video: string;
};

const postData: Post[] = [
  {
    avatar: img1,
    img: [],
    userName: "John Do",
    postCount: "9 bài viết",
    followers: "1.2K",
    bio: "Chào mọi người, mình là người tạo ra Moe. Thích chia sẻ âm nhạc và video! ",
    favoriteSong: "Shape of You - Ed Sheeran",
    songImage: img2,
    likes: "350",
    commentsCount: "5",
    comments: [
      {
        avatar: img1,
        initials: "JD",
        userName: "Jane Smith",
        content: "Bài hát này thật tuyệt vời! Cảm ơn bạn đã chia sẻ.",
        time: "1 giờ trước",
      },
      {
        avatar: img1,
        initials: "JD",
        userName: "Jane Smith",
        content: "Bài hát này thật tuyệt vời! Cảm ơn bạn đã chia sẻ.",
        time: "1 giờ trước",
      },
    ],
    audio: "",
    ownerAudioPostId: "",
    typePost: "VIDEO", // Loại bài đăng, ví dụ "audio", "video", "image"
    video: vid4, // Không có video, có thể để trống nếu bài đăng là audio
  },
  {
    avatar: img1,
    img: [],
    userName: "Jane Doe",
    postCount: "12 bài viết",
    followers: "2.3K",
    bio: "Chào các bạn, mình yêu âm nhạc và chia sẻ những khoảnh khắc đáng nhớ!",
    favoriteSong: "Blinding Lights - The Weeknd",
    songImage: img3,
    likes: "500",
    commentsCount: "8",
    comments: [
      {
        avatar: img3,
        initials: "JD",
        userName: "John Smith",
        content: "Bài hát này thật tuyệt vời, mình thích nó!",
        time: "30 phút trước",
      },
    ],
    audio: "",
    ownerAudioPostId: "",
    typePost: "VIDEO",
    video: vid6,
  },
  {
    avatar: img1,
    img: [],
    userName: "Alice Cooper",
    postCount: "5 bài viết",
    followers: "800",
    bio: "Thích sáng tạo nội dung và chia sẻ những video thú vị!",
    favoriteSong: "Don't Start Now - Dua Lipa",
    songImage: img5,
    likes: "150",
    commentsCount: "3",
    comments: [
      {
        avatar: img4,
        initials: "AC",
        userName: "Paul White",
        content: "Video này thật sự rất sáng tạo!",
        time: "3 giờ trước",
      },
      {
        avatar: img4,
        initials: "AC",
        userName: "Paul White",
        content: "Video này thật sự rất sáng tạo!",
        time: "3 giờ trước",
      },
    ],
    audio: "",
    ownerAudioPostId: "",
    typePost: "VIDEO", // Bài đăng video
    video: vid1, // Đường dẫn video
  },
  {
    avatar: img1,
    img: [img5, img1, img3],
    userName: "Bob Martin 666",
    postCount: "20 bài viết",
    followers: "3K",
    bio: "Mình thích chia sẻ các bản nhạc remix vui nhộn!",
    favoriteSong: "Levitating - Dua Lipa",
    songImage: img6,
    likes: "1200",
    commentsCount: "15",
    comments: [
      {
        avatar: img5,
        initials: "BM",
        userName: "Eva White",
        content: "Cảm ơn vì đã chia sẻ bài nhạc này!",
        time: "1 ngày trước",
      },
      {
        avatar: img5,
        initials: "BM",
        userName: "Eva White",
        content: "Cảm ơn vì đã chia sẻ bài nhạc này!",
        time: "1 ngày trước",
      },
      {
        avatar: img5,
        initials: "BM",
        userName: "Eva White",
        content: "Cảm ơn vì đã chia sẻ bài nhạc này!",
        time: "1 ngày trước",
      },
    ],
    audio: audio,
    ownerAudioPostId: "audioPostId_3",
    typePost: "IMG",
    video: "",
  },
  {
    avatar: img1,
    img: [img2, img1, img3, img4, img5],
    userName: "Bob Martin",
    postCount: "20 bài viết",
    followers: "3K",
    bio: "Mình thích chia sẻ các bản nhạc remix vui nhộn!",
    favoriteSong: "Levitating - Dua Lipa",
    songImage: img6,
    likes: "1200",
    commentsCount: "15",
    comments: [
      {
        avatar: img5,
        initials: "BM",
        userName: "Eva White",
        content: "Cảm ơn vì đã chia sẻ bài nhạc này!",
        time: "1 ngày trước",
      },
      {
        avatar: img5,
        initials: "BM",
        userName: "Eva White",
        content: "Cảm ơn vì đã chia sẻ bài nhạc này!",
        time: "1 ngày trước",
      },
      {
        avatar: img5,
        initials: "BM",
        userName: "Eva White",
        content: "Cảm ơn vì đã chia sẻ bài nhạc này!",
        time: "1 ngày trước",
      },
    ],
    audio: audio,
    ownerAudioPostId: "audioPostId_3",
    typePost: "IMG",
    video: "",
  },
  {
    avatar: img1,
    img: [],
    userName: "Chris Black 21",
    postCount: "15 bài viết",
    followers: "2.5K",
    bio: "Chuyên về video âm nhạc và các bản remix độc đáo!",
    favoriteSong: "Stay - The Kid LAROI, Justin Bieber",
    songImage: img7,
    likes: "1000",
    commentsCount: "20",
    comments: [
      {
        avatar: img6,
        initials: "CB",
        userName: "Anna Green",
        content: "Đây là video âm nhạc tuyệt vời, cảm ơn bạn đã chia sẻ!",
        time: "2 ngày trước",
      },
    ],
    audio: "",
    ownerAudioPostId: "",
    typePost: "VIDEO",
    video: vid5, // Đường dẫn video
  },
  {
    avatar: img1,
    img: [],
    userName: "Chris Black 12",
    postCount: "15 bài viết",
    followers: "2.5K",
    bio: "Chuyên về video âm nhạc và các bản remix độc đáo!",
    favoriteSong: "Stay - The Kid LAROI, Justin Bieber",
    songImage: img7,
    likes: "1000",
    commentsCount: "20",
    comments: [
      {
        avatar: img6,
        initials: "CB",
        userName: "Anna Green",
        content: "Đây là video âm nhạc tuyệt vời, cảm ơn bạn đã chia sẻ!",
        time: "2 ngày trước",
      },
    ],
    audio: "",
    ownerAudioPostId: "",
    typePost: "VIDEO",
    video: vid2, // Đường dẫn video
  },
  {
    avatar: img1,
    img: [],
    userName: "Chris Black 9",
    postCount: "15 bài viết",
    followers: "2.5K",
    bio: "Chuyên về video âm nhạc và các bản remix độc đáo!",
    favoriteSong: "Stay - The Kid LAROI, Justin Bieber",
    songImage: img7,
    likes: "1000",
    commentsCount: "20",
    comments: [],
    audio: "",
    ownerAudioPostId: "",
    typePost: "VIDEO",
    video: vid3, // Đường dẫn video
  },
];


const Home = () => {
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndex = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Video mặc định sẽ phát
  const [isMuted, setIsMuted] = useState<boolean>(true); // Mặc định tắt tiếng
  const [currentPost, setCurrentPost] = useState<Post>(postData[0]); // Lưu bài đăng hiện tại

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const videoContainer = document.getElementById("video-container");
      if (!videoContainer || !videoContainer.contains(event.target as Node))
        return;

      event.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 300) return;

      const delta = Math.sign(event.deltaY); // Tính hướng cuộn (lên hoặc xuống)
      currentIndex.current = Math.min(
        Math.max(currentIndex.current + delta, 0),
        videoRefs.current.length - 1
      );

      const target = videoRefs.current[currentIndex.current];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        const newPost = postData[currentIndex.current];
        setCurrentPost(newPost); // Cập nhật bài đăng hiện tại
        setIsPlaying(newPost.typePost === "VIDEO"); // Chỉ phát nếu bài đăng là video
        setIsMuted(false); // Bật âm thanh

        // Hiệu ứng mờ khi chuyển bài
        target.style.opacity = "0";
        target.style.transition = "opacity 0.5s ease-in-out";
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

  return (
    <div className="flex">
      <div
        id="video-container"
        className="w-full max-h-screen overflow-y-auto overflow-x-hidden scroll-but-hidden"
      >
        {postData.map((post, index) => (
          <div
            className="px-10"
            ref={(el) => (videoRefs.current[index] = el)}
            key={index}
          >
            {post.typePost === "VIDEO" ? (
              <PostVideo
                videoSrc={post.video!}
                initialMuted={isMuted}
                initialPlaying={isPlaying && currentIndex.current === index}
              />
            ) : (
              <PostMultiImg
                images={post.img!}
                audioSrc={post.audio}
                initialMuted={isMuted}
                initialPlaying={isPlaying && currentIndex.current === index}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center me-3">
        <UserPostInfo postData={currentPost} />
      </div>
    </div>
  );
};

export default Home;
