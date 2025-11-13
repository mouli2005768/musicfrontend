import React from "react";
import { Routes, Route } from "react-router-dom";
import SideButton from "./SideButton"; 
import "./AdminPage.css";

// Screens
import AddSongs from "./AddSongs";
import ListSongs from "./ListSongs";
import AddAlbum from "./AddAlbum";
import ListAlbum from "./ListAlbum";
import AdminDashboard from "./AdminDashboard";

// Icons
import { FaChartPie, FaPlus, FaList, FaCompactDisc, FaSignOutAlt } from "react-icons/fa";

import { MdLibraryMusic } from "react-icons/md";

function AdminPage({ fullname, setUser, setPage }) {
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("landing"); // ✅ back to landing only when signing out
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🎵 Admin Dashboard</h2>
        <p className="welcome">Welcome, {fullname}</p>
        <div className="menu">
          <SideButton title="Dashboard" to="dashboard" icon={<FaChartPie />} />
          <SideButton title="Add Song" to="addsongs" icon={<FaPlus />} />
          <SideButton title="List Songs" to="listsongs" icon={<FaList />} />
          <SideButton title="Add Album" to="addalbum" icon={<FaCompactDisc />} />
          <SideButton title="List Albums" to="listalbums" icon={<MdLibraryMusic />} />
        </div>

        {/* Sign Out */}
        <div className="signout-section">
          <button className="signout-btn" onClick={handleSignOut}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="addsongs" element={<AddSongs />} />
          <Route path="listsongs" element={<ListSongs />} />
          <Route path="addalbum" element={<AddAlbum />} />
          <Route path="listalbums" element={<ListAlbum />} />
          
          <Route path="/" element={<h2>👋 Welcome to Admin Dashboard</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPage;
