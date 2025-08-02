import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { BsCartCheckFill } from "react-icons/bs";
import { GiFruitBowl } from "react-icons/gi";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { removeAuthToken } from '../../../utils/api'; 

export default function TaimbaSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {
    removeAuthToken();
    localStorage.removeItem('role');
    navigate('/SignIn');
  };

  return (
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
      <div className="sidebar-logout" onClick={handleLogout} style={{cursor: 'pointer'}}>
        <FontAwesomeIcon icon={faPowerOff} />
        <span>Logout</span>
      </div>
    </div>
  );
}