import React, { ReactNode, useState } from "react";
import { Maximize, Minimize } from "lucide-react"; 
import Header from "../Common/Client/Header";
import SliderBar from "../Common/Client/SliderBar";
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
        className="absolute bottom-2 right-2 p-2 z-50"
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
        <SliderBar />

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
