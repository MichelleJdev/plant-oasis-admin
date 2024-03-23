import React from "react";
import "./LocalNavigation.css";
import { NavLink } from "react-router-dom";

function LocalNavigation({ navData = [] }) {
  return (
    <nav className="LocalNavigation layout-item">
      <ul>
        {navData.map((navItem) => (
          <li key={navItem.absolutePath}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={navItem.relativePath}
              end
            >
              {navItem.title}
              {React.createElement(navItem.icon)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LocalNavigation;
