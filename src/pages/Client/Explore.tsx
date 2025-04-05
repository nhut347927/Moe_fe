import { PlaylistSection } from "./playlist-section"

export default function HomePage() {
  // Dữ liệu mẫu cho các playlist
  const newReleases = [
    {
      id: "1",
      title: "Nhạc Mới Tháng 3/2025",
      description: "Cập nhật những bài hát mới nhất trong tháng",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 25,
      creator: "Spotify",
    },
    {
      id: "2",
      title: "V-Pop Tháng 3/2025",
      description: "Những bài hát V-Pop mới nhất",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 20,
      creator: "Spotify",
    },
    {
      id: "3",
      title: "K-Pop Tháng 3/2025",
      description: "Những bài hát K-Pop mới nhất",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 18,
      creator: "Spotify",
    },
    {
      id: "4",
      title: "US-UK Tháng 3/2025",
      description: "Những bài hát US-UK mới nhất",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 22,
      creator: "Spotify",
    },
    {
      id: "5",
      title: "Indie Tháng 3/2025",
      description: "Những bài hát Indie mới nhất",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 15,
      creator: "Spotify",
    },
  ]

  const todayHotHits = [
    {
      id: "6",
      title: "Top 50 Việt Nam",
      description: "Những bài hát được nghe nhiều nhất hôm nay tại Việt Nam",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 50,
      creator: "Spotify",
    },
    {
      id: "7",
      title: "Viral Hits",
      description: "Đang viral trên mạng xã hội",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 30,
      creator: "Spotify",
    },
    {
      id: "8",
      title: "Hot Hits Vietnam",
      description: "Những bài hát hot nhất hôm nay",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 40,
      creator: "Spotify",
    },
    {
      id: "9",
      title: "Remix Việt Nổi Bật",
      description: "Những bản remix Việt đang hot",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 25,
      creator: "Spotify",
    },
    {
      id: "10",
      title: "Dance Việt Nổi Bật",
      description: "Những bài hát Dance Việt đang hot",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 20,
      creator: "Spotify",
    },
  ]

  const weeklyHotHits = [
    {
      id: "11",
      title: "Top 50 Tuần Này",
      description: "Những bài hát được nghe nhiều nhất tuần này",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 50,
      creator: "Spotify",
    },
    {
      id: "12",
      title: "V-Pop Tuần Này",
      description: "V-Pop nổi bật tuần này",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 30,
      creator: "Spotify",
    },
    {
      id: "13",
      title: "K-Pop Tuần Này",
      description: "K-Pop nổi bật tuần này",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 30,
      creator: "Spotify",
    },
    {
      id: "14",
      title: "US-UK Tuần Này",
      description: "US-UK nổi bật tuần này",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 30,
      creator: "Spotify",
    },
    {
      id: "15",
      title: "Indie Tuần Này",
      description: "Indie nổi bật tuần này",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 30,
      creator: "Spotify",
    },
  ]

  const yearlyTrends = [
    {
      id: "16",
      title: "Xu Hướng 2025",
      description: "Những bài hát định hình xu hướng năm 2025",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 100,
      creator: "Spotify",
    },
    {
      id: "17",
      title: "Best of 2025 - V-Pop",
      description: "Những bài V-Pop hay nhất 2025",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 50,
      creator: "Spotify",
    },
    {
      id: "18",
      title: "Best of 2025 - K-Pop",
      description: "Những bài K-Pop hay nhất 2025",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 50,
      creator: "Spotify",
    },
    {
      id: "19",
      title: "Best of 2025 - US-UK",
      description: "Những bài US-UK hay nhất 2025",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 50,
      creator: "Spotify",
    },
    {
      id: "20",
      title: "Best of 2025 - Indie",
      description: "Những bài Indie hay nhất 2025",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 50,
      creator: "Spotify",
    },
  ]

  const friendsCircle = [
    {
      id: "21",
      title: "Nhóm bạn thân",
      description: "Playlist được tạo bởi nhóm bạn thân của bạn",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 45,
      creator: "Nhóm bạn thân",
    },
    {
      id: "22",
      title: "Party Cuối Tuần",
      description: "Playlist cho buổi party cuối tuần với bạn bè",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 35,
      creator: "Minh Anh",
    },
    {
      id: "23",
      title: "Chill Cùng Bạn Bè",
      description: "Nhạc chill để nghe cùng bạn bè",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 30,
      creator: "Hoàng Nam",
    },
    {
      id: "24",
      title: "Road Trip",
      description: "Playlist cho chuyến đi cùng bạn bè",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 40,
      creator: "Thu Hà",
    },
    {
      id: "25",
      title: "Kỷ Niệm Nhóm",
      description: "Những bài hát gắn liền với kỷ niệm nhóm",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 25,
      creator: "Nhóm bạn thân",
    },
  ]

  const peopleAlsoListen = [
    {
      id: "26",
      title: "Nhạc Trẻ Gây Nghiện",
      description: "Những bài nhạc trẻ được nhiều người nghe",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 40,
      creator: "Spotify",
    },
    {
      id: "27",
      title: "Lofi Chill",
      description: "Lofi được nhiều người yêu thích",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 35,
      creator: "Spotify",
    },
    {
      id: "28",
      title: "Acoustic Chill",
      description: "Acoustic được nhiều người yêu thích",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 30,
      creator: "Spotify",
    },
    {
      id: "29",
      title: "Nhạc Trữ Tình Hay Nhất",
      description: "Nhạc trữ tình được nhiều người yêu thích",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 45,
      creator: "Spotify",
    },
    {
      id: "30",
      title: "Rap Việt Nổi Bật",
      description: "Rap Việt được nhiều người yêu thích",
      imageUrl: "/placeholder.svg?height=200&width=200",
      totalTracks: 35,
      creator: "Spotify",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Khám phá</h1>

        <div className="space-y-10">
          <PlaylistSection title="Các Bài Đăng Mới" playlists={newReleases} />
          <PlaylistSection title="Hot Hit Hôm Nay" playlists={todayHotHits} />
          <PlaylistSection title="Hot Hit Tuần" playlists={weeklyHotHits} />
          <PlaylistSection title="Xu Hướng Năm Nay" playlists={yearlyTrends} />
          <PlaylistSection title="Vòng Bạn Bè" playlists={friendsCircle} />
          <PlaylistSection title="Mọi Người Cũng Nghe" playlists={peopleAlsoListen} />
        </div>
      </div>
    </div>
  )
}

