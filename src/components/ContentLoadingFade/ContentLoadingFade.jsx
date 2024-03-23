import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "./ContentLoadingFade.css";

function ContentLoadingFade({ text, color, fontSize }) {
  return (
    <div className="ContentLoadingFade">
      <FadeLoader color={color || "rgb(125, 120, 120)"} />
      {text ? <p style={{ fontSize: fontSize || "1rem" }}>{text}</p> : null}
    </div>
  );
}

export default ContentLoadingFade;
