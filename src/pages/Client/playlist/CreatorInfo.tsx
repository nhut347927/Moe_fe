import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const CreatorInfo: React.FC = () => (
  <div className="flex items-center gap-3">
    <Avatar className="h-10 w-10">
      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
      <AvatarFallback>UN</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-medium">Nguyễn Văn A</p>
      <Link
        to={"/client/profile"}
        className="text-zinc-500 text-sm hover:underline hover:text-zinc-400"
      >
        @nhutnguyen
      </Link>
    </div>
  </div>
);

export default CreatorInfo;