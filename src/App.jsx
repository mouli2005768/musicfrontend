import { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./screens/auth/SignIn";
import Home from "./screens/Home";
import AdminPage from "./screens/Admin/AdminPage";
import SinglePage from "./screens/FirstPage/SinglePage";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("landing"); // default is landing

  // Load user but don't auto-skip landing
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Sync user with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div className="App">
      {page === "landing" && <SinglePage goToSignIn={() => setPage("signin")} />}

      {page === "signin" && (
        <SignIn
          setUser={(u) => {
            setUser(u);
            setPage("home"); // go to home/admin after login
          }}
        />
      )}

      {page === "home" &&
        (user?.role === "1" ? (
          <AdminPage fullname={user.fullname} setUser={setUser} setPage={setPage} />
        ) : (
          <Home fullname={user?.fullname} setUser={setUser} setPage={setPage} />
        ))}
    </div>
  );
}

export default App;
