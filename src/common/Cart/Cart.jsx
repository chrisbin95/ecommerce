import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Cart = ({ cartItems, addToCart, decreaseQty, removeFromCart }) => {
  const totalPriceBeforeDiscount = cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  const totalDiscount = cartItems.reduce((total, item) => total + (item.price * item.discount / 100) * item.qty, 0);
  const totalPriceAfterDiscount = totalPriceBeforeDiscount - totalDiscount;

  const roundedTotalPriceBeforeDiscount = Math.round(totalPriceBeforeDiscount);
  const roundedTotalDiscount = Math.round(totalDiscount);
  const roundedTotalPriceAfterDiscount = Math.round(totalPriceAfterDiscount);

  // Free shipping logic for UI "nudge"
  const freeShippingLimit = 1000;
  const progressToFreeShipping = Math.min((totalPriceAfterDiscount / freeShippingLimit) * 100, 100);

  return (
    <section className="bg-[#f8f9fa] min-h-screen py-10 md:py-16" id="cart">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header with Progress Nudge */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 flex items-center tracking-tighter">
            <i className="fa-solid fa-bag-shopping text-orange-500 mr-4"></i> 
            My Shopping Bag
            <span className="ml-4 text-sm font-bold bg-slate-900 text-white px-3 py-1 rounded-full">{cartItems.length}</span>
          </h2>
          {cartItems.length > 0 && (
            <div className="mt-4 max-w-md">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                {progressToFreeShipping < 100 
                  ? `Add ₹${freeShippingLimit - roundedTotalPriceAfterDiscount} more for FREE shipping` 
                  : "🎉 Your order qualifies for FREE shipping!"}
              </p>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all duration-700" 
                  style={{ width: `${progressToFreeShipping}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT SIDE: CARDS */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white p-20 rounded-[2.5rem] shadow-xl shadow-slate-200/50 text-center border border-slate-50">
                <div className="w-24 h-24 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  <i className="fa-solid fa-cart-plus"></i>
                </div>
                <h1 className="text-2xl font-black text-slate-800">Your bag is empty!</h1>
                <p className="text-slate-400 mt-2 mb-8 font-medium">Time to fill it with something amazing.</p>
                <Link to="/">
                  <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg active:scale-95">
                    Explore Shop
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1"
                  >
                    {/* Image Area */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[1.5rem] p-4 flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                      {item.discount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                          -{item.discount}%
                        </span>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-orange-600 transition-colors">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU: {item.id.slice(0, 8)}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">In Stock</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all active:scale-75"
                        >
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1">
                           <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{item.price}</span>
                             <span className="text-sm font-bold text-slate-300">/ unit</span>
                           </div>
                           <p className="text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md">
                             Saved ₹{Math.round((item.price * item.discount / 100) * item.qty)}
                           </p>
                        </div>

                        {/* Responsive Quantity UI */}
                        <div className="flex items-center bg-slate-900 rounded-[1.25rem] p-1 shadow-lg shadow-slate-200 w-full sm:w-fit justify-between sm:justify-start">
                          {/* Decrease Button */}
                          <button 
                            onClick={() => decreaseQty(item)}
                            className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center text-white hover:text-orange-400 active:scale-90 transition-all"
                            aria-label="Decrease quantity"
                          >
                            <i className="fa-solid fa-minus text-xs"></i>
                          </button>

                          {/* Quantity Display */}
                          <span className="flex-1 sm:flex-none w-12 text-center text-white font-black text-lg sm:text-base tabular-nums">
                            {item.qty}
                          </span>

                          {/* Increase Button */}
                          <button 
                            onClick={() => addToCart(item)}
                            className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center text-white hover:text-orange-400 active:scale-90 transition-all"
                            aria-label="Increase quantity"
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: SUMMARY */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-50 sticky top-28">
              <h2 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="font-black text-slate-800">₹{roundedTotalPriceBeforeDiscount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">ZeeDiscount</span>
                  <span className="font-black text-emerald-500">-₹{roundedTotalDiscount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Shipping</span>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">FREE</span>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-dashed border-slate-100 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Total Amount</span>
                  <div className="text-right">
                    <p className="text-xs text-slate-300 line-through font-bold">₹{roundedTotalPriceBeforeDiscount}</p>
                    <p className="text-2xl font-black text-orange-500 tracking-tighter">₹{roundedTotalPriceAfterDiscount}</p>
                  </div>
                </div>
              </div>

              <button className="group w-full bg-slate-900 hover:bg-orange-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3">
                Secure Checkout
                <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
              </button>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-4 gap-4 grayscale opacity-40">
                <i className="fa-brands fa-cc-visa text-2xl mx-auto"></i>
                <i className="fa-brands fa-cc-mastercard text-2xl mx-auto"></i>
                <i className="fa-brands fa-cc-apple-pay text-2xl mx-auto"></i>
                <i className="fa-brands fa-cc-amazon-pay text-2xl mx-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
    discount: PropTypes.number,
    rating: PropTypes.number
  })).isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseQty: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default Cart;