import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import img4 from "../../../assets/images/girl.png";
const images = [
  img4,
  img4,
  img4,
]

export default function PostMultiImg() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTextPermanentlyHidden, setIsTextPermanentlyHidden] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        nextImage()
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [isHovered])

  const handleClick = () => {
    if (!isTextPermanentlyHidden) {
      setIsTextPermanentlyHidden(true)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Artistic image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <AnimatePresence>
          {!isTextPermanentlyHidden && (
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
                initial={{ opacity: 1 }}
                animate={{ opacity: isHovered ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-2">Artistic Exploration</h2>
                <p className="text-sm opacity-80">A journey through visual aesthetics</p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation()
            prevImage()
          }}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation()
            nextImage()
          }}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </motion.div>
    </div>
  )
}

