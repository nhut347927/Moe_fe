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
import girl from "../../../assets/images/girl.png";
import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed right-0 top-0 p-3 z-50">
      <div className="flex items-center space-x-3">
        {/* Notification Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative p-1 rounded-full"
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

        <ModeToggle />
        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10">
              <AvatarImage src={girl} className="object-cover z-10" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link to="/auth/login">
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
            <Link to="/auth/register">
              <DropdownMenuItem>Register</DropdownMenuItem>
            </Link>
            <Link to="/auth/change-password">
              <DropdownMenuItem>Change Password</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
