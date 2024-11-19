import React from "react";
import demo from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";
const SoundResults = () => {
  return (
    <div className="mb-5">
      <span className="moe-f-s-28 moe-f-w-600">Sounds</span>
      <div className="mt-2">
        <div className="d-flex justify-content-center moe-bg-color-black-1d p-3 rounded-4 moe-w-300">
          <div className="w-100">
            <div className="d-flex">
              <div>
              <img
                className="moe-box-200 moe-img-responsive rounded-2"
                src={demo}
                alt="IMG"
              />
              </div>
              <div className="ms-3 d-flex flex-column align-items-end justify-content-between">
                <span className="badge text-bg-success">Top</span>
                <span>
                  <i className="moe-f-s-48 bx bx-play-circle"></i>
                </span>
              </div>
            </div>
            <div>
              <h3 className="moe-f-s-18 moe-f-w-600 mt-2 mb-0 moe-fix-text">
                Bông hoa chẳng thuộc về ta dssdsssssssssssssssssssss
              </h3>
              <span className="moe-f-s-14 moe-fix-text">Nhựt Nguyễn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundResults;
