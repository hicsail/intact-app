import "./App.css";
import { randomSelectFromList } from "./utils/generalUtils";
import { DigitSymbolCodingMain } from "./components/DigitSymbolCodingMain";
import { MemoryRecallMain } from "./components/MemoryRecallMain";
import { TestBattery } from "./components/TestBattery";

function App() {
  return (
    <>
      <TestBattery />
      {/* <MemoryRecallMain selected={["Octopus", "Elephant", "Cat", "Lion", "Squirrel"]} /> */}
      {/* <DigitSymbolCodingMain correctIndex={Math.floor(Math.random() * 10) + 1} /> */}
    </>
  );
}

export default App;
