import { RefObject } from "react";
import { cn } from "@/common/utils/utils";
import PostHeader from "./post-header";
import PostContent from "./post-content";
import PostComments from "./post-comments";
import PostActions from "./post-actions";
import { Post, Comment } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PostItemProps {
  post: Post;
  index: number;
  videoRefs: RefObject<(HTMLDivElement | null)[]>;
  audioStates: Record<number, { isPlaying: boolean; isMuted: boolean }>;
  isVisible: boolean;
  showDetails: boolean;
  commentsByPost: Record<string, Comment[]>;
  contentRefs: RefObject<Record<string, HTMLDivElement | null>>;
  commentsRefs: RefObject<Record<string, HTMLDivElement | null>>;
  showCommentsHint: boolean;
  scrollToComments: (postId: string) => void;
  newComment: string;
  activePostId: string | null;
  setActivePostId: (postId: string | null) => void;
  setNewComment: (value: string) => void;
  handleAddComment: (postId: string) => void;
  addEmoji: (emoji: string) => void;
}

const PostItem = ({
  post,
  index,
  videoRefs,
  audioStates,
  isVisible,
  showDetails,
  commentsByPost,
  contentRefs,
  commentsRefs,
  showCommentsHint,
  scrollToComments,
  newComment,
  activePostId,
  setActivePostId,
  setNewComment,
  handleAddComment,
  addEmoji,
}: PostItemProps) => {
  return (
    <div
      key={post.postId}
      className="w-full max-h-screen h-screen flex items-center justify-center "
    >
      <div className="flex h-full w-full">
        <div className="w-full m-14 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden relative flex items-center justify-center">
          <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-12">
            <PostContent
              post={post}
              index={index}
              videoRefs={videoRefs}
              audioStates={audioStates}
              isVisible={isVisible}
            />
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
                ref={(el) => {
                  if (contentRefs.current) {
                    contentRefs.current[post.postId] = el;
                  }
                }}
              >
                <PostHeader post={post} />
                <PostComments
                  post={post}
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
              </ScrollArea>
              <PostActions
                post={post}
                commentsByPost={commentsByPost}
                scrollToComments={scrollToComments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
