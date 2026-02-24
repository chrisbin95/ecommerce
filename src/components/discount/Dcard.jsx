import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const Dcard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(collection(firestore, "products"));
        let allProducts = [];
        const subNames = ["Shoes", "Watches", "Clothes", "Electronics"];

        for (const productDoc of productsSnapshot.docs) {
          for (const subName of subNames) {
            const subRef = collection(firestore, `products/${productDoc.id}/${subName}`);
            const productSnap = await getDocs(subRef);
            const list = await Promise.all(productSnap.docs.map(async (doc) => {
              const data = doc.data();
              try {
                const url = await getDownloadURL(ref(storage, `products/${subName}/${data.imageName}`));
                return { id: doc.id, ...data, imageUrl: url };
              } catch { return { id: doc.id, ...data, imageUrl: "" }; }
            }));
            allProducts = [...allProducts, ...list];
          }
        }
        setProducts(allProducts.filter(p => p.discount > 10));
      } catch (err) { setError("Failed to load products."); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  if (loading) return <div className="h-40 flex items-center justify-center font-mono text-xs text-orange-400">SYNCING DEALS...</div>;

  return (
    <div className="relative -mx-4 py-10 overflow-hidden">
      {/* Subtle Orange Rays / Light Beams */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[200px] bg-orange-400/20 blur-[120px] rotate-45 pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[150px] bg-orange-300/10 blur-[100px] -rotate-12 pointer-events-none"></div>
      <Slider {...settings}>
        {products.map((product, index) => {
          const discountedPrice = (product.price - (product.price * product.discount / 100)).toFixed(0);

          return (
            <div className="px-3" key={index}>
              {/* Glassmorphic Card */}
              <div className="group relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 p-4 transition-all duration-500 hover:bg-white/60 hover:border-orange-200/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] hover:-translate-y-2">
                {/* Image Container with Inner Glass effect */}
                <div className="relative h-32 md:h-40 mb-4 bg-white/30 rounded-3xl flex items-center justify-center overflow-hidden border border-white/20">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="max-h-[80%] w-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:drop-shadow-2xl" 
                  />
                  {/* Floating Discount Badge - Neon Glass */}
                  <div className="absolute top-2 right-2">
                    <span className="bg-orange-500/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg border border-white/20">
                      {product.discount}%
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="space-y-1 relative z-10">
                  <h4 className="text-slate-800 font-extrabold text-xs md:text-sm truncate tracking-tight">
                    {product.name}
                  </h4>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500/80 font-medium line-through">₹{product.price}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base font-black text-orange-600">
                        ₹{discountedPrice}
                      </span>
                      {/* Plus Button - Glassy Dark */}
                      <button className="w-8 h-8 rounded-xl bg-slate-900/90 text-white backdrop-blur-md flex items-center justify-center hover:bg-orange-500 hover:scale-110 transition-all shadow-lg shadow-slate-900/20">
                        <i className="fa-solid fa-plus text-[10px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Subtle Ray Refraction Accent */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-orange-400/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          );
        })}
      </Slider>
      <style jsx="true">{`
        .slick-track { display: flex !important; align-items: center; }
        .slick-slide { height: inherit !important; }
      `}</style>
    </div>
  );
};

export default Dcard;