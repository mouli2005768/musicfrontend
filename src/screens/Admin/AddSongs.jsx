// src/screens/Admin/AddSongs.jsx
import React, { useState } from "react";
import { uploadSong } from "../../api"; // ✅ use shared API
import "./AddSongs.css";

function AddSongs() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); 
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  // ✅ handle file select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("❌ Please select a song file to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("imageUrl", imageUrl);

      await uploadSong(formData); // ✅ use API function

      setMessage("✅ Song uploaded successfully!");

      // Reset form
      setName("");
      setDescription("");
      setFile(null);
      setImageUrl("");

      // ✅ redirect to song list after upload
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

        <label>
          Upload Image (Thumbnail URL)
          <input
            type="text"
            placeholder="Paste image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <button type="submit">Upload</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddSongs;
