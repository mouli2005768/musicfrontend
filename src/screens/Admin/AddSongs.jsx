// src/screens/Admin/AddSongs.jsx
import React, { useState } from "react";
import { uploadSong } from "../../api";
import "./AddSongs.css";

function AddSongs() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); 
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("❌ Please select a song file to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // ✅ audio
      if (image) formData.append("image", image); // ✅ image file
      formData.append("name", name);
      formData.append("description", description);

      await uploadSong(formData);

      setMessage("✅ Song uploaded successfully!");
      setName("");
      setDescription("");
      setFile(null);
      setImage(null);

      setTimeout(() => {
        window.location.href = "/admin/listsongs";
      }, 1000);
    } catch (err) {
      console.error("Upload Error:", err);
      setMessage("❌ Failed to upload song.");
    }
  };

  return (
    <div className="addsong-container">
      <h2>Upload Song</h2>

      <form className="addsong-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Song description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Upload Song */}
        <label>
          Upload Song File
          <input type="file" accept="audio/*" onChange={handleFileChange} />
        </label>

        {/* Upload Image */}
        <label>
          Upload Image (Thumbnail)
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button type="submit">Upload</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddSongs;
