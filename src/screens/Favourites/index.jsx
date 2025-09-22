// src/screens/Favourites.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favourites.css";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  // ✅ Load favourites from localStorage when page loads
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavs);
  }, []);

  const handleSongClick = (index) => {
    navigate(`/player/${index}`, { state: { songs: favourites, currentIndex: index } });
  };

  return (
    <div className="favourites-container">
      <h2>❤️ Your Favourites</h2>
      {favourites.length === 0 ? (
        <p>No favourites yet. Add some from the player!</p>
      ) : (
        <div className="song-grid">
          {favourites.map((song, index) => (
            <div
              key={index}
              className="song-card"
              onClick={() => handleSongClick(index)}
            >
              <img
                src={song.image || "https://via.placeholder.com/150"}
                alt={song.title}
                className="song-cover"
              />
              <h3>{song.title}</h3>
              <p>{song.album || song.description || "Unknown Album"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
