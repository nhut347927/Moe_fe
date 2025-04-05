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
  Grid,
  X,
  Maximize,
} from "lucide-react";
import vid69 from "../../assets/video/vid69.mp4";
import img1 from "../../assets/images/snapedit_1701159146527.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/common/utils/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// Interfaces
interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  dateAdded: string;
  duration: string;
  imageUrl: string;
}

interface SortOption {
  label: string;
  value: string;
  id: string;
}

const Playlist: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid" | "list" | "masonry">("table");
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(true); // Thêm state để ẩn/hiện playlist

  const sortOptions: SortOption[] = [
    { label: "Default", value: "default", id: "sort-default" },
    { label: "Name A-Z", value: "name-asc", id: "sort-name-asc" },
    { label: "Name Z-A", value: "name-desc", id: "sort-name-desc" },
    { label: "Newest", value: "recent", id: "sort-recent" },
    { label: "Oldest", value: "oldest", id: "sort-oldest" },
  ];

  const playlistData: Song[] = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      dateAdded: "3 days ago",
      duration: "5:55",
      imageUrl: img1,
    },
    // Thêm các bài hát khác ở đây
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    console.log(`Selected Sort Option: ${value}`);
  };

  const togglePlaylistVisibility = () => {
    setIsPlaylistVisible(!isPlaylistVisible);
  };

  // Components con
  const PlaylistCover = () => (
    <div className="relative">
      <img className="w-64 h-64 object-cover rounded-md" src={img1} alt="Playlist Cover" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute bottom-2 right-2 h-12 w-12 flex items-center justify-center rounded-full bg-slate-800 dark:bg-slate-100 shadow-lg">
              <Crown className="h-6 w-6 text-yellow-400 dark:text-yellow-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>You are the owner of this playlist</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const PlaylistInfo = () => (
    <div className="mt-4">
      <p className="text-sm text-gray-400">Public Playlist</p>
      <h3 className="text-lg font-semibold mt-1">
        Hãy thả hồn theo mây để những cơn gió cuốn trôi những ưu phiền
      </h3>
      <p className="text-sm text-gray-300 mt-2">
        Đây là một playlist mà mình rất tâm huyết để chọn lọc và sắp xếp thứ tự,
        hi vọng các bạn cũng sẽ thích!
      </p>
    </div>
  );

  const CreatorInfo = () => (
    <div className="flex items-center gap-4 mt-4">
      <img className="w-10 h-10 object-cover rounded-full border border-gray-600" src={img1} alt="Creator Avatar" />
      <div>
        <p className="text-sm font-semibold text-white">Nhựt Nguyễn</p>
        <p className="text-sm text-gray-400 hover:text-gray-200 hover:underline cursor-pointer">@nhut379</p>
      </div>
      <Button className="h-8 px-4 rounded-full bg-white text-black font-medium hover:bg-gray-300 transition">
        Follow
      </Button>
    </div>
  );

  const PlaylistStats = () => (
    <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mt-4">
      <p><span className="text-white font-semibold">30</span> Songs</p>
      <p><span className="text-white font-semibold">1hr 38min</span></p>
      <p><span className="text-white font-semibold">1400</span> Views</p>
      <p><span className="text-white font-semibold">59</span> Saves</p>
    </div>
  );

  const PlaybackControls = () => (
    <div className="flex items-center gap-x-5">
      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-800 dark:bg-slate-100 shadow-md">
        <Play className="h-6 w-6 text-zinc-300 dark:text-zinc-600 ms-1" />
      </div>
      <SkipForward className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
      <Shuffle className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
      <MoreHorizontal className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
    </div>
  );

  const ViewModeSelector = () => (
    <div className="flex items-center gap-x-5">
      <Popover>
        <PopoverTrigger>
          <Eye className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
        </PopoverTrigger>
        <PopoverContent className="p-2 w-36">
          <ul className="flex flex-col space-y-1">
            {sortOptions.map((option) => (
              <li key={option.id}>
                <button
                  id={option.id}
                  className={cn(
                    "w-full text-left px-2 py-1 flex items-center justify-between rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition",
                    selectedSort === option.value ? "text-green-600 font-semibold" : "text-zinc-800 dark:text-zinc-300"
                  )}
                  onClick={() => handleSortChange(option.value)}
                >
                  <span>{option.label}</span>
                  {selectedSort === option.value && <Check className="w-4 h-4" />}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <List className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 cursor-pointer transition" />
        </PopoverTrigger>
        <PopoverContent className="p-2 w-36">
          <ul className="flex flex-col space-y-1">
            {[
              { label: "Table", value: "table" },
              { label: "Grid", value: "grid" },
              { label: "List", value: "list" },
              { label: "Masonry", value: "masonry" },
            ].map((mode) => (
              <li key={mode.value}>
                <button
                  className={cn(
                    "w-full text-left px-2 py-1 flex items-center justify-between rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition",
                    viewMode === mode.value ? "text-green-600 font-semibold" : "text-zinc-800 dark:text-zinc-300"
                  )}
                  onClick={() => setViewMode(mode.value as typeof viewMode)}
                >
                  <span>{mode.label}</span>
                  {viewMode === mode.value && <Check className="w-4 h-4" />}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <button onClick={togglePlaylistVisibility} className="p-2 rounded-full hover:bg-zinc-700 transition">
        {isPlaylistVisible ? (
          <X className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100" />
        ) : (
          <Maximize className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100" />
        )}
      </button>
    </div>
  );

  const TableView = () => (
    <table className="w-full border-collapse">
      <thead className="sticky top-0 z-10 border-b border-gray-700 text-sm text-gray-400">
        <tr>
          <th className="pb-2 w-12 text-center font-normal">#</th>
          <th className="pb-2 text-left font-normal">Title</th>
          <th className="pb-2 text-left font-normal">Album</th>
          <th className="pb-2 text-left font-normal">Date added</th>
          <th className="pb-2 w-24 text-center font-normal"><Clock size={16} /></th>
        </tr>
      </thead>
      <tbody>
        {playlistData.map((song, index) => (
          <tr key={song.id} className="group hover:bg-zinc-800 rounded-md transition">
            <td className="py-4 px-2 w-12 text-gray-400 group-hover:text-white">
              <div className="flex items-center justify-center w-8 h-8">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block transition" />
              </div>
            </td>
            <td className="py-4 px-2">
              <div className="flex items-center">
                <img src={song.imageUrl} alt={song.title} className="h-12 w-12 object-cover rounded-md mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">{song.title}</div>
                  <div className="text-sm text-gray-400">{song.artist}</div>
                </div>
              </div>
            </td>
            <td className="py-4 px-2 text-gray-400">{song.album}</td>
            <td className="py-4 px-2 text-gray-400">{song.dateAdded}</td>
            <td className="py-4 px-2 w-24 text-gray-400">
              <div className="flex items-center justify-end space-x-4 pr-4">
                <Heart size={16} className="opacity-0 group-hover:opacity-100 transition" />
                <span className="w-12 text-right">{song.duration}</span>
                <MoreHorizontal size={16} className="opacity-0 group-hover:opacity-100 transition" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const GridView = () => (
    <div className="grid grid-cols-4 gap-4">
      {playlistData.map((song) => (
        <div key={song.id} className="group bg-zinc-800/50 p-4 rounded-md hover:bg-zinc-800 transition">
          <img src={song.imageUrl} alt={song.title} className="w-full h-40 object-cover rounded-md mb-2" />
          <div className="font-medium text-white truncate">{song.title}</div>
          <div className="text-sm text-gray-400 truncate">{song.artist}</div>
          <div className="flex justify-between items-center mt-2 text-gray-400">
            <span>{song.duration}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Heart size={16} />
              <Play size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-2">
      {playlistData.map((song, index) => (
        <div key={song.id} className="group flex items-center bg-zinc-800/50 p-2 rounded-md hover:bg-zinc-800 transition">
          <span className="w-10 text-center text-gray-400">{index + 1}</span>
          <img src={song.imageUrl} alt={song.title} className="w-10 h-10 object-cover rounded-md mx-2" />
          <div className="flex-1">
            <div className="font-medium text-white truncate">{song.title}</div>
            <div className="text-sm text-gray-400 truncate">{song.artist} • {song.album}</div>
          </div>
          <div className="flex items-center gap-4 text-gray-400 mr-4">
            <span>{song.duration}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Heart size={16} />
              <Play size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const MasonryView = () => (
    <div className="columns-3 gap-4">
      {playlistData.map((song) => (
        <div key={song.id} className="group bg-zinc-800/50 p-4 rounded-md mb-4 break-inside-avoid hover:bg-zinc-800 transition">
          <img src={song.imageUrl} alt={song.title} className="w-full h-auto object-cover rounded-md mb-2" />
          <div className="font-medium text-white truncate">{song.title}</div>
          <div className="text-sm text-gray-400 truncate">{song.artist}</div>
          <div className="flex justify-between items-center mt-2 text-gray-400">
            <span>{song.duration}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Heart size={16} />
              <Play size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative m-2 max-h-screen flex items-center justify-center rounded-md dark:bg-zinc-900 overflow-hidden">
      <video loop autoPlay className="w-full h-full object-cover">
        <source src={vid69} type="video/mp4" />
        Your browser does not support video.
      </video>

      <div className="absolute inset-0 text-white flex flex-row gap-12 h-full">
        <div className="w-3/12 p-4">
          <PlaylistCover />
          <PlaylistInfo />
          <CreatorInfo />
          <PlaylistStats />
        </div>

        {isPlaylistVisible && (
          <div className="w-9/12 p-3">
            <div className="h-full p-4 rounded-md bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.6)] shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <PlaybackControls />
                <ViewModeSelector />
              </div>

              <ScrollArea className="w-full h-[80vh]">
                {viewMode === "table" && <TableView />}
                {viewMode === "grid" && <GridView />}
                {viewMode === "list" && <ListView />}
                {viewMode === "masonry" && <MasonryView />}
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;