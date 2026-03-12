import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

const QuickAddOpportunity = ({ onExtract, onImageUpload }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleExtract = async () => {
    if (!message.trim()) return;
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      await onExtract(message);
      setSuccess(true);
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError('Extraction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-9 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-7 font-outfit">Quick Add Opportunity</h3>

      <div className="bg-[#FBFCFD] border border-slate-100 rounded-[28px] p-7 mb-7 relative focus-within:ring-2 ring-blue-500/10 transition-all">
        <textarea
          className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-300 text-[15px] font-medium resize-none min-h-[140px]"
          placeholder="Paste opportunity message here…"
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

      {error && (
        <p className="mt-4 text-sm text-red-500 font-medium text-center">{error}</p>
      )}

      {success && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold text-sm">
          <CheckCircle2 size={16} />
          Opportunity extracted successfully!
        </div>
      )}

      <div className="flex items-center justify-end mt-6">
        <button
          onClick={handleExtract}
          disabled={loading || !message.trim()}
          className="bg-[#3B82F6] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-9 rounded-[20px] shadow-lg shadow-blue-500/20 flex items-center gap-2.5 transition-all active:scale-[0.98]"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {loading ? 'Extracting…' : 'Extract with AI'}
        </button>
      </div>
    </div>
  );
};

export default QuickAddOpportunity;
