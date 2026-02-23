import React from "react";

const Offers = () => {
  const deals = [
    { id: 1, title: "First Order", discount: "20% OFF", code: "ZEE20", color: "bg-orange-500", desc: "Valid on all electronic items" },
    { id: 2, title: "Summer Sale", discount: "50% OFF", code: "SUMMER50", color: "bg-slate-900", desc: "Minimum purchase of ₹2000" },
    { id: 3, title: "Bank Offer", discount: "₹500 Cashback", code: "VISADEAL", color: "bg-emerald-600", desc: "Using Visa Credit Cards" },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Exclusive <span className="text-orange-500">Deals</span></h1>
        <p className="text-slate-500 font-bold mb-12 uppercase text-xs tracking-[0.2em]">Active Coupons for Feb 2026</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="group relative bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 overflow-hidden border border-slate-50">
              <div className={`absolute top-0 right-0 w-32 h-32 ${deal.color} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150`}></div>
              
              <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-black text-white mb-4 ${deal.color}`}>ACTIVE</span>
              <h2 className="text-4xl font-black text-slate-900 mb-2">{deal.discount}</h2>
              <h3 className="text-lg font-bold text-slate-800 mb-4">{deal.title}</h3>
              <p className="text-sm text-slate-400 mb-8 font-medium">{deal.desc}</p>
              
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200">
                <span className="font-mono font-black text-slate-700">{deal.code}</span>
                <button className="text-orange-600 font-black text-xs uppercase tracking-widest hover:text-orange-700">Copy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;