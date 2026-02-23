import React from "react";

const Wrapper = () => {
  const data = [
    {
      icon: "fa-truck-fast",
      title: "Worldwide Delivery",
      decs: "Experience lightning-fast shipping across 100+ countries with real-time tracking.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: "fa-id-card",
      title: "Safe Payment",
      decs: "Your security is our priority. We use industry-leading 256-bit SSL encryption.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: "fa-shield-alt",
      title: "Shop With Confidence",
      decs: "Every purchase is protected by our 30-day money-back guarantee policy.",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: "fa-headset",
      title: "24/7 Support",
      decs: "Our dedicated support team is always online to assist with your queries.",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <section className="wrapper bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-orange-500 uppercase tracking-[0.3em] mb-3">Why ZeeCart?</h2>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">Premium Shopping Experience</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((val, index) => (
            <div 
              className="group relative p-8 rounded-[3rem] bg-white border border-slate-100 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-slate-200" 
              key={index}
            >
              {/* Decorative Background Blob (Appears on Hover) */}
              <div className={`absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] blur-2xl ${val.bgColor} scale-90`}></div>

              {/* Icon Container */}
              <div className={`w-16 h-16 ${val.bgColor} ${val.iconColor} rounded-2xl flex items-center justify-center text-2xl mb-8 transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 shadow-sm`}>
                <i className={`fa-solid ${val.icon}`}></i>
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  {val.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {val.decs}
                </p>
              </div>

              {/* Stylish Graphic Element (Floating Dot) */}
              <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-slate-100 group-hover:bg-orange-400 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wrapper;