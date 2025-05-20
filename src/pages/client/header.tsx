import { useState } from "react";
import {
  Bell,

  Maximize,
  Minimize,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/common/mode-toggle";
import { Link } from "react-router-dom";

export default function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const location = useLocation();

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen();
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    document.exitFullscreen();
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  return (
    <header className="fixed top-1/2 right-2 z-50 -translate-y-1/2">
      <div className="flex flex-col items-end space-y-2 bg-muted/60 p-2 rounded-xl">
        {/* Dark Mode Toggle */}
        <div className="inline-flex items-center justify-center outline-none h-9 w-9 p-2 rounded-xl transition-colors hover:bg-muted">
          <ModeToggle />
        </div>

        {/* Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="rounded-xl p-2 transition-colors hover:bg-muted"
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5" />
          ) : (
            <Maximize className="w-5 h-5" />
          )}
        </Button>

        {/* Notification */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl p-2 transition-colors hover:bg-muted"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New message from Alice</DropdownMenuItem>
            <DropdownMenuItem>John liked your post</DropdownMenuItem>
            <DropdownMenuItem>New follower: Emma</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Upload */}
        <Link to="/client/about">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl p-2 transition-colors hover:bg-muted"
          >
            <CircleAlert className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
