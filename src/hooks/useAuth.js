import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
      } catch (error) {
        console.error("useAuth - Token Decode Error:", error);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          if (decodedToken.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
            setUserRole(decodedToken.role || "customer");
            localStorage.setItem("userRole", decodedToken.role || "customer");
          } else {
            // Token đã hết hạn
            handleLogout();
          }
        } catch (error) {
          console.error("Token decode error:", error);
          // Kiểm tra nếu là Google token
          if (token.includes("google")) {
            setIsAuthenticated(true);
            setUserRole("customer");
            localStorage.setItem("userRole", "customer");
          } else {
            handleLogout();
          }
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (identifier, password) => {
    try {
      const { data } = await axios.post(
        "https://xehang.site/auth/login",
        {
          identifier,
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
        const decodedToken = jwtDecode(data.accessToken);
        setUserRole(decodedToken.role);
        localStorage.setItem("userRole", decodedToken.role);

        if (decodedToken.role === "admin" || decodedToken.role === "staff") {
          history.push("/dashboard-admin");
        } else {
          history.push("/");
        }
        window.location.reload();
        return data;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.warn("Sai Tài Khoản Hoặc Mật Khẩu");
      } else if (error.response?.status === 403) {
        toast.warn("Tài khoản đã bị khóa");
      } else if (error.response?.status === 404) {
        toast.warn("Tài khoản không tồn tại");
      } else {
        toast.warn("Đăng nhập thất bại");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("driverId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userRole");
    localStorage.removeItem("tabAdmin");
    Cookies.remove("refreshToken", {
      path: "/",
    });
    setAvatar(null);
    setIsAuthenticated(false);
    setUserRole(null);
    history.push("/signin");
  };

  // Thêm hàm validate token
  const validateToken = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      return false;
    }
    try {
      const response = await axios.get("https://xehang.site/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.valid;
    } catch (error) {
      handleLogout();
      return false;
    }
  };

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
    userRole,
    validateToken,
  };
};

export default useAuth;
