import React from "react";
import Catg from "./Catg"; 
import ShopCart from "./ShopCart"; 

const Shop = ({ addToCart }) => {
  return (
    <section className="shop bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Categories Sidebar - Sticky on Desktop */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 self-start mt-10">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Categories</h3>
                <Catg />
             </div>
          </aside>

          {/* Products Main Section */}
          <main className="w-full lg:w-3/4 pt-10">
            <header className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                  <span className="px-4 py-2 bg-orange-500 rounded-2xl shadow-lg shadow-orange-200">
                    <i className="fa fa-shopping-bag text-white text-2xl p-2"></i>
                  </span>
                  Explore ZeeCart
                </h2>
                <p className="text-slate-400 text-sm mt-2 ml-1">Handpicked premium products just for you.</p>
              </div>
              
              <button className="group flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                View all items
                <i className="fa-solid fa-arrow-right-long transition-transform group-hover:translate-x-1"></i>
              </button>
            </header>

            {/* Products Component */}
            <ShopCart addToCart={addToCart} />
          </main>
        </div>
      </div>
    </section>
  );
};

export default Shop;