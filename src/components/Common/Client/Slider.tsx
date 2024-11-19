import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Home,
  Video,
  Music,
  Search,
  Heart,
  Globe,
  PlusCircle,
  List,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Pause,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Slider as VolumeSlider } from "@/components/ui/slider"; // ShadCN Slider
import img from "../../../assets/images/logo.png";
import girl from "../../../assets/images/girl.png";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

interface LinkItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

interface PlaylistItem {
  title: string;
  owner: string;
  imgSrc: string;
}

const Slider: React.FC = () => {
  const [uri, setUri] = useState<string>(window.location.pathname);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links: LinkItem[] = [
    { to: "/client/home", icon: Home, label: "Home" },
    { to: "/client/reels", icon: Video, label: "Reels" },
    {
      to: "/client/playlist&artists",
      icon: Music,
      label: "Playlist & Artists",
    },
    { to: "/client/search", icon: Search, label: "Search" },
    { to: "/client/likes", icon: Heart, label: "Like" },
    { to: "/client/yourspace", icon: Globe, label: "Your space" },
  ];

  const items: PlaylistItem[] = [
    {
      title: "Relax and let your worries drift away",
      owner: "Nhựt Nguyễn",
      imgSrc: girl,
    },
    {
      title: "Enjoy the rhythm of the clouds",
      owner: "Nhựt Nguyễn",
      imgSrc: girl,
    },
    {
      title: "Feel the breeze carrying your troubles away",
      owner: "Nhựt Nguyễn",
      imgSrc: girl,
    },
  ];

  const toggleSlider = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="h-screen flex flex-col dark:bg-black bg-white text-white dark:text-white">
      <div className="flex items-center justify-between p-4">
        <Link to="/client/home" onClick={() => setUri("/client/home")}>
          <img src={img} alt="Logo" className="w-12" />
        </Link>
        <span className="text-xl font-bold text-black dark:text-white">MOE</span>
        <Button variant="ghost" onClick={toggleSlider}>
          {isCollapsed ? <CircleChevronRight /> : <CircleChevronLeft />}
        </Button>
      </div>

      {/* Navigation Links */}
      <div
        className={`flex flex-col space-y-2 p-4 transition-all ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            onClick={() => setUri(link.to)}
            className={`flex items-center gap-2 p-2 rounded-md ${
              uri === link.to
                ? "bg-gray-700 dark:bg-gray-500"
                : "hover:bg-gray-800 dark:hover:bg-gray-600"
            }`}
          >
            <link.icon
              className={`w-6 h-6 ${
                uri === link.to ? "text-white" : "text-black dark:text-white"
              }`}
            />
            {!isCollapsed && (
              <span
                className={`${
                  uri === link.to ? "text-white" : "text-black dark:text-white"
                }`}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Playlist Section */}
      <div className="flex flex-col p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-black dark:text-white">
            Playlist
          </span>
          <div className="flex space-x-2">
            <Button variant="ghost">
              <PlusCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost">
              <List className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-40">
  {items.map((item, index) => (
    <div
  key={index}
  className="flex items-center p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
>
  <img
    src={item.imgSrc}
    alt="Playlist"
    className="h-12 w-12 rounded-md"
  />
  <div className="ml-2">
    {/* Tên Playlist */}
    <span className="block font-bold text-base text-black dark:text-white">
      {item.title}
    </span>
    {/* Owner */}
    <span className="block text-xs text-gray-600 dark:text-gray-400">
      {item.owner}
    </span>
  </div>
   
</div>


  ))}
</div>

      </div>

      {/* Now Playing Section */}
      <div className="mt-auto p-4">
        <div className="flex items-center gap-4">
          <img src={girl} alt="Now Playing" className="h-16 w-16 rounded-md" />
          <div className="flex flex-col">
            <span className="font-bold text-black dark:text-white">
              idT41104 (feat. 267)
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-600">
              Nhựt Nguyễn
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost">
            <Shuffle className="w-6 h-6" />
          </Button>
          <Button variant="ghost">
            <SkipBack className="w-6 h-6" />
          </Button>
          <Button variant="ghost">
            <Pause className="w-6 h-6" />
          </Button>
          <Button variant="ghost">
            <SkipForward className="w-6 h-6" />
          </Button>
          <Button variant="ghost">
            <Repeat className="w-6 h-6" />
          </Button>
        </div>
        <div className="mt-4">
          <VolumeSlider defaultValue={[50]} max={100} className="w-full" />
        </div>
      </div>
    </nav>
  );
};

export default Slider;
