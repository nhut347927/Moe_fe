import React from "react";
import demo from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";
const PlaylistResults = () => {
  return (
    <div className="mb-5">
      <span className="moe-f-s-28 moe-f-w-600">Playlists</span>
      <div className="mt-2">
        <div className="d-flex justify-content-center moe-bg-color-black-1d p-3 rounded-4 moe-w-230 position-relative">
          <div className="w-100">
            <div className="d-flex position-relative">
              <img
                className="moe-box-200 moe-img-responsive rounded-2"
                src={demo}
                alt="IMG"
              />
            </div>
            <div className="d-flex mt-2">
              <div className="w-75">
                <h3 className="moe-f-s-18 moe-f-w-600  mb-0 moe-fix-text">
                  Bông hoa chẳng thuộc về ta dssdsssssssssssssssssssssddđ
                </h3>
                <span className="moe-f-s-14 moe-fix-text">Nhựt Nguyễn</span>
              </div>
              <span className="ms-auto">
                <i className="moe-f-s-48 bx bx-play-circle"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistResults;
