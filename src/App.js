import React, { useState } from "react";
import "./App.css";
import DisplayBlock from "./components/display-block/display-block";

//components
import InputBlock from "./components/input-block/input-block";
function App() {
  //states
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
        />
      </div>
    </div>
  );
}

export default App;
