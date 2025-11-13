import React from "react";
import { Routes, Route } from "react-router-dom";
import Library from "../library";
import Feed from "../Feed";
import Player from "../Player";
import Favourites from "../Favourites";
import "./Home.css";
import Sidebar from "../../components/sidebar";

function Home({ fullname, setUser, setPage }) {
  return (
    <div className="main-body">
      {/* Sidebar gets setPage so it can redirect on logout */}
      <Sidebar setUser={setUser} setPage={setPage} />

      {/* Routes for Home */}
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/premium" element={<Library />} />  {/* ✅ Add this */}
      </Routes>
    </div>
  );
}

export default Home;
