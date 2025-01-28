import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests
import "./AddNewProduct.css";
import { Link, useNavigate } from 'react-router-dom';

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image_url: "",
    type: "",
    keynotes: "",
    description: "",
    ratings: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fakeUploadService(formData).then((url) => {
        setFormData({ ...formData, image_url: url });
      });
    }
  };

  const fakeUploadService = (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://example.com/uploaded-image.jpg"); // Simulating image URL response
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set up the URL based on the product type
    let url = '';
    if (formData.type === "Men") {
      url = 'http://localhost:5000/perfumes';
    } else if (formData.type === "Exclusive") {
      url = 'http://localhost:5000/exclusive_perfumes';
    } else if (formData.type === "Women") {
      url = 'http://localhost:5000/women_perfumes';
    }

    const formToSend = { ...formData };

    try {
      const response = await axios.post(url, formToSend, {
        headers: {
          'Content-Type': 'application/json', // assuming you're sending JSON data
        },
      });
      alert("Product Added Successfully!");
      console.log("Response:", response);
      setFormData({
        name: "",
        price: "",
        image_url: "",
        type: "",
        keynotes: "",
        description: "",
        ratings: "",
      });
      navigate("/products"); // Redirect to the products page after successful submission
    } catch (error) {
      console.error("Error adding product:", error.response ? error.response : error.message);
      alert("Error adding product.");
    }
  };

  return (
    <div className="admin-page">
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <h2>Admin Panel</h2>
        <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
        <Link to="/products"><i className="fas fa-box"></i> Products</Link>
        <Link to="/orders"><i className="fas fa-shopping-cart"></i> Orders</Link>
        <Link to="/users"><i className="fas fa-users"></i> Users</Link>
        <Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link>
      </div>

      <div className="add-product-page">
        <h1 className="page-title">Add New Product</h1>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
            required
          />

          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Uploaded Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
            />
          )}

          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Enter product type"
            required
          />

          <label htmlFor="keynotes">Keynotes</label>
          <textarea
            id="keynotes"
            name="keynotes"
            value={formData.keynotes}
            onChange={handleInputChange}
            placeholder="Enter product keynotes"
            required
          ></textarea>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            required
          ></textarea>

          <label htmlFor="ratings">Ratings</label>
          <input
            type="number"
            id="ratings"
            name="ratings"
            value={formData.ratings}
            onChange={handleInputChange}
            placeholder="Enter product ratings (out of 5)"
            min="0"
            max="5"
            step="1"
            required
          />

          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;