import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen">
      {children} <Toaster />
    </div>
  );
};

export default AuthLayout;
