import React, { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";
import moment from "moment";

function Recommended() {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&videoCategoryId=0&key=${API_KEY}`;

    await fetch(relatedVideo_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[25vw] p-5 ps-0 bg-white">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          key={index}
          className="flex justify-between mb-2"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt=""
            className="w-40 h-full rounded-md"
          />
          <div className="ms-4">
            <h4 className="text-sm mb-1 font-semibold text-black h-10 overflow-hidden">{item.snippet.title}</h4>
            <p className="text-xs">{item.snippet.channelTitle}</p>
            <p className="text-xs">
              {value_converter(item.statistics.viewCount)} Views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Recommended;
