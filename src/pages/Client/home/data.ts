import { Post } from "./types";

export const samplePostData: Post[] = [
  {
    userId: "user1",
    postId: "post1",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748142/videos/ku2ammahemr2k4iiezza.mp4",
    imageUrls: [],
    title: " Đây là một tiêu đề hơi dai dòng và dài hơn một chút nữa Đây là một tiêu đề hơi dai dòng",
    description: "Như cơn mưa anh tưới mát trái tim khô cằn Bao ngày tháng mình dìu nhau bước qua nhọc nhằn Bao hạt đắng với em rồi cũng hoá ngọt ngào Bước hai ba một Bước hai ba một Ta nhảy theo điệu nhạc Môi mắt môi nồng nàn Bước hai ba một Anh cầm lấy tay em và nói Anh là nơi an trú Còn em về yên giấc ngủ Cuộc đời có không vui Cuộc đời có không xuôi nhưng luôn có anh Và khi tóc nhuộm màu mây chân chim đã đầy Đôi mắt em không còn nhìn thấy Vẫn chỉ có bóng hình anh Bóng hình anh mãi thôi Dẫu sẽ biết Những lo toang chòng chành dễ khiến đôi mắt Ta không còn nhìn nhau với biết bao nhiêu dịu dàng Biết bao nhiêu nhẹ nhàng của ngày đầu tiên Em vẫn mong ngoài hiên nhà Nắng vẫn sẽ rất hiền Bình minh rồi vẫn lên như anh vẫn yêu em Bước hai ba một Anh cầm lấy tay em và nói Anh là nơi an trú Còn em về yên giấc ngủ Cuộc đời có không xuôi Cuộc đời có không vui nhưng luôn có anh Và khi tóc nhuộm màu mây chân chim đã đầy Đôi mắt em không còn nhìn thấy Vẫn chỉ có bóng hình nhau Bóng hình nhau mãi thôi",
    tags:["w/n","3107", "idt042019"],
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
  {
    userId: "user2",
    postId: "post2",
    createdAt: "2025-04-02T15:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "Jane Smith",
    userName: "johndoe",
    postType: "IMG",
    videoUrl: "",
    imageUrls: [
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/images/sikxb1qmpocwuwpbgapc",
      "https://res.cloudinary.com/dwv76nhoy/image/upload/c_crop,g_auto,w_1080/v1739337151/rrspasosi59xmsriilae.png",
      "https://res.cloudinary.com/dwv76nhoy/image/upload/c_crop,g_auto,w_1080/v1739337151/images/sikxb1qmpocwuwpbgapc",
    ],
    title: "Beautiful photos!",
    description: "Check out these amazing pics!",
    tags:["w/n","3107", "idt042019"],
    likeCount: "85",
    commentCount: "10",
    playlistCount: "3",
    audioUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1741011150/audios/t0m4l8rgcrrtbdbxnanp.mp3",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Music Maker",
    audioId: "audio2",
    comments: [
      {
        commentId: "cmt2",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Love these pics!",
        displayName: "Alex Brown",
        createdAt: "2025-04-02T15:10:00Z",
        replies: [],
      },
    ],
  },
  {
    userId: "user1",
    postId: "post3",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748437/videos/wnz7qmx8ioch6e3zvylv.mp4",
    imageUrls: [],
    title: "A cool video post!",
    description: "Cái này là một video rất hay!",
    tags:["w/n","3107", "idt042019"],
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
  {
    userId: "user1",
    postId: "post4",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740670978/videos/jjot1n9nnbpkxuin2gcv.mp4",
    imageUrls: [],
    title: "A cool video post!",
    description: "Cái này là một video rất hay!",
    tags:["w/n","3107", "idt042019"],
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
  {
    userId: "user1",
    postId: "post5",
    createdAt: "2025-04-01T10:00:00Z",
    userAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    userDisplayName: "John Doe",
    userName: "johndoe",
    postType: "VIDEO",
    videoUrl:
      "https://res.cloudinary.com/dwv76nhoy/video/upload/v1740748142/videos/ku2ammahemr2k4iiezza.mp4",
    imageUrls: [],
    title: "A cool video post!",
    description: "Cái này là một video rất hay!",
    tags:["w/n","3107", "idt042019"],
    likeCount: "120",
    commentCount: "15",
    playlistCount: "5",
    audioUrl: "",
    audioOwnerAvatar:
      "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
    audioOwnerName: "Audio Creator",
    audioId: "audio1",
    comments: [
      {
        commentId: "cmt1",
        userAvatar:
          "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
        content: "Great video!",
        displayName: "Jane Smith",
        createdAt: "2025-04-01T10:05:00Z",
        replies: [
          {
            commentId: "reply1",
            userAvatar:
              "https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png",
            content: "Thanks!",
            displayName: "John Doe",
            createdAt: "2025-04-01T10:06:00Z",
          },
        ],
      },
    ],
  },
];