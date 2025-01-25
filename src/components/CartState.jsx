import React, { useState, useEffect } from 'react';
import ExclusiveProduct from './ExclusiveProduct';
import Cart from './Cart';
import WomenProduct from './WomenProduct';
import MenProduct from './MenProduct';

const CartState = () => {
  const [cartItems, setCart] = useState([]);

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart); // Initialize state with stored cart items
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      {/* Pass cartItems and setCart as props */}
      <ExclusiveProduct cartItems={cartItems} setCart={setCart} />
      <WomenProduct cartItems={cartItems} setCart={setCart} />
      <MenProduct cartItems={cartItems} setCart={setCart} />
      <Cart cartItems={cartItems} setCart={setCart} />
    </div>
  );
};

export default CartState;
