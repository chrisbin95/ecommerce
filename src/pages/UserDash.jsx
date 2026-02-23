import React from "react";

const UserDashboard = () => {
  // Mock data to match your shop's aesthetic
  const user = {
    name: "Ninja User",
    email: "ninja@zeecart.io",
    rank: "Platinum Member",
    orders: [
      { id: "ZC-9921", date: "Feb 12, 2026", status: "Delivered", total: "₹4,999" },
      { id: "ZC-1004", date: "Feb 22, 2026", status: "Processing", total: "₹1,250" },
    ]
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden mb-8">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]"></div>
          
          <div className="relative group">
            <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center text-4xl shadow-xl shadow-orange-500/20 border-4 border-slate-800">
              <i className="fa-solid fa-user-ninja"></i>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center text-[10px]">
               <i className="fa-solid fa-check"></i>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter mb-1">{user.name}</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">{user.rank}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="bg-white/10 hover:bg-orange-500 transition-all px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Edit Profile</button>
              <button className="bg-white/10 hover:bg-red-500 transition-all px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Logout</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Wallet Balance</h3>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">₹12,450.00</p>
              <button className="w-full mt-6 bg-slate-50 hover:bg-slate-100 text-slate-900 font-black py-4 rounded-2xl transition-all">Add Funds</button>
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Saved Addresses</h3>
              <div className="flex items-center gap-4 text-slate-600">
                <i className="fa-solid fa-house-chimney text-orange-500"></i>
                <p className="text-sm font-bold leading-tight">123 Ninja Street, Cyber City, IND</p>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tighter">Recent Orders</h3>
              <button className="text-orange-500 font-black text-[10px] uppercase tracking-widest">View All</button>
            </div>

            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.id} className="group flex items-center justify-between p-6 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors shadow-sm">
                      <i className="fa-solid fa-box-open"></i>
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{order.id}</p>
                      <p className="text-[10px] font-bold text-slate-400">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">{order.total}</p>
                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;