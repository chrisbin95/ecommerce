import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const data = [
    { cateImg: "/images/category/cat1.png", cateName: "Fashion" },
    { cateImg: "/images/category/cat2.png", cateName: "Electronic" },
    { cateImg: "/images/category/cat3.png", cateName: "Cars" },
    { cateImg: "/images/category/cat4.png", cateName: "Home & Garden" },
    { cateImg: "/images/category/cat5.png", cateName: "Gifts" },
    { cateImg: "/images/category/cat6.png", cateName: "Music" },
    { cateImg: "/images/category/cat7.png", cateName: "Health & Beauty" },
    { cateImg: "/images/category/cat8.png", cateName: "Pets" },
    { cateImg: "/images/category/cat9.png", cateName: "Baby Toys" },
    { cateImg: "/images/category/cat11.png", cateName: "Books" },
  ];

  return (
    <div className="bg-white min-w-[240px] py-2 transition-all duration-300">
      {data.map((value, index) => (
        <Link 
          to={`/category/${value.cateName.toLowerCase().replace(/ & /g, "-")}`} 
          key={index}
          className="group flex items-center px-4 py-3 hover:bg-orange-50 transition-colors duration-200 border-b border-gray-50 last:border-0"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-200 shadow-sm">
            <img 
              src={value.cateImg} 
              alt={value.cateName} 
              className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" 
            />
          </div>

          <span className="ml-4 text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-200">
            {value.cateName}
          </span>

          <i className="fa-solid fa-chevron-right ml-auto text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
        </Link>
      ))}
    </div>
  );
};

export default Categories;