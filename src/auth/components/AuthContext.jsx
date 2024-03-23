import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosInstance";
import { toast } from "react-toastify";

const LOGOUT_ENDPOINT = "/auth/logout";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    admin: null,
  });

  const [persistLogin, setPersistLogin] = useState(false);
  const isLoggedIn = !!auth?.user;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(LOGOUT_ENDPOINT);
      console.log(response);
      setAuth({ accessToken: null, admin: null });
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      setAuth({ accessToken: null, admin: null });
      toast.error("Something went wrong");
    }
  };

  const value = {
    auth,
    setAuth,
    handleLogout,
    isLoggedIn,
    persistLogin,
    setPersistLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
