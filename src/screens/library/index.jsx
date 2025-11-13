import React, { useState, useEffect } from "react";
import "./Library.css";
import {
  makePayment,
  getPaymentStatus,
  getSongs,
} from "../../api"; // ✅ Import songs API too

const Library = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState({ fullname: "", email: "" });
  const [phone, setPhone] = useState("");
  const [planStatus, setPlanStatus] = useState(""); // ✅ To track active plan

  // Playlist states 🎧
  const [songs, setSongs] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [expanded, setExpanded] = useState({});

  const plans = [
    {
      name: "Gold",
      price: 999,
      color: "#FFD700",
      desc: "Unlock all premium songs and albums!",
    },
    {
      name: "Premium",
      price: 499,
      color: "#6A5ACD",
      desc: "Enjoy ad-free music and HD quality!",
    },
  ];

  // ✅ Load user info & plan
  useEffect(() => {
    const fullname = localStorage.getItem("fullname") || "Unknown User";
    const email = localStorage.getItem("email") || "unknown@example.com";
    setUser({ fullname, email });

    fetchPaymentStatus(email);
  }, []);

  // ✅ Fetch user’s plan
  const fetchPaymentStatus = async (email) => {
    try {
      const status = await getPaymentStatus(email);
      console.log("📡 Current Plan Status:", status);
      setPlanStatus(status);
    } catch (err) {
      console.error("Error fetching status:", err);
      setPlanStatus("Error checking plan status");
    }
  };

  // ✅ Fetch songs & group them (only after success/payment active)
  useEffect(() => {
    if (planStatus.includes("active") || showSuccess) {
      fetchSongs();
    }
  }, [planStatus, showSuccess]);

  const fetchSongs = async () => {
  try {
    const res = await getSongs();
    const allSongs = res.data;

    // Group songs by description
    const groupedSongs = {};
    allSongs.forEach((song) => {
      const desc = song.description?.trim();
      if (!desc) return; // Skip songs with empty description
      if (!groupedSongs[desc]) groupedSongs[desc] = [];
      groupedSongs[desc].push(song);
    });

    // ✅ Keep only playlists that have more than 1 song
    const validPlaylists = {};
    Object.keys(groupedSongs).forEach((desc) => {
      if (groupedSongs[desc].length > 1) {
        validPlaylists[desc] = groupedSongs[desc];
      }
    });

    setSongs(allSongs);
    setGrouped(validPlaylists);
  } catch (err) {
    console.error("Error fetching songs:", err);
  }
};

  const toggleExpand = (desc) => {
    setExpanded((prev) => ({
      ...prev,
      [desc]: !prev[desc],
    }));
  };

  // ✅ Payment Handlers
  const handleSelectPlan = (plan) => {
    if (planStatus.includes("active")) {
      alert("You already have an active subscription!");
      return;
    }
    setSelectedPlan(plan);
    setShowPopup(true);
  };

  const handlePayment = async () => {
    if (!phone) {
      alert("Please enter phone number");
      return;
    }

    const paymentData = {
      userEmail: user.email,
      userName: user.fullname,
      phoneNumber: phone,
      planType: selectedPlan.name,
      amount: selectedPlan.price,
      paymentStatus: "Paid",
      paymentDate: new Date().toISOString(),
    };

    console.log("📤 Sending Payment Data:", paymentData);

    try {
      const response = await makePayment(paymentData);
      console.log("✅ Payment Response:", response);

      if (response && response.id) {
        setShowPopup(false);
        setShowSuccess(true);

        // ✅ Show playlists after a small delay
        setTimeout(() => {
          setShowSuccess(false);
          fetchPaymentStatus(user.email);
          fetchSongs(); // load playlists
        }, 2000);
      } else {
        alert("Payment failed. Try again.");
      }
    } catch (err) {
      console.error("❌ Payment Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="library-container">
      <h2 className="library-title">Your Subscription</h2>

      {/* ✅ If user already has plan */}
      {planStatus.includes("active") ? (
        <div className="active-plan-message">
          <h3>🎉 {planStatus}</h3>
          <p>Enjoy your unlimited premium music experience!</p>
        </div>
      ) : (
        <>
          {/* Subscription Plans */}
          <div className="plans-container">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="plan-card"
                style={{ borderTop: `5px solid ${plan.color}` }}
              >
                <h3>{plan.name}</h3>
                <p className="price">₹{plan.price}</p>
                <p className="desc">{plan.desc}</p>
                <button
                  className="subscribe-btn"
                  style={{ backgroundColor: plan.color }}
                  onClick={() => handleSelectPlan(plan)}
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Payment Popup */}
      {showPopup && selectedPlan && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>
              {selectedPlan.name} Plan - ₹{selectedPlan.price}
            </h3>
            <p>
              <b>Name:</b> {user.fullname}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Date:</b> {new Date().toLocaleDateString()}
            </p>
            <p>
              <b>Time:</b> {new Date().toLocaleTimeString()}
            </p>

            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="popup-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button className="pay-btn" onClick={handlePayment}>
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-popup">
          <div className="tick-mark">✔</div>
          <p>Subscription Successful!</p>
        </div>
      )}

      {/* ✅ Playlist Section (visible after success or active plan) */}
      {(planStatus.includes("active") || showSuccess) && (
        <div className="playlist-section">
          <h2>🎵 Your Playlists</h2>

          {Object.keys(grouped).length === 0 ? (
            <p>No songs found. Add songs from Admin panel!</p>
          ) : (
            Object.keys(grouped).map((desc, i) => {
              const songs = grouped[desc];
              const thumbnail = songs[0]?.imageUrl || "/default.png";
              const isOpen = expanded[desc];

              return (
                <div key={i} className="playlist-card">
                  <div
                    className="playlist-header"
                    onClick={() => toggleExpand(desc)}
                  >
                    <img
                      src={thumbnail}
                      alt={desc}
                      className="playlist-thumbnail"
                    />
                    <h3>{desc}</h3>
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </div>

                  {isOpen && (
                    <div className="song-list">
                      {songs.map((song) => (
                        <div key={song.id} className="song-item">
                          <img
                            src={song.imageUrl || "/default.png"}
                            alt={song.name}
                            className="song-image"
                          />
                          <div className="song-info">
                            <p className="song-name">{song.name}</p>
                            <audio controls className="song-audio">
                              <source src={song.songUrl} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
