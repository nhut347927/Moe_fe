// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import { ThemeProvider } from "./components/Common/ThemeProviderProps";
import AppRoutes from "./routers/index";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
