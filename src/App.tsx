import "./App.css";
import { randomSelectFromList } from "./utils/generalUtils";
import { ChoiceReactionTimeMain } from "./components/ChoiceReactionTimeMain";
import { DigitSymbolCodingMain } from "./components/DigitSymbolCodingMain";
import { MemoryRecallMain } from "./components/MemoryRecallMain";
import { SpacialMemoryMain } from "./components/SpacialMemoryMain";
import { TestBattery } from "./components/TestBattery";

function App() {
  return (
    <>
      <TestBattery />
      {/* <SpacialMemoryMain numNodes={5} /> */}
      {/* <MemoryRecallMain selected={["Octopus", "Elephant", "Cat", "Lion", "Squirrel"]} /> */}
      {/* <DigitSymbolCodingMain correctIndex={Math.floor(Math.random() * 10) + 1} /> */}
      {/* <ChoiceReactionTimeMain
        correctIndex={randomSelectFromList([0, 1, 2])}
        correctSymbol={randomSelectFromList(["<", ">"])}
      /> */}
    </>
  );
}

export default App;
