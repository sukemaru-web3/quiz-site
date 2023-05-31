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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchVideos();
  };

  return (
    <div className="container mx-auto h-auto flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">YouTube Video Search</h1>
        <div className="flex items-center justify-center mb-8">
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center justify-center mb-8"
          >
            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={handleKeywordChange}
              className="border border-gray-400 rounded py-2 px-4 mr-2 w-64"
              placeholder="Enter keyword"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-white rounded overflow-hidden shadow-lg mb-4"
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4"
              >
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {video.snippet.title}
                  </p>
                  <p className="text-sm text-gray-700">
                    {video.snippet.channelTitle}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
