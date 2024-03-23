import React from "react";
import { Outlet } from "react-router-dom";
import LocalNavigation from "../LocalNavigation/LocalNavigation";

function MainContent({ navData = null }) {
  return (
    <>
      <LocalNavigation navData={navData} />
      <main className="layout-item">
        <Outlet />
      </main>
    </>
  );
}

export default MainContent;
