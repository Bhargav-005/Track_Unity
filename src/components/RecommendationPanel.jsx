import React from 'react';
import { Sparkles, Zap, Users } from 'lucide-react';

const RecommendationPanel = () => {
  const recommendations = [
    { title: 'OpenAI Research Internship', company: 'OpenAI', deadline: 'April 10', reason: 'interest in AI', icon: <Zap size={22} fill="currentColor" /> },
    { title: 'Meta Engineering Fellowship', company: 'Meta', deadline: 'May 15', reason: 'interest in Systems', icon: <Users size={22} fill="currentColor" /> },
  ];

  return (
    <div className="space-y-6">
      <h4 className="font-bold text-slate-800 text-[15px] px-2 flex items-center justify-between font-outfit">
        Recommended for You
        <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
          <Sparkles size={10} />
        </div>
      </h4>
      
      {recommendations.map((rec, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm group hover:border-blue-200 transition-all hover:scale-[1.02]">
           <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                 {rec.icon}
              </div>
              <div className="overflow-hidden">
                 <p className="text-[9px] font-black text-blue-600 mb-1 uppercase tracking-widest font-inter">Recommended For You</p>
                 <h5 className="text-[14px] font-bold text-slate-800 truncate mb-1 leading-tight font-outfit">{rec.title}</h5>
                 <p className="text-[10px] text-slate-400 font-bold tracking-tight font-inter">Based on your {rec.reason}</p>
              </div>
           </div>
           <div className="flex items-center justify-between pt-1">
              <div className="text-[10px] font-bold text-slate-800 font-inter">Deadline: {rec.deadline}</div>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95">
                  View
              </button>
           </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationPanel;
