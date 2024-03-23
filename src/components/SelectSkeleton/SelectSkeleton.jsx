import React from "react";
import "./SelectSkeleton.css";
import PulseLoader from "react-spinners/PulseLoader";

function SelectSkeleton({ text }) {
  return (
    <div className="SelectSkeleton">
      <div className="skeleton-content">
        <PulseLoader size="6px" color="rgb(84, 86, 86)" />
      </div>
    </div>
  );
}

export default SelectSkeleton;
