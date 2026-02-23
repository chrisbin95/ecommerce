import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../../components/assets/images/logo-white.png";

const Footer = () => {
  return (
    <footer className="relative bg-[#0b1120] text-slate-300 pt-20 overflow-hidden">
      {/* --- DESIGN ACCENT: Abstract Glow --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* TOP SECTION: Newsletter Nudge */}
        <div className="flex flex-col lg:flex-row items-center justify-between pb-16 border-b border-slate-800/50 gap-8">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-3xl font-black text-white tracking-tighter">Stay in the <span className="text-orange-500">Loop.</span></h2>
            <p className="text-slate-400 mt-2 font-medium">Subscribe to get secret coupons and early access to drops.</p>
          </div>
          <div className="flex w-full lg:w-auto bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/50 backdrop-blur-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border-none outline-none px-4 py-2 text-white flex-1 min-w-[200px]"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-500/20">
              Join
            </button>
          </div>
        </div>

        {/* MAIN LINKS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-16">
          
          {/* Brand Box */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logoWhite} alt="Logo" className="w-10 brightness-110" />
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Zee<span className="text-orange-500">Cart</span></h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Revolutionizing the way you shop. Premium products, lightning-fast delivery, and an experience built around you.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"><i className="fab fa-snapchat"></i></a>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Company</h3>
            <ul className="space-y-4 text-sm font-bold">
              {['Careers', 'Our Stores', 'Sustainability', 'Terms', 'Privacy'].map(item => (
                <li key={item}>
                  <Link to="/" className="hover:text-orange-500 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-orange-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Support</h3>
            <ul className="space-y-4 text-sm font-bold">
              {['Help Center', 'Track Order', 'Returns', 'Bulk Purchasing'].map(item => (
                <li key={item}>
                  <Link to="/" className="hover:text-orange-500 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download Box */}
          <div className="bg-slate-800/30 p-6 rounded-[2rem] border border-slate-700/30">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Mobile App</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 bg-white text-black p-3 rounded-xl hover:scale-105 transition-transform">
                <i className="fab fa-google-play text-xl"></i>
                <div className="text-left">
                  <p className="text-[10px] font-bold opacity-60 leading-none">GET IT ON</p>
                  <p className="text-xs font-black">Google Play</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 bg-slate-900 text-white p-3 rounded-xl border border-slate-700 hover:scale-105 transition-transform">
                <i className="fab fa-app-store text-xl"></i>
                <div className="text-left">
                  <p className="text-[10px] font-bold opacity-60 leading-none">DOWNLOAD ON THE</p>
                  <p className="text-xs font-black">App Store</p>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT AREA */}
        <div className="py-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            &copy; 2026 <span className="text-slate-300">ZeeCart Pvt. Lmt</span>.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
             <a href="#" className="hover:text-white">Security</a>
             <a href="#" className="hover:text-white">Sitemap</a>
             <a href="#" className="hover:text-white">English (US)</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;