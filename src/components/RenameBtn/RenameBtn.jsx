import React from "react";
import { BiRename } from "react-icons/bi";
import "./RenameBtn.css";

function RenameBtn({ handleClick }) {
  return (
    <button className="RenameBtn quickAction btn" onClick={handleClick}>
      <BiRename />
    </button>
  );
}

export default RenameBtn;
