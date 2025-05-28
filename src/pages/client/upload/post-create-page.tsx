import { useState, useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/common/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PostContent from "../home/item/post-content";
import PostHeader from "../home/item/post-header";
import PostComments from "../home/item/post-comments";
import PostActions from "../home/item/post-actions";
import { Post, Comment } from "../home/types";
import { cn } from "@/common/utils/utils";
import VideoThumbnailSelector from "@/components/dialog/video-thumbnail-selector-diglog";
import { SoundSelector } from "./sound-selector";
import VideoAudioEditDialog from "@/components/dialog/video-audio-edit-dialog";
import HashtagSearch from "@/components/search/hashtag-search";
import Slide from "@/components/slide/slide";

// Cloudinary upload widget script
declare global {
  interface Window {
    cloudinary: any;
  }
}

// Form schema for validation
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  visibility: z.enum(["public", "friends", "private"], {
    required_error: "Visibility is required",
  }),
});

const samplePostData: Post = {
  userId: "user1",
  postId: "post1",
  createdAt: "2025-04-01T10:00:00Z",
  userAvatar:
    "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
  userDisplayName: "DisplayName",
  userName: "UserName",
  postType: "VIDEO",
  videoUrl:
    "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748142/videos/ku2ammahemr2k4iiezza.mp4",
  imageUrls: [],
  title:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  tags: ["w/n", "3107", "idt042019"],
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
      displayName: "User 1",
      createdAt: "2025-04-01T10:05:00Z",
      replies: [
        {
          commentId: "reply1",
          userAvatar:
            "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
          content: "Thanks!",
          displayName: "User 9",
          createdAt: "2025-04-01T10:06:00Z",
        },
      ],
    },
  ],
};

