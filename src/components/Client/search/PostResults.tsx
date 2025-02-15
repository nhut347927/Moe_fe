import React from "react";
import { Heart, MessageSquare } from "lucide-react";
import img from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";

const PostLike: React.FC = () => {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold">Post</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative">
            {/* Lớp overlay chứa info */}
            <div className="absolute inset-0 flex flex-col justify-between p-2">
              {/* Số lượt thích & bình luận */}
              <div className="flex justify-center gap-4 text-white text-sm">
                <span className="flex items-center gap-1">
                  <Heart size={20} className="text-red-500" /> 9N
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={20} className="text-gray-300" /> 379
                </span>
              </div>

              {/* Thông tin người đăng */}
              <div className="flex items-center space-x-2 text-white">
                <img
                  className="w-10 h-10 rounded-full shadow-md object-cover"
                  src={img}
                  alt="User Avatar"
                />
                <div>
                  <p className="text-sm font-semibold">nhut379</p>
                  <p className="text-xs text-gray-300">3tr follower</p>
                </div>
              </div>
            </div>

            {/* Ảnh bài post */}
            <img
              className="w-full h-full object-cover rounded-xl shadow-lg"
              src={img}
              alt={`Post ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostLike;
