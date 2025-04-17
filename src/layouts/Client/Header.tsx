import { useState } from "react";
import { Bell, SquarePlus, Maximize, Minimize } from "lucide-react";
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
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const location = useLocation();
  const uri = location.pathname;

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
    <header className={`fixed right-4 z-50 ${uri === "/client/chat" ? "bottom-20" : "bottom-4"}`}>
      <div className="flex flex-col items-end space-y-2">
        {/* Dark Mode Toggle */}
        <ModeToggle />

        {/* Fullscreen Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="p-1 rounded-full"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="w-6 h-6" />
          ) : (
            <Maximize className="w-6 h-6" />
          )}
        </Button>

        {/* Upload Button */}
        <Link to="/client/upload/">
          <Button variant="outline" size="icon" className="p-1 rounded-full">
            <SquarePlus className="h-4 w-4" />
          </Button>
        </Link>

        {/* Notification */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative p-1 rounded-full">
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
      </div>
    </header>
  );
}
