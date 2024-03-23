import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideNavigation from "../SideNavigation/SideNavigation";
import LocalNavigation from "../LocalNavigation/LocalNavigation";
import React from "react";

import "react-toastify/dist/ReactToastify.css";

import "./Layout.css";

function Layout() {
  return (
    <div className="Layout">
      <Header />
      <SideNavigation />
      <Outlet />
    </div>
  );
}

export default Layout;
