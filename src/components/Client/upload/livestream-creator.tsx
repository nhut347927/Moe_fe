"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X, Video, Cast } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function LivestreamCreator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [thumbnail, setThumbnail] = useState<(File & { preview: string }) | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setThumbnail(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  })

  const removeThumbnail = () => {
    setThumbnail(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle livestream start here
    console.log("Starting livestream:", { title, description, thumbnail })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Tiêu đề Livestream</Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề cho buổi livestream của bạn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            placeholder="Mô tả ngắn gọn về nội dung buổi livestream"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1"
          />
        </div>

        <div>
          <Label>Thumbnail</Label>
          <div
            {...getRootProps()}
            className={`mt-1 border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {thumbnail ? (
              <div className="relative">
                <img
                  src={thumbnail.preview || "/placeholder.svg"}
                  alt="Thumbnail"
                  className="w-full h-48 object-cover rounded-md"
                />
                <button onClick={removeThumbnail} className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p>Kéo thả hoặc click để chọn ảnh thumbnail</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" size="icon">
            <Video className="w-4 h-4" />
          </Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
            <Cast className="w-4 h-4 mr-2" />
            Bắt đầu Livestream
          </Button>
        </div>
      </form>
    </div>
  )
}

