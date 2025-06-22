import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";

import LoadingSpinner from "../components/common/loading-spinner-with-icon";
import Like from "../pages/client/like/like-page";
import Chat from "../pages/client/chat/chat-page";
import Playlist from "../pages/client/playlist/playlist-page";
import ContentCreationHub from "../pages/client/upload/content-creation-hub-page";
import PostCreator from "../pages/client/upload/post-create-page";
import LivestreamCreator from "../pages/client/upload/livestream-creator";
import Explore from "@/pages/client/explore/explore-page";
import CardVariants from "@/pages/client/other/card-variants";
import AboutPage from "@/pages/client/about/about-page";
import NotFound from "@/components/common/not-found";
import ManageSongs from "@/pages/admin/manage-songs";
import ManageUsers from "@/pages/admin/manage-users";
import Dashboard from "@/pages/admin/dashboard";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ChangePassword from "@/pages/auth/change-password";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import Home from "@/pages/client/home/home-page";
import { SearchPage } from "@/pages/client/search/search-page";
import PostPage from "@/pages/client/post/post-page";
import UploadFilePage from "@/pages/client/upload/upload-file-page";
import { ProfilePage } from "@/pages/client/profile/profile-page";
// Lazy load layouts
const ClientLayout = React.lazy(() => import("./client-layout"));
const AuthLayout = React.lazy(() => import("./auth-layout"));
const AdminLayout = React.lazy(() => import("./admin-layout"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* CLIENT ROUTES */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="card" element={<CardVariants />} />

          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />

          <Route path="likes" element={<Like />} />
          <Route path="likes/post" element={<Like />} />
          <Route path="likes/video" element={<Like />} />

          <Route path="upload" element={<ContentCreationHub />} />

          <Route path="upload/upload-file" element={<UploadFilePage />} />
          <Route path="upload/post-create" element={<PostCreator />} />

          <Route path="upload/live" element={<LivestreamCreator />} />

          <Route path="explore" element={<Explore />} />
          <Route path="chat" element={<Chat />} />
          <Route path="about" element={<AboutPage />} />

          <Route path="post" element={<PostPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="songs" element={<ManageSongs />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* REDIRECT & NOT FOUND */}
        <Route path="/" element={<Navigate to="/client/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
