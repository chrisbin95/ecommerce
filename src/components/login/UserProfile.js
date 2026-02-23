// src/components/profile/UserProfile.js
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase'; 
import { 
  onAuthStateChanged, 
  signOut, 
  updateProfile, 
  sendEmailVerification 
} from 'firebase/auth';

const UserProfile = ({ setIsLoginModalOpen = () => {} }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      await updateProfile(auth.currentUser, { displayName });
      setMessage({ type: 'success', text: 'ZeeCart profile updated!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage({ type: 'success', text: 'Verification email sent!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-10 space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-600"></div>
        <p className="text-gray-400 text-sm animate-pulse">Loading ZeeCart Profile...</p>
      </div>
    );
  }

  // LOGGED OUT VIEW (Fits inside modal)
  if (!user) {
    return (
      <div className="p-2 text-center">
        <div className="mb-4 flex justify-center">
           <div className="bg-orange-100 p-4 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             </svg>
           </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Join ZeeCart Today</h2>
        <p className="text-gray-500 mb-6 text-xs px-4">Sign in to track orders and manage your account.</p>
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition"
        >
          Login / Create Account
        </button>
      </div>
    );
  }

  // LOGGED IN VIEW (Modal Optimized)
  return (
    <div className="flex flex-col space-y-6">
      
      {/* Profile Header Section */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="relative flex-shrink-0">
          {user.photoURL ? (
            <img src={user.photoURL} alt="User" className="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-sm" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl text-white font-bold shadow-md">
              {user.displayName ? user.displayName.charAt(0) : user.email.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="overflow-hidden">
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="flex flex-col space-y-1">
              <input 
                autoFocus
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)}
                className="border-b-2 border-orange-500 bg-transparent outline-none text-sm font-bold text-gray-800 w-full"
              />
              <div className="flex space-x-2">
                <button type="submit" className="text-[10px] text-green-600 font-bold uppercase">Save</button>
                <button onClick={() => setIsEditing(false)} className="text-[10px] text-gray-400 font-bold uppercase">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-lg font-extrabold text-gray-800 truncate leading-tight">{user.displayName || 'ZeeCart Customer'}</h2>
              <button onClick={() => setIsEditing(true)} className="text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-tighter">Edit Profile</button>
            </>
          )}
          <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
        </div>
      </div>

      {/* Quick Status / Verification */}
      {message.text && (
        <div className={`p-3 rounded-lg text-xs font-bold ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Account Links Grid */}
      <div className="grid grid-cols-2 gap-2">
         <button className="flex flex-col items-center justify-center p-3 bg-white border border-gray-100 rounded-2xl hover:bg-orange-50 transition group">
           <span className="text-xl mb-1 group-hover:scale-110 transition">📦</span>
           <span className="text-[10px] font-bold text-gray-600">Orders</span>
         </button>
         <button className="flex flex-col items-center justify-center p-3 bg-white border border-gray-100 rounded-2xl hover:bg-orange-50 transition group">
           <span className="text-xl mb-1 group-hover:scale-110 transition">❤️</span>
           <span className="text-[10px] font-bold text-gray-600">Wishlist</span>
         </button>
      </div>

      {/* Security Info */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold text-gray-700">Email Verification</p>
            <p className="text-[10px] text-gray-400">{user.emailVerified ? 'Verified' : 'Action Required'}</p>
          </div>
          {!user.emailVerified && (
            <button onClick={handleResendVerification} className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded-lg font-bold">Verify</button>
          )}
        </div>
        
        <div className="p-4 flex justify-between items-center bg-gray-50/50">
          <p className="text-[10px] font-bold text-gray-400">
            UID: <span className="font-mono">{user.uid.substring(0, 8)}...</span>
          </p>
          
          <button 
            onClick={handleLogout} 
            className="group flex items-center bg-red-500 text-white px-3 py-2 rounded-lg gap-1.5 text-[10px] font-black text-red-500 uppercase tracking-tight hover:bg-red-600 transition-colors"
          >
            <span>Sign Out</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer Pro Tip */}
      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-center">
        <p className="text-[10px] text-orange-700 leading-tight">
          Member since {new Date(user.metadata.creationTime).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;