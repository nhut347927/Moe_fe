// SearchPage.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  X,
  Music,
  User,
  ImageIcon,
  Mic,
  Filter,
  History,
  TrendingUp,
} from "lucide-react";
import PlaylistCard from "./PlaylistCard";
import UserCard from "./UserCard";
import PostCard from "./PostCard";
import { SearchResults } from "./types";

type TabType = "all" | "playlists" | "users" | "posts";

// Dữ liệu mẫu
const SEARCH_RESULTS: SearchResults = {
  playlists: [
    {
      id: 1,
      title: "Acoustic Chill",
      description: "Những bản acoustic nhẹ nhàng, thư giãn cho ngày mới",
      cover: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      tracks: 24,
      duration: "1h 45m",
      author: "Minh Anh",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 1245,
      color: "bg-amber-500",
    },
    {
      id: 2,
      title: "Indie Vibes",
      description: "Tuyển tập nhạc indie Việt Nam và quốc tế",
      cover: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      tracks: 18,
      duration: "1h 12m",
      author: "Hải Đăng",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 876,
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Coffee House",
      description: "Nhạc nhẹ nhàng cho quán cà phê",
      cover: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      tracks: 32,
      duration: "2h 10m",
      author: "Thu Hà",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 2134,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Road Trip",
      description: "Playlist hoàn hảo cho những chuyến đi xa",
      cover: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      tracks: 45,
      duration: "3h 05m",
      author: "Quang Minh",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 987,
      color: "bg-purple-500",
    },
    {
      id: 5,
      title: "Lofi Study",
      description: "Tập trung học tập và làm việc với lofi beats",
      cover: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      tracks: 50,
      duration: "3h 30m",
      author: "Thanh Tâm",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
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
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 2453,
      following: 568,
      verified: true,
    },
    {
      id: 2,
      name: "Trần Hải Đăng",
      username: "@haidang",
      bio: "Music producer | DJ | Coffee lover ☕",
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 1876,
      following: 432,
      verified: false,
    },
    {
      id: 3,
      name: "Phạm Thu Hà",
      username: "@thuha",
      bio: "Travel blogger | Foodie | Photographer 📸",
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 5432,
      following: 876,
      verified: true,
    },
    {
      id: 4,
      name: "Lê Quang Minh",
      username: "@quangminh",
      bio: "Musician | Guitar player | Singer 🎸",
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      followers: 3245,
      following: 654,
      verified: false,
    },
    {
      id: 5,
      name: "Vũ Thanh Tâm",
      username: "@thanhtam",
      bio: "Digital artist | Illustrator | Anime fan 🎨",
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
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
      image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      type: "image",
      category: "Du lịch",
      author: "Minh Anh",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
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
      excerpt: "Khám phá những quán cà phê độc đáo và sáng tạo nhất tại thủ đô.",
      image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      type: "video",
      duration: "2:45",
      category: "Ẩm thực",
      author: "Hải Đăng",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
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
      image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      type: "image",
      category: "Nghệ thuật",
      author: "Thu Hà",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
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
      image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      type: "video",
      duration: "4:12",
      category: "Âm nhạc",
      author: "Quang Minh",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
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
      image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      type: "image",
      category: "Ẩm thực",
      author: "Thanh Tâm",
      authorAvatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      date: "1 tháng trước",
      likes: 278,
      comments: 36,
      saved: true,
      featured: false,
      color: "bg-green-500",
    },
  ],
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isSearching, setIsSearching] = useState(false);
  const [results] = useState(SEARCH_RESULTS);
  const [recentSearches, setRecentSearches] = useState([
    "acoustic chill",
    "minh anh",
    "du lịch đà nẵng",
    "coffee house",
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
      }
      setIsSearching(false);
    }, 800);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== search));
  };

  return (
    <div className="h-screen max-h-screen p-2">
      <div className="h-full rounded-3xl overflow-y-auto overflow-x-hidden scroll-but-hidden bg-white/50 dark:bg-zinc-800/70">
        <div className="mx-auto px-4 py-8">
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
                <Button type="button" variant="outline" size="sm" className="rounded-xl">
                  <Music className="h-4 w-4 mr-1" />
                  Playlist
                </Button>
                <Button type="button" variant="outline" size="sm" className="rounded-xl">
                  <User className="h-4 w-4 mr-1" />
                  Người dùng
                </Button>
                <Button type="button" variant="outline" size="sm" className="rounded-xl">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Hình ảnh
                </Button>
                <Button type="button" variant="outline" size="sm" className="rounded-xl">
                  <Mic className="h-4 w-4 mr-1" />
                  Video
                </Button>
                <Button type="button" variant="outline" size="sm" className="rounded-xl ml-auto">
                  <Filter className="h-4 w-4 mr-1" />
                  Bộ lọc
                </Button>
              </div>
            </form>
          </div>

          {!searchQuery && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tìm kiếm gần đây</h2>
                <Button variant="ghost" size="sm">Xóa tất cả</Button>
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

          {searchQuery && (
            <div>
              {isSearching ? (
                <div className="flex items-center justify-center h-60">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
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
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Playlist</h2>
                        <Button variant="ghost" size="sm">Xem tất cả</Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {results.playlists.slice(0, 5).map((playlist) => (
                          <PlaylistCard key={playlist.id} playlist={playlist} />
                        ))}
                      </div>
                    </div>

                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Người dùng</h2>
                        <Button variant="ghost" size="sm">Xem tất cả</Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.users.slice(0, 3).map((user) => (
                          <UserCard key={user.id} user={user} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Bài đăng</h2>
                        <Button variant="ghost" size="sm">Xem tất cả</Button>
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}