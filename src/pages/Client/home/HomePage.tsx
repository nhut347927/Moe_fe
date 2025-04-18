import { useState, useRef, useEffect } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { getAxiosInstance } from "../../../services/axios/axiosInstance";
import { samplePostData } from "./data";
import { Post, Comment, PostType } from "./types";
import PostItem from "./item/PostItem";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Blend,
  Clock,
  Earth,
  Grid3X3,
  Layout,
  LayoutGrid,
  Newspaper,
  Proportions,
  Rows,
  User,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [commentsByPost, setCommentsByPost] = useState<
    Record<string, Comment[]>
  >({});
  const [newComment, setNewComment] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showCommentsHint, setShowCommentsHint] = useState(true);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const commentsRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [postType, setPostType] = useState<PostType>("feed");
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // ✅
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(true); // Trạng thái để kiểm tra chế độ sắp xếp
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowDetails(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPostData(samplePostData);
        const initialComments = samplePostData.reduce((acc, post) => {
          acc[post.postId] = post.comments;
          return acc;
        }, {} as Record<string, Comment[]>);
        setCommentsByPost(initialComments);
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

      let el: HTMLElement | null = targetElement;
      while (el && el !== videoContainer) {
        if (el.hasAttribute("data-scroll-ignore")) return;
        el = el.parentElement;
      }

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
        "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      content: newComment,
      displayName: "Current User",
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

  const allTags: string[] = [
    "Chill",
    "Sad",
    "Happy",
    "Love",
    "Rap",
    "Indie",
    "EDM",
    "Ballad",
    "Pop",
    "Lo-fi",
    "Workout",
    "Jazz",
    "Acoustic",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    // TODO: Gọi hàm lọc bài viết dựa trên `selectedTags` nếu cần
  };

  // Hàm lọc các tag theo từ khóa tìm kiếm
  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Nếu chế độ sắp xếp được bật, ưu tiên các tag đã chọn lên trên, sau đó sắp xếp các tag còn lại theo tên
  const tagsToDisplay = isSorted
    ? [
        // Đưa các tag đã chọn lên trên
        ...filteredTags.filter((tag) => selectedTags.includes(tag)),
        // Sau đó là các tag chưa chọn, sắp xếp theo tên
        ...filteredTags.filter((tag) => !selectedTags.includes(tag)).sort(),
      ]
    : filteredTags; // Nếu không sắp xếp, hiển thị theo thứ tự ban đầu

  return (
    <div className="max-h-screen p-2 relative">
      <div className="absolute z-30 w-full">
        <div className="flex flex-wrap gap-2 justify-center">
          <Tabs
            value={postType}
            onValueChange={(value) => setPostType(value as PostType)}
            className="w-auto"
          >
            <TabsList className="bg-muted/70 shadow-2xl">
              <TabsTrigger
                value="feed"
                className="data-[state=active]:bg-background rounded-xl"
              >
                <Earth className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Feed
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-background rounded-xl"
              >
                <User className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Personal
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="friends"
                className="data-[state=active]:bg-background rounded-xl"
              >
                <Users className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Friends
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            className="px-4 flex items-center gap-1 rounded-xl"
          >
            <Proportions className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:inline-block">
              27/33
            </span>
          </Button>
          {postType === "personal" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="px-4 flex items-center gap-1 rounded-xl"
                >
                  <Blend className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">
                    Filter tags
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="overflow-hidden bg-muted/90 rounded-3xl mt-2"
                align="start"
              >
                <ScrollArea
                  className="w-[300px] h-[300px] p-4 pt-0 space-y-3"
                  data-scroll-ignore
                >
                  {/* Tiêu đề + mô tả */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                      Filter by Tags
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Select one or more tags to personalize the feed.
                    </p>
                  </div>

                  {/* Ô tìm kiếm */}
                  <div className="relative p-1">
                    <input
                      type="text"
                      placeholder="Search tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-800 dark:text-zinc-200"
                    />
                  </div>

                  {/* Chế độ sắp xếp */}
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-300 mr-2">
                      Sort Tags
                    </span>
                    <button
                      onClick={() => setIsSorted(!isSorted)}
                      className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-zinc-700 dark:text-zinc-200 rounded-full border border-zinc-300 dark:border-zinc-600 transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                      <span className="text-base">↕</span>
                      {isSorted ? "Unsort" : "Sort"}
                    </button>
                  </div>

                  {/* Các Tag */}
                  <div className="flex flex-wrap gap-2 mb-9">
                    {tagsToDisplay.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-all duration-200 border whitespace-nowrap
                  ${
                    isSelected
                      ? "bg-black text-white border-zinc-900 dark:bg-white dark:text-black dark:border-zinc-600"
                      : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:border-zinc-600"
                  }
                `}
                        >
                          #{tag}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div
        id="video-container"
        className="h-full rounded-3xl overflow-y-auto overflow-x-hidden scroll-but-hidden"
      >
        {postData.map((post, index) => (
          <PostItem
            key={post.postId}
            post={post}
            index={index}
            videoRefs={videoRefs}
            audioStates={audioStates}
            isVisible={isVisible}
            showDetails={showDetails}
            commentsByPost={commentsByPost}
            contentRefs={contentRefs}
            commentsRefs={commentsRefs}
            showCommentsHint={showCommentsHint}
            scrollToComments={scrollToComments}
            newComment={newComment}
            activePostId={activePostId}
            setActivePostId={setActivePostId}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            addEmoji={addEmoji}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
