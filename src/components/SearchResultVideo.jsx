import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchYouTubeData } from "../data";

function SearchResultVideo({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchYouTubeData(query);
      setResults(data);
    };
    fetchData();
  }, [query]);

  return (
    <>
      <div className="grid grid-cols-1 items-center ms-32 mt-4">
        <div className="w-[80vw] p-5 ps-0 bg-white">
          {results.map((result) => (
            <Link
              key={result.id.videoId}
              to={`https://www.youtube.com/watch?v=${result.id.videoId}`}
              className="flex mb-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={result.snippet.thumbnails.medium.url}
                className="w-full h-auto rounded-md shadow-md"
                alt={result.snippet.title}
              />
              <div className="ms-4">
                <h4 className="text-xl mb-1 font-medium text-black max-h-15 overflow-hidden">
                  {result.snippet.title}
                </h4>
                <p className="text-xs">{result.snippet.channelTitle}</p>
                <div className="flex items-center mt-5">
                  <img
                    className="w-6 h-6 mr-2 rounded-full"
                    src={result.snippet.thumbnails.default.url}
                    alt={result.snippet.channelTitle}
                  />
                  <h3 className="text-base text-xs">
                    {result.snippet.channelTitle}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchResultVideo;
