import React ,{useState} from 'react';
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
import MenProduct from './components/MenProduct'
import MenProductDetails from './components/MenProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Account from './components/Account';
import WishList from './components/Wishlist';
import WomenProductDetails from './components/WomenProductDetails';



function App() {
  const [cartItems, setCart] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  


  return (
    
    <div className="App">
      <Router>
        <Perfume /> {/* Include the header navigation */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Slider />
                <MidSection />
                <TopTrending />
                <TopSelling />
                
                <Footer />
              </>
            }
          />
          </Routes>
      <Routes>
        <Route path='/toptrending' element={<><TopTrending/><Footer/></>}/>
        <Route path="/details/:id" element={<><Details /><Footer /></>} />
        <Route path='/exclusive' element={<><Exclusive/><ExclusiveProducts cartItems={cartItems} setCart={setCart} wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems} /><Footer/></>} />
        <Route path="/exclusive-product-details/:id" element={<><ExclusiveProductDetails cartItems={cartItems} setCart={setCart} wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}/><Footer/></>} />
        <Route path='/women' element={<><Women/><WomenProducts cartItems={cartItems} setCart={setCart} wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}/><Footer/></>} />
        <Route path="/women-product-details/:id" element={<><WomenProductDetails cartItems={cartItems} setCart={setCart} wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}/><Footer/></>} />
        <Route path='/men' element={<><Men/><MenProduct cartItems={cartItems} setCart={setCart} wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}/><Footer/></>} />
        <Route path="/men-product-details/:id" element={<><MenProductDetails cartItems={cartItems} setCart={setCart} wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}/><Footer/></>} />
        <Route path='/cart' element={<><Cart cartItems={cartItems} setCart={setCart} /><Footer/></>} />
        <Route path='/checkout' element={<><Checkout/><Footer/></>}/>
        <Route path='/account' element={<><Account/><Footer/></>}/>
        <Route path='/wishlist' element={<><WishList wishlistItems={wishlistItems}
        setWishlist={setWishlistItems}
        cartItems={cartItems}
        setCart={setCart}/><Footer/></>}/>



      </Routes>          {/* Add other routes if required */}
    
      </Router>
    </div>
  );
}

export default App;
