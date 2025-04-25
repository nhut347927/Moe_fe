import { Badge } from '@/components/ui/badge';

export default function ProfileInfo() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-3xl">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Creating music that moves you. Based in Hanoi, Vietnam. New album
          "Echoes of Dawn" out now on all platforms.
        </p>
        <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900 dark:text-white">1,245</span> Following
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900 dark:text-white">24.5K</span> Followers
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900 dark:text-white">3.2M</span> Likes
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {['Electronic Music', 'Producer', 'DJ', 'Songwriter'].map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}