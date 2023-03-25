import React, { useState } from "react";

const Square: React.FC<{
  value: string;
  onSquareClick: () => void;
}> = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default function Board() {
  const initialState = Array(9).fill("");
  const [squares, setSquares] = useState(initialState);
  let winner = calculateWinner(squares);

  const makeUsersMove = (i: number, squares: string[]) => {
    squares[i] = "X";
  };

  const makeOpponentsMove = (squares: string[]) => {
    let field = " ";
    let randomIndex = -1;
    while (field) {
      randomIndex = Math.floor(Math.random() * squares.length);
      field = squares[randomIndex];
    }
    squares[randomIndex] = "O";
  };

  const handleClick = (i: number) => {
    const squareIsAlreadyFilled = Boolean(squares[i]);
    if (squareIsAlreadyFilled || winner) {
      return;
    }
    const nextSquares = squares.slice();
    makeUsersMove(i, nextSquares);

    const boardIsNotFull = Boolean(nextSquares.some((val) => val === ""));
    winner = calculateWinner(nextSquares);

    if (boardIsNotFull && !winner) {
      makeOpponentsMove(nextSquares);
    }
    setSquares(nextSquares);
  };

  const resetGame = () => {
    setSquares(initialState);
    winner = null;
  };

  return (
    <>
      <div className="status">
        {winner && (winner === "X" ? "You Win!" : "You Loose!")}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={resetGame}>Play again!</button>
      </div>
    </>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
