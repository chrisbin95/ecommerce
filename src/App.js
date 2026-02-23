import React, { useState, useEffect } from "react"; // Added useEffect
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import Login from "./components/login/Login";
import Loader from "./components/loader/Loader"; // Loader Import
import './index.css';

Modal.setAppElement('#root');

function App() {
  const { productItems } = Data;
  const { shopItems } = Sdata;
  const [cartItems, setCartItems] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // 1. New State for Loading
  const [isLoading, setIsLoading] = useState(true);

  // 2. Logic to hide loader after app "mounts"
  useEffect(() => {
    // Simulate a 2-second high-end loading experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map((item) => 
        item.id === product.id ? { ...existingItem, qty: existingItem.qty + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (!existingItem) return;
    if (existingItem.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(cartItems.map((item) => 
        item.id === product.id ? { ...existingItem, qty: existingItem.qty - 1 } : item
      ));
    }
  };

  // 3. Early return: If loading, only show the Loader
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header cartItems={cartItems} setIsLoginModalOpen={setIsLoginModalOpen} />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Pages 
              cartItems={cartItems} 
              productItems={productItems} 
              addToCart={addToCart} 
              shopItems={shopItems} 
            />
          } 
        />
        <Route path="/offers" element={<Pages />} />
        <Route path="/track-order" element={<Pages />} />
        <Route path="/contact" element={<Pages />} />
        <Route path="/user" element={<Pages />} />

        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cartItems} 
              addToCart={addToCart} 
              decreaseQty={decreaseQty} 
              removeFromCart={removeFromCart}
            />
          } 
        />

        <Route 
          path="/category/:categoryName" 
          element={
            <Pages 
              cartItems={cartItems} 
              productItems={productItems} 
              addToCart={addToCart} 
              shopItems={shopItems} 
            />
          } 
        />
      </Routes>
      
      <Footer />

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setIsLoginModalOpen(false)}
        className="relative w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-2xl outline-none z-[300] overflow-hidden"
        overlayClassName="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[250] flex items-center justify-center p-4"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
        <div className="flex justify-end mb-2">
          <button 
            onClick={() => setIsLoginModalOpen(false)} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <Login onSuccessfulLogin={() => setIsLoginModalOpen(false)} />
      </Modal>
    </Router>
  );
}

export default App;