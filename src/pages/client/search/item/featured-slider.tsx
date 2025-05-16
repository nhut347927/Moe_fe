"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react"

const featuredPosts = [
  {
    id: 1,
    title: "Hành trình chữa lành nội tâm",
    image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    user: {
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      username: "healing_soul",
      displayName: "Tâm An",
    },
    views: 1240,
    likes: 328,
  },
  {
    id: 2,
    title: "Phát triển bản thân trong thời đại số",
    image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    user: {
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      username: "growth_mindset",
      displayName: "Minh Triết",
    },
    views: 2150,
    likes: 542,
  },
  {
    id: 3,
    title: "Sống khỏe mỗi ngày với 5 thói quen đơn giản",
    image: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    user: {
      avatar: "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
      username: "healthy_habits",
      displayName: "Sức Khỏe",
    },
    views: 1876,
    likes: 421,
  },
]

export default function FeaturedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)
  const post = featuredPosts[currentSlide]

  return (
    <div className="relative h-[450px] overflow-hidden rounded-3xl shadow-xl">
      {/* Background image */}
      <div className="absolute inset-0 transition-all duration-700 ease-in-out scale-100 hover:scale-105">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Slide indicators */}
      <div className="absolute top-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out ${
              index === currentSlide
                ? "bg-white scale-125 shadow-sm"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold">{post.title}</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
              <img
                src={post.user.avatar}
                alt={post.user.displayName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{post.user.displayName}</p>
              <p className="text-sm text-gray-300">@{post.user.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="text-sm">{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span className="text-sm">{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-[45%] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/60"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-[45%] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/60"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
