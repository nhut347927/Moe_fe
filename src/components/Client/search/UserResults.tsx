import React from "react";
import demo from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";
const UserResults = () => {
  return (
    <div className="mb-5">
      <span className="moe-f-s-28 moe-f-w-600">Profiles</span>
      <div className="mt-2">
        <div className=" moe-bg-color-black-1d p-3 rounded-4 moe-w-180">
          <div className="w-100">
            <div className="text-center">
              <img
                className="moe-box-140 moe-img-responsive moe-rounded-100"
                src={demo}
                alt="IMG"
              />
            </div>
            <div>
              <h3 className="moe-f-s-18 moe-f-w-600 mt-2 mb-0 moe-fix-text">
                Nhựt Nguyễn xxxxxxxxxxxxxxxxxxx
              </h3>
              <span className="moe-f-s-14 moe-fix-text">Profiles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResults;
