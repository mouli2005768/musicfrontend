import React from "react";
import { Routes, Route } from "react-router-dom";
import Library from "../library";
import Feed from "../Feed";
import Player from "../Player";
import Favourites from "../Favourites";
import "./Home.css";
import Sidebar from "../../components/sidebar";

function Home({ fullname , setUser }) {
  return (
    <div className="main-body">
      {/* Sidebar */}
       <Sidebar setUser={setUser} />


      {/* Routes for Home */}
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/player" element={<Player />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default Home;
