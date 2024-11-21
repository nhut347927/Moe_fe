import React from "react";
import img1 from "../../assets/images/Pin by Alva Psyche on A Tổng hợp _ Daisy wallpaper, Flowers photography wallpaper, Flowery wallpaper.jpg";
import img2 from "../../assets/images/bg-demo.jpg";
import img3 from "../../assets/images/demo.jpg";
import img4 from "../../assets/images/girl.png";
import img5 from "../../assets/images/hoavang.jpg";
import img6 from "../../assets/images/hoaxanh.jpg";
import img7 from "../../assets/images/tải xuống.jpg";
import PostMultiImg from "./home/PostMultiImage"; // Đảm bảo đường dẫn này đúng

const Home = () => {
  const reelsData = [
    {
      id: 1,
      username: "nhut379",
      images: [img1, img2, img3],
      time: "9 giờ",
      likes: 1236,
      postText: "Nội dung Reel 1",
    },
    {
      id: 2,
      username: "user123",
      images: [img4, img5, img6],
      time: "8 giờ",
      likes: 500,
      postText: "Nội dung Reel 2",
    },
    {
      id: 3,
      username: "user456",
      images: [img7, img1, img2],
      time: "7 giờ",
      likes: 890,
      postText: "Nội dung Reel 3",
    },
  ];

  return (
    <div className="d-flex justify-content-center" id="img-container">
      <div>
        {reelsData.map((post, index) => (
          <PostMultiImg  />
        ))}
      </div>
    </div>
  );
};

export default Home;
