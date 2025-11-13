import React, { useEffect, useState } from "react";
import { getSongs, addFavourite, getUserFavourites } from "../../api";
import { useNavigate } from "react-router-dom";
import Songs from "./songs";
import { Heart } from "lucide-react";
import "./Feed.css";

function Feed() {
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await getSongs();
      const dbSongs = res.data || [];

      const formattedDbSongs = dbSongs.map((s) => ({
        key: `db-${s.id}`,
        id: s.id,
        name: s.name,
        album: s.description || s.album?.name || "No Description",
        imageUrl: s.imageUrl,
        songUrl: s.songUrl,
      }));

      const formattedStaticSongs = Songs.map((s, idx) => ({
        key: `static-${idx}`,
        ...s,
      }));

      setSongs([...formattedStaticSongs, ...formattedDbSongs]);

      // ✅ Load existing favourites from backend
      const favRes = await getUserFavourites(email);
      const favIds = favRes.data.map((s) => s.id);
      setFavorites(favIds);
    } catch (err) {
      console.error("Error loading songs:", err);
    }
  };

  const handleSongClick = (index) => {
    navigate(`/player/${index}`, {
      state: { songs, currentIndex: index },
    });
  };

  const handleFavouriteClick = async (e, song) => {
    e.stopPropagation();

    // ✅ Skip static songs (no DB id)
    if (!song.id) {
      alert("This static song cannot be added to favourites.");
      return;
    }

    try {
      await addFavourite(email, song.id);
      setFavorites([...favorites, song.id]); // update state immediately
    } catch (err) {
      console.error("Error adding favourite:", err);
    }
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
              key={song.key}
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

              {/* ❤️ Favourite Icon */}
              <div
                className="favorite-icon"
                onClick={(e) => handleFavouriteClick(e, song)}
                title="Add to Favourites"
              >
                <Heart
                  color={favorites.includes(song.id) ? "red" : "gray"}
                  fill={favorites.includes(song.id) ? "red" : "none"}
                  size={24}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
