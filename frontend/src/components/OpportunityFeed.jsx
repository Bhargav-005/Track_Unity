import React from 'react';
import OpportunityCard from './OpportunityCard';

const OpportunityFeed = ({ opportunities }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 font-outfit">Opportunity Feed</h3>
      <div className="space-y-5">
        {opportunities.map((opp, i) => (
          <OpportunityCard key={i} opportunity={opp} />
        ))}
        {opportunities.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 border-dashed">
            <p className="text-slate-400 font-medium">No opportunities found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityFeed;
