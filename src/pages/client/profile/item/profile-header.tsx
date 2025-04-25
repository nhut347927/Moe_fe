import { UserPlus, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const IMAGE_URL = 'https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png';

export default function ProfileHeader() {
  return (
    <div className="relative h-64 w-full">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={IMAGE_URL}
          alt="Profile cover"
          className="object-cover opacity-50 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
        <div className="flex items-end gap-6">
          <Avatar className="h-24 w-24 border-4 border-white dark:border-zinc-900">
            <AvatarImage src={IMAGE_URL} alt="Profile picture" />
            <AvatarFallback>MV</AvatarFallback>
          </Avatar>
          <div className="mb-1">
            <h1 className="text-2xl font-bold text-white">Minh Vũ</h1>
            <p className="text-gray-300 dark:text-gray-400">@minhvu • Music Producer</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button className="rounded-xl bg-white text-black hover:bg-neutral-200 px-4">
            <UserPlus className="h-4 w-4 mr-2" />
            Theo dõi
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border border-white/20 bg-white text-black hover:bg-neutral-200 px-3"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Nhắn tin
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-white text-black hover:bg-neutral-200 border border-gray-300 backdrop-blur-md"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Chỉnh sửa hồ sơ</DropdownMenuItem>
              <DropdownMenuItem>Quản lý tài khoản</DropdownMenuItem>
              <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}