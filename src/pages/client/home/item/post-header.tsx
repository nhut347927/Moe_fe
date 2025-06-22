import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTimeAgo } from "@/common/utils/utils";
import { Post, TabType } from "../types";
import { useState } from "react";
import ActionMenuDialog from "@/components/dialog/action-menu-dialog";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import ReportDialog from "@/components/dialog/report-dialog";
import DeleteConfirmationDialog from "@/components/dialog/delete-confirmation-dialog";

interface PostHeaderProps {
  post: Post;
  onchangeTab?: (tab: TabType) => void;
}

const PostHeader = ({ post, onchangeTab }: PostHeaderProps) => {
  const [expanded, setExpanded] = useState(false);
  function handleDelete(): void | Promise<void> {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9">
          <AvatarImage
            src={`https://res.cloudinary.com/dwv76nhoy/image/upload/w_80,h_80,c_thumb,f_auto,q_auto/${post.userAvatar}`}
          />
          <AvatarFallback>{post.userDisplayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="flex items-center space-x-1">
            <span className="font-semibold text-[15px] text-zinc-800 dark:text-zinc-50">
              {post.userDisplayName}
            </span>
            <span className="text-zinc-400 text-sm">•</span>
            <span
              onClick={() => onchangeTab?.("acc")}
              className="text-zinc-500 text-sm hover:underline hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              @{post.userName}
            </span>
          </h3>
          <p className="text-xs text-muted-foreground">
            {getTimeAgo(post.createdAt)}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button
            onClick={() => onchangeTab?.("acc")}
            variant="outline"
            className="text-xs px-3 h-7"
          >
            Theo dõi
          </Button>
          <Button
            onClick={() => onchangeTab?.("acc")}
            variant="default"
            className="text-xs px-3 h-7"
          >
            Nhắn tin
          </Button>
        </div>
        <ActionMenuDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 hover:bg-muted ms-auto"
            >
              <EllipsisVertical className="h-5 w-5" />
            </Button>
          }
          size="sm"
          className="rounded-xl p-0 overflow-hidden"
        >
          <div className="flex flex-col text-center text-sm">
            <button className="py-3 font-semibold text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ReportDialog trigger={<span>Báo cáo</span>} />
            </button>
            <button className="py-3 font-semibold text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <DeleteConfirmationDialog
                trigger={<span>Xoá bài viết</span>}
                itemName="Bài viết"
                onConfirm={handleDelete}
              />
            </button>
            <button className="py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
              Chia sẻ
            </button>
            <button className="py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
              Lưu
            </button>
            <button className="py-3 font-medium border-t hover:bg-gray-100 dark:hover:bg-gray-800">
              Hủy
            </button>
          </div>
        </ActionMenuDialog>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {post.title}
      </h2>
      <div className="mt-4">
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
        {post?.tags?.map((tag, index) => (
          <span
            key={index}
            className="
        bg-zinc-100/60 dark:bg-zinc-900/70
        text-zinc-700 dark:text-zinc-200
        px-3 py-1 text-sm rounded-full
        shadow-sm ring-1 ring-zinc-300 dark:ring-zinc-700
        backdrop-blur-md
      "
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostHeader;
