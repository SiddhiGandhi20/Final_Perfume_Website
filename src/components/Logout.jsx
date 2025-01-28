import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logging out by removing token or session data
    localStorage.removeItem("userToken"); // Example: remove token
    // Redirect the user to the home page after logout
    navigate("/"); // Use navigate() for routing in v6+
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>You have been logged out successfully!</h2>
      <p>Redirecting you to the home page...</p>
    </div>
  );
};

export default Logout;
