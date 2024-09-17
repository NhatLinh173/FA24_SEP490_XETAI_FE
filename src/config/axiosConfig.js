import axios from "axios";
import Cookies from "js-cookie";

// Khởi tạo instance của axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3005",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        console.log("Attempting to refresh token:", refreshToken);

        const response = await axios.post(
          "http://localhost:3005/auth/refresh-token",
          { refreshToken }
        );

        localStorage.setItem("accessToken", response.data.accessToken);
        Cookies.set("refreshToken", response.data.refreshToken || refreshToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Error during token refresh:", err);
        localStorage.removeItem("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/signIn";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
