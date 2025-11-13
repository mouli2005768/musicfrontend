import { useState } from "react";
import "./SignIn.css";
import { signIn, signUp } from "../../api"; // adjust path if needed

function SignIn({ setUser }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    fullname: "",
    emailid: "",
    password: "",
    confirm: "",
    role: "0",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ LOGIN HANDLER
  const handleLogin = async () => {
    if (!form.emailid || !form.password) {
      setMessage("Please enter Email and Password");
      return;
    }

    try {
      const result = await signIn(form.emailid, form.password);

      if (result.startsWith("200::")) {
        // Example from backend: "200::John Doe::1::<token>"
        const parts = result.split("::");
        const fullname = parts[1];
        const role = parts[2];
        const token = parts[3];
        const email = form.emailid; // capture email used for login

        // ✅ Store user details locally
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("fullname", fullname);
        localStorage.setItem("email", email);

        // ✅ Pass user data to App.jsx (parent)
        setUser({ fullname, email, role });

        setMessage("Login successful!");
      } else {
        setMessage(result.split("::")[1] || "Invalid Credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setMessage("Server error. Try again later.");
    }
  };

  // ✅ REGISTER HANDLER
  const handleRegister = async () => {
    if (!form.fullname || !form.emailid || !form.password) {
      setMessage("Please fill all required fields");
      return;
    }
    if (form.password !== form.confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const result = await signUp(
        form.fullname,
        form.emailid,
        form.password,
        parseInt(form.role)
      );

      if (result.startsWith("200::")) {
        setMessage(result.split("::")[1] || "Registration successful!");
        setTab("login");
      } else {
        setMessage(result.split("::")[1] || "Registration failed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${tab === "login" ? "active" : ""}`}
            onClick={() => {
              setTab("login");
              setMessage("");
            }}
          >
            Login
          </button>
          <div className="divider"></div>
          <button
            className={`tab ${tab === "register" ? "active" : ""}`}
            onClick={() => {
              setTab("register");
              setMessage("");
            }}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {tab === "login" ? (
          <div className="form-content">
            <label>Email ID</label>
            <input
              type="email"
              name="emailid"
              placeholder="Enter your email"
              value={form.emailid}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />

            <div className="bottom-links">
              <span className="forgot">Forgot Password?</span>
            </div>

            <button className="submit-btn" onClick={handleLogin}>
              Login
            </button>

            {message && (
              <p
                className={`status-msg ${
                  message === "Login successful!" ? "" : "error"
                }`}
              >
                {message}
              </p>
            )}

            <div className="signup-link">
              Not have an account?{" "}
              <span className="switch" onClick={() => setTab("register")}>
                Register
              </span>
            </div>
          </div>
        ) : (
          <div className="form-content">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={form.fullname}
              onChange={handleChange}
            />

            <label>Email ID</label>
            <input
              type="email"
              name="emailid"
              placeholder="Enter your email"
              value={form.emailid}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm"
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={handleChange}
            />

            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="0">User</option>
              <option value="1">Admin</option>
              
            </select>

            <button className="submit-btn" onClick={handleRegister}>
              Sign Up
            </button>

            {message && <p className="status-msg">{message}</p>}

            <div className="signup-link">
              Already have an account?{" "}
              <span className="switch" onClick={() => setTab("login")}>
                Login
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;
