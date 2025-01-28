import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './SideBar';

const DashboardPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="dashboard-page">
      {/* Sidebar Component */}
      <Sidebar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`main-content ${sidebarVisible ? 'shifted' : ''}`}>
        <div className="header">
          <input placeholder="Search..." type="text" />
          <img
            alt="User profile picture"
            height="40"
            src="https://storage.googleapis.com/a1aa/image/LUmDXhkiPUJaDBu9LtpJv6p1FgZwmzRJIeeeBwaenV9DtbKQB.jpg"
            width="40"
            id="adminPhoto"
            onClick={toggleSidebar}
          />
        </div>

        {/* Dashboard Section */}
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
  );
};

export default DashboardPage;
