import React from "react";

const TrackOrder = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg shadow-orange-100">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Track Your Package</h1>
            <p className="text-slate-400 font-medium mt-2">Enter your Order ID to see real-time updates.</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Order ID (e.g., ZC-998273)" 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-6 py-4 outline-none font-bold text-slate-700 transition-all"
              />
            </div>
            <button className="w-full bg-slate-900 hover:bg-orange-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl transition-all active:scale-95">
              Track Order
            </button>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-50">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
              <span>Status: Processing</span>
              <span>Est. Delivery: 28 Feb</span>
            </div>
            {/* Reusing the Progress bar logic from your Header */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;