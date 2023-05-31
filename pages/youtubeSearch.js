import React, { useState } from "react";
import axios from "axios";

export default function YouTubeSearchApp() {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState([]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const searchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${keyword}&key=${process.env.NEXT_PUBLIC_YOUR_YOUTUBE_API_KEY}`
      );

      setVideos(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">YouTube Video Search</h1>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          className="border border-gray-400 rounded py-2 px-4 mb-4"
          placeholder="Enter keyword"
        />
        <button
          onClick={searchVideos}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
        <div className="mt-8">
          {videos.map((video) => (
            <div key={video.id.videoId} className="mb-4">
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {video.snippet.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
