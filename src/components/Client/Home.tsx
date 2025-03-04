import { useState, useRef, useEffect } from "react";
import PostMultiImg from "./home/Image";
import Detail from "./home/Detail";
import PostVideo from "./home/Video";
import ActionBar from "./home/ActionBar";
import { useToast } from "@/hooks/use-toast";
import { getAxiosInstance } from "../../services/axios/axiosInstance";

type Reply = {
  commentId: string;
  userAvatar: string;
  content: string;
  displayName: string;
  createdAt: string;
};
type Comment = {
  commentId: string;
  userAvatar: string;
  content: string;
  displayName: string;
  createdAt: string;
  replies: Reply[];
};

type Post = {
  userId: string;
  postId: string;
  createdAt: string;

  userAvatar: string;
  userDisplayName: string;

  postType: "VIDEO" | "IMG";
  videoUrl: string;
  imageUrls: string[];
  caption: string;

  likeCount: string;
  commentCount: string;
  playlistCount: string;

  audioUrl: string;
  audioOwnerAvatar: string;
  audioOwnerName: string;
  audioId: string;

  comments: Comment[];
};

const Home = () => {
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndex = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const [audioStates, setAudioStates] = useState<
    Record<number, { isPlaying: boolean; isMuted: boolean }>
  >({});
  //const [currentPost, setCurrentPost] = useState<Post>(postData[0]);
  const [userInfoStates, setUserInfoStates] = useState<Record<number, boolean>>(
    {}
  );
  const { toast } = useToast();
  const axiosInstance = getAxiosInstance();
  const [errorMessages, setErrorMessages] = useState<any>({});
  const [postData, setPostData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/post/get-post");
        setPostData(response.data.data);
      } catch (error: any) {
        if (error.response && error.response.data) {
          toast({
            variant: "destructive",
            description: error.response.data.message || "An error occurred!",
          });
          setErrorMessages(null);
          const { errors } = error.response.data;
          if (errors) {
            setErrorMessages(errors);
          }
        }
      }
    };

    fetchData();
  }, []);

  // Hàm toggle hiển thị Detail
  const toggleUserInfo = (index: number) => {
    setUserInfoStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const videoContainer = document.getElementById("video-container");

      if (
        document.querySelector(".user-info")?.contains(event.target as Node)
      ) {
        return; // Không cuộn nếu đang hover vào user info
      }

      if (!videoContainer || !videoContainer.contains(event.target as Node))
        return;

      event.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 300) return;

      const delta = Math.sign(event.deltaY);
      const newIndex = Math.min(
        Math.max(currentIndex.current + delta, 0),
        videoRefs.current.length - 1
      );

      if (newIndex !== currentIndex.current) {
        currentIndex.current = newIndex;
        const target = videoRefs.current[currentIndex.current];

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          // setCurrentPost(postData[currentIndex.current]);

          // 🔹 Không thay đổi trạng thái UserInfo khi lướt qua bài khác
          setAudioStates((prevStates) => {
            const updatedStates = { ...prevStates };
            Object.keys(updatedStates).forEach((key) => {
              if (parseInt(key) !== currentIndex.current) {
                updatedStates[parseInt(key)] = {
                  isPlaying: false,
                  isMuted: true,
                };
              }
            });

            updatedStates[currentIndex.current] = {
              isPlaying: true,
              isMuted: false,
            };
            return updatedStates;
          });
        }
      }

      lastScrollTime.current = now;
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="max-h-screen p-2">
      <div
        id="video-container"
        className="h-full rounded-xl overflow-y-auto overflow-x-hidden scroll-but-hidden"
      >
        {postData.map((post, index) => (
          <div
            key={index}
            className="w-full max-h-screen h-screen p-9 flex items-center justify-center"
          >
            <div className="flex h-full">
              <div className="flex border rounded-3xl">
                <div
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`flex-1 min-w-[500px] border-e ${
                    userInfoStates[index] ? "" : "rounded-3xl"
                  }`}
                >
                  {post.postType === "VIDEO" ? (
                    <PostVideo
                      videoSrc={post.videoUrl!}
                      initialMuted={audioStates[index]?.isMuted ?? true}
                      initialPlaying={audioStates[index]?.isPlaying ?? false}
                    />
                  ) : (
                    <PostMultiImg
                      images={post.imageUrls!}
                      audioSrc={post.audioUrl!}
                      initialMuted={audioStates[index]?.isMuted ?? true}
                      initialPlaying={audioStates[index]?.isPlaying ?? false}
                    />
                  )}
                </div>
                {/* 🔹 UserInfo có animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    userInfoStates[index]
                      ? "w-[500px] translate-x-0"
                      : "w-0 translate-x-full"
                  }`}
                >
                  <Detail postData={post} />
                </div>
              </div>

              {/* 🔹 Truyền toggleUserInfo vào ActionBar */}
              <div className="ms-2 flex flex-col justify-end">
                <ActionBar toggleUserInfo={() => toggleUserInfo(index)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
