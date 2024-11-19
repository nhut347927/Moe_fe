import React, { useState } from "react";
import BeautifulSearchInput from "./like/BeautifulSearchInput";
import { Link } from "react-router-dom";

import PostResults from "./search/PostResults";
import UserResults from "./search/UserResults";
import VideoResults from "./search/VideoResults";
import SoundResults from "./search/SoundResults";
import PlaylistResults from "./search/PlaylistResults";
const handleSearch = (query: string) => {
  console.log("Tìm kiếm với từ khóa: ", query);
  // Xử lý logic tìm kiếm ở đây
};
const TikTokSearchPage = () => {
  const [activeTab, setActiveTab] = useState("top");

  const tabs = [
    { id: "top", label: "All", path: "/client/search/all" },
    { id: "post", label: "Post", path: "/client/search/post" },
    { id: "video", label: "Video", path: "/client/search/video" },
    { id: "songs", label: "Songs", path: "/client/search/songs" },
    { id: "users", label: "Users", path: "/client/search/users" },
    { id: "playlists", label: "Playlists", path: "/client/search/playlists" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "post":
        return <PostResults />;
      case "users":
        return <UserResults />;
      case "video":
        return <VideoResults />;
      case "songs":
        return <SoundResults />;
      case "playlists":
        return <PlaylistResults />;
      default:
        return (
          <div>
            <div>
              <UserResults />
            </div>
            <div>
              <SoundResults />
            </div>
            <div>
              <PlaylistResults />
            </div>
            <div>
              <VideoResults />
            </div>
            <div>
              <PostResults />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="px-4 m-3">
      <div className="mb-3">
        <BeautifulSearchInput onSearch={handleSearch}/>
      </div>
      <div className="mb-3">
        <ul className="nav nav-underline">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <Link
                className={`nav-link text-light ${
                  activeTab === tab.id ? "active" : ""
                }`}
                to={tab.path}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="search-results">{renderContent()}</div>
    </div>
  );
};

export default TikTokSearchPage;
