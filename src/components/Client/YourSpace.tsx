import React, { useState, useEffect } from "react";
import girl from "../../assets/images/girl.png";
import AudioPlayer from "../Audio/AudioPlayer";
import idt41104 from "../../assets/audio/idt41104.mp3";
import bgdemo from "../../assets/images/bg-demo.jpg";
import videodemo from "../../assets/images/videodemo.mp4";
import BackgroundComponent from "../BackgroundComponent/BackgroundComponent";
import ColorControl from "../ColorControl/ColorControl";
const YourSpace = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát/dừng

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };
  return (
    <div className="d-flex flex-column justify-content-between vh-100 p-5 pt-3 ">
      {/* Ưu tiên video > ảnh > backround black */}
      <BackgroundComponent videoSrc={videodemo} imgSrc={bgdemo} />

      {/* Phần trên cùng */}
      <div className="text-white mt-4 pt-1">
        <span className="moe-f-s-16 moe-f-w-300">Playing from playlist</span>
        <h6 className="moe-f-s-16 moe-f-w-700 mt-1 ">
          Hãy thả hồn theo mây để những cơn gió cuốn trôi những ưu phiền
        </h6>
        <div className="d-flex justify-content-end mb-3">
          <ColorControl />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn moe-bg-color-black-39 text-light moe-shadow-1 p-2 pb-1" type="button">
            <i className="moe-f-s-24 bx bx-plus"></i>
          </button>
        </div>
      </div>

      {/* Phần dưới cùng */}
      <div className="text-white mt-auto d-flex align-items-center">
        {/* Hình ảnh */}
        <img className="moe-box-240 moe-rounded-9 moe-shadow-2" src={girl} alt="IMG GIRL" />

        {/* Thông tin và các nút điều khiển */}
        <div className="ms-2 moe-h-240 w-100">
          {/* Nút điều khiển */}
          <div>
            <div>
              <button className=" btn moe-hover-bg-black border-0  p-1 pb-0 ">
                <i className="moe-f-s-20 moe-color-f5 bx bx-shuffle"></i>
              </button>
            </div>
            <div>
              <button className=" btn moe-hover-bg-black border-0  p-1 pb-0">
                <i className="moe-f-s-20 moe-color-f5 bx bx-revision"></i>
              </button>
            </div>
          </div>
          {/* Nút phát nhạc và thông tin bài hát */}
          <div className="mt-4 pt-1">
            <span className=" moe-f-s-54 d-flex mb-1" onClick={togglePlay}>
              {isPlaying ? (
                <i className="moe-color-f5 bx bx-pause-circle"></i>
              ) : (
                <i className="moe-color-f5 bx bx-play-circle"></i>
              )}
            </span>
            <div className="ms-1">
              <h3 className="moe-color-f5 moe-f-s-28 moe-f-w-700 p-0 m-0">
                idT41104(feat.267)
              </h3>
              <p className="moe-f-s-15 moe-f-w-500 mb-1">Nhựt Nguyễn</p>
              <div className="ms-2">
                <AudioPlayer
                  audioSrc={idt41104}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourSpace;
