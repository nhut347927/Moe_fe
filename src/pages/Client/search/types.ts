// types.ts
export interface Playlist {
  id: number;
  title: string;
  description: string;
  cover: string;
  tracks: number;
  duration: string;
  author: string;
  authorAvatar: string;
  followers: number;
  color: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  verified: boolean;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  type: "image" | "video";
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  likes: number;
  comments: number;
  saved: boolean;
  featured: boolean;
  color: string;
  duration?: string; // Chỉ áp dụng cho video
}

export interface SearchResults {
  playlists: Playlist[];
  users: User[];
  posts: Post[];
}
