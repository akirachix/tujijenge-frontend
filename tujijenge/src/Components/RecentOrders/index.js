import React, { useState } from "react";
import { orders as allOrders } from "../../data/orders";
import OrderRow from "../OrderRow";
import { useNavigate } from 'react-router-dom';
import SearchBar from "../../SharedComponents/SearchBar";
import { FaRegBell} from 'react-icons/fa';
import "./index.css";
const RecentOrders = () => {
      const navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const filteredOrders = allOrders.filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      order.community.toLowerCase().includes(term) ||
      order.date.includes(term) ||
      order.location.toLowerCase().includes(term)
    );
  });
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, filteredOrders.length);
  const paginatedOrders = filteredOrders.slice(start - 1, end);
  return (
    <div className="recent-orders-wrapper">
         <div className='nav'>
                            <span className="back-arrow" onClick={()=>navigate('/')}>&#x2190;</span>
                            <div className="notification-icon">
                                <FaRegBell className="icon bell" data-testid="bell-icon" />
                            </div>
                        </div>
    <div className="order-history">
      <div className="search-section">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <span className="order-count">
          {start}-{end} of {filteredOrders.length} orders
        </span>
      </div>
      <h1 className="page-title">Recent Orders</h1>
      <div className="order-table">
        <div className="table-header">
          <div>Community</div>
          <div>Order Date</div>
          <div>Location</div>
          <div>Amount</div>
          <div>Total Price</div>
          <div>Products</div>
        </div>
        {paginatedOrders.map((order,index) => (
          <OrderRow key={order.id} className={index % 2 === 0 ? "even-row" : "odd-row"} order={order} />
        ))}
      </div>
      </div>
    </div>
  );
};
export default RecentOrders;
