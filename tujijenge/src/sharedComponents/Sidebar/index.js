
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Sidebar() {
  const [active, setActive] = useState('dashboard');
 
  
  

  
  return (
    <>
      <div className='sidebar-expanded'>

          <div className="sidebar-logo-container">
            <img src={`${process.env.PUBLIC_URL}/Images/logo.png`} alt="Logo" className="sidebar-logo" />
          </div>
        
        <div className="menu">
        <Link to="/"
           style={{textDecoration:'none'}}
           > 
          <div
            className={`menu-icon${active === 'dashboard' ? ' active' : ''}`}
            onClick={() => setActive('dashboard', 'calendar')}
          >
         
            <FontAwesomeIcon className="Calendar" icon={faHouse} />
            <span>Dashboard</span>
       
          </div>
          </Link> 

          <Link to="/training-calendar"
            style={{textDecoration:'none'}}
            >
          <div
            className={`menu-icon${active === 'calendar' ? ' active' : ''}`}
            onClick={() => setActive('calendar')}
          >
              <FontAwesomeIcon className="Calendar" icon={faCalendar} />
              <span>Calendar</span>
            
          </div>
          </Link>
        </div>
        <div className="sidebar-logout">
          <FontAwesomeIcon icon={faPowerOff} />
          <span>Logout</span>
        </div>
      </div>
    </>
  );
}