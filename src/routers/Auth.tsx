import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ChangePassword from "@/pages/Auth/ChangePassword";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import NotFound from "../components/Common/NotFound";

const Auth = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthLayout>
  );
};

export default Auth;
