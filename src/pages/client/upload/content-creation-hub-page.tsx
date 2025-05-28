"use client";

import { Link } from "react-router-dom";
import { Pencil, Video } from "lucide-react";

export default function ContentCreationHub() {
  return (
    <div className="h-screen max-h-screen p-2 ">
      <div className="h-full rounded-3xl overflow-y-auto scroll-but-hidden ">
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 ">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-16">
            Create New Content
          </h1>

          <div className="flex flex-col sm:flex-row gap-20">
            <Link to="/client/upload/upload-file" className="group">
              <div className="flex flex-col items-center p-6 rounded-xl ">
                <Pencil className="w-20 h-20 text-zinc-800 dark:text-white group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Create Post
                </h2>
                <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">
                  Share thoughts, images or videos
                </p>
              </div>
            </Link>

            <Link to="/client/upload/live" className="group">
              <div className="flex flex-col items-center p-6 rounded-xl ">
                <Video className="w-20 h-20 text-zinc-800 dark:text-white group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                  Start Livestream
                </h2>
                <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">
                  Go live and interact with viewers
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
