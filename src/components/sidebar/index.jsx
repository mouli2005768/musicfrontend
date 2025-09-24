import React from "react";
import "./sidebar.css";
import Sidebarbutton from "./Sidebarbutton";

import { MdFavorite, MdLogout, MdSpaceDashboard } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";

function Sidebar({ setUser, setPage }) {
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("landing"); // ✅ go back to SinglePage.jsx
  };

  return (
    <div className="sidebar-container">
      <img
        src="https://cdn4.iconfinder.com/data/icons/public-sign-part03/100/_-14-512.png"
        className="profile-img"
        alt="profile"
      />

      <div>
        <Sidebarbutton title="Explore" to="/feed" icon={<MdSpaceDashboard />} />
        <Sidebarbutton title="Favourites" to="/favourites" icon={<MdFavorite />} />
        <Sidebarbutton title="Player" to="/player/1" icon={<FaPlay />} />
        <Sidebarbutton title="Premium" to="/premium" icon={<IoLibrary />} />
      </div>

      {/* ✅ Signout button triggers handleSignOut */}
      <div onClick={handleSignOut}>
        <Sidebarbutton title="Sign Out" to="" icon={<MdLogout />} />
      </div>
    </div>
  );
}

export default Sidebar;
