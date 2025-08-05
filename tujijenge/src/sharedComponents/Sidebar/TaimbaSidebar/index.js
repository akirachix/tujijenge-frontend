
import { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { BsCartCheckFill } from "react-icons/bs";
import { GiFruitBowl } from "react-icons/gi";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { removeAuthToken } from '../../../utils/api'; 
import Button from '../../Button/index';

export default function TaimbaSidebar() {
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
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo" className="sidebar-logo" />
      </div>
      <div className="menu">
        <Link to="/Catalogue" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/Catalogue' ? ' active' : ''}`}>
            <GiFruitBowl/>
            <span>Catalogue</span>
          </div>
        </Link>
        <Link to="/RecentOrders" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/RecentOrders' ? ' active' : ''}`}>
            <BsCartCheckFill />
            <span>Orders</span>
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
          <div className="logout-modal">
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