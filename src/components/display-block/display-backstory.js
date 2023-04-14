import React, { useState } from "react";
import "./display-block.css";

export default function DisplayBackstory(props) {
  //held states
  const [windowState, setWindowState] = useState(true);
  let divIMG =
    "https://cdn0.iconfinder.com/data/icons/glyphpack/26/double-arrow-down-512.png";

  const openWindow = () => {
    setWindowState(!windowState);
  };

  return (
    <div className="backstory-container">
      <div onClick={openWindow} className="img-container">
        <img
          alt=""
          src="https://cdn0.iconfinder.com/data/icons/glyphpack/26/double-arrow-down-512.png"
        />
      </div>
      <div style={{ display: windowState ? "none" : "block" }}>HIHI</div>
    </div>
  );
}
