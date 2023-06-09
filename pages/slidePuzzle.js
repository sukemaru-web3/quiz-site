import Link from "next/link";
import { useState, useEffect } from "react";

const puzzleSize = 4;

export default function Home() {
  const [board, setBoard] = useState(getShuffledBoard());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (checkCompletion(board)) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [board]);

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
    }
  }

  function canMove(index) {
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

  function checkCompletion(board) {
    for (let i = 0; i < board.length - 1; i++) {
      if (board[i] !== i + 1) {
        return false;
      }
    }
    return board[board.length - 1] === null;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Slide Puzzle</h1>
      <p>数字をタッチすると移動するよ</p>
      <p>上から順に1～4、5～8、9～12、13～15、右下のマスが空欄になればOK</p>
      <div className="grid grid-cols-4 gap-4 w-80">
        {board.map((value, index) => (
          <div
            key={index}
            className={`p-4 flex justify-center items-center bg-lightblue cursor-pointer ${
              value === null ? "bg-white cursor-default" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      {isComplete && (
        <div>
          <p className="text-2xl mt-4">完成！</p>

          <Link
            href="https://nookin.net/"
            className="px-6 py-3 bg-gray-500 text-white rounded-full text-xl shadow-md mt-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600"
          >
            戻る
          </Link>
        </div>
      )}
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
