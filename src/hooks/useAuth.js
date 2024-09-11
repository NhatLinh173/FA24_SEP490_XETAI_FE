import { useState } from "react"
import axiosInstance from "../config/axiosConfig"
import Cookies from "js-cookie"

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = async (email, password) => {
    const payload = {
      email,
      password,
    }
    try {
      const response = await axiosInstance.post("/auth/login", payload)
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem("token", response.data.accessToken)
        localStorage.setItem("role", response.data.role)
        Cookies.set("token", response.data.accessToken)
        setIsAuthenticated(true)
        return true
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Sai Tài Khoản Hoặc Mật Khẩu")
      } else {
        console.error("Đăng Nhập Thất Bại")
      }
      console.error("Login error:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setIsAuthenticated(false)
  }

  return { handleLogin, handleLogout, isAuthenticated }
}
export default useAuth
