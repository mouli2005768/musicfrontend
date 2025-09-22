import React, { useEffect, useState } from "react";
import { getSongs } from "../../api";
import "./Feed.css";

function Feed() {
  const [songs, setSongs] = useState([]);

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

  return (
    <div className="feed-container">
      <h2>🎶 Featured Charts</h2>
      {songs.length === 0 ? (
        <p>No songs available yet 🎵</p>
      ) : (
        <div className="song-grid">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <img
                src={song.imageUrl || "https://via.placeholder.com/150"}
                alt={song.name}
                className="song-cover"
              />
              <h3>{song.name}</h3>
              <p>{song.album ? song.album.name : ""}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
