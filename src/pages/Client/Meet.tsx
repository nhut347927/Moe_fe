"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoMeet from "./video-meet";
import ChatBox from "./ChatDialog";
export default function MeetingRoom() {
  const params = useParams();
  const roomCode = params.roomCode as string;
  const token = params.token as string;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for Twilio connection
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-medium text-gray-700">
            Connecting to meeting...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div className="absolute bg-slate-200 z-10 bottom-0"><ChatBox roomCode={roomCode} /></div>
      <VideoMeet roomCode={roomCode} token={token} />
    </div>
  );
}
