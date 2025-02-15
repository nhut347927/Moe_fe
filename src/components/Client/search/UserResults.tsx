import React from "react";
import demo from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";

const UserResults: React.FC = () => {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold">Profiles</h2>
      <div className="mt-3 flex justify-center">
        <div className="bg-[#1d1d1d] p-4 rounded-lg w-44 flex flex-col items-center shadow-lg">
          {/* Ảnh đại diện */}
          <img className="w-32 h-32 rounded-full object-cover" src={demo} alt="User Avatar" />

          {/* Thông tin người dùng */}
          <div className="text-center mt-3">
            <h3 className="text-sm font-semibold truncate">Nhựt Nguyễn xxxxxxxxxxxxxxxxxxx</h3>
            <span className="text-xs text-gray-400">Profiles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResults;
