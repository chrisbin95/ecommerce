import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Modernized Arrows with better positioning
const SampleNextArrow = ({ onClick }) => (
  <button 
    className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl flex items-center justify-center shadow-xl text-slate-800 transition-all hover:bg-orange-500 hover:text-white hover:scale-110 active:scale-95 group"
    onClick={onClick}
    aria-label="Next Slide"
  >
    <i className="fa fa-chevron-right text-xs transition-transform group-hover:translate-x-0.5"></i>
  </button>
);

const SamplePrevArrow = ({ onClick }) => (
  <button 
    className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl flex items-center justify-center shadow-xl text-slate-800 transition-all hover:bg-orange-500 hover:text-white hover:scale-110 active:scale-95 group"
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <i className="fa fa-chevron-left text-xs transition-transform group-hover:-translate-x-0.5"></i>
  </button>
);

const FlashCard = ({ productItems, addToCart }) => {
  const [likedItems, setLikedItems] = useState({});

  if (!productItems || productItems.length === 0) return null;

  const handleLike = (itemId) => {
    setLikedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2, centerMode: true, centerPadding: '20px' } },
    ],
  };

  return (
    <div className="relative px-0"> {/* Removed px-2 to allow arrows to float better */}
      <Slider {...settings}>
        {productItems.map((item) => {
          const discountedPrice = (item.price - (item.price * item.discount / 100)).toFixed(0);

          return (
            <div className="py-10 px-3" key={item.id}> {/* Added top/bottom padding for the hover lift */}
              <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-3 relative transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.15)] hover:-translate-y-4">
                
                {/* Image Area - Glassmorphic Sub-box */}
                <div className="relative h-56 mb-6 flex items-center justify-center bg-slate-50/50 rounded-[2rem] overflow-hidden border border-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="max-h-[160px] w-auto object-contain transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-3"
                    loading="lazy"
                  />
                  
                  {/* Glass Discount Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-orange-500/90 backdrop-blur-md text-white text-[10px] font-black px-1 py-0.5 rounded-xl shadow-lg border border-white/20">
                      {item.discount}% OFF
                    </span>
                  </div>
                </div>

                <div className="px-3 pb-3 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[7px] font-black text-orange-500 uppercase tracking-widest whitespace-nowrap">
                        Premium Collection
                      </span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    <h3 className="text-slate-900 font-black text-lg truncate tracking-tighter" title={item.name}>
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-slate-400 line-through font-bold leading-none">
                        ₹{item.price}
                      </span>
                      <span className="text-[16px] font-black text-slate-900 tracking-tighter leading-tight truncate">
                        ₹{discountedPrice}
                      </span>
                    </div>

                  {/* Heart Button Overlay */}
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      likedItems[item.id] 
                        ? 'text-red-500' 
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <i className={`fa-heart ${likedItems[item.id] ? 'fa-solid' : 'fa-regular'}`}></i>
                  </button>

                    <button
                      onClick={() => addToCart(item)}
                      className="flex-shrink-0 bg-slate-900 text-white w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 active:scale-90"
                      aria-label="Add to cart"
                    >
                      <i className="fa-solid fa-plus text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* AI Match Glow (Optional Bottom Accent) */}
                {item.matchScore && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-orange-500 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </div>
            </div>
          );
        })}
      </Slider>

      <style jsx="true">{`
        .slick-list {
          overflow: visible !important; /* Essential: prevents hover effect from being cut off */
        }
        .slick-track {
          display: flex !important;
          align-items: center;
        }
        /* Hide default arrows */
        .slick-prev:before, .slick-next:before {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FlashCard;