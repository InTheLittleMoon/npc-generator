import React from "react";
import "./input-block.css";

export default function RadioPair(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="checkbox-pair-container">
      <label>{capitalizeFirstLetter(props.name)}</label>
      <input
        name="class"
        type="radio"
        onChange={(event) => {
          props.radioHandler(props.name);
        }}
      ></input>
    </div>
  );
}
