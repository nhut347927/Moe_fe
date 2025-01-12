import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store"; // Import kiểu RootState từ Redux store
import LoadingSpinner from "./components/Common/LoadingSpinner";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeProvider } from "./components/ThemeProviderProps";

// Lazy load các thành phần lớn
const Admin = lazy(() => import("./pages/Admin"));
const Client = lazy(() => import("./pages/Client"));
const Auth = lazy(()=> import("./pages/Auth"));

const App: React.FC = () => {
  // Sử dụng useSelector với kiểu RootState
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
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
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
