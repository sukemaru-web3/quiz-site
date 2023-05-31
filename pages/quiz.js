import Link from "next/link";
import { useState } from "react";

const QuizPage = () => {
  const questions = [
    {
      question: "ヌークインの店主は誰でしょう？",
      options: ["すけまる", "すけきよ", "すけべぇ"],
      answer: "すけまる",
    },
    {
      question: "ヌークインとはどういう意味？",
      options: [
        "フランス語で《没入する》という意味",
        "英語で《すみっこ》という意味",
        "ロシア語で《寄り集まって》という意味",
      ],
      answer: "英語で《すみっこ》という意味",
    },
    {
      question: "ヌークインのある藤井寺市は…",
      options: [
        "大阪で１番小さい市",
        "全国で１番小さい市",
        "全国で３番目に小さい市",
      ],
      answer: "大阪で１番小さい市",
    },
    {
      question: "マラケシュというボードゲームの特徴は何？",
      options: [
        "自分だけが答えを知っていることを隠しながら、参加者全員をその答えに導くよう場を誘導する",
        "自分のエリアに絨毯を引いて、その絨毯を踏んだプレイヤーからお金を奪う",
        "沈んでいく島で、財宝カードをGetするか、船で脱出するかを選ぶチキンレース",
      ],
      answer:
        "自分のエリアに絨毯を引いて、その絨毯を踏んだプレイヤーからお金を奪う",
    },
    {
      question:
        "NFTを発行する時に必要なスマートコントラクトは何という言語で記述する？",
      options: ["python", "astro", "solidity"],
      answer: "solidity",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const handleOptionSelect = (option) => {
    if (!selectedOption) {
      setSelectedOption(option);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
      setSelectedOption("correct");
    } else {
      setSelectedOption("incorrect");
    }

    setTimeout(() => {
      setSelectedOption("");
      setCurrentQuestion(currentQuestion + 1);
    }, 1000);
  };
  if (currentQuestion >= questions.length) {
    return (
      <div className="bg-pink-200 flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
        <p className="text-lg text-gray-700 mb-6">Your score: {score}</p>
        <Link
          href="https://nookin.net/"
          className="px-6 py-3 bg-gray-500 text-white rounded-full text-xl shadow-md mt-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600"
        >
          戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-pink-200 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Quiz</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Question {currentQuestion + 1}
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        {questions[currentQuestion].question}
      </p>
      <ul className="mb-6">
        {questions[currentQuestion].options.map((option) => (
          <li
            key={option}
            className={`cursor-pointer font-medium rounded-lg py-2 px-4 ${
              option === selectedOption
                ? option === questions[currentQuestion].answer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-white text-pink-500"
            } hover:bg-pink-500 hover:text-white`}
            onClick={() => handleOptionSelect(option)}
            style={{
              pointerEvents: selectedOption ? "none" : "auto",
            }}
          >
            {option}
            {option === selectedOption && (
              <span className="ml-2">
                {option === questions[currentQuestion].answer ? "◯" : "✕"}
              </span>
            )}
          </li>
        ))}
      </ul>
      {selectedOption && (
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuizPage;
