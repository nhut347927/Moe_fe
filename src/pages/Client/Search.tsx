"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  X,
  Music,
  User,
  ImageIcon,
  Play,
  Mic,
  Filter,
  Clock,
  Heart,
  MessageCircle,
  TrendingUp,
  History,
  UserPlus,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/common/utils/utils";

// Dữ liệu mẫu
const SEARCH_RESULTS = {
  playlists: [
    {
      id: 1,
      title: "Acoustic Chill",
      description: "Những bản acoustic nhẹ nhàng, thư giãn cho ngày mới",
      cover: "/placeholder.svg?height=300&width=300",
      tracks: 24,
      duration: "1h 45m",
      author: "Minh Anh",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      followers: 1245,
      color: "bg-amber-500",
    },
    {
      id: 2,
      title: "Indie Vibes",
      description: "Tuyển tập nhạc indie Việt Nam và quốc tế",
      cover: "/placeholder.svg?height=300&width=300",
      tracks: 18,
      duration: "1h 12m",
      author: "Hải Đăng",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      followers: 876,
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Coffee House",
      description: "Nhạc nhẹ nhàng cho quán cà phê",
      cover: "/placeholder.svg?height=300&width=300",
      tracks: 32,
      duration: "2h 10m",
      author: "Thu Hà",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      followers: 2134,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Road Trip",
      description: "Playlist hoàn hảo cho những chuyến đi xa",
      cover: "/placeholder.svg?height=300&width=300",
      tracks: 45,
      duration: "3h 05m",
      author: "Quang Minh",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      followers: 987,
      color: "bg-purple-500",
    },
    {
      id: 5,
      title: "Lofi Study",
      description: "Tập trung học tập và làm việc với lofi beats",
      cover: "/placeholder.svg?height=300&width=300",
      tracks: 50,
      duration: "3h 30m",
      author: "Thanh Tâm",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      followers: 3456,
      color: "bg-red-500",
    },
  ],
  users: [
    {
      id: 1,
      name: "Nguyễn Minh Anh",
      username: "@minhanh",
      bio: "Nhiếp ảnh gia | Nhà sáng tạo nội dung | Yêu âm nhạc và du lịch ✈️",
      avatar: "/placeholder.svg?height=160&width=160",
      followers: 2453,
      following: 568,
      verified: true,
    },
    {
      id: 2,
      name: "Trần Hải Đăng",
      username: "@haidang",
      bio: "Music producer | DJ | Coffee lover ☕",
      avatar: "/placeholder.svg?height=160&width=160",
      followers: 1876,
      following: 432,
      verified: false,
    },
    {
      id: 3,
      name: "Phạm Thu Hà",
      username: "@thuha",
      bio: "Travel blogger | Foodie | Photographer 📸",
      avatar: "/placeholder.svg?height=160&width=160",
      followers: 5432,
      following: 876,
      verified: true,
    },
    {
      id: 4,
      name: "Lê Quang Minh",
      username: "@quangminh",
      bio: "Musician | Guitar player | Singer 🎸",
      avatar: "/placeholder.svg?height=160&width=160",
      followers: 3245,
      following: 654,
      verified: false,
    },
    {
      id: 5,
      name: "Vũ Thanh Tâm",
      username: "@thanhtam",
      bio: "Digital artist | Illustrator | Anime fan 🎨",
      avatar: "/placeholder.svg?height=160&width=160",
      followers: 4321,
      following: 765,
      verified: true,
    },
  ],
  posts: [
    {
      id: 1,
      title: "Hoàng hôn trên bãi biển Đà Nẵng",
      excerpt: "Khoảnh khắc hoàng hôn tuyệt đẹp trên bãi biển Mỹ Khê, Đà Nẵng.",
      image: "/placeholder.svg?height=400&width=600",
      type: "image",
      category: "Du lịch",
      author: "Minh Anh",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "3 ngày trước",
      likes: 245,
      comments: 32,
      saved: true,
      featured: true,
      color: "bg-amber-500",
    },
    {
      id: 2,
      title: "Cà phê sáng tạo tại Hà Nội",
      excerpt:
        "Khám phá những quán cà phê độc đáo và sáng tạo nhất tại thủ đô.",
      image: "/placeholder.svg?height=300&width=400",
      type: "video",
      duration: "2:45",
      category: "Ẩm thực",
      author: "Hải Đăng",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "1 tuần trước",
      likes: 189,
      comments: 24,
      saved: false,
      featured: false,
      color: "bg-orange-500",
    },
    {
      id: 3,
      title: "Nghệ thuật đường phố Sài Gòn",
      excerpt: "Những tác phẩm nghệ thuật đường phố ấn tượng nhất tại Sài Gòn.",
      image: "/placeholder.svg?height=350&width=500",
      type: "image",
      category: "Nghệ thuật",
      author: "Thu Hà",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2 tuần trước",
      likes: 312,
      comments: 45,
      saved: true,
      featured: true,
      color: "bg-blue-500",
    },
    {
      id: 4,
      title: "Âm nhạc đường phố Hội An",
      excerpt: "Trải nghiệm âm nhạc đường phố tại phố cổ Hội An về đêm.",
      image: "/placeholder.svg?height=250&width=400",
      type: "video",
      duration: "4:12",
      category: "Âm nhạc",
      author: "Quang Minh",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "3 tuần trước",
      likes: 156,
      comments: 18,
      saved: false,
      featured: false,
      color: "bg-purple-500",
    },
    {
      id: 5,
      title: "Ẩm thực đường phố Huế",
      excerpt: "Khám phá những món ăn đường phố đặc trưng của cố đô Huế.",
      image: "/placeholder.svg?height=300&width=450",
      type: "image",
      category: "Ẩm thực",
      author: "Thanh Tâm",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "1 tháng trước",
      likes: 278,
      comments: 36,
      saved: true,
      featured: false,
      color: "bg-green-500",
    },
  ],
};

