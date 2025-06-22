"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Description } from "@radix-ui/react-toast";
import {
  ArrowLeft,
  Bell,
  Edit,
  Heart,
  Home,
  Mail,
  MessageCircle,
  Settings,
  SquarePlus,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const mockUser = {
  avatarUrl: "https://i.pravatar.cc/150?img=11",
  displayName: "Bạn của Âm Nhạc",
  username: "amnhaclover",
  description: "Đây là mô tả",
  followers: 1234,
  following: 321,
  likes: 9876,
  posts: [
    {
      id: "1",
      thumbnail: "https://source.unsplash.com/random/400x400?guitar",
      type: "image",
    },
    {
      id: "2",
      thumbnail:
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      type: "video",
    },
    {
      id: "3",
      thumbnail: "https://source.unsplash.com/random/400x400?music",
      type: "image",
    },
  ],
};

export function ProfilePage() {
  const [user] = useState(mockUser);
  const iconMap = {
    mail: <Mail className="w-4 h-4" />,
    heart: <Heart className="w-4 h-4 " />,
    comment: <MessageCircle className="w-4 h-4" />,
  };
  type Notification = {
    id: string;
    message: string;
    icon: "mail" | "heart" | "comment"; // kiểu định danh icon
  };

  const notifications: Notification[] = [
    { id: "1", message: "Bạn có 1 tin nhắn mới", icon: "mail" },
    { id: "2", message: "Ai đó đã thích bài viết của bạn", icon: "heart" },
    {
      id: "3",
      message: "Có người bình luận bài viết của bạn",
      icon: "comment",
    },
  ];
  return (
    <div className="relative flex-1 flex justify-center">
      <div className="absolute w-full p-2 z-10 flex justify-between">
        <Link to="/" className="text-zinc-700 dark:text-zinc-200">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Home className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Button
                variant="outline"
                className="flex justify-center items-center p-2.5 rounded-full"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-2">
              <div className="px-3 py-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-100">
                Thông báo
              </div>

              <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors duration-150 cursor-pointer"
                  >
                    <div className="mt-0.5">{iconMap[n.icon]}</div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-tight">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <div className="text-center">
                  <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline transition-colors">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            className="flex justify-center items-center p-2.5 rounded-full"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 max-h-full h-full max-w-lg overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-lg mx-auto px-2 pb-96">
          {/* Tên hiển thị ở giữa */}
          <h2 className="text-xl font-bold text-center mt-4 text-zinc-900 dark:text-zinc-100">
            {user.displayName}
          </h2>

          {/* Ảnh avatar */}
          <div className="flex justify-center my-4">
            <Avatar className="w-28 h-28 border-4 border-zinc-300 dark:border-zinc-700">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* username */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-2">
            @{user.username}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 text-center mb-4 text-sm text-zinc-700 dark:text-zinc-200">
            <div>
              <p className="font-semibold">{user.following}</p>
              <p>Đã follow</p>
            </div>
            <div>
              <p className="font-semibold">{user.followers}</p>
              <p>Follower</p>
            </div>
            <div>
              <p className="font-semibold">{user.likes}</p>
              <p>Lượt thích</p>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-center gap-2 mb-2">
            <Button
              variant="outline"
              className="rounded-full px-6 text-sm"
              onClick={() => alert("Chuyển đến trang chỉnh sửa hồ sơ")}
            >
              <Edit />
              Sửa hồ sơ
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 text-sm"
              onClick={() => alert("Chuyển đến trang chỉnh sửa hồ sơ")}
            >
              <SquarePlus />
              Tạo bài viết
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <p>{user.description}</p>
          </div>
          {/* Bài đăng */}
          <div className="grid grid-cols-3 gap-2">
            {user.posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-xl"
              >
                {post.type === "video" ? (
                  <video
                    src={post.thumbnail}
                    className="w-full h-full object-cover"
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={post.thumbnail}
                    className="w-full h-full object-cover"
                    alt="post"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
