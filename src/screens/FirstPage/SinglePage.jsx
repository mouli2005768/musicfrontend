import React from "react";
import {
  FaMusic,
  FaLinkedin,
  FaInstagram,
  FaTelegram,
  FaUserCircle,
} from "react-icons/fa";
import "./SinglePage.css";

function SinglePage({ goToSignIn }) {
  return (
    <div className="singlepage-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <FaMusic className="logo-icon" />
          <h1>Porse</h1>
        </div>

        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#impact">Impact</a>
          <a href="#roles">Experience</a>
        </nav>

        <FaUserCircle
          className="signin-icon"
          onClick={goToSignIn}
          style={{ cursor: "pointer" }}
        />
      </header>
        <section id="impact" className="impact-hero">
          <div className="impact-left">
            <h1>Music That Moves You</h1>
            <p>
              Experience the real power of music — crafted for emotion, focus,
              motivation, and pure enjoyment.
            </p>
            <p>Let sound inspire your day.</p>
            <button className="impact-btn">Explore More</button>
          </div>

          <div className="impact-right">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
              alt="mic"
            />
          </div>
        </section>
      {/* Main Body */}
      <main className="body">

        {/* About Section */}
        <section id="about" className="section about">
          <h2>About Porse</h2>
          <p>
            Porse is a modern music space designed to give you a clean and simple
            listening experience. Your favorite tracks, playlists, and vibe —
            all in one smooth platform.
          </p>
          <p>
            Whether you're exploring new tunes or curating your own collection,
            Porse brings music closer to you.
          </p>
        </section>

        {/* HERO IMPACT (WYNK STYLE) */}
        

        {/* Roles Section */}
        <section id="roles" className="section roles">
          <h2>Experience Tailored for Everyone</h2>
          <div className="roles-grid">

            

            <div className="role-card user">
              <h3>🎵 User Experience</h3>
              <p>
                Created for music lovers. Build your vibe, enjoy your favorites,
                and make playlists that feel like you.
              </p>
              <ul>
                <li>💖 Add and store favorites</li>
                <li>🎶 Personal playlist creation</li>
                <li>📱 Smooth listening on all devices</li>
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
            <span>Porse</span>
          </div>

          <div className="footer-sections">
            <div>
              <h4>About</h4>
              <ul>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="footer-right">
            <div className="social-icons">
              <FaLinkedin onClick="https://www.linkedin.com/in/kaka-mouli-brahma-b401b4324/"/>
              <FaInstagram onClick=""/>
              <FaTelegram onClick=""/>
            </div>
          </div>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Porse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default SinglePage;
