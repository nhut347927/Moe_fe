import { Route, Routes } from "react-router-dom";
import ClientLayout from "../components/Client/ClientLayout";
import Home from "../components/Client/Home";
import NotFound from "../components/NotFound";
import PlaylistAndArtists from "../components/Client/PlaylistAndArtists";
import Search from "../components/Client/Search";
import Like from "../components/Client/Like";
import Chat from "../components/Client/chat";
import Playlist from "@/components/Client/Playlist";


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
        
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ClientLayout>
  );
};

export default Client;
