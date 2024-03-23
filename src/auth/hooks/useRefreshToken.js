import useAuth from "./useAuth";
import axios from "../../API/axiosInstance";

function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { accessToken, admin } = response.data;
      setAuth({
        accessToken,
        admin,
      });

      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      setAuth({ accessToken: null, admin: null });

      return Promise.reject(error);
    }
  };

  return refresh;
}

export default useRefreshToken;
