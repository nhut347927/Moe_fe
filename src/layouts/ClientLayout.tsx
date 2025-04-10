import { ReactNode } from "react";
import Header from "./Client/Header";
import SliderBar from "./Client/SliderBar";
import { Toaster } from "@/components/ui/toaster";
import { useAppSelector } from "@/store/hooks";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const backgroundUrl = useAppSelector((state) => state.background.imageUrl);

  return (
    <div className="relative flex w-full h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Background Layer */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center blur-xl opacity-50"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />

      {/* UI Layer */}
      <Toaster />
      <div className="flex w-full h-full overflow-hidden relative z-10">
        <SliderBar />
        <main className="flex-1 flex flex-col">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
