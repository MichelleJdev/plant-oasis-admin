import { useContext } from "react";
import AuthContext from "../components/AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
