"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface Post {
  id: string
  thumbnail: string
  type?: "image" | "video"
  title: string
  views: number
  createdAt: string
  user: {
    avatarUrl: string
    displayName: string
  }
}

interface Account {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  followers: number
  isFollowing?: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    thumbnail: "https://source.unsplash.com/random/400x400?music",
    type: "image",
    title: "Giai điệu mùa hè",
    views: 1200,
    createdAt: "2025-06-12T10:00:00",
    user: {
      avatarUrl: "https://i.pravatar.cc/150?img=10",
      displayName: "Trung Music",
    },
  },
  {
    id: "2",
    thumbnail: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    type: "video",
    title: "MV mới ra",
    views: 845,
    createdAt: "2025-06-10T16:00:00",
    user: {
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      displayName: "Mai Singer",
    },
  },
  {
    id: "3",
    thumbnail: "https://source.unsplash.com/random/400x400?guitar",
    type: "image",
    title: "Tình ca buồn",
    views: 302,
    createdAt: "2025-06-09T09:30:00",
    user: {
      avatarUrl: "https://i.pravatar.cc/150?img=7",
      displayName: "Hải Acoustic",
    },
  },
   {
    id: "4",
    thumbnail: "https://source.unsplash.com/random/400x400?guitar",
    type: "image",
    title: "Tình ca buồn",
    views: 302,
    createdAt: "2025-06-09T09:30:00",
    user: {
      avatarUrl: "https://i.pravatar.cc/150?img=7",
      displayName: "Hải Acoustic",
    },
  },
   {
    id: "5",
    thumbnail: "https://source.unsplash.com/random/400x400?guitar",
    type: "image",
    title: "Tình ca buồn",
    views: 302,
    createdAt: "2025-06-09T09:30:00",
    user: {
      avatarUrl: "https://i.pravatar.cc/150?img=7",
      displayName: "Hải Acoustic",
    },
  },
]

const mockAccounts: Account[] = [
  {
    id: "a1",
    username: "nguyenmusic",
    displayName: "Nguyễn Âm Nhạc",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    followers: 421,
    isFollowing: false,
  },
  {
    id: "a2",
    username: "tranbeats",
    displayName: "Trần Giai Điệu",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    followers: 1021,
    isFollowing: true,
  },
    {
    id: "a3",
    username: "tranbeats",
    displayName: "Trần Giai Điệu",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    followers: 1021,
    isFollowing: true,
  },
    {
    id: "a4",
    username: "tranbeats",
    displayName: "Trần Giai Điệu",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    followers: 1021,
    isFollowing: true,
  },
]

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase()

      if (term === "") {
        setPosts(mockPosts)
        setAccounts(mockAccounts)
      } else {
        setPosts(mockPosts.filter((p) => p.title.toLowerCase().includes(term)))
        setAccounts(
          mockAccounts.filter(
            (a) =>
              a.displayName.toLowerCase().includes(term) ||
              a.username.toLowerCase().includes(term)
          )
        )
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const toggleFollow = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, isFollowing: !acc.isFollowing } : acc
      )
    )
  }

  return (
    <div className="w-full h-screen max-h-screen max-w-lg mx-auto px-3 py-4 flex flex-col">
      {/* Nút back + ô tìm kiếm trên cùng 1 hàng */}
      <div className="flex items-center gap-2 mb-4">
        <Link to="/" className="text-zinc-700 dark:text-zinc-200">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <Input
          placeholder="Tìm bài viết hoặc tài khoản..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full h-11 flex justify-around bg-muted rounded-2xl mb-4 ">
          <TabsTrigger value="posts" className="flex-1 rounded-xl data-[state=active]:bg-background py-2 text-sm font-medium">
            Bài viết
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex-1 rounded-xl data-[state=active]:bg-background py-2 text-sm font-medium">
            Tài khoản
          </TabsTrigger>
        </TabsList>

        {/* Bài viết */}
        <TabsContent value="posts" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            {posts.length === 0 ? (
              <p className="text-center text-zinc-500 dark:text-zinc-400 mt-10">Không có bài viết</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {posts.map((post) => (
                  <div key={post.id} className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <div className="aspect-square">
                      {post.type === "video" ? (
                        <video src={post.thumbnail} muted loop className="w-full h-full object-cover" />
                      ) : (
                        <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="px-2 py-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={post.user.avatarUrl} />
                          <AvatarFallback>{post.user.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium truncate">
                          {post.user.displayName}
                        </span>
                      </div>
                      <p className="text-sm font-semibold truncate">{post.title}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {post.views} lượt xem • {post.createdAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        {/* Tài khoản */}
        <TabsContent value="accounts" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            {accounts.length === 0 ? (
              <p className="text-center text-zinc-500 dark:text-zinc-400 mt-10">Không tìm thấy tài khoản</p>
            ) : (
              <div className="space-y-3">
                {accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 p-3 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={acc.avatarUrl} />
                        <AvatarFallback>{acc.displayName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {acc.displayName}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">@{acc.username}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{acc.followers} followers</p>
                      </div>
                    </div>
                    <Button
                      variant={acc.isFollowing ? "outline" : "default"}
                      size="sm"
                      className="rounded-full text-xs px-4"
                      onClick={() => toggleFollow(acc.id)}
                    >
                      {acc.isFollowing ? "Đã follow" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
