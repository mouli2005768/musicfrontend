// src/screens/Admin/ListSongs.jsx
import React, { useEffect, useState } from "react";
import { getSongs, deleteSong } from "../../api";
import "./ListSongs.css";

function ListSongs() {
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ load songs on mount
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await getSongs();
      setSongs(res.data);
    } catch (err) {
      console.error("Error loading songs:", err);
    }
  };

  // ✅ handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    try {
      await deleteSong(id);
      setMessage("✅ Song deleted successfully!");
      fetchSongs(); // refresh list
    } catch (err) {
      console.error("Delete Song Error:", err);
      setMessage("❌ Failed to delete song.");
    }
  };

  return (
    <div className="listsongs-container">
      <h2>List of Songs</h2>

      {message && <p className="message">{message}</p>}

      <table className="songs-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Song</th>
            <th>Album</th>
            <th>Play</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>
                <img
                  src={song.imageUrl || "https://via.placeholder.com/50"}
                  alt={song.name}
                  className="song-cover"
                />
              </td>
              <td>
                <strong>{song.name}</strong>
                <br />
                <small>{song.description}</small>
              </td>
              <td>{song.album ? song.album.name : "—"}</td>
              <td>
                {song.songUrl ? (
                  <audio controls style={{ width: "150px" }}>
                    <source src={song.songUrl} type="audio/mpeg" />
                    Your browser does not support audio.
                  </audio>
                ) : (
                  "No file"
                )}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(song.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListSongs;
