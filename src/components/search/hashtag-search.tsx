"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const mockHashtags = [
  { id: 1, name: "technology" },
  { id: 2, name: "programming" },
  { id: 3, name: "javascript" },
  { id: 4, name: "react" },
  { id: 5, name: "nextjs" },
  { id: 6, name: "tailwindcss" },
  { id: 7, name: "design" },
  { id: 8, name: "ux" },
  { id: 9, name: "ui" },
  { id: 10, name: "webdev" },
];

export default function HashtagSearch({
  onChange,
}: {
  onChange?: (selected: typeof mockHashtags) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockHashtags>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<typeof mockHashtags>([
    { id: 999, name: "moe" },
    { id: 1000, name: "trending" },
    { id: 1001, name: "happy" },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const filteredResults = mockHashtags.filter(
      (hashtag) =>
        hashtag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedHashtags.some((selected) => selected.id === hashtag.id)
    );

    setSearchResults(filteredResults);
    setIsDropdownOpen(filteredResults.length > 0);
  }, [searchTerm, selectedHashtags]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Gửi dữ liệu hashtag đã chọn về component cha
  useEffect(() => {
    if (onChange) {
      onChange(selectedHashtags);
    }
  }, [selectedHashtags, onChange]);

  const selectHashtag = (hashtag: (typeof mockHashtags)[0]) => {
    setSelectedHashtags([...selectedHashtags, hashtag]);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const removeHashtag = (hashtagId: number) => {
    setSelectedHashtags(selectedHashtags.filter((tag) => tag.id !== hashtagId));
  };

  return (
    <div className="w-full">
      <h2 className="text-sm mb-2 font-medium text-destructive text-gray-700 dark:text-gray-200">
        Hashtag Search
      </h2>

      <div className="relative mb-3" ref={dropdownRef}>
        <Input
          type="text"
          placeholder="Search hashtags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {searchResults.map((hashtag) => (
              <div
                key={hashtag.id}
                className="flex items-center justify-between p-3 hover:bg-gray-100 border-b last:border-b-0"
              >
                <span>#{hashtag.name}</span>
                <Button size="sm" onClick={() => selectHashtag(hashtag)}>
                  Select
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedHashtags.map((hashtag) => (
          <Badge
            key={hashtag.id}
            variant="secondary"
            className="px-3 py-1 text-sm rounded-xl"
          >
            #{hashtag.name}
            <button
              onClick={() => removeHashtag(hashtag.id)}
              className="ml-2 hover:text-gray-700"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
