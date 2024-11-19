import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import img from "../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";
import PostLike from "./search/PostResults";
import SongLike from "./like/SongLike";
import BeautifulSearchInput from "./like/BeautifulSearchInput";

const Like = () => {
  const location = useLocation(); // Lấy URI hiện tại
  const [activeTab, setActiveTab] = useState("post"); // State lưu tab hiện tại

  useEffect(() => {
    // Xác định tab hiện tại dựa trên URI
    if (location.pathname.endsWith("/likes/video")) {
      setActiveTab("video");
    } else if (location.pathname.endsWith("/likes/songs")) {
      setActiveTab("songs");
    } else {
      setActiveTab("post");
    }
  }, [location.pathname]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (query: string) => {
    console.log("Tìm kiếm với từ khóa: ", query);
    // Xử lý logic tìm kiếm ở đây
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "post":
        return <PostLike />;
      case "video":
        return <PostLike />; // Tạm thời dùng chung PostLike
      case "songs":
        return <SongLike />;
      default:
        return <PostLike />;
    }
  };

  return (
    <div className="p-5 pt-3 pb-0">
      <div className="mb-3">
        {/* Truyền onSearch vào BeautifulSearchInput */}
        <BeautifulSearchInput onSearch={handleSearch} />
      </div>
      <div className="mb-3">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <Link
              className={`nav-link text-light ${activeTab === "post" ? "active" : ""}`}
              to="/client/likes/post"
              onClick={() => setActiveTab("post")}
            >
              Post
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link text-light ${activeTab === "video" ? "active" : ""}`}
              to="/client/likes/video"
              onClick={() => setActiveTab("video")}
            >
              Video
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link text-light ${activeTab === "songs" ? "active" : ""}`}
              to="/client/likes/songs"
              onClick={() => setActiveTab("songs")}
            >
              Songs
            </Link>
          </li>
        </ul>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default Like;
