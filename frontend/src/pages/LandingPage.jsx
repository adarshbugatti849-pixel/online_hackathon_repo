import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { FileText, ShieldAlert, MessageSquareText, ArrowRight } from 'lucide-react';
import { useLangStore } from '../store/langStore.js';
import { translations } from '../utils/translations.js';

const LandingPage = () => {
  const { language } = useLangStore();
  const t = translations[language];
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center"
      >
        <span className="px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-6 inline-block border border-brand-200 dark:border-brand-800">
          {t.hero.badge}
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
          {t.hero.title1} <br />
          <span className="gradient-text">{t.hero.title2}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/dashboard">
            <Button size="lg" className="w-full sm:w-auto group">
              {t.hero.generateBtn}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            {t.hero.demoBtn}
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
      >
        <FeatureCard 
          icon={<FileText className="text-brand-500" size={32} />}
          title={t.features.feat1Title}
          description={t.features.feat1Desc}
        />
        <FeatureCard 
          icon={<ShieldAlert className="text-blue-500" size={32} />}
          title={t.features.feat2Title}
          description={t.features.feat2Desc}
        />
        <FeatureCard 
          icon={<MessageSquareText className="text-purple-500" size={32} />}
          title={t.features.feat3Title}
          description={t.features.feat3Desc}
        />
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="glass p-8 rounded-3xl flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-dark-800 flex items-center justify-center mb-6 shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
