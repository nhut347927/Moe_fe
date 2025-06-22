import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="w-full h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      <Toaster />
      {/* <Header/> */}
      <Outlet />
    </div>
  );
};

export default ClientLayout;
