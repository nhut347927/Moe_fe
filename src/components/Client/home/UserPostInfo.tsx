import React, { useState } from "react";
import {
  Music,
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

type PostProps = {
  postData: Post;
};

const PostComponent: React.FC<PostProps> = ({ postData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="relative border-2 rounded-2xl w-[432px] max-h-[85vh] ">
        <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden scroll-but-hidden">
          {/* User Information Section */}
          <div className="flex items-center space-x-4 mb-4 px-5 pt-5">
            <div className="w-20">
              <Avatar className="h-12 w-12">
                <AvatarImage src={postData?.avatar} className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg font-semibold w-40 truncate text-ellipsis">
                  {postData?.userName || "Unknown User"}
                </span>
                <div className="flex">
                  <Button className="ms-auto h-8 w-20 pb-1.5 rounded-full">
                    Follow
                  </Button>
                  <Button className="ms-2 h-8 w-20 pb-1.5 rounded-full">
                    Chat
                  </Button>
                </div>
              </div>
              <div className="text-sm">
                <span>{postData?.postCount || "0 bài viết"}</span> |{" "}
                <span>{postData?.followers || "0"} người theo dõi</span>
              </div>
            </div>
          </div>
          {/* User Bio */}
          <div className="text-sm mb-3 px-5">
            {/* Chỉ hiển thị 2 dòng khi chưa mở rộng */}
            <p className={`break-words ${!isExpanded ? "line-clamp-2" : ""}`}>
              {postData?.bio || ""}
            </p>

            {/* Nút "Xem thêm" */}
            {!isExpanded && postData?.bio && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-zinc-500 hover:underline cursor-pointer text-sm"
              >
                Xem thêm
              </button>
            )}

            {/* Nút "Thu gọn" khi bio đã mở rộng */}
            {isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-zinc-500 hover:underline cursor-pointer text-sm"
              >
                Thu gọn
              </button>
            )}
          </div>
          {/* Interactions (like, comment, etc.) */}
          <div className="flex items-center mb-4 px-5">
            <Heart className="w-7 h-7 me-4 cursor-pointer" />
            <MessageCircle className="w-7 h-7 cursor-pointer" />
            <div className="flex items-center ms-auto">
              <Music className="w-5 h-5 me-1" />
              <div className="text-sm truncate text-ellipsis ms-auto max-w-[220px] me-3">
                {postData?.favoriteSong || "Một bài hát mà bạn yêu thích"}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={postData?.songImage || "default_song_image_url"}
                  className="object-cover"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="px-5 pb-2">
            <p className="text-sm">{postData?.likes || "0"} lượt thích</p>
            <p className="text-sm underline">
              Xem tất cả {postData?.commentsCount || "0"} bình luận
            </p>
          </div>
          {/* Comments/Content Section with Scrollable Area */}
          <div className="mb-4">
            <ScrollArea className="overflow-y-auto h-[45vh]">
              <div className="space-y-2 p-5 pb-16">
                {postData?.comments && postData.comments.length > 0 ? (
                  postData.comments.map((comment, i) => (
                    <div key={i} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={comment.avatar || "default_avatar_url"}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {comment.initials || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none break-all">
                            {comment.userName || "Anonymous"}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm opacity-95 break-all">
                          {comment.content || "No comment content provided."}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {comment.time || "Just now"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-center">Không có bình luận nào.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Comment Input Form */}
        <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-black pt-3 rounded-b-2xl">
          <form className="flex items-center space-x-2 p-5 pt-0">
            <Input className="flex-grow rounded-full" placeholder="Thêm bình luận..." />
            <Send className="h-5 w-5 hover:text-zinc-500" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
