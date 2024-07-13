import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

function Feed({ category }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;

    const videoData = await fetch(videoListUrl)
      .then((response) => response.json())
      .then((data) => data.items);

    const channelIds = videoData
      .map((item) => item.snippet.channelId)
      .join(",");
    const channelListUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${API_KEY}`;

    const channelData = await fetch(channelListUrl)
      .then((response) => response.json())
      .then((data) =>
        data.items.reduce((acc, item) => {
          acc[item.id] = item.snippet.thumbnails.default.url;
          return acc;
        }, {})
      );

    const combinedData = videoData.map((item) => ({
      ...item,
      channelAvatar: channelData[item.snippet.channelId],
    }));

    setData(combinedData);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {data.map((item, index) => (
        <Link
          key={index}
          to={`video/${item.snippet.categoryId}/${item.id}`}
          className="block"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt=""
            className="w-full rounded-lg"
          />
          <div className="flex mt-2 mb-1">
            <img
              className="w-9 h-9 mr-2 rounded-full"
              src={item.channelAvatar}
              alt={`${item.snippet.channelTitle} avatar`}
            />
            <h2 className="text-md font-semibold text-black max-h-12 overflow-hidden">
              {item.snippet.title}
            </h2>
          </div>
          <div className="ms-12">
          <h3 className="text-base text-sm">{item.snippet.channelTitle}</h3>
          <p className="text-base">
            {value_converter(item.statistics.viewCount)} views &bull;{" "}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
          </div>
            
        </Link>
      ))}
    </div>
  );
}

export default Feed;
