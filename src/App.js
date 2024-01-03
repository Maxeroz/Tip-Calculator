import { useState } from "react";
import "./index.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);

  const tip = (percent1 + percent2) / 2;

  function handleResetAll() {
    setInputValue("");
    setPercent1(0);
    setPercent2(0);
  }

  function handleInput(e) {
    if (isNaN(e.target.value)) return;

    setInputValue(Number(e.target.value));
  }

  return (
    <div>
      <InputBill inputValue={inputValue} onHandleInput={handleInput}>
        How much was the bill?
      </InputBill>
      <SelectService
        inputValue={inputValue}
        percent={percent1}
        onSetPercent={setPercent1}
      >
        How did you like the service?
      </SelectService>
      <SelectService
        inputValue={inputValue}
        percent={percent2}
        onSetPercent={setPercent2}
      >
        How did you friend like the service?
      </SelectService>
      {inputValue ? (
        <>
          <Output inputValue={inputValue} tip={tip} />
          <ResetButton onResetAll={handleResetAll}>Reset</ResetButton>
        </>
      ) : (
        " "
      )}
      {/* <Output inputValue={inputValue} tip={tip} />
      <ResetButton onResetAll={handleResetAll}>Reset</ResetButton> */}
    </div>
  );
}

function InputBill({ children, onHandleInput, inputValue }) {
  return (
    <div className="input__bill">
      <p>{children}</p>
      <input
        type="text"
        placeholder="Type your bill..."
        value={inputValue}
        onChange={onHandleInput}
      />
    </div>
  );
}

function SelectService({ children, percent, onSetPercent }) {
  function handleSelectChange(e) {
    onSetPercent(Number(e.target.value));
  }

  return (
    <div className="select__service">
      <p>{children}</p>
      <select value={percent} onChange={(e) => handleSelectChange(e)}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Output({ inputValue, tip }) {
  return (
    <p>
      You pay ${inputValue + tip} (${inputValue} + ${tip} tip)
    </p>
  );
}

function ResetButton({ children, onResetAll }) {
  return <button onClick={onResetAll}>{children}</button>;
}

export default App;
