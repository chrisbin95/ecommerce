import React from "react";
import Arrival from "./Arrival";

const NewArrivals = () => {
  return (
    <section className="NewArrivals bg-slate-50/50 py-4 px-4 lg:py-8 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                <i className="fa-solid fa-sparkles text-white text-xl"></i>
              </div>
              {/* Live indicator dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">
                New <span className="text-orange-500 italic">Arrivals</span>
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">Recently Added to Inventory</p>
            </div>
          </div>

          <button className="group flex items-center gap-3 text-slate-600 font-bold text-sm uppercase tracking-widest hover:text-orange-600 transition-all">
            View All Collection
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
          </button>
        </div>

        <Arrival />
      </div>
    </section>
  );
};

export default NewArrivals;