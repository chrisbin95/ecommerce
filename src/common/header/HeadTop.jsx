import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from '../../components/login/Login.js';

const HeadTop = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <section className="bg-slate-900 text-slate-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center py-2.5 px-4 lg:px-12">
          
          {/* LEFT: Contact Info (Hidden on very small screens to prevent clutter) */}
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+1234567890" className="flex items-center hover:text-orange-500 transition-colors group">
              <i className="fa-solid fa-phone mr-2 text-[10px] text-orange-500 group-hover:scale-110 transition-transform"></i>
              <span>+1 234 567 890</span>
            </a>
            <a href="mailto:zeecart@gmail.com" className="flex items-center hover:text-orange-500 transition-colors group">
              <i className="fa-solid fa-envelope mr-2 text-[10px] text-orange-500 group-hover:scale-110 transition-transform"></i>
              <span>zeecart@gmail.com</span>
            </a>
          </div>

          {/* RIGHT: Utility Links */}
          <div className="flex items-center justify-between w-full md:w-auto gap-6">
            {/* Internationalization Nudge (New!) */}
            <div className="flex items-center gap-4 border-r border-slate-700 pr-6 mr-2">
              <span className="cursor-pointer hover:text-white transition">IND / ₹</span>
              <span className="cursor-pointer hover:text-white transition">English</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="cursor-pointer hover:text-white transition">FAQ</span>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 text-white bg-orange-500/10 hover:bg-orange-900 hover:text-white px-3 py-1 rounded-sm transition-all border border-orange-500/20"
              >
                <i className="fa-solid fa-circle-user text-orange-500 group-hover:text-white"></i>
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PREMIUM MODAL --- */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setIsLoginModalOpen(false)}
        ariaHideApp={false}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] outline-none overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        overlayClassName="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
      >
        {/* Modal Decorative Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Welcome Back</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">ZeeCart Online Shopping</p>
            </div>
            <button 
              onClick={() => setIsLoginModalOpen(false)} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          
          <div className="mt-4">
            <Login onSuccessfulLogin={() => setIsLoginModalOpen(false)} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HeadTop;