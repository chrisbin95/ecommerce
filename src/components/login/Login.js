// src/components/login/Login.js
import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithPopup,
  setPersistence,
  browserLocalPersistence 
} from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure your firebase.js exports 'auth'

const Login = ({ onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Helper to handle error messaging
  const handleError = (error) => {
    let friendlyMessage = error.message;
    if (error.code === 'auth/user-not-found') friendlyMessage = "No user found with this email.";
    if (error.code === 'auth/wrong-password') friendlyMessage = "Incorrect password.";
    setMessage({ type: 'error', text: friendlyMessage });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Ensure persistence so user stays logged in after refresh
      await setPersistence(auth, browserLocalPersistence);
      
      // 2. Standard Email/Pass sign in
      await signInWithEmailAndPassword(auth, email, password);
      
      if (onSuccessfulLogin) onSuccessfulLogin();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      if (onSuccessfulLogin) onSuccessfulLogin();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email first.' });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ type: 'success', text: 'Reset link sent! Check your inbox.' });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white p-4">
      <div className="max-w-md w-full space-y-6 mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h1>
        
        {message.text && (
          <div className={`p-3 rounded text-sm animate-pulse ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-md'
            }`}
          >
            {loading ? 'Processing...' : 'Login with Email'}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <span className="absolute bg-white px-2 text-gray-400 text-sm">OR</span>
          <div className="w-full border-t border-gray-200"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="text-center space-y-2">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-orange-600 hover:text-orange-800 hover:underline transition font-medium"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;