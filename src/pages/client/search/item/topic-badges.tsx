import { Badge } from "@/components/ui/badge";

const topics = [
  { id: 1, name: "#chualanh" },
  { id: 2, name: "#songkhoe" },
  { id: 3, name: "#phattrienbanthan" },
  { id: 4, name: "#tamlyhoc" },
  { id: 5, name: "#thiendinh" },
  { id: 6, name: "#sangtao" },
  { id: 7, name: "#giadinh" },
  { id: 8, name: "#congviec" },
  { id: 9, name: "#taichinh" },
  { id: 10, name: "#nghethuatsong" },
];

export default function TopicBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      {topics.map((topic) => (
        <Badge
          key={topic.id}
          className="cursor-pointer text-sm font-semibold px-4 py-1.5 text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-full shadow-sm transition-colors duration-200"
          variant="outline"
        >
          {topic.name}
        </Badge>
      ))}
    </div>
  );
}
