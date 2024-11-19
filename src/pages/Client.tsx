import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "../components/Client/ClientLayout";
import Home from "../components/Client/Home";
import NotFound from "../components/NotFound";
import Reels from "../components/Client/Reels";
import PlaylistAndArtists from "../components/Client/PlaylistAndArtists";
import Search from "../components/Client/Search";
import Like from "../components/Client/Like";
import YourSpace from "../components/Client/YourSpace";

const Client = () => {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/playlist&artists" element={<PlaylistAndArtists />} />

        <Route path="/search/*" element={<Search />} />
        <Route path="/search/post" element={<Search />} />
        <Route path="/search/Video" element={<Search />} />
        <Route path="/search/songs" element={<Search />} />
        <Route path="/search/users" element={<Search />} />
        <Route path="/search/playlists" element={<Search />} />

        <Route path="/likes/*" element={<Like />} />
        <Route path="/likes/post" element={<Like />} /> {/* Tab Post */}
        <Route path="/likes/video" element={<Like />} /> {/* Tab Video */}
        <Route path="/likes/songs" element={<Like />} /> {/* Tab Songs */}
        
        <Route path="/yourspace" element={<YourSpace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ClientLayout>
  );
};

export default Client;
