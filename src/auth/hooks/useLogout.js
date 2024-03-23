import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGOUT_ENDPOINT } from "../../API/endpoints";
import { BASE_URL } from "../../API/axiosInstance";

function useLogout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${LOGOUT_ENDPOINT}`, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setAuth({ accessToken: null, admin: null });
      navigate("/");
    }
  };
  return logout;
}

export default useLogout;
