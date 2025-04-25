import { RefObject } from "react";
import { cn } from "@/common/utils/utils";
import PostMultiImg from "./image";
import PostVideo from "./video";
import { Post } from "../types";

interface PostContentProps {
  post: Post;
  index: number;
  videoRefs: RefObject<(HTMLDivElement | null)[]>;
  audioStates: Record<number, { isPlaying: boolean; isMuted: boolean }>;
  isVisible: boolean;
}

const PostContent = ({
  post,
  index,
  videoRefs,
  audioStates,
  isVisible,
}: PostContentProps) => {
  return (
    <div
      className={cn(
        "w-full md:w-3/5 h-[50vh] md:h-[78vh] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <div ref={(el) => videoRefs.current && (videoRefs.current[index] = el)} className="h-full">
        {post.postType === "VIDEO" ? (
          <PostVideo
            videoSrc={post.videoUrl}
            initialMuted={audioStates[index]?.isMuted ?? true}
            initialPlaying={audioStates[index]?.isPlaying ?? false}
          />
        ) : (
          <PostMultiImg
            images={post.imageUrls}
            audioSrc={post.audioUrl}
            initialMuted={audioStates[index]?.isMuted ?? true}
            initialPlaying={audioStates[index]?.isPlaying ?? false}
          />
        )}
      </div>
    </div>
  );
};

export default PostContent;