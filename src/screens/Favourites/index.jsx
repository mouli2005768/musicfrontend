import React, { useEffect, useState } from "react";
import { getUserFavourites, removeFavourite } from "../../api";
import { HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Favourites.css";

function Favourites() {
  const [songs, setSongs] = useState([]);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const res = await getUserFavourites(email);
      setSongs(res.data || []);
    } catch (err) {
      console.error("Error fetching favourites:", err);
    }
  };

  const handleRemove = async (songId) => {
    try {
      await removeFavourite(email, songId);
      setSongs(songs.filter((s) => s.id !== songId));
    } catch (err) {
      console.error("Error removing favourite:", err);
    }
  };

  // ✅ NEW: play song from favourites
  const handleSongClick = (index) => {
    navigate(`/player/${index}`, {
      state: { songs, currentIndex: index }, // pass same data as Feed
    });
  };

  return (
    <div className="feed-container">
      <h2>❤️ My Favourites</h2>
      {songs.length === 0 ? (
        <p>No favourites yet 🎵</p>
      ) : (
        <div className="song-grid">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="song-card"
              onClick={() => handleSongClick(index)} // ✅ same logic as Feed
            >
              <img
                src={song.imageUrl || "https://via.placeholder.com/150"}
                alt={song.name}
                className="song-cover"
              />
              <h3>{song.name}</h3>
              <p>{song.album?.name || "No Album Info"}</p>

              {/* 🖤 Remove Favourite Icon */}
              <div
                className="favorite-icon"
                onClick={(e) => {
                  e.stopPropagation(); // prevent song play
                  handleRemove(song.id);
                }}
                title="Remove from Favourites"
              >
                <HeartOff color="red" size={22} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
