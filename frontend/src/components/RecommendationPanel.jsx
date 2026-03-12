import React from 'react';
import { Sparkles } from 'lucide-react';

const RecommendationPanel = () => (
  <div className="space-y-4">
    <h4 className="font-bold text-slate-800 text-[15px] px-2 flex items-center justify-between font-outfit">
      Recommended for You
      <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
        <Sparkles size={10} />
      </div>
    </h4>
    <div className="bg-white border border-slate-200 border-dashed rounded-[32px] p-8 flex flex-col items-center gap-3 text-center">
      <Sparkles size={24} className="text-slate-300" />
      <p className="text-[13px] font-semibold text-slate-400">No recommendations yet</p>
      <p className="text-[11px] text-slate-300 font-medium">Add more opportunities to get personalised suggestions.</p>
    </div>
  </div>
);

export default RecommendationPanel;
