import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] animate-pulse"></div>

      {/* Main Branding Logo/Text */}
      <div className="relative">
        <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
          ZEE<span className="text-orange-500">CART</span>
        </h1>
        
        {/* Modern Progress Line */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 w-1/2 animate-loader-slide"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] animate-pulse">
        Initializing Online Shopping
      </p>

      <style jsx>{`
        @keyframes loader-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loader-slide {
          animation: loader-slide 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loader;