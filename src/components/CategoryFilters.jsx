import React from 'react';

const CategoryFilters = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { name: 'Internships', count: 12 },
    { name: 'Hackathons', count: 7 },
    { name: 'Scholarships', count: 4 },
    { name: 'Competitions', count: 6 },
  ];

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
