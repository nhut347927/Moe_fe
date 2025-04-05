import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Cookies from "js-cookie";

// Đồng bộ với ChatResponse từ server
interface Message {
  id: number;
  img?: string | null; // Img có thể null từ ChatResponse
  name?: string | null; // Name có thể null
  userRole?: string | null; // UserRole có thể null
  content?: string | null; // Content có thể null
}

interface ChatBoxProps {
  roomCode: string;
}

function ChatBox({ roomCode }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getAuthToken = () => Cookies.get("accesstoken") || "";

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      console.error("🚫 Token không tồn tại trong cookie.");
      return;
    }

    const hubUrl = `https://localhost:7186/meetHub?roomId=${roomCode}`;
    console.log("🔗 Connecting to:", hubUrl);

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => getAuthToken(),
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("✅ Connected to SignalR");
        return newConnection.invoke("GetListChat", roomCode);
      })
      .catch((err) => console.error("🚨 Connection error:", err));

    newConnection.on("ChatListUpdated", (chatMessages: Message[]) => {
      console.log("📩 Received ChatListUpdated:", chatMessages);
      messagesRef.current = chatMessages;
      setMessages(chatMessages);
    });

    newConnection.on("Error", (error: string) => {
      console.error("🚨 Server error:", error);
    });

    return () => {
      newConnection.stop().catch((err) => console.error("❌ Error stopping connection:", err));
    };
  }, [roomCode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const waitForConnection = async () => {
    if (!connection) return false;

    let maxAttempts = 5;
    while (connection.state !== signalR.HubConnectionState.Connected && maxAttempts > 0) {
      console.log("🔄 Đang chờ kết nối SignalR...");
      await new Promise((res) => setTimeout(res, 1000));
      maxAttempts--;
    }
    return connection.state === signalR.HubConnectionState.Connected;
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "" || !connection) return;

    const isConnected = await waitForConnection();
    if (!isConnected) {
      console.error("🚫 Không thể gửi tin nhắn: SignalR chưa kết nối.");
      return;
    }

    try {
      await connection.invoke("CreateMessage", roomCode, inputMessage); // Sửa roomId thành roomCode
      setInputMessage("");
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-600 text-white p-2 rounded-lg">Mở Chat</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed bottom-10 right-10 w-96 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3">
            <h2 className="text-lg font-bold">Phòng Chat</h2>
            <Dialog.Close asChild>
              <button className="text-white">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Danh sách tin nhắn */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-100">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Chưa có tin nhắn nào.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-2 mb-2 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-center space-x-2">
                    {msg.img ? (
                      <img
                        src={msg.img}
                        alt={msg.name || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                        {msg.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {msg.name || "Unknown"} <span className="text-xs text-gray-500">({msg.userRole || "Unknown"})</span>
                      </p>
                      <p className="text-gray-700">{msg.content || "Tin nhắn trống"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input gửi tin nhắn */}
          <div className="flex p-2 border-t bg-white">
            <input
              ref={inputRef}
              type="text"
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              Gửi
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ChatBox;