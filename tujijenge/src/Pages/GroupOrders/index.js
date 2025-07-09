import React from 'react';
import './index.css';
import { useNavigate,useParams } from 'react-router-dom';
import { groupOrdersData } from '../../data';
import {  FaRegBell } from 'react-icons/fa';
function GroupOrders() {
    const navigate=useNavigate();
    const {groupId}=useParams();
    const groupOrders=groupOrdersData.filter(order=>order.groupId===Number(groupId));
    return (
        <div className="group-order-container">
            <div className='group-order'>
                <div className='nav'>
                    <span className="back-arrow" onClick={()=>navigate('/')}>&#x2190;</span>
                    <div className="notification-icon">
                        <FaRegBell className="icon bell" />
                    </div>
                </div>
                <div className="table-content">
                    <div className="header">
                        <h2 className="group-order-title">Group {groupId} Orders</h2>
                    </div>
                    <table className="group-order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total Amount</th>
                                <th>Order Date</th>
                                <th>Items</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(groupOrders.length?groupOrders:groupOrdersData).map((order, index) => (
                                <tr key={index}>
                                    <td>{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.date}</td>
                                    <td>{order.items}</td>
                                    <td className={`status ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default GroupOrders;