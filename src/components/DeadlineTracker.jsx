import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

const DeadlineTracker = () => {
  const deadlines = [
    { n: 'Google Internship', d: 2, p: 85, c: 'bg-orange-400' },
    { n: 'HackMIT', d: 4, p: 60, c: 'bg-orange-300' },
    { n: 'Amazon ML', d: 5, p: 35, c: 'bg-orange-200' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-7 shadow-sm mb-7">
      <div className="flex items-center justify-between mb-8">
        <h4 className="font-bold text-slate-800 text-[15px] font-outfit">Deadline Tracker</h4>
        <button className="text-slate-400 hover:text-blue-500"><SlidersHorizontal size={18}/></button>
      </div>
      <div className="space-y-7">
        {deadlines.map((item, i) => (
          <div key={i} className="space-y-2.5">
            <div className="flex justify-between items-center px-0.5">
              <div className="flex items-center gap-2.5">
                 <div className="w-5 h-5 bg-white border border-slate-100 rounded flex items-center justify-center p-0.5 overflow-hidden">
                    <img src={`https://www.google.com/s2/favicons?domain=${item.n.split(' ')[0].toLowerCase()}.com`} alt="" className="w-3.5 h-3.5" />
                 </div>
                 <span className="text-[13px] font-bold text-slate-800 tracking-tight font-inter">{item.n}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 font-inter">{item.d} days remaining</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.p}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full ${item.c} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeadlineTracker;
