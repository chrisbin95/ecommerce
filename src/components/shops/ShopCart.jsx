import { useEffect, useState } from "react";
import { firestore, storage } from "../../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Slider from "react-slick";

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const ShopCart = ({ addToCart }) => {
  const [shopItems, setShopItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [likedItems, setLikedItems] = useState({}); // Object mapping for better state management
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(firestore, "products");
        const productsSnapshot = await getDocs(productsCollection);
        let allProducts = [];
        const subCats = ["Shoes", "Watches", "Clothes", "Electronics"];

        // Map through main docs and fetch subcollections in parallel
        const fetchPromises = productsSnapshot.docs.flatMap((productDoc) =>
          subCats.map(async (sub) => {
            const subRef = collection(firestore, `products/${productDoc.id}/${sub}`);
            const snap = await getDocs(subRef);
            
            return Promise.all(snap.docs.map(async (doc) => {
              const data = doc.data();
              try {
                const imgRef = ref(storage, `products/${sub}/${data.imageName}`);
                const imageUrl = await getDownloadURL(imgRef);
                return { id: doc.id, ...data, category: sub, imageUrl };
              } catch {
                return { id: doc.id, ...data, category: sub, imageUrl: "" };
              }
            }));
          })
        );

        const results = await Promise.all(fetchPromises);
        const flattened = results.flat();
        const shuffled = shuffleArray(flattened);
        
        setShopItems(shuffled);
        setFilteredItems(shuffled);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const toggleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // 4 items on large screens
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-400 animate-pulse">Loading ZeeCart Collection...</div>;

  return (
    <div className="py-4">
      {/* Modern Category Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-6 no-scrollbar">
        {["All", "Shoes", "Watches", "Clothes", "Electronics"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCat(cat);
              setFilteredItems(cat === "All" ? shopItems : shopItems.filter(i => i.category === cat));
            }}
            className={`px-6 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap ${
              activeCat === cat 
              ? "bg-slate-900 text-white shadow-lg" 
              : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Slider {...sliderSettings} className="product-slider">
        {filteredItems.map((item) => {
          const discountedPrice = (item.price - (item.price * item.discount) / 100).toFixed(0);
          
          return (
            <div key={item.id} className="px-2">
              <div className="group bg-white rounded-[2rem] p-4 border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500">
                
                {/* Image Section */}
                <div className="relative aspect-square bg-slate-50 rounded-[1.5rem] overflow-hidden mb-4">
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                    {item.discount}% OFF
                  </div>
                  
                  {/* Glassmorphism Like Button */}
                  <button 
                    onClick={() => toggleLike(item.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-75 transition-transform"
                  >
                    <i className={`${likedItems[item.id] ? 'fa-solid text-red-500' : 'fa-regular text-slate-400'} fa-heart text-xs`}></i>
                  </button>

                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-slate-900 font-bold text-sm truncate" title={item.name}>{item.name}</h3>
                  </div>

                  {/* Pricing and Add Button */}
                  <div className="flex flex-row items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-slate-400 line-through font-bold leading-none">₹{item.price}</span>
                      <span className="text-lg font-black text-slate-900 tracking-tighter leading-tight truncate">₹{discountedPrice}</span>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="flex-shrink-0 bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-orange-500 hover:shadow-lg active:scale-90"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ShopCart;