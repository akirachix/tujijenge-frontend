import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { removeAuthToken } from '../../../utils/api';
import Button from '../../Button/index';

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };


  const confirmLogout = () => {
    removeAuthToken();
    localStorage.removeItem('role');
    setShowLogoutModal(false);
    navigate('/home');
  };

 
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className='sidebar-expanded'>
        <div className="sidebar-logo-container">
          <img src={`${process.env.PUBLIC_URL}/Images/logo.png`} alt="Logo" className="sidebar-logo" />
        </div>
        <div className="menu">
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <div className={`menu-icon${pathname === '/dashboard' ? ' active' : ''}`}>
              <FontAwesomeIcon className="Calendar" icon={faHouse} />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link to="/training-calendar" style={{ textDecoration: 'none' }}>
            <div className={`menu-icon${pathname === '/training-calendar' ? ' active' : ''}`}>
              <FontAwesomeIcon className="Calendar" icon={faCalendar} />
              <span>Calendar</span>
            </div>
          </Link>
        </div>
        <div className="sidebar-logout">
          <FontAwesomeIcon icon={faPowerOff} />
          <span onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>Logout</span>
        </div>
      </div>

      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <Button onClick={confirmLogout} variant = "tertiary" label = "Logout" className="confirm-btn">Yes, Logout</Button>
              <Button onClick={cancelLogout} variant = "quaternary " label = "cancel" className="cancel-btn">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
