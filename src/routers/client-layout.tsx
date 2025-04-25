import Header from "../pages/client/header";
import SliderBar from "../pages/client/slider-bar";
import { Toaster } from "@/components/ui/toaster";
// import { useAppSelector } from "@/store/hooks";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
 // const backgroundUrl = useAppSelector((state) => state.background.imageUrl);

  return (
    <div className="relative flex w-full h-screen bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* Background Layer */}
      {/* <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center blur-xl opacity-50 dark:opacity-0"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      /> */}

      {/* UI Layer */}
      <Toaster />
      <div className="flex w-full h-full overflow-hidden relative z-10">
        <SliderBar />
        <main className="flex-1 flex flex-col">
          <Header />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
