import React, { useEffect } from "react";
import "./NameEditor.css";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";

function NameEditor({
  newName,
  setNewName,
  handleRename,
  setResourceToRename,
  currentName,
}) {
  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  const disabled = currentName === newName;
  return (
    <div className="NameEditor">
      <input
        type="text"
        value={newName}
        className={disabled ? "rename-field disabled" : "rename-field"}
        onChange={(evt) => setNewName(evt.target.value)}
      />
      <div className="rename-btn-group">
        <button
          disabled={disabled}
          className="btn confirm-btn"
          onClick={() => handleRename()}
        >
          <AiOutlineCheckCircle />
        </button>
        <button
          className="btn cancel-btn"
          onClick={() => setResourceToRename(null)}
        >
          <ImCancelCircle />
        </button>
      </div>
    </div>
  );
}

export default NameEditor;
