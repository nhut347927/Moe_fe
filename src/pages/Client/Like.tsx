"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Grid3X3,
  Layout,
  Rows,
  Clock,
  Play,
  Image,
} from "lucide-react";
import { cn } from "@/common/utils/utils";

// Dữ liệu mẫu
const LIKED_POSTS = [
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
    size: "large",
  },
  {
    id: 2,
    title: "Cà phê sáng tạo tại Hà Nội",
    excerpt: "Khám phá những quán cà phê độc đáo và sáng tạo nhất tại thủ đô.",
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
    size: "medium",
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
    size: "medium",
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
    size: "small",
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
    size: "medium",
  },
  {
    id: 6,
    title: "Kiến trúc Pháp tại Hà Nội",
    excerpt: "Khám phá những công trình kiến trúc Pháp còn sót lại tại Hà Nội.",
    image: "/placeholder.svg?height=350&width=500",
    type: "video",
    duration: "5:30",
    category: "Kiến trúc",
    author: "Minh Tuấn",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "1 tháng trước",
    likes: 203,
    comments: 27,
    saved: false,
    featured: true,
    color: "bg-red-500",
    size: "small",
  },
  {
    id: 7,
    title: "Làng nghề truyền thống Bắc Ninh",
    excerpt: "Tìm hiểu về những làng nghề truyền thống lâu đời tại Bắc Ninh.",
    image: "/placeholder.svg?height=400&width=600",
    type: "image",
    category: "Văn hóa",
    author: "Hồng Nhung",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "2 tháng trước",
    likes: 167,
    comments: 21,
    saved: true,
    featured: false,
    color: "bg-teal-500",
    size: "large",
  },
  {
    id: 8,
    title: "Vườn quốc gia Cúc Phương",
    excerpt: "Khám phá vẻ đẹp hoang sơ của vườn quốc gia Cúc Phương.",
    image: "/placeholder.svg?height=300&width=450",
    type: "video",
    duration: "3:45",
    category: "Du lịch",
    author: "Anh Tuấn",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "2 tháng trước",
    likes: 234,
    comments: 29,
    saved: false,
    featured: false,
    color: "bg-emerald-500",
    size: "medium",
  },
];

// Các loại layout
type LayoutType = "masonry" | "grid" | "list" | "timeline";
type FilterType = "all" | "featured" | "saved" | "recent" | "images" | "videos";
type SortType = "recent" | "popular" | "oldest";

export default function LikedPosts() {
  const [layout, setLayout] = useState<LayoutType>("masonry");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("recent");
  const [posts, setPosts] = useState(LIKED_POSTS);
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi filter
  useEffect(() => {
    setIsLoading(true);

    // Giả lập thời gian tải
    setTimeout(() => {
      let filteredPosts = [...LIKED_POSTS];

      // Lọc bài viết
      if (filter === "featured") {
        filteredPosts = filteredPosts.filter((post) => post.featured);
      } else if (filter === "saved") {
        filteredPosts = filteredPosts.filter((post) => post.saved);
      } else if (filter === "recent") {
        filteredPosts = filteredPosts.filter(
          (post) => post.date.includes("ngày") || post.date.includes("tuần")
        );
      } else if (filter === "images") {
        filteredPosts = filteredPosts.filter((post) => post.type === "image");
      } else if (filter === "videos") {
        filteredPosts = filteredPosts.filter((post) => post.type === "video");
      }

      // Sắp xếp bài viết
      if (sort === "recent") {
        // Giả định rằng các bài viết đã được sắp xếp theo thứ tự gần đây nhất
      } else if (sort === "popular") {
        filteredPosts.sort((a, b) => b.likes - a.likes);
      } else if (sort === "oldest") {
        filteredPosts.reverse();
      }

      setPosts(filteredPosts);
      setIsLoading(false);
    }, 500);
  }, [filter, sort]);

  // Render bài viết theo layout khác nhau
  const renderPosts = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <div className="text-5xl mb-4">😢</div>
          <h3 className="text-xl font-medium mb-2">Không tìm thấy bài viết</h3>
          <p className="text-muted-foreground">
            Hãy thử thay đổi bộ lọc hoặc thích thêm bài viết
          </p>
        </div>
      );
    }

    switch (layout) {
      case "masonry":
        return (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid mb-4"
                >
                  <PostCard post={post} layout={layout} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );

      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} layout={layout} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );

      case "list":
        return (
          <div className="space-y-4">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} layout={layout} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );

      case "timeline":
        return (
          <div className="relative border-l-2 border-muted ml-4 pl-6 space-y-8">
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[3.25rem] top-0 h-6 w-6 rounded-full border-2 border-background bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {post.date}
                  </div>
                  <PostCard post={post} layout={layout} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-h-screen p-2">
      <div className="h-full rounded-xl overflow-y-auto overflow-x-hidden scroll-but-hidden">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Bài Viết Đã Thích</h1>
              <p className="text-muted-foreground">
                Khám phá lại những bài viết bạn đã thích
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Tabs
                value={layout}
                onValueChange={(value) => setLayout(value as LayoutType)}
                className="w-auto"
              >
                <TabsList className="bg-muted/60">
                  <TabsTrigger
                    value="masonry"
                    className="data-[state=active]:bg-background rounded-xl"
                  >
                    <Layout className="h-4 w-4 mr-1" />
                    <span className="sr-only sm:not-sr-only sm:inline-block">
                      Masonry
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="grid"
                    className="data-[state=active]:bg-background rounded-xl"
                  >
                    <Grid3X3 className="h-4 w-4 mr-1" />
                    <span className="sr-only sm:not-sr-only sm:inline-block">
                      Lưới
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="list"
                    className="data-[state=active]:bg-background rounded-xl"
                  >
                    <Rows className="h-4 w-4 mr-1" />
                    <span className="sr-only sm:not-sr-only sm:inline-block">
                      Danh sách
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="timeline"
                    className="data-[state=active]:bg-background rounded-xl"
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="sr-only sm:not-sr-only sm:inline-block">
                      Timeline
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex gap-2">
                <select
                  className="bg-muted/60 text-sm rounded-xl px-3 py-2 border-0"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as FilterType)}
                >
                  <option value="all">Tất cả</option>
                  <option value="images">Hình ảnh</option>
                  <option value="videos">Video</option>
                  <option value="featured">Nổi bật</option>
                  <option value="saved">Đã lưu</option>
                  <option value="recent">Gần đây</option>
                </select>

                <select
                  className="bg-muted/60 text-sm rounded-xl px-3 py-2 border-0"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortType)}
                >
                  <option value="recent">Mới nhất</option>
                  <option value="popular">Phổ biến nhất</option>
                  <option value="oldest">Cũ nhất</option>
                </select>
              </div>
            </div>
          </div>

          {renderPosts()}
        </div>
      </div>
    </div>
  );
}

