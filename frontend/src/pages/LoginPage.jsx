import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore.js';
import { Button } from '../components/ui/Button.jsx';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate slight network delay for better UX feel
    setTimeout(() => {
      const result = login(userId, password);
      setIsLoading(false);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-xl shadow-brand-500/30 text-2xl font-bold mx-auto mb-6">
            LAW
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-600 dark:text-slate-400">Sign in to access your dashboard</p>
        </div>

        <div className="glass rounded-3xl p-8 border shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center border border-red-200 dark:border-red-800"
              >
                <AlertCircle size={16} className="mr-2 shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">User ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="User ID"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end text-sm">
              <a href="#" className="font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors">Forgot password?</a>
            </div>

            <Button type="submit" size="lg" className="w-full !h-12 mt-2" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} className="mr-2" /> Sign In
                </>
              )}
            </Button>
            
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-dark-700 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account? <a href="#" className="font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors">Contact Admin</a>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
