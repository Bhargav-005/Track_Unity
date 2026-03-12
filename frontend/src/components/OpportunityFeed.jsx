import React from 'react';
import { Inbox } from 'lucide-react';
import OpportunityCard from './OpportunityCard';

const OpportunityFeed = ({ opportunities = [], loading = false }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-slate-900 font-outfit">Opportunity Feed</h3>
    <div className="space-y-5">
      {loading ? (
        <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200">
          <p className="text-slate-400 font-medium animate-pulse">Loading opportunities…</p>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 border-dashed flex flex-col items-center gap-3">
          <Inbox size={32} className="text-slate-300" />
          <p className="text-slate-500 font-semibold">No opportunities added yet.</p>
          <p className="text-slate-400 text-sm">Paste your first opportunity message in Quick Add below.</p>
        </div>
      ) : (
        opportunities.map((opp) => (
          <OpportunityCard key={opp._id} opportunity={opp} />
        ))
      )}
    </div>
  </div>
);

export default OpportunityFeed;
