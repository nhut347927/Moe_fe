import React, { ReactNode, useState } from "react";
import { Maximize, Minimize } from "lucide-react"; 
import Header from "../Common/Client/Header";
import Slider from "../Common/Client/Slider";
import { ScrollArea } from "@/components/ui/scroll-area";

const ClientLayout = ({ children }: { children: ReactNode }) => {
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
    <div className="relative w-full h-screen flex">
     
      <button
        type="button"
        className="absolute bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none shadow-lg"
        onClick={toggleFullscreen}
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize className="w-6 h-6" />
        ) : (
          <Maximize className="w-6 h-6" /> 
        )}
      </button>

  
      <div className="flex w-full h-full overflow-hidden">
        <Slider />

        <main className="flex-1 flex flex-col">
          <Header />
          <ScrollArea className="flex-1 overflow-y-auto">
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
