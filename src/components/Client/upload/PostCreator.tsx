import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SoundSelector } from "./SoundSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { getAxiosInstance } from "../../../services/axios/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function PostCreator() {
  const { toast } = useToast();
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [showSlider, setShowSlider] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [enableSound, setEnableSound] = useState(false);
  const [errorMessages, setErrorMessages] = useState<any>({});
  const [postId, setPostId] = useState<number | null>(null);
  const axiosInstance = getAxiosInstance();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      videoFile: null,
      imageFile: [],
      content: "",
      useOtherAudio: false,
      postId: null,
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const type = acceptedFiles[0].type.startsWith("image/")
        ? "image"
        : "video";

      if (fileType && fileType !== type) {
        toast({
          variant: "destructive",
          description: "Cannot mix image and video files!",
        });
        return;
      }

      setFileType(type);

      const newFiles: (File & { preview: string })[] = acceptedFiles.map(
        (file) => Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      setFiles((prev) => {
        if (type === "video") return [newFiles[0]];
        return [...prev, ...newFiles].slice(0, 20);
      });
    },
    [fileType]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: fileType === "video" ? false : true,
    maxFiles: fileType === "video" ? 1 : 20,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    if (newFiles.length === 0) setFileType(null);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    if (fileType === "image" && postId == null) {
      toast({
        variant: "destructive",
        description: "Please select a sound for the image.",
      });
      return;
    }

    if (fileType === "video" && enableSound && postId == null) {
      toast({
        variant: "destructive",
        description: "Please select a sound for the video.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("useOtherAudio", enableSound ? "true" : "false");

      if (fileType === "video" && files.length > 0) {
        formData.append("videoFile", files[0]);
      } else if (fileType === "image") {
        files.forEach((file) => {
          formData.append("imageFile", file);
        });
      }

      if (fileType === "image" || (fileType === "video" && enableSound)) {
        formData.append("postId", postId ? postId.toString() : "");
      }

      toast({
        variant: "default",
        description: (
          <p className="text-lime-500">Your post is being uploaded!</p>
        ),
      });
      navigate("/client/home", { replace: true });
      const response = await axiosInstance.post(
        "/post/create-new-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        variant: "default",
        description: <p className="text-lime-500">{response.data.message}</p>,
      });

      setFiles([]);

      setFileType(null);
      setPostId(null);
      setEnableSound(false);
      form.reset();
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast({
          variant: "destructive",
          description: error.response.data.message || "An error occurred!",
        });
        setErrorMessages(null);
        const { errors } = error.response.data;
        if (errors) {
          setErrorMessages(errors);
        }
      }
    }
  });

  return (
    <div className="max-h-screen h-screen p-2">
      <div className="h-full w-full overflow-y-auto scroll-but-hidden">
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 w-full p-6">
          {/* Main Form Section */}
          <div className="flex-1 w-full max-w-[500px] bg-zinc-200 dark:bg-zinc-900 rounded-xl p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              Create Post
            </h3>
            <Form {...form}>
              <form className="space-y-6 " onSubmit={handleSubmit}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          id="text_area"
                          placeholder="Enter your content"
                          className="resize-none h-32 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      {errorMessages?.content && (
                        <FormMessage>{errorMessages.content}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {files.length === 0 && (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="space-y-2">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="font-medium">
                        {isDragActive
                          ? "Drop files here"
                          : "Drag & drop images/video "}
                      </p>
                      <p className="text-sm text-gray-500">
                        {fileType === "video"
                          ? "1 video (Max 50MB)"
                          : fileType === "image"
                          ? "Up to 20 images (Max 5MB each)"
                          : "Up to 20 images or 1 video"}
                      </p>
                    </div>
                  </div>
                )}

                {files.length > 0 && (
                  <div className="space-y-4">
                    {fileType === "image" && (
                      <ScrollArea className="w-full h-96 rounded-xl border pb-4 overflow-auto">
                        <div className="grid grid-cols-4 gap-y-4 gap-x-0 mt-3">
                          {files.map((file, index) => (
                            <div key={file.name} className="relative">
                              <img
                                src={file.preview}
                                alt={file.name}
                                className="w-24 h-24 object-cover rounded-xl cursor-pointer"
                                onClick={() => {
                                  setShowSlider(true);
                                  setCurrentSlide(index);
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeFile(file)}
                                className="absolute -top-2 right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}

                    {fileType === "video" && files[0] && (
                      <div className="relative">
                        <video
                          controls
                          src={files[0].preview}
                          className="w-full rounded-xl max-h-[50vh] object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(files[0])}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {fileType === "video" && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enable-sound"
                      checked={enableSound}
                      onCheckedChange={setEnableSound}
                    />
                    <Label htmlFor="enable-sound">Add new sound to video</Label>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div {...getRootProps()} className="inline-block">
                    <input {...getInputProps()} />
                    <Button type="button" variant="outline">
                      {fileType === "image"
                        ? files.length > 0
                          ? "Add More Images"
                          : "Add Images"
                        : fileType === "video"
                        ? "Replace Video"
                        : "Add Media"}
                    </Button>
                  </div>

                  <Button type="submit" size="lg" className="px-8 rounded-full">
                    Post
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Sound Selector Section */}
          {files.length > 0 &&
            (fileType === "image" || (fileType === "video" && enableSound)) && (
              <div className="flex-1 w-full max-w-[500px]">
                <SoundSelector setPostId={setPostId} />
              </div>
            )}
        </div>

        {/* Image Lightbox Modal */}
        {showSlider && (
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
            <button
              type="button"
              className="absolute top-4 right-4 text-white"
              onClick={() => setShowSlider(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative w-full max-w-4xl flex items-center">
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev > 0 ? prev - 1 : files.length - 1
                  )
                }
                className="absolute left-4 text-white text-3xl z-10"
              >
                &#8249;
              </button>
              <img
                src={files[currentSlide].preview}
                className="max-h-[80vh] object-contain mx-auto"
              />
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev < files.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-4 text-white text-3xl z-10"
              >
                &#8250;
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {files.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-gray-500"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
