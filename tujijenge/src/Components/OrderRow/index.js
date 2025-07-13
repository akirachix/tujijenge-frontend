import React, { useState } from 'react';
import './index.css';
const OrderRow = ({ order,className }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className={`order-row ${className}` }>
        <div>{order.community}</div>
        <div>{order.date}</div>
        <div>{order.location}</div>
        <div>{order.amount}</div>
        <div>Ksh {order.total}</div>
        <div>
          <button className="view-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide' : 'View'} Details
          </button>
        </div>
      </div>
      {expanded && (
        <div className="order-details">
          <p><strong>Products:</strong></p>
          <ul>
            {(order.products || []).map((product, idx) => (
              <li key={idx}>{product}</li>
            ))}
          </ul>

        </div>
      )}
    </>
  );
};
export default OrderRow;









