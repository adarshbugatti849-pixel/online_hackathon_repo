import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import OutputPage from './pages/OutputPage.jsx';
import Chatbot from './components/Chatbot.jsx';
import { Moon, Sun, Globe } from 'lucide-react';
import { useLangStore } from './store/langStore.js';
import { useAuthStore } from './store/authStore.js';
import { translations } from './utils/translations.js';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { language, setLanguage } = useLangStore();
  const { isAuthenticated, logout } = useAuthStore();
  const t = translations[language].nav;

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden flex flex-col font-sans selection:bg-brand-500/30">
        {/* Soft background gradient */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <header className="w-full px-6 py-4 flex justify-between items-center z-50">
          <Link to="/" className="flex flex-row items-center gap-3 hover:opacity-80 transition cursor-pointer">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/40 text-[0.9rem] font-bold">
                LAW
             </div>
             <span className="font-bold text-xl tracking-tight hidden sm:block">{t.brand}</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/dashboard" className="hidden sm:block text-sm font-medium hover:text-brand-500 transition">{t.dashboard}</Link>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-dark-700 glass cursor-pointer hover:bg-slate-200/50 dark:hover:bg-dark-700/50 transition">
              <Globe size={16} className="text-slate-500 dark:text-slate-400" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none text-slate-700 dark:text-slate-300 cursor-pointer appearance-none"
              >
                <option value="en" className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">EN</option>
                <option value="es" className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">ES</option>
                <option value="hi" className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">HI</option>
                <option value="ta" className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">TA</option>
                <option value="fr" className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">FR</option>
                <option value="de" className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">DE</option>
              </select>
            </div>
            
            {isAuthenticated && (
              <button 
                onClick={logout}
                className="hidden sm:block text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 px-4 py-1.5 rounded-full transition ml-2"
              >
                Logout
              </button>
            )}

            <button 
              onClick={toggleTheme} 
              className="p-2.5 rounded-full glass hover:bg-slate-200/50 dark:hover:bg-dark-700/50 transition border border-slate-200 dark:border-dark-700"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className="flex-1 relative z-10 flex flex-col container mx-auto px-4 max-w-7xl">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/output" element={
              <ProtectedRoute>
                <OutputPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
