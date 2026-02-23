import React, { useEffect, useState } from "react";
import { firestore, storage } from "../../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Arrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products");
        const productsSnapshot = await getDocs(productsCollection);
        let allProducts = [];
        const subNames = ["Shoes", "Watches", "Clothes", "Electronics"];

        for (const productDoc of productsSnapshot.docs) {
          for (const subName of subNames) {
            const subRef = collection(firestore, `products/${productDoc.id}/${subName}`);
            const productSnap = await getDocs(subRef);
            const list = await Promise.all(productSnap.docs.map(async (doc) => {
              const data = doc.data();
              const imageRef = ref(storage, `products/${subName}/${data.imageName}`);
              try {
                const imageUrl = await getDownloadURL(imageRef);
                return { id: doc.id, ...data, imageUrl, category: subName };
              } catch {
                return { id: doc.id, ...data, imageUrl: "", category: subName };
              }
            }));
            allProducts = [...allProducts, ...list];
          }
        }
        setProducts(shuffleArray(allProducts).slice(0, 10));
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
      {[1,2,3,4,5].map(i => (
        <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2.5rem]" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((val) => (
        <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-3 relative transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2" key={val.id}>
          {/* Image Container with Soft Glow */}
          <div className="relative h-44 md:h-52 mb-4 bg-slate-50/50 rounded-[2rem] flex items-center justify-center overflow-hidden">
            <img 
              src={val.imageUrl} 
              alt={val.name} 
              className="max-h-[75%] w-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" 
            />
            {/* Orange Glass Discount Badge */}
            <div className="absolute top-3 left-3">
              <div className="backdrop-blur-md bg-orange-500/90 text-white text-[9px] font-black px-2.5 py-1.5 rounded-xl shadow-lg border border-white/20">
                {Math.round(val.discount)}% OFF
              </div>
            </div>
          </div>
          {/* Text Content */}
          <div className="px-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">{val.category}</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <h4 className="text-slate-900 font-extrabold text-sm md:text-base leading-tight truncate">
              {val.name}
            </h4>
            <div className="mt-3 flex items-center justify-between">
               <span className="text-xs font-bold text-slate-400">Limited Stock</span>
               <button className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <i className="fa-solid fa-plus text-[10px]"></i>
               </button>
            </div>
          </div>
          {/* Decorative Corner */}
          <div className="absolute -top-1 -right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-50 pointer-events-none">
             <i className="fa-solid fa-bolt text-orange-500 text-xs"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Arrival;