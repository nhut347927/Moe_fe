"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X, ImageIcon, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function PostCreator() {
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const [fileType, setFileType] = useState<"image" | "video" | null>(null)
  const [showSlider, setShowSlider] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const type = acceptedFiles[0].type.startsWith("image/") ? "image" : "video"
      setFileType(type)

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )

      setFiles((prevFiles) => {
        if (type === "image") {
          return [...prevFiles, ...newFiles]
        } else {
          return [newFiles[0]]
        }
      })
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    multiple: true,
  })

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file)
    setFiles(newFiles)
    if (newFiles.length === 0) setFileType(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Submitting:", { content, files })
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {fileType === null ? (
            <p>Drag & drop images or a video here, or click to select</p>
          ) : fileType === "image" ? (
            <p>Drop more images or click to select</p>
          ) : (
            <p>Video selected. Drop a new video to replace.</p>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            {fileType === "image" ? (
              <>
                <div className="grid grid-cols-3 gap-2">
                  {files.map((file, index) => (
                    <div key={file.name} className="relative">
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded-md cursor-pointer"
                        onClick={() => {
                          setShowSlider(true)
                          setCurrentSlide(index)
                        }}
                      />
                      <button
                        onClick={() => removeFile(file)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                {showSlider && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-3xl">
                  
                        {files.map((file) => (
                          <div key={file.name} className="outline-none">
                            <img
                              src={file.preview || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-[80vh] object-contain"
                            />
                          </div>
                        ))}
                   
                      <button className="absolute top-2 right-2 text-white" onClick={() => setShowSlider(false)}>
                        <X className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                        {currentSlide + 1} / {files.length}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="relative">
                <video src={files[0].preview} controls className="w-full h-64 object-cover rounded-md" />
                <button
                  onClick={() => removeFile(files[0])}
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button type="button" variant="outline" size="icon">
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button type="button" variant="outline" size="icon">
              <Video className="w-4 h-4" />
            </Button>
          </div>
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  )
}

