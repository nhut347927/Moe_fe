import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
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

const UserInfo: React.FC<PostProps> = ({ postData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-full relative w-[500px] max-w-full flex flex-col overflow-hidden">
        {/* Nội dung cuộn theo chiều dọc */}
        <ScrollArea
          className="h-full w-full"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="border-b mb-3">
            {/* User Information Section */}
            <div className="flex items-center space-x-4 p-5">
              <Avatar className="h-12 w-12">
                <AvatarImage src={postData?.avatar} className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold truncate">
                    {postData?.userName || "Unknown User"}
                  </span>
                  <div className="flex space-x-2">
                    <Button className="h-8 w-20 rounded-full">Follow</Button>
                  </div>
                </div>
                <p className="text-sm opacity-75">nhut379</p>
              </div>
            </div>

            {/* User Bio */}
            <div className="px-5 mb-3">
              <p
                className={`break-words text-sm ${
                  postData?.bio?.length > 100 && !isExpanded
                    ? "line-clamp-2"
                    : ""
                }`}
              >
                {postData?.bio || ""}
              </p>
              {postData?.bio?.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-zinc-500 hover:underline cursor-pointer text-sm"
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            </div>
          </div>

          {/* Comment List */}
          <div className="px-5 mb-4">
            <div className="overflow-y-auto space-y-4">
              {postData?.comments?.length > 0 ? (
                postData.comments.map((comment, i) => (
                  <div key={i} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.avatar || "default_avatar_url"}
                        className="object-cover"
                      />
                      <AvatarFallback>{comment.initials || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none break-all">
                          {comment.userName || "Anonymous"}
                        </p>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                <p className="text-sm text-center text-gray-500">
                  Không có bình luận nào.
                </p>
              )}
              <div>
                <p className="underline text-center">xem thêm</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Comment Input Form */}
        <div className="bg-white dark:bg-black p-3 border-t">
          <form className="flex items-center space-x-2">
            <Input
              className="flex-grow rounded-lg"
              placeholder="Thêm bình luận..."
            />
            <Button variant="ghost">
              Post
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
