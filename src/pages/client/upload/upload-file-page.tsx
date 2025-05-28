"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, X, ImageIcon, Video, AlertCircle, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileWithPreview extends File {
  preview?: string
  id: string
}

export default function UploadPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILES = 9
  const MAX_TOTAL_SIZE = 2 * 1024 * 1024 * 1024 // 2GB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/mov"]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getTotalSize = (fileList: FileWithPreview[]) => {
    return fileList.reduce((total, file) => total + file.size, 0)
  }

  const validateFiles = (newFiles: File[]) => {
    const currentFiles = files
    const allFiles = [...currentFiles, ...newFiles]

    const hasImages = allFiles.some((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
    const hasVideos = allFiles.some((file) => ACCEPTED_VIDEO_TYPES.includes(file.type))

    if (hasImages && hasVideos) {
      return "Cannot mix images and videos. Please choose one type."
    }

    if (hasImages && allFiles.length > MAX_FILES) {
      return `Maximum ${MAX_FILES} images allowed.`
    }

    if (hasVideos && allFiles.length > 1) {
      return "Only 1 video allowed."
    }

    const totalSize = getTotalSize(allFiles as FileWithPreview[])
    if (totalSize > MAX_TOTAL_SIZE) {
      return `Total size exceeds 2GB limit. Current: ${formatFileSize(totalSize)}`
    }

    for (const file of newFiles) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type) && !ACCEPTED_VIDEO_TYPES.includes(file.type)) {
        return `"${file.name}" is not supported. Only images and videos allowed.`
      }
    }

    return null
  }

  const createFilePreview = (file: File): FileWithPreview => {
    const fileWithId = Object.assign(file, { id: Math.random().toString(36).substr(2, 9) }) as FileWithPreview

    if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      fileWithId.preview = URL.createObjectURL(file)
    }

    return fileWithId
  }

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      setError("")

      const validationError = validateFiles(newFiles)
      if (validationError) {
        setError(validationError)
        return
      }

      const filesWithPreview = newFiles.map(createFilePreview)
      setFiles((prev) => [...prev, ...filesWithPreview])
    },
    [files],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      handleFiles(droppedFiles)
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => {
      const updated = prev.filter((file) => file.id !== fileId)
      const fileToRemove = prev.find((file) => file.id === fileId)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return updated
    })
    setError("")
  }

  const uploadFiles = async () => {
    if (files.length === 0) {
      setError("Please select files to upload.")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append(`files`, file)
      })

      const response = await fetch("http://localhost:3000/client/upload/new-post", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Upload successful:", result)

      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
      setFiles([])

      alert("Upload successful!")
    } catch (error) {
      console.error("Upload error:", error)
      setError("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const totalSize = getTotalSize(files)

  return (
     <div className="flex h-screen max-h-screen p-2">
      <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl overflow-y-auto overflow-x-hidden p-4 px-14">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Cloud className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Upload Files
          </h1>
          <p className="text-gray-500 mt-2">Drag & drop or click to select your files</p>
        </div>

        {/* Upload Area */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-0">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 ${
                isDragOver
                  ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 scale-[1.02]"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose files or drag here</h3>
                  <p className="text-gray-500">Images (max 9) or Video (max 1) • Max 2GB total</p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={[...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES].join(",")}
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Selected Files */}
        {files.length > 0 && (
          <Card className="mb-6 border border-gray-200">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Selected Files ({files.length})</h3>
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {formatFileSize(totalSize)} / 2GB
                </div>
              </div>

              {/* Files Grid */}
              <div className="grid gap-3 mb-6">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    {/* Preview */}
                    <div className="flex-shrink-0">
                      {ACCEPTED_IMAGE_TYPES.includes(file.type) ? (
                        file.preview ? (
                          <img
                            src={file.preview || "/placeholder.svg"}
                            alt={file.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-blue-600" />
                          </div>
                        )
                      ) : (
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-purple-600" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Upload Button */}
              <Button
                onClick={uploadFiles}
                disabled={isUploading || files.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
              >
                {isUploading ? "Uploading..." : "Upload Files"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* File Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Images</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>JPG, PNG, GIF, WebP</li>
                <li>Maximum 9 files</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Videos</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>MP4, WebM, AVI, MOV</li>
                <li>Maximum 1 file</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
