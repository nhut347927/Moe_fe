import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { getTimeAgo } from "@/common/utils/utils";
import { Post } from "../types";
import { useState } from "react";

interface PostHeaderProps {
  post: Post;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.userAvatar} />
          <AvatarFallback>{post.userDisplayName.charAt(0)}</AvatarFallback>
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
      <div className="min-h-[270px] mt-4">
        <p
          className={`text-muted-foreground text-base md:text-lg leading-relaxed transition-all duration-300 ${
            !expanded
              ? post.title.length * 2 + post.description.length > 400 &&
                post.title.length * 2 > 60
                ? "line-clamp-8"
                : post.title.length * 2 + post.description.length > 500
                ? "line-clamp-10"
                : ""
              : ""
          }`}
        >
          {post.description}
        </p>

        {(post.title.length * 2 + post.description.length > 400 &&
          post.title.length * 2 > 60) ||
        post.title.length * 2 + post.description.length > 500 ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-zinc-500 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-400 mt-2 transition-colors duration-300"
          >
            {expanded ? "Thu gọn" : "Xem thêm"}
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-zinc-50/70 dark:bg-zinc-950/70 text-zinc-800 dark:text-zinc-50 text-sm px-2 py-1 rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostHeader;
