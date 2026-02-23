import React from "react";
import Dcard from "./Dcard";

const Discount = () => {
  return (
    /* Changed background to a subtle dark gradient to let the glass cards shine */
    <section className="Discount relative bg-[#0f172a] py-12 md:py-16 px-4 overflow-hidden">
      {/* Background Decorative Amorphic Rays (The "Subtle Orange Rays") */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-5">
            {/* Icon box now has a glass look to match cards */}
            <div className="w-14 h-14 bg-white/5 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
              <img 
                src="https://img.icons8.com/windows/32/f97316/gift.png" 
                className="w-7 h-7 brightness-110" 
                alt="Gift" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">Live Offers</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                Big <span className="text-orange-500 italic">Discounts</span>
              </h2>
            </div>
          </div>
          <button className="flex items-center gap-3 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-all group self-start md:self-center">
            <span className="border-b border-slate-700 group-hover:border-orange-500 pb-1 transition-colors">Check All Deals</span>
            <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110">
               <i className="fa-solid fa-arrow-right-long"></i>
            </div>
          </button>
        </div>
        {/* The Dcard component now sits on top of this amorphic background */}
        <Dcard />
      </div>
    </section>
  );
};

export default Discount;