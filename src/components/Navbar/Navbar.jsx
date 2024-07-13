import React from "react";
import menu_icon from "../../assets/icons/hamburger-menu.svg";
import logo from "../../assets/icons/youtube-logo.svg";
import search_icon from "../../assets/icons/search.svg";
import upload_icon from "../../assets/icons/upload.svg";
import notification_icon from "../../assets/icons/notifications.svg";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";

function Navbar({ setSidebar }) {
  return (
    <nav className="bg-white h-16 pt-1 flex justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <img
          className="h-9 w-9 ml-5 mr-5 rounded-full p-1.5 hover:bg-gray-200 cursor-pointer"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt="menu icon"
        />
        <Link to="/">
          <img className="h-5 cursor-pointer" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex flex-1 items-center ml-16 mr-8 max-w-lg">
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-9 pl-3 text-base border border-gray-400 rounded-l-full focus:outline-none"
          />
          <img
            src={search_icon}
            alt="search icon"
            className="h-9 w-16 bg-gray-50 border border-gray-400 rounded-r-full p-1 -ml-1 hover:bg-gray-200 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center mr-6 space-x-4">
        <button className="h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center">
          <img src={upload_icon} className="h-6 cursor-pointer" alt="upload icon" />
        </button>
        <button className="h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center relative">
          <img
            src={notification_icon}
            className="h-6 cursor-pointer"
            alt="notification icon"
          />
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
            3
          </div>
        </button>
        <img
          src={profile_icon}
          className="h-8 w-8 rounded-full cursor-pointer ml-6"
          alt="profile icon"
        />
      </div>
    </nav>
  );
}

export default Navbar;
