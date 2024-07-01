import { Link } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import { IoMdPerson } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import "./Header.css";
import useLogout from "../../auth/hooks/useLogout";

function Header() {
  const { auth } = useAuth();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="Header layout-item">
      <Link to="/">
        <h1>The Garden Hub</h1>
      </Link>
      <ul>
        {" "}
        <li className="username">
          <IoMdPerson />
          {auth.admin.firstName}
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            <IoIosLogOut />
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
