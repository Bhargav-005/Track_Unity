import React from 'react';

const CATEGORY_NAMES = ['All', 'Internships', 'Hackathons', 'Scholarships', 'Competitions'];

const matchDomain = (opp, name) => {
  if (name === 'All') return true;
  const domain = (opp.domain || '').toLowerCase();
  const role = (opp.role || '').toLowerCase();
  const title = (opp.title || '').toLowerCase();
  const key = name.toLowerCase().slice(0, -1); // strip plural 's'
  return domain.includes(key) || role.includes(key) || title.includes(key);
};

const CategoryFilters = ({ activeCategory, onCategoryChange, opportunities = [] }) => {
  const categories = CATEGORY_NAMES.map((name) => ({
    name,
    count: opportunities.filter((o) => matchDomain(o, name)).length,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 font-outfit px-1">Opportunity Categories</h3>
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            className={`px-7 py-3 rounded-[20px] font-extrabold text-[13px] transition-all border ${
              activeCategory === cat.name
              ? 'bg-white text-[#3B82F6] border-slate-200 shadow-sm ring-2 ring-blue-500/10'
              : 'bg-[#F9FAFB] text-slate-500 border-transparent hover:bg-white hover:border-slate-200 shadow-sm'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
