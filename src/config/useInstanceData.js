import { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";

const useInstanceData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url);
        const result = await res.data;
        setData(result);
        setLoading(false);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        setLoading(false);
        setError(errorMessage);
      }
    };
    fetchData();
  }, [url, key]);
  const refetch = () => {
    setKey((prevKey) => prevKey + 1); // Tăng key để gọi lại useEffect
  };
  return { data, loading, error, refetch };
};

export default useInstanceData;
