// src/AppRoutes.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import NotFound from "../components/Common/NotFound";

// Lazy load các page
const Admin = React.lazy(() => import("./Admin"));
const Client = React.lazy(() => import("./Client"));
const Auth = React.lazy(() => import("./Auth"));

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/admin/*"
          element={
            isAuthenticated && isAdmin ? (
              <Admin />
            ) : (
              <Navigate to="/client/home" />
            )
          }
        />
        <Route path="/client/*" element={<Client />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<Navigate to="/client/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
