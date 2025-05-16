import { useState } from "react"
import Post from "./post"

const initialPosts = [
  {
    id: "1",
    title: "Khám phá vẻ đẹp Đà Lạt mùa thu",
    imageUrl: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    views: 1500,
    likes: 120,
  },
  {
    id: "2",
    title: "5 mẹo giúp bạn làm việc hiệu quả hơn",
    imageUrl: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    views: 980,
    likes: 90,
  },
  {
    id: "3",
    title: "Cách xây dựng thói quen đọc sách mỗi ngày",
    imageUrl: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    views: 2345,
    likes: 187,
  },
  {
    id: "4",
    title: "Thực đơn healthy cho người mới bắt đầu",
    imageUrl: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    views: 3050,
    likes: 240,
  },
  {
    id: "5",
    title: "Hành trình học lập trình từ con số 0",
    imageUrl: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    views: 450,
    likes: 30,
  },
]

export default function PostGrid() {
  const [posts, setPosts] = useState(
    initialPosts.map((post) => ({ ...post, liked: false }))
  )

  const handleToggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Featured Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            imageUrl={post.imageUrl}
            views={post.views}
            likes={post.likes}
            liked={post.liked}
            onLikeToggle={() => handleToggleLike(post.id)}
          />
        ))}
      </div>
    </div>
  )
}
