import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlaylistCard from './playlist-card';
import PostCard from './post-card';


export default function ContentTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes('playlist') ? 'playlist' : 'post';

  useEffect(() => {
    if (location.pathname === '/client/profile') {
      navigate('/client/profile/post');
    }
  }, [location.pathname, navigate]);

  const posts = [
    {
      id: "abc",
      title: 'New Track Release',
      date: 'Oct 10, 2024',
      image: 'https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png',
      excerpt: 'Excited to share my latest track from the new album!',
      likes: 1200,
      comments: 45,
      category: 'Music',
      categoryColor: 'bg-blue-500',
    },
    {
      id: "wwww",
      title: 'Behind the Scenes',
      date: 'Oct 5, 2024',
      image: 'https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png',
      excerpt: 'A peek into the studio while working on Echoes of Dawn.',
      likes: 850,
      comments: 30,
      category: 'Studio',
      categoryColor: 'bg-green-500',
    },
    {
      id: "sdfasf",
      title: 'Live Performance',
      date: 'Sep 28, 2024',
      image: 'https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png',
      excerpt: 'Recap of my latest live set in Hanoi!',
      likes: 2000,
      comments: 60,
      category: 'Live',
      categoryColor: 'bg-red-500',
    },
  ];

  const playlists = [
    {
      id: "sdasd",
      title: 'Echoes of Dawn',
      tracks: 12,
      image: 'https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png',
      color: 'from-blue-500 to-purple-500',
      duration: '45:32',
    },
    {
      id: "ádadas",
      title: 'Night Vibes',
      tracks: 8,
      image: 'https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png',
      color: 'from-purple-500 to-pink-500',
      duration: '32:15',
    },
    {
      id: "ádasd",
      title: 'Chill Mix',
      tracks: 10,
      image: 'https://res.cloudinary.com/dwv76nhoy/image/upload/v1739337151/rrspasosi59xmsriilae.png',
      color: 'from-green-500 to-teal-500',
      duration: '38:47',
    },
  ];

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => navigate(`/client/profile/${value}`)}
      className="px-6 bg-white dark:bg-zinc-900"
    >
      <TabsList className="bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 rounded-none w-full justify-start h-12 px-0">
        <TabsTrigger
          value="post"
          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-gray-700 dark:text-gray-200 data-[state=active]:text-blue-500 dark:data-[state=active]:text-blue-400 rounded-none h-12 px-6"
        >
          <Grid className="h-4 w-4 mr-2" />
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="playlist"
          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-gray-700 dark:text-gray-200 data-[state=active]:text-blue-500 dark:data-[state=active]:text-blue-400 rounded-none h-12 px-6"
        >
          <Grid className="h-4 w-4 mr-2" />
          Playlists
        </TabsTrigger>
      </TabsList>
      <TabsContent value="post" className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              date={post.date}
              image={post.image}
              excerpt={post.excerpt}
              likes={post.likes}
              comments={post.comments}
              category={post.category}
              categoryColor={post.categoryColor}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="playlist" className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              title={playlist.title}
              tracks={playlist.tracks}
              image={playlist.image}
              color={playlist.color}
              duration={playlist.duration}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}