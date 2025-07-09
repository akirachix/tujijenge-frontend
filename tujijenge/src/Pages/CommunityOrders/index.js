import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaRegBell, FaHistory } from 'react-icons/fa';
const CommunityOrders = () => {
    const navigate=useNavigate();
    const groups = [
        'Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6', 'Group 7'
    ]

    return (
        <div className="container">
            <div className='community-orders'>
                <div className='nav'>
                    <FaBars className='icon' />
                    <div className="notification-icon">
                        <FaRegBell className="icon" />
                    </div>
                </div>
                <div className='mainContainer'>
                    <div className='main'>
                        <div className='header'>
                            <h1>Community Orders</h1>
                            <FaHistory className='icon' 
                
                            />
                        </div>
                        {groups.map((group, index) => (
                            <div key={index} className='group'>
                                {group}
                                <button className='view-btn' onClick={()=>navigate(`/group-orders/${index+1}`)}>View details</button>
                            </div>
                        )
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CommunityOrders
