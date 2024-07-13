import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import ReadMore from "./ReadMore";

function PlayVideo() {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideoData = async () => {
    try {
      const videDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(videDetails_url);
      const data = await res.json();
      setApiData(data.items[0]);
    } catch (error) {
      setError("Error fetching video data");
      console.error("Error fetching video data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelData = async (channelId) => {
    try {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
      const res = await fetch(channelData_url);
      const data = await res.json();
      setChannelData(data.items[0]);
    } catch (error) {
      setError("Error fetching channel data");
      console.error("Error fetching channel data:", error);
    }
  };

  const fetchCommentData = async () => {
    try {
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
      const res = await fetch(comment_url);
      const data = await res.json();
      setCommentData(data.items);
    } catch (error) {
      setError("Error fetching comment data");
      console.error("Error fetching comment data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchChannelData(apiData.snippet.channelId);
      fetchCommentData();
    }
  }, [apiData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex-grow p-3 bg-white w-[60vw]">
      <iframe
        className="w-full h-[80vh]"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube video player"
      ></iframe>

      <h3 className="mt-2 font-semibold text-xl px-4">
        {apiData ? apiData.snippet.title : "Loading..."}
      </h3>
      <div className="flex h-12 w-[69vw] pl-4 justify-between">
        <div className="flex gap-3 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={channelData ? channelData.snippet.thumbnails.default.url : ""}
            alt="Channel"
          />
          <div className="flex flex-col">
            <p className="text-black font-semibold text-lg">
              {apiData ? apiData.snippet.channelTitle : "Loading..."}
            </p>
            <span className="text-xs text-gray-600">
              {channelData
                ? value_converter(channelData.statistics.subscriberCount)
                : "Loading..."}{" "}
              Subscribers
            </span>
          </div>
          <button className="text-gray-100 font-medium text-sm bg-stone-950 p-3 h-8 border-0 outline-0 rounded-2xl cursor-pointer flex items-center hover:bg-stone-800">
            Subscribe
          </button>
        </div>
        <div className="flex items-center justify-between flex-wrap text-sm text-gray-600 px-2">
          <div>
            <span className="inline-flex items-center ml-4">
              <img src={like} alt="Like" className="w-5 mr-2" />
              {apiData ? value_converter(apiData.statistics.likeCount) : 0}
            </span>
            <span className="inline-flex items-center ml-4">
              <img src={dislike} alt="Dislike" className="w-5 mr-2" />
            </span>
            <span className="inline-flex items-center ml-4">
              <img src={share} alt="Share" className="w-5 mr-2" />
              Share
            </span>
            <span className="inline-flex items-center ml-4">
              <img src={save} alt="Save" className="w-5 mr-2" />
              Save
            </span>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="bg-zinc-100 m-4 rounded-xl p-3">
        <h5 className="font-semibold">
          {apiData ? value_converter(apiData.statistics.viewCount) : 0} views
          &nbsp;
          {moment(apiData.snippet.publishedAt).fromNow()}&nbsp;
        </h5>
        <pre>
          <ReadMore
            id="read-more-text"
            text={apiData ? apiData.snippet.description : "Loading..."}
          />
        </pre>
      </div>

      <div className="px-6 my-2">
        <h4 className="text-lg font-semibold mt-4">
          {apiData ? value_converter(apiData.statistics.commentCount) : 0}{" "}
          Comments
        </h4>
        {commentData && commentData.length > 0 ? (
          commentData.map((item, index) => (
            <div key={index} className="flex items-start my-4 w-1/2">
              <img
                className="w-9 rounded-full mr-4"
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt="User"
              />
              <div>
                <h3 className="text-xs font-semibold mb-1">
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span className="text-xs text-gray-600 font-medium ml-2">
                    {moment(
                      item.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p className="text-sm">
                  <ReadMore
                    id="read-more-text"
                    text={item.snippet.topLevelComment.snippet.textOriginal}
                  />
                </p>

                <div className="flex items-center my-2 text-xs text-gray-600">
                  <img src={like} alt="like" className="w-5 mr-2" />
                  <span className="mr-4">
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="dislike" className="w-5 mr-2" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
}

export default PlayVideo;
