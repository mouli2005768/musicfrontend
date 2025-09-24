import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import './Sidebarbutton.css';

function Sidebarbutton(props) {
  const location = useLocation();

  // ✅ check if path matches OR starts with it
  const isActive =
    props.to === "/player/1"
      ? location.pathname.startsWith("/player") // for player dynamic routes
      : location.pathname === props.to;

  const btnClass = isActive ? 'btn-body active' : 'btn-body';

  return (
    <Link to={props.to}>
      <div className={btnClass}>
        <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
          {props.icon}
          <p className="btn-title">{props.title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
}

export default Sidebarbutton;
