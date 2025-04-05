import React, { useState, useEffect } from "react";
import {
  connect,
  createLocalTracks,
  Room,
  LocalTrack,
  LocalAudioTrack,
  LocalVideoTrack,
  RemoteParticipant,
  RemoteVideoTrack,
  RemoteAudioTrack,
} from "twilio-video";

interface VideoRoomProps {
  token: string;
  roomCode: string;
}

const VideoRoom: React.FC<VideoRoomProps> = ({ token, roomCode }) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [tracks, setTracks] = useState<LocalTrack[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
  const [pinnedParticipantTrack, setPinnedParticipantTrack] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<"grid" | "sidebar">("grid");

  useEffect(() => {
    const joinRoom = async () => {
      try {
        setLoading(true);
        const localTracks = await createLocalTracks({ audio: false, video: false });
        console.log("Local tracks created:", localTracks);
        setTracks(localTracks);
        const joinedRoom = await connect(token, { name: roomCode, tracks: localTracks });
        console.log("Room joined:", joinedRoom);
        setRoom(joinedRoom);
        setLoading(false);
        setParticipants(Array.from(joinedRoom.participants.values()));

        // Gắn track cho các participant hiện có
        joinedRoom.participants.forEach((participant) => {
          attachParticipantTracks(participant);
          participant.on("trackSubscribed", () => {
            // Khi có track mới, cập nhật lại participants để re-render
            setParticipants((prev) => [...prev]);
          });
          participant.on("trackUnsubscribed", () => {
            // Khi track bị xóa, cập nhật lại participants
            setParticipants((prev) => [...prev]);
          });
        });

        // Bắt sự kiện khi có participant mới
        joinedRoom.on("participantConnected", (participant) => {
          setParticipants((prev) => [...prev, participant]);
          attachParticipantTracks(participant);
          participant.on("trackSubscribed", () => {
            setParticipants((prev) => [...prev]);
          });
          participant.on("trackUnsubscribed", () => {
            setParticipants((prev) => [...prev]);
          });
        });

        joinedRoom.on("participantDisconnected", (participant) => {
          detachParticipantTracks(participant);
          setParticipants((prev) => prev.filter((p) => p !== participant));
        });

        joinedRoom.once("disconnected", cleanUp);
      } catch (error) {
        console.error("Lỗi khi vào phòng:", error);
        setLoading(false);
      }
    };

    if (token) joinRoom();

    return () => {
      cleanUp();
    };
  }, [token]);

  const cleanUp = () => {
    if (room) {
      room.localParticipant.tracks.forEach((publication) => {
        if (publication.track.kind === "audio" || publication.track.kind === "video") {
          (publication.track as LocalAudioTrack | LocalVideoTrack).stop();
          (publication.track as LocalAudioTrack | LocalVideoTrack).detach();
        }
      });
      room.disconnect();
      setRoom(null);
    }
    setTracks([]);
  };

  const attachTrack = (track: RemoteVideoTrack | RemoteAudioTrack | LocalVideoTrack, containerId: string) => {
    let container = document.getElementById(containerId) as HTMLDivElement;
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.querySelector(".video-container")?.appendChild(container);
    }
    const trackElement = track.attach();
    container.appendChild(trackElement);
  };

  const attachParticipantTracks = (participant: RemoteParticipant) => {
    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed && publication.track) {
        attachTrack(
          publication.track as RemoteVideoTrack | RemoteAudioTrack,
          `video-${participant.sid}-${publication.trackSid}`
        );
      }
    });
  };

  const detachParticipantTracks = (participant: RemoteParticipant) => {
    participant.tracks.forEach((publication) => {
      if (publication.track) {
        (publication.track as RemoteVideoTrack | RemoteAudioTrack).detach().forEach((el) => el.remove());
      }
    });
  };

  const toggleMic = async () => {
    if (isMuted) {
      const audioTrack = await createLocalTracks({ audio: true });
      setTracks((prev) => [...prev, ...audioTrack]);
      room?.localParticipant.publishTracks(audioTrack);
    } else {
      tracks.forEach((track) => {
        if (track.kind === "audio") {
          (track as LocalAudioTrack).stop();
          room?.localParticipant.unpublishTrack(track);
        }
      });
      setTracks((prev) => prev.filter((t) => t.kind !== "audio"));
    }
    setIsMuted((prev) => !prev);
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      const videoTrack = await createLocalTracks({ video: { width: 640 } });
      setTracks((prev) => [...prev, ...videoTrack]);
      room?.localParticipant.publishTracks(videoTrack);
    } else {
      tracks.forEach((track) => {
        if (track.kind === "video" && !track.name.includes("screen")) {
          (track as LocalVideoTrack).stop();
          room?.localParticipant.unpublishTrack(track);
        }
      });
      setTracks((prev) => prev.filter((t) => t.kind !== "video" || t.name.includes("screen")));
    }
    setIsCameraOn((prev) => !prev);
  };

  const shareScreen = async () => {
    if (!room) return;

    if (!isScreenSharing) {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = new LocalVideoTrack(stream.getTracks()[0], { name: "screen" });
      await room.localParticipant.publishTrack(screenTrack);
      setTracks((prev) => [...prev, screenTrack]);
      stream.getTracks()[0].onended = () => {
        room.localParticipant.unpublishTrack(screenTrack);
        setTracks((prev) => prev.filter((t) => t !== screenTrack));
        setIsScreenSharing(false);
      };
    } else {
      const screenTrack = tracks.find((t) => t.kind === "video" && t.name.includes("screen")) as LocalVideoTrack;
      if (screenTrack) {
        room.localParticipant.unpublishTrack(screenTrack);
        screenTrack.stop();
        setTracks((prev) => prev.filter((t) => t !== screenTrack));
      }
    }
    setIsScreenSharing((prev) => !prev);
  };

  const handlePin = (trackId: string | null) => {
    if (pinnedParticipantTrack === trackId) {
      setPinnedParticipantTrack(null);
      setLayoutMode("grid");
    } else {
      setPinnedParticipantTrack(trackId);
      setLayoutMode("sidebar");
    }
  };

  const renderTrack = (
    sid: string,
    track: LocalVideoTrack | RemoteVideoTrack | null,
    identity: string,
    isLocal = false,
    trackSid?: string
  ) => {
    const trackId = isLocal ? (track as LocalVideoTrack)?.id : (track as RemoteVideoTrack)?.sid;
    const uniqueId = `${sid}-${trackSid || trackId || "no-video"}`;
    const isPinned = pinnedParticipantTrack === uniqueId;

    return (
      <div
        key={uniqueId}
        id={`video-${uniqueId}`}
        className={`relative flex items-center justify-center bg-gray-700 rounded-lg overflow-hidden ${
          layoutMode === "grid"
            ? "col-span-1 row-span-1 w-48 h-36"
            : isPinned
            ? "w-full h-96"
            : "w-32 h-24"
        }`}
      >
        {!track ? (
          <div className="text-4xl font-bold text-white">{identity.charAt(0).toUpperCase()}</div>
        ) : (
          <video
            ref={(el) => {
              if (el && track) {
                track.attach(el);
              }
            }}
            autoPlay
            muted={isLocal}
          />
        )}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {identity} {track?.name?.includes("screen") ? "(Screen)" : ""}
        </div>
        <button
          onClick={() => handlePin(uniqueId)}
          className={`absolute top-2 right-2 text-white px-2 py-1 rounded ${
            isPinned ? "bg-red-600 hover:bg-red-500" : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isPinned ? "Unpin" : "Pin"}
        </button>
      </div>
    );
  };

  const renderParticipantTracks = (participant: RemoteParticipant | null, isLocal = false) => {
    const sid = isLocal ? "local" : participant?.sid || "unknown";
    const identity = isLocal ? "You" : participant?.identity || "Unknown";
    const videoTracks = isLocal
      ? tracks.filter((t) => t.kind === "video") as LocalVideoTrack[]
      : Array.from(participant?.videoTracks.values() || [])
          .map((pub) => pub.track)
          .filter(Boolean) as RemoteVideoTrack[];

    if (!videoTracks.length) {
      return [renderTrack(sid, null, identity, isLocal)];
    }

    return videoTracks.map((track) =>
      renderTrack(sid, track, identity, isLocal, isLocal ? (track as LocalVideoTrack).id : (track as RemoteVideoTrack).sid)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Twilio Video Chat</h1>

      {loading ? (
        <p className="text-lg">Đang kết nối...</p>
      ) : room ? (
        <>
          <div className="w-full max-w-5xl p-4 bg-gray-800 rounded-lg video-container">
            {layoutMode === "grid" ? (
              <div className="grid grid-cols-3 gap-4">
                {renderParticipantTracks(null, true)}
                {participants.map((participant) => renderParticipantTracks(participant))}
              </div>
            ) : (
              <div className="flex">
                <div className="flex-grow">
                  {pinnedParticipantTrack ? (
                    (() => {
                      const [sid, trackSid] = pinnedParticipantTrack.split("-");
                      if (sid === "local") {
                        const track = tracks.find((t) => t.id === trackSid) as LocalVideoTrack;
                        return renderTrack(sid, track, "You", true, trackSid);
                      }
                      const participant = participants.find((p) => p.sid === sid);
                      const track = Array.from(participant?.videoTracks.values() || [])
                        .find((pub) => pub.track?.sid === trackSid)
                        ?.track as RemoteVideoTrack;
                      return renderTrack(sid, track, participant?.identity || "Unknown", false, trackSid);
                    })()
                  ) : (
                    renderParticipantTracks(null, true)[0]
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={toggleMic}
              className={`px-4 py-2 rounded-lg text-white ${isMuted ? "bg-red-600" : "bg-green-600"}`}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>

            <button
              onClick={toggleCamera}
              className={`px-4 py-2 rounded-lg text-white ${isCameraOn ? "bg-green-600" : "bg-red-600"}`}
            >
              {isCameraOn ? "Tắt Camera" : "Bật Camera"}
            </button>

            <button
              onClick={shareScreen}
              className={`px-4 py-2 rounded-lg text-white ${isScreenSharing ? "bg-red-600" : "bg-blue-600"}`}
            >
              {isScreenSharing ? "Dừng Chia Sẻ" : "Chia Sẻ Màn Hình"}
            </button>

            <button
              onClick={cleanUp}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Rời Phòng
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg text-red-500">Không thể kết nối vào phòng.</p>
      )}
    </div>
  );
};

export default VideoRoom;