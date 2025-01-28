import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfume from './components/Perfume';
import Slider from './components/Slider';
import MidSection from './components/MidSection';
import TopTrending from './components/TopTrending';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import TopSelling from './components/TopSelling';
import Details from './components/Details';
import Exclusive from './components/Exclusive';
import ExclusiveProducts from './components/ExclusiveProduct';
import ExclusiveProductDetails from './components/ExclusiveProductDetails';
import Women from './components/Women';
import WomenProducts from './components/WomenProduct';
import Men from './components/Men';
import MenProduct from './components/MenProduct';
import MenProductDetails from './components/MenProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Account from './components/Account';
import WishList from './components/Wishlist';
import WomenProductDetails from './components/WomenProductDetails';
import AdminPage from './components/AdminPage';
import OrdersAdmin from './components/OrdersAdmin';
import Products from './components/Products';
import AddNewProduct from './components/AddNewProduct';
import Logout from './components/Logout';
import User from './components/User';
import AdminExclusivePerfumes from './components/AdminExclusivePerfumes';
import AdminWomenPerfumes from './components/AdminWomenPerfumes';
import AdminMenPerfume from './components/AdminMenPerfume';

// Import AOS CSS
import 'aos/dist/aos.css';
import AOS from 'aos';

function App() {
  const [cartItems, setCart] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animations should only happen once
    });
  }, []); // Empty dependency array to run only once when component mounts


  return (
    <Router>
      <div className="App">
        <Routes>
        <Route
            path="/account"
            element={
              <>
                <Account data-aos="slide-up" />
               
              </>
            }
          />
        </Routes>
        <Perfume cartItems={cartItems} wishlistItems={wishlistItems} />
        <Routes>
          
       
          <Route
            path="/"
            element={
              <>
                <HeroSection data-aos="slide-up" />
                <Slider data-aos="slide-up" />
                <MidSection data-aos="slide-up" />
                <TopTrending data-aos="slide-up" />
                <TopSelling data-aos="slide-up" />
                <Footer data-aos="slide-up" />
              </>
            }
          />
          <Route
            path="/toptrending"
            element={
              <>
                <TopTrending
                   cartItems={cartItems}
                   setCart={setCart}
                   wishlistItems={wishlistItems}
                   setWishlistItems={setWishlistItems} 
                />
                <Footer />
              </>
            }
          />
          
          <Route path="/details/:id" 
          element={<><Details 
          cartItems={cartItems}
          setCart={setCart}
          wishlistItems={wishlistItems}
          setWishlistItems={setWishlistItems}
          data-aos="slide-up" /><Footer /></>} />


          <Route
            path="/exclusive"
            element={
              <>
                <Exclusive data-aos="slide-up" />
                <ExclusiveProducts
                  cartItems={cartItems}
                  setCart={setCart}
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                  data-aos="slide-up"
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/exclusive-product-details/:id"
            element={
              <>
                <ExclusiveProductDetails
                  cartItems={cartItems}
                  setCart={setCart}
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                  data-aos="slide-up"
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/women"
            element={
              <>
                <Women data-aos="slide-up" />
                <WomenProducts
                  cartItems={cartItems}
                  setCart={setCart}
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                  data-aos="slide-up"
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/women-product-details/:id"
            element={
              <>
                <WomenProductDetails
                  cartItems={cartItems}
                  setCart={setCart}
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                  data-aos="slide-up"
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/men"
            element={
              <>
                <Men data-aos="slide-up" />
                <MenProduct
                  cartItems={cartItems}
                  setCart={setCart}
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                  data-aos="slide-up"
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/men-product-details/:id"
            element={
              <>
                <MenProductDetails
                  cartItems={cartItems}
                  setCart={setCart}
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                  data-aos="slide-up"
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Cart cartItems={cartItems} setCart={setCart} data-aos="slide-up" />
                <Footer />
              </>
            }
          />
          <Route path="/checkout" element={<><Checkout data-aos="slide-up" /><Footer /></>} />
          <Route path="/wishlist" element={<><WishList wishlistItems={wishlistItems} setWishlist={setWishlistItems} cartItems={cartItems} setCart={setCart} data-aos="slide-up" /><Footer /></>} />
          <Route path="/adminPage" element={<><AdminPage data-aos="slide-up" /><Footer /></>} />
          <Route path="/products" element={<><Products data-aos="slide-up" /><Footer /></>} />
          <Route path="/add-product" element={<AddNewProduct data-aos="slide-up" />} />
          <Route path="/users" element={<><User data-aos="slide-up" /><Footer /></>} />
          <Route path="/orders" element={<><OrdersAdmin data-aos="slide-up" /><Footer /></>} />
          <Route path="/logout" element={<><Logout data-aos="slide-up" /><Footer /></>} />
          <Route path="/exclusivePerfumes" element={<><AdminExclusivePerfumes data-aos="slide-up" /></>} />
          <Route path="/womenPerfumes" element={<><AdminWomenPerfumes data-aos="slide-up" /></>} />
          <Route path="/menPerfumes" element={<><AdminMenPerfume data-aos="slide-up" /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
