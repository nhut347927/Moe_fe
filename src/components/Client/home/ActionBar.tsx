import { Heart, MessageCircle, Ellipsis, CirclePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import img4 from "../../../assets/images/girl.png";
interface ActionBarProps {
  toggleUserInfo: () => void; // 🔹 Nhận hàm toggle từ Home.tsx
}

const ActionBar: React.FC<ActionBarProps> = ({ toggleUserInfo }) => {
  return (
    <div className="flex flex-col items-center space-y-5 p-4">
      {/* Avatar đầu */}
      <Avatar className="h-10 w-10 mb-3">
        <AvatarImage src={img4 || "default_song_image_url"} className="object-cover" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      {/* Icon Like */}
      <div className="flex flex-col items-center gap-1">
        <Heart
          className="h-7 w-7 cursor-pointer text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-100 transition"
          aria-label="Like"
        />
        <span className="text-sm text-zinc-600 dark:text-zinc-300 ">10k</span>
      </div>

      {/* Icon Comment (Gọi toggleUserInfo khi nhấn) */}
      <div className="flex flex-col items-center gap-1">
        <MessageCircle
          className="h-7 w-7 cursor-pointer text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-100 transition"
          aria-label="Comment"
          onClick={toggleUserInfo} // 🔹 Thêm sự kiện click
        />
        <span className="text-sm text-zinc-600 dark:text-zinc-300">1000</span>
      </div>

      {/* Icon Add */}
      <div className="flex flex-col items-center gap-1">
        <CirclePlus
          className="h-7 w-7 cursor-pointer text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-100 transition"
          aria-label="Add"
        />
        <span className="text-sm text-zinc-600 dark:text-zinc-300">300</span>
      </div>

      {/* Icon More Options */}
      <Ellipsis
        className="h-7 w-7 cursor-pointer text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-100 transition"
        aria-label="More options"
      />

      {/* Avatar cuối */}
      <Avatar className="h-10 w-10">
        <AvatarImage src={img4 || "default_song_image_url"} className="object-cover" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ActionBar;
