import React, { useState } from "react";
import { log } from "../../log";

// million-ignore
const ConfigureCounter = ({onSet}) => {
   log('<ConfigureCounter /> rendered', 2);

  const [enteredNumber, setEnteredNumber] = useState(0);
  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>카운터 설정</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>설정</button>
    </section>
  );
};

export default ConfigureCounter;
