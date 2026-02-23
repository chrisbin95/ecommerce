import React, { useState, useEffect } from "react"; // Added hooks
import { useParams, useLocation } from "react-router-dom"; 
import Home from "../components/mainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import TopCategory from "../components/top/TopCate";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Discount from "../components/discount/Discount";
import Shop from "../components/shops/Shop";
import Announcement from "../components/announcement/Announcement";
import OpenAIChat from "../components/openaiChat/openaiChat";
import Wrapper from "../components/wrapper/Wrapper";
import UserDashboard from "./UserDash";

// Import Loader component
import Loader from "../components/loader/Loader"; 
import Offers from "./Offers"; 
import TrackOrder from "./TrackOrder";
import Contact from "./Contact";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  const { categoryName } = useParams();
  const location = useLocation();
  
  // State for page-level transition loader
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Trigger loader on route or category change
  useEffect(() => {
    setIsPageLoading(true);
    // Short delay to allow smooth rendering of new content
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname, categoryName]);

  // If page is transitioning, show the loader
  if (isPageLoading) {
    return <Loader />;
  }

  // 1. LOGIC FOR THE NEW STYLISH PAGES
  if (location.pathname === "/offers") return <Offers />;
  if (location.pathname === "/track-order") return <TrackOrder />;
  if (location.pathname === "/contact") return <Contact />;
  if (location.pathname === "/user") return <UserDashboard />;

  // 2. LOGIC FOR CATEGORY FILTERING
  if (categoryName) {
    const filteredItems = shopItems.filter(
      (item) => item.category?.toLowerCase() === categoryName.toLowerCase()
    );

    return (
      <div className="bg-slate-50 pb-20 pt-10 animate-in fade-in duration-700">
        <div className="container mx-auto px-4 lg:px-12">
          <h2 className="text-4xl font-black mb-10 tracking-tighter text-slate-900 border-l-8 border-orange-500 pl-6">
            {categoryName} <span className="text-orange-500">Collection</span>
          </h2>
          {filteredItems.length > 0 ? (
            <Shop shopItems={filteredItems} addToCart={addToCart} />
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] shadow-xl border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-magnifying-glass text-3xl text-slate-200"></i>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No products found here.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. DEFAULT HOMEPAGE VIEW
  return (
    <div className="animate-in fade-in duration-700">
      <Home CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCategory />
      <NewArrivals />
      <Discount />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Announcement />
      <OpenAIChat />
      <Wrapper />
    </div>
  );
};

export default Pages;