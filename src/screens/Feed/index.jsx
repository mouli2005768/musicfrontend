// src/screens/Feed.jsx
import React, { useEffect, useState } from "react";
import { getSongs } from "../../api";
import { useNavigate } from "react-router-dom";
import staticSongs from "./songs"; // ✅ import static list
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
      const dbSongs = res.data || [];

      // ✅ Normalize both static + DB to use songUrl
      const formattedDbSongs = dbSongs.map((s) => ({
        id: s.id,
        name: s.name,
        album: s.album || "Unknown Album",
        imageUrl: s.imageUrl,
        songUrl: s.songUrl, // ⚡ Player expects this
      }));

      const formattedStaticSongs = staticSongs.map((s) => ({
        ...s,
        songUrl: s.audioUrl, // ⚡ rename for Player.jsx
      }));

      // ✅ Merge static + DB
      setSongs([...formattedStaticSongs, ...formattedDbSongs]);
    } catch (err) {
      console.error("Error loading songs:", err);

      // fallback → static only
      const formattedStaticSongs = staticSongs.map((s) => ({
        ...s,
        songUrl: s.audioUrl,
      }));
      setSongs(formattedStaticSongs);
    }
  };

  const handleSongClick = (index) => {
    navigate(`/player/${index}`, {
      state: { songs, currentIndex: index },
    });
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
              <p>{song.album || "No Album Info"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
