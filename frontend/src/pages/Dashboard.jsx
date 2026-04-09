import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button.jsx';
import { useContractStore } from '../store/contractStore.js';
import { useLangStore } from '../store/langStore.js';
import { translations } from '../utils/translations.js';
import { Layers, MapPin, AlignLeft, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const setContractData = useContractStore((state) => state.setContractData);
  const { language } = useLangStore();
  const t = translations[language].dash;
  
  const [formData, setFormData] = useState({
    type: 'NDA',
    jurisdiction: 'United States',
    customDetails: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch('http://localhost:5000/api/generate-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.success) {
        setContractData({ contractText: data.contract, ...formData });
        navigate('/output');
      }
    } catch (error) {
      console.error('Error generating contract:', error);
      alert('Failed to generate contract. Is the backend running?');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto w-full pt-12 pb-24 relative z-20"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">{t.subtitle}</p>
      </div>

      <div className="glass rounded-3xl p-8 md:p-10 border shadow-2xl relative overflow-hidden">
        {isGenerating && (
          <div className="absolute inset-0 bg-white/60 dark:bg-dark-900/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white animate-pulse">{t.loading}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Layers size={16} className="mr-2 text-brand-500" /> {t.typeLabel}
              </label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
              >
                <optgroup label="Business & Corporate">
                  <option value="NDA">Non-Disclosure Agreement (NDA)</option>
                  <option value="MoU">Memorandum of Understanding (MoU)</option>
                  <option value="Partnership Agreement">Partnership Agreement</option>
                  <option value="Shareholder Agreement">Shareholder Agreement</option>
                  <option value="Software License">Software License Agreement</option>
                  <option value="Service Level Agreement">Service Level Agreement (SLA)</option>
                </optgroup>
                <optgroup label="Employment & HR">
                  <option value="Employment">Employment Contract</option>
                  <option value="Freelance">Freelance/Independent Contractor</option>
                  <option value="Non-Compete">Non-Compete Agreement</option>
                  <option value="Offer Letter">Offer Letter</option>
                </optgroup>
                <optgroup label="Real Estate & Property">
                  <option value="Rental">Rental/Lease Agreement</option>
                  <option value="Commercial Lease">Commercial Lease Agreement</option>
                  <option value="Sale Deed">Sale Deed</option>
                  <option value="Power of Attorney">Power of Attorney</option>
                </optgroup>
                <optgroup label="Indian Court & Disputes">
                  <option value="Indian Court Draft">General Indian Court Draft</option>
                  <option value="Legal Notice">Legal Notice</option>
                  <option value="Affidavit">Affidavit</option>
                  <option value="Writ Petition">Writ Petition</option>
                  <option value="Plaint / Written Statement">Plaint / Written Statement</option>
                  <option value="Bail Application">Bail Application</option>
                  <option value="Cease and Desist">Cease and Desist Letter</option>
                  <option value="Settlement Agreement">Settlement Agreement</option>
                </optgroup>
                <optgroup label="Personal & Miscellaneous">
                  <option value="Last Will">Last Will and Testament</option>
                  <option value="Promissory Note">Promissory Note</option>
                  <option value="Divorce Settlement">Divorce Settlement</option>
                </optgroup>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                <MapPin size={16} className="mr-2 text-blue-500" /> {t.jurisdictionLabel}
              </label>
              <select 
                value={formData.jurisdiction}
                onChange={(e) => setFormData({...formData, jurisdiction: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
              <AlignLeft size={16} className="mr-2 text-purple-500" /> {t.detailsLabel}
            </label>
            <textarea 
              value={formData.customDetails}
              onChange={(e) => setFormData({...formData, customDetails: e.target.value})}
              placeholder={t.detailsPlaceholder}
              className="w-full h-32 p-4 rounded-xl border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition resize-none"
              required
            ></textarea>
          </div>

          <Button type="submit" size="lg" className="w-full mt-4 !h-14">
            <Sparkles size={20} className="mr-2" />
            {t.generateBtn}
          </Button>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
            {t.disclaimer}
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Dashboard;
