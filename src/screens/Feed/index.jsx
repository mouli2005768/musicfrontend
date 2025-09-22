// src/screens/Feed.jsx
import React, { useEffect, useState } from "react";
import { getSongs } from "../../api";
import { useNavigate } from "react-router-dom";
import "./Feed.css";

function Feed() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await getSongs();
      setSongs(res.data || []);
    } catch (err) {
      console.error("Error loading songs:", err);
    }
  };

  const handleSongClick = (index) => {
    // Navigate to Player with song index
    navigate(`/player/${index}`, { state: { songs, currentIndex: index } });
  };

  return (
    <div className="feed-container">
      <h2>🎶 Featured Charts</h2>
      {songs.length === 0 ? (
        <p>No songs available yet 🎵</p>
      ) : (
        <div className="song-grid">
          {songs.map((song, index) => (
            <div
              key={song.id || index}
              className="song-card"
              onClick={() => handleSongClick(index)}
            >
              <img
                src={song.imageUrl || "https://via.placeholder.com/150"}
                alt={song.name}
                className="song-cover"
              />
              <h3>{song.name}</h3>
              <p>{song.album ? song.album.name : song.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
