import { Tag } from "lucide-react"

import PostGrid from "../search/item/post-grid"

export default function TagPage() {
  const tag = "React" // Lấy tag từ URL hoặc props (giả lập ở đây)

  return (
    <div className="h-screen max-h-screen p-2">
      <div className="h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-y-auto p-4 px-14">
      {/* Tag Header */}
      <div className="bg-slate-100 rounded-3xl p-6 mb-8 text-center">
        <Tag className="h-10 w-10 mx-auto mb-2" />
        <h1 className="text-3xl font-bold mb-2">#{tag}</h1>
        <p className="text-gray-600">
          Hiển thị 7 bài viết với tag "#abc"
        </p>
      </div>

      <PostGrid />
        {/* ) : (
          <div className="col-span-2 text-center py-12 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy bài viết</h3>
            <p className="text-gray-600">Hiện tại chưa có bài viết nào với tag {tag}</p>
          </div>
        )} */}
    </div>
  </div>
  )
}
