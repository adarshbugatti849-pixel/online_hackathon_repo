import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useContractStore } from '../store/contractStore.js';
import { Button } from '../components/ui/Button.jsx';
import { Download, Copy, AlertTriangle, CheckCircle, ChevronLeft } from 'lucide-react';
import jsPDF from 'jspdf';

const OutputPage = () => {
  const navigate = useNavigate();
  const contractData = useContractStore((state) => state.contractData);
  const [risks, setRisks] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  
  useEffect(() => {
    if (!contractData) {
      navigate('/dashboard');
    } else {
      analyzeRisks();
    }
  }, [contractData, navigate]);

  const analyzeRisks = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('http://localhost:5000/api/analyze-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contract: contractData.contractText })
      });
      const data = await response.json();
      if (data.success) {
        setRisks(data.risks);
        setAnalysisDone(true);
      }
    } catch (error) {
      console.error('Error analyzing risks:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(contractData.contractText, 180);
    doc.text(splitText, 15, 20);
    doc.save(`${contractData.type}_Contract.pdf`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractData.contractText);
    alert('Copied to clipboard!');
  };

  if (!contractData) return null;

  // Process text to highlight risks
  const renderHighlightedText = () => {
    let text = contractData.contractText;
    if (!analysisDone || risks.length === 0) return <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{text}</pre>;

    let textToProcess = text;
    const sortedRisks = [...risks].sort((a, b) => b.text.length - a.text.length);

    sortedRisks.forEach((risk, i) => {
      const marker = `[[RISK_${i}]]`;
      textToProcess = textToProcess.replace(new RegExp(risk.text, 'g'), marker);
    });

    const parts = textToProcess.split(/(\[\[RISK_\d+\]\])/g);
    
    return (
      <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
        {parts.map((part, idx) => {
          const match = part.match(/\[\[RISK_(\d+)\]\]/);
          if (match) {
            const riskIndex = parseInt(match[1]);
            const risk = sortedRisks[riskIndex];
            const isHigh = risk.level === 'high';
            return (
              <span 
                key={idx} 
                className={`px-1 rounded cursor-help transition-colors border-b-2 ${
                  isHigh ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500 text-red-900 dark:text-red-100' : 'bg-yellow-100 border-yellow-500 dark:bg-yellow-900/30 dark:border-yellow-500 text-yellow-900 dark:text-yellow-100'
                }`}
                title={risk.suggestion}
              >
                {risk.text}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pt-8 pb-24 flex flex-col md:flex-row gap-8 items-start relative z-20"
    >
      {/* Left: Contract Document */}
      <div className="flex-1 w-full space-y-4">
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-200 dark:hover:bg-dark-800 rounded-full transition">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold flex-1 text-slate-900 dark:text-white">Generated Contract</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} title="Copy to clipboard">
              <Copy size={16} /> <span className="hidden sm:inline-block ml-2">Copy</span>
            </Button>
            <Button size="sm" onClick={downloadPDF} title="Download PDF">
              <Download size={16} className="sm:mr-2" /> <span className="hidden sm:inline-block">PDF</span>
            </Button>
          </div>
        </div>
        <div className="glass rounded-xl p-8 min-h-[60vh] max-h-[75vh] overflow-y-auto border shadow-lg bg-white dark:bg-dark-800 text-slate-800 dark:text-slate-200">
          {renderHighlightedText()}
        </div>
      </div>

      {/* Right: Risk Analysis Panel */}
      <div className="w-full md:w-80 lg:w-96 glass rounded-xl border p-6 sticky top-24 shadow-lg shrink-0">
        <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white flex items-center">
          <AlertTriangle size={20} className="mr-2 text-brand-500" />
          Risk Engine
        </h3>

        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">Scanning for risks...</p>
          </div>
        ) : analysisDone ? (
          <div className="space-y-4">
            {risks.length === 0 ? (
              <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl flex items-start text-brand-700 dark:text-brand-300">
                <CheckCircle className="mr-3 mt-0.5 shrink-0" size={18} />
                <p className="text-sm">No major risks detected. The contract looks solid!</p>
              </div>
            ) : (
              risks.map((risk, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className={`p-4 rounded-xl border ${risk.level === 'high' ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/50' : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-900/50'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${risk.level === 'high' ? 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                      {risk.level} Risk
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1 text-slate-800 dark:text-slate-200">Issue: "{risk.text}"</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400"><strong>Suggestion:</strong> {risk.suggestion}</p>
                </motion.div>
              ))
            )}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default OutputPage;
