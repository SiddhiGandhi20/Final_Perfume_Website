import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrdersAdmin.css';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

    const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
  
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log("API Response:", data); // Log the response to check the data

        // Handle case where orders is wrapped inside an object
        if (data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders); // If data.orders exists and is an array, use it
        } else if (Array.isArray(data)) {
          setOrders(data); // If the response is already an array, use it directly
        } else {
          throw new Error('Data is not in expected array format');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="orders-container">Loading orders...</div>;
  }

  if (error) {
    return <div className="orders-container error">{error}</div>;
  }

  return (
    <div className="admin-page">
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
              <h2>Admin Panel</h2>
              <Link to="/adminPage">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
              
              {/* Products Dropdown */}
              <div className="dropdown">
                <button className="dropdown-btn" onClick={toggleDropdown}>
                  <i className="fas fa-cogs"></i> Products
                </button>
                <div className={`dropdown-container ${dropdownVisible ? 'visible' : ''}`}>
                  <Link to="/exclusivePerfumes" className="dropdown-link">Exclusive Perfumes</Link>
                  <Link to="/womenPerfumes" className="dropdown-link">Women Perfumes</Link>
                  <Link to="/menPerfumes" className="dropdown-link">Men Perfumes</Link>
                </div>
              </div>
      
              <Link to="/orders">
                <i className="fas fa-shopping-cart"></i> Orders
              </Link>
              <Link to="/users">
                <i className="fas fa-users"></i> Users
              </Link>
              <Link to="/logout">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </div>

      <div className="orders-container">
        <h2>All Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.customerDetails.name}</td>
                  <td>{order.customerDetails.email}</td>
                  <td>{order.customerDetails.phone}</td>
                  <td>{order.customerDetails.address}</td>
                  <td>{order.paymentMethod}</td>
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>
                    {order.cartItems.map((item, index) => (
                      <div key={index} className="item-details">
                        {item.item} (x{item.quantity}) - ₹{item.price}
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAdmin;
