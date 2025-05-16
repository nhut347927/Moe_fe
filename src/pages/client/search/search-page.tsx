import { Search } from "lucide-react";
import FeaturedSlider from "./item/featured-slider";
import TopicBadges from "./item/topic-badges";
import PostGrid from "./item/post-grid";
import { useState } from "react";

const postFilters = [
  { label: "All", value: "all" },
  { label: "Viewed", value: "viewed" },
  { label: "Unviewed", value: "unviewed" },
  { label: "Recently Uploaded", value: "recent" },
];

export default function SearchPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    // TODO: Gọi API hoặc filter lại danh sách bài viết ở đây
  };

  return (
    <div className="flex h-screen max-h-screen p-2">
      <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl overflow-y-auto overflow-x-hidden scroll-but-hidden p-4 px-14">
        {/* Top section with slider and topics */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured posts slider - takes 2/3 of the space on desktop */}
          <div className="lg:col-span-2">
            <FeaturedSlider />
          </div>

          {/* Topics section - takes 1/3 of the space on desktop */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-3xl font-semibold">Khám phá chủ đề</h3>
            <TopicBadges />
          </div>
        </div>

        {/* Search title and description */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-5xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Tìm kiếm bài đăng
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Khám phá hàng ngàn bài viết chất lượng về các chủ đề bạn quan tâm.
            Từ chữa lành tâm hồn đến phát triển bản thân, chúng tôi có mọi thứ
            bạn cần.
          </p>
        </div>

        <div className="relative mb-6 mx-auto max-w-2xl">
          {/* Tìm kiếm */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts, authors, or topics..."
              className="w-full rounded-full border-2 border-black bg-background py-4 pl-14 pr-36 shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:shadow-lg"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800">
              Search
            </button>
          </div>

          {/* Bộ lọc bên dưới */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {postFilters.map((filter) => (
              <button
                key={filter.value}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter.value
                    ? "bg-black text-white border-black"
                    : "text-black border-black hover:bg-black hover:text-white"
                }`}
                onClick={() => handleFilterChange(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <PostGrid />
      </div>
    </div>
  );
}
