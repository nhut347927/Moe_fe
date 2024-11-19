import { Bell, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import girl from "../../../assets/images/girl.png";
import { ModeToggle } from '@/components/ModeToggle';
export default function Header() {
  return (
    <header className="fixed right-0 top-0 p-3 z-50">
      <div className="flex items-center space-x-3">
        {/* Notification Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative p-1">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="p-1">
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">Create new</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Create new</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New post</DropdownMenuItem>
            <DropdownMenuItem>New story</DropdownMenuItem>
            <DropdownMenuItem>New live stream</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle/>
        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
       <img className="w-10 h-10 rounded-lg shadow-md z-10" src={girl} alt="Logo-Img" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}
