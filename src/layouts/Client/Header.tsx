import { useState } from "react";
import { Bell, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/Common/ModeToggle";
import { Link } from "react-router-dom";
import { Maximize, Minimize } from "lucide-react";

export default function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    <header className="fixed right-0 top-0 p-3 z-50">
      <div className="flex items-center space-x-3">
        {/* Notification Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative p-1 rounded-full "
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
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

        {/* Create New Button */}

        <Link to="/client/upload/">
          <Button
            variant="outline"
            size="icon"
            className="relative p-1 rounded-full"
          >
            <SquarePlus className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="relative p-1 rounded-full"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="w-6 h-6" />
          ) : (
            <Maximize className="w-6 h-6" />
          )}
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