export default function PostCreator() {
  const { toast } = useToast();
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [coverTime, setCoverTime] = useState<number>(0);
  const [showSlider, setShowSlider] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const typePost = params.get("type");
  const img = params.get("img");
  const vid = params.get("vid");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const [post, setPost] = useState<Post>(samplePostData);
  const [audioState] = useState({
    isPlaying: false,
    isMuted: false,
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentsHint, setShowCommentsHint] = useState(true);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: samplePostData.title,
      description: samplePostData.description,
      visibility: "public",
    },
  });

  // Watch form values
  const title = form.watch("title");
  const description = form.watch("description");

  // Update post preview whenever title, description, or hashtags change
  useEffect(() => {
    setPost((prev) => ({
      ...prev,
      title,
      description,
      tags: selectedHashtags,
    }));
  }, [title, description, selectedHashtags]);

  useEffect(() => {
    try {
      setComments(samplePostData.comments);
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response?.data?.message || "Có lỗi xảy ra!",
      });
    }
  }, [toast]);

  useEffect(() => {
    if (!contentRef.current || !commentsRef.current) return;

    const handleScroll = () => {
      const scrollTop = contentRef.current!.scrollTop;
      const commentsPosition = commentsRef.current!.offsetTop;
      setShowCommentsHint(scrollTop <= commentsPosition - 300);
    };

    const contentEl = contentRef.current;
    contentEl?.addEventListener("scroll", handleScroll);
    return () => contentEl?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToComments = () => {
    if (contentRef.current && commentsRef.current) {
      contentRef.current.scrollTo({
        top: commentsRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !post) return;

    const newCommentObj: Comment = {
      commentId: `cmt-${Date.now()}`,
      userAvatar: samplePostData.userAvatar,
      content: newComment,
      displayName: "Current User",
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments((prev) => [...prev, newCommentObj]);
    setNewComment("");
    toast({ description: "Đã thêm bình luận!" });
  };

  const addEmoji = (emoji: string) => setNewComment((prev) => prev + emoji);

  // Validate post type and initialize media
  useEffect(() => {
    if (typePost !== "img" && typePost !== "vid") {
      toast({
        variant: "destructive",
        description: "Invalid post type. Only IMG or VID are allowed.",
      });
      navigate("/client/home", { replace: true });
      return;
    }

    if (typePost === "img" && img) {
      setMediaType("image");
      setImages(img.split(";"));
      setPost((prev) => ({
        ...prev,
        postType: "IMG",
        imageUrls: img.split(";"),
        videoUrl: "",
      }));
    } else if (typePost === "vid" && vid) {
      setMediaType("video");
      setVideoUrl(vid);
      setPost((prev) => ({
        ...prev,
        postType: "VIDEO",
        videoUrl:
          "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748142/videos/" +
          vid,
        imageUrls: [],
      }));
    }
  }, [typePost, img, vid, toast, navigate]);

  return (
    <div className="flex h-screen max-h-screen">
      <div className="w-full overflow-y-auto p-12">
        <div className=" bg-white dark:bg-zinc-800 rounded-3xl p-6">
          <div className="flex space-x-8">
            {/* Main Form Section */}
            <div className="flex-1 w-full ">
              <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                Create Post
              </h3>
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your title"
                            className="rounded-xl border-gray-300 dark:border-zinc-600"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your description"
                            className="resize-none h-52 rounded-xl border-gray-300 dark:border-zinc-600"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <HashtagSearch
                      onChange={(selectedHashtags) => {
                        setSelectedHashtags(
                          selectedHashtags.map(
                            (h: { id: number; name: string }) => h.name
                          )
                        );
                      }}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">
                          Who can see this post?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-gray-300 dark:border-zinc-600">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="friends">Friends</SelectItem>
                            <SelectItem value="private">Only Me</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div>
           
              {mediaType === "image" && images.length > 0 && (
                <div className="flex-1 w-full">
                  <ScrollArea className="w-full max-h-96 rounded-xl border border-gray-200 dark:border-zinc-700 pb-4">
                    <div className="grid grid-cols-4 gap-2 mt-3 px-2">
                      {images.map((url, index) => (
                        <div key={url} className="relative">
                          <img
                            src={`https://res.cloudinary.com/dwv76nhoy/image/upload/${url}`}
                            alt={`Image ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-xl cursor-pointer"
                            onClick={() => {
                              setShowSlider(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <SoundSelector
                    setPostId={function (id: number | null): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>
              )}
              {mediaType === "video" && videoUrl && (
                <div className="flex-1 w-full">
                  <div className="mt-4">
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      controls
                      className="w-full h-64 rounded-xl"
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          setVideoDuration(videoRef.current.duration);
                        }
                      }}
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      Video duration: {videoDuration.toFixed(2)} seconds
                    </div>
                  </div>
                  <div className="flex-1 w-full mt-4">
                    <div className="w-full">
                      <VideoThumbnailSelector
                        videoUrl="https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748142/videos/ku2ammahemr2k4iiezza.mp4"
                        onSelect={(seconds) =>
                          console.log("Ảnh bìa tại:", seconds, "giây")
                        }
                      >
                        <Button className="w-full bg-zinc-900 hover:bg-zinc-700">
                          Chọn ảnh thumbnail
                        </Button>
                      </VideoThumbnailSelector>
                    </div>

                    <div className="w-full mt-4">
                      <VideoAudioEditDialog />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 w-full flex justify-end">
            <div className="space-x-3">
              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-zinc-950 hover:bg-zinc-800"
                onClick={form.handleSubmit(() => {
                  toast({ description: "Post created successfully!" });
                })}
              >
                Create Post
              </Button>
              <Button
                type="button"
                size="lg"
                className="rounded-full border-2 bg-zinc-50 text-black hover:bg-zinc-100"
                onClick={() => navigate("/client/home")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Post Preview */}
        <div className="mt-8">
          <div className="flex-1 h-full w-full">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              Post Preview
            </h3>
            <p>Your article should look like the version below.</p>
            <div className="w-full mt-5 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden relative flex items-center justify-center">
              <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-12">
                <PostContent
                  post={post}
                  index={0}
                  videoRefs={
                    videoRef as React.RefObject<(HTMLDivElement | null)[]>
                  }
                  audioStates={{ 0: audioState }}
                  isVisible={true}
                />
                <div
                  className={cn(
                    "w-full md:w-2/5 h-[50vh] md:h-[78vh] flex flex-col transition-all duration-1000 delay-300 transform translate-x-0 opacity-100"
                  )}
                  data-scroll-ignore
                >
                  <ScrollArea className="flex-1 pr-4" ref={contentRef}>
                    <PostHeader post={post} />
                    <PostComments
                      post={{ ...post, comments }}
                      commentsByPost={{ [post.postId]: comments }}
                      contentRefs={{
                        current: { [post.postId]: contentRef.current },
                      }}
                      commentsRefs={{
                        current: { [post.postId]: commentsRef.current },
                      }}
                      showCommentsHint={showCommentsHint}
                      scrollToComments={scrollToComments}
                      newComment={newComment}
                      activePostId={activePostId}
                      setActivePostId={setActivePostId}
                      setNewComment={setNewComment}
                      handleAddComment={handleAddComment}
                      addEmoji={addEmoji}
                    />
                  </ScrollArea>
                  <PostActions
                    post={post}
                    commentsByPost={{ [post.postId]: comments }}
                    scrollToComments={scrollToComments}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Slide
          images={images}
          showSlider={showSlider}
          setShowSlider={setShowSlider}
        />
      </div>
    </div>
  );
}
