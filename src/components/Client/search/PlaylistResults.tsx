import React from "react";
import { PlayCircle } from "lucide-react";
import demo from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";

const PlaylistResults: React.FC = () => {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold">Playlists</h2>
      <div className="mt-2">
        <div className="flex justify-center bg-black/90 p-3 rounded-lg w-56 relative">
          <div className="w-full">
            {/* Ảnh Playlist */}
            <div className="relative">
              <img
                className="w-48 h-48 object-cover rounded-md"
                src={demo}
                alt="Playlist Cover"
              />
            </div>

            {/* Thông tin Playlist */}
            <div className="flex items-center mt-2">
              <div className="w-3/4">
                <h3 className="text-lg font-semibold truncate">
                  Bông hoa chẳng thuộc về ta
                </h3>
                <span className="text-sm text-gray-400">Nhựt Nguyễn</span>
              </div>
              {/* Nút Play */}
              <button className="ml-auto text-white hover:text-green-500">
                <PlayCircle size={42} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistResults;
