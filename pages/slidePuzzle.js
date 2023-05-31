import { useState } from "react";

const puzzleSize = 4;

export default function Home() {
  const [board, setBoard] = useState(getShuffledBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);

  function getShuffledBoard() {
    const numbers = Array.from(
      { length: puzzleSize ** 2 - 1 },
      (_, index) => index + 1
    );
    const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
    return [...shuffledNumbers, null];
  }

  function handleClick(index) {
    if (canMove(index)) {
      const newBoard = [...board];
      const nullIndex = newBoard.indexOf(null);
      newBoard[nullIndex] = newBoard[index];
      newBoard[index] = null;
      setBoard(newBoard);
      setSelectedPiece(null);
    } else {
      setSelectedPiece(index);
    }
  }

  function canMove(index) {
    if (selectedPiece === null) {
      return false;
    }

    const nullIndex = board.indexOf(null);
    const row = Math.floor(nullIndex / puzzleSize);
    const col = nullIndex % puzzleSize;

    const targetRow = Math.floor(index / puzzleSize);
    const targetCol = index % puzzleSize;

    return (
      (targetRow === row && Math.abs(targetCol - col) === 1) ||
      (targetCol === col && Math.abs(targetRow - row) === 1)
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Slide Puzzle</h1>
      <div className="grid grid-cols-4 gap-4 w-80">
        {board.map((value, index) => (
          <div
            key={index}
            className={`p-4 flex justify-center items-center bg-lightblue cursor-pointer ${
              value === null ? "bg-white cursor-default" : ""
            } ${selectedPiece === index ? "border-4 border-blue-600" : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .bg-lightblue {
          background-color: #a0cdf9;
        }
      `}</style>
    </div>
  );
}
