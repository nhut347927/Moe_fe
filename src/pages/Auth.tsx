import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/components/Auth/AuthLayout";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import ChangePassword from "@/components/Auth/ChangePassword";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import ResetPassword from "@/components/Auth/ResetPassword";
import NotFound from "../components/NotFound";

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
