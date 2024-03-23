import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { sideNavData } from "../../data/navData";
import "./SideNavigation.css";

function SideNavigation() {
  useEffect(() => {}, []);
  return (
    <nav className="SideNavigation layout-item">
      <ul>
        {sideNavData.map((navItem) => (
          <li key={navItem.absolutePath}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={navItem.absolutePath}
            >
              <span className="lg">{navItem.title}</span>

              {React.createElement(navItem.icon)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNavigation;
