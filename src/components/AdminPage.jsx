import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="admin-page">
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        {/* <h2>Admin Panel</h2> */}
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

      <div className={`main-content ${sidebarVisible ? 'shifted' : ''}`}>
        <div className="section" id="dashboard">
          <h2>Admin Panel</h2>
          <div className="dashboard">
            <h3>Dashboard</h3>
            <div className="cards">
              <div className="card">
                <i className="fas fa-headphones-alt"></i>
                <p>Total Products</p>
                <h4>150</h4>
              </div>
              <div className="card">
                <i className="fas fa-users"></i>
                <p>Total Users</p>
                <h4>1200</h4>
              </div>
              <div className="card">
                <i className="fas fa-dollar-sign"></i>
                <p>Total Sales</p>
                <h4>₹3,375,000</h4>
              </div>
              <div className="card">
                <i className="fas fa-chart-line"></i>
                <p>Monthly Revenue</p>
                <h4>₹375,000</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
