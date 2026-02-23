import React from "react";
import TopCart from "./TopCart";

const TopCate = () => {
  return (
    <section className="TopCate bg-gray-50/50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
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
        <TopCart />
      </div>
    </section>
  );
};

export default TopCate;