import React from "react";
import DisplayBackstory from "./display-backstory";
import "./display-block.css";

export default function DisplayBlock(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log(props.displayArray);

  return (
    <div className="display-container">
      {props.displayArray.map((npc, index) => {
        return (
          <React.Fragment>
            <div className="npc-row" key={index}>
              <div className="npc-upper-row">
                <div className="npc-name">
                  <span style={{ fontWeight: "bold" }}>Name:</span> {npc.name}
                </div>
                <div className="npc-class">
                  <span style={{ fontWeight: "bold" }}>Class:</span>{" "}
                  {capitalizeFirstLetter(npc.class)}
                </div>
              </div>

              <div className="npc-health">
                <span style={{ fontWeight: "bold" }}>Health:</span> {npc.health}
              </div>
              <div className="npc-equipment-row">
                <div style={{ fontWeight: "bold" }}>Equipment:</div>
                {npc.equipment.map((item, index) => {
                  return (
                    <div className="equipment" key={index}>
                      •{item}
                    </div>
                  );
                })}
              </div>
              <div className="npc-shield">
                <span style={{ fontWeight: "bold" }}>Shield:</span>{" "}
                {npc.shield ? "Has shield" : "No shield"}
              </div>
              <div className="npc-magic-items">
                <span style={{ fontWeight: "bold" }}>Magical Items:</span>{" "}
                {npc.magicalItems}
              </div>
              <div className="npc-potions">
                <span style={{ fontWeight: "bold" }}>Potions:</span>{" "}
                {npc.potions}
              </div>
              <DisplayBackstory
                backstory={npc.backstory}
                upArrow={props.upArrow}
                downArrow={props.downArrow}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
