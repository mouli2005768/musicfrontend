import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import "./SideButton.css";

function SideButton({ title = "", to = "#", icon = null }) {
  const location = useLocation();

  // highlight active button safely
  const isActive = to && location.pathname === to;
  const btnClass = isActive ? "btn-body active" : "btn-body";

  return (
    <Link to={to} className="btn-link">
      <div className={btnClass}>
        <IconContext.Provider value={{ size: "20px", className: "btn-icon" }}>
          {icon ? icon : <span style={{ width: "20px" }} />} {/* fallback */}
        </IconContext.Provider>
        <p className="btn-title">{title || "Untitled"}</p>
      </div>
    </Link>
  );
}

export default SideButton;