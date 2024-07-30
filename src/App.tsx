import "./App.css";
import { ChoiceReactionTimeMain } from "./components/ChoiceReactionTimeMain";
import { DigitSymbolCodingMain } from "./components/DigitSymbolCodingMain";
import { MemoryRecallMain } from "./components/MemoryRecallMain";
import { SpacialMemoryMain } from "./components/SpacialMemoryMain";
import { randomSelectFromList } from "./utils/generalUtils";

const AnimalList = [
  "Octopus",
  "Elephant",
  "Cat",
  "Lion",
  "Squirrel",
  "Kangaroo",
  "Crocodile",
  "Pigeon",
  "Horse",
  "Fox",
  "Chicken",
  "Eagle",
  "Shark",
  "Dolphin",
  "Parrot",
  "Lizard",
];

function App() {
  return (
    <>
      {/* <SpacialMemoryMain enabled /> */}
      {/* <MemoryRecallMain options={AnimalList} selected={["Octopus", "Elephant", "Cat", "Lion", "Squirrel"]} /> */}
      {/* <ChoiceReactionTimeMain
        correctIndex={randomSelectFromList([0, 1, 2])}
        correctSymbol={randomSelectFromList(["<", ">"])}
      /> */}
      {/* <DigitSymbolCodingMain correctIndex={Math.floor(Math.random() * 10) + 1} /> */}
    </>
  );
}

export default App;
