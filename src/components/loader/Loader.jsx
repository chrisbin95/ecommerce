import React from "react";
import logo from "../../components/assets/images/logo.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Logo / Branding */}
      <div className="relative flex flex-col items-center">
        {/* Brand Logo with scale + blur pulse */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 relative">
          <img
            src={logo}
            alt="ZeeCart Logo"
            className="w-full h-full object-contain animate-logo-pulse"
          />
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl animate-logo-pulse-scale"></div>
        </div>

        {/* Main Branding Text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-3 animate-pulse">
          ZEE<span className="text-orange-500">CART</span>
        </h1>

        {/* Progress Bar */}
        <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 w-1/3 animate-loader-slide"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">
          Initializing Online Shopping
        </p>
      </div>

      <style>{`
        @keyframes loader-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loader-slide {
          animation: loader-slide 1.5s infinite ease-in-out;
        }

        @keyframes logo-pulse {
          0%, 100% { filter: blur(0px); opacity: 0.9; }
          50% { filter: blur(6px); opacity: 0.7; }
        }
        .animate-logo-pulse {
          animation: logo-pulse 2s infinite ease-in-out;
        }

        @keyframes logo-pulse-scale {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        .animate-logo-pulse-scale {
          animation: logo-pulse-scale 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loader;