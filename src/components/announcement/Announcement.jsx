import React from "react";

const Announcement = () => {
  const banners = [
    {
      id: 1,
      image: './images/banner-4.jpg',
      title: 'New Arrivals',
      subtitle: '2026 Collection',
      // Grid span logic: takes 4 columns on desktop
      gridClass: 'lg:col-span-4',
      color: 'from-orange-600/90'
    },
    {
      id: 2,
      image: './images/banner-3.jpg',
      title: 'Mega Summer Sale',
      subtitle: 'Up to 50% Off',
      // Grid span logic: takes 8 columns on desktop
      gridClass: 'lg:col-span-8',
      color: 'from-slate-900/90'
    }
  ];

  return (
    <section className='py-8 md:py-16 px-4 bg-slate-50' id="announcement">
      <div className='container mx-auto max-w-7xl'>
        {/* Using Grid instead of Flex for perfect gap calculation */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className={`relative overflow-hidden rounded-[2rem] md:rounded-[3rem] h-[350px] md:h-[450px] group transition-all duration-500 hover:shadow-2xl shadow-sm ${banner.gridClass} w-full`}
            >
              {/* Image with Parallax-like Zoom */}
              <img 
                src={banner.image} 
                className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110' 
                alt={banner.title} 
              />

              {/* Dynamic Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${banner.color} via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500`} />

              {/* Content Overlay */}
              <div className='absolute inset-0 p-6 md:p-12 flex flex-col justify-end'>
                <div className="overflow-hidden">
                  <span className='inline-block text-white/90 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                    {banner.subtitle}
                  </span>
                </div>
                
                <h2 className='text-white text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-none'>
                  {banner.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h2>
                
                {/* Modern Interactive Button */}
                <button className='w-fit bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-orange-500 hover:text-white shadow-xl'>
                  Shop Now
                </button>
              </div>

              {/* Mobile-only subtle border for depth */}
              <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border border-white/10 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Announcement;