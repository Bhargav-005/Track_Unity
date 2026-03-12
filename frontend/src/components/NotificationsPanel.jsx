import React from 'react';
import { Settings, SlidersHorizontal, AlertTriangle, Bell } from 'lucide-react';

const getDaysLeft = (isoDate) => {
  if (!isoDate) return Infinity;
  return Math.ceil((new Date(isoDate) - new Date()) / (1000 * 60 * 60 * 24));
};

const NotificationsPanel = ({ opportunities = [] }) => {
  const notifications = opportunities
    .filter((opp) => {
      const d = getDaysLeft(opp.deadline);
      return d >= 0 && d <= 5;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5)
    .map((opp) => {
      const d = getDaysLeft(opp.deadline);
      const subtitle = d === 0 ? 'Deadline: today!' : d === 1 ? 'Deadline: tomorrow' : `Deadline: ${d} days`;
      return { title: opp.title || opp.company, subtitle };
    });

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden mb-7">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h4 className="font-bold text-slate-800 text-[15px] font-outfit">Notifications</h4>
        <div className="flex gap-2.5">
          <Settings size={16} className="text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
          <SlidersHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
        </div>
      </div>
      <div className="p-2 space-y-1">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-slate-400">
            <Bell size={22} className="opacity-40" />
            <p className="text-[12px] font-semibold">No upcoming deadline alerts</p>
          </div>
        ) : (
          notifications.map((note, i) => (
            <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-3xl transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 border border-orange-100/50">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h5 className="text-[14px] font-bold text-slate-800">{note.title}</h5>
                <p className="text-[11px] font-semibold text-slate-400 font-inter">{note.subtitle}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {notifications.length > 0 && (
        <button className="w-full py-4 text-[11px] font-black text-blue-600 hover:bg-blue-50 transition-colors uppercase tracking-[0.1em] border-t border-slate-100 font-inter">
          See all notifications
        </button>
      )}
    </div>
  );
};

export default NotificationsPanel;
