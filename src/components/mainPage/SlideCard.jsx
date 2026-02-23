import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sdata from "./Sdata";

const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    adaptiveHeight: false,
    appendDots: (dots) => (
      <div className="absolute bottom-4 md:bottom-8 w-full">
        <ul className="flex justify-center items-center gap-1 m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-gray-300 rounded-full transition-all duration-500 ease-in-out"></div>
    ),
  };

  return (
    <div className="slider-wrapper relative group overflow-hidden rounded-2xl md:rounded-[2rem] bg-white shadow-lg border border-gray-100">
      <Slider {...settings}>
        {Sdata.map((value, index) => (
          <div key={index} className="outline-none">

            <div className="flex flex-col md:flex-row items-center min-h-[550px] md:min-h-[550px] lg:min-h-[600px]">
              
              <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-10 order-1 md:order-2 md:bg-transparent h-[250px] md:h-auto">
                <img
                  src={value.cover.startsWith('.') ? value.cover.substring(1) : value.cover}
                  alt={value.title}
                  className="max-w-full h-full md:h-auto object-contain max-h-[200px] md:max-h-[450px] animate-float"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1">
                <div className="animate-slide-up">
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-600 font-bold tracking-widest uppercase text-[9px] md:text-[10px] rounded-full mb-3 md:mb-5">
                    Limited Edition
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-6 text-slate-900 tracking-tight leading-tight">
                    {value.title}
                  </h1>
                  <p className="text-slate-500 text-sm md:text-lg leading-relaxed md:max-w-sm mb-6 md:mb-10">
                    {value.desc}
                  </p>
                  <button className="group/btn relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-sm md:text-base font-bold text-white transition-all bg-orange-500 rounded-full hover:bg-orange-600 shadow-lg shadow-orange-200">
                    Shop Now
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>

      <style jsx="true">{`
        .slick-dots li.slick-active div {
          background-color: #f97316 !important;
          width: 1.5rem !important;
        }
        @media (min-width: 768px) {
          .slick-dots li.slick-active div { width: 2.5rem !important; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SlideCard;