import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Music,
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import img1 from "../../../assets/images/Pin by Alva Psyche on A Tổng hợp _ Daisy wallpaper, Flowers photography wallpaper, Flowery wallpaper.jpg";
import img3 from "../../../assets/images/demo.jpg";
import img4 from "../../../assets/images/girl.png";
import img5 from "../../../assets/images/hoavang.jpg";
import img6 from "../../../assets/images/hoaxanh.jpg";
import img7 from "../../../assets/images/tải xuống.jpg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const images = [img1, img3, img4, img5, img6, img7];

export default function PostMultiImg() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextPermanentlyHidden, setIsTextPermanentlyHidden] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleClick = () => {
    if (!isTextPermanentlyHidden) {
      setIsTextPermanentlyHidden(true);
    }
  };

  return (
    <div
      className={` ${
        isTextPermanentlyHidden
          ? "grid grid-cols-12" // Chia 2 cột nếu isTextPermanentlyHidden = true
          : "" // Căn giữa nếu isTextPermanentlyHidden = false
      }`}
    >
      <div className="col-span-8">
        <div className="max-w-[502px] max-h-screen p-5 mx-auto mt-5 relative">
          <motion.div
            className="relative p-3 aspect-[468/697] overflow-hidden cursor-pointer"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Artistic image ${currentImageIndex + 1}`}
                className="w-full h-full moe-style object-cover absolute inset-0 mx-auto rounded my-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ display: "none" }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <AnimatePresence>
              {!isTextPermanentlyHidden && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{
                      opacity: isHovered ? 0 : 1,
                      y: isHovered ? 20 : 0,
                    }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <div className="flex items-center space-x-5 mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={img3}
                            className="w-10 h-10 object-cover rounded-full shadow-lg"
                            alt="User Avatar"
                          />
                          <div>
                            <span className="text-sm font-semibold">
                              nhut379
                            </span>
                          </div>
                        </div>
                        <Button className="rounded-full">Follow</Button>
                      </div>
                      <div className="mb-3">
                        <p>
                          Tôi có một vài điều muốn chia sẻ với bạn về trang web
                          này. # tag1 # tag2 # tag3
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 truncate text-ellipsis">
                        <Music className="w-5 h-5 " />
                        <p>Tên bài hát</p>
                        <p>Tác giả</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            {images.length > 1 && (
              <>
                <div
                  className="absolute top-1/2 left-4 transform w-7 h-7 flex items-center justify-center rounded-full opacity-70 bg-zinc-100 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="h-5 w-5 font-bold text-zinc-800" />
                </div>
                <div
                  className="absolute top-1/2 right-4 transform w-7 h-7 flex items-center justify-center rounded-full opacity-70 bg-zinc-100 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="h-5 w-5 font-bold text-zinc-800" />
                </div>
              </>
            )}
          </motion.div>
          {images.length > 1 && (
            <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    currentImageIndex === index
                      ? "bg-zinc-50 dark:bg-zinc-50"
                      : "bg-zinc-400 dark:bg-zinc-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isTextPermanentlyHidden && (
        <div className="col-span-4 flex items-center justify-center">
          <div className="border-2 rounded-2xl w-[432px]">
            {/* User Information Section */}
            <div className="flex items-center space-x-4 mb-4 px-5 pt-5">
              <div className="w-20">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={img3} className="object-cover" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg font-semibold">nhut379</span>
                  <div>
                    <Button className="ms-auto h-8 w-20 pb-1.5 rounded-full">
                      Follow
                    </Button>
                    <Button className="ms-2 h-8 w-20 pb-1.5 rounded-full">
                      Chat
                    </Button>
                  </div>
                </div>
                <div className="text-sm">
                  <span>9 bài viết</span> | <span>3K người theo dõi</span>
                </div>
              </div>
            </div>

            {/* User Bio */}
            <div className="text-sm mb-2 px-5">
              <p>Chào mọi người, mình là người tạo ra Moe.</p>
            </div>
            <div></div>
            {/* Interactions (like, comment, etc.) */}
            <div className="flex items-center mb-4 px-5">
              <Heart className="w-7 h-7 me-4 cursor-pointer" />
              <MessageCircle className="w-7 h-7 cursor-pointer" />
              <div className=" flex items-center ms-auto">
              <Music className="w-5 h-5 me-1"/>
                <div className="text-sm truncate text-ellipsis ms-auto max-w-[220px] me-3">
               
                  Một bài hát mà bạn yêu thích
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={img3} className="object-cover" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="px-5 pb-2">
              <p className="text-sm"> 1.356 lượt thích</p>
              <p className="text-sm underline">Xem tất cả 100 bình luận</p>
            </div>
            {/* Comments/Content Section with Scrollable Area */}
            <div className="mb-4">
              <ScrollArea className=" overflow-y-auto h-96">
                <div className="space-y-2 p-5">
                  {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                    <div key={i} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={img3} className="object-cover" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">
                            nhut379
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm opacity-95">
                          Đây là một bình luận mẫu. Nó có thể khá dài và sẽ tự
                          động xuống dòng nếu cần thiết.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          9 giờ trước
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Comment Input Form */}
            <form className="flex items-center space-x-2 p-5 pt-0">
              <Input className="flex-grow" placeholder="Thêm bình luận..." />
              <Send className="h-5 w-5 hover:text-zinc-500" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
