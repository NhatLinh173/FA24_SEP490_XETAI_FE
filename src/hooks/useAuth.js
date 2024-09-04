import { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import Cookies from "js-cookie";
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email, password) => {
    const payload = {
      email,
      password,
    };
    try {
      const response = await axiosInstance.post("auth/login", payload);
      if (response.status === 200) {
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("role", response.data.role);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Sai Tài Khoản Hoặc Mật Khẩu");
      } else {
        console.error("Đăng Nhập Thất Bại");
      }
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    Cookies.remove("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return { handleLogin, handleLogout, isAuthenticated };
};

export default useAuth;
