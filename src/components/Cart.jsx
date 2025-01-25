import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems = [], setCart }) => {
  const navigate = useNavigate();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      setCart(savedCart); // Restore the cart from localStorage
    }
  }, [setCart]);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (_id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (_id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems && cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.image_url}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price (each): ₹{item.price}</p>
                <p>Total Price: ₹{item.price * item.quantity}</p>
                <div className="quantity-control">
                  <button
                    onClick={() => handleDecreaseQuantity(item._id)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item._id)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ₹{calculateTotal()}</h3>
          </div>
          <div className="proceed-to-checkout">
            <button onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
