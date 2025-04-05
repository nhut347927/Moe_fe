"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Heart,
  Link2,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Music,
  Play,
  Share2,
  UserPlus,
} from "lucide-react";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");

  // Mock data
  const user = {
    name: "Nguyễn Minh Anh",
    username: "@minhanh",
    bio: "Nhiếp ảnh gia | Nhà sáng tạo nội dung | Yêu âm nhạc và du lịch ✈️",
    location: "Hà Nội, Việt Nam",
    joinedDate: "Tháng 3, 2020",
    website: "minhanh.com",
    followers: 2453,
    following: 568,
    posts: [
      {
        id: 1,
        title: "Hoàng hôn tại Hồ Tây",
        likes: 234,
        comments: 45,
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 2,
        title: "Cafe cuối tuần",
        likes: 187,
        comments: 32,
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 3,
        title: "Chuyến đi Đà Nẵng",
        likes: 342,
        comments: 67,
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 4,
        title: "Sapa mùa đông",
        likes: 421,
        comments: 89,
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 5,
        title: "Phố cổ Hội An",
        likes: 276,
        comments: 54,
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 6,
        title: "Bình minh ở vịnh Hạ Long",
        likes: 389,
        comments: 71,
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    playlists: [
      {
        id: 1,
        title: "Acoustic Chill",
        tracks: 24,
        duration: "1h 45m",
        cover: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 2,
        title: "Indie Vibes",
        tracks: 18,
        duration: "1h 12m",
        cover: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 3,
        title: "Coffee House",
        tracks: 32,
        duration: "2h 10m",
        cover: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 4,
        title: "Road Trip",
        tracks: 45,
        duration: "3h 05m",
        cover: "/placeholder.svg?height=300&width=300",
      },
    ],
  };

  return (
    <div className="max-h-screen p-2">
      <div className="h-full rounded-xl overflow-y-auto overflow-x-hidden scroll-but-hidden">
        <div className="max-w-6xl mx-auto mb-32">
          {/* Banner and Profile Info */}
          <div className="relative">
            {/* Banner */}
            <div className="h-64 md:h-80 w-full overflow-hidden rounded-b-xl">
              <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>

            {/* Profile Info Card */}
            <div className="relative px-4 md:px-8 -mt-24 md:-mt-32">
              <div className="bg-background rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0 -mt-16 md:-mt-24">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background rounded-full shadow-md">
                      <AvatarImage
                        src="/placeholder.svg?height=160&width=160"
                        alt={user.name}
                      />
                      <AvatarFallback className="text-4xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                          {user.name}
                        </h1>
                        <p className="text-muted-foreground">{user.username}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button className="rounded-full gap-2">
                          <UserPlus className="h-4 w-4" />
                          <span>Theo dõi</span>
                        </Button>
                        <Button variant="outline" className="rounded-full">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="rounded-full">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-foreground/90 max-w-2xl">{user.bio}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Link2 className="h-4 w-4" />
                        <a
                          href={`https://${user.website}`}
                          className="text-primary hover:underline"
                        >
                          {user.website}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>Tham gia {user.joinedDate}</span>
                      </div>
                    </div>

                    {/* Followers */}
                    <div className="flex gap-4">
                      <button className="hover:underline">
                        <span className="font-semibold">
                          {user.followers.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          Người theo dõi
                        </span>
                      </button>
                      <button className="hover:underline">
                        <span className="font-semibold">
                          {user.following.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          Đang theo dõi
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="mt-6 px-4 md:px-8">
            <Tabs
              defaultValue="posts"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b">
                <TabsList className="h-12 bg-transparent w-full justify-start  gap-2 px-0">
                  <TabsTrigger
                    value="posts"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4"
                  >
                    Bài đăng
                  </TabsTrigger>
                  <TabsTrigger
                    value="playlists"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4"
                  >
                    Playlist
                  </TabsTrigger>
                  <TabsTrigger
                    value="liked"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4"
                  >
                    Đã thích
                  </TabsTrigger>
                  <TabsTrigger
                    value="about"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4"
                  >
                    Giới thiệu
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Posts Tab */}
              <TabsContent value="posts" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.posts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden group hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <h3 className="text-white font-medium text-lg">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-rose-500" />
                              <span className="text-sm">{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">{post.comments}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Playlists Tab */}
              <TabsContent value="playlists" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {user.playlists.map((playlist) => (
                    <Card
                      key={playlist.id}
                      className="overflow-hidden group hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={playlist.cover || "/placeholder.svg"}
                          alt={playlist.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            size="icon"
                            className="rounded-full h-12 w-12 bg-primary/90 hover:bg-primary"
                          >
                            <Play className="h-6 w-6 fill-white text-white" />
                          </Button>
                        </div>
                        <Badge className="absolute top-3 right-3 bg-black/60 hover:bg-black/60">
                          <Music className="h-3 w-3 mr-1" />
                          {playlist.tracks} bài
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {playlist.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {playlist.duration}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Liked Tab */}
              <TabsContent value="liked" className="mt-6">
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  <p>Chưa có nội dung được thích</p>
                </div>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="mt-6">
                <div className="max-w-2xl">
                  <h2 className="text-xl font-semibold mb-4">Giới thiệu</h2>
                  <p className="text-muted-foreground mb-6">
                    Xin chào! Tôi là Nguyễn Minh Anh, một nhiếp ảnh gia và nhà
                    sáng tạo nội dung đến từ Hà Nội. Tôi đam mê khám phá những
                    địa điểm mới và chia sẻ những khoảnh khắc đẹp qua ống kính
                    của mình. Âm nhạc là một phần không thể thiếu trong cuộc
                    sống của tôi, và tôi thường tạo các playlist để phù hợp với
                    từng tâm trạng và hoạt động.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">Sở thích</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">Nhiếp ảnh</Badge>
                    <Badge variant="secondary">Du lịch</Badge>
                    <Badge variant="secondary">Âm nhạc</Badge>
                    <Badge variant="secondary">Đọc sách</Badge>
                    <Badge variant="secondary">Cafe</Badge>
                    <Badge variant="secondary">Nấu ăn</Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">Liên hệ</h3>
                  <p className="text-muted-foreground">
                    Để hợp tác hoặc trao đổi, vui lòng liên hệ qua email:
                    minhanh@example.com
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
