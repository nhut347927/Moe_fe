import React from "react";
import img from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";

const VideoResults: React.FC = () => {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold mb-3">Videos</h2>

      {/* Grid layout responsive */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative group">
            {/* Div chứa thông tin user */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition">
              <div className="flex justify-center space-x-3">
                <button className="flex items-center text-white">
                  <i className="text-xl bx bx-heart mr-1"></i> 9N
                </button>
                <button className="flex items-center text-white">
                  <i className="text-xl bx bx-message-square mr-1"></i> 379
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <img className="w-10 h-10 rounded-full shadow-lg" src={img} alt="User" />
                <div>
                  <span className="block text-sm font-semibold text-white">nhut379</span>
                  <p className="text-xs text-gray-300">3tr follower</p>
                </div>
              </div>
            </div>

            {/* Hình ảnh thumbnail */}
            <img
              className="w-full rounded-lg shadow-md transition-transform transform hover:scale-105"
              src={img}
              alt={`Video ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoResults;
