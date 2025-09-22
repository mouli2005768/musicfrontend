// src/screens/Player.jsx
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaArrowLeft } from "react-icons/fa";
import "./Player.css";

function Player() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(Number(id) || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const songList = state?.songs || [];
  const song = songList[index];

  useEffect(() => {
    if (audioRef.current && song?.songUrl) {
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn("Autoplay blocked:", err));
    }
  }, [index, song]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!songList.length) return;
    setIndex((index + 1) % songList.length);
  };

  const playPrev = () => {
    if (!songList.length) return;
    setIndex((index - 1 + songList.length) % songList.length);
  };

  const handleProgress = (e) => {
    const value = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percent || 0);
    }
  };

  return (
    <div className="player-screen">
      <div className="player-popup">
        {song ? (
          <>
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Back
            </button>

            <img
              src={song.imageUrl || "https://via.placeholder.com/300"}
              alt={song.name}
              className="player-cover"
            />
            <h2>{song.name}</h2>
            <p>{song.description}</p>

            <audio
              ref={audioRef}
              onTimeUpdate={updateProgress}
              onEnded={playNext}
            >
              <source src={song.songUrl} type="audio/mpeg" />
              Your browser does not support audio.
            </audio>

            {/* White Progress bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              className="progress-bar"
              onChange={handleProgress}
            />

            <div className="controls">
              <button onClick={playPrev}><FaStepBackward /></button>
              <button onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={playNext}><FaStepForward /></button>
            </div>

            <div className="volume">
              <FaVolumeUp />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={(e) => {
                  if (audioRef.current) audioRef.current.volume = e.target.value;
                }}
              />
            </div>

            {/* White music bars */}
            <div className="animation-bar">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </>
        ) : (
          <h2>No song selected</h2>
        )}
      </div>
    </div>
  );
}

export default Player;
