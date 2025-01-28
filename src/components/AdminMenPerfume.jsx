import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './AdminMenPerfume.css';

const AdminMenPerfume = () => {
  const [menPerfumes, setMenPerfumes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    keynotes: '',
    ratings: '',
    type: 'Men',
  });

  const fetchMenPerfumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/perfumes');
      if (!response.ok) {
        throw new Error('Failed to fetch men perfumes');
      }
      const data = await response.json();
      setMenPerfumes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenPerfumes();
  }, []);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalVisible(true); // Open update modal
  };

  const handleAddClick = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      image: null,
      keynotes: '',
      ratings: '',
      type: 'Men',
    });
    setIsAddModalVisible(true); // Open add product modal
  };

  const handleModalClose = () => {
    setIsAddModalVisible(false);
    setIsUpdateModalVisible(false);
    setSelectedProduct(null);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      console.error("No product selected.");
      return;
    }

    // Validate required fields
    if (!selectedProduct.name || !selectedProduct.description || !selectedProduct.price || !selectedProduct.keynotes) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/perfumes/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
          keynotes: selectedProduct.keynotes,
          image_url: selectedProduct.image_url,
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setMenPerfumes((prevPerfumes) =>
          prevPerfumes.map((product) =>
            product._id === selectedProduct._id ? updatedProduct : product
          )
        );
        handleModalClose();
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.message || "Unknown error occurred"}`);
      }
    } catch (error) {
      alert("Error updating product. Please try again.");
    }
  };

  const handleAddNewProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.keynotes || !newProduct.image) {
      alert('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.image); // Assuming `image` is a File object
    formData.append('type', newProduct.type);
    formData.append('keynotes', newProduct.keynotes);
    formData.append('description', newProduct.description);
    formData.append('ratings', newProduct.ratings);

    try {
      const response = await fetch('http://localhost:5000/perfumes', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setMenPerfumes((prevPerfumes) => [...prevPerfumes, addedProduct]);
        handleModalClose(); // Close modal after successful add
        alert('Product added successfully!');
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.message || 'Unknown error occurred'}`);
      }
    } catch (error) {
      alert('Error adding product, please try again.');
    }
  };
  const handleDeleteClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/perfumes/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMenPerfumes(menPerfumes.filter(product => product._id !== productId));
      } else {
        console.error('Failed to delete the product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <h2>Admin Panel</h2>
        <Link to="/adminPage">
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link>
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

      {/* Main Content */}
      <div className="category-page">
        <h2>Men Perfumes</h2>
        {loading ? (
          <p>Loading Men Perfumes...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="product-row">
            {menPerfumes.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.name} className="product-image" />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div className="admin-action-buttons">
                  <button className="admin-update-btn" onClick={() => handleUpdateClick(product)}>Update</button>
                  <button className="admin-delete-btn" onClick={() => handleDeleteClick(product._id)}>Delete</button>
                </div>
              </div>
            ))}
            <div className="admin-add-product-section">
              <button className="admin-add-product-btn" onClick={handleAddClick}>
                + Add New Product
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Adding New Product */}
      {isAddModalVisible && (
        <div className="modal show">
          <div className="modal-content">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddNewProduct}>
              <label>Name:</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <label>Description:</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <label>Price:</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <label>Keynotes:</label>
              <textarea
                value={newProduct.keynotes}
                onChange={(e) => setNewProduct({ ...newProduct, keynotes: e.target.value })}
              />
              <label>Image:</label>
              <input
                type="file"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              />
              <label>Ratings:</label>
              <input
                type="number"
                value={newProduct.ratings}
                onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })}
              />
              <button type="submit">Add Product</button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Update */}
      {isUpdateModalVisible && selectedProduct && (
        <div className="modal show">
          <div className="modal-content">
            <h3>Update Product</h3>
            <form onSubmit={handleFormSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              />
              <label>Description:</label>
              <textarea
                value={selectedProduct.description}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
              />
              <label>Price:</label>
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              />
              <label>Keynotes:</label>
              <textarea
                value={selectedProduct.keynotes}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, keynotes: e.target.value })}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenPerfume;
