import React from "react";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import "./ViewOrEditBtn.css";

function ViewOrEditBtn({ path }) {
  return (
    <button className="ViewOrEditBtn quickAction btn">
      <Link to={path}>
        <BiEditAlt />
      </Link>
    </button>
  );
}

export default ViewOrEditBtn;
