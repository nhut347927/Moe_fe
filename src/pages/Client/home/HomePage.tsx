import { useState, useRef, useEffect } from "react";
import PostMultiImg from "./Image";
import PostVideo from "./Video";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  ChevronDown,
  Smile,
} from "lucide-react";
import { cn, getTimeAgo } from "@/common/utils/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/common/hooks/use-toast";
import { getAxiosInstance } from "../../../services/axios/axiosInstance";
import { Link } from "react-router-dom";

// Định nghĩa types
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
  userName: string;
  postType: "VIDEO" | "IMG";
  videoUrl: string;
  imageUrls: string[];
  title: string;
  description: string;
  likeCount: string;
  commentCount: string;
  playlistCount: string;
  audioUrl: string;
  audioOwnerAvatar: string;
  audioOwnerName: string;
  audioId: string;
  comments: Comment[];
};

// Dữ liệu mẫu (đã sửa postId trùng lặp)
const samplePostData: Post[] = [
  {
    userId: "user1",
    postId: "post1",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748142/videos/ku2ammahemr2k4iiezza.mp4",
    imageUrls: [],
    title: "A cool video post!",
    description: "Cái này là một video rất hay!",
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
  {
    userId: "user2",
    postId: "post2",
    createdAt: "2025-04-02T15:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "Jane Smith",
    userName: "johndoe",
    postType: "IMG",
    videoUrl: "",
    imageUrls: [
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/images/sikxb1qmpocwuwpbgapc",
      "https://res.cloudinary.com/dwv76nhoy/image/upload/c_crop,g_auto,w_1080/v1739337151/rrspasosi59xmsriilae.png",
      "https://res.cloudinary.com/dwv76nhoy/image/upload/c_crop,g_auto,w_1080/v1739337151/images/sikxb1qmpocwuwpbgapc",
    ],
    title: "Beautiful photos!",
    description: "Check out these amazing pics!",
    likeCount: "85",
    commentCount: "10",
    playlistCount: "3",
    audioUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1741011150/audios/t0m4l8rgcrrtbdbxnanp.mp3",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Music Maker",
    audioId: "audio2",
    comments: [
      {
        commentId: "cmt2",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Love these pics!",
        displayName: "Alex Brown",
        createdAt: "2025-04-02T15:10:00Z",
        replies: [],
      },
    ],
  },
  {
    userId: "user1",
    postId: "post3",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748437/videos/wnz7qmx8ioch6e3zvylv.mp4",
    imageUrls: [],
    title: "A cool video post!",
    description: "Cái này là một video rất hay!",
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
  {
    userId: "user1",
    postId: "post4",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740670978/videos/jjot1n9nnbpkxuin2gcv.mp4",
    imageUrls: [],
    title: "A cool video post!",
    description: "Cái này là một video rất hay!",
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
  {
    userId: "user1",
    postId: "post5",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748142/videos/ku2ammahemr2k4iiezza.mp4",
    imageUrls: [],
    title: "A cool video post!",
    description: "Cái này là một video rất hay!",
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
];

const commonEmojis = [
  "😊",
  "😂",
  "❤️",
  "👍",
  "🔥",
  "✨",
  "🙌",
  "👏",
  "🎉",
  "🤔",
  "😍",
  "🥰",
  "😎",
  "🤩",
  "👀",
  "💯",
  "🙏",
  "💪",
  "👌",
  "😢",
];

const Home = () => {
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndex = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const [audioStates, setAudioStates] = useState<
    Record<number, { isPlaying: boolean; isMuted: boolean }>
  >({});
  const { toast } = useToast();
  const axiosInstance = getAxiosInstance();
  const [postData, setPostData] = useState<Post[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // State cho comments của từng post
  const [commentsByPost, setCommentsByPost] = useState<
    Record<string, Comment[]>
  >({});
  const [newComment, setNewComment] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showCommentsHint, setShowCommentsHint] = useState(true);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const commentsRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowDetails(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uncomment để gọi API thực tế
        // const response = await axiosInstance.get("/post/get-post");
        // setPostData(response.data.data);
        setPostData(samplePostData);

        // Khởi tạo comments cho từng post
        const initialComments = samplePostData.reduce((acc, post) => {
          acc[post.postId] = post.comments;
          return acc;
        }, {} as Record<string, Comment[]>);
        setCommentsByPost(initialComments);

        // Khởi tạo audio states
        const initialAudioStates = samplePostData.reduce((acc, _, index) => {
          acc[index] = { isPlaying: index === 0, isMuted: index !== 0 };
          return acc;
        }, {} as Record<number, { isPlaying: boolean; isMuted: boolean }>);
        setAudioStates(initialAudioStates);
      } catch (error: any) {
        toast({
          variant: "destructive",
          description: error.response?.data?.message || "An error occurred!",
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScrollComments = (postId: string) => {
      const contentRef = contentRefs.current[postId];
      const commentsRef = commentsRefs.current[postId];
      if (!contentRef || !commentsRef) return;

      const { scrollTop } = contentRef;
      const commentsPosition = commentsRef.offsetTop;

      if (scrollTop > commentsPosition - 300) {
        setShowCommentInput(true);
        setShowCommentsHint(false);
      } else {
        setShowCommentInput(false);
        setShowCommentsHint(true);
      }
    };

    Object.keys(contentRefs.current).forEach((postId) => {
      const contentElement = contentRefs.current[postId];
      if (contentElement) {
        contentElement.addEventListener("scroll", () =>
          handleScrollComments(postId)
        );
      }
    });

    return () => {
      Object.keys(contentRefs.current).forEach((postId) => {
        const contentElement = contentRefs.current[postId];
        if (contentElement) {
          contentElement.removeEventListener("scroll", () =>
            handleScrollComments(postId)
          );
        }
      });
    };
  }, [postData]);

  const throttle = (func: Function, wait: number) => {
    let lastTime = 0;
    return function (...args: any[]) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        return func(...args);
      }
    };
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const videoContainer = document.getElementById("video-container");
      const targetElement = event.target as HTMLElement;

      // ⛔ Nếu phần tử hoặc cha của nó có data-scroll-ignore thì bỏ qua
      let el: HTMLElement | null = targetElement;
      while (el && el !== videoContainer) {
        if (el.hasAttribute("data-scroll-ignore")) return;
        el = el.parentElement;
      }

      event.preventDefault();

      // Giới hạn số lần gọi hàm xử lý cuộn (throttle)
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
          window.requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          });

          setAudioStates((prev) => {
            const updatedStates = { ...prev };
            Object.keys(updatedStates).forEach((key) => {
              updatedStates[parseInt(key)] = {
                isPlaying: parseInt(key) === newIndex,
                isMuted: parseInt(key) !== newIndex,
              };
            });
            return updatedStates;
          });
        }
      }

      lastScrollTime.current = now;
    };

    // ✅ Throttle ở đây
    const throttledHandleScroll = throttle(handleScroll, 150);

    window.addEventListener("wheel", throttledHandleScroll, { passive: false });
    return () => window.removeEventListener("wheel", throttledHandleScroll);
  }, []);

  const scrollToComments = (postId: string) => {
    const contentRef = contentRefs.current[postId];
    const commentsRef = commentsRefs.current[postId];
    if (contentRef && commentsRef) {
      contentRef.scrollTo({
        top: commentsRef.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      commentId: `cmt-${Date.now()}`,
      userAvatar:
        "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png", // Thay bằng avatar người dùng thực tế
      content: newComment,
      displayName: "Current User", // Thay bằng tên người dùng thực tế
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentObj],
    }));
    setNewComment("");
    toast({ description: "Comment added!" });
  };

  const addEmoji = (emoji: string) => {
    setNewComment((prev) => prev + emoji);
  };

  if (!postData.length) {
    return (
      <div className="text-center py-10">
        Loading posts or no posts available...
      </div>
    );
  }

  return (
    <div className="max-h-screen p-2">
      <div
        id="video-container"
        className="h-full rounded-3xl overflow-y-auto overflow-x-hidden scroll-but-hidden"
      >
        {postData.map((post, index) => (
          <div
            key={post.postId}
            className="w-full max-h-screen h-screen  flex items-center justify-center"
          >
            <div className="flex h-full w-full">
              <div className="w-full m-14 bg-white/50 dark:bg-zinc-800/70 rounded-3xl shadow-2xl overflow-hidden relative flex items-center justify-center">
             
                <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-12">
                  <div
                    className={cn(
                      "w-full md:w-3/5 h-[50vh] md:h-[78vh] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 transform",
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                    )}
                  >
                    <div
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="h-full"
                    >
                      {post.postType === "VIDEO" ? (
                        <PostVideo
                          videoSrc={post.videoUrl}
                          initialMuted={audioStates[index]?.isMuted ?? true}
                          initialPlaying={
                            audioStates[index]?.isPlaying ?? false
                          }
                        />
                      ) : (
                        <PostMultiImg
                          images={post.imageUrls}
                          audioSrc={post.audioUrl}
                          initialMuted={audioStates[index]?.isMuted ?? true}
                          initialPlaying={
                            audioStates[index]?.isPlaying ?? false
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "w-full md:w-2/5 h-[50vh] md:h-[78vh] flex flex-col transition-all duration-1000 delay-300 transform",
                      showDetails
                        ? "translate-x-0 opacity-100"
                        : "translate-x-20 opacity-0"
                    )}
                    data-scroll-ignore
                  >
                    <ScrollArea
                      className="flex-1 pr-4"
                      ref={(el) => (contentRefs.current[post.postId] = el)}
                    >
                      <div className="space-y-6 pb-32">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={post.userAvatar} />
                              <AvatarFallback>
                                {post.userDisplayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="flex items-center space-x-1">
                                <span className="font-semibold text-[15px] text-zinc-800 dark:text-zinc-50">
                                  {post.userDisplayName}
                                </span>
                                <span className="text-zinc-400 text-sm">•</span>
                                <Link
                                  to={"/client/profile"}
                                  className="text-zinc-500 text-sm hover:underline hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-50"
                                >
                                  @{post.userName}
                                </Link>
                              </h3>

                              <p className="text-xs text-muted-foreground">
                                {getTimeAgo(post.createdAt)}
                              </p>
                            </div>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {post.title}
                          </h2>
                        </div>
                        <div className="min-h-[370px]">
                          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            {post.description}
                          </p>
                        </div>
                        {showCommentsHint &&
                          commentsByPost[post.postId]?.length > 0 && (
                            <div
                              className="flex flex-col items-center justify-center py-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                              onClick={() => scrollToComments(post.postId)}
                            >
                              <p className="text-sm font-medium">
                                View {commentsByPost[post.postId].length}{" "}
                                comments
                              </p>
                              <ChevronDown className="h-5 w-5 mt-1 animate-bounce" />
                            </div>
                          )}
                        <div
                          ref={(el) => (commentsRefs.current[post.postId] = el)}
                          className="pt-10 mt-10 border-t"
                        >
                          <h3 className="font-medium mb-6">
                            Comments ({commentsByPost[post.postId]?.length || 0}
                            )
                          </h3>
                          <div className="space-y-6">
                            {commentsByPost[post.postId]?.length > 0 ? (
                              commentsByPost[post.postId].map((comment) => (
                                <div
                                  key={comment.commentId}
                                  className="flex gap-3"
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.userAvatar} />
                                    <AvatarFallback>
                                      {comment.displayName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-sm">
                                        {comment.displayName}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {comment.createdAt}
                                      </span>
                                    </div>
                                    <p className="text-sm mt-1">
                                      {comment.content}
                                    </p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No comments yet. Be the first to comment!
                              </p>
                            )}
                          </div>
                          <div className="transition-all duration-500 ease-in-out mt-8 sticky bottom-0  backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 border-t transform translate-y-0">
                            <div className="flex gap-2 items-center">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                  >
                                    <Smile className="h-5 w-5 text-muted-foreground" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-64 p-2"
                                  align="start"
                                >
                                  <div className="grid grid-cols-5 gap-2">
                                    {commonEmojis.map((emoji, idx) => (
                                      <Button
                                        key={idx}
                                        variant="ghost"
                                        className="h-9 w-9 p-0 text-lg"
                                        onClick={() => addEmoji(emoji)}
                                      >
                                        {emoji}
                                      </Button>
                                    ))}
                                  </div>
                                </PopoverContent>
                              </Popover>
                              <Input
                                placeholder="Add a comment..."
                                value={
                                  activePostId === post.postId ? newComment : ""
                                }
                                onChange={(e) => setNewComment(e.target.value)}
                                onFocus={() => setActivePostId(post.postId)}
                                className="flex-1"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    handleAddComment(post.postId);
                                }}
                              />
                              <Button
                                onClick={() => handleAddComment(post.postId)}
                                disabled={!newComment.trim()}
                                className="px-4 bg-zinc-50 "
                              >
                                <Send className="h-4 w-4 text-zinc-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="border-t pt-4 mt-2 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 px-2"
                          >
                            <Heart className="h-7 w-7" />
                            <span>{post.likeCount}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 px-2"
                            onClick={() => scrollToComments(post.postId)}
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span>
                              {commentsByPost[post.postId]?.length || 0}
                            </span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="px-2">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
