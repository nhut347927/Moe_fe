"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface UserSuggestionProps {
  name: string
  followers: string
  imageUrl: string
}

export function UserSuggestion({ name, followers, imageUrl }: UserSuggestionProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <Card className="min-w-[180px] overflow-hidden transition-all hover:bg-gray-50">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="font-semibold">{name}</h3>
          <p className="mt-1 text-xs text-gray-500">{followers} người theo dõi</p>
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            className={`mt-3 w-full ${isFollowing ? "border-black text-black hover:bg-gray-100" : "bg-black text-white hover:bg-black/80"}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? (
              "Đang theo dõi"
            ) : (
              <>
                <Plus className="mr-1 h-3 w-3" />
                Theo dõi
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
