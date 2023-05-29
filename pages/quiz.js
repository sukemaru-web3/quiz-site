import { useState } from "react";

const QuizPage = () => {
  const questions = [
    {
      question:
        "この人物は誰でしょう？「リンカーンの遺体を盗んで身代金を要求した犯罪者」",
      options: [
        "ジョン・ウィルクス・ブース",
        "ジェシー・ジェームズ",
        "ジョン・ディリンジャー",
      ],
      answer: "ジョン・ウィルクス・ブース",
    },
    {
      question:
        "この人物は誰でしょう？「実験により万能遺伝子編集技術CRISPRを開発した科学者」",
      options: [
        "ロバート・ゴダード",
        "フランシス・クリック",
        "ジェニファー・ダウドナー",
      ],
      answer: "ジェニファー・ダウドナー",
    },
    {
      question:
        "この人物は誰でしょう？「フランス革命期に処刑されたフランスの王妃」",
      options: [
        "マリー・アントワネット",
        "エリザベス1世",
        "キャサリン・メドィチ",
      ],
      answer: "マリー・アントワネット",
    },
    {
      question: "この人物は誰でしょう？「南アフリカ共和国初の黒人大統領」",
      options: ["ネルソン・マンデラ", "ロバート・ムガベ", "ケニー・ドゥアラ"],
      answer: "ネルソン・マンデラ",
    },
    {
      question:
        "この人物は誰でしょう？「世界初のコンピュータプログラマーとされる数学者」",
      options: ["アダ・ラブレス", "グレース・ホッパー", "エイダ・イブ"],
      answer: "エイダ・イブ",
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
