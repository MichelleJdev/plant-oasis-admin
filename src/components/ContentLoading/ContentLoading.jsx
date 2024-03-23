import React from "react";
import "./ContentLoading.css";
import PulseLoader from "react-spinners/PulseLoader";

function ContentLoading({ text }) {
  return (
    <div className="ContentLoading">
      {text ? <p>{text}</p> : null}
      <PulseLoader color="rgb(127, 121, 121)" />
    </div>
  );
}

export default ContentLoading;
