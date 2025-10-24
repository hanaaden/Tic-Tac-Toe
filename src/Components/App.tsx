import { useState } from 'react';
import "./App.css";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board-row">
        {squares.slice(0, 3).map((val, idx) => (
          <Square key={idx} value={val} onSquareClick={() => handleClick(idx)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((val, idx) => (
          <Square key={idx + 3} value={val} onSquareClick={() => handleClick(idx + 3)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(6, 9).map((val, idx) => (
          <Square key={idx + 6} value={val} onSquareClick={() => handleClick(idx + 6)} />
        ))}
      </div>
    </>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
