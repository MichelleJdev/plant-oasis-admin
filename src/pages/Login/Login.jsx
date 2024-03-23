import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { loginSchema } from "../../schemas";
import axios from "axios";
import useAuth from "../../auth/hooks/useAuth";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import handleValidation from "../../utils/handleValidation";
import "./Login.css";

const LOGIN_ENDPOINT = "https://plantoasisadmin-api.onrender.com/auth/login";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const isValid = handleValidation(loginSchema, loginData);

  const { setAuth } = useAuth();
  const [passVisible, setPassVisible] = useState(false);

  const redirectRoute = location.state?.returnTo || "/";

  const handleChange = (evt) => {
    const newState = {
      ...loginData,
      [evt.target.name]: evt.target.value,
    };
    setLoginData(newState);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!isValid) return;

    const formData = { auth: { ...loginData } };
    try {
      setLoading(true);
      const response = await axios.post(LOGIN_ENDPOINT, formData, {
        withCredentials: true,
      });
      console.log(response);
      const { accessToken, admin } = response.data;
      setAuth({
        accessToken,
        admin,
      });
      setLoading(false);
      toast.success(`Welcome back ${response.data?.admin?.firstName}`);
      navigate(redirectRoute);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoginData({ email: "", password: "" });
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <div className="container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              formNoValidate
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              ref={emailRef}
            />
          </div>
          <div className="input-group pass">
            <label htmlFor="password">Password</label>
            <input
              type={passVisible ? "text" : "password"}
              formNoValidate
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="pwField"
            />
            {passVisible ? (
              <AiOutlineEyeInvisible
                className="visibilityBtn"
                onClick={() => setPassVisible(false)}
              />
            ) : (
              <AiOutlineEye
                className="visibilityBtn"
                onClick={() => setPassVisible(true)}
              />
            )}
          </div>
          <button
            disabled={!isValid || loading}
            className={`btn submit-btn ${
              !isValid || loading ? "disabled" : ""
            } `}
          >
            {loading ? <PulseLoader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
