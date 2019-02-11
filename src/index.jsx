import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

function Circle({ value, ...props }) {
  let playerClass;
  switch (value) {
    case "1":
      playerClass = "yellow";
      break;
    case "2":
      playerClass = "red";
      break;
    default:
      playerClass = "";
  }

  return <div className={`circle ${playerClass}`} />;
}

function Board({ circles, height, width, onClick, ...props }) {
  const renderFrame = () => {
    //create array of rows big that i can map over then create board similar to testGame
    const columns = new Array(width).fill(null);
    const game = new Array(height).fill(columns);
    const board = [];
    //map creates new array so may aswell call it soemthing dont want to change original
    let mapped = game.map((column, columnNum) => {
      column = column.map((value, circleNum) => {
        return <Circle value={circles[columnNum][circleNum]} />;
      });
      return board.push(
        <div className="column" onClick={() => onClick(columnNum)}>
          {column}
        </div>
      );
    });
    return board;
  };

  return <div className="frame">{renderFrame()}</div>;
}

function Game({ height, width, ...props }) {
  const [history, setHistory] = useState([
    //Array(height).fill(Array(width).fill(null))
    Array(height)
      .fill()
      .map(value => Array(width).fill(null))
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [playerIsNext, setPlayerIsNext] = useState(true);

  const current = history[stepNumber];
  const handleClick = columnClicked => {
    const curBoard = current.slice();
    //to reverse and fill from bottom i am counting down from length
    for (let i = curBoard[columnClicked].length; 0 <= i; i--) {
      if (curBoard[columnClicked][i] === null) {
        curBoard[columnClicked][i] = playerIsNext ? "1" : "2";
        break;
      }
    }
    //remember hooks have to be in order
    setHistory(history.slice(0, stepNumber + 1).concat([curBoard]));
    setStepNumber(stepNumber + 1);
    setPlayerIsNext(!playerIsNext);
    //if not null then go to next one up
  };

  return (
    <div>
      <Board
        circles={current}
        onClick={col => handleClick(col)}
        height={height}
        width={width}
      />
    </div>
  );
}

function App() {
  return (
    <div className="game">
      <Game height={7} width={6} />
    </div>
  );
}

function calculateWinner() {}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
