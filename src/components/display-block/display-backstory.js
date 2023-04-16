import React, { useState } from "react";
import "./display-block.css";

export default function DisplayBackstory(props) {
  const [windowState, setWindowState] = useState(false);

  const openWindow = () => {
    setWindowState(!windowState);
  };

  return (
    <div className="backstory-container">
      <div onClick={openWindow} className="img-container">
        <img
          className="image"
          alt=""
          src={windowState ? props.upArrow : props.downArrow}
        />
      </div>
      {windowState && (
        <div className="npc-backstory-details-container">
          <div className="npc-background-title">{props.backstory[0]}</div>
          <div className="npc-background-description">{props.backstory[1]}</div>
        </div>
      )}
    </div>
  );
}
