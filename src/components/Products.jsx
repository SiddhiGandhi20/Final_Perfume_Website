import React, { useEffect, useState } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [womenPerfumes, setWomenPerfumes] = useState([]);
  const [menPerfumes, setMenPerfumes] = useState([]);
  const [exclusivePerfumes, setExclusivePerfumes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
   const [sidebarVisible, setSidebarVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
  
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };
  
  const fetchWomenPerfumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/women_perfumes');
      const data = await response.json();
      setWomenPerfumes(data);
    } catch (error) {
      console.error('Error fetching women perfumes:', error);
    }
  };

  const fetchMenPerfumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/perfumes');
      const data = await response.json();
      setMenPerfumes(data);
    } catch (error) {
      console.error('Error fetching men perfumes:', error);
    }
  };

  const fetchExclusivePerfumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/exclusive_perfumes');
      const data = await response.json();
      setExclusivePerfumes(data);
    } catch (error) {
      console.error('Error fetching exclusive perfumes:', error);
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Updated product:', selectedProduct);
    handleModalClose();
  };

  useEffect(() => {
    fetchWomenPerfumes();
    fetchMenPerfumes();
    fetchExclusivePerfumes();
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
          
    

      <div className={`admin-main-content ${sidebarVisible ? 'admin-shifted' : ''}`}>
        <div className="admin-products-container">
          {[{ title: 'Women Perfumes', products: womenPerfumes },
            { title: 'Men Perfumes', products: menPerfumes },
            { title: 'Exclusive Perfumes', products: exclusivePerfumes }]
            .map(({ title, products }) => (
              <div key={title} className="admin-category-section">
                <h2 className="admin-category-title">{title}</h2>
                <div className="admin-product-row">
                  {products.length === 0 ? (
                    <p className="admin-loading-text">Loading {title}...</p>
                  ) : (
                    products.map((product) => (
                      <div key={product.id} className="admin-product-card">
                        <img src={product.image_url} alt={product.name} className="admin-product-image" />
                        <div className="admin-product-details">
                          <h4>{product.name}</h4>
                          <p>{product.description}</p>
                          <div className="admin-action-buttons">
                            <button className="admin-update-btn" onClick={() => handleUpdateClick(product)}>Update</button>
                            <button className="admin-delete-btn">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="admin-add-product-section">
          <button className="admin-add-product-btn" onClick={() => navigate("/add-product")}>
            + Add New Product
          </button>
        </div>
      </div>

      {isModalVisible && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <h3>Update Product</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="admin-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, description: e.target.value })
                  }
                />
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="admin-update-btn">Save</button>
                <button type="button" className="admin-delete-btn" onClick={handleModalClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
