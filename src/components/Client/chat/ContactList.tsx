"use client"

import { useState } from "react"
import { Search, MoreVertical } from "lucide-react"

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away" | "busy";
  lastMessage: string;
  lastMessageTime: string;
}

interface ContactListProps {
  onSelectContact: (contact: Contact) => void;
  selectedContact: Contact | null;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "See you tomorrow!",
    lastMessageTime: "10:30 AM",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Thanks for your help",
    lastMessageTime: "Yesterday",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "How about lunch?",
    lastMessageTime: "2:15 PM",
  },
  {
    id: 4,
    name: "Diana Prince",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastMessage: "Meeting at 3 PM",
    lastMessageTime: "1:30 PM",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    lastMessage: "Mission accomplished",
    lastMessageTime: "Monday",
  },
]

export default function ContactList({ onSelectContact, selectedContact }: ContactListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = contacts.filter((contact) => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Chats</h2>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              selectedContact && selectedContact.id === contact.id ? "bg-gray-200 dark:bg-gray-600" : ""
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <div className="relative">
              <img
                src={contact.avatar || "/placeholder.svg"}
                alt={contact.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  contact.status === "online"
                    ? "bg-green-500"
                    : contact.status === "away"
                      ? "bg-yellow-500"
                      : contact.status === "busy"
                        ? "bg-red-500"
                        : "bg-gray-500"
                }`}
              ></span>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold">{contact.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm truncate">{contact.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{contact.lastMessageTime}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
