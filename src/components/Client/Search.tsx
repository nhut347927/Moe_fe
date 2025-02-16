import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search as SearchIcon } from "lucide-react";

import BeautifulSearchInput from "./like/BeautifulSearchInput";
import PostResults from "./search/PostResults";
import UserResults from "./search/UserResults";
import VideoResults from "./search/VideoResults";
import PlaylistResults from "./search/PlaylistResults";

const handleSearch = (query: string) => {
  console.log("Tìm kiếm với từ khóa: ", query);
};

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "all";

  const tabs = [
    { id: "all", label: "All" },
    { id: "post", label: "Posts" },
    { id: "video", label: "Videos" },
    { id: "songs", label: "Songs" },
    { id: "users", label: "Users" },
    { id: "playlists", label: "Playlists" },
  ];

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setSearchParams({ tab: "all" });
    }
  }, [activeTab, setSearchParams]);

  const renderContent = () => {
    switch (activeTab) {
      case "post":
        return <PostResults />;
      case "users":
        return <UserResults />;
      case "video":
        return <VideoResults />;
      case "playlists":
        return <PlaylistResults />;
      default:
        return (
          <>
            <UserResults />
            <PlaylistResults />
            <VideoResults />
            <PostResults />
          </>
        );
    }
  };

  return (
    <div className="max-h-screen p-2">
      <div className="w-full h-full p-4 bg-zinc-200 dark:bg-zinc-900 rounded-xl flex flex-col">
        {/* Ô tìm kiếm */}
        <div className="mb-4 flex items-center gap-2">
          <SearchIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <BeautifulSearchInput onSearch={handleSearch} />
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-4 border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              className={`pb-2 px-4 text-gray-600 dark:text-gray-300 font-medium transition-all duration-200 hover:text-gray-900 dark:hover:text-white whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : ""
              }`}
              to={`?tab=${tab.id}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        
        {/* Nội dung */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className="search-results p-2">{renderContent()}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Search;