// Component hiển thị bài viết
interface PostCardProps {
  post: (typeof LIKED_POSTS)[0];
  layout: LayoutType;
}

function PostCard({ post, layout }: PostCardProps) {
  // For list layout
  if (layout === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 lg:w-1/4">
            <div className="relative aspect-video sm:aspect-square h-full">
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
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                  {post.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {post.duration}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <CardContent className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={post.authorAvatar || "/placeholder.svg"}
                alt={post.author}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-muted-foreground">
                {post.author}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                {post.type === "video" ? (
                  <Play className="h-3 w-3" />
                ) : (
                  <Image className="h-3 w-3" />
                )}
                {post.type === "video" ? "Video" : "Hình ảnh"}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Bookmark
                  className={cn(
                    "h-4 w-4",
                    post.saved
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  )}
                />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // For timeline layout
  if (layout === "timeline") {
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
            {post.featured && (
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-background/80">
                  Nổi bật
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded bg-muted flex items-center gap-1">
                {post.type === "video" ? (
                  <Play className="h-3 w-3" />
                ) : (
                  <Image className="h-3 w-3" />
                )}
                {post.type === "video" ? "Video" : "Hình ảnh"}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorAvatar || "/placeholder.svg"}
                  alt={post.author}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm">{post.likes}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // For masonry and grid layouts
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl h-full",
        layout === "masonry" && post.size === "large" && "row-span-2"
      )}
    >
      <div className="flex flex-col h-full">
        <div
          className={cn(
            "relative",
            post.size === "small"
              ? "aspect-video"
              : post.size === "medium"
              ? "aspect-[4/3]"
              : "aspect-[3/4]"
          )}
        >
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {post.type === "video" && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-black/50 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </div>
              </div>
              {post.duration && (
                <div className="absolute bottom-16 right-4 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {post.duration}
                </div>
              )}
            </>
          )}

          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className={cn("text-white", post.color)}>
              {post.category}
            </Badge>
            <Badge variant="outline" className="bg-background/80">
              {post.type === "video" ? "Video" : "Hình ảnh"}
            </Badge>
          </div>

          {post.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-background/80">
                Nổi bật
              </Badge>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-lg text-white mb-1">
              {post.title}
            </h3>
            {post.size !== "small" && (
              <p className="text-white/80 text-sm line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={post.authorAvatar || "/placeholder.svg"}
              alt={post.author}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-muted-foreground">{post.author}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{post.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{post.comments}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Bookmark
                className={cn(
                  "h-4 w-4",
                  post.saved
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                )}
              />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
