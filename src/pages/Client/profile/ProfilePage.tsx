
import { Play, Heart, MessageCircle, Share2, Music, Video, Grid, Bookmark, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  return (
    <div className="h-screen max-h-screen p-2">
      <div className="h-full rounded-xl overflow-y-auto overflow-x-hidden scroll-but-hidden bg-white/50 dark:bg-zinc-800/70">
        {/* Header with blur effect */}
        <div className="relative h-64 w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="Profile cover"
            
            className="object-cover opacity-50 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
          <div className="flex items-end gap-6">
            <Avatar className="h-24 w-24 border-4 border-black">
              <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Profile picture" />
              <AvatarFallback>MV</AvatarFallback>
            </Avatar>
            <div className="mb-1">
              <h1 className="text-2xl font-bold">Minh Vũ</h1>
              <p className="text-zinc-400">@minhvu • Music Producer</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full border-zinc-700 bg-black/50 backdrop-blur-md">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button size="sm" className="rounded-full">
              Follow
            </Button>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="px-6 py-8">
        <div className="max-w-3xl">
          <p className="text-zinc-300 mb-4">
            Creating music that moves you. Based in Hanoi, Vietnam. New album "Echoes of Dawn" out now on all platforms.
          </p>

          <div className="flex gap-6 text-sm text-zinc-400 mb-6">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">1,245</span> Following
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">24.5K</span> Followers
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">3.2M</span> Likes
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="outline" className="bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800">
              Electronic Music
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800">
              Producer
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800">
              DJ
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800">
              Songwriter
            </Badge>
          </div>
        </div>
      </div>

      {/* Content tabs */}
      <Tabs defaultValue="all" className="px-6">
        <TabsList className="bg-zinc-900/50 border-b border-zinc-800 rounded-none w-full justify-start h-12 px-0">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none h-12 px-6"
          >
            <Grid className="h-4 w-4 mr-2" />
            All
          </TabsTrigger>
          <TabsTrigger
            value="music"
            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none h-12 px-6"
          >
            <Music className="h-4 w-4 mr-2" />
            Music
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none h-12 px-6"
          >
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none h-12 px-6"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <PostCard key={item} type={item % 2 === 0 ? "video" : "music"} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="music" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 3, 5].map((item) => (
              <PostCard key={item} type="music" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[2, 4, 6].map((item) => (
              <PostCard key={item} type="video" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 4].map((item) => (
              <PostCard key={item} type={item % 2 === 0 ? "video" : "music"} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  )
}

interface PostCardProps {
  type: "music" | "video"
}

function PostCard({ type }: PostCardProps) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-zinc-900 aspect-square">
      <img
        src={`/placeholder.svg?height=400&width=400&text=${type === "music" ? "Music" : "Video"}`}
        alt="Post thumbnail"
        width={400}
        height={400}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
        <div className="flex justify-end">
          {type === "music" ? (
            <Badge className="bg-emerald-500/80 hover:bg-emerald-500 border-0">
              <Music className="h-3 w-3 mr-1" />
              Track
            </Badge>
          ) : (
            <Badge className="bg-purple-500/80 hover:bg-purple-500 border-0">
              <Video className="h-3 w-3 mr-1" />
              Video
            </Badge>
          )}
        </div>

        <div>
          <h3 className="font-medium text-white mb-1">{type === "music" ? "Echoes of Dawn" : "Studio Session"}</h3>
          <p className="text-xs text-zinc-300 mb-3">Posted 2 days ago</p>

          <div className="flex justify-between items-center">
            <Button size="sm" variant="default" className="rounded-full px-4 gap-1">
              <Play className="h-4 w-4" />
              {type === "music" ? "Play" : "Watch"}
            </Button>

            <div className="flex gap-3">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="text-zinc-400 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </button>
              <button className="text-zinc-400 hover:text-white transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Play button that shows when not hovering */}
      <button className="absolute inset-0 m-auto h-12 w-12 bg-white rounded-full flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
        <Play className="h-5 w-5 text-black" fill="black" />
      </button>
    </div>
  )
}

