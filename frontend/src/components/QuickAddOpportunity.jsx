import React, { useState } from 'react';
import { Sparkles, Bookmark } from 'lucide-react';
import ImageUpload from './ImageUpload';

const QuickAddOpportunity = ({ onExtract, onImageUpload }) => {
  const [message, setMessage] = useState('');

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-9 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-7 font-outfit">Quick Add Opportunity</h3>
      
      <div className="bg-[#FBFCFD] border border-slate-100 rounded-[28px] p-7 mb-7 relative focus-within:ring-2 ring-blue-500/10 transition-all">
        <textarea 
          className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-300 text-[15px] font-medium resize-none min-h-[140px]"
          placeholder="Paste opportunity message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="mt-4 pt-6 border-t border-slate-100/50">
            <p className="text-[10px] uppercase font-black text-slate-300 tracking-widest mb-3">Example:</p>
            <div className="space-y-0.5 opacity-60">
                <p className="text-[13px] font-bold text-slate-800">Google Summer Internship</p>
                <p className="text-[12px] font-medium text-slate-500">Deadline: March 30</p>
                <p className="text-[12px] font-medium text-slate-500">Apply: google.com/apply</p>
            </div>
        </div>
      </div>

      <ImageUpload onUpload={onImageUpload} />

      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-2 text-[11px] font-black text-slate-300 uppercase tracking-tighter">
          <Bookmark size={14} />
          catded March 30
        </div>
        <button 
          onClick={() => onExtract(message)}
          className="bg-[#3B82F6] hover:bg-blue-700 text-white font-bold py-3.5 px-9 rounded-[20px] shadow-lg shadow-blue-500/20 flex items-center gap-2.5 transition-all active:scale-[0.98]"
        >
          <Sparkles size={18} />
          Extract with AI
        </button>
      </div>
    </div>
  );
};

export default QuickAddOpportunity;
