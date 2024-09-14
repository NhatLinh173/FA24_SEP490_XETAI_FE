import { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { refresh } from "@cloudinary/url-gen/qualifiers/artisticFilter";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const history = useHistory();

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        Cookies.set("refreshToken", data.refreshToken);
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("avatar");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return { handleLogin, handleLogout, isAuthenticated };
};

export default useAuth;
