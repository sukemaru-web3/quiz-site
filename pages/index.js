import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-pink-200 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz Site!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Click the button below to start the quiz.
      </p>
      <Link
        href="/quiz"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Start Quiz
      </Link>
      <Link
        href="/slidePuzzle"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        slidePuzzle
      </Link>
      <Link
        href="/quiz"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default HomePage;
