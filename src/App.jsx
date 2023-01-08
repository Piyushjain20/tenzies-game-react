import { useState, useEffect } from "react";
import Die from "./Die";
import Confetti from "react-confetti";
import ScoreBoard from "./ScoreBoard";

function App() {
  const [diceArray, setDiceArray] = useState(() => initializeDice());
  const [tenzies, setTenzies] = useState(false);
  const [turn, setTurn] = useState(0);

  // to maintain confetti in whole window if someresize window after winning
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  // diceArray object layout
  // {  id  :
  //    currentNumber :
  //    isFixed :
  // }
  function initializeDice() {
    let tempArray = [];
    for (let i = 0; i < 10; i++) {
      let newDice = {
        id: i,
        currentNumber: Math.ceil(Math.random() * 6),
        isFixed: false,
      };
      tempArray.push(newDice);
    }
    return tempArray;
  }
  function startNewGame() {
    setDiceArray(initializeDice());
    setTurn(0);
    setTenzies(false);
  }

  useEffect(() => {
    const temp = diceArray[0].currentNumber;
    const allFixed = diceArray.every((die) => die.isFixed);
    const allSameFace = diceArray.every((die) => die.currentNumber === temp);
    if (allFixed && allSameFace) {
      setTenzies(true);
    }
  }, [diceArray]);

  function fixUnfixDie(event, id) {
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((die) => {
        return die.id !== id ? die : { ...die, isFixed: !die.isFixed };
      })
    );
  }
  function rollDices() {
    setDiceArray((prev) =>
      prev.map((die) => {
        return die.isFixed ? die : { ...die, currentNumber: Math.ceil(Math.random() * 6) };
      })
    );
    setTurn((turn) => turn + 1);
  }

  return (
    <div className="App">
      {tenzies && <Confetti width={windowSize.width} height={windowSize.height} />}
      {tenzies ? (
        <ScoreBoard score={turn} />
      ) : (
        <div>
          <h1 className="game--title">Tenzies</h1>
          <p className="game--rules">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="die--container">
            {diceArray.map((obj) => (
              <Die key={obj.id} myState={obj} selectDie={fixUnfixDie} />
            ))}
          </div>
          <div className="game--turns">Number of Rolls : {turn}</div>
        </div>
      )}
      {tenzies ? <button onClick={startNewGame}>Play Again</button> : <button onClick={rollDices}>Roll</button>}
    </div>
  );
}
export default App;
