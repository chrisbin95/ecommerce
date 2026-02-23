// src/components/Search.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import logo from "../../components/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../../components/login/UserProfile";

// Firebase Imports
import { db } from "../../firebase"; 
import { collection, query, getDocs, where, orderBy, startAt, endAt } from "firebase/firestore";

Modal.setAppElement('#root');

// FIX 1: Destructure setIsLoginModalOpen from props
const Search = ({ cartItems, setIsLoginModalOpen }) => { 
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Sticky Header Logic
  useEffect(() => {
    const handleScroll = () => {
      const search = document.querySelector(".search-section");
      if (search) {
        if (window.scrollY > 100) search.classList.add("sticky-active");
        else search.classList.remove("sticky-active");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIX 2: Real Firestore Search Logic (Replacing hardcoded IDs)
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const productsRef = collection(db, "products");
        let q = query(
          productsRef, 
          orderBy("name"), 
          startAt(searchQuery), 
          endAt(searchQuery + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        let fullProductData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (category) {
          fullProductData = fullProductData.filter(p => p.category === category);
        }

        setSearchResults(fullProductData);
      } catch (error) {
        console.error("Firestore Search Error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchProducts, 400); 
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, category]);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <>
      <section className="search-section bg-white border-b border-gray-100 lg:z-[100] transition-all duration-300 ease-in-out w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          
          <Link to="/" className="logo flex items-center flex-shrink-0 group">
            <img src={logo} alt="Logo" className="w-10 lg:w-14 transition-transform group-hover:scale-105" />
            <h1 className="text-xl lg:text-2xl font-bold ml-2 text-gray-800 tracking-tight">
              Zee<span className="text-orange-500">Cart</span>
            </h1>
          </Link>

          {/* Search Input */}
          <div className="hidden md:flex flex-grow max-w-2xl mx-4 relative">
            <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 hover:bg-white hover:border-orange-300 hover:shadow-sm transition-all group">
              <i className={`fa ${isSearching ? 'fa-spinner animate-spin' : 'fa-search'} text-gray-400`}></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g. iPhone)..."
                className="bg-transparent outline-none px-3 w-full text-sm text-gray-700"
              />
              <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm text-gray-500 cursor-pointer outline-none border-none"
              >
                <option value="">All Categories</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            {/* Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[110]">
                {searchResults.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => {
                       setSearchResults([]);
                       setSearchQuery("");
                       navigate(`/product/${product.id}`);
                    }}
                    className="flex items-center p-3 hover:bg-orange-50 cursor-pointer transition-colors border-b last:border-0"
                  >
                    <img src={product.imageUrl} alt="" className="w-10 h-10 object-contain mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-orange-600 font-bold">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button onClick={openProfileModal} className="p-2 lg:p-3 rounded-full hover:bg-gray-100 text-gray-700">
              <i className="fa-regular fa-user text-lg lg:text-xl"></i>
            </button>
            <Link to="/cart" className="p-2 lg:p-3 rounded-full hover:bg-gray-100 text-gray-700 relative">
              <i className="fa-solid fa-shopping-bag text-lg lg:text-xl"></i>
              {cartItems?.length > 0 && (
                <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={closeProfileModal}
        className="fixed inset-0 flex items-center justify-center p-4 z-[200]"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
        closeTimeoutMS={300}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="font-bold text-gray-800">ZeeCart Account</h2>
            <button onClick={closeProfileModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500">
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <UserProfile setIsLoginModalOpen={() => {
              closeProfileModal();
              if (setIsLoginModalOpen) setIsLoginModalOpen(true);
            }} />
          </div>
        </div>
      </Modal>

      <style jsx="true">{`
        .sticky-active {
          position: fixed;
          top: 0; left: 0; right: 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 0.5rem 0 !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          animation: slideDown 0.4s ease-out;
        }
        @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
      `}</style>
    </>
  );
};

export default Search;