import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { removeAuthToken } from '../../../utils/api'; 

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {
    removeAuthToken();
    localStorage.removeItem('role');
    navigate('/home');
  };


  return (
    <div className='sidebar-expanded'>
      <div className="sidebar-logo-container">
        <img src={`${process.env.PUBLIC_URL}/Images/logo.png`} alt="Logo" className="sidebar-logo" />
      </div>
      <div className="menu">
        <Link to="/dashboard" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/dashboard' ? ' active' : ''}`}>
            <FontAwesomeIcon className="Calendar" icon={faHouse} />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to="/training-calendar" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/training-calendar' ? ' active' : ''}`}>
            <FontAwesomeIcon className="Calendar" icon={faCalendar} />
            <span>Calendar</span>
          </div>
        </Link>
      </div>
      <div className="sidebar-logout">
          <FontAwesomeIcon icon={faPowerOff} />
          <span onClick={handleLogout}>Logout</span>
        </div>
    </div>
  );
}