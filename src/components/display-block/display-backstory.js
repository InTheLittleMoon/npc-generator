import React, { useState } from "react";
import "./display-block.css";

export default function DisplayBackstory(props) {
  //held states
  const [windowState, setWindowState] = useState(true);

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
      <div
        className="npc-backstory-details-container"
        style={{ display: windowState ? "none" : "block" }}
      >
        <div className="npc-background-title">{props.backstory[0]}</div>
        <div className="npc-background-description">{props.backstory[1]}</div>
      </div>
    </div>
  );
}
