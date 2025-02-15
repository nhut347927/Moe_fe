"use client"

import { useEffect, useRef } from "react"
import { Phone, Video, Info } from "lucide-react"

interface Message {
  id: number
  content: string
  sender: "user" | "contact"
  timestamp: string
}

interface Contact {
  name: string
  username?: string
  avatar?: string
}

interface ChatWindowProps {
  messages: Message[]
  selectedContact?: Contact
}

const sampleMessages: Message[] = [
  { id: 1, content: "Hi there! How are you doing?", sender: "user", timestamp: "10:30 AM" },
  {
    id: 2,
    content: "Hello! I'm doing great, thanks for asking. How about you?",
    sender: "contact",
    timestamp: "10:32 AM",
  },
  { id: 3, content: "I'm good too! Just working on some projects.", sender: "user", timestamp: "10:33 AM" },
  {
    id: 4,
    content: "That sounds interesting! What kind of projects are you working on?",
    sender: "contact",
    timestamp: "10:35 AM",
  },
  {
    id: 5,
    content: "I'm developing a new chat application. It's challenging but fun!",
    sender: "user",
    timestamp: "10:36 AM",
  },
  {
    id: 6,
    content: "Wow, that's awesome! I'd love to hear more about it when you have time.",
    sender: "contact",
    timestamp: "10:38 AM",
  },
]

export default function ChatWindow({ messages, selectedContact }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const allMessages = [...sampleMessages, ...messages]

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {selectedContact && (
        <div className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={selectedContact.avatar || "/placeholder.svg"}
                alt={selectedContact.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedContact.name}</h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  @{selectedContact.username || selectedContact.name.toLowerCase().replace(" ", "_")}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Video className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">
        {allMessages.map((message) => (
          <div key={message.id} className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender !== "user" && (
              <img
                src={selectedContact?.avatar || "/placeholder.svg"}
                alt={selectedContact?.name || "Contact"}
                className="w-8 h-8 rounded-full mr-2 self-end"
              />
            )}
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === "user" ? "order-1" : "order-2"}`}>
              <div
                className={`p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                {message.content}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-right" : "text-left"
                } text-gray-500 dark:text-gray-400`}
              >
                {message.timestamp}
              </div>
            </div>
            {message.sender === "user" && (
              <img src="/placeholder.svg?height=32&width=32" alt="You" className="w-8 h-8 rounded-full ml-2 self-end" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
