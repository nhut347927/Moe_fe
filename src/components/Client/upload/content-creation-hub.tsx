"use client";

import { Link } from "react-router-dom";
import { Pencil, Video } from "lucide-react";

export default function ContentCreationHub() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Content</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="" className="group">
          <div className="flex flex-col items-center transition-transform transform group-hover:scale-105">
            <Pencil className="w-24 h-24 text-white" />
            <h2 className="text-2xl font-bold mt-4">Create Post</h2>
            <p className="text-gray-400 mt-2">
              Share thoughts, images or videos
            </p>
          </div>
        </Link>
        <Link to="" className="group">
          <div className="flex flex-col items-center transition-transform transform group-hover:scale-105">
            <Video className="w-24 h-24 text-white" />
            <h2 className="text-2xl font-bold mt-4">Start Livestream</h2>
            <p className="text-gray-400 mt-2">
              Go live and interact with viewers
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
