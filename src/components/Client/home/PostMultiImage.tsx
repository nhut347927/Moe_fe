import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface PostProps {
  username: string;
  postText: string;
  time: string;
  images: string[];
  likes: number;
}

const PostMultiImg: React.FC<{ post: PostProps }> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(post.likes);
  const [comment, setComment] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Handle like button click
  const handleLike = () => {
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(!isLiked);
  };

  // Handle save button click
  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Handle comment submission
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() && comment.length > 2) {
      console.log('Comment submitted:', comment);
      setComment('');
    } else {
      alert('Please enter a valid comment.');
    }
  };

  // Navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === post.images.length - 1 ? 0 : prevIndex + 1));
  };

  // Navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? post.images.length - 1 : prevIndex - 1));
  };

  // Keyboard navigation for image slider
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  // Handle comment input change
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="instagram-post">
      <div className="post-header">
        <div className="user-info">
          <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="avatar" />
          <span className="username">{post.username}</span>
        </div>
        <button className="more-options" aria-label="More options">
          <i className='bx bx-dots-horizontal-rounded'></i>
        </button>
      </div>
      <div className="post-image-container">
        <div className="post-image-wrapper" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post content ${index + 1}`}
              className="post-image"
              loading="lazy"
            />
          ))}
        </div>
        {post.images.length > 1 && (
          <>
            <button className="image-nav prev" onClick={prevImage} aria-label="Previous image">
              <i className='bx bx-chevron-left'></i>
            </button>
            <button className="image-nav next" onClick={nextImage} aria-label="Next image">
              <i className='bx bx-chevron-right'></i>
            </button>
            <div className="image-indicators">
              {post.images.map((_, index) => (
                <div key={index} className={`indicator ${index === currentImageIndex ? 'active' : ''}`}></div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="post-actions">
        <div className="left-actions">
          <button onClick={handleLike} aria-label={isLiked ? 'Unlike' : 'Like'} className={`action-button ${isLiked ? 'liked' : ''}`}>
            <i className={`bx ${isLiked ? 'bxs-heart' : 'bx-heart'}`} style={{ color: isLiked ? '#ed4956' : 'inherit' }}></i>
          </button>
          <button className="action-button" aria-label="Comment">
            <i className='bx bx-message-rounded'></i>
          </button>
          <button className="action-button" aria-label="Share">
            <i className='bx bx-send'></i>
          </button>
        </div>
        <button onClick={handleSave} aria-label={isSaved ? 'Unsave' : 'Save'} className={`action-button ${isSaved ? 'saved' : ''}`}>
          <i className={`bx ${isSaved ? 'bxs-bookmark' : 'bx-bookmark'}`}></i>
        </button>
      </div>
      <div className="post-likes">{likes.toLocaleString()} likes</div>
      <div className="post-caption">
        <span className="username">{post.username}</span> {post.postText}
      </div>
      <div className="post-time">{post.time}</div>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
          className="comment-input"
        />
        <button type="submit" className="post-comment-button" disabled={!comment.trim()}>
          Post
        </button>
      </form>
      <style>{`
        .instagram-post {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          border: 1px solid #dbdbdb;
          border-radius: 3px;
          margin-bottom: 60px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
        }
        .user-info {
          display: flex;
          align-items: center;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 12px;
        }
        .username {
          font-weight: 600;
        }
        .more-options {
          background: none;
          border: none;
          cursor: pointer;
        }
        .post-image-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 1 / 1;
        }
        .post-image-wrapper {
          display: flex;
          transition: transform 0.3s ease-in-out;
          will-change: transform;
          width: 100%;
          height: 100%;
        }
        .post-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .image-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.3);
          border: none;
          color: white;
          padding: 8px;
          cursor: pointer;
          border-radius: 50%;
        }
        .image-nav.prev {
          left: 10px;
        }
        .image-nav.next {
          right: 10px;
        }
        .image-indicators {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
        }
        .indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
        }
        .indicator.active {
          background-color: #3897f0;
        }
        .post-actions {
          display: flex;
          justify-content: space-between;
          padding: 8px 16px;
        }
        .left-actions {
          display: flex;
        }
        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .action-button:hover {
          opacity: 0.7;
        }
        .liked {
          animation: like-button-animation 0.45s ease-in-out;
          transform-origin: center;
        }
        @keyframes like-button-animation {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .post-likes {
          font-weight: 600;
          padding: 0 16px;
          margin-bottom: 8px;
        }
        .post-caption, .post-comments {
          padding: 0 16px;
          margin-bottom: 4px;
        }
        .post-time {
          padding: 0 16px;
          color: #8e8e8e;
        }
        .comment-form {
          display: flex;
          align-items: center;
          padding: 8px 16px;
        }
        .comment-input {
          flex-grow: 1;
          border: none;
          background: #fafafa;
          padding: 8px 16px;
          border-radius: 16px;
        }
        .post-comment-button {
          background-color: #3897f0;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PostMultiImg;
