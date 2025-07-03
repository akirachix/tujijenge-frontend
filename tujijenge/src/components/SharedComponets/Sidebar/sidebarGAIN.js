
import './sidebar.css' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHouse, faBars,  faTimes } from "@fortawesome/free-solid-svg-icons";






export default function Sidebar({isCollapsed, toggleSidebar}) {


   return (
        <>
        <div className ={isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}>
            <button onClick={toggleSidebar}>
            { isCollapsed ? <FontAwesomeIcon className='OpenMenu' icon={ faBars }/>: <FontAwesomeIcon className='CloseMenu' icon={ faTimes }/>}  
            </button>
        

        <div className='menu'>
            <div className='menu-icon'>
            <FontAwesomeIcon className='Home' icon={ faHouse }/>
                {!isCollapsed && <span>Dashboard</span>}
            </div>
            <div className='menu-icon'>
            <FontAwesomeIcon className='Calendar' icon={ faCalendar }/>
                {!isCollapsed && <span>Calendar</span>}
            </div>
        </div>
     </div>
       

        </>
    )
}