// Các loại tab
type TabType = "all" | "playlists" | "users" | "posts";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(SEARCH_RESULTS);
  const [recentSearches, setRecentSearches] = useState([
    "acoustic chill",
    "minh anh",
    "du lịch đà nẵng",
    "coffee house",
  ]);

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Giả lập thời gian tìm kiếm
    setTimeout(() => {
      // Trong thực tế, đây sẽ là API call
      // Ở đây chúng ta chỉ giả lập kết quả

      // Thêm vào lịch sử tìm kiếm
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
      }

      setIsSearching(false);
    }, 800);
  };

  // Xóa lịch sử tìm kiếm
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Xóa một mục trong lịch sử tìm kiếm
  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== search));
  };

  return (
    <div className="max-h-screen p-2">
      <div className="h-full rounded-xl overflow-y-auto overflow-x-hidden scroll-but-hidden">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header và thanh tìm kiếm */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Tìm kiếm</h1>

            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm playlist, người dùng, bài đăng..."
                  className="pl-10 pr-10 py-6 text-lg rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <Music className="h-4 w-4 mr-1" />
                  Playlist
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <User className="h-4 w-4 mr-1" />
                  Người dùng
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Hình ảnh
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <Mic className="h-4 w-4 mr-1" />
                  Video
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl ml-auto"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Bộ lọc
                </Button>
              </div>
            </form>
          </div>

          {/* Lịch sử tìm kiếm */}
          {!searchQuery && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tìm kiếm gần đây</h2>
                <Button variant="ghost" size="sm">
                  Xóa tất cả
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full"
                  >
                    <History className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Xu hướng tìm kiếm */}
          {!searchQuery && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Xu hướng tìm kiếm</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Âm nhạc</span>
                  </div>
                  <p className="font-semibold">Acoustic covers 2023</p>
                </div>
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Du lịch</span>
                  </div>
                  <p className="font-semibold">Khám phá Đà Lạt mùa thu</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Ẩm thực</span>
                  </div>
                  <p className="font-semibold">Món ngon đường phố Sài Gòn</p>
                </div>
              </div>
            </div>
          )}

          {/* Kết quả tìm kiếm */}
          {searchQuery && (
            <div>
              {isSearching ? (
                <div className="flex items-center justify-center h-60">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div>
                  <Tabs
                    defaultValue="all"
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as TabType)}
                    className="w-full"
                  >
                    <TabsList className="w-full justify-start mb-6 bg-transparent p-0 border-b">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-10 px-4"
                      >
                        Tất cả
                      </TabsTrigger>
                      <TabsTrigger
                        value="playlists"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-10 px-4"
                      >
                        Playlist
                      </TabsTrigger>
                      <TabsTrigger
                        value="users"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-10 px-4"
                      >
                        Người dùng
                      </TabsTrigger>
                      <TabsTrigger
                        value="posts"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-10 px-4"
                      >
                        Bài đăng
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                      {/* Playlists */}
                      <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">Playlist</h2>
                          <Button variant="ghost" size="sm">
                            Xem tất cả
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {results.playlists.slice(0, 5).map((playlist) => (
                            <PlaylistCard
                              key={playlist.id}
                              playlist={playlist}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Users */}
                      <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">Người dùng</h2>
                          <Button variant="ghost" size="sm">
                            Xem tất cả
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {results.users.slice(0, 3).map((user) => (
                            <UserCard key={user.id} user={user} />
                          ))}
                        </div>
                      </div>

                      {/* Posts */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">Bài đăng</h2>
                          <Button variant="ghost" size="sm">
                            Xem tất cả
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {results.posts.slice(0, 3).map((post) => (
                            <PostCard key={post.id} post={post} />
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="playlists" className="mt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {results.playlists.map((playlist) => (
                          <PlaylistCard key={playlist.id} playlist={playlist} />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="users" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.users.map((user) => (
                          <UserCard key={user.id} user={user} />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="posts" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.posts.map((post) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Component hiển thị playlist
interface PlaylistCardProps {
  playlist: (typeof SEARCH_RESULTS.playlists)[0];
}

function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl h-full">
      <div className="flex flex-col h-full">
        <div className="relative aspect-square">
          <img
            src={playlist.cover || "/placeholder.svg"}
            alt={playlist.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="icon"
              className="rounded-full h-12 w-12 bg-primary/90 hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="h-6 w-6 fill-white text-white" />
            </Button>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-black/60 hover:bg-black/60 text-white">
              <Music className="h-3 w-3 mr-1" />
              {playlist.tracks} bài
            </Badge>
          </div>
        </div>
        <CardContent className="p-3 flex-grow">
          <h3 className="font-semibold text-base line-clamp-1">
            {playlist.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-2">
            {playlist.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <img
                src={playlist.authorAvatar || "/placeholder.svg"}
                alt={playlist.author}
                className="w-4 h-4 rounded-full"
              />
              <span>{playlist.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{playlist.duration}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Component hiển thị người dùng
interface UserCardProps {
  user: (typeof SEARCH_RESULTS.users)[0];
}

function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border rounded-xl">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold">{user.name}</h3>
              {user.verified && (
                <Badge
                  variant="outline"
                  className="ml-1 h-5 bg-blue-500/10 text-blue-500 border-blue-500/20"
                >
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.username}</p>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
              {user.bio}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <div className="text-xs">
                <span className="font-semibold">
                  {user.followers.toLocaleString()}
                </span>
                <span className="text-muted-foreground ml-1">
                  Người theo dõi
                </span>
              </div>
              <div className="text-xs">
                <span className="font-semibold">
                  {user.following.toLocaleString()}
                </span>
                <span className="text-muted-foreground ml-1">
                  Đang theo dõi
                </span>
              </div>
            </div>
          </div>

          <Button size="sm" className="rounded-xl">
            <UserPlus className="h-4 w-4 mr-1" />
            Theo dõi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Component hiển thị bài đăng
interface PostCardProps {
  post: (typeof SEARCH_RESULTS.posts)[0];
}

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl">
      <div className="flex flex-col">
        <div className="relative aspect-video">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2">
            <Badge className={cn("text-white", post.color)}>
              {post.category}
            </Badge>
          </div>

          {post.type === "video" && (
            <>
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="h-12 w-12 text-white fill-white opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              {post.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {post.duration}
                </div>
              )}
            </>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.authorAvatar || "/placeholder.svg"}
              alt={post.author}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">{post.author}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{post.date}</span>
          </div>

          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart
                  className={cn(
                    "h-4 w-4",
                    post.saved && "fill-primary text-primary"
                  )}
                />
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{post.comments}</span>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="rounded-xl">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
