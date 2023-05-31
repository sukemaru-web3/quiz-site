import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-pink-200 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the mini game page!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Click the button below to start the game.
      </p>
      <Link
        href="/quiz"
        className="bg-pink-500 text-white px-4 py-2 mb-3 rounded hover:bg-pink-600"
      >
        ヌークイズ
      </Link>
      <Link
        href="/slidePuzzle"
        className="bg-pink-500 text-white px-4 py-2  mb-3 rounded hover:bg-pink-600"
      >
        スライドパズル
      </Link>
      <Link
        href="/timeStop"
        className="bg-pink-500 text-white px-4 py-2  mb-3 rounded hover:bg-pink-600"
      >
        10秒ぴったりゲーム
      </Link>
    </div>
  );
};

export default HomePage;
