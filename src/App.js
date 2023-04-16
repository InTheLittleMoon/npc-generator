import React, { useState } from "react";
import "./App.css";
import DisplayBlock from "./components/display-block/display-block";

//for display-backstory
import downArrow from "./assets/double-arrow-down.png";
import upArrow from "./assets/double-arrow-up.png";

//components
import InputBlock from "./components/input-block/input-block";
function App() {
  //state for held npc objects
  const [displayArray, setDisplayArray] = useState([]);

  return (
    <div className="app-container-main">
      <div className="app-container">
        <InputBlock
          displayArray={displayArray}
          setDisplayArray={setDisplayArray}
        />
        <DisplayBlock
          displayArray={displayArray}
          setDisplayArray={setDisplayArray}
          upArrow={upArrow}
          downArrow={downArrow}
        />
      </div>
    </div>
  );
}

export default App;
