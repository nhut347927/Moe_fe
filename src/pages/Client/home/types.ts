// types.ts
export type Reply = {
  commentId: string;
  userAvatar: string;
  content: string;
  displayName: string;
  createdAt: string;
};

export type Comment = {
  commentId: string;
  userAvatar: string;
  content: string;
  displayName: string;
  createdAt: string;
  replies: Reply[];
};

export type Post = {
  userId: string;
  postId: string;
  createdAt: string;
  userAvatar: string;
  userDisplayName: string;
  userName: string;
  postType: "VIDEO" | "IMG";
  videoUrl: string;
  imageUrls: string[];
  title: string;
  description: string;
  likeCount: string;
  commentCount: string;
  playlistCount: string;
  audioUrl: string;
  audioOwnerAvatar: string;
  audioOwnerName: string;
  audioId: string;
  comments: Comment[];
};

export type LayoutType = "masonry" | "grid" | "list" | "timeline";

export const commonEmojis = [
  "😊",
  "😂",
  "❤️",
  "👍",
  "🔥",
  "✨",
  "🙌",
  "👏",
  "🎉",
  "🤔",
  "😍",
  "🥰",
  "😎",
  "🤩",
  "👀",
  "💯",
  "🙏",
  "💪",
  "👌",
  "😢",
];
