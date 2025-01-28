import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); 
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
      
        const toggleSidebar = () => {
          setSidebarVisible(!sidebarVisible);
        };
      
        const toggleDropdown = () => {
          setDropdownVisible(!dropdownVisible);
        };
    
  // To handle any errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users'); // API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        console.log("Fetched users data:", data);  // Log the fetched data for debugging
        
        // Check if the data contains the 'users' property and is an array
        if (data && Array.isArray(data.users)) {
          setUsers(data.users); // Update state with the 'users' array
        } else {
          console.error("Invalid data format received:", data);
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users: " + error.message); // Set the error state if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();  // Fetch users when the component mounts
  }, []);

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
    <div className="user-container">
      <h1>User Accounts</h1>
      {loading && <p>Loading...</p>}  {/* Show loading text until the data is fetched */}
      {error && <p className="error-message">{error}</p>}  {/* Show error message if any */}
      
      {/* If data is loaded and there’s no error, display the table */}
      {!loading && !error && (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default User;
