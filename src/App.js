import "./styles.css";
import { useEffect, useState } from "react";

const cell = {
  value: "",
  isUpdated: false,
};

export default function App() {
  const [matrix, setMatrix] = useState([
    [cell, cell, cell],
    [cell, cell, cell],
    [cell, cell, cell],
  ]);
  const [lastValue, setLastValue] = useState("");
  const [gameResult, setGameResult] = useState({
    message: "",
    isOver: false,
  });

  const getNewValue = () => (lastValue === "X" ? "O" : "X");

  const gameValidations = () => {
    //if all columns in a row have same value then game is over
    matrix.forEach((row) => {
      const tmpArr = row.map((cell) => cell.value);
      const value = isGameOver(tmpArr);
      if (value.isOver) return value;
    });

    //if all rows in a column have same value then game is over
    for (let i = 0; i < 3; i++) {
      const tmpArr = [];
      for (let j = 0; j < 3; j++) {
        tmpArr.push(matrix[j][i].value);
      }
      const value = isGameOver(tmpArr);
      if (value.isOver) return value;
    }

    //if left diagonal or right diagnol is having same value then game is over
    {
      const leftDiag = [];
      const rightDiag = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i === j) leftDiag.push(matrix[i][j].value);
          if (i + j === 2) rightDiag.push(matrix[i][j].value);
        }
      }
      const value1 = isGameOver(leftDiag);
      if (value1.isOver) return value1;
      const value2 = isGameOver(rightDiag);
      if (value2.isOver) return value2;
    }

    //if all cells are updated then it is a tie
    if (
      matrix.flatMap((ele) => ele).filter((cell) => cell.isUpdated).length === 9
    ) {
      return {
        message: "This is a tie",
        isOver: true,
      };
    }

    //When empty cells are still present
    return {
      message: "Empty cells left",
      isOver: false,
    };
  };

  const isGameOver = (tmpArr = []) => {
    const set = new Set(tmpArr);
    if (set.size === 1 && ["X", "O"].includes(tmpArr[0]))
      return {
        message: `${tmpArr[0]} is winner`,
        isOver: true,
      };

    return {
      message: "Empty cells left",
      isOver: false,
    };
  };

  const changeValue = (row, col) => {
    if (matrix[row][col].isUpdated) return;

    const tmpMatrix = JSON.parse(JSON.stringify(matrix));
    tmpMatrix[row][col] = {
      value: getNewValue(),
      isUpdated: true,
    };
    setLastValue(getNewValue());
    setMatrix(tmpMatrix);
  };

  const handleReset = (e) => {
    setMatrix([
      [cell, cell, cell],
      [cell, cell, cell],
      [cell, cell, cell],
    ]);
    setLastValue("");
    setGameResult({
      message: "",
      isOver: false,
    });
  };

  useEffect(() => {
    const value = gameValidations();
    setGameResult(value);
  }, [lastValue]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Tic-Tac-Toe in react</h2>
      <div className="App">
        {gameResult.isOver && (
          <div>
            {gameResult.message}
            <button onClick={handleReset}>Reset</button>
          </div>
        )}
        <div className="grid-container">
          {/**----------------------------------------- */}
          <div
            className="grid-item"
            onClick={() => {
              changeValue(0, 0);
            }}
          >
            {matrix[0][0].value}
          </div>
          <div
            className="grid-item"
            onClick={() => {
              changeValue(0, 1);
            }}
          >
            {matrix[0][1].value}
          </div>
          <div
            className="grid-item"
            onClick={() => {
              changeValue(0, 2);
            }}
          >
            {matrix[0][2].value}
          </div>
          {/**----------------------------------------- */}
          <div
            className="grid-item"
            onClick={() => {
              changeValue(1, 0);
            }}
          >
            {matrix[1][0].value}
          </div>
          <div
            className="grid-item"
            onClick={() => {
              changeValue(1, 1);
            }}
          >
            {matrix[1][1].value}
          </div>
          <div
            className="grid-item"
            onClick={() => {
              changeValue(1, 2);
            }}
          >
            {matrix[1][2].value}
          </div>
          {/**----------------------------------------- */}
          <div
            className="grid-item"
            onClick={() => {
              changeValue(2, 0);
            }}
          >
            {matrix[2][0].value}
          </div>
          <div
            className="grid-item"
            onClick={() => {
              changeValue(2, 1);
            }}
          >
            {matrix[2][1].value}
          </div>
          <div
            className="grid-item"
            onClick={() => {
              changeValue(2, 2);
            }}
          >
            {matrix[2][2].value}
          </div>
          {/**----------------------------------------- */}
        </div>
      </div>
    </>
  );
}
