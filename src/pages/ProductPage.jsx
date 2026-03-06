import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [imageUrl, setImageUrl] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /* Load product image from Firebase Storage */

  useEffect(() => {
    const loadImage = async () => {
      if (!product) return;
      try {
        const url = await getDownloadURL(
          ref(storage, `products/${product.category}/${product.imageName}`)
        );
        setImageUrl(url);
      } catch {
        setImageUrl("");
      }
    };
    loadImage();
  }, [product]);

  /* Load suggestion products */
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setSuggestions(data.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    };
    loadSuggestions();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  if (!product) {
    return <div className="text-center mt-20 text-white">Product not found</div>;
  }

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const id = item.id;
    const name = item.name || item.title;
    const image = item.image || imageUrl;
    const existing = cart.find((p) => p.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
        id,
        name,
        price: item.price,
        image,
        qty: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart:", cart);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Product Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          {/* Product Image */}
          <div className="p-10 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-transparent">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="w-80 object-contain drop-shadow-xl hover:scale-105 transition duration-300"
              />
            ) : (
              <div className="text-gray-400">Loading image...</div>
            )}
          </div>
          {/* Product Info */}
          <div className="p-10 flex flex-col justify-center">
            <span className="inline-block w-fit text-xs tracking-wider uppercase bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-black/50 border border-orange-500 text-orange-400 px-3 py-1 rounded-full text-sm">
                ⭐ {product.rating}
              </span>
              {product.discount && (
                <span className="bg-orange-500 text-black font-semibold px-3 py-1 rounded-full text-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-8">
              ₹{product.price}
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => addToCart(product)}
                    className="flex-shrink-0 bg-slate-900 text-white w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 active:scale-90"
                    aria-label="Add to cart"
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-1 rounded-xl transition shadow-lg">
                    Buy Now
                </button>
            </div>
          </div>
        </div>
        {/* Suggestions */}
        <div className="pt-20">
          <h2 className="text-2xl font-bold text-orange-500 mb-8">
            You may also like
          </h2>
          {suggestions.length > 0 && (
            <Slider {...settings}>
              {suggestions.map((item) => (
                <div key={item.id} className="px-3">
                  <div className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/20 p-4">
                    <div className="h-40 flex items-center justify-center bg-white/40 rounded-2xl mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-[80%] object-contain"
                      />
                    </div>
                    <h4 className="text-xs pb-1 text-black font-bold truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm font-black text-orange-600"
                    style={{ position: "absolute", bottom: "20px" }}
                    >
                    ₹{Math.round(item.price * 80)}
                    </p>
                    <button
                        onClick={() => addToCart(item)}
                        className="ml-auto bg-slate-900 text-white w-9 h-9 rounded-lg flex items-center justify-center hover:bg-orange-500 transition"
                        >
                        +
                        </button>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      <style>
        {`.slick-track { display:flex !important; align-items:center; }`}
      </style>

    </div>
  );
};

export default ProductPage;