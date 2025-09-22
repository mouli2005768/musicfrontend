import React from "react";
import { FaMusic, FaLinkedin, FaInstagram, FaTelegram, FaUserCircle } from "react-icons/fa";
import "./SinglePage.css"; // custom styling
import { Link } from "react-router-dom";
function SinglePage({ goToSignIn }) {
  return (
    <div className="singlepage-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <FaMusic className="logo-icon" />
          <h1>CrystalBeats</h1>
        </div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#tech">Tech</a>
          <a href="#roles">Roles</a>
        </nav>

        {/* ✅ Profile moved to header */}
        
<FaUserCircle className="signin-icon" onClick={goToSignIn} style={{ cursor: "pointer" }} />
      </header>

      {/* Body */}
      <main className="body">
        {/* About */}
        <section id="about" className="section about">
          <h2>About the Project</h2>
          <p>
            CrystalBeats is a music management platform powered by Spring Boot,
            React, and MySQL. It provides seamless music exploration,
            personalized libraries, and a role-based access system.
          </p>
        </section>

        {/* Technologies */}
        <section id="tech" className="section tech">
          <h2>Technologies Used</h2>
          <div className="tech-grid">
            <div className="tech-box">Spring Boot</div>
            <div className="tech-box">React</div>
            <div className="tech-box">MySQL</div>
            <div className="tech-box">REST APIs</div>
            <div className="tech-box">JWT Auth</div>
            <div className="tech-box">Docker</div>
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className="section roles">
          <h2>Roles & Functionalities</h2>
          <div className="roles-grid">
            <div className="role-card admin">
              <h3>Admin</h3>
              <ul>
                <li>✔ Manage Songs</li>
                <li>✔ Manage Users</li>
                <li>✔ Dashboard with Insights</li>
              </ul>
            </div>
            <div className="role-card user">
              <h3>User</h3>
              <ul>
                <li>✔ Explore Music</li>
                <li>✔ Create Favourites</li>
                <li>✔ Play & Enjoy 🎶</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <FaMusic className="footer-logo-icon" />
            <span>CrystalBeats</span>
          </div>

          <div className="footer-sections">
            <div>
              <h4>About</h4>
              <ul>
                <li>Company</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <li>Help</li>
                <li>Docs</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>

          <div className="footer-right">
            <div className="social-icons">
              <FaLinkedin />
              <FaInstagram />
              <FaTelegram />
            </div>
            {/* ❌ Removed profile icon from here */}
          </div>
        </div>
        <p className="copyright">
          © 2025 CrystalBeats. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default SinglePage;
