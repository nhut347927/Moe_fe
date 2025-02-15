"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import ContactList from "./chat/ContactList";
import ChatWindow from "./chat/ChatWindow";
import MessageInput from "./chat/MessageInput";
import { Moon, Sun } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status?: string; // Thêm trạng thái online/offline nếu cần
  lastMessage?: string;
  lastMessageTime?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // Chuyển đổi messages sang kiểu Message[]
  const formattedMessages: Message[] = messages.map((msg) => ({
    id: msg.id,
    sender: msg.role || "user", // Nếu API không có sender thì mặc định là "user"
    content: msg.content,
    timestamp: new Date().toISOString(), // Thêm timestamp nếu thiếu
  }));

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Danh sách liên hệ */}
      <div className="w-1/3 md:w-1/4 border-r border-gray-200 dark:border-gray-700">
        <ContactList
          onSelectContact={(contact: Contact) => setSelectedContact(contact)}
          selectedContact={selectedContact}
        />
      </div>

      {/* Cửa sổ chat */}
      <div className="w-2/3 md:w-3/4 flex flex-col">
        <ChatWindow messages={formattedMessages} selectedContact={selectedContact ?? undefined} />
        <MessageInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      </div>

      {/* Nút chuyển đổi chế độ tối */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
}
