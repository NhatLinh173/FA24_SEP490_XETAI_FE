import { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || null);
  const history = useHistory();

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3005/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("driverId", data.driverId);
        localStorage.setItem("avatar", data.avatar);
        setAvatar(data.avatar);
        setIsAuthenticated(true);
        history.push("/");
        window.location.reload();

        return data;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.warn("Sai Tài Khoản Hoặc Mật Khẩu");
      } else {
        toast.error("Đăng Nhập Thất Bại");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("driverId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("avatar");
    Cookies.remove("refreshToken");
    setAvatar(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return { handleLogin, handleLogout, isAuthenticated };
};

export default useAuth;
