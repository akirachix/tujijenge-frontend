// src/SharedComponents/Sidebar/index.js
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faBars, faPowerOff, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo.png';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const [active, setActive] = useState('dashboard');

  return (
    <>
    
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
               {isCollapsed ? (
        <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faTimes} className='x'/>
        )}
          
        </button>
  
      <div className={isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}>
        {!isCollapsed && (
          <div className="sidebar-logo-container">
            <img src={logo} alt="Logo" className="sidebar-logo" />
          </div>
        )}
        <div className="menu">
          <div
            className={`menu-icon${active === 'dashboard' ? ' active' : ''}`}
            onClick={() => setActive('dashboard')}
          >
            <FontAwesomeIcon className="Home" icon={faHouse} />
            {!isCollapsed && <span>Dashboard</span>}
          </div>
          <div
            className={`menu-icon${active === 'calendar' ? ' active' : ''}`}
            onClick={() => setActive('calendar')}
          >
            <Link to="/calendar">
              <FontAwesomeIcon className="Calendar" icon={faCalendar} />
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