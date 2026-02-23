import React from "react";

const Catg = () => {
  const data = [
    { cateImg: "./images/category/cat-4.png", cateName: "Apple" },
    { cateImg: "./images/category/cat-5.png", cateName: "Samsung" },
    { cateImg: "./images/category/cat-2.png", cateName: "Oppo" },
    { cateImg: "./images/category/cat-1.png", cateName: "Vivo" },
    { cateImg: "./images/category/cat-6.png", cateName: "Redmi" },
    { cateImg: "./images/category/cat-7.png", cateName: "Sony" },
  ];

  return (
    <div className="category transition-all">
      {/* Head section with a cleaner look */}
      <div className="chead flex items-center justify-between mb-6">
        <h1 className="text-lg font-black text-slate-900 tracking-tight">Brands</h1>
        <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
      </div>

      {/* Stacked list for Sidebar - cleaner than a grid in tight spaces */}
      <div className="flex flex-col gap-2">
        {data.map((value, index) => (
          <div 
            className="group flex items-center gap-4 p-3 bg-white hover:bg-orange-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-orange-100 hover:shadow-sm" 
            key={index}
          >
            {/* Image Wrapper */}
            <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl group-hover:bg-white transition-colors overflow-hidden border border-slate-100">
              <img 
                src={value.cateImg} 
                alt={value.cateName} 
                className="w-7 h-7 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
              />
            </div>

            {/* Brand Name */}
            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
              {value.cateName}
            </span>

            {/* Subtle Arrow that appears on hover */}
            <i className="fa-solid fa-chevron-right ml-auto text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0"></i>
          </div>
        ))}
      </div>

      {/* Modern View All Button */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <button className="w-full text-center text-xs font-black uppercase tracking-widest text-orange-500 hover:text-slate-900 transition-colors">
          View All Brands
        </button>
      </div>
    </div>
  );
};

export default Catg;