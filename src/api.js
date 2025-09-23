import axios from "axios";

// Detect backend base URL dynamically
let baseURL = "http://localhost:8081/api"; // default (local run)

// If backend is running inside Tomcat with "musicspring" context
if (window.location.href.includes("musicspring")) {
  baseURL = "http://localhost:8081/musicspring/api";
}

// ✅ Base axios instance
const API = axios.create({ baseURL });

// ================== AUTH ==================
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/user/signin",
      { emailid: email, password }
    );
    // Backend returns something like: 200::John Doe::<token>
    return response.data.replace(/['"]+/g, "").trim();
  } catch (error) {
    console.error("SignIn Error:", error.response || error.message);
    return "401::Server Error";
  }
};

export const signUp = async (fullname, email, password, role) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/user/signup",
      { fullname, emailid: email, password, role }
    );
    return response.data.replace(/['"]+/g, "").trim();
  } catch (error) {
    console.error("SignUp Error:", error.response || error.message);
    return "401::Server Error";
  }
};

// ================== SONGS ==================
export const getSongs = () => API.get("/songs");
export const addSong = (songData) => API.post("/songs", songData);
export const deleteSong = (id) => API.delete(`/songs/${id}`);
export const uploadSong = (formData) =>
  API.post("/songs/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ================== ALBUMS ==================
export const getAlbums = () => API.get("/albums");
export const addAlbum = (albumData) => API.post("/albums", albumData);
export const deleteAlbum = (id) => API.delete(`/albums/${id}`);

export default API;
