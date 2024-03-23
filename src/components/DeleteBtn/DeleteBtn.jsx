import React from "react";
import { BiTrash } from "react-icons/bi";
import "./DeleteBtn.css";

function DeleteBtn({ handleClick }) {
  return (
    <button className="DeleteBtn quickAction btn" onClick={handleClick}>
      <BiTrash />
    </button>
  );
}

export default DeleteBtn;
