import React, { useState } from "react";
import "./input-block.css";

//components
import RadioPair from "./radio-pair";

//imported logic
import {
  getEquipment,
  getsShield,
  getsPotion,
  greaterItems,
  generateHealth,
} from "../equipment-logic/equipment-logic";
import { backstoryGenerator } from "../backstory-logic/backstory-logic";

export default function InputBlock(props) {
  //states
  const [inputVal, setInputVal] = useState("");
  const [classType, setClassType] = useState(null);

  //classes
  const classNameArray = [
    "artificer", //0
    "barbarian", //1
    "bard", //2
    "cleric", //3
    "druid", //4
    "fighter", //5
    "monk", //6
    "paladin", //7
    "ranger", //8
    "rogue", //9
    "sorcerer", //10
    "warlock", //11
    "wizard", //12
  ];

  //rng name fetch call
  async function generateName() {
    const RNGApiKey = "0186f568d86e42ee940a45e2458be310";
    const requestURL =
      "https://randommer.io/api/Name?nameType=fullname&quantity=1";

    return await fetch(requestURL, { headers: { "X-Api-Key": RNGApiKey } })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  //updates 'inputVal' state val
  const inputChangeHandler = (event) => {
    setInputVal(event.target.value);
  };

  //updates predetermined class value if chosen
  const radioHandler = (target) => {
    console.log(target);
    switch (target) {
      case "artificer":
        setClassType("artificer");
        break;
      case "barbarian":
        setClassType("barbarian");
        break;
      case "bard":
        setClassType("bard");
        break;
      case "cleric":
        setClassType("cleric");
        break;
      case "druid":
        setClassType("druid");
        break;
      case "fighter":
        setClassType("fighter");
        break;
      case "monk":
        setClassType("monk");
        break;
      case "paladin":
        setClassType("paladin");
        break;
      case "ranger":
        setClassType("ranger");
        break;
      case "rogue":
        setClassType("rogue");
        break;
      case "sorcerer":
        setClassType("sorcerer");
        break;
      case "warlock":
        setClassType("warlock");
        break;
      case "wizard":
        setClassType("wizard");
        break;
      case "random":
        setClassType("random");
        break;
      default:
        return;
    }
  };

  //packs input and predetermined choice(if any) into state held in parent component: displayArray
  const submitHandler = async () => {
    let newField = {
      name: inputVal,
      class: classType,
    };

    //handles no name input
    if (newField.name === "") {
      let tempName = await generateName();
      newField.name = tempName;
    }

    //handles no radio selection / random option
    if (newField.class === null || newField.class === "random") {
      newField.class =
        classNameArray[Math.floor(Math.random() * classNameArray.length)];
    }

    newField.backstory = backstoryGenerator(newField.class);
    newField.potions = getsPotion();
    newField.magicalItems = greaterItems();
    newField.health = generateHealth();

    //vets shield and equipment by class
    newField.shield = getsShield(newField.class);
    newField.equipment = getEquipment(newField.class);

    //pushes into main array
    props.setDisplayArray((prevState) => {
      let newState = [...prevState, newField];
      return newState;
    });

    //resets after submit
    setInputVal("");
  };

  return (
    <div className="input-block-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitHandler();
        }}
      >
        {/* if no name, name generator API will make one */}
        <div className="form-top">
          <label>Name: </label>
          <input
            type="text"
            onChange={(event) => {
              inputChangeHandler(event);
            }}
            value={inputVal}
            maxLength="20"
          ></input>
          <button type="submit">Generate</button>
        </div>

        {/* can choose predetermined class */}
        <div className="class-container">
          {/* holds: None, Artificer, Barbarian, Bard, Cleric */}
          <ul className="checkbox-grouping">
            <RadioPair name={"random"} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[0]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[1]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[2]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[3]} radioHandler={radioHandler} />
          </ul>
          {/* holds: Druid, Fighter, Monk, Paladin, Ranger */}
          <ul className="checkbox-grouping">
            <RadioPair name={classNameArray[4]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[5]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[6]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[7]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[8]} radioHandler={radioHandler} />
          </ul>
          {/* Rogue, Sorcerer, Warlock, Wizard */}
          <ul className="checkbox-grouping">
            <RadioPair name={classNameArray[9]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[10]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[11]} radioHandler={radioHandler} />
            <RadioPair name={classNameArray[12]} radioHandler={radioHandler} />
          </ul>
        </div>
      </form>
    </div>
  );
}
