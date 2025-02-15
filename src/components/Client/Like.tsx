import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostLike from "./search/PostResults";
import BeautifulSearchInput from "./like/BeautifulSearchInput";
import { ScrollArea } from "@/components/ui/scroll-area";

const Like = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("post");

  useEffect(() => {
    if (location.pathname.endsWith("/likes/video")) {
      setActiveTab("video");
    } else if (location.pathname.endsWith("/likes/songs")) {
      setActiveTab("songs");
    } else {
      setActiveTab("post");
    }
  }, [location.pathname]);

  const handleSearch = (query: string) => {
    console.log("Tìm kiếm với từ khóa:", query);
  };

  return (
    <div className="max-h-screen p-2">
      <div className="w-full h-full p-4 bg-zinc-200 dark:bg-zinc-900 rounded-lg flex flex-col">
       <div className="mb-5">
       <BeautifulSearchInput onSearch={handleSearch} />
       </div>
        <ScrollArea className="flex-1 overflow-auto">
          <PostLike />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Like;
