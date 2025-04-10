import { Route, Routes } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/Client/home/HomePage";
import NotFound from "../components/Common/NotFound";
import Search from "../pages/Client/search/SearchPage";
import Like from "../pages/Client/like/LikePage";
import Chat from "../pages/Client/chat/ChatPage";
import Playlist from "../pages/Client/playlist/PlaylistPage";
import ContentCreationHub from "../pages/Client/upload/ContentCreationHub";
import PostCreator from "../pages/Client/upload/PostCreator";
import LivestreamCreator from "../pages/Client/upload/LivestreamCreator";
import Profile from "../pages/Client/profile/ProfilePage"
import Explore from "@/pages/Client/explore/ExplorePage";
import CardVariants from "@/pages/Client/other/CardVariants";
const Client = () => {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/playlist" element={<Playlist />} />
        <Route path="/card" element={<CardVariants />} />

        <Route path="/search/*" element={<Search />} />
        <Route path="/search/post" element={<Search />} />
        <Route path="/search/Video" element={<Search />} />
        <Route path="/search/users" element={<Search />} />
        <Route path="/search/playlists" element={<Search />} />

        <Route path="/likes/*" element={<Like />} />
        <Route path="/likes/post" element={<Like />} /> 
        <Route path="/likes/video" element={<Like />} /> 

        <Route path="/upload/" element={<ContentCreationHub />} /> 
        <Route path="/upload/new-post" element={<PostCreator />} /> 
        <Route path="/upload/live" element={<LivestreamCreator />} /> 

        <Route path="/profile" element={<Profile />} /> 

        <Route path="/explore" element={<Explore />} /> 
        
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ClientLayout>
  );
};

export default Client;
