
import React, { useState } from 'react';
import './sidebar.css' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
// import App from './notification';




export default function Sidebar() {
    const [isOpen , setIsOpen] = useState(false);

const toggleSidebar = () =>{
    setIsOpen(!isOpen);
}
const closeSidebar = () =>{
    setIsOpen(false);

}
    return (
        <>
        <button className ='toggle-button' onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />  
        </button>

        <div className={`sidebar ${isOpen? 'open' : ''}`}>
        <button className ='close-button' onClick={closeSidebar}>
        <FontAwesomeIcon icon={faTimes} />  
        </button>

            <h2>Sidebar</h2>
            <div>
          <h1>Dashboard</h1>
          <Link to="/calendar">Calendar</Link>
        </div>
    
        </div>
        </>
    )
}