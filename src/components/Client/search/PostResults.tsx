import React from "react";
import img from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";
const PostLike = () => {
  return (
    <div className="row g-3 mb-5">
         <span className="moe-f-s-28 moe-f-w-600">Post</span>
      {Array.from({ length:4 }).map((_, index) => (
        <div className="col-sm-3 position-relative" key={index}>
          {/* Div chứa thông tin user */}
          <div className="w-100 position-absolute top-0 start-0 px-2 h-100">
            <div className="d-flex align-items-end justify-content-center h-50 moe-rounded-9 ">
              <span
                className="moe-color-f5  p-0 me-3 d-flex align-items-center"
              
              >
                <i className="moe-f-s-24 bx bx-heart me-2"></i> 9N
              </span>

              <span
                className="moe-color-f5  p-0 me-3 d-flex align-items-center"
         
              >
                <i className="moe-f-s-24 bx bx-message-square me-2"></i> 379
              </span>
            </div>
            <div className="d-flex align-items-end h-50 bottom-0 pb-3 ms-3">
              <img
                className="moe-box-45 moe-img-responsive rounded-5 moe-shadow-1"
                src={img}
                alt="IMG"
              />
              <div className="ms-2">
                <span className="text-decoration-none moe-color-ff moe-f-s-13 moe-f-w-700">
                  nhut379
                </span>
                <p className="m-0 text-decoration-none moe-color-f5 moe-f-s-12 moe-f-w-400">
                  3tr follower
                </p>
              </div>
            </div>
          </div>

          {/* Hình ảnh phía dưới */}
          <img
            className="moe-layout-square moe-rounded-9 moe-shadow-2"
            src={img}
            alt={`IMG GIRL ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default PostLike;
