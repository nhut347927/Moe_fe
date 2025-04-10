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
  X,
  Maximize,
  Music,
  LayoutDashboard,
  LayoutPanelLeft,
  LayoutPanelTop,
  LayoutGrid,
  ArrowUpDown,
  Icon,
} from "lucide-react";
import vid69 from "../../../assets/video/vid70.mp4";
import img1 from "../../../assets/images/snapedit_1701159146527.png";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [viewMode, setViewMode] = useState<
    "table" | "grid" | "list" | "masonry"
  >("table");
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(true);

  const sortOptions: SortOption[] = [
    { label: "Default", value: "default", id: "sort-default" },
    { label: "Name A-Z", value: "name-asc", id: "sort-name-asc" },
    { label: "Name Z-A", value: "name-desc", id: "sort-name-desc" },
    { label: "Newest", value: "recent", id: "sort-recent" },
    { label: "Oldest", value: "oldest", id: "sort-oldest" },
  ];

  const layoutOptions = [
    { id: "both-visible", label: "Hiện cả 2 bên", icon: LayoutGrid },
    { id: "left-only", label: "Chỉ bên trái", icon: LayoutPanelLeft },
    { id: "right-only", label: "Chỉ bên phải", icon: LayoutPanelTop },
    { id: "both-hidden", label: "Ẩn cả 2 bên", icon: X },
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
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    console.log(`Selected Sort Option: ${value}`);
  };

  const togglePlaylistVisibility = () => {
    setIsPlaylistVisible(!isPlaylistVisible);
  };

  const PlaylistCover = () => (
    <div className="relative w-56 h-56">
      <img
        className="w-full h-full object-cover rounded-xl shadow-lg"
        src={img1}
        alt="Playlist Cover"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute bottom-3 right-3 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 shadow-md">
              <Crown className="h-5 w-5 text-yellow-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-800 text-white">
            <p>You are the owner of this playlist</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const PlaylistInfo = () => (
    <div className="mt-6 space-y-3">
      <span className="text-xs uppercase tracking-wider text-zinc-300">
        Public Playlist
      </span>
      <h1 className="text-4xl font-bold leading-tight">Summer Vibes 2023</h1>
      <p className="text-sm text-zinc-300 leading-relaxed max-w-md">
        The perfect playlist for those sunny days and warm nights. Featuring the
        hottest tracks that will keep your summer vibes going all season long.
      </p>
    </div>
  );

  const CreatorInfo = () => (
    <div className="flex items-center gap-3 mt-4">
      <Avatar className="h-9 w-9 border border-zinc-600">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <span className="text-zinc-300">Created by </span>
        <span className="font-semibold text-rose-400">musiclover95</span>
        <span className="text-zinc-300"> • Nam Nguyen</span>
      </div>
    </div>
  );

  const PlaylistStats = () => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-zinc-300 mt-4">
      <div className="flex items-center gap-2">
        <Music className="h-4 w-4" />
        <span>24 songs</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>1 hr 36 min</span>
      </div>
      <div>128.5K plays</div>
      <div>4.2K saves</div>
    </div>
  );

  const PlaybackControls = () => (
    <div className="flex items-center gap-4">
      <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition">
        <Play className="h-6 w-6 text-zinc-800 ml-1" />
      </button>
      <SkipForward className="h-6 w-6 text-zinc-300 hover:text-white cursor-pointer transition" />
      <Shuffle className="h-6 w-6 text-zinc-300 hover:text-white cursor-pointer transition" />
      <MoreHorizontal className="h-6 w-6 text-zinc-300 hover:text-white cursor-pointer transition" />
    </div>
  );

  const ViewModeSelector = () => (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger>
          <ArrowUpDown className="h-5 w-5 text-zinc-300 hover:text-white cursor-pointer transition" />
        </PopoverTrigger>
        <PopoverContent className="p-2 w-40 bg-zinc-800 text-white rounded-lg">
          <ul className="space-y-1">
            {sortOptions.map((option) => (
              <li key={option.id}>
                <button
                  id={option.id}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md hover:bg-zinc-700 transition text-sm",
                    selectedSort === option.value &&
                      "text-green-400 font-medium"
                  )}
                  onClick={() => handleSortChange(option.value)}
                >
                  <span>{option.label}</span>
                  {selectedSort === option.id && (
                    <Check className="w-4 h-4 inline ml-2" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <List className="h-5 w-5 text-zinc-300 hover:text-white cursor-pointer transition" />
        </PopoverTrigger>
        <PopoverContent className="p-2 w-40 bg-zinc-800 text-white rounded-lg">
          <ul className="space-y-1">
            {[
              { label: "Table", value: "table" },
              { label: "Grid", value: "grid" },
              { label: "List", value: "list" },
              { label: "Masonry", value: "masonry" },
            ].map((mode) => (
              <li key={mode.value}>
                <button
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md hover:bg-zinc-700 transition text-sm",
                    viewMode === mode.value && "text-green-400 font-medium"
                  )}
                  onClick={() => setViewMode(mode.value as typeof viewMode)}
                >
                  <span>{mode.label}</span>
                  {viewMode === mode.value && (
                    <Check className="w-4 h-4 inline ml-2" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <LayoutDashboard className="h-5 w-5 text-zinc-300 hover:text-white cursor-pointer transition" />
        </PopoverTrigger>

        <PopoverContent className="p-2 w-40 bg-zinc-800 text-white rounded-lg">
          <ul className="space-y-1">
            {layoutOptions.map((option) => (
              <li key={option.id}>
                <button
                  id={option.id}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-700 transition text-sm"
                    //  selectedLayout === option.id && "text-green-400 font-medium"
                  )}
                >
                  <span className="flex-1">{option.label}</span>
                  {/* {selectedLayout === option.id && <Check className="w-4 h-4" />} */}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );

  const TableView = () => (
    <table className="w-full border-collapse text-sm bg-white/50 dark:bg-zinc-900/50 rounded-md overflow-hidden">
      <thead className="sticky top-0 border-b border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md text-zinc-800 dark:text-zinc-200">
        <tr>
          <th className="py-3 px-4 w-12 text-center">#</th>
          <th className="py-3 px-4 text-left">Title</th>
          <th className="py-3 px-4 text-left">Album</th>
          <th className="py-3 px-4 text-left">Date added</th>
          <th className="py-3 px-4 w-24 text-center">
            <Clock size={16} />
          </th>
        </tr>
      </thead>
      <tbody>
        {playlistData.map((song, index) => (
          <tr
            key={song.id}
            className="group hover:bg-white/50 dark:hover:bg-zinc-800/50 transition"
          >
            <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white">
              <div className="flex items-center justify-center">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block" />
              </div>
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="h-10 w-10 object-cover rounded-md mr-3"
                />
                <div>
                  <div className="font-medium text-zinc-800 dark:text-white">
                    {song.title}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {song.artist}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">
              {song.album}
            </td>
            <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">
              {song.dateAdded}
            </td>
            <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center justify-end gap-3">
                <Heart
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition"
                />
                <span>{song.duration}</span>
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
  );

  const GridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlistData.map((song) => (
        <div
          key={song.id}
          className="group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-3 rounded-lg hover:bg-white/60 dark:hover:bg-zinc-800/50 transition"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-full h-36 object-cover rounded-md mb-2"
          />
          <div className="font-medium text-zinc-800 dark:text-white truncate">
            {song.title}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {song.artist}
          </div>
          <div className="flex justify-between items-center mt-2 text-zinc-500 dark:text-zinc-400 text-xs">
            <span>{song.duration}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Heart size={14} />
              <Play size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-2">
      {playlistData.map((song, index) => (
        <div
          key={song.id}
          className="group flex items-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-2 rounded-lg hover:bg-white/60 dark:hover:bg-zinc-800/50 transition"
        >
          <span className="w-10 text-center text-zinc-500 dark:text-zinc-400">
            {index + 1}
          </span>
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-10 h-10 object-cover rounded-md mx-2"
          />
          <div className="flex-1">
            <div className="font-medium text-zinc-800 dark:text-white truncate">
              {song.title}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {song.artist} • {song.album}
            </div>
          </div>
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 mr-4 text-xs">
            <span>{song.duration}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Heart size={14} />
              <Play size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const MasonryView = () => (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {playlistData.map((song) => (
        <div
          key={song.id}
          className="group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-3 rounded-lg mb-4 break-inside-avoid hover:bg-white/60 dark:hover:bg-zinc-800/50 transition"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-full h-auto object-cover rounded-md mb-2"
          />
          <div className="font-medium text-zinc-800 dark:text-white truncate">
            {song.title}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {song.artist}
          </div>
          <div className="flex justify-between items-center mt-2 text-zinc-500 dark:text-zinc-400 text-xs">
            <span>{song.duration}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Heart size={14} />
              <Play size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-screen max-h-screen p-2">
      <div className="h-full rounded-3xl overflow-y-auto overflow-x-hidden scroll-but-hidden">
        <div className="relative w-full h-full flex flex-col lg:flex-row">
          <video
            loop
            autoPlay
            className="absolute inset-0 w-full h-full object-cover wrapper"
          >
            <source src={vid69} type="video/mp4" />
          </video>

          <div className="relative z-10 w-full lg:w-1/3 p-6 text-white">
            <PlaylistCover />
            <PlaylistInfo />
            <CreatorInfo />
            <PlaylistStats />
          </div>

          {isPlaylistVisible && (
            <div className="relative z-10 w-full lg:w-2/3 p-2">
              <div className="h-full p-6 bg-zinc-400/50 dark:bg-zinc-800/40 backdrop-blur-sm rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <PlaybackControls />
                  <ViewModeSelector />
                </div>
                <ScrollArea className="h-[calc(100vh-200px)]">
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
    </div>
  );
};

export default Playlist;
