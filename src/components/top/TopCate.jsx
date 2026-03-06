import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TopCart from "./TopCart"; 

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopCate = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data.slice(0, 10)); // top 10
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    loadProducts();
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
      { breakpoint: 1024, settings: { slidesToShow: 3 } }, // fewer slides, less gap
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1.5 } }, // partially show next slide
    ],
  };

  return (
    <section className="TopCate bg-gray-50/50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center rounded-xl shadow-lg shadow-indigo-100">
              <i className="fa-solid fa-layer-group text-white text-lg"></i>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Top <span className="text-indigo-600">Categories</span>
            </h1>
          </div>
          <button className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            Explore All
          </button>
        </div>

        {/* TopCart */}
        <TopCart />

        {/* Carousel */}
        {products.length > 0 && (
          <div className="mt-8">
            <Slider {...settings} className="topcate-slider -mx-1 sm:-mx-2 md:-mx-3">
              {products.map((product) => (
                <div key={product.id} className="px-1 sm:px-2 md:px-3">
                  <div className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/20 p-4 flex flex-col items-center justify-center">
                    <div className="h-32 md:h-40 w-full flex items-center justify-center bg-white/40 rounded-2xl mb-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[80%] object-contain"
                      />
                    </div>
                    <h4 className="text-xs md:text-sm text-black font-bold text-center truncate max-w-[150px] md:max-w-[150px]">
                      {product.title}
                    </h4>
                    <p className="text-sm md:text-base font-black text-indigo-600">
                      ₹{Math.round(product.price * 80)}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      {/* Fix slider alignment on mobile */}
      <style>{`.slick-track { display:flex !important; align-items:center; }`}</style>
    </section>
  );
};

export default TopCate;