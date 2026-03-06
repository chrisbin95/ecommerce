// src/components/Search.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import logo from "../../components/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../../components/login/UserProfile";
import * as tf from "@tensorflow/tfjs";
import { db } from "../../firebase";
import { collection, collectionGroup, getDocs } from "firebase/firestore";

Modal.setAppElement("#root");
const Search = ({ cartItems, setIsLoginModalOpen }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  // Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      const search = document.querySelector(".search-section");
      if (!search) return;

      if (window.scrollY > 100) search.classList.add("sticky-active");
      else search.classList.remove("sticky-active");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load all products from nested Firestore
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // const mainDocs = await getDocs(collection(db, "products"));
        const categories = ["Shoes", "Watches", "Clothes", "Electronics"];
        let allProducts = [];
        for (const cat of categories) {
          const snap = await getDocs(collectionGroup(db, cat));
          const items = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            category: cat
          }));
          allProducts = [...allProducts, ...items];
        }
        console.log("Products loaded:", allProducts.length);
        console.log("Sample product:", allProducts[0]);
        setProducts(allProducts);
      } catch (err) {
        console.error("Product load error:", err);
      }
    };
    loadProducts();
  }, []);

  // Tensor ranking
  const rankProducts = (items, query) => {
    const q = query.toLowerCase();
    return tf.tidy(() => {
      const queryVector = tf.tensor1d([
        q.includes("cheap") ? 1 : 0,
        q.includes("expensive") ? 1 : 0,
        q.includes("watch") ? 1 : 0,
        q.includes("shoe") ? 1 : 0,
        q.includes("electronic") ? 1 : 0
      ]);
      const ranked = items.map(p => {
        const itemVector = tf.tensor1d([
          (p.price || 0) < 2000 ? 1 : 0,
          (p.price || 0) > 5000 ? 1 : 0,
          p.category === "Watches" ? 1 : 0,
          p.category === "Shoes" ? 1 : 0,
          p.category === "Electronics" ? 1 : 0
        ]);
        const score = queryVector.dot(itemVector).arraySync();
        return { ...p, score };
      });
      return ranked.sort((a, b) => b.score - a.score);
    });
  };
  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      const q = searchQuery.toLowerCase().trim();
      let results = products.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        return name.includes(q) || cat.includes(q);
      });
      if (category) {
        results = results.filter((p) => p.category === category);
      }
      const ranked = rankProducts(results, searchQuery);
      setSearchResults(ranked.slice(0, 8));
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, category, products]);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <>
      <section className="search-section bg-white border-b border-gray-100 lg:z-[100] transition-all duration-300 ease-in-out w-full">
        <div className="container mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
          <Link to="/" className="logo flex items-center flex-shrink-0 group">
            <img src={logo} alt="Logo" className="w-10 lg:w-14" />
            <h1 className="text-xl lg:text-2xl font-bold ml-2 text-gray-800">
              Zee<span className="text-orange-500">Cart</span>
            </h1>
          </Link>
          {/* Search */}
          <div className="w-full md:flex md:flex-grow max-w-2xl order-3 md:order-none relative">
            <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
              <i className={`fa ${isSearching ? "fa-spinner animate-spin" : "fa-search"} text-gray-400`}></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent outline-none px-3 w-full text-sm"
              />
              <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="">All</option>
                <option value="Shoes">Shoes</option>
                <option value="Watches">Watches</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            {/* Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-y-auto max-h-80 z-[110]">
                {searchResults.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSearchResults([]);
                      setSearchQuery("");
                      navigate(`/product/${product.id}`, { state: { product } });
                    }}
                    className="flex items-center p-3 hover:bg-orange-50 cursor-pointer border-b last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-orange-600 font-bold">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openProfileModal}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <i className="fa-regular fa-user"></i>
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <i className="fa-solid fa-shopping-bag"></i>
              {cartItems?.length > 0 && (
                <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </section>
      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={closeProfileModal}
        className="fixed inset-0 flex items-center justify-center p-4 z-[200]"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold">ZeeCart Account</h2>
            <button onClick={closeProfileModal}>
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="p-4">
            <UserProfile
              setIsLoginModalOpen={() => {
                closeProfileModal();
                if (setIsLoginModalOpen) setIsLoginModalOpen(true);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Search;