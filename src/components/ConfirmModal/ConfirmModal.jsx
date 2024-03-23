import React from "react";
import "./ConfirmModal.css";
import PulseLoader from "react-spinners/PulseLoader";

function ConfirmModal({ text, handleConfirm, handleCancel, loading }) {
  return (
    <div
      className="ConfirmModal"
      onClick={() => {
        handleCancel();
      }}
    >
      <div className="modal-body" onClick={(evt) => evt.stopPropagation()}>
        <p className="modal-text">{text}</p>
        <div className="modal-buttons">
          <button
            className="btn modal-btn modal-confirm"
            onClick={handleConfirm}
          >
            {loading ? <PulseLoader /> : "Confirm"}
          </button>
          <button className="btn modal-btn modal-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
