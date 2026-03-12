import React from 'react';
import { Sparkles } from 'lucide-react';

const RecommendationPanel = ({ recommendations = [] }) => (
  <div className="space-y-4">
    <h4 className="font-bold text-slate-800 text-[15px] px-2 flex items-center justify-between font-outfit">
      Recommended for You
      <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
        <Sparkles size={10} />
      </div>
    </h4>

    {recommendations.length === 0 ? (
      <div className="bg-white border border-slate-200 border-dashed rounded-[32px] p-8 flex flex-col items-center gap-3 text-center">
        <Sparkles size={24} className="text-slate-300" />
        <p className="text-[13px] font-semibold text-slate-400">No recommendations yet</p>
        <p className="text-[11px] text-slate-300 font-medium">Add more opportunities to get personalised suggestions.</p>
      </div>
    ) : (
      <div className="space-y-3">
        {recommendations.map((item) => (
          <article key={item.opportunityId} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h5 className="text-sm font-bold text-slate-800">{item.title}</h5>
                <p className="text-xs text-slate-500">{item.company}</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                {Math.round((item.matchScore || 0) * 100)}% match
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-600">Matched</p>
              <p className="text-[11px] text-slate-500">{(item.matchedSkills || []).join(', ') || 'None'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-600">Missing</p>
              <p className="text-[11px] text-slate-500">{(item.missingSkills || []).join(', ') || 'None'}</p>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
);

export default RecommendationPanel;
