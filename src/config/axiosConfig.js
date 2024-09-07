import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("token");
        const response = await axiosInstance.post("/auth/refresh-token", {
          refreshToken,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        console.error("Refresh token error: ", error);
      }
    }
  }
);

export default axiosInstance;
