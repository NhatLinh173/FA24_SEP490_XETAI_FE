import axios from "axios";

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://fa-24-sep-490-xetai-be.vercel.app/auth/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

export default refreshAccessToken;
