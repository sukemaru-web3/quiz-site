import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [result, setResult] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      setStartTime(Date.now());
      setEndTime(0);
      setResult(null);
      setElapsedTime(0);

      const intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (endTime > 0) {
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
      const elapsedMilliseconds = (endTime - startTime) % 1000;
      if (elapsedSeconds === 9 && elapsedMilliseconds >= 500) {
        setResult("成功！");
      } else {
        setResult("失敗！");
      }
    }
  }, [endTime, startTime]);

  function handleStartGame() {
    setIsPlaying(true);
  }

  function handleStopGame() {
    if (isPlaying) {
      setEndTime(Date.now());
      setIsPlaying(false);
      setElapsedTime((Date.now() - startTime) / 10);
    }
  }

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">10秒ゲーム</h1>
      {!isPlaying && !result && (
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600"
          onClick={handleStartGame}
        >
          スタート
        </button>
      )}
      {isPlaying && !result && (
        <div className="flex flex-col items-center mt-8">
          {elapsedTime < 500 && (
            <p className="text-2xl mb-4">時間経過: {elapsedTime / 100}秒</p>
          )}
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-full text-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600"
            onClick={handleStopGame}
          >
            ストップ
          </button>
        </div>
      )}
      {result && (
        <div className="flex flex-col items-center mt-8">
          <p className="text-3xl mb-4">{result}</p>
          <p className="text-2xl">経過時間: {elapsedTime / 100}秒</p>
          <Link
            href="https://nookin.net/"
            className="px-6 py-3 bg-gray-500 text-white rounded-full text-xl shadow-md mt-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600"
          >
            戻る
          </Link>
        </div>
      )}
    </div>
  );
}
