
import './sidebar.css' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHouse, faBars, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const [active, setActive] = useState("dashboard");
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!isCollapsed) {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          toggleSidebar();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCollapsed, toggleSidebar]);

  return (
    <>
      {isCollapsed && (
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <div
        ref={sidebarRef}
        className={isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}
      >
        {!isCollapsed && (
          <div className="sidebar-logo-container">
            <img
              src='./../assets/logo.png'
              alt="Logo"
              className="sidebar-logo"
            />
          </div>
        )}
        <div className='menu'>
          <div
            className={`menu-icon${active === "dashboard" ? " active" : ""}`}
            onClick={() => setActive("dashboard")}
          >
          
            <FontAwesomeIcon className='Home' icon={faHouse} />
            {!isCollapsed && <span>Dashboard</span>}
           
          </div>
          <div
            className={`menu-icon${active === "calendar" ? " active" : ""}`}
            onClick={() => setActive("calendar")}
          >
            <Link to="/calendar">
            <FontAwesomeIcon className='Calendar' icon={faCalendar} />
            {!isCollapsed && <span>Calendar</span>}
            </Link>
          </div>
        </div>
        <div className="sidebar-logout">
          <FontAwesomeIcon icon={faPowerOff} />
          {!isCollapsed && <span>Logout</span>}
        </div>
      </div>
    </>
  );
}

