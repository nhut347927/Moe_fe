import { Route, Routes } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/Client/Home";
import NotFound from "../components/Common/NotFound";
import PlaylistAndArtists from "../pages/Client/PlaylistAndArtists";
import Search from "../pages/Client/Search";
import Like from "../pages/Client/Like";
import Chat from "../pages/Client/chat";
import Playlist from "../pages/Client/Playlist";
import ContentCreationHub from "../pages/Client/upload/ContentCreationHub";
import PostCreator from "../pages/Client/upload/PostCreator";
import LivestreamCreator from "../pages/Client/upload/LivestreamCreator";
import Profile from "../pages/Client/Profile"
import Explore from "@/pages/Client/Explore";
import Demo from "@/pages/Client/Meet";
import MeetRoom from "@/pages/Client/Meet-Join";
const Client = () => {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/playlist&artists" element={<PlaylistAndArtists />} />
        <Route path="/playlist" element={<Playlist />} />

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

        {/* Route cho trang demo mặc định */}
        <Route path="/meet" element={<MeetRoom />} />
        <Route path="/demo" element={<Demo />} />
        {/* Route cho tham gia phòng bằng roomId */}
        <Route path="/demo/:roomCode/:token" element={<Demo />} />

        
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ClientLayout>
  );
};

export default Client;
