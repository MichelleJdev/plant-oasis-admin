import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateUser.css";
import axiosInstance from "../../../API/axiosInstance";
import useAxiosPrivate from "../../../auth/hooks/useAxiosPrivate";
import { errorMessages } from "../../../data/responseMessages";
import { USERS_ENDPOINT } from "../../../API/endpoints";
import { userSchema } from "../../../schemas";
import handleValidation from "../../../utils/handleValidation";
import PulseLoader from "react-spinners/PulseLoader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function CreateUser() {
  const [loading, setLoading] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPass = (evt) => {
    evt.preventDefault();
    setShowPassword(!showPassword);
  };

  const { name, email, password, confirmPassword } = userFormData;

  const isValid = handleValidation(userSchema, userFormData);
  console.log(isValid);
  const disabled = loading || !isValid;

  const nameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const { confirmPassword: confirmPass, ...formData } = userFormData;
    try {
      const response = await axiosInstance.post(USERS_ENDPOINT, {
        user: formData,
      });
      setLoading(false);
      toast.success("New user created");
      navigate("/users");
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response?.status === 400) {
        return toast.error(
          error.response?.data.message || errorMessages.serverError
        );
      }
      setUserFormData({
        name: "",
        email: "",
        password: "",
      });
      nameRef.current.focus();
      console.log(error);
    }
  };
  const handleChange = (evt) => {
    const newData = { ...userFormData };
    newData[evt.target.name] = evt.target.value;
    setUserFormData(newData);
  };
  return (
    <div className="CreateUser">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            id="name"
            ref={nameRef}
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="pass-input-wrapper">
            <input
              className="pass-type"
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handleChange}
            />
            {showPassword ? (
              <button className="show-hide-btn" onClick={toggleShowPass}>
                <FaRegEyeSlash />
              </button>
            ) : (
              <button className="show-hide-btn" onClick={toggleShowPass}>
                <FaRegEye />
              </button>
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="pass-input-wrapper">
            <input
              className="pass-type"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={handleChange}
            />
            {showPassword ? (
              <button className="show-hide-btn" onClick={toggleShowPass}>
                <FaRegEyeSlash />
              </button>
            ) : (
              <button className="show-hide-btn" onClick={toggleShowPass}>
                <FaRegEye />
              </button>
            )}
          </div>
        </div>
        <button
          className={`btn submit-btn ${disabled ? "disabled" : ""}`}
          type="submit"
          disabled={disabled}
        >
          {loading ? <PulseLoader color="grey" /> : "Create User"}
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
