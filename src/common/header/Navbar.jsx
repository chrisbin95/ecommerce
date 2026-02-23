import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Categories from "./Categories";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
    setShowCategories(false);
    // Scroll to top on every route change for that "new page" feel
    window.scrollTo(0, 0);
  }, [location]);

  // Helper to match the URL paths defined in your Pages.jsx
  const getPath = (item) => {
    switch (item) {
      case 'Home': return '/';
      case 'Offers': return '/offers';
      case 'Track My Order': return '/track-order';
      case 'Contact': return '/contact';
      default: return '/';
    }
  };

  return (
    <nav className={`z-50 transition-all duration-500 border-b border-slate-100 ${
      isScrolled 
        ? 'fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-xl py-2' 
        : 'relative bg-white py-4'
    }`}>
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Left: Category Toggle */}
          <div className="flex items-center gap-6 relative">
            <button 
              onClick={() => setShowCategories(!showCategories)} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 font-black text-[11px] uppercase tracking-widest ${
                showCategories 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${showCategories ? 'fa-xmark' : 'fa-list-ul'} text-sm`}></i>
              <span className="hidden sm:block">Categories</span>
            </button>

            {showCategories && (
              <>
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[-1]" onClick={() => setShowCategories(false)}></div>
                <div className="absolute top-[130%] left-0 w-72 bg-white rounded-[2.5rem] shadow-2xl border border-slate-50 p-3 animate-in fade-in zoom-in-95 duration-300">
                   <div className="bg-slate-50 rounded-[1.8rem] p-2">
                      <Categories />
                   </div>
                </div>
              </>
            )}
          </div>

         {/* Center: Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {['Home', 'Offers', 'Track My Order', 'Contact'].map((item) => {
                const path = getPath(item);
                const isActive = item === 'Home' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(path);

                return (
                  <li key={item}>
                    <Link 
                      to={path} 
                      className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group py-2 ${
                        isActive ? 'text-orange-500' : 'text-slate-500 hover:text-orange-500'
                      }`}
                    >
                      {item}
                      
                      {/* Animated Underline */}
                      <span className={`absolute -bottom-1 left-0 h-1 bg-orange-500 rounded-full transition-all duration-500 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}></span>
                      
                      {/* Subtle Dot Indicator for Active (Optional "Wow" factor) */}
                      {isActive && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: User Action */}
          <div className="flex items-center gap-4">
             <Link to="/user" className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-slate-50 text-slate-900 hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                <i className="fa-solid fa-user-ninja text-sm"></i>
             </Link>
             
             <button 
                className="lg:hidden w-11 h-11 flex items-center justify-center bg-slate-900 text-white rounded-xl active:scale-90 transition-all"
                onClick={() => setMobileMenu(!mobileMenu)}
             >
                <i className={`fa-solid ${mobileMenu ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
             </button>
          </div>
        </div>
      </div>

      {/* Modern Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        mobileMenu ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl" />
        <div className="relative h-full flex flex-col p-8 pt-24">
          <button 
            onClick={() => setMobileMenu(false)}
            className="absolute top-6 right-8 w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-2xl"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>

          <nav className="flex-1">
            <ul className="space-y-6">
              {['Home', 'Offers', 'Track My Order', 'Contact'].map((item, idx) => (
                <li key={idx} className={`transition-all duration-500 ${mobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                  <Link 
                    to={getPath(item)} 
                    onClick={() => setMobileMenu(false)}
                    className="group flex items-center justify-between"
                  >
                    <span className="text-4xl font-black text-slate-900 hover:text-orange-500 transition-colors tracking-tighter">
                      {item}
                    </span>
                    <i className="fa-solid fa-arrow-right-long text-slate-200 group-hover:text-orange-500 transition-all"></i>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10 border-t border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Contact</p>
             <p className="text-xl font-bold text-slate-900">+1 234 567 890</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;