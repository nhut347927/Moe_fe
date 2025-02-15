import React, { useState } from "react";
import {
  Play,
  Shuffle,
  SkipForward,
  Eye,
  Check,
  List,
  Clock,
  Heart,
  MoreHorizontal,
  Crown,
} from "lucide-react";
import vid69 from "../../assets/video/vid69.mp4";
import img1 from "../../assets/images/snapedit_1701159146527.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
const Playlist: React.FC = () => {
  const songs = [
    { id: 1, title: "Song 1", artist: "Artist 1", duration: "3:45" },
    { id: 2, title: "Song 2", artist: "Artist 2", duration: "4:10" },
    { id: 3, title: "Song 3", artist: "Artist 3", duration: "3:30" },
  ];

  const sortOptions = [
    { label: "Default", value: "default", id: "sort-default" },
    { label: "Name A-Z", value: "name-asc", id: "sort-name-asc" },
    { label: "Name Z-A", value: "name-desc", id: "sort-name-desc" },
    { label: "Newest", value: "recent", id: "sort-recent" },
    { label: "Oldest", value: "oldest", id: "sort-oldest" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>("default");

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    console.log(`Selected Sort Option: ${sortOption}`);
    // Gọi API hoặc cập nhật UI tại đây
  };
  const playlistData = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      dateAdded: "3 days ago",
      duration: "5:55",
      imageUrl: img1,
    },
    {
      id: 2,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      dateAdded: "1 week ago",
      duration: "8:02",
      imageUrl: img1,
    },
    {
      id: 3,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      dateAdded: "2 weeks ago",
      duration: "3:01",
      imageUrl: img1,
    },
    {
      id: 4,
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      dateAdded: "1 month ago",
      duration: "5:01",
      imageUrl: img1,
    },
    {
      id: 5,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
    {
      id: 6,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
    {
      id: 7,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
    {
      id: 8,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
    {
      id: 8,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
    {
      id: 8,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
    {
      id: 8,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
    {
      id: 8,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      dateAdded: "2 months ago",
      duration: "4:54",
      imageUrl: img1,
    },
  ];
  return (
    <div className="relative m-2 max-h-screen flex items-center justify-center rounded-md dark:bg-zinc-900 overflow-hidden">
      {/* Video Player */}
      <video loop autoPlay className="w-full h-full object-cover">
        <source src={vid69} type="video/mp4" />
        Your browser does not support video.
      </video>

      <div className="absolute w-full h-full top-0 text-white">
        <div className="h-full flex flex-row gap-12">
          {/* Left Column */}
          <div className="w-3/12 p-4">
            {/* Ảnh playlist + Icon Crown */}
            <div className="relative">
              <img
                className="w-64 h-64 object-cover rounded-md"
                src={img1}
                alt="Playlist Cover"
              />
              <div className="absolute bottom-2 right-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-slate-800 dark:bg-slate-100 shadow-lg">
                        <Crown className="h-6 w-6 text-yellow-400 dark:text-yellow-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You are the owner of this playlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Tiêu đề & mô tả playlist */}
            <p className="text-sm text-gray-400 mt-2">Public Playlist</p>
            <h3 className="text-lg font-semibold mt-1">
              Hãy thả hồn theo mây để những cơn gió cuốn trôi những ưu phiền
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Đây là một playlist mà mình rất tâm huyết để chọn lọc và sắp xếp
              thứ tự, hi vọng các bạn cũng sẽ thích!
            </p>

            {/* Thông tin người tạo playlist */}
            <div className="flex items-center gap-4 mt-4">
              {/* Avatar */}
              <img
                className="w-10 h-10 object-cover rounded-full border border-gray-600"
                src={img1}
                alt="Creator Avatar"
              />

              {/* Thông tin người dùng */}
              <div>
                <p className="text-sm font-semibold text-white">Nhựt Nguyễn</p>
                <p className="text-sm text-gray-400 hover:text-gray-200 hover:underline cursor-pointer">
                  @nhut379
                </p>
              </div>

              {/* Nút Follow màu trắng */}
              <Button className="h-8 px-4 rounded-full bg-white text-black font-medium hover:bg-gray-300 transition">
                Follow
              </Button>
            </div>

            {/* Thông tin playlist */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mt-4">
              <p>
                <span className="text-white font-semibold">30</span> Songs
              </p>
              <p>
                <span className="text-white font-semibold">1hr 38min</span>
              </p>
              <p>
                <span className="text-white font-semibold">1400</span> Views
              </p>
              <p>
                <span className="text-white font-semibold">59</span> Saves
              </p>
            </div>
          </div>

          {/* Right Column - Song List */}
          <div className="w-9/12 ">
            <div className="h-full p-3">
              {/* Player Control */}
              <div className="h-full p-4 rounded-md rounded-s-3xl bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.6)] shadow-lg">
                <div className="mb-3">
                  <div className="flex items-center gap-x-5">
                    {/* Play Button */}
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-800 dark:bg-slate-100 shadow-md">
                      <Play className="h-6 w-6 text-zinc-300 dark:text-zinc-600 ms-1" />
                    </div>

                    {/* Playback Controls */}
                    <SkipForward className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
                    <Shuffle className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
                    <MoreHorizontal className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />

                    {/* Sort & View Options */}
                    <div className="ms-auto flex items-center gap-x-5">
                      {/* View Options */}
                      <Popover>
                        <PopoverTrigger>
                          <Eye className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
                        </PopoverTrigger>
                        <PopoverContent className="p-2 w-36">
                          <ul className="flex flex-col space-y-1">
                            {sortOptions.map((option, index) => (
                              <li key={index}>
                                <button
                                  id={option.id}
                                  className={cn(
                                    "w-full text-left px-2 py-1 flex items-center justify-between rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition",
                                    selectedSort === option.value
                                      ? "text-green-600 font-semibold"
                                      : "text-zinc-800 dark:text-zinc-300"
                                  )}
                                  onClick={() => handleSortChange(option.value)}
                                >
                                  <span>{option.label}</span>
                                  {selectedSort === option.value && (
                                    <Check className="w-4 h-4" />
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </PopoverContent>
                      </Popover>

                      {/* List View */}
                      <Popover>
                        <PopoverTrigger>
                          <List className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
                        </PopoverTrigger>
                        <PopoverContent className="p-2 w-36">
                          <ul className="flex flex-col space-y-1">
                            {sortOptions.map((option, index) => (
                              <li key={index}>
                                <button
                                  id={option.id}
                                  className={cn(
                                    "w-full text-left px-2 py-1 flex items-center justify-between rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition",
                                    selectedSort === option.value
                                      ? "text-green-600 font-semibold"
                                      : "text-zinc-800 dark:text-zinc-300"
                                  )}
                                  onClick={() => handleSortChange(option.value)}
                                >
                                  <span>{option.label}</span>
                                  {selectedSort === option.value && (
                                    <Check className="w-4 h-4" />
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                {/* Playlist Table */}
                <ScrollArea className="w-full h-[80vh]">
                  <table className="relative w-full border-collapse">
                    {/* Header */}
                    <thead className="sticky top-0 z-10">
                      <tr className="border-b border-gray-700 text-sm text-gray-400">
                        <th className="pb-2 text-center font-normal w-12">#</th>
                        <th className="pb-2 text-left font-normal">Title</th>
                        <th className="pb-2 text-left font-normal">Album</th>
                        <th className="pb-2 text-left font-normal">
                          Date added
                        </th>
                        <th className="pb-2 text-left font-normal w-24">
                          <div className="flex items-center justify-center">
                            <Clock size={16} />
                          </div>
                        </th>
                      </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                      {playlistData.map((song, index) => (
                        <tr
                          key={song.id}
                          className="group hover:bg-zinc-800 border-gray-800 rounded-md transition"
                        >
                          <td className="py-4 px-2 text-gray-400 group-hover:text-white w-12">
                            <div className="flex items-center justify-center w-8 h-8">
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                              <Play
                                size={16}
                                className="hidden group-hover:block transition"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center">
                              <div className="mr-3 flex-shrink-0">
                                <img
                                  src={song.imageUrl || "/placeholder.svg"}
                                  alt={song.title}
                                  className="h-12 w-12 object-cover rounded-md"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {song.title}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {song.artist}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-gray-400">
                            {song.album}
                          </td>
                          <td className="py-4 px-2 text-gray-400">
                            {song.dateAdded}
                          </td>
                          <td className="py-4 px-2 text-gray-400 w-24">
                            <div className="flex items-center justify-end space-x-4 pr-4">
                              <Heart
                                size={16}
                                className="opacity-0 group-hover:opacity-100 transition"
                              />
                              <span className="w-12 text-right">
                                {song.duration}
                              </span>
                              <MoreHorizontal
                                size={16}
                                className="opacity-0 group-hover:opacity-100 transition"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
