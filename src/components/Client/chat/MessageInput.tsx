"use client";

import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

interface MessageInputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MessageInput({
  input,
  handleInputChange,
  handleSubmit,
}: MessageInputProps) {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    handleInputChange({
      target: { value: input + emoji },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center">
        <button
          type="button"
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 p-2 mx-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring"
          >
            <Smile className="h-5 w-5" />
          </button>
          {showEmoji && (
            <div className="absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="grid grid-cols-6 gap-1">
                {["😊", "😂", "😍", "🤔", "👍", "❤️"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
