import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
});
let isRefreshing = false;
let failedQueue = [];
let logoutCallback = null;

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const refreshToken = Cookies.get("token");
        const response = await axiosInstance.post("/auth/refresh-token", {
          refreshToken,
        });

        if (response.status === 200) {
          const newToken = response.data.accessToken;
          localStorage.setItem("token", newToken);
          Cookies.set("token", newToken);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        if (logoutCallback) logoutCallback();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
