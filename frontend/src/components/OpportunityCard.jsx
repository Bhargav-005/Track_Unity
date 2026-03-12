import React from 'react';
import { ExternalLink } from 'lucide-react';

const OpportunityCard = ({ opportunity }) => {
  const { title, company, deadline, eligibility, logo } = opportunity;

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-7 shadow-sm hover:shadow-lg transition-all relative group flex items-start gap-6">
      <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-2.5 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
        <img src={logo || 'https://via.placeholder.com/150'} alt={company} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-outfit">{title}</h4>
          <button className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">View Details</button>
        </div>
        <div className="flex flex-col gap-1 text-[13px] font-semibold text-slate-500 mb-6">
          <p>Company: <span className="text-slate-800 ml-1 font-bold">{company}</span></p>
          <p>Deadline: <span className="text-slate-800 ml-1 font-bold">{deadline}</span></p>
          <p>Eligibility: <span className="text-slate-800 ml-1 font-bold">{eligibility}</span></p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-[#3B82F6] hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
            View Details
          </button>
          <button className="flex-1 py-3 bg-[#3B82F6] hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
            Apply ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
