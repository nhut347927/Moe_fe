import React from "react";
import { Play, SkipForward, Shuffle, MoreHorizontal } from "lucide-react";

const PlaybackControls: React.FC = () => (
  <div className="flex items-center gap-4 space-x-2">
    <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition">
      <Play className="h-6 w-6 text-zinc-800 ml-1" />
    </button>
    <SkipForward className="h-6 w-6 text-zinc-300 hover:text-white cursor-pointer transition" />
    <Shuffle className="h-6 w-6 text-zinc-300 hover:text-white cursor-pointer transition" />
    <MoreHorizontal className="h-6 w-6 text-zinc-300 hover:text-white cursor-pointer transition" />
  </div>
);

export default PlaybackControls;