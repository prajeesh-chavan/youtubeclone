import React, { useState, useEffect } from "react";
import home from "../../assets/icons/home.svg";
import shorts from "../../assets/icons/shorts.svg";
import subscriptions from "../../assets/icons/subscriptions.svg";
import game_icon from "../../assets/game_icon.png";
import entertainment from "../../assets/entertainment.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import { API_KEY } from "../../data";

function Sidebar({ sidebar, category, setCategory }) {
  const [subs, setSubs] = useState([]);
  const [channelData, setChannelData] = useState([]);

  const fetchData = async () => {
    const subs_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&videoCategoryId=0&key=${API_KEY}`;

    try {
      const res = await fetch(subs_url);
      const data = await res.json();
      setSubs(data.items);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const fetchChannelData = async (channelId) => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;

    try {
      const res = await fetch(channelData_url);
      const data = await res.json();
      return data.items[0];
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getChannelData = async () => {
      if (subs.length > 0) {
        const channels = await Promise.all(
          subs.map((sub) => fetchChannelData(sub.snippet.channelId))
        );
        setChannelData(channels);
      }
    };
    getChannelData();
  }, [subs]);

  return (
    <div
      className={`bg-white fixed top-0 ${
        sidebar ? "w-60" : "w-16"
      } h-screen pt-20 pl-2 ms-2 overflow-hidden hover:overflow-y-auto transition-width duration-300`}
      style={{ scrollbarWidth: "thin" }}
    >
      <div className="flex flex-col">
        <div
          className={`flex items-center mb-5 ${
            category === 0 ? "hover:bg-gray-300" : ""
          }`}
          onClick={() => setCategory(0)}
        >
          <img src={home} alt="home icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Home</p>}
        </div>
        <div className="flex items-center mb-5">
          <img src={shorts} alt="shorts icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Shorts</p>}
        </div>
        <div className="flex items-center mb-5">
          <img
            src={subscriptions}
            alt="subscriptions icon"
            className="w-6 mr-5"
          />
          {sidebar && <p className="text-sm">Subscriptions</p>}
        </div>
      </div>

      <div className={`${sidebar ? "flex flex-col mt-8" : "hidden"}`}>
        <hr className="border-gray-300 mb-5" />
        {sidebar && (
          <h3 className="text-sm font-semibold text-black mb-5">Explore</h3>
        )}
        <div
          className={`flex items-center mb-5 ${
            category === 20 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(20)}
        >
          <img src={game_icon} alt="game icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Gaming</p>}
        </div>
        <div
          className={`flex items-center mb-5 ${
            category === 2 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(2)}
        >
          <img src={automobiles} alt="automobiles icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Automobiles</p>}
        </div>
        <div
          className={`flex items-center mb-5 ${
            category === 17 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(17)}
        >
          <img src={sports} alt="sports icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Sports</p>}
        </div>
        <div
          className={`flex items-center mb-5 ${
            category === 24 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(24)}
        >
          <img
            src={entertainment}
            alt="entertainment icon"
            className="w-6 mr-5"
          />
          {sidebar && <p className="text-sm">Entertainment</p>}
        </div>
        <div
          className={`flex items-center mb-5 ${
            category === 28 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(28)}
        >
          <img src={tech} alt="tech icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Technology</p>}
        </div>
        <div
          className={`flex items-center mb-5 ${
            category === 10 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(10)}
        >
          <img src={music} alt="music icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Music</p>}
        </div>
        <div
          className={`flex items-center mb-5 ${
            category === 22 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(22)}
        >
          <img src={blogs} alt="blogs icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">Blogs</p>}
        </div>
        <div
          className={`flex items-center mb-5 ${
            category === 25 ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory(25)}
        >
          <img src={news} alt="news icon" className="w-6 mr-5" />
          {sidebar && <p className="text-sm">News</p>}
        </div>
        <hr className="border-gray-300 mt-5 mb-5" />
      </div>

      <div className={`${sidebar ? "flex flex-col" : "hidden"}`}>
        <h3 className="text-sm font-semibold text-black mb-5">Subscriptions</h3>
        {channelData.map((item, index) => (
          <div className="flex items-center mb-5" key={index}>
            <img
              src={item ? item.snippet.thumbnails.default.url : ""}
              alt=""
              className="w-6 rounded-full mr-5"
            />
            {sidebar && (
              <p className="text-sm truncate">
                {item ? item.snippet.title : ""}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
