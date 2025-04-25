import { RefObject } from "react";
import { ChevronDown, Heart, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Post, Comment, commonEmojis } from "../types";
import { getTimeAgo } from "@/common/utils/utils";

interface PostCommentsProps {
  post: Post;
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

const PostComments = ({
  post,
  commentsByPost,
  //contentRefs,
  commentsRefs,
  showCommentsHint,
  scrollToComments,
  newComment,
  activePostId,
  setActivePostId,
  setNewComment,
  handleAddComment,
  addEmoji,
}: PostCommentsProps) => {
  return (
    <div className="space-y-6 pb-32">
      {showCommentsHint && commentsByPost[post.postId]?.length > 0 && (
        <div
          className="flex flex-col items-center justify-center py-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          onClick={() => scrollToComments(post.postId)}
        >
          <p className="text-sm font-medium">
            View {commentsByPost[post.postId].length} comments
          </p>
          <ChevronDown className="h-5 w-5 mt-1 animate-bounce" />
        </div>
      )}
      <div
        ref={(el) => {
          if (commentsRefs.current) {
            commentsRefs.current[post.postId] = el;
          }
        }}
        className="pt-10 mt-10 border-t"
      >
        <h3 className="font-medium mb-6">
          Comments ({commentsByPost[post.postId]?.length || 0})
        </h3>
        <div className="space-y-6">
          {commentsByPost[post.postId]?.length > 0 ? (
            commentsByPost[post.postId].map((comment) => (
              <div key={comment.commentId} className="flex gap-3">
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
                      {getTimeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex">
                    <Heart className="h-4 w-4 me-2" /> {" 99"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
        <div className="transition-all duration-500 ease-in-out mt-8 sticky bottom-0 backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 border-t transform translate-y-0">
          <div className="flex gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Smile className="h-5 w-5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="start">
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
              value={activePostId === post.postId ? newComment : ""}
              onChange={(e) => setNewComment(e.target.value)}
              onFocus={() => setActivePostId(post.postId)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddComment(post.postId);
              }}
            />
            <Button
              onClick={() => handleAddComment(post.postId)}
              disabled={!newComment.trim()}
              className="px-4 bg-zinc-50"
            >
              <Send className="h-4 w-4 text-zinc-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
