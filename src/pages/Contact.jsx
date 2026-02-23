import React from "react";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Accent */}
      <div className="h-[30vh] bg-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-orange-500/10 blur-3xl scale-150"></div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter relative z-10">Get in <span className="text-orange-500">Touch.</span></h1>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-10 relative z-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Info Cards (Reusing styles from Footer) */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: "fa-phone", label: "Call Us", val: "+1 234 567 890", color: "bg-orange-500" },
              { icon: "fa-envelope", label: "Email Us", val: "support@zeecart.com", color: "bg-slate-900" },
              { icon: "fa-location-dot", label: "Visit Us", val: "123 Main St, IND", color: "bg-slate-500" },
            ].map((box, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all">
                <div className={`w-12 h-12 ${box.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-slate-200`}>
                  <i className={`fa-solid ${box.icon}`}></i>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{box.label}</p>
                <p className="text-lg font-black text-slate-900 leading-none">{box.val}</p>
              </div>
            ))}
          </div>

          {/* Form (Reusing design logic from Login/Search) */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-300 border border-slate-50">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Name</label>
                <input type="text" className="w-full bg-slate-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-orange-500 transition-all font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Email</label>
                <input type="email" className="w-full bg-slate-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-orange-500 transition-all font-bold" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Message</label>
                <textarea rows="4" className="w-full bg-slate-50 rounded-[2rem] px-6 py-4 outline-none border-2 border-transparent focus:border-orange-500 transition-all font-bold resize-none"></textarea>
              </div>
              <button className="md:col-span-2 bg-orange-500 hover:bg-slate-900 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-orange-100">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;