import React, { useState } from "react";
import img from "../../../assets/images/648dd402d5f169ace2d7116d37f7df8d.jpg";
import idt41104 from "../../../assets/audio/idt41104.mp3";
import demo from "../../../assets/images/demo.jpg";
import AudioPlayer from "../../Audio/AudioPlayer";

const SongLike = () => {
  // Sử dụng mảng để lưu trạng thái phát nhạc cho từng bài hát
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    setPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="row g-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="col-sm-3 position-relative" key={index}>
          {/* Div chứa thông tin user */}
          <div className="w-100 position-absolute top-0 start-0 px-2 h-100 moe-bg-color-black-3960">
            <div className="d-flex align-items-end justify-content-center h-50 moe-rounded-9 ">
              <span className="moe-color-f5 p-0 me-3 d-flex align-items-center">
                <i className="moe-f-s-24 bx bx-heart me-2"></i> 9N
              </span>
              <span className="moe-color-f5 p-0 me-3 d-flex align-items-center">
                <i className="moe-f-s-24 bx bx-headphone me-2"></i> 9N
              </span>
              <span className="moe-color-f5 p-0 me-3 d-flex align-items-center">
                <i className="moe-f-s-24 bx bx-message-square me-2"></i> 379
              </span>
            </div>
            <div className="d-flex align-items-end h-50 ms-3 pb-3">
              <div className="d-flex align-items-center w-100 me-3">
                <div className="mt-1" onClick={() => togglePlay(index)}>
                  <img
                    className={`${
                      playingIndex === index ? "moe-rotate-image" : ""
                    } moe-box-45 moe-img-responsive rounded-5 mt-1`}
                    src={demo}
                    alt="IMG"
                  />
                </div>
                <div className="w-100 ms-3">
                  <AudioPlayer
                    audioSrc={idt41104}
                    isPlaying={playingIndex === index}
                    setIsPlaying={(isPlaying) => {
                      // Nếu không phát, đặt lại playingIndex
                      if (!isPlaying) setPlayingIndex(null);
                    }}
                  />
                </div>
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

export default SongLike;
