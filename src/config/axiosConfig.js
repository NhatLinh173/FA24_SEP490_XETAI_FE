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
        console.log("Already refreshing token");
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log("Token refreshed:", token);
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            console.log("Error in token refresh:", err);
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const refreshToken = Cookies.get("freshToken");
        console.log("Refreshing token with:", refreshToken);
        const response = await axiosInstance.post("/auth/refresh-token", {
          refreshToken,
        });

        if (response.status === 200) {
          const newToken = response.data.accessToken;
          localStorage.setItem("accessToken", newToken);
          Cookies.set("token", newToken);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.log(
          "Error during token refresh:",
          err.response ? err.response.data : err.message
        );
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
