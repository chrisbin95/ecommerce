import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tdata from "./Tdata";

const TopCart = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 2, centerMode: true, centerPadding: "40px" } }
    ],
  };
  // SAFETY CHECK: If data is missing or empty, don't render the slider yet
  if (!Tdata || Tdata.length === 0) {
    return <div className="p-10 text-center text-slate-400">Loading Categories...</div>;
  }

  return (
    <div className="top-categories-slider pb-0">
      <Slider {...settings}>
        {Tdata.map((value, index) => (
          <div className="px-3" key={index}>
            {/* Main Card */}
            <div className="group relative flex flex-col items-center p-3 rounded-[1.5rem] bg-white border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2">
              {/* Small Image Container (The "Icon" Look) */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-slate-50 group-hover:bg-indigo-50 transition-colors duration-500 mb-4">
                <img 
                  src={value.cover.startsWith('.') ? value.cover.substring(1) : value.cover} 
                  alt={value.para} 
                  className="w-2/3 h-2/3 object-contain transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6" 
                />
                {/* Micro Badge for 'desc' */}
                <div className="absolute -bottom-1 -right-1 bg-white shadow-md rounded-lg px-2 py-1 border border-slate-50">
                  <p className="text-[8px] font-black text-indigo-600 uppercase tracking-tighter">
                    {value.desc}
                  </p>
                </div>
              </div>
              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-slate-800 font-bold text-sm md:text-base tracking-tight mb-1">
                  {value.para}
                </h3>
                <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Explore</span>
                  <i className="fa-solid fa-arrow-right text-[8px] text-indigo-500"></i>
                </div>
              </div>
              {/* Corner Accent Decor */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-orange-200 group-hover:bg-orange-400 transition-colors" />
            </div>
          </div>
        ))}
      </Slider>
      <style jsx="true">{`
        .top-categories-slider .slick-list {
          overflow: visible;
          padding: 20px 0;
        }
        /* Fix for center mode on mobile */
        @media (max-width: 640px) {
           .top-categories-slider .slick-center .group {
            //  border-color: #6366f1;
            //  background-color: #f8fafc;
           }
        }
      `}</style>
    </div>
  );
};

export default TopCart;