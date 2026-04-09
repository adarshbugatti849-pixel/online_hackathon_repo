import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import OutputPage from './pages/OutputPage.jsx';
import Chatbot from './components/Chatbot.jsx';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/40 text-xl font-bold">
                S
             </div>
             <span className="font-bold text-xl tracking-tight hidden sm:block">SmartContract AI</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/dashboard" className="hidden sm:block text-sm font-medium hover:text-brand-500 transition">Dashboard</Link>
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/output" element={<OutputPage />} />
          </Routes>
        </main>
        
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
