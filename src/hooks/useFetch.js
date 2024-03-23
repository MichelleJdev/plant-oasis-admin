import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosPrivate from "../auth/hooks/useAxiosPrivate";

function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosPrivate();

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(endpoint, {
          signal: controller.signal,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data);
        setLoading(false);
      }
    };

    getData();

    return () => controller.abort();
  }, [location.key, endpoint]);

  const refresh = () => {
    navigate(location.pathname);
  };
  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    location,
    navigate,
    refresh,
  };
}

export default useFetch;
