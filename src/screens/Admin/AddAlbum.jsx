// src/screens/Playlist.jsx
import React, { useEffect, useState } from "react";
import { getSongs } from "../../api";
import "./AddAlbum.css";

function AddAlbum() {
  const [songs, setSongs] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await getSongs();
      const allSongs = res.data;

      // ✅ Group songs by description
      // Group songs by description and keep only playlists with >1 song
const groupedSongs = {};
allSongs.forEach((song) => {
  const desc = song.description?.trim();
  if (!desc) return; // skip songs without description
  if (!groupedSongs[desc]) groupedSongs[desc] = [];
  groupedSongs[desc].push(song);
});

// ✅ Filter: keep only those descriptions with more than 1 song
const validPlaylists = {};
Object.keys(groupedSongs).forEach((desc) => {
  if (groupedSongs[desc].length > 1) {
    validPlaylists[desc] = groupedSongs[desc];
  }
});

setSongs(allSongs);
setGrouped(validPlaylists);

    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  };

  const toggleExpand = (desc) => {
    setExpanded((prev) => ({
      ...prev,
      [desc]: !prev[desc],
    }));
  };

  return (
    <div className="playlist-page">
      <h2>🎧 Playlists</h2>

      {Object.keys(grouped).length === 0 ? (
        <p>No playlists found. Try adding songs!</p>
      ) : (
        Object.keys(grouped).map((desc, index) => {
          const songs = grouped[desc];
          const thumbnail = songs[0]?.imageUrl || "/default.png";
          const isOpen = expanded[desc];

          return (
            <div key={index} className="playlist-card">
              <div
                className="playlist-header"
                onClick={() => toggleExpand(desc)}
              >
                <img
                  src={thumbnail}
                  alt={desc}
                  className="playlist-thumbnail"
                />
                <h3>{desc}</h3>
                <span className="expand-icon">{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && (
                <div className="song-list">
                  {songs.map((song) => (
                    <div key={song.id} className="song-item">
                      <img
                        src={song.imageUrl || "/default.png"}
                        alt={song.name}
                        className="song-image"
                      />
                      <div className="song-info">
                        <p className="song-name">{song.name}</p>
                        <audio controls className="song-audio">
                          <source src={song.songUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default AddAlbum;
