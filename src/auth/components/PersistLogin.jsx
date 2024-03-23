import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function PersistLogin() {
  const { auth, persistLogin } = useAuth();
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    !auth.accessToken && persistLogin
      ? verifyRefreshToken()
      : setLoading(false);
  }, [auth.accessToken, persistLogin]);
  return !persistLogin ? <Outlet /> : loading ? <p>Loading</p> : <Outlet />;
}

export default PersistLogin;
