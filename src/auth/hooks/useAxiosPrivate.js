import { useEffect } from "react";
import axiosInstance from "../../API/axiosInstance";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

function useAxiosPrivate() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevRequest = err.config;

        console.log(err);
        if (
          err.response?.status === 403 &&
          err.response.data?.message === "access expired" &&
          !prevRequest.sent
        ) {
          const newAccessToken = await refresh();
          prevRequest.sent = true;
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(err);
      }
    );
    const cleanup = () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };

    return cleanup;
  }, [auth]);
  return axiosInstance;
}

export default useAxiosPrivate;
