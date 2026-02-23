import React, { useEffect, useState, useRef } from "react";
import FlashCard from "./FlashCard";
import { db, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import * as tf from '@tensorflow/tfjs';

const FlashDeals = ({ addToCart }) => {
  const [productItems, setProductItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [aiState, setAiState] = useState({ affinity: {}, price: 0 });

  // The Brain with Memory Decay
  const userProfile = useRef({
    affinity: { Shoes: 0, Watches: 0, Clothes: 0, Electronics: 0 },
    preferredPrice: 0,
    clickHistory: []
  });

  // --- Fetch Logic (Optimized) ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsSnapshot = await getDocs(collection(db, "products"));
        let allProducts = [];
        const categories = ["Shoes", "Watches", "Clothes", "Electronics"];

        for (const productDoc of productsSnapshot.docs) {
          for (const cat of categories) {
            const subSnap = await getDocs(collection(db, `products/${productDoc.id}/${cat}`));
            const list = await Promise.all(subSnap.docs.map(async (pDoc) => {
              const data = pDoc.data();
              const imageUrl = await getDownloadURL(ref(storage, `products/${cat}/${data.imageName}`)).catch(() => "/images/placeholder.png");
              return { 
                id: pDoc.id, ...data, imageUrl, category: cat, 
                price: parseFloat(data.price), 
                rating: parseFloat(data.rating || 0) 
              };
            }));
            allProducts = [...allProducts, ...list];
          }
        }
        const highestPrice = Math.max(...allProducts.map(p => p.price), 1000);
        setMaxPrice(highestPrice);
        setProductItems(allProducts.sort(() => Math.random() - 0.5));
      } finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  // --- ADVANCED TENSOR RE-RANKING ---
  const reRankInventory = (clickedProduct) => {
    const p = userProfile.current;
    // 1. Apply Temporal Decay (Old interests fade by 20%)
    Object.keys(p.affinity).forEach(key => p.affinity[key] *= 0.8);
    // 2. Strengthen Current Interest (Add weight based on rating quality)
    const signalStrength = (clickedProduct.rating / 5) + 0.5; 
    p.affinity[clickedProduct.category] += signalStrength;
    // 3. Update Moving Average Price
    p.clickHistory.push(clickedProduct.price);
    if(p.clickHistory.length > 5) p.clickHistory.shift();
    p.preferredPrice = p.clickHistory.reduce((a, b) => a + b, 0) / p.clickHistory.length;
    console.group("%c ⚡ AI Neural Re-Link ", "background: #0ea5e9; color: white; padding: 2px 4px; border-radius: 4px;");
    console.log("Decayed Affinity Map:", p.affinity);
    console.log("Budget Target:", p.preferredPrice.toFixed(0));
    console.groupEnd();
    // 4. Tensor Vector Computation
    const ranked = tf.tidy(() => {
      const cats = ["Shoes", "Watches", "Clothes", "Electronics"];
      // USER VECTOR: [CatWeights..., PriceNorm, RatingPref]
      const userVector = tf.tensor1d([
        p.affinity.Shoes, p.affinity.Watches, p.affinity.Clothes, p.affinity.Electronics,
        p.preferredPrice / maxPrice,
        1.0
      ]);
      const scored = productItems
        .filter(item => item.id !== clickedProduct.id)
        .map(item => {
          const itemVector = tf.tensor1d([
            item.category === "Shoes" ? 1 : 0,
            item.category === "Watches" ? 1 : 0,
            item.category === "Clothes" ? 1 : 0,
            item.category === "Electronics" ? 1 : 0,
            item.price / maxPrice,
            item.rating / 5
          ]);
          // Weighted Dot Product
          const similarity = userVector.dot(itemVector).arraySync();
          // Convert to percentage
          const matchPercent = Math.min(Math.round(similarity * 35), 99); 
          return { ...item, matchScore: matchPercent };
        });

      return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
    });
    setAiState({ 
      affinity: { ...p.affinity }, 
      price: p.preferredPrice 
    });
    setRecommendations(ranked);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    reRankInventory(product);
  };

  return (
    <section className="flash-deals bg-slate-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header - Modern Glassmorphism */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center rounded-[2rem] shadow-2xl shadow-orange-200">
              <i className="fa fa-bolt text-white text-2xl animate-pulse"></i>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Flash Market</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">AI-Driven Live Inventory</p>
            </div>
          </div>
        </div>
        {loading ? (
           <div className="flex gap-6 overflow-hidden">
             {[1, 2, 3, 4].map(i => <div key={i} className="min-w-[280px] h-[400px] bg-white animate-pulse rounded-[3rem]" />)}
           </div>
        ) : (
          <FlashCard productItems={productItems} addToCart={handleAddToCart} />
        )}

      {/* AI Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mt-16 md:mt-24 relative px-2 md:px-0">
          <div className="hidden md:block absolute inset-0 bg-slate-900 rounded-[3rem] md:rounded-[4rem] -rotate-1 scale-[1.02] shadow-3xl" />
          <div className="relative bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-4 md:p-12 overflow-hidden border border-white/10 shadow-2xl">
            {/* Neural Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full animate-pulse" />
            <div className="flex flex-col p-2 lg:flex-row lg:items-center justify-between mb-6 md:mb-8 gap-2 relative z-10">
              <div className="flex flex-col items-center text-center space-y-2">
              {/* Status Badge Container */}
              <div className="flex items-center justify-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em]">
                  Neural ranking active
                </span>
              </div>
              {/* Main Title */}
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                Predicted <span className="text-orange-500 italic">for You</span>
              </h2>
            </div>
              {/* Profile Focus Pill - Centered for both Mobile & Desktop */}
                <div className="mx-auto mt-6 inline-flex items-center gap-4 px-5 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                  <div className="hidden sm:block border-r border-white/10 pr-4 mr-2">
                    <span className="text-[9px] text-slate-400 block uppercase font-black tracking-tighter">Live Weights</span>
                  </div>
                  <div className="flex gap-6">
                    {Object.entries(aiState.affinity)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 2)
                      .map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-1">
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-white text-[10px] font-bold uppercase tracking-tight">{k}</span>
                            <span className="text-orange-500 text-[10px] font-semibold font-mono">{(v).toFixed(1)}</span>
                          </div>
                          <div className="w-20 md:w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(249,115,22,0.6)]" 
                              style={{ width: `${Math.min(v * 25, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
              </div>
            </div>

            <div className="relative z-10 -mx-4 md:mx-0">
              <FlashCard productItems={recommendations} addToCart={addToCart} />
            </div>

            {/* Console Training Indicator with Real-Time Data */}
            <div className="mt-4 pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <span className="text-emerald-500/50">SYSTEM_LOG:</span>
                <p className="text-slate-400 italic animate-pulse">
                  &gt; decay_applied: 0.8 | target_price: ₹{aiState.price.toFixed(0)} | tensors_active: true
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Processing Data</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-1 w-1 rounded-full bg-emerald-500/40 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default FlashDeals;