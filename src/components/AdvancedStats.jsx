import React from 'react';
import { Maximize2, ChevronDown } from 'lucide-react';

const AdvancedStats = () => {
  const stats = [
    { label: 'Applied Opportunities', value: 12 },
    { label: 'Saved Opportunities', value: 20 },
    { label: 'Upcoming Deadlines', value: 8 },
    { label: 'Expired Opportunities', value: 3 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-7 shadow-sm mb-7">
      <div className="flex items-center justify-between mb-8 px-1">
        <h4 className="font-bold text-slate-800 text-[15px] font-outfit">Advanced Dashboard</h4>
        <div className="flex gap-2 text-slate-300">
          <Maximize2 size={16} className="hover:text-blue-500 cursor-pointer transition-colors" />
          <ChevronDown size={18} className="hover:text-blue-500 cursor-pointer transition-colors" />
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest px-1 font-inter">Your Opportunity Activity</p>
      <div className="space-y-4 px-1">
        {stats.map((s, i) => (
          <div key={i} className="flex justify-between items-center group cursor-pointer">
            <span className="text-[13px] font-semibold text-slate-500 group-hover:text-slate-800 transition-colors tracking-tight font-inter">{s.label}</span>
            <span className="text-[14px] font-bold text-slate-900 leading-none font-outfit">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedStats;
